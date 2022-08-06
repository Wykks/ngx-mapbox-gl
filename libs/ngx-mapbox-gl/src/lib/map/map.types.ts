// Can't use MapEvent interface from @types/mapbox because some event name are changed (eg zoomChange)
import { EventEmitter } from '@angular/core';
import {
  ErrorEvent,
  EventData,
  GeolocateControl,
  Map,
  MapboxEvent,
  MapBoxZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
} from 'mapbox-gl';

export interface MapEvent {
  mapResize: EventEmitter<MapboxEvent & EventData>;
  mapRemove: EventEmitter<MapboxEvent & EventData>;
  mapMouseDown: EventEmitter<MapMouseEvent & EventData>;
  mapMouseUp: EventEmitter<MapMouseEvent & EventData>;
  mapMouseMove: EventEmitter<MapMouseEvent & EventData>;
  mapClick: EventEmitter<MapMouseEvent & EventData>;
  mapDblClick: EventEmitter<MapMouseEvent & EventData>;
  mapMouseOver: EventEmitter<MapMouseEvent & EventData>;
  mapMouseOut: EventEmitter<MapMouseEvent & EventData>;
  mapContextMenu: EventEmitter<MapMouseEvent & EventData>;
  mapTouchStart: EventEmitter<MapTouchEvent & EventData>;
  mapTouchEnd: EventEmitter<MapTouchEvent & EventData>;
  mapTouchMove: EventEmitter<MapTouchEvent & EventData>;
  mapTouchCancel: EventEmitter<MapTouchEvent & EventData>;
  mapWheel: EventEmitter<MapWheelEvent & EventData>;
  moveStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  move: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  moveEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  mapDragStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  mapDrag: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  mapDragEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  zoomStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  zoomEvt: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  zoomEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  rotateStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  rotate: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  rotateEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchEvt: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  boxZoomStart: EventEmitter<MapBoxZoomEvent & EventData>;
  boxZoomEnd: EventEmitter<MapBoxZoomEvent & EventData>;
  boxZoomCancel: EventEmitter<MapBoxZoomEvent & EventData>;
  webGlContextLost: EventEmitter<MapContextEvent & EventData>;
  webGlContextRestored: EventEmitter<MapContextEvent & EventData>;
  mapLoad: EventEmitter<MapboxEvent & EventData>;
  mapCreate: EventEmitter<Map>;
  render: EventEmitter<MapboxEvent & EventData>;
  mapError: EventEmitter<ErrorEvent & EventData>;
  data: EventEmitter<MapDataEvent & EventData>;
  styleData: EventEmitter<MapStyleDataEvent & EventData>;
  sourceData: EventEmitter<MapSourceDataEvent & EventData>;
  dataLoading: EventEmitter<MapDataEvent & EventData>;
  styleDataLoading: EventEmitter<MapStyleDataEvent & EventData>;
  sourceDataLoading: EventEmitter<MapSourceDataEvent & EventData>;
  styleImageMissing: EventEmitter<{ id: string } & EventData>;
  idle: EventEmitter<MapboxEvent & EventData>;

  resize: EventEmitter<MapboxEvent & EventData>;
  remove: EventEmitter<MapboxEvent & EventData>;
  mouseDown: EventEmitter<MapMouseEvent & EventData>;
  mouseUp: EventEmitter<MapMouseEvent & EventData>;
  mouseMove: EventEmitter<MapMouseEvent & EventData>;
  click: EventEmitter<MapMouseEvent & EventData>;
  dblClick: EventEmitter<MapMouseEvent & EventData>;
  mouseOver: EventEmitter<MapMouseEvent & EventData>;
  mouseOut: EventEmitter<MapMouseEvent & EventData>;
  contextMenu: EventEmitter<MapMouseEvent & EventData>;
  touchStart: EventEmitter<MapTouchEvent & EventData>;
  touchEnd: EventEmitter<MapTouchEvent & EventData>;
  touchMove: EventEmitter<MapTouchEvent & EventData>;
  touchCancel: EventEmitter<MapTouchEvent & EventData>;
  wheel: EventEmitter<MapWheelEvent & EventData>;
  dragStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  drag: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  dragEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  load: EventEmitter<Map>; // Consider emitting MapboxEvent for consistency (breaking change).
  error: EventEmitter<ErrorEvent & EventData>;
}

export interface LayerEvents {
  layerClick: EventEmitter<MapLayerMouseEvent & EventData>;
  layerDblClick: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseDown: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseUp: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseEnter: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseLeave: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseMove: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseOver: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseOut: EventEmitter<MapLayerMouseEvent & EventData>;
  layerContextMenu: EventEmitter<MapLayerMouseEvent & EventData>;
  layerTouchStart: EventEmitter<MapLayerTouchEvent & EventData>;
  layerTouchEnd: EventEmitter<MapLayerTouchEvent & EventData>;
  layerTouchCancel: EventEmitter<MapLayerTouchEvent & EventData>;
  click: EventEmitter<MapLayerMouseEvent & EventData>;
  dblClick: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseDown: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseUp: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseEnter: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseLeave: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseMove: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseOver: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseOut: EventEmitter<MapLayerMouseEvent & EventData>;
  contextMenu: EventEmitter<MapLayerMouseEvent & EventData>;
  touchStart: EventEmitter<MapLayerTouchEvent & EventData>;
  touchEnd: EventEmitter<MapLayerTouchEvent & EventData>;
  touchCancel: EventEmitter<MapLayerTouchEvent & EventData>;
}

/**
 * in typescript 4.1 DOM interface Position and Coordinates renamed to GeolocationPosition GeolocationCoordinates
 * to avoid deprecation angular version < 11.0.0 we declared own Coordinates, Position interface
 */

export interface NgxMapboxGeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

export interface Position {
  coords: NgxMapboxGeolocationCoordinates;
  target: GeolocateControl;
  timestamp: number;
  type: string;
}

export type MapImageData =
  | HTMLImageElement
  | ArrayBufferView
  | { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
  | ImageData
  | ImageBitmap;

export interface MapImageOptions {
  pixelRatio: number;
  sdf: boolean;
}
