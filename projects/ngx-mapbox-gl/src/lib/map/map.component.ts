import {
  AnimationOptions,
  EventData,
  FitBoundsOptions,
  LngLatBoundsLike,
  LngLatLike,
  Map,
  MapBoxZoomEvent,
  MapMouseEvent,
  MapTouchEvent,
  PointLike,
  Style,
} from 'mapbox-gl';
import { MapService, MovingOptions } from './map.service';
import { MapEvent } from './map.types';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'mgl-map',
  template: '<div #container></div>',
  styles: [
    `
      :host {
        display: block;
      }
      div {
        height: 100%;
        width: 100%;
      }
    `,
  ],
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges, OnDestroy, AfterViewInit, MapEvent {
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
  @Input() clickTolerance?: number;
  @Input() attributionControl?: boolean;
  @Input() logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  @Input() maxTileCacheSize?: number;
  @Input() localIdeographFontFamily?: string;
  @Input() preserveDrawingBuffer?: boolean;
  @Input() renderWorldCopies?: boolean;
  @Input() trackResize?: boolean;
  @Input() transformRequest?: Function;
  @Input() bounds?: LngLatBoundsLike; // Use fitBounds for dynamic input
  @Input() antialias?: boolean;
  @Input() locale: { [key: string]: string };

  /* Dynamic inputs */
  @Input() minZoom?: number;
  @Input() maxZoom?: number;
  @Input() scrollZoom?: boolean;
  @Input() dragRotate?: boolean;
  @Input() touchZoomRotate?: boolean;
  @Input() doubleClickZoom?: boolean;
  @Input() keyboard?: boolean;
  @Input() dragPan?: boolean;
  @Input() boxZoom?: boolean;
  @Input() style: Style | string;
  @Input() center?: LngLatLike;
  @Input() maxBounds?: LngLatBoundsLike;
  @Input() zoom?: [number];
  @Input() bearing?: [number];
  @Input() pitch?: [number];
  @Input() fitBoundsOptions?: FitBoundsOptions; // First value goes to options.fitBoundsOptions. Subsequents changes are passed to fitBounds

  /* Added by ngx-mapbox-gl */
  @Input() movingMethod: 'jumpTo' | 'easeTo' | 'flyTo' = 'flyTo';
  @Input() movingOptions?: MovingOptions;
  // => First value is a alias to bounds input (since mapbox 0.53.0). Subsequents changes are passed to fitBounds
  @Input() fitBounds?: LngLatBoundsLike;
  @Input() fitScreenCoordinates?: [PointLike, PointLike];
  @Input() centerWithPanTo?: boolean;
  @Input() panToOptions?: AnimationOptions;
  @Input() cursorStyle?: string;

  @Output() resize = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() mouseDown = new EventEmitter<MapMouseEvent>();
  @Output() mouseUp = new EventEmitter<MapMouseEvent>();
  @Output() mouseMove = new EventEmitter<MapMouseEvent>();
  @Output() click = new EventEmitter<MapMouseEvent>();
  @Output() dblClick = new EventEmitter<MapMouseEvent>();
  @Output() mouseEnter = new EventEmitter<MapMouseEvent>();
  @Output() mouseLeave = new EventEmitter<MapMouseEvent>();
  @Output() mouseOver = new EventEmitter<MapMouseEvent>();
  @Output() mouseOut = new EventEmitter<MapMouseEvent>();
  @Output() contextMenu = new EventEmitter<MapMouseEvent>();
  @Output() touchStart = new EventEmitter<MapTouchEvent>();
  @Output() touchEnd = new EventEmitter<MapTouchEvent>();
  @Output() touchMove = new EventEmitter<MapTouchEvent>();
  @Output() touchCancel = new EventEmitter<MapTouchEvent>();
  @Output() wheel = new EventEmitter<any>(); // TODO MapWheelEvent
  @Output() moveStart = new EventEmitter<DragEvent>(); // TODO Check type
  @Output() move = new EventEmitter<MapTouchEvent | MapMouseEvent>();
  @Output() moveEnd = new EventEmitter<DragEvent>();
  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() drag = new EventEmitter<MapTouchEvent | MapMouseEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();
  @Output() zoomStart = new EventEmitter<MapTouchEvent | MapMouseEvent>();
  @Output() zoomEvt = new EventEmitter<MapTouchEvent | MapMouseEvent>();
  @Output() zoomEnd = new EventEmitter<MapTouchEvent | MapMouseEvent>();
  @Output() rotateStart = new EventEmitter<MapTouchEvent | MapMouseEvent>();
  @Output() rotate = new EventEmitter<MapTouchEvent | MapMouseEvent>();
  @Output() rotateEnd = new EventEmitter<MapTouchEvent | MapMouseEvent>();
  @Output() pitchStart = new EventEmitter<EventData>();
  @Output() pitchEvt = new EventEmitter<EventData>();
  @Output() pitchEnd = new EventEmitter<EventData>();
  @Output() boxZoomStart = new EventEmitter<MapBoxZoomEvent>();
  @Output() boxZoomEnd = new EventEmitter<MapBoxZoomEvent>();
  @Output() boxZoomCancel = new EventEmitter<MapBoxZoomEvent>();
  @Output() webGlContextLost = new EventEmitter<void>();
  @Output() webGlContextRestored = new EventEmitter<void>();
  @Output() load = new EventEmitter<any>();
  @Output() idle = new EventEmitter<void>();
  @Output() render = new EventEmitter<void>();
  @Output() error = new EventEmitter<any>(); // TODO Check type
  @Output() data = new EventEmitter<EventData>();
  @Output() styleData = new EventEmitter<EventData>();
  @Output() sourceData = new EventEmitter<EventData>();
  @Output() dataLoading = new EventEmitter<EventData>();
  @Output() styleDataLoading = new EventEmitter<EventData>();
  @Output() sourceDataLoading = new EventEmitter<EventData>();
  @Output() styleImageMissing = new EventEmitter<{ id: string }>();

  get mapInstance(): Map {
    return this.MapService.mapInstance;
  }

  @ViewChild('container', { static: true }) mapContainer: ElementRef;

  constructor(private MapService: MapService) {}

  ngAfterViewInit() {
    this.MapService.setup({
      accessToken: this.accessToken,
      customMapboxApiUrl: this.customMapboxApiUrl,
      mapOptions: {
        container: this.mapContainer.nativeElement,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        style: this.style,
        hash: this.hash,
        interactive: this.interactive,
        bearingSnap: this.bearingSnap,
        pitchWithRotate: this.pitchWithRotate,
        clickTolerance: this.clickTolerance,
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
        transformRequest: this.transformRequest,
        bounds: this.bounds ? this.bounds : this.fitBounds,
        fitBoundsOptions: this.fitBoundsOptions,
        antialias: this.antialias,
        locale: this.locale,
      },
      mapEvents: this,
    });
    if (this.cursorStyle) {
      this.MapService.changeCanvasCursor(this.cursorStyle);
    }
  }

  ngOnDestroy() {
    this.MapService.destroyMap();
  }

  async ngOnChanges(changes: SimpleChanges) {
    await this.MapService.mapCreated$.toPromise();
    if (changes.cursorStyle && !changes.cursorStyle.isFirstChange()) {
      this.MapService.changeCanvasCursor(changes.cursorStyle.currentValue);
    }
    if (changes.minZoom && !changes.minZoom.isFirstChange()) {
      this.MapService.updateMinZoom(changes.minZoom.currentValue);
    }
    if (changes.maxZoom && !changes.maxZoom.isFirstChange()) {
      this.MapService.updateMaxZoom(changes.maxZoom.currentValue);
    }
    if (changes.scrollZoom && !changes.scrollZoom.isFirstChange()) {
      this.MapService.updateScrollZoom(changes.scrollZoom.currentValue);
    }
    if (changes.dragRotate && !changes.dragRotate.isFirstChange()) {
      this.MapService.updateDragRotate(changes.dragRotate.currentValue);
    }
    if (changes.touchZoomRotate && !changes.touchZoomRotate.isFirstChange()) {
      this.MapService.updateTouchZoomRotate(changes.touchZoomRotate.currentValue);
    }
    if (changes.doubleClickZoom && !changes.doubleClickZoom.isFirstChange()) {
      this.MapService.updateDoubleClickZoom(changes.doubleClickZoom.currentValue);
    }
    if (changes.keyboard && !changes.keyboard.isFirstChange()) {
      this.MapService.updateKeyboard(changes.keyboard.currentValue);
    }
    if (changes.dragPan && !changes.dragPan.isFirstChange()) {
      this.MapService.updateDragPan(changes.dragPan.currentValue);
    }
    if (changes.boxZoom && !changes.boxZoom.isFirstChange()) {
      this.MapService.updateBoxZoom(changes.boxZoom.currentValue);
    }
    if (changes.style && !changes.style.isFirstChange()) {
      this.MapService.updateStyle(changes.style.currentValue);
    }
    if (changes.maxBounds && !changes.maxBounds.isFirstChange()) {
      this.MapService.updateMaxBounds(changes.maxBounds.currentValue);
    }
    if (changes.fitBounds && changes.fitBounds.currentValue && !changes.fitBounds.isFirstChange()) {
      this.MapService.fitBounds(changes.fitBounds.currentValue, this.fitBoundsOptions);
    }
    if (changes.fitScreenCoordinates && changes.fitScreenCoordinates.currentValue) {
      if ((this.center || this.zoom || this.pitch || this.fitBounds) && changes.fitScreenCoordinates.isFirstChange()) {
        console.warn(
          '[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input'
        );
      }
      this.MapService.fitScreenCoordinates(
        changes.fitScreenCoordinates.currentValue,
        this.bearing ? this.bearing[0] : 0,
        this.movingOptions
      );
    }
    if (
      this.centerWithPanTo &&
      changes.center &&
      !changes.center.isFirstChange() &&
      !changes.zoom &&
      !changes.bearing &&
      !changes.pitch
    ) {
      this.MapService.panTo(this.center!, this.panToOptions);
    } else if (
      (changes.center && !changes.center.isFirstChange()) ||
      (changes.zoom && !changes.zoom.isFirstChange()) ||
      (changes.bearing && !changes.bearing.isFirstChange() && !changes.fitScreenCoordinates) ||
      (changes.pitch && !changes.pitch.isFirstChange())
    ) {
      this.MapService.move(
        this.movingMethod,
        this.movingOptions,
        changes.zoom && this.zoom ? this.zoom[0] : undefined,
        changes.center ? this.center : undefined,
        changes.bearing && this.bearing ? this.bearing[0] : undefined,
        changes.pitch && this.pitch ? this.pitch[0] : undefined
      );
    }
  }
}
