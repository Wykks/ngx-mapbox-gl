import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  output,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { lastValueFrom, Subject } from 'rxjs';
import { MapService, MovingOptions } from './map.service';
import { NgxMapEvent } from './map.types';
import {
  type AnimationOptions,
  type LngLatBoundsLike,
  type Map,
  type MapContextEvent,
  type MapDataEvent,
  type MapEvent,
  type MapEvents,
  type MapMouseEvent,
  type MapOptions,
  type MapSourceDataEvent,
  type MapStyleDataEvent,
  type MapTouchEvent,
  type MapWheelEvent,
  type PointLike,
} from 'mapbox-gl';

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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent
  implements
    OnChanges,
    OnDestroy,
    Omit<MapOptions, 'bearing' | 'container' | 'pitch' | 'zoom'>
{
  /* Init inputs */
  @Input() accessToken?: MapOptions['accessToken'];
  @Input() collectResourceTiming?: MapOptions['collectResourceTiming'];
  @Input() crossSourceCollisions?: MapOptions['crossSourceCollisions'];
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
  // TODO: [V12]: MAYBE CHANGE THIS TO MODEL()
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

  // resizeEmitter = new Subject<MapEvent>();
  // mapResize = outputFromObservable(this.mapResizeEmitter);
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
  @Output() moveEnd = new EventEmitter<MapEvents['moveend']>();
  @Output() mapDragStart = new EventEmitter<MapEvents['dragstart']>();
  @Output() mapDrag = new EventEmitter<MapEvents['drag']>();
  @Output() mapDragEnd = new EventEmitter<MapEvents['dragend']>();
  @Output() zoomStart = new EventEmitter<void>();
  @Output() zoomEvt = new EventEmitter<void>();
  @Output() zoomEnd = new EventEmitter<void>();
  @Output() rotateStart = new EventEmitter<MapEvents['rotatestart']>();
  @Output() rotate = new EventEmitter<MapEvents['rotate']>();
  @Output() rotateEnd = new EventEmitter<MapEvents['rotateend']>();
  @Output() pitchStart = new EventEmitter<void>();
  @Output() pitchEvt = new EventEmitter<void>();
  @Output() pitchEnd = new EventEmitter<void>();
  @Output() boxZoomStart = new EventEmitter<MapEvents['boxzoomstart']>();
  @Output() boxZoomEnd = new EventEmitter<MapEvents['boxzoomend']>();
  @Output() boxZoomCancel = new EventEmitter<MapEvents['boxzoomcancel']>();
  @Output() webGlContextLost = new EventEmitter<MapContextEvent>();
  @Output() webGlContextRestored = new EventEmitter<MapContextEvent>();
  @Output() mapLoad = new EventEmitter<MapEvent>();
  @Output() mapCreate = new EventEmitter<Map>();
  @Output() idle = new EventEmitter<void>();
  @Output() render = new EventEmitter<void>();
  @Output() mapError = new EventEmitter<Error>();
  @Output() data = new EventEmitter<MapDataEvent>();
  @Output() styleData = new EventEmitter<MapStyleDataEvent>();
  @Output() sourceData = new EventEmitter<MapSourceDataEvent>();
  @Output() dataLoading = new EventEmitter<MapDataEvent>();
  @Output() styleDataLoading = new EventEmitter<MapStyleDataEvent>();
  @Output() sourceDataLoading = new EventEmitter<MapSourceDataEvent>();
  @Output() styleImageMissing = new EventEmitter<
    MapEvents['styleimagemissing']
  >();

  get mapInstance(): Map {
    return this.mapService.mapInstance;
  }

  @ViewChild('container', { static: true }) mapContainer: ElementRef;

  constructor(private mapService: MapService) {
    afterNextRender(() => {
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
    });
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
        changes['renderWorldCopies'].currentValue,
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
        changes['touchZoomRotate'].currentValue,
      );
    }
    if (
      changes['doubleClickZoom'] &&
      !changes['doubleClickZoom'].isFirstChange()
    ) {
      this.mapService.updateDoubleClickZoom(
        changes['doubleClickZoom'].currentValue,
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
        this.fitBoundsOptions,
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
          '[ngx-mapbox-gl] center / zoom / pitch / fitBounds inputs are being overridden by fitScreenCoordinates input',
        );
      }
      this.mapService.fitScreenCoordinates(
        changes['fitScreenCoordinates'].currentValue,
        this.bearing ? this.bearing[0] : 0,
        this.movingOptions,
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
        changes['pitch'] && this.pitch ? this.pitch[0] : undefined,
      );
    }
  }
}
