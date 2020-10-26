import { EventEmitter, Inject, Injectable, InjectionToken, NgZone, Optional } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { AsyncSubject, Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { LayerEvents, MapEvent, MapImageData, MapImageOptions } from './map.types';
import { Alignment } from 'mapbox-gl';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

export abstract class MglResizeEventEmitter {
  abstract resizeEvent: Observable<void>;
}

export interface SetupMap {
  accessToken?: string;
  customMapboxApiUrl?: string;
  mapOptions: Omit<MapboxGl.MapboxOptions, 'bearing' | 'pitch' | 'zoom'> & {
    bearing?: [number];
    pitch?: [number];
    zoom?: [number];
  };
  mapEvents: MapEvent;
}

export interface SetupLayer {
  layerOptions: MapboxGl.Layer;
  layerEvents: LayerEvents;
}

export interface SetupPopup {
  popupOptions: MapboxGl.PopupOptions;
  popupEvents: {
    open: EventEmitter<void>;
    close: EventEmitter<void>;
  };
}

export interface SetupMarker {
  markersOptions: {
    pitchAlignment?: Alignment;
    rotationAlignment?: Alignment;
    offset?: MapboxGl.PointLike;
    anchor?: MapboxGl.Anchor;
    draggable?: boolean;
    element: HTMLElement;
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: MapboxGl.LngLatLike;
  };
  markersEvents: {
    dragStart: EventEmitter<MapboxGl.Marker>;
    drag: EventEmitter<MapboxGl.Marker>;
    dragEnd: EventEmitter<MapboxGl.Marker>;
  };
}

export type MovingOptions =
  | MapboxGl.FlyToOptions
  | (MapboxGl.AnimationOptions & MapboxGl.CameraOptions)
  | MapboxGl.CameraOptions;

@Injectable()
export class MapService {
  mapInstance: MapboxGl.Map;
  mapCreated$: Observable<void>;
  mapLoaded$: Observable<void>;
  mapEvents: MapEvent;

  private mapCreated = new AsyncSubject<void>();
  private mapLoaded = new AsyncSubject<void>();
  private markersToRemove: MapboxGl.Marker[] = [];
  private popupsToRemove: MapboxGl.Popup[] = [];
  private imageIdsToRemove: string[] = [];
  private subscription = new Subscription();

  constructor(
    private zone: NgZone,
    @Optional() @Inject(MAPBOX_API_KEY) private readonly MAPBOX_API_KEY: string,
    @Optional() private readonly MglResizeEventEmitter: MglResizeEventEmitter
  ) {
    this.mapCreated$ = this.mapCreated.asObservable();
    this.mapLoaded$ = this.mapLoaded.asObservable();
  }

  setup(options: SetupMap) {
    // Need onStable to wait for a potential @angular/route transition to end
    this.zone.onStable.pipe(first()).subscribe(() => {
      // Workaround rollup issue
      this.assign(MapboxGl, 'accessToken', options.accessToken || this.MAPBOX_API_KEY);
      if (options.customMapboxApiUrl) {
        this.assign(MapboxGl, 'config.API_URL', options.customMapboxApiUrl);
      }
      this.createMap(options.mapOptions as MapboxGl.MapboxOptions);
      this.hookEvents(options.mapEvents);
      this.mapEvents = options.mapEvents;
      this.mapCreated.next(undefined);
      this.mapCreated.complete();
    });
  }

  destroyMap() {
    if (this.mapInstance) {
      this.subscription.unsubscribe();
      this.mapInstance.remove();
    }
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
      status ? this.mapInstance.scrollZoom.enable() : this.mapInstance.scrollZoom.disable();
    });
  }

  updateDragRotate(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status ? this.mapInstance.dragRotate.enable() : this.mapInstance.dragRotate.disable();
    });
  }

  updateTouchPitch(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status ? this.mapInstance.touchPitch.enable() : this.mapInstance.touchPitch.disable();
    });
  }

  updateTouchZoomRotate(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status ? this.mapInstance.touchZoomRotate.enable() : this.mapInstance.touchZoomRotate.disable();
    });
  }

  updateDoubleClickZoom(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status ? this.mapInstance.doubleClickZoom.enable() : this.mapInstance.doubleClickZoom.disable();
    });
  }

  updateKeyboard(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status ? this.mapInstance.keyboard.enable() : this.mapInstance.keyboard.disable();
    });
  }

  updateDragPan(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status ? this.mapInstance.dragPan.enable() : this.mapInstance.dragPan.disable();
    });
  }

  updateBoxZoom(status: boolean) {
    return this.zone.runOutsideAngular(() => {
      status ? this.mapInstance.boxZoom.enable() : this.mapInstance.boxZoom.disable();
    });
  }

  updateStyle(style: MapboxGl.Style) {
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
    pointOrBox?: MapboxGl.PointLike | [MapboxGl.PointLike, MapboxGl.PointLike],
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
      (<any>this.mapInstance[movingMethod])({
        ...movingOptions,
        zoom: zoom ? zoom : this.mapInstance.getZoom(),
        center: center ? center : this.mapInstance.getCenter(),
        bearing: bearing ? bearing : this.mapInstance.getBearing(),
        pitch: pitch ? pitch : this.mapInstance.getPitch(),
      });
    });
  }

  addLayer(layer: SetupLayer, bindEvents: boolean, before?: string) {
    this.zone.runOutsideAngular(() => {
      Object.keys(layer.layerOptions).forEach((key: string) => {
        const tkey = <keyof MapboxGl.Layer>key;
        if (layer.layerOptions[tkey] === undefined) {
          delete layer.layerOptions[tkey];
        }
      });
      this.mapInstance.addLayer(layer.layerOptions, before);
      if (bindEvents) {
        if (layer.layerEvents.click.observers.length) {
          this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.click.emit(evt);
            });
          });
        }
        if (layer.layerEvents.dblClick.observers.length) {
          this.mapInstance.on('dblclick', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.dblClick.emit(evt);
            });
          });
        }
        if (layer.layerEvents.mouseDown.observers.length) {
          this.mapInstance.on('mousedown', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.mouseDown.emit(evt);
            });
          });
        }
        if (layer.layerEvents.mouseUp.observers.length) {
          this.mapInstance.on('mouseup', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.mouseUp.emit(evt);
            });
          });
        }
        if (layer.layerEvents.mouseEnter.observers.length) {
          this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.mouseEnter.emit(evt);
            });
          });
        }
        if (layer.layerEvents.mouseLeave.observers.length) {
          this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.mouseLeave.emit(evt);
            });
          });
        }
        if (layer.layerEvents.mouseMove.observers.length) {
          this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.mouseMove.emit(evt);
            });
          });
        }
        if (layer.layerEvents.mouseOver.observers.length) {
          this.mapInstance.on('mouseover', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.mouseOver.emit(evt);
            });
          });
        }
        if (layer.layerEvents.mouseOut.observers.length) {
          this.mapInstance.on('mouseout', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.mouseOut.emit(evt);
            });
          });
        }
        if (layer.layerEvents.contextMenu.observers.length) {
          this.mapInstance.on('contextmenu', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.contextMenu.emit(evt);
            });
          });
        }
        if (layer.layerEvents.touchStart.observers.length) {
          this.mapInstance.on('touchstart', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.touchStart.emit(evt);
            });
          });
        }
        if (layer.layerEvents.touchEnd.observers.length) {
          this.mapInstance.on('touchend', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
              layer.layerEvents.touchEnd.emit(evt);
            });
          });
        }
        if (layer.layerEvents.touchCancel.observers.length) {
          this.mapInstance.on('touchcancel', layer.layerOptions.id, (evt) => {
            this.zone.run(() => {
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
    };
    if (marker.markersOptions.element.childNodes.length > 0) {
      options.element = marker.markersOptions.element;
    }
    const markerInstance = new MapboxGl.Marker(options);
    if (marker.markersEvents.dragStart.observers.length) {
      markerInstance.on('dragstart', (event: { target: MapboxGl.Marker }) =>
        this.zone.run(() => marker.markersEvents.dragStart.emit(event.target))
      );
    }
    if (marker.markersEvents.drag.observers.length) {
      markerInstance.on('drag', (event: { target: MapboxGl.Marker }) =>
        this.zone.run(() => marker.markersEvents.drag.emit(event.target))
      );
    }
    if (marker.markersEvents.dragEnd.observers.length) {
      markerInstance.on('dragend', (event: { target: MapboxGl.Marker }) =>
        this.zone.run(() => marker.markersEvents.dragEnd.emit(event.target))
      );
    }
    const lngLat: MapboxGl.LngLatLike = marker.markersOptions.feature
      ? <[number, number]>marker.markersOptions.feature.geometry!.coordinates
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
        (key) => (<any>popup.popupOptions)[key] === undefined && delete (<any>popup.popupOptions)[key]
      );
      const popupInstance = new MapboxGl.Popup(popup.popupOptions);
      popupInstance.setDOMContent(element);
      if (popup.popupEvents.close.observers.length) {
        popupInstance.on('close', () => {
          this.zone.run(() => {
            popup.popupEvents.close.emit();
          });
        });
      }
      if (popup.popupEvents.open.observers.length) {
        popupInstance.on('open', () => {
          this.zone.run(() => {
            popup.popupEvents.open.emit();
          });
        });
      }
      return popupInstance;
    });
  }

  addPopupToMap(popup: MapboxGl.Popup, lngLat: MapboxGl.LngLatLike, skipOpenEvent = false) {
    return this.zone.runOutsideAngular(() => {
      if (skipOpenEvent && (<any>popup)._listeners) {
        delete (<any>popup)._listeners['open'];
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
    if (skipCloseEvent && (<any>popup)._listeners) {
      delete (<any>popup)._listeners['close'];
    }
    this.popupsToRemove.push(popup);
  }

  removePopupFromMarker(marker: MapboxGl.Marker) {
    return this.zone.runOutsideAngular(() => {
      marker.setPopup(undefined);
    });
  }

  addControl(
    control: MapboxGl.Control | MapboxGl.IControl,
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  ) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.addControl(<any>control, position);
    });
  }

  removeControl(control: MapboxGl.Control | MapboxGl.IControl) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.removeControl(<any>control);
    });
  }

  async loadAndAddImage(imageId: string, url: string, options?: MapImageOptions) {
    return this.zone.runOutsideAngular(() => {
      return new Promise((resolve, reject) => {
        this.mapInstance.loadImage(url, (error: { status: number } | null, image: ImageData) => {
          if (error) {
            reject(error);
            return;
          }
          this.addImage(imageId, image, options);
          resolve();
        });
      });
    });
  }

  addImage(imageId: string, data: MapImageData, options?: MapImageOptions) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.addImage(imageId, <any>data, options);
    });
  }

  removeImage(imageId: string) {
    this.imageIdsToRemove.push(imageId);
  }

  addSource(sourceId: string, source: MapboxGl.AnySourceData) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(source).forEach((key) => (<any>source)[key] === undefined && delete (<any>source)[key]);
      this.mapInstance.addSource(sourceId, source);
    });
  }

  getSource<T extends MapboxGl.AnySourceImpl>(sourceId: string) {
    return <T>this.mapInstance.getSource(sourceId);
  }

  removeSource(sourceId: string) {
    this.zone.runOutsideAngular(() => {
      this.findLayersBySourceId(sourceId).forEach((layer) => this.mapInstance.removeLayer(layer.id));
      this.mapInstance.removeSource(sourceId);
    });
  }

  setAllLayerPaintProperty(
    layerId: string,
    paint:
      | MapboxGl.BackgroundPaint
      | MapboxGl.FillPaint
      | MapboxGl.FillExtrusionPaint
      | MapboxGl.LinePaint
      | MapboxGl.SymbolPaint
      | MapboxGl.RasterPaint
      | MapboxGl.CirclePaint
  ) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(paint).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance.setPaintProperty(layerId, key, (<any>paint)[key]);
      });
    });
  }

  setAllLayerLayoutProperty(
    layerId: string,
    layout:
      | MapboxGl.BackgroundLayout
      | MapboxGl.FillLayout
      | MapboxGl.FillExtrusionLayout
      | MapboxGl.LineLayout
      | MapboxGl.SymbolLayout
      | MapboxGl.RasterLayout
      | MapboxGl.CircleLayout
  ) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(layout).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance.setLayoutProperty(layerId, key, (<any>layout)[key]);
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
      this.mapInstance.setLayerZoomRange(layerId, minZoom ? minZoom : 0, maxZoom ? maxZoom : 20);
    });
  }

  fitBounds(bounds: MapboxGl.LngLatBoundsLike, options?: MapboxGl.FitBoundsOptions) {
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
      this.mapInstance.fitScreenCoordinates(points[0], points[1], bearing, options);
    });
  }

  applyChanges() {
    this.zone.runOutsideAngular(() => {
      this.removeMarkers();
      this.removePopups();
      this.removeImages();
    });
  }

  private createMap(options: MapboxGl.MapboxOptions) {
    NgZone.assertNotInAngularZone();
    Object.keys(options).forEach((key: string) => {
      const tkey = <keyof MapboxGl.MapboxOptions>key;
      if (options[tkey] === undefined) {
        delete options[tkey];
      }
    });
    this.mapInstance = new MapboxGl.Map(options);

    const isIEorEdge = window && /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (isIEorEdge) {
      this.mapInstance.setStyle(options.style!);
    }

    const subChanges = this.zone.onMicrotaskEmpty.subscribe(() => this.applyChanges());
    if (this.MglResizeEventEmitter) {
      const subResize = this.MglResizeEventEmitter.resizeEvent.subscribe(() => {
        this.mapInstance.resize();
      });
      this.subscription.add(subResize);
    }
    this.subscription.add(subChanges);
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
    const layers = this.mapInstance.getStyle().layers;
    if (layers == null) {
      return [];
    }

    return layers.filter((l) => l.source === sourceId);
  }

  private hookEvents(events: MapEvent) {
    this.mapInstance.on('load', (evt) => {
      this.mapLoaded.next(undefined);
      this.mapLoaded.complete();
      this.zone.run(() => events.load.emit(evt.target));
    });
    if (events.resize.observers.length) {
      this.mapInstance.on('resize', (evt) => this.zone.run(() => events.resize.emit(evt)));
    }
    if (events.remove.observers.length) {
      this.mapInstance.on('remove', (evt) => this.zone.run(() => events.remove.emit(evt)));
    }
    if (events.mouseDown.observers.length) {
      this.mapInstance.on('mousedown', (evt) => this.zone.run(() => events.mouseDown.emit(evt)));
    }
    if (events.mouseUp.observers.length) {
      this.mapInstance.on('mouseup', (evt) => this.zone.run(() => events.mouseUp.emit(evt)));
    }
    if (events.mouseMove.observers.length) {
      this.mapInstance.on('mousemove', (evt) => this.zone.run(() => events.mouseMove.emit(evt)));
    }
    if (events.click.observers.length) {
      this.mapInstance.on('click', (evt) => this.zone.run(() => events.click.emit(evt)));
    }
    if (events.dblClick.observers.length) {
      this.mapInstance.on('dblclick', (evt) => this.zone.run(() => events.dblClick.emit(evt)));
    }
    if (events.mouseOver.observers.length) {
      this.mapInstance.on('mouseover', (evt) => this.zone.run(() => events.mouseOver.emit(evt)));
    }
    if (events.mouseOut.observers.length) {
      this.mapInstance.on('mouseout', (evt) => this.zone.run(() => events.mouseOut.emit(evt)));
    }
    if (events.contextMenu.observers.length) {
      this.mapInstance.on('contextmenu', (evt) => this.zone.run(() => events.contextMenu.emit(evt)));
    }
    if (events.touchStart.observers.length) {
      this.mapInstance.on('touchstart', (evt) => this.zone.run(() => events.touchStart.emit(evt)));
    }
    if (events.touchEnd.observers.length) {
      this.mapInstance.on('touchend', (evt) => this.zone.run(() => events.touchEnd.emit(evt)));
    }
    if (events.touchMove.observers.length) {
      this.mapInstance.on('touchmove', (evt) => this.zone.run(() => events.touchMove.emit(evt)));
    }
    if (events.touchCancel.observers.length) {
      this.mapInstance.on('touchcancel', (evt) => this.zone.run(() => events.touchCancel.emit(evt)));
    }
    if (events.wheel.observers.length) {
      this.mapInstance.on('wheel', (evt) => this.zone.run(() => events.wheel.emit(evt)));
    }
    if (events.moveStart.observers.length) {
      this.mapInstance.on('movestart', (evt) => this.zone.run(() => events.moveStart.emit(evt)));
    }
    if (events.move.observers.length) {
      this.mapInstance.on('move', (evt) => this.zone.run(() => events.move.emit(evt)));
    }
    if (events.moveEnd.observers.length) {
      this.mapInstance.on('moveend', (evt) => this.zone.run(() => events.moveEnd.emit(evt)));
    }
    if (events.dragStart.observers.length) {
      this.mapInstance.on('dragstart', (evt) => this.zone.run(() => events.dragStart.emit(evt)));
    }
    if (events.drag.observers.length) {
      this.mapInstance.on('drag', (evt) => this.zone.run(() => events.drag.emit(evt)));
    }
    if (events.dragEnd.observers.length) {
      this.mapInstance.on('dragend', (evt) => this.zone.run(() => events.dragEnd.emit(evt)));
    }
    if (events.zoomStart.observers.length) {
      this.mapInstance.on('zoomstart', (evt) => this.zone.run(() => events.zoomStart.emit(evt)));
    }
    if (events.zoomEvt.observers.length) {
      this.mapInstance.on('zoom', (evt) => this.zone.run(() => events.zoomEvt.emit(evt)));
    }
    if (events.zoomEnd.observers.length) {
      this.mapInstance.on('zoomend', (evt) => this.zone.run(() => events.zoomEnd.emit(evt)));
    }
    if (events.rotateStart.observers.length) {
      this.mapInstance.on('rotatestart', (evt) => this.zone.run(() => events.rotateStart.emit(evt)));
    }
    if (events.rotate.observers.length) {
      this.mapInstance.on('rotate', (evt) => this.zone.run(() => events.rotate.emit(evt)));
    }
    if (events.rotateEnd.observers.length) {
      this.mapInstance.on('rotateend', (evt) => this.zone.run(() => events.rotateEnd.emit(evt)));
    }
    if (events.pitchStart.observers.length) {
      this.mapInstance.on('pitchstart', (evt) => this.zone.run(() => events.pitchStart.emit(evt)));
    }
    if (events.pitchEvt.observers.length) {
      this.mapInstance.on('pitch', (evt) => this.zone.run(() => events.pitchEvt.emit(evt)));
    }
    if (events.pitchEnd.observers.length) {
      this.mapInstance.on('pitchend', (evt) => this.zone.run(() => events.pitchEnd.emit(evt)));
    }
    if (events.boxZoomStart.observers.length) {
      this.mapInstance.on('boxzoomstart', (evt) => this.zone.run(() => events.boxZoomStart.emit(evt)));
    }
    if (events.boxZoomEnd.observers.length) {
      this.mapInstance.on('boxzoomend', (evt) => this.zone.run(() => events.boxZoomEnd.emit(evt)));
    }
    if (events.boxZoomCancel.observers.length) {
      this.mapInstance.on('boxzoomcancel', (evt) => this.zone.run(() => events.boxZoomCancel.emit(evt)));
    }
    if (events.webGlContextLost.observers.length) {
      this.mapInstance.on('webglcontextlost', (evt) => this.zone.run(() => events.webGlContextLost.emit(evt)));
    }
    if (events.webGlContextRestored.observers.length) {
      this.mapInstance.on('webglcontextrestored', (evt) => this.zone.run(() => events.webGlContextRestored.emit(evt)));
    }
    if (events.render.observers.length) {
      this.mapInstance.on('render', (evt) => this.zone.run(() => events.render.emit(evt)));
    }
    if (events.error.observers.length) {
      this.mapInstance.on('error', (evt) => this.zone.run(() => events.error.emit(evt)));
    }
    if (events.data.observers.length) {
      this.mapInstance.on('data', (evt) => this.zone.run(() => events.data.emit(evt)));
    }
    if (events.styleData.observers.length) {
      this.mapInstance.on('styledata', (evt) => this.zone.run(() => events.styleData.emit(evt)));
    }
    if (events.sourceData.observers.length) {
      this.mapInstance.on('sourcedata', (evt) => this.zone.run(() => events.sourceData.emit(evt)));
    }
    if (events.dataLoading.observers.length) {
      this.mapInstance.on('dataloading', (evt) => this.zone.run(() => events.dataLoading.emit(evt)));
    }
    if (events.styleDataLoading.observers.length) {
      this.mapInstance.on('styledataloading', (evt) => this.zone.run(() => events.styleDataLoading.emit(evt)));
    }
    if (events.sourceDataLoading.observers.length) {
      this.mapInstance.on('sourcedataloading', (evt) => this.zone.run(() => events.sourceDataLoading.emit(evt)));
    }
    if (events.styleImageMissing.observers.length) {
      this.mapInstance.on('styleimagemissing', (evt) => this.zone.run(() => events.styleImageMissing.emit(evt)));
    }
    if (events.idle.observers.length) {
      this.mapInstance.on('idle', (evt) => this.zone.run(() => events.idle.emit(evt)));
    }
  }

  // TODO move this elsewhere
  private assign(obj: any, prop: any, value: any) {
    if (typeof prop === 'string') {
      // tslint:disable-next-line:no-parameter-reassignment
      prop = prop.split('.');
    }
    if (prop.length > 1) {
      const e = prop.shift();
      this.assign((obj[e] = Object.prototype.toString.call(obj[e]) === '[object Object]' ? obj[e] : {}), prop, value);
    } else {
      obj[prop[0]] = value;
    }
  }
}
