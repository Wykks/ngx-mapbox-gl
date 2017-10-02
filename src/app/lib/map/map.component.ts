import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    Output
} from '@angular/core';
import { MapService, MapEvents } from './map.service';
import { Style, LngLatLike, LngLatBoundsLike, PaddingOptions, PointLike, AnimationOptions, FlyToOptions, Map, MapboxOptions } from 'mapbox-gl';

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
export class MapComponent implements OnInit, OnChanges, MapEvents, MapboxOptions {
  /* Init inputs */
  @Input() accessToken?: string;
  @Input() customMapboxApiUrl?: string;
  @Input() hash?: boolean;
  @Input() refreshExpiredTiles?: boolean;
  @Input() failIfMajorPerformanceCaveat?: boolean;
  @Input() classes?: string[];
  @Input() bearingSnap?: number;
  @Input() interactive?: boolean;
  @Input() pitchWithRotate?: boolean;
  @Input() attributionControl?: boolean;
  @Input() logoPosition?: any; // @types/mapbox-gl issue, should be 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
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
  @Input() bearing?: number;
  @Input() pitch?: number;

  /* Added by ngx-mapbox-gl */
  @Input() movingMethod?: 'jumpTo' | 'easeTo' | 'flyTo';
  @Input() fitBounds?: LngLatBoundsLike;
  @Input() fitBoundsOptions?: {
    linear?: boolean,
    easing?: Function,
    padding?: number | PaddingOptions,
    offset?: PointLike, maxZoom?: number
  };
  @Input() animationOptions?: AnimationOptions;
  @Input() flyToOptions?: FlyToOptions;

  @Output() load = new EventEmitter<void>();

  get mapInstance(): Map {
    return this.MapService.mapInstance;
  }

  constructor(
    private ElementRef: ElementRef,
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.setup({
      accessToken: this.accessToken,
      customMapboxApiUrl: this.customMapboxApiUrl,
      mapOptions: {
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
        logoPosition: this.logoPosition,
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
      mapEvents: this
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.minZoom && !changes.minZoom.isFirstChange() && changes.minZoom) {
      this.MapService.updateMinZoom(changes.minZoom.currentValue);
    }
  }
}
