import {
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  NgZone,
  Optional,
} from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { AsyncSubject, Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {
  NgxMapboxLayerEvents,
  NgxMapEvent,
  MapImageData,
  MapImageOptions,
} from './map.types';
import { LayerSpecification } from 'mapbox-gl';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

export interface SetupMap {
  accessToken?: string;
  customMapboxApiUrl?: string;
  mapOptions: Omit<MapboxGl.MapOptions, 'bearing' | 'pitch' | 'zoom' | 'accessToken'> & {
    bearing?: [number];
    pitch?: [number];
    zoom?: [number];
    accessToken?: [string];
  };
  mapEvents: NgxMapEvent;
}

export interface SetupLayer {
  layerOptions: MapboxGl.Layer;
  layerEvents: NgxMapboxLayerEvents;
}

export interface SetupPopup {
  popupOptions: MapboxGl.PopupOptions;
  popupEvents: {
    open: EventEmitter<void>;
    close: EventEmitter<void>;
    popupOpen: EventEmitter<void>;
    popupClose: EventEmitter<void>;
  };
}

export interface SetupMarker {
  markersOptions: {
    pitchAlignment?: MapboxGl.MarkerOptions['pitchAlignment'];
    rotationAlignment?: MapboxGl.MarkerOptions['rotationAlignment'];
    offset?: MapboxGl.MarkerOptions['offset'];
    anchor?: MapboxGl.MarkerOptions['anchor'];
    draggable?: MapboxGl.MarkerOptions['draggable'];
    element: HTMLElement;
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: MapboxGl.LngLatLike;
    clickTolerance?: MapboxGl.MarkerOptions['clickTolerance'];
  };
  markersEvents: {
    markerDragStart: EventEmitter<MapboxGl.Marker>;
    markerDrag: EventEmitter<MapboxGl.Marker>;
    markerDragEnd: EventEmitter<MapboxGl.Marker>;
    dragStart: EventEmitter<MapboxGl.Marker>;
    drag: EventEmitter<MapboxGl.Marker>;
    dragEnd: EventEmitter<MapboxGl.Marker>;
  };
}

export type MovingOptions = MapboxGl.EasingOptions

@Injectable()
export class MapService {
  mapInstance: MapboxGl.Map;
  mapCreated$: Observable<void>;
  mapLoaded$: Observable<void>;
  mapEvents: NgxMapEvent;

  private mapCreated = new AsyncSubject<void>();
  private mapLoaded = new AsyncSubject<void>();
  private markersToRemove: MapboxGl.Marker[] = [];
  private popupsToRemove: MapboxGl.Popup[] = [];
  private imageIdsToRemove: string[] = [];
  private subscription = new Subscription();

  constructor(
    private zone: NgZone,
    @Optional()
    @Inject(MAPBOX_API_KEY)
    private readonly MAPBOX_API_KEY: string | null
  ) {
    this.mapCreated$ = this.mapCreated.asObservable();
    this.mapLoaded$ = this.mapLoaded.asObservable();
  }

  setup(options: SetupMap) {
    // Need onStable to wait for a potential @angular/route transition to end
    this.zone.onStable.pipe(first()).subscribe(() => {
      // Workaround rollup issue
      // this.assign(
      //   MapboxGl,
      //   'accessToken',
      //   options.accessToken || this.MAPBOX_API_KEY
      // );
      if (options.customMapboxApiUrl) {
        MapboxGl.default.baseApiUrl = options.customMapboxApiUrl;
      }
      this.createMap({
        ...(options.mapOptions as MapboxGl.MapOptions),
        accessToken: options.accessToken || this.MAPBOX_API_KEY || '',
      });
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
    });
  }

  destroyMap() {
    if (this.mapInstance) {
      this.subscription.unsubscribe();
      this.mapInstance.remove();
    }
  }

  updateProjection(projection: MapboxGl.MapboxOptions['projection']) {
    return this.zone.runOutsideAngular(() => {
      (this.mapInstance as any).setProjection(projection);
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

  updateStyle(style: MapboxGl.StyleSpecification) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setStyle(style);
    });
  }

  updateMaxBounds(maxBounds: MapboxGl.LngLatBoundsLike) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMaxBounds(maxBounds);
    });
  }

  changeCanvasCursor(cursor: string) {
    const canvas = this.mapInstance.getCanvasContainer();
    canvas.style.cursor = cursor;
  }

  queryRenderedFeatures(
    pointOrBox: MapboxGl.PointLike | [MapboxGl.PointLike, MapboxGl.PointLike],
    parameters?: { layers?: string[]; filter?: any[] }
  ): GeoJSON.Feature<GeoJSON.GeometryObject>[] {
    return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
  }

  panTo(center: MapboxGl.LngLatLike, options?: MapboxGl.AnimationOptions) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.panTo(center, options);
    });
  }

  move(
    movingMethod: 'jumpTo' | 'easeTo' | 'flyTo',
    movingOptions?: MovingOptions,
    zoom?: number,
    center?: MapboxGl.LngLatLike,
    bearing?: number,
    pitch?: number
  ) {
    return this.zone.runOutsideAngular(() => {
      (this.mapInstance[movingMethod] as any)({
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
        const tkey = key as keyof MapboxGl.LayerSpecification;
        if (layer.layerOptions[tkey] === undefined) {
          delete layer.layerOptions[tkey];
        }
      });
      this.mapInstance.addLayer(
        layer.layerOptions as MapboxGl.LayerSpecification,
        before
      );
      if (bindEvents) {
        if (
          layer.layerEvents.layerClick.observed ||
          layer.layerEvents.click.observed
        ) {
          this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerClick.emit(evt);
              layer.layerEvents.click.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerDblClick.observed ||
          layer.layerEvents.dblClick.observed
        ) {
          this.mapInstance.on('dblclick', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerDblClick.emit(evt);
              layer.layerEvents.dblClick.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerMouseDown.observed ||
          layer.layerEvents.mouseDown.observed
        ) {
          this.mapInstance.on('mousedown', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseDown.emit(evt);
              layer.layerEvents.mouseDown.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerMouseUp.observed ||
          layer.layerEvents.mouseUp.observed
        ) {
          this.mapInstance.on('mouseup', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseUp.emit(evt);
              layer.layerEvents.mouseUp.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerMouseEnter.observed ||
          layer.layerEvents.mouseEnter.observed
        ) {
          this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseEnter.emit(evt);
              layer.layerEvents.mouseEnter.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerMouseLeave.observed ||
          layer.layerEvents.mouseLeave.observed
        ) {
          this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseLeave.emit(evt);
              layer.layerEvents.mouseLeave.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerMouseMove.observed ||
          layer.layerEvents.mouseMove.observed
        ) {
          this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseMove.emit(evt);
              layer.layerEvents.mouseMove.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerMouseOver.observed ||
          layer.layerEvents.mouseOver.observed
        ) {
          this.mapInstance.on('mouseover', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseOver.emit(evt);
              layer.layerEvents.mouseOver.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerMouseOut.observed ||
          layer.layerEvents.mouseOut.observed
        ) {
          this.mapInstance.on('mouseout', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerMouseOut.emit(evt);
              layer.layerEvents.mouseOut.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerContextMenu.observed ||
          layer.layerEvents.contextMenu.observed
        ) {
          this.mapInstance.on('contextmenu', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerContextMenu.emit(evt);
              layer.layerEvents.contextMenu.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerTouchStart.observed ||
          layer.layerEvents.touchStart.observed
        ) {
          this.mapInstance.on('touchstart', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerTouchStart.emit(evt);
              layer.layerEvents.touchStart.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerTouchEnd.observed ||
          layer.layerEvents.touchEnd.observed
        ) {
          this.mapInstance.on('touchend', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerTouchEnd.emit(evt);
              layer.layerEvents.touchEnd.emit(evt);
            });
          });
        }
        if (
          layer.layerEvents.layerTouchCancel.observed ||
          layer.layerEvents.touchCancel.observed
        ) {
          this.mapInstance.on('touchcancel', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.layerTouchCancel.emit(evt);
              layer.layerEvents.touchCancel.emit(evt);
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
    const options: MapboxGl.MarkerOptions = {
      offset: marker.markersOptions.offset,
      anchor: marker.markersOptions.anchor,
      draggable: !!marker.markersOptions.draggable,
      rotationAlignment: marker.markersOptions.rotationAlignment,
      pitchAlignment: marker.markersOptions.pitchAlignment,
      clickTolerance: marker.markersOptions.clickTolerance,
    };
    if (marker.markersOptions.element.childNodes.length > 0) {
      options.element = marker.markersOptions.element;
    }
    const markerInstance = new MapboxGl.Marker(options);
    if (
      marker.markersEvents.markerDragStart.observed ||
      marker.markersEvents.dragStart.observed
    ) {
      markerInstance.on('dragstart', (event) => {
        if (event) {
          const { target } = event as { target: MapboxGl.Marker };
          this.zone.run(() => {
            marker.markersEvents.markerDragStart.emit(target);
            marker.markersEvents.dragStart.emit(target);
          });
        }
      });
    }
    /*

     */
    if (
      marker.markersEvents.markerDrag.observed ||
      marker.markersEvents.drag.observed
    ) {
      markerInstance.on('drag', (event) => {
        if (event) {
          const { target } = event as { target: MapboxGl.Marker };
          this.zone.run(() => {
            marker.markersEvents.markerDrag.emit(target);
            marker.markersEvents.drag.emit(target);
          });
        }
      });
    }
    if (
      marker.markersEvents.markerDragEnd.observed ||
      marker.markersEvents.dragEnd.observed
    ) {
      markerInstance.on('dragend', (event) => {
        if (event) {
          const { target } = event as { target: MapboxGl.Marker };
          this.zone.run(() => {
            marker.markersEvents.markerDragEnd.emit(target);
            marker.markersEvents.dragEnd.emit(target);
          });
        }
      });
    }
    const lngLat: MapboxGl.LngLatLike = marker.markersOptions.feature
      ? (marker.markersOptions.feature.geometry!.coordinates as [
          number,
          number
        ])
      : marker.markersOptions.lngLat!;
    markerInstance.setLngLat(lngLat);
    return this.zone.runOutsideAngular(() => {
      markerInstance.addTo(this.mapInstance);
      return markerInstance;
    });
  }

  removeMarker(marker: MapboxGl.Marker) {
    this.markersToRemove.push(marker);
  }

  createPopup(popup: SetupPopup, element: Node) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(popup.popupOptions).forEach(
        (key) =>
          (popup.popupOptions as any)[key] === undefined &&
          delete (popup.popupOptions as any)[key]
      );
      const popupInstance = new MapboxGl.Popup(popup.popupOptions);
      popupInstance.setDOMContent(element);
      if (
        popup.popupEvents.popupClose.observed ||
        popup.popupEvents.close.observed
      ) {
        popupInstance.on('close', () => {
          this.zone.run(() => {
            popup.popupEvents.popupClose.emit();
            popup.popupEvents.close.emit();
          });
        });
      }
      if (
        popup.popupEvents.popupOpen.observed ||
        popup.popupEvents.open.observed
      ) {
        popupInstance.on('open', () => {
          this.zone.run(() => {
            popup.popupEvents.popupOpen.emit();
            popup.popupEvents.open.emit();
          });
        });
      }
      return popupInstance;
    });
  }

  addPopupToMap(
    popup: MapboxGl.Popup,
    lngLat: MapboxGl.LngLatLike,
    skipOpenEvent = false
  ) {
    return this.zone.runOutsideAngular(() => {
      if (skipOpenEvent && (popup as any)._listeners) {
        delete (popup as any)._listeners['open'];
      }
      popup.setLngLat(lngLat);
      popup.addTo(this.mapInstance);
    });
  }

  addPopupToMarker(marker: MapboxGl.Marker, popup: MapboxGl.Popup) {
    return this.zone.runOutsideAngular(() => {
      marker.setPopup(popup);
    });
  }

  removePopupFromMap(popup: MapboxGl.Popup, skipCloseEvent = false) {
    if (skipCloseEvent && (popup as any)._listeners) {
      delete (popup as any)._listeners['close'];
    }
    this.popupsToRemove.push(popup);
  }

  removePopupFromMarker(marker: MapboxGl.Marker) {
    return this.zone.runOutsideAngular(() => {
      marker.setPopup(undefined);
    });
  }

  addControl(
    control: MapboxGl.IControl,
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.addControl(control as any, position);
    });
  }

  removeControl(control: MapboxGl.IControl) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.removeControl(control as any);
    });
  }

  async loadAndAddImage(
    imageId: string,
    url: string,
    options?: MapImageOptions
  ) {
    return this.zone.runOutsideAngular(
      () =>
        new Promise<void>((resolve, reject) => {
          this.mapInstance.loadImage(url, (error, image) => {
            if (error) {
              reject(error);
              return;
            }
            this.addImage(imageId, image as ImageBitmap, options);
            resolve();
          });
        })
    );
  }

  addImage(imageId: string, data: MapImageData, options?: MapImageOptions) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.addImage(imageId, data as any, options);
    });
  }

  removeImage(imageId: string) {
    this.imageIdsToRemove.push(imageId);
  }

  addSource(sourceId: string, source: MapboxGl.SourceSpecification) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(source).forEach(
        (key) =>
          (source as any)[key] === undefined && delete (source as any)[key]
      );
      this.mapInstance.addSource(sourceId, source);
    });
  }

  getSource<T extends MapboxGl.Source>(sourceId: string) {
    return this.mapInstance.getSource(sourceId) as T;
  }

  removeSource(sourceId: string) {
    this.zone.runOutsideAngular(() => {
      this.findLayersBySourceId(sourceId).forEach((layer) =>
        this.mapInstance.removeLayer(layer.id)
      );
      this.mapInstance.removeSource(sourceId);
    });
  }

  setAllLayerPaintProperty(
    layerId: string,
    paint: MapboxGl.PaintSpecification
  ) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(paint).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance.setPaintProperty(layerId, key as keyof MapboxGl.PaintSpecification, (paint as any)[key]);
      });
    });
  }

  setAllLayerLayoutProperty(
    layerId: string,
    layout: MapboxGl.LayoutSpecification
  ) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(layout).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance.setLayoutProperty(layerId, key as keyof MapboxGl.LayoutSpecification, (layout as any)[key]);
      });
    });
  }

  setLayerFilter(layerId: string, filter: any[]) {
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
        maxZoom ? maxZoom : 20
      );
    });
  }

  fitBounds(
    bounds: MapboxGl.LngLatBoundsLike,
    options?: MapboxGl.FitBoundsOptions
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.fitBounds(bounds, options);
    });
  }

  fitScreenCoordinates(
    points: [MapboxGl.PointLike, MapboxGl.PointLike],
    bearing: number,
    options?: MapboxGl.AnimationOptions & MapboxGl.CameraOptions
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.fitScreenCoordinates(
        points[0],
        points[1],
        bearing,
        options
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

  private createMap(optionsWithAccessToken: MapboxGl.MapOptions) {
    NgZone.assertNotInAngularZone();
    Object.keys(optionsWithAccessToken).forEach((key: string) => {
      const tkey = key as keyof MapboxGl.MapOptions;
      if (optionsWithAccessToken[tkey] === undefined) {
        delete optionsWithAccessToken[tkey];
      }
    });
    this.mapInstance = new MapboxGl.Map(optionsWithAccessToken);

    const isIEorEdge =
      window && /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIEorEdge) {
      this.mapInstance.setStyle(optionsWithAccessToken.style!);
    }

    this.subscription.add(
      this.zone.onMicrotaskEmpty.subscribe(() => this.applyChanges())
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

  private findLayersBySourceId(sourceId: string): MapboxGl.Layer[] {
    const layers = this.mapInstance.getStyle()?.layers;
    if (layers == null) {
      return [];
    }

    return layers.filter((l) =>
      'source' in l ? l.source === sourceId : false
    );
  }

  private hookEvents(events: NgxMapEvent) {
    this.mapInstance.on('load', (evt) => {
      this.mapLoaded.next(undefined);
      this.mapLoaded.complete();
      this.zone.run(() => {
        events.mapLoad.emit(evt);
        events.load.emit(evt.target);
      });
    });
    if (events.mapResize.observed || events.resize.observed) {
      this.mapInstance.on('resize', (evt) =>
        this.zone.run(() => {
          events.mapResize.emit(evt);
          events.resize.emit(evt);
        })
      );
    }
    if (events.mapRemove.observed || events.remove.observed) {
      this.mapInstance.on('remove', (evt) =>
        this.zone.run(() => {
          events.mapRemove.emit(evt);
          events.remove.emit(evt);
        })
      );
    }
    if (events.mapMouseDown.observed || events.mouseDown.observed) {
      this.mapInstance.on('mousedown', (evt) =>
        this.zone.run(() => {
          events.mapMouseDown.emit(evt);
          events.mouseDown.emit(evt);
        })
      );
    }
    if (events.mapMouseUp.observed || events.mouseUp.observed) {
      this.mapInstance.on('mouseup', (evt) =>
        this.zone.run(() => {
          events.mapMouseUp.emit(evt);
          events.mouseUp.emit(evt);
        })
      );
    }
    if (events.mapMouseMove.observed || events.mouseMove.observed) {
      this.mapInstance.on('mousemove', (evt) =>
        this.zone.run(() => {
          events.mapMouseMove.emit(evt);
          events.mouseMove.emit(evt);
        })
      );
    }
    if (events.mapClick.observed || events.click.observed) {
      this.mapInstance.on('click', (evt) =>
        this.zone.run(() => {
          events.mapClick.emit(evt);
          events.click.emit(evt);
        })
      );
    }
    if (events.mapDblClick.observed || events.dblClick.observed) {
      this.mapInstance.on('dblclick', (evt) =>
        this.zone.run(() => {
          events.mapDblClick.emit(evt);
          events.dblClick.emit(evt);
        })
      );
    }
    if (events.mapMouseOver.observed || events.mouseOver.observed) {
      this.mapInstance.on('mouseover', (evt) =>
        this.zone.run(() => {
          events.mapMouseOver.emit(evt);
          events.mouseOver.emit(evt);
        })
      );
    }
    if (events.mapMouseOut.observed || events.mouseOut.observed) {
      this.mapInstance.on('mouseout', (evt) =>
        this.zone.run(() => {
          events.mapMouseOut.emit(evt);
          events.mouseOut.emit(evt);
        })
      );
    }
    if (events.mapContextMenu.observed || events.contextMenu.observed) {
      this.mapInstance.on('contextmenu', (evt) =>
        this.zone.run(() => {
          events.mapContextMenu.emit(evt);
          events.contextMenu.emit(evt);
        })
      );
    }
    if (events.mapTouchStart.observed || events.touchStart.observed) {
      this.mapInstance.on('touchstart', (evt) =>
        this.zone.run(() => {
          events.mapTouchStart.emit(evt);
          events.touchStart.emit(evt);
        })
      );
    }
    if (events.mapTouchEnd.observed || events.touchEnd.observed) {
      this.mapInstance.on('touchend', (evt) =>
        this.zone.run(() => {
          events.mapTouchEnd.emit(evt);
          events.touchEnd.emit(evt);
        })
      );
    }
    if (events.mapTouchMove.observed || events.touchMove.observed) {
      this.mapInstance.on('touchmove', (evt) =>
        this.zone.run(() => {
          events.mapTouchMove.emit(evt);
          events.touchMove.emit(evt);
        })
      );
    }
    if (events.mapTouchCancel.observed || events.touchCancel.observed) {
      this.mapInstance.on('touchcancel', (evt) =>
        this.zone.run(() => {
          events.mapTouchCancel.emit(evt);
          events.touchCancel.emit(evt);
        })
      );
    }
    if (events.mapWheel.observed || events.wheel.observed) {
      this.mapInstance.on('wheel', (evt) =>
        this.zone.run(() => {
          events.mapWheel.emit(evt);
          events.wheel.emit(evt);
        })
      );
    }
    if (events.moveStart.observed) {
      this.mapInstance.on('movestart', (evt) =>
        this.zone.run(() => events.moveStart.emit(evt))
      );
    }
    if (events.move.observed) {
      this.mapInstance.on('move', (evt) =>
        this.zone.run(() => events.move.emit(evt))
      );
    }
    if (events.moveEnd.observed) {
      this.mapInstance.on('moveend', (evt) =>
        this.zone.run(() => events.moveEnd.emit(evt))
      );
    }
    if (events.mapDragStart.observed || events.dragStart.observed) {
      this.mapInstance.on('dragstart', (evt) =>
        this.zone.run(() => {
          events.mapDragStart.emit(evt);
          events.dragStart.emit(evt);
        })
      );
    }
    if (events.mapDrag.observed || events.drag.observed) {
      this.mapInstance.on('drag', (evt) =>
        this.zone.run(() => {
          events.mapDrag.emit(evt);
          events.drag.emit(evt);
        })
      );
    }
    if (events.mapDragEnd.observed || events.dragEnd.observed) {
      this.mapInstance.on('dragend', (evt) =>
        this.zone.run(() => {
          events.mapDragEnd.emit(evt);
          events.dragEnd.emit(evt);
        })
      );
    }
    if (events.zoomStart.observed) {
      this.mapInstance.on('zoomstart', (evt) =>
        this.zone.run(() => events.zoomStart.emit(evt))
      );
    }
    if (events.zoomEvt.observed) {
      this.mapInstance.on('zoom', (evt) =>
        this.zone.run(() => events.zoomEvt.emit(evt))
      );
    }
    if (events.zoomEnd.observed) {
      this.mapInstance.on('zoomend', (evt) =>
        this.zone.run(() => events.zoomEnd.emit(evt))
      );
    }
    if (events.rotateStart.observed) {
      this.mapInstance.on('rotatestart', (evt) =>
        this.zone.run(() => events.rotateStart.emit(evt))
      );
    }
    if (events.rotate.observed) {
      this.mapInstance.on('rotate', (evt) =>
        this.zone.run(() => events.rotate.emit(evt))
      );
    }
    if (events.rotateEnd.observed) {
      this.mapInstance.on('rotateend', (evt) =>
        this.zone.run(() => events.rotateEnd.emit(evt))
      );
    }
    if (events.pitchStart.observed) {
      this.mapInstance.on('pitchstart', (evt) =>
        this.zone.run(() => events.pitchStart.emit(evt))
      );
    }
    if (events.pitchEvt.observed) {
      this.mapInstance.on('pitch', (evt) =>
        this.zone.run(() => events.pitchEvt.emit(evt))
      );
    }
    if (events.pitchEnd.observed) {
      this.mapInstance.on('pitchend', (evt) =>
        this.zone.run(() => events.pitchEnd.emit(evt))
      );
    }
    if (events.boxZoomStart.observed) {
      this.mapInstance.on('boxzoomstart', (evt) =>
        this.zone.run(() => events.boxZoomStart.emit(evt))
      );
    }
    if (events.boxZoomEnd.observed) {
      this.mapInstance.on('boxzoomend', (evt) =>
        this.zone.run(() => events.boxZoomEnd.emit(evt))
      );
    }
    if (events.boxZoomCancel.observed) {
      this.mapInstance.on('boxzoomcancel', (evt) =>
        this.zone.run(() => events.boxZoomCancel.emit(evt))
      );
    }
    if (events.webGlContextLost.observed) {
      this.mapInstance.on('webglcontextlost', (evt) =>
        this.zone.run(() => events.webGlContextLost.emit(evt))
      );
    }
    if (events.webGlContextRestored.observed) {
      this.mapInstance.on('webglcontextrestored', (evt) =>
        this.zone.run(() => events.webGlContextRestored.emit(evt))
      );
    }
    if (events.render.observed) {
      this.mapInstance.on('render', (evt) =>
        this.zone.run(() => events.render.emit(evt))
      );
    }
    if (events.mapError.observed || events.error.observed) {
      this.mapInstance.on('error', (evt) =>
        this.zone.run(() => {
          events.mapError.emit(evt);
          events.error.emit(evt);
        })
      );
    }
    if (events.data.observed) {
      this.mapInstance.on('data', (evt) =>
        this.zone.run(() => events.data.emit(evt))
      );
    }
    if (events.styleData.observed) {
      this.mapInstance.on('styledata', (evt) =>
        this.zone.run(() => events.styleData.emit(evt))
      );
    }
    if (events.sourceData.observed) {
      this.mapInstance.on('sourcedata', (evt) =>
        this.zone.run(() => events.sourceData.emit(evt))
      );
    }
    if (events.dataLoading.observed) {
      this.mapInstance.on('dataloading', (evt) =>
        this.zone.run(() => events.dataLoading.emit(evt))
      );
    }
    if (events.styleDataLoading.observed) {
      this.mapInstance.on('styledataloading', (evt) =>
        this.zone.run(() => events.styleDataLoading.emit(evt))
      );
    }
    if (events.sourceDataLoading.observed) {
      this.mapInstance.on('sourcedataloading', (evt) =>
        this.zone.run(() => events.sourceDataLoading.emit(evt))
      );
    }
    if (events.styleImageMissing.observed) {
      this.mapInstance.on('styleimagemissing', (evt) =>
        this.zone.run(() => events.styleImageMissing.emit(evt))
      );
    }
    if (events.idle.observed) {
      this.mapInstance.on('idle', (evt) =>
        this.zone.run(() => events.idle.emit(evt))
      );
    }
  }

  // TODO move this elsewhere
  private assign(obj: any, prop: any, value: any) {
    if (typeof prop === 'string') {
      // eslint-disable-next-line no-param-reassign
      prop = prop.split('.');
    }
    if (prop.length > 1) {
      const e = prop.shift();
      this.assign(
        (obj[e] =
          Object.prototype.toString.call(obj[e]) === '[object Object]'
            ? obj[e]
            : {}),
        prop,
        value
      );
    } else {
      obj[prop[0]] = value;
    }
  }
}
