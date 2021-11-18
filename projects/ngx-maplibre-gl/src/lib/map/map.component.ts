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
import {
  AnimationOptions,
  LngLatBoundsLike,
  Map,
  MapLibreEvent,
  MapOptions,
  MapLibreZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
  PointLike,
} from 'maplibre-gl';
import { deprecationWarning } from '../utils';
import { MapService, MovingOptions } from './map.service';
import { MapEvent, EventData } from './map.types';

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
export class MapComponent
  implements
    OnChanges,
    OnDestroy,
    AfterViewInit,
    Omit<MapOptions, 'bearing' | 'container' | 'pitch' | 'zoom'>,
    MapEvent {
  /* Init inputs */
  @Input() collectResourceTiming?: MapOptions['collectResourceTiming'];
  @Input() crossSourceCollisions?: MapOptions['crossSourceCollisions'];
  @Input() customMapboxApiUrl?: string;
  @Input() fadeDuration?: MapOptions['fadeDuration'];
  @Input() hash?: MapOptions['hash'];
  @Input() refreshExpiredTiles?: MapOptions['refreshExpiredTiles'];
  @Input()
  failIfMajorPerformanceCaveat?: MapOptions['failIfMajorPerformanceCaveat'];
  @Input() bearingSnap?: MapOptions['bearingSnap'];
  @Input() interactive?: MapOptions['interactive'];
  @Input() pitchWithRotate?: MapOptions['pitchWithRotate'];
  @Input() clickTolerance?: MapOptions['clickTolerance'];
  @Input() attributionControl?: MapOptions['attributionControl'];
  @Input() logoPosition?: MapOptions['logoPosition'];
  @Input() maxTileCacheSize?: MapOptions['maxTileCacheSize'];
  @Input() localIdeographFontFamily?: MapOptions['localIdeographFontFamily'];
  @Input() preserveDrawingBuffer?: MapOptions['preserveDrawingBuffer'];
  @Input() trackResize?: MapOptions['trackResize'];
  @Input() transformRequest?: MapOptions['transformRequest'];
  @Input() bounds?: MapOptions['bounds']; // Use fitBounds for dynamic input
  @Input() antialias?: MapOptions['antialias'];
  @Input() locale: MapOptions['locale'];

  /* Dynamic inputs */
  @Input() minZoom?: MapOptions['minZoom'];
  @Input() maxZoom?: MapOptions['maxZoom'];
  @Input() minPitch?: MapOptions['minPitch'];
  @Input() maxPitch?: MapOptions['maxPitch'];
  @Input() scrollZoom?: MapOptions['scrollZoom'];
  @Input() dragRotate?: MapOptions['dragRotate'];
  @Input() touchPitch?: MapOptions['touchPitch'];
  @Input() touchZoomRotate?: MapOptions['touchZoomRotate'];
  @Input() doubleClickZoom?: MapOptions['doubleClickZoom'];
  @Input() keyboard?: MapOptions['keyboard'];
  @Input() dragPan?: MapOptions['dragPan'];
  @Input() boxZoom?: MapOptions['boxZoom'];
  @Input() style: MapOptions['style'];
  @Input() center?: MapOptions['center'];
  @Input() maxBounds?: MapOptions['maxBounds'];
  @Input() zoom?: [number];
  @Input() bearing?: [number];
  @Input() pitch?: [number];
  @Input() fitBoundsOptions?: MapOptions['fitBoundsOptions']; // First value goes to options.fitBoundsOptions. Subsequents changes are passed to fitBounds
  @Input() renderWorldCopies?: MapOptions['renderWorldCopies'];

  /* Added by ngx-mapbox-gl */
  @Input() movingMethod: 'jumpTo' | 'easeTo' | 'flyTo' = 'flyTo';
  @Input() movingOptions?: MovingOptions;
  // => First value is a alias to bounds input (since mapbox 0.53.0). Subsequents changes are passed to fitBounds
  @Input() fitBounds?: LngLatBoundsLike;
  @Input() fitScreenCoordinates?: [PointLike, PointLike];
  @Input() centerWithPanTo?: boolean;
  @Input() panToOptions?: AnimationOptions;
  @Input() cursorStyle?: string;

  @Output() mapResize = new EventEmitter<MapLibreEvent & EventData>();
  @Output() mapRemove = new EventEmitter<MapLibreEvent & EventData>();
  @Output() mapMouseDown = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseUp = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseMove = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapClick = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapDblClick = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseOver = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseOut = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapContextMenu = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapTouchStart = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchEnd = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchMove = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchCancel = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapWheel = new EventEmitter<MapWheelEvent & EventData>();
  @Output() moveStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() move = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() moveEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() mapDragStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() mapDrag = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() mapDragEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() zoomStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() zoomEvt = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() zoomEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() rotateStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() rotate = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() rotateEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchEvt = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() boxZoomStart = new EventEmitter<MapLibreZoomEvent & EventData>();
  @Output() boxZoomEnd = new EventEmitter<MapLibreZoomEvent & EventData>();
  @Output() boxZoomCancel = new EventEmitter<MapLibreZoomEvent & EventData>();
  @Output() webGlContextLost = new EventEmitter<MapContextEvent & EventData>();
  @Output() webGlContextRestored = new EventEmitter<
    MapContextEvent & EventData
  >();
  @Output() mapLoad = new EventEmitter<Map>();
  @Output() idle = new EventEmitter<MapLibreEvent & EventData>();
  @Output() render = new EventEmitter<MapLibreEvent & EventData>();
  @Output() mapError = new EventEmitter<ErrorEvent & EventData>();
  @Output() data = new EventEmitter<MapDataEvent & EventData>();
  @Output() styleData = new EventEmitter<MapStyleDataEvent & EventData>();
  @Output() sourceData = new EventEmitter<MapSourceDataEvent & EventData>();
  @Output() dataLoading = new EventEmitter<MapDataEvent & EventData>();
  @Output() styleDataLoading = new EventEmitter<
    MapStyleDataEvent & EventData
  >();
  @Output() sourceDataLoading = new EventEmitter<
    MapSourceDataEvent & EventData
  >();
  @Output() styleImageMissing = new EventEmitter<{ id: string } & EventData>();

  /**
   * @deprecated Use mapResize instead
   */
  @Output() resize = new EventEmitter<MapLibreEvent & EventData>();
  /**
   * @deprecated Use mapRemove instead
   */
  @Output() remove = new EventEmitter<MapLibreEvent & EventData>();
  /**
   * @deprecated Use mapMouseDown instead
   */
  @Output() mouseDown = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapMouseUp instead
   */
  @Output() mouseUp = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapMouseMove instead
   */
  @Output() mouseMove = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapClick instead
   */
  @Output() click = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapDblClick instead
   */
  @Output() dblClick = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapMouseOver instead
   */
  @Output() mouseOver = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapMouseOut instead
   */
  @Output() mouseOut = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapContextMenu instead
   */
  @Output() contextMenu = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapTouchStart instead
   */
  @Output() touchStart = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use mapTouchEnd instead
   */
  @Output() touchEnd = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use mapTouchMove instead
   */
  @Output() touchMove = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use mapTouchCancel instead
   */
  @Output() touchCancel = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use mapWheel instead
   */
  @Output() wheel = new EventEmitter<MapWheelEvent & EventData>();
  /**
   * @deprecated Use mapDragStart instead
   */
  @Output() dragStart = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  /**
   * @deprecated Use mapDrag instead
   */
  @Output() drag = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  /**
   * @deprecated Use mapDragEnd instead
   */
  @Output() dragEnd = new EventEmitter<
    MapLibreEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  /**
   * @deprecated Use mapLoad instead
   */
  @Output() load = new EventEmitter<Map>();
  /**
   * @deprecated Use mapError instead
   */
  @Output() error = new EventEmitter<ErrorEvent & EventData>();

  get mapInstance(): Map {
    return this.MapService.mapInstance;
  }

  @ViewChild('container', { static: true }) mapContainer: ElementRef;

  constructor(private MapService: MapService) {}

  ngAfterViewInit() {
    this.warnDeprecatedOutputs();
    this.MapService.setup({
      mapOptions: {
        collectResourceTiming: this.collectResourceTiming,
        container: this.mapContainer.nativeElement,
        crossSourceCollisions: this.crossSourceCollisions,
        fadeDuration: this.fadeDuration,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        minPitch: this.minPitch,
        maxPitch: this.maxPitch,
        style: this.style,
        hash: this.hash,
        interactive: this.interactive,
        bearingSnap: this.bearingSnap,
        pitchWithRotate: this.pitchWithRotate,
        clickTolerance: this.clickTolerance,
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
        touchPitch: this.touchPitch,
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
    if (changes.minPitch && !changes.minPitch.isFirstChange()) {
      this.MapService.updateMinPitch(changes.minPitch.currentValue);
    }
    if (changes.maxPitch && !changes.maxPitch.isFirstChange()) {
      this.MapService.updateMaxPitch(changes.maxPitch.currentValue);
    }
    if (
      changes.renderWorldCopies &&
      !changes.renderWorldCopies.isFirstChange()
    ) {
      this.MapService.updateRenderWorldCopies(
        changes.renderWorldCopies.currentValue
      );
    }
    if (changes.scrollZoom && !changes.scrollZoom.isFirstChange()) {
      this.MapService.updateScrollZoom(changes.scrollZoom.currentValue);
    }
    if (changes.dragRotate && !changes.dragRotate.isFirstChange()) {
      this.MapService.updateDragRotate(changes.dragRotate.currentValue);
    }
    if (changes.touchPitch && !changes.touchPitch.isFirstChange()) {
      this.MapService.updateTouchPitch(changes.touchPitch.currentValue);
    }
    if (changes.touchZoomRotate && !changes.touchZoomRotate.isFirstChange()) {
      this.MapService.updateTouchZoomRotate(
        changes.touchZoomRotate.currentValue
      );
    }
    if (changes.doubleClickZoom && !changes.doubleClickZoom.isFirstChange()) {
      this.MapService.updateDoubleClickZoom(
        changes.doubleClickZoom.currentValue
      );
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
    if (
      changes.fitBounds &&
      changes.fitBounds.currentValue &&
      !changes.fitBounds.isFirstChange()
    ) {
      this.MapService.fitBounds(
        changes.fitBounds.currentValue,
        this.fitBoundsOptions
      );
    }
    if (
      changes.fitScreenCoordinates &&
      changes.fitScreenCoordinates.currentValue
    ) {
      if (
        (this.center || this.zoom || this.pitch || this.fitBounds) &&
        changes.fitScreenCoordinates.isFirstChange()
      ) {
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
      (changes.bearing &&
        !changes.bearing.isFirstChange() &&
        !changes.fitScreenCoordinates) ||
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

  private warnDeprecatedOutputs() {
    const dw = deprecationWarning.bind(undefined, MapComponent.name);
    if (this.resize.observers.length) {
      dw('resize', 'mapResize');
    }
    if (this.remove.observers.length) {
      dw('remove', 'mapRemove');
    }
    if (this.mouseDown.observers.length) {
      dw('mouseDown', 'mapMouseDown');
    }
    if (this.mouseUp.observers.length) {
      dw('mouseUp', 'mapMouseUp');
    }
    if (this.mouseMove.observers.length) {
      dw('mouseMove', 'mapMouseMove');
    }
    if (this.click.observers.length) {
      dw('click', 'mapClick');
    }
    if (this.dblClick.observers.length) {
      dw('dblClick', 'mapDblClick');
    }
    if (this.mouseOver.observers.length) {
      dw('mouseOver', 'mapMouseOver');
    }
    if (this.mouseOut.observers.length) {
      dw('mouseOut', 'mapMouseOut');
    }
    if (this.contextMenu.observers.length) {
      dw('contextMenu', 'mapContextMenu');
    }
    if (this.touchStart.observers.length) {
      dw('touchStart', 'mapTouchStart');
    }
    if (this.touchEnd.observers.length) {
      dw('touchEnd', 'mapTouchEnd');
    }
    if (this.touchMove.observers.length) {
      dw('touchMove', 'mapTouchMove');
    }
    if (this.touchCancel.observers.length) {
      dw('touchCancel', 'mapTouchCancel');
    }
    if (this.wheel.observers.length) {
      dw('wheel', 'mapWheel');
    }
    if (this.dragStart.observers.length) {
      dw('dragStart', 'mapDragStart');
    }
    if (this.drag.observers.length) {
      dw('drag', 'mapDrag');
    }
    if (this.dragEnd.observers.length) {
      dw('dragEnd', 'mapDragEnd');
    }
    if (this.load.observers.length) {
      dw('load', 'mapLoad');
    }
    if (this.error.observers.length) {
      dw('error', 'mapError');
    }
  }
}
