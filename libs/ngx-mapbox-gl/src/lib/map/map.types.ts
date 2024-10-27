// Can't use MapEvent interface from @types/mapbox because some event name are changed (eg zoomChange)
import { EventEmitter } from '@angular/core';
import {
  ErrorEvent,
  GeolocateControl,
  Map,
  MapContextEvent,
  MapDataEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
  MapEvent,
  MapEvents
} from 'mapbox-gl';
export type EventData = object;

export interface NgxMapEvent {
  mapResize: EventEmitter<MapEvent>;
  mapRemove: EventEmitter<MapEvent>;
  mapMouseDown: EventEmitter<MapMouseEvent>;
  mapMouseUp: EventEmitter<MapMouseEvent>;
  mapMouseMove: EventEmitter<MapMouseEvent>;
  mapClick: EventEmitter<MapMouseEvent>;
  mapDblClick: EventEmitter<MapMouseEvent>;
  mapMouseOver: EventEmitter<MapMouseEvent>;
  mapMouseOut: EventEmitter<MapMouseEvent>;
  mapContextMenu: EventEmitter<MapMouseEvent>;
  mapTouchStart: EventEmitter<MapTouchEvent>;
  mapTouchEnd: EventEmitter<MapTouchEvent>;
  mapTouchMove: EventEmitter<MapTouchEvent>;
  mapTouchCancel: EventEmitter<MapTouchEvent>;
  mapWheel: EventEmitter<MapWheelEvent>;
  moveStart: EventEmitter<MapEvents['movestart'] & EventData>;
  move: EventEmitter<MapEvents['move'] & EventData>;
  moveEnd: EventEmitter<MapEvents['moveend'] & EventData>;
  mapDragStart: EventEmitter<MapEvents['dragstart'] & EventData>;
  mapDrag: EventEmitter<MapEvents['drag'] & EventData>;
  mapDragEnd: EventEmitter<MapEvents['dragend'] & EventData>;
  zoomStart: EventEmitter<MapEvents['zoomstart'] & EventData>;
  zoomEvt: EventEmitter<MapEvents['zoom'] & EventData>;
  zoomEnd: EventEmitter<MapEvents['zoomend'] & EventData>;
  rotateStart: EventEmitter<MapEvents['rotatestart'] & EventData>;
  rotate: EventEmitter<MapEvents['rotate'] & EventData>;
  rotateEnd: EventEmitter<MapEvents['rotateend']>;
  pitchStart: EventEmitter<MapEvents['pitchstart'] & EventData>;
  pitchEvt: EventEmitter<MapEvents['pitch'] & EventData>;
  pitchEnd: EventEmitter<MapEvents['pitchend'] & EventData>;
  boxZoomStart: EventEmitter<MapEvents['boxzoomstart'] & EventData>;
  boxZoomEnd: EventEmitter<MapEvents['boxzoomend']>;
  boxZoomCancel: EventEmitter<MapEvents['boxzoomcancel'] & EventData>;
  webGlContextLost: EventEmitter<MapContextEvent>;
  webGlContextRestored: EventEmitter<MapContextEvent>;
  mapLoad: EventEmitter<MapEvent>;
  mapCreate: EventEmitter<Map>;
  render: EventEmitter<MapEvent>;
  mapError: EventEmitter<ErrorEvent>;
  data: EventEmitter<MapDataEvent>;
  styleData: EventEmitter<MapStyleDataEvent>;
  sourceData: EventEmitter<MapSourceDataEvent>;
  dataLoading: EventEmitter<MapDataEvent>;
  styleDataLoading: EventEmitter<MapStyleDataEvent>;
  sourceDataLoading: EventEmitter<MapSourceDataEvent>;
  styleImageMissing: EventEmitter<{ id: string }>;
  idle: EventEmitter<MapEvent>;

  resize: EventEmitter<MapEvent>;
  remove: EventEmitter<MapEvent>;
  mouseDown: EventEmitter<MapMouseEvent>;
  mouseUp: EventEmitter<MapMouseEvent>;
  mouseMove: EventEmitter<MapMouseEvent>;
  click: EventEmitter<MapMouseEvent>;
  dblClick: EventEmitter<MapMouseEvent>;
  mouseOver: EventEmitter<MapMouseEvent>;
  mouseOut: EventEmitter<MapMouseEvent>;
  contextMenu: EventEmitter<MapMouseEvent>;
  touchStart: EventEmitter<MapTouchEvent>;
  touchEnd: EventEmitter<MapTouchEvent>;
  touchMove: EventEmitter<MapTouchEvent>;
  touchCancel: EventEmitter<MapTouchEvent>;
  wheel: EventEmitter<MapWheelEvent>;
  dragStart: EventEmitter<MapEvents['dragstart'] & EventData>;
  drag: EventEmitter<MapEvents['drag'] & EventData>;
  dragEnd: EventEmitter<MapEvents['dragend'] & EventData>;
  load: EventEmitter<Map>; // Consider emitting MapboxEvent for consistency (breaking change).
  error: EventEmitter<ErrorEvent>;
}

export interface NgxMapboxLayerEvents {
  layerClick: EventEmitter<MapMouseEvent>;
  layerDblClick: EventEmitter<MapMouseEvent>;
  layerMouseDown: EventEmitter<MapMouseEvent>;
  layerMouseUp: EventEmitter<MapMouseEvent>;
  layerMouseEnter: EventEmitter<MapMouseEvent>;
  layerMouseLeave: EventEmitter<MapMouseEvent>;
  layerMouseMove: EventEmitter<MapMouseEvent>;
  layerMouseOver: EventEmitter<MapMouseEvent>;
  layerMouseOut: EventEmitter<MapMouseEvent>;
  layerContextMenu: EventEmitter<MapMouseEvent>;
  layerTouchStart: EventEmitter<MapTouchEvent>;
  layerTouchEnd: EventEmitter<MapTouchEvent>;
  layerTouchCancel: EventEmitter<MapTouchEvent>;
  click: EventEmitter<MapMouseEvent>;
  dblClick: EventEmitter<MapMouseEvent>;
  mouseDown: EventEmitter<MapMouseEvent>;
  mouseUp: EventEmitter<MapMouseEvent>;
  mouseEnter: EventEmitter<MapMouseEvent>;
  mouseLeave: EventEmitter<MapMouseEvent>;
  mouseMove: EventEmitter<MapMouseEvent>;
  mouseOver: EventEmitter<MapMouseEvent>;
  mouseOut: EventEmitter<MapMouseEvent>;
  contextMenu: EventEmitter<MapMouseEvent>;
  touchStart: EventEmitter<MapTouchEvent>;
  touchEnd: EventEmitter<MapTouchEvent>;
  touchCancel: EventEmitter<MapTouchEvent>;
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
