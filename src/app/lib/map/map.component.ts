import { Component, OnInit, ElementRef, InjectionToken, Inject, Input, Optional } from '@angular/core';
import { MapService } from './map.service';
import { Style, LngLatLike, LngLatBoundsLike, PaddingOptions, PointLike, AnimationOptions, FlyToOptions, Map } from 'mapbox-gl';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

declare global {
  namespace mapboxgl {
    export interface MapboxOptions {
      failIfMajorPerformanceCaveat?: boolean;
      transformRequest?: Function;
      localIdeographFontFamily?: string;
      pitchWithRotate?: boolean;
    }
  }
}

@Component({
  selector: 'mgl-map',
  template: '',
  providers: [
    MapService
  ]
})
export class MapComponent implements OnInit {
  /* Init inputs */
  @Input() accessToken: string;
  @Input() customMapboxApiUrl?: string;
  @Input() hash?: boolean;
  @Input() refreshExpiredTiles?: boolean;
  @Input() failIfMajorPerformanceCaveat?: boolean;
  @Input() classes?: string[];
  @Input() bearingSnap?: number;
  @Input() interactive?: boolean;
  @Input() pitchWithRotate?: boolean;
  @Input() attributionControl?: boolean;
  @Input() logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  @Input() maxTileCacheSize?: number;
  @Input() localIdeographFontFamily?: string;

  /* Dynamic inputs */
  @Input() minZoom?: number;
  @Input() maxZoom?: number;
  @Input() scrollZoom?: boolean;
  @Input() preserveDrawingBuffer?: boolean;
  @Input() renderWorldCopies?: boolean;
  @Input() dragRotate?: boolean;
  @Input() trackResize?: boolean;
  @Input() touchZoomRotate?: boolean;
  @Input() doubleClickZoom?: boolean;
  @Input() keyboard?: boolean;
  @Input() dragPan?: boolean;
  @Input() boxZoom?: boolean;
  @Input() transformRequest?: Function;

  @Input() style: Style | string;
  @Input() center?: LngLatLike;
  @Input() zoom?: number;
  @Input() maxBounds?: LngLatBoundsLike;
  @Input() fitBounds?: LngLatBoundsLike;
  @Input() fitBoundsOptions?: {
    linear?: boolean,
    easing?: Function,
    padding?: number | PaddingOptions,
    offset?: PointLike, maxZoom?: number
  };
  @Input() bearing? = 0;
  @Input() pitch? = 0;
  @Input() movingMethod?: 'jumpTo' | 'easeTo' | 'flyTo';
  @Input() animationOptions?: AnimationOptions;
  @Input() flyToOptions?: FlyToOptions;

  mapInstance: Map;

  constructor(
    private ElementRef: ElementRef,
    @Optional() @Inject(MAPBOX_API_KEY) private readonly MAPBOX_API_KEY: string,
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.mapInstance = this.MapService.setup(
      this.accessToken || this.MAPBOX_API_KEY,
      {
        container: this.ElementRef.nativeElement,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        style: this.style,
        hash: this.hash,
        interactive: this.interactive,
        bearingSnap: this.bearingSnap,
        pitchWithRotate: this.pitchWithRotate,
        classes: this.classes,
        attributionControl: this.attributionControl,
        logoPosition: <any>this.logoPosition,
        failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
        preserveDrawingBuffer: this.preserveDrawingBuffer,
        refreshExpiredTiles: this.refreshExpiredTiles,
        maxBounds: this.maxBounds,
        scrollZoom: this.scrollZoom,
        boxZoom: this.boxZoom,
        dragRotate: this.dragRotate,
        dragPan: this.dragPan,
        keyboard: this.keyboard,
        doubleClickZoom: this.doubleClickZoom,
        touchZoomRotate: this.touchZoomRotate,
        trackResize: this.trackResize,
        center: this.center,
        zoom: this.zoom,
        bearing: this.bearing,
        pitch: this.pitch,
        renderWorldCopies: this.renderWorldCopies,
        maxTileCacheSize: this.maxTileCacheSize,
        localIdeographFontFamily: this.localIdeographFontFamily,
        transformRequest: this.transformRequest
      },
      this.customMapboxApiUrl
    );
  }
}
