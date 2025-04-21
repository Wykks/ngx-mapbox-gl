import {
  EventEmitter,
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  afterRender,
  inject,
} from '@angular/core';
import {
  Map,
  Marker,
  Popup,
  type AnimationOptions,
  type CanvasSource,
  type EasingOptions,
  type FilterSpecification,
  type LayerSpecification,
  type LayoutSpecification,
  type LngLatLike,
  type MapOptions,
  type MarkerOptions,
  type PaintSpecification,
  type PointLike,
  type PopupOptions,
  type Source,
  type SourceSpecification,
} from 'mapbox-gl';
import { AsyncSubject, Observable, Subscription } from 'rxjs';
import { LayerEvents, NgxMapEvent } from './map.types';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

export interface SetupMap {
  accessToken?: string;
  mapOptions: Omit<MapOptions, 'bearing' | 'pitch' | 'zoom'> & {
    /**
     * NOTE: Thoses are arrays in order to be able to imperatively change them if the map is moved manually
     * TODO: Move thoses to model() maybe
     */
    bearing?: [number];
    pitch?: [number];
    zoom?: [number];
  };
  mapEvents: NgxMapEvent;
}

export interface SetupLayer {
  layerOptions: Parameters<Map['addLayer']>[0];
  layerEvents: LayerEvents;
}

export interface SetupPopup {
  popupOptions: PopupOptions;
  popupEvents: {
    popupOpen: EventEmitter<void>;
    popupClose: EventEmitter<void>;
  };
}

export interface SetupMarker {
  markersOptions: {
    pitchAlignment?: MarkerOptions['pitchAlignment'];
    rotationAlignment?: MarkerOptions['rotationAlignment'];
    offset?: MarkerOptions['offset'];
    anchor?: MarkerOptions['anchor'];
    draggable?: MarkerOptions['draggable'];
    element: HTMLElement;
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: LngLatLike;
    clickTolerance?: MarkerOptions['clickTolerance'];
  };
  markersEvents: {
    markerDragStart: EventEmitter<Marker>;
    markerDrag: EventEmitter<Marker>;
    markerDragEnd: EventEmitter<Marker>;
  };
}

export type MovingOptions =
  | Parameters<Map['jumpTo']>[0]
  | Parameters<Map['easeTo']>[0]
  | Parameters<Map['flyTo']>[0];

@Injectable()
export class MapService {
  private readonly zone = inject(NgZone);
  private readonly MAPBOX_API_KEY = inject<string | null>(MAPBOX_API_KEY, {
    optional: true,
  });
  private readonly injector = inject(Injector);

  mapInstance: Map;
  mapCreated$: Observable<void>;
  mapLoaded$: Observable<void>;
  mapEvents: NgxMapEvent;

  private mapCreated = new AsyncSubject<void>();
  private mapLoaded = new AsyncSubject<void>();
  private markersToRemove: Marker[] = [];
  private popupsToRemove: Popup[] = [];
  private imageIdsToRemove: string[] = [];
  private subscription = new Subscription();

  constructor() {
    this.mapCreated$ = this.mapCreated.asObservable();
    this.mapLoaded$ = this.mapLoaded.asObservable();
  }

  setup(options: SetupMap) {
    const mapOptions = {
      ...options.mapOptions,
      bearing: options.mapOptions.bearing?.[0],
      zoom: options.mapOptions.zoom?.[0],
      pitch: options.mapOptions.pitch?.[0],
      accessToken: options.accessToken || this.MAPBOX_API_KEY || '',
    };
    this.createMap(mapOptions);
    this.hookEvents(options.mapEvents);
    this.mapEvents = options.mapEvents;
    this.mapCreated.next(undefined);
    this.mapCreated.complete();
    // Intentionally emit mapCreate after internal mapCreated event
    if (options.mapEvents.mapCreate.observed) {
      this.zone.run(() => {
        options.mapEvents.mapCreate.emit(this.mapInstance);
      });
    }
  }

  destroyMap() {
    if (this.mapInstance) {
      this.subscription.unsubscribe();
      this.mapInstance.remove();
    }
  }

