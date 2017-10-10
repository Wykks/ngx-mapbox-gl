import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { MapEvent, MapImageData, MapImageOptions } from './map.types';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

export interface SetupOptions {
  accessToken?: string;
  customMapboxApiUrl?: string;
  mapOptions: MapboxGl.MapboxOptions;
  mapEvents: MapEvent;
}

type AllSource = MapboxGl.VectorSource | MapboxGl.RasterSource | MapboxGl.GeoJSONSource | MapboxGl.ImageSourceOptions | MapboxGl.VideoSource | MapboxGl.GeoJSONSourceRaw | MapboxGl.CanvasSourceOptions;

@Injectable()
export class MapService {
  mapInstance: MapboxGl.Map;

  constructor(
    @Optional() @Inject(MAPBOX_API_KEY) private readonly MAPBOX_API_KEY: string
  ) { }

  setup(options: SetupOptions) {
    // Workaround rollup issue
    this.assign(MapboxGl, 'accessToken', options.accessToken || this.MAPBOX_API_KEY);
    this.assign(MapboxGl, 'config.customMapboxApiUrl', options.customMapboxApiUrl);
    this.createMap(options.mapOptions);
    this.hookEvents(options.mapEvents);
    return this.mapInstance;
  }

  updateMinZoom(minZoom: number) {
    this.mapInstance.setMinZoom(minZoom);
  }

  updateMaxZoom(maxZoom: number) {
    this.mapInstance.setMaxZoom(maxZoom);
  }

  updateScrollZoom(_status: boolean) {
    // TODO
  }

  updateDragRotate(_status: boolean) {
    // TODO
  }

  updateTouchZoomRotate(_status: boolean) {
    // TODO
  }

  updateDoubleClickZoom(_status: boolean) {
    // TODO
  }

  updateKeyboard(_status: boolean) {
    // TODO
  }

  updateDragPan(_status: boolean) {
    // TODO
  }

  updateBoxZoom(_status: boolean) {
    // TODO
  }

  updateStyle(style: MapboxGl.Style) {
    // TODO Probably not so simple, write tests
    this.mapInstance.setStyle(style);
  }

  updateMaxBounds(_maxBounds: MapboxGl.LngLatBoundsLike) {
    // TODO
  }

  panTo(center: MapboxGl.LngLatLike) {
    this.mapInstance.panTo(center);
  }

  move(
    movingMethod: 'jumpTo' | 'easeTo' | 'flyTo',
    flyToOptions?: MapboxGl.FlyToOptions,
    zoom?: number,
    center?: MapboxGl.LngLatLike,
    bearing?: number,
    pitch?: number
  ) {
    (<any>this.mapInstance[movingMethod])({
      ...flyToOptions,
      zoom: zoom ? zoom : this.mapInstance.getZoom(),
      center: center ? center : this.mapInstance.getCenter(),
      bearing: bearing ? bearing : this.mapInstance.getBearing(),
      pitch: pitch ? pitch : this.mapInstance.getPitch()
    });
  }

  addLayer(layer: MapboxGl.Layer, before?: string) {
    Object.keys(layer)
      .forEach((key: keyof MapboxGl.Layer) =>
        layer[key] === undefined && delete layer[key]);
    this.mapInstance.addLayer(layer, before);
  }

  removeLayer(layerId: string) {
    this.mapInstance.removeLayer(layerId);
  }

  addMarker(marker: MapboxGl.Marker) {
    marker.addTo(this.mapInstance);
  }

  removeMarker(marker: MapboxGl.Marker) {
    marker.remove();
  }

  async loadAndAddImage(imageId: string, url: string, options?: MapImageOptions) {
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
  }

  addImage(imageId: string, data: MapImageData, options?: MapImageOptions) {
    this.mapInstance.addImage(imageId, <any>data, options);
  }

  removeImage(imageId: string) {
    this.mapInstance.removeImage(imageId);
  }

  addSource(sourceId: string, source: AllSource) {
    Object.keys(source)
      .forEach((key) =>
        (<any>source)[key] === undefined && delete (<any>source)[key]);
    this.mapInstance.addSource(sourceId, <any>source); // Typings issue
  }

  getSource<T>(sourceId: string) {
    return <T><any>this.mapInstance.getSource(sourceId);
  }

  removeSource(sourceId: string) {
    this.mapInstance.removeSource(sourceId);
  }

  setAllPaintProperty(
    layerId: string,
    paint: MapboxGl.BackgroundPaint | MapboxGl.FillPaint | MapboxGl.FillExtrusionPaint | MapboxGl.LinePaint | MapboxGl.SymbolPaint | MapboxGl.RasterPaint | MapboxGl.CirclePaint
  ) {
    Object.keys(paint).forEach((key) => {
      // TODO Check for perf, setPaintProperty only on changed paint props maybe
      this.mapInstance.setPaintProperty(layerId, key, (<any>paint)[key]);
    });
  }

  setAllLayoutProperty(
    layerId: string,
    layout: MapboxGl.BackgroundLayout | MapboxGl.FillLayout | MapboxGl.FillExtrusionLayout | MapboxGl.LineLayout | MapboxGl.SymbolLayout | MapboxGl.RasterLayout | MapboxGl.CircleLayout
  ) {
    Object.keys(layout).forEach((key) => {
      // TODO Check for perf, setPaintProperty only on changed paint props maybe
      this.mapInstance.setLayoutProperty(layerId, key, (<any>layout)[key]);
    });
  }

