// Can't use MapEvent interface from @types/mapbox because some event name are changed (eg zoomChange)
import { EventEmitter } from '@angular/core';
import {
  BackgroundLayerSpecification,
  CanvasSource,
  CircleLayerSpecification,
  EasingOptions,
  FillExtrusionLayerSpecification,
  FillLayerSpecification,
  GeoJSONSourceSpecification,
  GeolocateControl,
  ImageSourceSpecification,
  LineLayerSpecification,
  Map,
  MapEventOf,
  MapMouseEvent,
  MapTouchEvent,
  RasterDEMSourceSpecification,
  RasterLayerSpecification,
  RasterSourceSpecification,
  SymbolLayerSpecification,
  VectorSourceSpecification,
  VideoSourceSpecification,
} from 'mapbox-gl';

export type EventData = object;
export type FlyToOptions = EasingOptions;

export type ImageSourceOptions = Omit<ImageSourceSpecification, 'type'>;
export type VideoSourceOptions = Omit<VideoSourceSpecification, 'type'>;

export type CanvasSourceSpecification = CanvasSource['options'];
export type CanvasSourceOptions = Omit<CanvasSourceSpecification, 'type'>;

export type VectorSource = Pick<VectorSourceSpecification, 'type' | 'url' | 'tiles' | 'bounds' | 'minzoom' | 'maxzoom' | 'scheme' | 'attribution' | 'promoteId'>;
export type VectorSourceOptions = Omit<VectorSource, 'type'>;

export type RasterSource = Pick<RasterSourceSpecification, 'type' | 'url' | 'tiles' | 'bounds' | 'minzoom' | 'maxzoom' | 'scheme' | 'tileSize' | 'attribution' | 'volatile'>;
export type RasterSourceOptions = Omit<RasterSource, 'type'>;

export type RasterDEMSource = Pick<RasterDEMSourceSpecification, 'type' | 'url' | 'tiles' | 'bounds' | 'minzoom' | 'maxzoom' | 'tileSize' | 'attribution' | 'encoding' | 'volatile'>;
export type RasterDEMSourceOptions = Omit<RasterDEMSource, 'type'>;

export type GeoJSONSourceOptions = Omit<GeoJSONSourceSpecification, 'type'>;

export type LayerSpecificationProperty<K extends 'paint' | 'layout'> = BackgroundLayerSpecification[K]
  | FillLayerSpecification[K]
  | FillExtrusionLayerSpecification[K]
  | LineLayerSpecification[K]
  | SymbolLayerSpecification[K]
  | RasterLayerSpecification[K]
  | CircleLayerSpecification[K]

export type LayerSpecificationPaint = LayerSpecificationProperty<'paint'>;
export type LayerSpecificationLayout = LayerSpecificationProperty<'layout'>;

export interface MapEvent {
  mapResize: EventEmitter<MapEventOf<'resize'>>;
  mapRemove: EventEmitter<MapEventOf<'remove'>>;
  mapMouseDown: EventEmitter<MapEventOf<'mousedown'>>;
  mapMouseUp: EventEmitter<MapEventOf<'mouseup'>>;
  mapMouseMove: EventEmitter<MapEventOf<'mousemove'>>;
  mapClick: EventEmitter<MapEventOf<'click'>>;
  mapDblClick: EventEmitter<MapEventOf<'dblclick'>>;
  mapMouseOver: EventEmitter<MapEventOf<'mouseover'>>;
  mapMouseOut: EventEmitter<MapEventOf<'mouseout'>>;
  mapContextMenu: EventEmitter<MapEventOf<'contextmenu'>>;
  mapTouchStart: EventEmitter<MapEventOf<'touchstart'>>;
  mapTouchEnd: EventEmitter<MapEventOf<'touchend'>>;
  mapTouchMove: EventEmitter<MapEventOf<'touchmove'>>;
  mapTouchCancel: EventEmitter<MapEventOf<'touchcancel'>>;
  mapWheel: EventEmitter<MapEventOf<'wheel'>>;
  moveStart: EventEmitter<MapEventOf<'movestart'>>;
  move: EventEmitter<MapEventOf<'move'>>;
  moveEnd: EventEmitter<MapEventOf<'moveend'>>;
  mapDragStart: EventEmitter<MapEventOf<'dragstart'>>;
  mapDrag: EventEmitter<MapEventOf<'drag'>>;
  mapDragEnd: EventEmitter<MapEventOf<'dragend'>>;
  zoomStart: EventEmitter<MapEventOf<'zoomstart'>>;
  zoomEvt: EventEmitter<MapEventOf<'zoom'>>;
  zoomEnd: EventEmitter<MapEventOf<'zoomend'>>;
  rotateStart: EventEmitter<MapEventOf<'rotatestart'>>;
  rotate: EventEmitter<MapEventOf<'rotate'>>;
  rotateEnd: EventEmitter<MapEventOf<'rotateend'>>;
  pitchStart: EventEmitter<MapEventOf<'pitchstart'>>;
  pitchEvt: EventEmitter<MapEventOf<'pitch'>>;
  pitchEnd: EventEmitter<MapEventOf<'pitchend'>>;
  boxZoomStart: EventEmitter<MapEventOf<'boxzoomstart'>>;
  boxZoomEnd: EventEmitter<MapEventOf<'boxzoomend'>>;
  boxZoomCancel: EventEmitter<MapEventOf<'boxzoomcancel'>>;
  webGlContextLost: EventEmitter<MapEventOf<'webglcontextlost'>>;
  webGlContextRestored: EventEmitter<MapEventOf<'webglcontextrestored'>>;
  mapLoad: EventEmitter<MapEventOf<'load'>>;
  mapCreate: EventEmitter<Map>;
  render: EventEmitter<MapEventOf<'render'>>;
  mapError: EventEmitter<MapEventOf<'error'>>;
  data: EventEmitter<MapEventOf<'data'>>;
  styleData: EventEmitter<MapEventOf<'styledata'>>;
  sourceData: EventEmitter<MapEventOf<'sourcedata'>>;
  dataLoading: EventEmitter<MapEventOf<'dataloading'>>;
  styleDataLoading: EventEmitter<MapEventOf<'styledataloading'>>;
  sourceDataLoading: EventEmitter<MapEventOf<'sourcedataloading'>>;
  styleImageMissing: EventEmitter<MapEventOf<'styleimagemissing'>>;
  load: EventEmitter<MapEventOf<'load'>['target']>;
  idle: EventEmitter<MapEventOf<'idle'>>;
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