  updateProjection(projection: MapOptions['projection']) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setProjection(projection);
    });
  }

  updateMinZoom(minZoom: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMinZoom(minZoom);
    });
  }

  updateMaxZoom(maxZoom: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMaxZoom(maxZoom);
    });
  }

  updateMinPitch(minPitch: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMinPitch(minPitch);
    });
  }

  updateMaxPitch(maxPitch: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMaxPitch(maxPitch);
    });
  }

  updateRenderWorldCopies(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setRenderWorldCopies(status);
    });
  }

  updateScrollZoom(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.scrollZoom.enable()
        : this.mapInstance.scrollZoom.disable();
    });
  }

  updateDragRotate(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.dragRotate.enable()
        : this.mapInstance.dragRotate.disable();
    });
  }

  updateTouchPitch(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.touchPitch.enable()
        : this.mapInstance.touchPitch.disable();
    });
  }

  updateTouchZoomRotate(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.touchZoomRotate.enable()
        : this.mapInstance.touchZoomRotate.disable();
    });
  }

  updateDoubleClickZoom(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.doubleClickZoom.enable()
        : this.mapInstance.doubleClickZoom.disable();
    });
  }

  updateKeyboard(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.keyboard.enable()
        : this.mapInstance.keyboard.disable();
    });
  }

  updateDragPan(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.dragPan.enable()
        : this.mapInstance.dragPan.disable();
    });
  }

  updateBoxZoom(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status
        ? this.mapInstance.boxZoom.enable()
        : this.mapInstance.boxZoom.disable();
    });
  }

  updateStyle(style: Parameters<Map['setStyle']>[0]) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setStyle(style);
    });
  }

  updateMaxBounds(maxBounds: Parameters<Map['setMaxBounds']>[0]) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMaxBounds(maxBounds);
    });
  }

  changeCanvasCursor(cursor: string) {
    const canvas = this.mapInstance.getCanvasContainer();
    canvas.style.cursor = cursor;
  }

  queryRenderedFeatures(
    pointOrBox: PointLike | [PointLike, PointLike],
    parameters?: {
      layers?: string[];
      filter?: FilterSpecification;
      validate?: boolean;
    },
  ): GeoJSON.Feature<GeoJSON.GeometryObject>[] {
    return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
  }

  panTo(center: LngLatLike, options?: AnimationOptions) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.panTo(center, options);
    });
  }

  move(
    movingMethod: 'jumpTo' | 'easeTo' | 'flyTo',
    movingOptions?: MovingOptions,
    zoom?: number,
    center?: LngLatLike,
    bearing?: number,
    pitch?: number,
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance[movingMethod]({
        ...movingOptions,
        zoom: zoom != null ? zoom : this.mapInstance.getZoom(),
        center: center != null ? center : this.mapInstance.getCenter(),
        bearing: bearing != null ? bearing : this.mapInstance.getBearing(),
        pitch: pitch != null ? pitch : this.mapInstance.getPitch(),
      });
    });
  }

  addLayer(layer: SetupLayer, bindEvents: boolean, before?: string) {
    this.zone.runOutsideAngular(() => {
      Object.keys(layer.layerOptions).forEach((key: string) => {
        const tkey = key as keyof Parameters<Map['addLayer']>[0];
        if (layer.layerOptions[tkey] === undefined) {
          delete layer.layerOptions[tkey];
        }
      });
      this.mapInstance.addLayer(layer.layerOptions, before);
      if (bindEvents) {
        if (layer.layerEvents.layerClick.observed) {
          this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerClick.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerDblClick.observed) {
          this.mapInstance.on('dblclick', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerDblClick.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerMouseDown.observed) {
          this.mapInstance.on('mousedown', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseDown.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerMouseUp.observed) {
          this.mapInstance.on('mouseup', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseUp.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerMouseEnter.observed) {
          this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseEnter.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerMouseLeave.observed) {
          this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseLeave.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerMouseMove.observed) {
          this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseMove.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerMouseOver.observed) {
          this.mapInstance.on('mouseover', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseOver.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerMouseOut.observed) {
          this.mapInstance.on('mouseout', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseOut.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerContextMenu.observed) {
          this.mapInstance.on('contextmenu', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerContextMenu.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerTouchStart.observed) {
          this.mapInstance.on('touchstart', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerTouchStart.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerTouchEnd.observed) {
          this.mapInstance.on('touchend', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerTouchEnd.emit(evt);
            });
          });
        }
        if (layer.layerEvents.layerTouchCancel.observed) {
          this.mapInstance.on('touchcancel', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerTouchCancel.emit(evt);
            });
          });
        }
      }
    });
  }

  removeLayer(layerId: string) {
    this.zone.runOutsideAngular(() => {
      if (this.mapInstance.getLayer(layerId) != null) {
        this.mapInstance.removeLayer(layerId);
      }
    });
  }

  addMarker(marker: SetupMarker) {
    const options: MarkerOptions = {
      offset: marker.markersOptions.offset,
      anchor: marker.markersOptions.anchor,
      draggable: marker.markersOptions.draggable,
      rotationAlignment: marker.markersOptions.rotationAlignment,
      pitchAlignment: marker.markersOptions.pitchAlignment,
      clickTolerance: marker.markersOptions.clickTolerance,
    };
    Object.keys(options).forEach((key: string) => {
      const tkey = key as keyof MarkerOptions;
      if (options[tkey] === undefined) {
        delete options[tkey];
      }
    });
    if (marker.markersOptions.element.childNodes.length > 0) {
      options.element = marker.markersOptions.element;
    }
    const markerInstance = new Marker(options);
    if (marker.markersEvents.markerDragStart.observed) {
      markerInstance.on('dragstart', (event) => {
        if (event) {
          const { target } = event as { target: Marker };
          this.zone.run(() => {
            marker.markersEvents.markerDragStart.emit(target);
          });
        }
      });
    }
    /*

     */
    if (marker.markersEvents.markerDrag.observed) {
      markerInstance.on('drag', (event) => {
        if (event) {
          const { target } = event as { target: Marker };
          this.zone.run(() => {
            marker.markersEvents.markerDrag.emit(target);
          });
        }
      });
    }
    if (marker.markersEvents.markerDragEnd.observed) {
      markerInstance.on('dragend', (event) => {
        if (event) {
          const { target } = event as { target: Marker };
          this.zone.run(() => {
            marker.markersEvents.markerDragEnd.emit(target);
          });
        }
      });
    }
    const lngLat: LngLatLike = marker.markersOptions.feature
      ? (marker.markersOptions.feature.geometry!.coordinates as [
          number,
          number,
        ])
      : marker.markersOptions.lngLat!;
    markerInstance.setLngLat(lngLat);
    return this.zone.runOutsideAngular(() => {
      markerInstance.addTo(this.mapInstance);
      return markerInstance;
    });
  }

  removeMarker(marker: Marker) {
    this.markersToRemove.push(marker);
  }

  createPopup(popup: SetupPopup, element: Node) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(popup.popupOptions).forEach((key) => {
        const tkey = key as keyof PopupOptions;
        return (
          popup.popupOptions[tkey] === undefined &&
          delete popup.popupOptions[tkey]
        );
      });
      const popupInstance = new Popup(popup.popupOptions);
      popupInstance.setDOMContent(element);
      if (popup.popupEvents.popupClose.observed) {
        popupInstance.on('close', () => {
          this.zone.run(() => {
            popup.popupEvents.popupClose.emit();
          });
        });
      }
      if (popup.popupEvents.popupOpen.observed) {
        popupInstance.on('open', () => {
          this.zone.run(() => {
            popup.popupEvents.popupOpen.emit();
          });
        });
      }
      return popupInstance;
    });
  }

  addPopupToMap(popup: Popup, lngLat: LngLatLike, skipOpenEvent = false) {
    return this.zone.runOutsideAngular(() => {
      if (skipOpenEvent && popup._listeners) {
        delete popup._listeners['open'];
      }
      popup.setLngLat(lngLat);
      popup.addTo(this.mapInstance);
    });
  }

  addPopupToMarker(marker: Marker, popup: Popup) {
    return this.zone.runOutsideAngular(() => {
      marker.setPopup(popup);
    });
  }

  removePopupFromMap(popup: Popup, skipCloseEvent = false) {
    if (skipCloseEvent && popup._listeners) {
      delete popup._listeners['close'];
    }
    this.popupsToRemove.push(popup);
  }

  removePopupFromMarker(marker: Marker) {
    return this.zone.runOutsideAngular(() => {
      marker.setPopup(undefined);
    });
  }

  addControl(
    control: Parameters<Map['addControl']>[0],
    position?: Parameters<Map['addControl']>[1],
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.addControl(control, position);
    });
  }

  removeControl(control: Parameters<Map['removeControl']>[0]) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.removeControl(control);
    });
  }

  async loadAndAddImage(
    imageId: string,
    url: string,
    options?: Parameters<Map['addImage']>[2],
  ) {
    return this.zone.runOutsideAngular(
      () =>
        new Promise<void>((resolve, reject) => {
          this.mapInstance.loadImage(url, (error, image) => {
            if (error) {
              reject(error);
              return;
            }
            if (!image) {
              reject(new Error('Image not loaded'));
              return;
            }
            this.addImage(imageId, image, options);
            resolve();
          });
        }),
    );
  }

  addImage(
    imageId: Parameters<Map['addImage']>[0],
    data: Parameters<Map['addImage']>[1],
    options?: Parameters<Map['addImage']>[2],
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.addImage(imageId, data, options);
    });
  }

  removeImage(imageId: string) {
    this.imageIdsToRemove.push(imageId);
  }

  addSource(
    sourceId: string,
    source: SourceSpecification | CanvasSource['options'],
  ) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(source).forEach((key) => {
        const tkey = key as keyof SourceSpecification;
        return source[tkey] === undefined && delete source[tkey];
      });
      this.mapInstance.addSource(sourceId, source as SourceSpecification);
    });
  }

  getSource<T extends Source>(sourceId: string) {
    return this.mapInstance.getSource<T>(sourceId);
  }

  removeSource(sourceId: string) {
    this.zone.runOutsideAngular(() => {
      this.findLayersBySourceId(sourceId).forEach((layer) =>
        this.mapInstance.removeLayer(layer.id),
      );
      this.mapInstance.removeSource(sourceId);
    });
  }

  setLayerAllPaintProperty(layerId: string, paint: PaintSpecification) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(paint).forEach((key) => {
        const tKey = key as keyof PaintSpecification;
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance.setPaintProperty(layerId, tKey, paint[tKey]);
      });
    });
  }

  setLayerAllLayoutProperty(layerId: string, layout: LayoutSpecification) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(layout).forEach((key) => {
        const tKey = key as keyof LayoutSpecification;
        // TODO Check for perf, setLayoutProperty only on changed layout props maybe
        this.mapInstance.setLayoutProperty(layerId, tKey, layout[tKey]);
      });
    });
  }

  setLayerFilter(layerId: string, filter: FilterSpecification[]) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setFilter(layerId, filter);
    });
  }

  setLayerBefore(layerId: string, beforeId: string) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.moveLayer(layerId, beforeId);
    });
  }

  setLayerZoomRange(layerId: string, minZoom?: number, maxZoom?: number) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setLayerZoomRange(
        layerId,
        minZoom ? minZoom : 0,
        maxZoom ? maxZoom : 20,
      );
    });
  }

  fitBounds(
    bounds: Parameters<Map['fitBounds']>[0],
    options?: Parameters<Map['fitBounds']>[1],
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.fitBounds(bounds, options);
    });
  }

  fitScreenCoordinates(
    points: [PointLike, PointLike],
    bearing: number,
    options?: EasingOptions,
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.fitScreenCoordinates(
        points[0],
        points[1],
        bearing,
        options,
      );
    });
  }

  applyChanges() {
    this.zone.runOutsideAngular(() => {
      this.removeMarkers();
      this.removePopups();
      this.removeImages();
    });
  }

  private createMap(options: MapOptions) {
    NgZone.assertNotInAngularZone();
    Object.keys(options).forEach((key: string) => {
      const tkey = key as keyof MapOptions;
      if (options[tkey] === undefined) {
        delete options[tkey];
      }
    });
    this.mapInstance = new Map(options);
    afterRender(
      {
        write: () => {
          this.applyChanges();
        },
      },
      { injector: this.injector },
    );
  }

  private removeMarkers() {
    for (const marker of this.markersToRemove) {
      marker.remove();
    }
    this.markersToRemove = [];
  }

  private removePopups() {
    for (const popup of this.popupsToRemove) {
      popup.remove();
    }
    this.popupsToRemove = [];
  }

  private removeImages() {
    for (const imageId of this.imageIdsToRemove) {
      this.mapInstance.removeImage(imageId);
    }
    this.imageIdsToRemove = [];
  }

  private findLayersBySourceId(sourceId: string): LayerSpecification[] {
    const layers = this.mapInstance.getStyle().layers;
    if (layers == null) {
      return [];
    }

    return layers.filter((l) =>
      'source' in l ? l.source === sourceId : false,
    );
  }

  private hookEvents(events: NgxMapEvent) {
    this.mapInstance.on('load', (evt) => {
      this.mapLoaded.next(undefined);
      this.mapLoaded.complete();
      this.zone.run(() => {
        events.mapLoad.emit(evt);
      });
    });
    if (events.mapResize.observed) {
      this.mapInstance.on('resize', (evt) =>
        this.zone.run(() => {
          events.mapResize.emit(evt);
        }),
      );
    }
    if (events.mapRemove.observed) {
      this.mapInstance.on('remove', (evt) =>
        this.zone.run(() => {
          events.mapRemove.emit(evt);
        }),
      );
    }
    if (events.mapMouseDown.observed) {
      this.mapInstance.on('mousedown', (evt) =>
        this.zone.run(() => {
          events.mapMouseDown.emit(evt);
        }),
      );
    }
    if (events.mapMouseUp.observed) {
      this.mapInstance.on('mouseup', (evt) =>
        this.zone.run(() => {
          events.mapMouseUp.emit(evt);
        }),
      );
    }
    if (events.mapMouseMove.observed) {
      this.mapInstance.on('mousemove', (evt) =>
        this.zone.run(() => {
          events.mapMouseMove.emit(evt);
        }),
      );
    }
    if (events.mapClick.observed) {
      this.mapInstance.on('click', (evt) =>
        this.zone.run(() => {
          events.mapClick.emit(evt);
        }),
      );
    }
    if (events.mapDblClick.observed) {
      this.mapInstance.on('dblclick', (evt) =>
        this.zone.run(() => {
          events.mapDblClick.emit(evt);
        }),
      );
    }
    if (events.mapMouseOver.observed) {
      this.mapInstance.on('mouseover', (evt) =>
        this.zone.run(() => {
          events.mapMouseOver.emit(evt);
        }),
      );
    }
    if (events.mapMouseOut.observed) {
      this.mapInstance.on('mouseout', (evt) =>
        this.zone.run(() => {
          events.mapMouseOut.emit(evt);
        }),
      );
    }
    if (events.mapContextMenu.observed) {
      this.mapInstance.on('contextmenu', (evt) =>
        this.zone.run(() => {
          events.mapContextMenu.emit(evt);
        }),
      );
    }
    if (events.mapTouchStart.observed) {
      this.mapInstance.on('touchstart', (evt) =>
        this.zone.run(() => {
          events.mapTouchStart.emit(evt);
        }),
      );
    }
    if (events.mapTouchEnd.observed) {
      this.mapInstance.on('touchend', (evt) =>
        this.zone.run(() => {
          events.mapTouchEnd.emit(evt);
        }),
      );
    }
    if (events.mapTouchMove.observed) {
      this.mapInstance.on('touchmove', (evt) =>
        this.zone.run(() => {
          events.mapTouchMove.emit(evt);
        }),
      );
    }
    if (events.mapTouchCancel.observed) {
      this.mapInstance.on('touchcancel', (evt) =>
        this.zone.run(() => {
          events.mapTouchCancel.emit(evt);
        }),
      );
    }
    if (events.mapWheel.observed) {
      this.mapInstance.on('wheel', (evt) =>
        this.zone.run(() => {
          events.mapWheel.emit(evt);
        }),
      );
    }
    if (events.moveStart.observed) {
      this.mapInstance.on('movestart', (evt) =>
        this.zone.run(() => events.moveStart.emit(evt)),
      );
    }
    if (events.move.observed) {
      this.mapInstance.on('move', (evt) =>
        this.zone.run(() => events.move.emit(evt)),
      );
    }
    if (events.moveEnd.observed) {
      this.mapInstance.on('moveend', (evt) =>
        this.zone.run(() => events.moveEnd.emit(evt)),
      );
    }
    if (events.mapDragStart.observed) {
      this.mapInstance.on('dragstart', (evt) =>
        this.zone.run(() => events.mapDragStart.emit(evt)),
      );
    }
    if (events.mapDrag.observed) {
      this.mapInstance.on('drag', (evt) =>
        this.zone.run(() => events.mapDrag.emit(evt)),
      );
    }
    if (events.mapDragEnd.observed) {
      this.mapInstance.on('dragend', (evt) =>
        this.zone.run(() => events.mapDragEnd.emit(evt)),
      );
    }
    if (events.zoomStart.observed) {
      this.mapInstance.on('zoomstart', () =>
        this.zone.run(() => events.zoomStart.emit()),
      );
    }
    if (events.zoomEvt.observed) {
      this.mapInstance.on('zoom', () =>
        this.zone.run(() => events.zoomEvt.emit()),
      );
    }
    if (events.zoomEnd.observed) {
      this.mapInstance.on('zoomend', () =>
        this.zone.run(() => events.zoomEnd.emit()),
      );
    }
    if (events.rotateStart.observed) {
      this.mapInstance.on('rotatestart', (evt) =>
        this.zone.run(() => events.rotateStart.emit(evt)),
      );
    }
    if (events.rotate.observed) {
      this.mapInstance.on('rotate', (evt) =>
        this.zone.run(() => events.rotate.emit(evt)),
      );
    }
    if (events.rotateEnd.observed) {
      this.mapInstance.on('rotateend', (evt) =>
        this.zone.run(() => events.rotateEnd.emit(evt)),
      );
    }
    if (events.pitchStart.observed) {
      this.mapInstance.on('pitchstart', () =>
        this.zone.run(() => events.pitchStart.emit()),
      );
    }
    if (events.pitchEvt.observed) {
      this.mapInstance.on('pitch', () =>
        this.zone.run(() => events.pitchEvt.emit()),
      );
    }
    if (events.pitchEnd.observed) {
      this.mapInstance.on('pitchend', () =>
        this.zone.run(() => events.pitchEnd.emit()),
      );
    }
    if (events.boxZoomStart.observed) {
      this.mapInstance.on('boxzoomstart', (evt) =>
        this.zone.run(() => events.boxZoomStart.emit(evt)),
      );
    }
    if (events.boxZoomEnd.observed) {
      this.mapInstance.on('boxzoomend', (evt) =>
        this.zone.run(() => events.boxZoomEnd.emit(evt)),
      );
    }
    if (events.boxZoomCancel.observed) {
      this.mapInstance.on('boxzoomcancel', (evt) =>
        this.zone.run(() => events.boxZoomCancel.emit(evt)),
      );
    }
    if (events.webGlContextLost.observed) {
      this.mapInstance.on('webglcontextlost', (evt) =>
        this.zone.run(() => events.webGlContextLost.emit(evt)),
      );
    }
    if (events.webGlContextRestored.observed) {
      this.mapInstance.on('webglcontextrestored', (evt) =>
        this.zone.run(() => events.webGlContextRestored.emit(evt)),
      );
    }
    if (events.render.observed) {
      this.mapInstance.on('render', () =>
        this.zone.run(() => events.render.emit()),
      );
    }
    if (events.mapError.observed) {
      this.mapInstance.on('error', (evt) =>
        this.zone.run(() => events.mapError.emit(evt.error)),
      );
    }
    if (events.data.observed) {
      this.mapInstance.on('data', (evt) =>
        this.zone.run(() => events.data.emit(evt)),
      );
    }
    if (events.styleData.observed) {
      this.mapInstance.on('styledata', (evt) =>
        this.zone.run(() => events.styleData.emit(evt)),
      );
    }
    if (events.sourceData.observed) {
      this.mapInstance.on('sourcedata', (evt) =>
        this.zone.run(() => events.sourceData.emit(evt)),
      );
    }
    if (events.dataLoading.observed) {
      this.mapInstance.on('dataloading', (evt) =>
        this.zone.run(() => events.dataLoading.emit(evt)),
      );
    }
    if (events.styleDataLoading.observed) {
      this.mapInstance.on('styledataloading', (evt) =>
        this.zone.run(() => events.styleDataLoading.emit(evt)),
      );
    }
    if (events.sourceDataLoading.observed) {
      this.mapInstance.on('sourcedataloading', (evt) =>
        this.zone.run(() => events.sourceDataLoading.emit(evt)),
      );
    }
    if (events.styleImageMissing.observed) {
      this.mapInstance.on('styleimagemissing', (evt) =>
        this.zone.run(() => events.styleImageMissing.emit(evt)),
      );
    }
    if (events.idle.observed) {
      this.mapInstance.on('idle', () =>
        this.zone.run(() => events.idle.emit()),
      );
    }
  }
}
