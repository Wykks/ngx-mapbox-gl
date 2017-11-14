import { AsyncSubject } from 'rxjs/AsyncSubject';
import { EventEmitter, Inject, Injectable, InjectionToken, NgZone, Optional } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { MapEvent, MapImageData, MapImageOptions } from './map.types';
import { Observable } from 'rxjs/Observable';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

export interface SetupMap {
  accessToken?: string;
  customMapboxApiUrl?: string;
  mapOptions: MapboxGl.MapboxOptions;
  mapEvents: MapEvent;
}

export interface SetupLayer {
  layerOptions: MapboxGl.Layer;
  layerEvents: {
    click: EventEmitter<MapboxGl.MapMouseEvent>;
    mouseEnter: EventEmitter<MapboxGl.MapMouseEvent>;
    mouseLeave: EventEmitter<MapboxGl.MapMouseEvent>;
    mouseMove: EventEmitter<MapboxGl.MapMouseEvent>;
  };
}

export type AllSource = MapboxGl.VectorSource |
  MapboxGl.RasterSource |
  MapboxGl.GeoJSONSource |
  MapboxGl.ImageSourceOptions |
  MapboxGl.VideoSource |
  MapboxGl.GeoJSONSourceRaw |
  MapboxGl.CanvasSourceOptions;

@Injectable()
export class MapService {
  mapInstance: MapboxGl.Map;
  mapCreated$: Observable<void>;
  mapLoaded$: Observable<void>;
  mapEvents: MapEvent;

  private mapCreated = new AsyncSubject<void>();
  private mapLoaded = new AsyncSubject<void>();

  constructor(
    private zone: NgZone,
    @Optional() @Inject(MAPBOX_API_KEY) private readonly MAPBOX_API_KEY: string
  ) {
    this.mapCreated$ = this.mapCreated.asObservable();
    this.mapLoaded$ = this.mapLoaded.asObservable();
  }

  setup(options: SetupMap) {
    return this.zone.runOutsideAngular(() => {
      // Workaround rollup issue
      this.assign(MapboxGl, 'accessToken', options.accessToken || this.MAPBOX_API_KEY);
      if (options.customMapboxApiUrl) {
        this.assign(MapboxGl, 'config.API_URL', options.customMapboxApiUrl);
      }
      this.createMap(options.mapOptions);
      this.hookEvents(options.mapEvents);
      this.mapEvents = options.mapEvents;
      this.mapCreated.next(undefined);
      this.mapCreated.complete();
      return this.mapInstance;
    });
  }

