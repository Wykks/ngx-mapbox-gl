import { EventEmitter } from '@angular/core';
import type {
  GeolocateControl,
  Map,
  MapBoxZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapEvent,
  MapEvents,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
} from 'mapbox-gl';

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
  moveStart: EventEmitter<MapEvents['movestart']>;
  move: EventEmitter<MapEvents['move']>;
  moveEnd: EventEmitter<MapEvents['moveend']>;
  mapDragStart: EventEmitter<MapEvents['dragstart']>;
  mapDrag: EventEmitter<MapEvents['drag']>;
  mapDragEnd: EventEmitter<MapEvents['dragend']>;
  zoomStart: EventEmitter<void>;
  zoomEvt: EventEmitter<void>;
  zoomEnd: EventEmitter<void>;
  rotateStart: EventEmitter<MapEvents['rotatestart']>;
  rotate: EventEmitter<MapEvents['rotate']>;
  rotateEnd: EventEmitter<MapEvents['rotateend']>;
  pitchStart: EventEmitter<void>;
  pitchEvt: EventEmitter<void>;
  pitchEnd: EventEmitter<void>;
  boxZoomStart: EventEmitter<MapEvents['boxzoomstart']>;
  boxZoomEnd: EventEmitter<MapEvents['boxzoomend']>;
  boxZoomCancel: EventEmitter<MapEvents['boxzoomcancel']>;
  webGlContextLost: EventEmitter<MapContextEvent>;
  webGlContextRestored: EventEmitter<MapContextEvent>;
  mapLoad: EventEmitter<MapEvent>;
  mapCreate: EventEmitter<Map>;
  render: EventEmitter<void>;
  mapError: EventEmitter<Error>;
  data: EventEmitter<MapDataEvent>;
  styleData: EventEmitter<MapStyleDataEvent>;
  sourceData: EventEmitter<MapSourceDataEvent>;
  dataLoading: EventEmitter<MapDataEvent>;
  styleDataLoading: EventEmitter<MapStyleDataEvent>;
  sourceDataLoading: EventEmitter<MapSourceDataEvent>;
  styleImageMissing: EventEmitter<{ id: string }>;
  idle: EventEmitter<void>;
}

export interface LayerEvents {
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
}

/**
 * in typescript 4.1 DOM interface Position and Coordinates renamed to GeolocationPosition GeolocationCoordinates
 * to avoid deprecation angular version < 11.0.0 we declared own Coordinates, Position interface
 */

// export interface NgxMapboxGeolocationCoordinates {
//   readonly accuracy: number;
//   readonly altitude: number | null;
//   readonly altitudeAccuracy: number | null;
//   readonly heading: number | null;
//   readonly latitude: number;
//   readonly longitude: number;
//   readonly speed: number | null;
// }

// export interface Position {
//   coords: NgxMapboxGeolocationCoordinates;
//   target: GeolocateControl;
//   timestamp: number;
//   type: string;
// }

// export type MapImageData =
//   | HTMLImageElement
//   | ArrayBufferView
//   | { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
//   | ImageData
//   | ImageBitmap;

// export interface MapImageOptions {
//   pixelRatio: number;
//   sdf: boolean;
// }
