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
  MapOptions,
  PointLike,
  MapEventOf,
} from 'mapbox-gl';
import { lastValueFrom } from 'rxjs';
import { MapService, MovingOptions } from './map.service';
import { MapEvent } from './map.types';

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
  @Input() accessToken?: MapOptions['accessToken'];
  @Input() collectResourceTiming?: MapOptions['collectResourceTiming'];
  @Input() crossSourceCollisions?: MapOptions['crossSourceCollisions'];
  @Input() customMapboxApiUrl?: string;
  @Input() fadeDuration?: MapOptions['fadeDuration'];
  @Input() hash?: MapOptions['hash'];
  @Input() refreshExpiredTiles?: MapOptions['refreshExpiredTiles'];
  @Input() failIfMajorPerformanceCaveat?: MapOptions['failIfMajorPerformanceCaveat'];
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
  @Input() zoom?: MapOptions['zoom'];
  @Input() bearing?: MapOptions['bearing'];
  @Input() pitch?: MapOptions['bearing'];
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

  @Output() mapResize = new EventEmitter<MapEventOf<'resize'>>();
  @Output() mapRemove = new EventEmitter<MapEventOf<'remove'>>();
  @Output() mapMouseDown = new EventEmitter<MapEventOf<'mousedown'>>();
  @Output() mapMouseUp = new EventEmitter<MapEventOf<'mouseup'>>();
  @Output() mapMouseMove = new EventEmitter<MapEventOf<'mousemove'>>();
  @Output() mapClick = new EventEmitter<MapEventOf<'click'>>();
  @Output() mapDblClick = new EventEmitter<MapEventOf<'dblclick'>>();
  @Output() mapMouseOver = new EventEmitter<MapEventOf<'mouseover'>>();
  @Output() mapMouseOut = new EventEmitter<MapEventOf<'mouseout'>>();
  @Output() mapContextMenu = new EventEmitter<MapEventOf<'contextmenu'>>();
  @Output() mapTouchStart = new EventEmitter<MapEventOf<'touchstart'>>();
  @Output() mapTouchEnd = new EventEmitter<MapEventOf<'touchend'>>();
  @Output() mapTouchMove = new EventEmitter<MapEventOf<'touchmove'>>();
  @Output() mapTouchCancel = new EventEmitter<MapEventOf<'touchcancel'>>();
  @Output() mapWheel = new EventEmitter<MapEventOf<'wheel'>>();
  @Output() moveStart = new EventEmitter<MapEventOf<'movestart'>>();
  @Output() move = new EventEmitter<MapEventOf<'move'>>();
  @Output() moveEnd = new EventEmitter<MapEventOf<'moveend'>>();
  @Output() mapDragStart = new EventEmitter<MapEventOf<'dragstart'>>();
  @Output() mapDrag = new EventEmitter<MapEventOf<'drag'>>();
  @Output() mapDragEnd = new EventEmitter<MapEventOf<'dragend'>>();
  @Output() zoomStart = new EventEmitter<MapEventOf<'zoomstart'>>();
  @Output() zoomEvt = new EventEmitter<MapEventOf<'zoom'>>();
  @Output() zoomEnd = new EventEmitter<MapEventOf<'zoomend'>>();
  @Output() rotateStart = new EventEmitter<MapEventOf<'rotatestart'>>();
  @Output() rotate = new EventEmitter<MapEventOf<'rotate'>>();
  @Output() rotateEnd = new EventEmitter<MapEventOf<'rotateend'>>();
  @Output() pitchStart = new EventEmitter<MapEventOf<'pitchstart'>>();
  @Output() pitchEvt = new EventEmitter<MapEventOf<'pitch'>>();
  @Output() pitchEnd = new EventEmitter<MapEventOf<'pitchend'>>();
  @Output() boxZoomStart = new EventEmitter<MapEventOf<'boxzoomstart'>>();
  @Output() boxZoomEnd = new EventEmitter<MapEventOf<'boxzoomend'>>();
  @Output() boxZoomCancel = new EventEmitter<MapEventOf<'boxzoomcancel'>>();
  @Output() webGlContextLost = new EventEmitter<MapEventOf<'webglcontextlost'>>();
  @Output() webGlContextRestored = new EventEmitter<MapEventOf<'webglcontextrestored'>>();
  @Output() mapLoad = new EventEmitter<MapEventOf<'load'>>();
  @Output() mapCreate = new EventEmitter<Map>();
  @Output() idle = new EventEmitter<MapEventOf<'idle'>>();
  @Output() render = new EventEmitter<MapEventOf<'render'>>();
  @Output() mapError = new EventEmitter<MapEventOf<'error'>>();
  @Output() data = new EventEmitter<MapEventOf<'data'>>();
  @Output() styleData = new EventEmitter<MapEventOf<'styledata'>>();
  @Output() sourceData = new EventEmitter<MapEventOf<'sourcedata'>>();
  @Output() dataLoading = new EventEmitter<MapEventOf<'dataloading'>>();
  @Output() styleDataLoading = new EventEmitter<MapEventOf<'styledataloading'>>();
  @Output() sourceDataLoading = new EventEmitter<MapEventOf<'sourcedataloading'>>();
  @Output() styleImageMissing = new EventEmitter<MapEventOf<'styleimagemissing'>>();
  @Output() load = new EventEmitter<MapEventOf<'load'>['target']>();

  get mapInstance(): Map {
    return this.mapService.mapInstance;
  }

  @ViewChild('container', { static: true }) mapContainer: ElementRef;

  constructor(private mapService: MapService) { }

  ngAfterViewInit() {
    this.mapService.setup({
      accessToken: this.accessToken,
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
        (this.center != null || this.zoom != null || this.pitch != null || this.fitBounds != null) &&
        changes['fitScreenCoordinates'].isFirstChange()
      ) {
        console.warn(
          '[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input'
        );
      }
      this.mapService.fitScreenCoordinates(
        changes['fitScreenCoordinates'].currentValue,
        this.bearing ? this.bearing : 0,
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
        this.zoom,
        this.center,
        this.bearing,
        this.pitch
      );
    }
  }

}