  destroyMap() {
    this.mapInstance.remove();
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
    // TODO Probably not so simple, write demo/tests
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setStyle(style);
    });
  }

  updateMaxBounds(maxBounds: MapboxGl.LngLatBoundsLike) {
    // TODO Probably not so simple, write demo/tests
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.setMaxBounds(maxBounds);
    });
  }

  changeCanvasCursor(cursor: string) {
    const canvas = this.mapInstance.getCanvasContainer();
    canvas.style.cursor = cursor;
  }

  queryRenderedFeatures(
    pointOrBox?: MapboxGl.PointLike | MapboxGl.PointLike[],
    parameters?: { layers?: string[], filter?: any[] }
  ) {
    return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
  }

  panTo(center: MapboxGl.LngLatLike) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.panTo(center);
    });
  }

  move(
    movingMethod: 'jumpTo' | 'easeTo' | 'flyTo',
    flyToOptions?: MapboxGl.FlyToOptions,
    zoom?: number,
    center?: MapboxGl.LngLatLike,
    bearing?: number,
    pitch?: number
  ) {
    return this.zone.runOutsideAngular(() => {
      (<any>this.mapInstance[movingMethod])({
        ...flyToOptions,
        zoom: zoom ? zoom : this.mapInstance.getZoom(),
        center: center ? center : this.mapInstance.getCenter(),
        bearing: bearing ? bearing : this.mapInstance.getBearing(),
        pitch: pitch ? pitch : this.mapInstance.getPitch()
      });
    });
  }

  addLayer(layer: SetupLayer, before?: string) {
    this.zone.runOutsideAngular(() => {
      Object.keys(layer.layerOptions)
        .forEach((key: keyof MapboxGl.Layer) =>
          layer.layerOptions[key] === undefined && delete layer.layerOptions[key]);
      this.mapInstance.addLayer(layer.layerOptions, before);
      this.mapInstance.on('click', layer.layerOptions.id, (evt: MapboxGl.MapMouseEvent) => {
        this.zone.run(() => {
          layer.layerEvents.click.emit(evt);
        });
      });
      this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt: MapboxGl.MapMouseEvent) => {
        this.zone.run(() => {
          layer.layerEvents.mouseEnter.emit(evt);
        });
      });
      this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt: MapboxGl.MapMouseEvent) => {
        this.zone.run(() => {
          layer.layerEvents.mouseLeave.emit(evt);
        });
      });
      this.mapInstance.on('mousemove', layer.layerOptions.id, (evt: MapboxGl.MapMouseEvent) => {
        this.zone.run(() => {
          layer.layerEvents.mouseMove.emit(evt);
        });
      });
    });
  }

  removeLayer(layerId: string) {
    return this.zone.runOutsideAngular(() => {
      // TEST THIS
      this.mapInstance.off('click', layerId);
      this.mapInstance.off('mouseenter', layerId);
      this.mapInstance.off('mouseleave', layerId);
      this.mapInstance.off('mousemove', layerId);
      this.mapInstance.removeLayer(layerId);
    });
  }

  addMarker(marker: MapboxGl.Marker) {
    return this.zone.runOutsideAngular(() => {
      marker.addTo(this.mapInstance);
    });
  }

  removeMarker(marker: MapboxGl.Marker) {
    return this.zone.runOutsideAngular(() => {
      marker.remove();
    });
  }

  addPopup(popup: MapboxGl.Popup) {
    return this.zone.runOutsideAngular(() => {
      popup.addTo(this.mapInstance);
    });
  }

  removePopup(popup: MapboxGl.Popup) {
    return this.zone.runOutsideAngular(() => {
      popup.remove();
    });
  }

  addControl(control: MapboxGl.Control | MapboxGl.IControl, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left') {
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
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.removeImage(imageId);
    });
  }

  addSource(sourceId: string, source: AllSource) {
    return this.zone.runOutsideAngular(() => {
      Object.keys(source)
        .forEach((key) =>
          (<any>source)[key] === undefined && delete (<any>source)[key]);
      this.mapInstance.addSource(sourceId, <any>source); // Typings issue
    });
  }

  getSource<T>(sourceId: string) {
    return <T><any>this.mapInstance.getSource(sourceId);
  }

  removeSource(sourceId: string) {
    return this.zone.runOutsideAngular(() => {
      this.mapInstance.removeSource(sourceId);
    });
  }

  setAllLayerPaintProperty(
    layerId: string,
    paint: MapboxGl.BackgroundPaint | MapboxGl.FillPaint | MapboxGl.FillExtrusionPaint | MapboxGl.LinePaint | MapboxGl.SymbolPaint | MapboxGl.RasterPaint | MapboxGl.CirclePaint
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
    layout: MapboxGl.BackgroundLayout | MapboxGl.FillLayout | MapboxGl.FillExtrusionLayout | MapboxGl.LineLayout | MapboxGl.SymbolLayout | MapboxGl.RasterLayout | MapboxGl.CircleLayout
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

  private createMap(options: MapboxGl.MapboxOptions) {
    Object.keys(options)
      .forEach((key: keyof MapboxGl.MapboxOptions) =>
        options[key] === undefined && delete options[key]);
    this.mapInstance = new MapboxGl.Map(options);
  }

  private hookEvents(events: MapEvent) {
    this.mapInstance.on('load', () => {
      this.mapLoaded.next(undefined);
      this.mapLoaded.complete();
      this.zone.run(() => events.load.emit(this.mapInstance));
    });
    this.mapInstance.on('resize', () => this.zone.run(() => events.resize.emit()));
    this.mapInstance.on('remove', () => this.zone.run(() => events.remove.emit()));
    this.mapInstance.on('mousedown', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.mouseDown.emit(evt)));
    this.mapInstance.on('mouseup', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.mouseUp.emit(evt)));
    this.mapInstance.on('mousemove', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.mouseMove.emit(evt)));
    this.mapInstance.on('click', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.click.emit(evt)));
    this.mapInstance.on('dblclick', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.dblClick.emit(evt)));
    this.mapInstance.on('mouseenter', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.mouseEnter.emit(evt)));
    this.mapInstance.on('mouseleave', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.mouseLeave.emit(evt)));
    this.mapInstance.on('mouseover', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.mouseOver.emit(evt)));
    this.mapInstance.on('mouseout', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.mouseOut.emit(evt)));
    this.mapInstance.on('contextmenu', (evt: MapboxGl.MapMouseEvent) => this.zone.run(() => events.contextMenu.emit(evt)));
    this.mapInstance.on('touchstart', (evt: MapboxGl.MapTouchEvent) => this.zone.run(() => events.touchStart.emit(evt)));
    this.mapInstance.on('touchend', (evt: MapboxGl.MapTouchEvent) => this.zone.run(() => events.touchEnd.emit(evt)));
    this.mapInstance.on('touchmove', (evt: MapboxGl.MapTouchEvent) => this.zone.run(() => events.touchMove.emit(evt)));
    this.mapInstance.on('touchcancel', (evt: MapboxGl.MapTouchEvent) => this.zone.run(() => events.touchCancel.emit(evt)));
    this.mapInstance.on('movestart', (evt: DragEvent) => this.zone.run(() => events.moveStart.emit(evt)));
    this.mapInstance.on('move', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => this.zone.run(() => events.move.emit(evt)));
    this.mapInstance.on('moveend', (evt: DragEvent) => this.zone.run(() => events.moveEnd.emit(evt)));
    this.mapInstance.on('dragstart', (evt: DragEvent) => this.zone.run(() => events.dragStart.emit(evt)));
    this.mapInstance.on('drag', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => this.zone.run(() => events.drag.emit(evt)));
    this.mapInstance.on('dragend', (evt: DragEvent) => this.zone.run(() => events.dragEnd.emit(evt)));
    this.mapInstance.on('zoomstart', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => this.zone.run(() => events.zoomStart.emit(evt)));
    this.mapInstance.on('zoom', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => this.zone.run(() => events.zoomChange.emit(evt)));
    this.mapInstance.on('zoomend', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => this.zone.run(() => events.zoomEnd.emit(evt)));
    this.mapInstance.on('rotatestart', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => this.zone.run(() => events.rotateStart.emit(evt)));
    this.mapInstance.on('rotate', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => this.zone.run(() => events.rotate.emit(evt)));
    this.mapInstance.on('rotateend', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => this.zone.run(() => events.rotateEnd.emit(evt)));
    this.mapInstance.on('pitchstart', (evt: MapboxGl.EventData) => this.zone.run(() => events.pitchStart.emit(evt)));
    this.mapInstance.on('pitch', (evt: MapboxGl.EventData) => this.zone.run(() => events.pitchChange.emit(evt)));
    this.mapInstance.on('pitchend', (evt: MapboxGl.EventData) => this.zone.run(() => events.pitchEnd.emit(evt)));
    this.mapInstance.on('boxzoomstart', (evt: MapboxGl.MapBoxZoomEvent) => this.zone.run(() => events.boxZoomStart.emit(evt)));
    this.mapInstance.on('boxzoomend', (evt: MapboxGl.MapBoxZoomEvent) => this.zone.run(() => events.boxZoomEnd.emit(evt)));
    this.mapInstance.on('boxzoomcancel', (evt: MapboxGl.MapBoxZoomEvent) => this.zone.run(() => events.boxZoomCancel.emit(evt)));
    this.mapInstance.on('webglcontextlost', () => this.zone.run(() => events.webGlContextLost.emit()));
    this.mapInstance.on('webglcontextrestored', () => this.zone.run(() => events.webGlContextRestored.emit()));
    this.mapInstance.on('render', () => this.zone.run(() => events.render.emit()));
    this.mapInstance.on('error', () => this.zone.run(() => events.error.emit()));
    this.mapInstance.on('data', (evt: MapboxGl.EventData) => this.zone.run(() => events.data.emit(evt)));
    this.mapInstance.on('styledata', (evt: MapboxGl.EventData) => this.zone.run(() => events.styleData.emit(evt)));
    this.mapInstance.on('sourcedata', (evt: MapboxGl.EventData) => this.zone.run(() => events.sourceData.emit(evt)));
    this.mapInstance.on('dataloading', (evt: MapboxGl.EventData) => this.zone.run(() => events.dataLoading.emit(evt)));
    this.mapInstance.on('styledataloading', (evt: MapboxGl.EventData) => this.zone.run(() => events.styleDataLoading.emit(evt)));
    this.mapInstance.on('sourcedataloading', (evt: MapboxGl.EventData) => this.zone.run(() => events.sourceDataLoading.emit(evt)));
  }

  // TODO move this elsewhere
  private assign(obj: any, prop: any, value: any) {
    if (typeof prop === 'string') {
      // tslint:disable-next-line:no-parameter-reassignment
      prop = prop.split('.');
    }
    if (prop.length > 1) {
      const e = prop.shift();
      this.assign(obj[e] =
        Object.prototype.toString.call(obj[e]) === '[object Object]'
          ? obj[e]
          : {},
        prop,
        value);
    } else {
      obj[prop[0]] = value;
    }
  }
}
