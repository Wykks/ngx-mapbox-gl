// Can't use MapEvent interface from @types/mapbox because some event name are changed (eg zoomChange)
import { EventEmitter } from '@angular/core';
import {
  ErrorEvent,
  EventData,
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
import { Results, Result } from '../control/geocoder-control.directive';

export interface MapEvent {
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
  moveStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
  move: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
  moveEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
  dragStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  drag: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  dragEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  zoomStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
  zoomEvt: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
  zoomEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData>;
  rotateStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  rotate: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  rotateEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  pitchStart: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  pitchEvt: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  pitchEnd: EventEmitter<MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData>;
  boxZoomStart: EventEmitter<MapBoxZoomEvent & EventData>;
  boxZoomEnd: EventEmitter<MapBoxZoomEvent & EventData>;
  boxZoomCancel: EventEmitter<MapBoxZoomEvent & EventData>;
  webGlContextLost: EventEmitter<MapContextEvent & EventData>;
  webGlContextRestored: EventEmitter<MapContextEvent & EventData>;
  load: EventEmitter<Map>; // Consider emitting MapboxEvent for consistency (breaking change).
  render: EventEmitter<MapboxEvent & EventData>;
  error: EventEmitter<ErrorEvent & EventData>;
  data: EventEmitter<MapDataEvent & EventData>;
  styleData: EventEmitter<MapStyleDataEvent & EventData>;
  sourceData: EventEmitter<MapSourceDataEvent & EventData>;
  dataLoading: EventEmitter<MapDataEvent & EventData>;
  styleDataLoading: EventEmitter<MapStyleDataEvent & EventData>;
  sourceDataLoading: EventEmitter<MapSourceDataEvent & EventData>;
  styleImageMissing: EventEmitter<{ id: string } & EventData>;
  idle: EventEmitter<MapboxEvent & EventData>;
}

export interface LayerEvents {
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

export interface GeocoderEvent {
  clear: EventEmitter<void>;
  loading: EventEmitter<{ query: string }>;
  results: EventEmitter<Results>;
  result: EventEmitter<{ result: Result }>;
  error: EventEmitter<any>;
}

export type MapImageData =
  | HTMLImageElement
  | ImageData
  | { width: number; height: number; data: Uint8Array | Uint8ClampedArray };

export interface MapImageOptions {
  pixelRatio: number;
  sdf: boolean;
}
