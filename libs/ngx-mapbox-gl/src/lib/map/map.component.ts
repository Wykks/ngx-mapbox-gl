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
  ErrorEvent,
  LngLatBoundsLike,
  Map,
  MapContextEvent,
  MapDataEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
  MapEvent,
  MapEvents,
  MapOptions,
  PointLike
} from 'mapbox-gl';
import { lastValueFrom } from 'rxjs';
import { deprecationWarning } from '../utils';
import { MapService, MovingOptions } from './map.service';
import { NgxMapEvent, EventData } from './map.types';

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
    NgxMapEvent
{
  /* Init inputs */
  @Input() accessToken?: MapOptions['accessToken'];
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
  @Input() locale?: MapOptions['locale'];
  @Input() cooperativeGestures?: MapOptions['cooperativeGestures'];

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
  // First value goes to options.fitBoundsOptions. Subsequents changes are passed to fitBounds
  @Input() fitBoundsOptions?: MapOptions['fitBoundsOptions'];
  @Input() renderWorldCopies?: MapOptions['renderWorldCopies'];
  @Input() projection?: MapOptions['projection'];

  /* Added by ngx-mapbox-gl */
  @Input() movingMethod: 'jumpTo' | 'easeTo' | 'flyTo' = 'flyTo';
  @Input() movingOptions?: MovingOptions;
  // => First value is a alias to bounds input (since mapbox 0.53.0). Subsequents changes are passed to fitBounds
  @Input() fitBounds?: LngLatBoundsLike;
  @Input() fitScreenCoordinates?: [PointLike, PointLike];
  @Input() centerWithPanTo?: boolean;
  @Input() panToOptions?: AnimationOptions;
  @Input() cursorStyle?: string;

  @Output() mapResize = new EventEmitter<MapEvent>();
  @Output() mapRemove = new EventEmitter<MapEvent>();
  @Output() mapMouseDown = new EventEmitter<MapMouseEvent>();
  @Output() mapMouseUp = new EventEmitter<MapMouseEvent>();
  @Output() mapMouseMove = new EventEmitter<MapMouseEvent>();
  @Output() mapClick = new EventEmitter<MapMouseEvent>();
  @Output() mapDblClick = new EventEmitter<MapMouseEvent>();
  @Output() mapMouseOver = new EventEmitter<MapMouseEvent>();
  @Output() mapMouseOut = new EventEmitter<MapMouseEvent>();
  @Output() mapContextMenu = new EventEmitter<MapMouseEvent>();
  @Output() mapTouchStart = new EventEmitter<MapTouchEvent>();
  @Output() mapTouchEnd = new EventEmitter<MapTouchEvent>();
  @Output() mapTouchMove = new EventEmitter<MapTouchEvent>();
  @Output() mapTouchCancel = new EventEmitter<MapTouchEvent>();
  @Output() mapWheel = new EventEmitter<MapWheelEvent>();
  @Output() moveStart = new EventEmitter<MapEvents['movestart']>();
  @Output() move = new EventEmitter<MapEvents['move']>();
  @Output() moveEnd = new EventEmitter<(MapEvents['moveend'])>();
  @Output() mapDragStart = new EventEmitter<MapEvents['dragstart']>();
  @Output() mapDrag = new EventEmitter<MapEvents['drag']>();
  @Output() mapDragEnd = new EventEmitter<MapEvents['dragend']>();
  @Output() zoomStart = new EventEmitter<MapEvents['zoomstart'] & EventData>();
  @Output() zoomEvt = new EventEmitter<MapEvents['zoom'] & EventData>();
  @Output() zoomEnd = new EventEmitter<MapEvents['zoomend'] & EventData>();
  @Output() rotateStart = new EventEmitter<MapEvents['rotatestart']>();
  @Output() rotate = new EventEmitter<MapEvents['rotate']>();
  @Output() rotateEnd = new EventEmitter<MapEvents['rotateend']>();
  @Output() pitchStart = new EventEmitter<MapEvents['pitchstart'] & EventData>();
  @Output() pitchEvt = new EventEmitter<MapEvents['pitch'] & EventData>();
  @Output() pitchEnd = new EventEmitter<MapEvents['pitchend'] & EventData>();
  @Output() boxZoomStart = new EventEmitter<MapEvents['boxzoomstart'] & EventData>();
  @Output() boxZoomEnd = new EventEmitter<MapEvents['boxzoomend'] & EventData>();
  @Output() boxZoomCancel = new EventEmitter<MapEvents['boxzoomcancel'] & EventData>();
  @Output() webGlContextLost = new EventEmitter<MapContextEvent>();
  @Output() webGlContextRestored = new EventEmitter<
    MapContextEvent
  >();
  @Output() mapLoad = new EventEmitter<MapEvent>();
  @Output() mapCreate = new EventEmitter<Map>();
  @Output() idle = new EventEmitter<MapEvent>();
  @Output() render = new EventEmitter<MapEvent>();
  @Output() mapError = new EventEmitter<ErrorEvent>();
  @Output() data = new EventEmitter<MapDataEvent>();
  @Output() styleData = new EventEmitter<MapStyleDataEvent>();
  @Output() sourceData = new EventEmitter<MapSourceDataEvent>();
  @Output() dataLoading = new EventEmitter<MapDataEvent>();
  @Output() styleDataLoading = new EventEmitter<
    MapStyleDataEvent
  >();
  @Output() sourceDataLoading = new EventEmitter<
    MapSourceDataEvent
  >();
  @Output() styleImageMissing = new EventEmitter<{ id: string }>();

  /**
   * @deprecated Use mapResize instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() resize = new EventEmitter<MapEvent>();
  /**
   * @deprecated Use mapRemove instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() remove = new EventEmitter<MapEvent>();
  /**
   * @deprecated Use mapMouseDown instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() mouseDown = new EventEmitter<MapMouseEvent>();
  /**
   * @deprecated Use mapMouseUp instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() mouseUp = new EventEmitter<MapMouseEvent>();
  /**
   * @deprecated Use mapMouseMove instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() mouseMove = new EventEmitter<MapMouseEvent>();
  /**
   * @deprecated Use mapClick instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() click = new EventEmitter<MapMouseEvent>();
  /**
   * @deprecated Use mapDblClick instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() dblClick = new EventEmitter<MapMouseEvent>();
  /**
   * @deprecated Use mapMouseOver instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() mouseOver = new EventEmitter<MapMouseEvent>();
  /**
   * @deprecated Use mapMouseOut instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() mouseOut = new EventEmitter<MapMouseEvent>();
  /**
   * @deprecated Use mapContextMenu instead
   */
  @Output() contextMenu = new EventEmitter<MapMouseEvent>();
  /**
   * @deprecated Use mapTouchStart instead
   */
  @Output() touchStart = new EventEmitter<MapTouchEvent>();
  /**
   * @deprecated Use mapTouchEnd instead
   */
  @Output() touchEnd = new EventEmitter<MapTouchEvent>();
  /**
   * @deprecated Use mapTouchMove instead
   */
  @Output() touchMove = new EventEmitter<MapTouchEvent>();
  /**
   * @deprecated Use mapTouchCancel instead
   */
  @Output() touchCancel = new EventEmitter<MapTouchEvent>();
  /**
   * @deprecated Use mapWheel instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() wheel = new EventEmitter<MapWheelEvent>();
  /**
   * @deprecated Use mapDragStart instead
   */
  @Output() dragStart = new EventEmitter<MapEvents['dragstart']>();
  /**
   * @deprecated Use mapDrag instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() drag = new EventEmitter<MapEvents['drag']>();
  /**
   * @deprecated Use mapDragEnd instead
   */
  @Output() dragEnd = new EventEmitter<MapEvents['dragend']>();
  /**
   * @deprecated Use mapLoad instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() load = new EventEmitter<Map>();
  /**
   * @deprecated Use mapError instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() error = new EventEmitter<ErrorEvent>();

  get mapInstance(): Map {
    return this.mapService.mapInstance;
  }

  @ViewChild('container', { static: true }) mapContainer: ElementRef;

  constructor(private mapService: MapService) {}

  ngAfterViewInit() {
    this.warnDeprecatedOutputs();
    this.mapService.setup({
      accessToken: this.accessToken,
      customMapboxApiUrl: this.customMapboxApiUrl,
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
        cooperativeGestures: this.cooperativeGestures,
        projection: this.projection,
      },
      mapEvents: this,
    });
    if (this.cursorStyle) {
      this.mapService.changeCanvasCursor(this.cursorStyle);
    }
  }

  ngOnDestroy() {
    this.mapService.destroyMap();
  }

  async ngOnChanges(changes: SimpleChanges) {
    await lastValueFrom(this.mapService.mapCreated$);
    if (changes['cursorStyle'] && !changes['cursorStyle'].isFirstChange()) {
      this.mapService.changeCanvasCursor(changes['cursorStyle'].currentValue);
    }
    if (changes['projection'] && !changes['projection'].isFirstChange()) {
      this.mapService.updateProjection(changes['projection'].currentValue);
    }
    if (changes['minZoom'] && !changes['minZoom'].isFirstChange()) {
      this.mapService.updateMinZoom(changes['minZoom'].currentValue);
    }
    if (changes['maxZoom'] && !changes['maxZoom'].isFirstChange()) {
      this.mapService.updateMaxZoom(changes['maxZoom'].currentValue);
    }
    if (changes['minPitch'] && !changes['minPitch'].isFirstChange()) {
      this.mapService.updateMinPitch(changes['minPitch'].currentValue);
    }
    if (changes['maxPitch'] && !changes['maxPitch'].isFirstChange()) {
      this.mapService.updateMaxPitch(changes['maxPitch'].currentValue);
    }
    if (
      changes['renderWorldCopies'] &&
      !changes['renderWorldCopies'].isFirstChange()
    ) {
      this.mapService.updateRenderWorldCopies(
        changes['renderWorldCopies'].currentValue
      );
    }
    if (changes['scrollZoom'] && !changes['scrollZoom'].isFirstChange()) {
      this.mapService.updateScrollZoom(changes['scrollZoom'].currentValue);
    }
    if (changes['dragRotate'] && !changes['dragRotate'].isFirstChange()) {
      this.mapService.updateDragRotate(changes['dragRotate'].currentValue);
    }
    if (changes['touchPitch'] && !changes['touchPitch'].isFirstChange()) {
      this.mapService.updateTouchPitch(changes['touchPitch'].currentValue);
    }
    if (
      changes['touchZoomRotate'] &&
      !changes['touchZoomRotate'].isFirstChange()
    ) {
      this.mapService.updateTouchZoomRotate(
        changes['touchZoomRotate'].currentValue
      );
    }
    if (
      changes['doubleClickZoom'] &&
      !changes['doubleClickZoom'].isFirstChange()
    ) {
      this.mapService.updateDoubleClickZoom(
        changes['doubleClickZoom'].currentValue
      );
    }
    if (changes['keyboard'] && !changes['keyboard'].isFirstChange()) {
      this.mapService.updateKeyboard(changes['keyboard'].currentValue);
    }
    if (changes['dragPan'] && !changes['dragPan'].isFirstChange()) {
      this.mapService.updateDragPan(changes['dragPan'].currentValue);
    }
    if (changes['boxZoom'] && !changes['boxZoom'].isFirstChange()) {
      this.mapService.updateBoxZoom(changes['boxZoom'].currentValue);
    }
    if (changes['style'] && !changes['style'].isFirstChange()) {
      this.mapService.updateStyle(changes['style'].currentValue);
    }
    if (changes['maxBounds'] && !changes['maxBounds'].isFirstChange()) {
      this.mapService.updateMaxBounds(changes['maxBounds'].currentValue);
    }
    if (
      changes['fitBounds'] &&
      changes['fitBounds'].currentValue &&
      !changes['fitBounds'].isFirstChange()
    ) {
      this.mapService.fitBounds(
        changes['fitBounds'].currentValue,
        this.fitBoundsOptions
      );
    }
    if (
      changes['fitScreenCoordinates'] &&
      changes['fitScreenCoordinates'].currentValue
    ) {
      if (
        (this.center || this.zoom || this.pitch || this.fitBounds) &&
        changes['fitScreenCoordinates'].isFirstChange()
      ) {
        console.warn(
          '[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input'
        );
      }
      this.mapService.fitScreenCoordinates(
        changes['fitScreenCoordinates'].currentValue,
        this.bearing ? this.bearing[0] : 0,
        this.movingOptions
      );
    }
    if (
      this.centerWithPanTo &&
      changes['center'] &&
      !changes['center'].isFirstChange() &&
      !changes['zoom'] &&
      !changes['bearing'] &&
      !changes['pitch']
    ) {
      this.mapService.panTo(this.center!, this.panToOptions);
    } else if (
      (changes['center'] && !changes['center'].isFirstChange()) ||
      (changes['zoom'] && !changes['zoom'].isFirstChange()) ||
      (changes['bearing'] &&
        !changes['bearing'].isFirstChange() &&
        !changes['fitScreenCoordinates']) ||
      (changes['pitch'] && !changes['pitch'].isFirstChange())
    ) {
      this.mapService.move(
        this.movingMethod,
        this.movingOptions,
        changes['zoom'] && this.zoom ? this.zoom[0] : undefined,
        changes['center'] ? this.center : undefined,
        changes['bearing'] && this.bearing ? this.bearing[0] : undefined,
        changes['pitch'] && this.pitch ? this.pitch[0] : undefined
      );
    }
  }

  private warnDeprecatedOutputs() {
    const dw = deprecationWarning.bind(undefined, MapComponent.name);
    if (this.resize.observed) {
      dw('resize', 'mapResize');
    }
    if (this.remove.observed) {
      dw('remove', 'mapRemove');
    }
    if (this.mouseDown.observed) {
      dw('mouseDown', 'mapMouseDown');
    }
    if (this.mouseUp.observed) {
      dw('mouseUp', 'mapMouseUp');
    }
    if (this.mouseMove.observed) {
      dw('mouseMove', 'mapMouseMove');
    }
    if (this.click.observed) {
      dw('click', 'mapClick');
    }
    if (this.dblClick.observed) {
      dw('dblClick', 'mapDblClick');
    }
    if (this.mouseOver.observed) {
      dw('mouseOver', 'mapMouseOver');
    }
    if (this.mouseOut.observed) {
      dw('mouseOut', 'mapMouseOut');
    }
    if (this.contextMenu.observed) {
      dw('contextMenu', 'mapContextMenu');
    }
    if (this.touchStart.observed) {
      dw('touchStart', 'mapTouchStart');
    }
    if (this.touchEnd.observed) {
      dw('touchEnd', 'mapTouchEnd');
    }
    if (this.touchMove.observed) {
      dw('touchMove', 'mapTouchMove');
    }
    if (this.touchCancel.observed) {
      dw('touchCancel', 'mapTouchCancel');
    }
    if (this.wheel.observed) {
      dw('wheel', 'mapWheel');
    }
    if (this.dragStart.observed) {
      dw('dragStart', 'mapDragStart');
    }
    if (this.drag.observed) {
      dw('drag', 'mapDrag');
    }
    if (this.dragEnd.observed) {
      dw('dragEnd', 'mapDragEnd');
    }
    if (this.load.observed) {
      dw('load', 'mapLoad');
    }
    if (this.error.observed) {
      dw('error', 'mapError');
    }
  }
}