  private createMap(options: MapboxGl.MapboxOptions) {
    Object.keys(options)
      .forEach((key: keyof MapboxGl.MapboxOptions) =>
        options[key] === undefined && delete options[key]);
    this.mapInstance = new MapboxGl.Map(options);
  }

  private hookEvents(events: MapEvent) {
    this.mapInstance.on('load', () => events.load.emit());
    this.mapInstance.on('resize', () => events.resize.emit());
    this.mapInstance.on('remove', () => events.remove.emit());
    this.mapInstance.on('mousedown', (evt: MapboxGl.MapMouseEvent) => events.mouseDown.emit(evt));
    this.mapInstance.on('mouseup', (evt: MapboxGl.MapMouseEvent) => events.mouseUp.emit(evt));
    this.mapInstance.on('mousemove', (evt: MapboxGl.MapMouseEvent) => events.mouseMove.emit(evt));
    this.mapInstance.on('click', (evt: MapboxGl.MapMouseEvent) => events.click.emit(evt));
    this.mapInstance.on('dblclick', (evt: MapboxGl.MapMouseEvent) => events.dblClick.emit(evt));
    this.mapInstance.on('mouseenter', (evt: MapboxGl.MapMouseEvent) => events.mouseEnter.emit(evt));
    this.mapInstance.on('mouseleave', (evt: MapboxGl.MapMouseEvent) => events.mouseLeave.emit(evt));
    this.mapInstance.on('mouseover', (evt: MapboxGl.MapMouseEvent) => events.mouseOver.emit(evt));
    this.mapInstance.on('mouseout', (evt: MapboxGl.MapMouseEvent) => events.mouseOut.emit(evt));
    this.mapInstance.on('contextmenu', (evt: MapboxGl.MapMouseEvent) => events.contextMenu.emit(evt));
    this.mapInstance.on('touchstart', (evt: MapboxGl.MapTouchEvent) => events.touchStart.emit(evt));
    this.mapInstance.on('touchend', (evt: MapboxGl.MapTouchEvent) => events.touchEnd.emit(evt));
    this.mapInstance.on('touchmove', (evt: MapboxGl.MapTouchEvent) => events.touchMove.emit(evt));
    this.mapInstance.on('touchcancel', (evt: MapboxGl.MapTouchEvent) => events.touchCancel.emit(evt));
    this.mapInstance.on('movestart', (evt: DragEvent) => events.moveStart.emit(evt));
    this.mapInstance.on('move', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => events.move.emit(evt));
    this.mapInstance.on('moveend', (evt: DragEvent) => events.moveEnd.emit(evt));
    this.mapInstance.on('dragstart', (evt: DragEvent) => events.dragStart.emit(evt));
    this.mapInstance.on('drag', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => events.drag.emit(evt));
    this.mapInstance.on('dragend', (evt: DragEvent) => events.dragEnd.emit(evt));
    this.mapInstance.on('zoomstart', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => events.zoomStart.emit(evt));
    this.mapInstance.on('zoom', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => events.zoomChange.emit(evt));
    this.mapInstance.on('zoomend', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => events.zoomEnd.emit(evt));
    this.mapInstance.on('rotatestart', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => events.rotateStart.emit(evt));
    this.mapInstance.on('rotate', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => events.rotate.emit(evt));
    this.mapInstance.on('rotateend', (evt: MapboxGl.MapTouchEvent | MapboxGl.MapMouseEvent) => events.rotateEnd.emit(evt));
    this.mapInstance.on('pitchstart', (evt: MapboxGl.EventData) => events.pitchStart.emit(evt));
    this.mapInstance.on('pitch', (evt: MapboxGl.EventData) => events.pitchChange.emit(evt));
    this.mapInstance.on('pitchend', (evt: MapboxGl.EventData) => events.pitchEnd.emit(evt));
    this.mapInstance.on('boxzoomstart', (evt: MapboxGl.MapBoxZoomEvent) => events.boxZoomStart.emit(evt));
    this.mapInstance.on('boxzoomend', (evt: MapboxGl.MapBoxZoomEvent) => events.boxZoomEnd.emit(evt));
    this.mapInstance.on('boxzoomcancel', (evt: MapboxGl.MapBoxZoomEvent) => events.boxZoomCancel.emit(evt));
    this.mapInstance.on('webglcontextlost', () => events.webGlContextLost.emit());
    this.mapInstance.on('webglcontextrestored', () => events.webGlContextRestored.emit());
    this.mapInstance.on('load', () => events.load.emit());
    this.mapInstance.on('render', () => events.render.emit());
    this.mapInstance.on('error', () => events.error.emit());
    this.mapInstance.on('data', (evt: MapboxGl.EventData) => events.data.emit(evt));
    this.mapInstance.on('styledata', (evt: MapboxGl.EventData) => events.styleData.emit(evt));
    this.mapInstance.on('sourcedata', (evt: MapboxGl.EventData) => events.sourceData.emit(evt));
    this.mapInstance.on('dataloading', (evt: MapboxGl.EventData) => events.dataLoading.emit(evt));
    this.mapInstance.on('styledataloading', (evt: MapboxGl.EventData) => events.styleDataLoading.emit(evt));
    this.mapInstance.on('sourcedataloading', (evt: MapboxGl.EventData) => events.sourceDataLoading.emit(evt));
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
