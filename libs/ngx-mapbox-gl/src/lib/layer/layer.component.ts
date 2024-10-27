import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Layer, LayerSpecification, MapMouseEvent, MapTouchEvent } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter, mapTo, startWith, switchMap } from 'rxjs/operators';
import { MapService, SetupLayer } from '../map/map.service';
import { NgxMapboxLayerEvents, EventData } from '../map/map.types';
import { deprecationWarning } from '../utils';

@Component({
  selector: 'mgl-layer',
  template: '',
})
export class LayerComponent
  implements OnInit, OnDestroy, OnChanges, Layer, NgxMapboxLayerEvents
{
  /* Init inputs */
  @Input() id: LayerSpecification['id'];
  @Input() source?: any | Layer['source'];
  @Input() type: LayerSpecification['type'];
  @Input() metadata?: Layer['metadata'];
  @Input() sourceLayer?: Layer['source-layer'];

  /* Dynamic inputs */
  @Input() filter?: Layer['filter'];
  @Input() layout?: Layer['layout'];
  @Input() paint?: Layer['paint'];
  @Input() before?: string;
  @Input() minzoom?: Layer['minzoom'];
  @Input() maxzoom?: Layer['maxzoom'];

  @Output() layerClick = new EventEmitter<MapMouseEvent & EventData>();
  @Output() layerDblClick = new EventEmitter<MapMouseEvent & EventData>();
  @Output() layerMouseDown = new EventEmitter<MapMouseEvent & EventData>();
  @Output() layerMouseUp = new EventEmitter<MapMouseEvent & EventData>();
  @Output() layerMouseEnter = new EventEmitter<
    MapMouseEvent
  >();
  @Output() layerMouseLeave = new EventEmitter<
    MapMouseEvent
  >();
  @Output() layerMouseMove = new EventEmitter<MapMouseEvent & EventData>();
  @Output() layerMouseOver = new EventEmitter<MapMouseEvent & EventData>();
  @Output() layerMouseOut = new EventEmitter<MapMouseEvent & EventData>();
  @Output() layerContextMenu = new EventEmitter<
    MapMouseEvent
  >();
  @Output() layerTouchStart = new EventEmitter<
    MapTouchEvent
  >();
  @Output() layerTouchEnd = new EventEmitter<MapTouchEvent & EventData>();
  @Output() layerTouchCancel = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use layerClick instead
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() click = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerDblClick instead
   */
  @Output() dblClick = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseDown instead
   */
  @Output() mouseDown = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseUp instead
   */
  @Output() mouseUp = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseEnter instead
   */
  @Output() mouseEnter = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseLeave instead
   */
  @Output() mouseLeave = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseMove instead
   */
  @Output() mouseMove = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseOver instead
   */
  @Output() mouseOver = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseOut instead
   */
  @Output() mouseOut = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerContextMenu instead
   */
  @Output() contextMenu = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use layerTouchStart instead
   */
  @Output() touchStart = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use layerTouchEnd instead
   */
  @Output() touchEnd = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use layerTouchCancel instead
   */
  @Output() touchCancel = new EventEmitter<MapTouchEvent & EventData>();

  private layerAdded = false;
  private sub: Subscription;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.warnDeprecatedOutputs();
    this.sub = this.mapService.mapLoaded$
      .pipe(
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            mapTo(false),
            filter(() => !this.mapService.mapInstance.getLayer(this.id)),
            startWith(true)
          )
        )
      )
      .subscribe((bindEvents: boolean) => this.init(bindEvents));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.layerAdded) {
      return;
    }
    if (changes['paint'] && !changes['paint'].isFirstChange()) {
      this.mapService.setAllLayerPaintProperty(
        this.id,
        changes['paint'].currentValue!
      );
    }
    if (changes['layout'] && !changes['layout'].isFirstChange()) {
      this.mapService.setAllLayerLayoutProperty(
        this.id,
        changes['layout'].currentValue!
      );
    }
    if (changes['filter'] && !changes['filter'].isFirstChange()) {
      this.mapService.setLayerFilter(this.id, changes['filter'].currentValue!);
    }
    if (changes['before'] && !changes['before'].isFirstChange()) {
      this.mapService.setLayerBefore(this.id, changes['before'].currentValue!);
    }
    if (
      (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
      (changes['maxzoom'] && !changes['maxzoom'].isFirstChange())
    ) {
      this.mapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
    }
  }

  ngOnDestroy() {
    if (this.layerAdded) {
      this.mapService.removeLayer(this.id);
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private init(bindEvents: boolean) {
    const layer: SetupLayer = {
      layerOptions: {
        id: this.id,
        type: this.type as any,
        source: this.source,
        metadata: this.metadata,
        'source-layer': this.sourceLayer,
        minzoom: this.minzoom,
        maxzoom: this.maxzoom,
        filter: this.filter,
        layout: this.layout,
        paint: this.paint,
      },
      layerEvents: {
        layerClick: this.layerClick,
        layerDblClick: this.layerDblClick,
        layerMouseDown: this.layerMouseDown,
        layerMouseUp: this.layerMouseUp,
        layerMouseEnter: this.layerMouseEnter,
        layerMouseLeave: this.layerMouseLeave,
        layerMouseMove: this.layerMouseMove,
        layerMouseOver: this.layerMouseOver,
        layerMouseOut: this.layerMouseOut,
        layerContextMenu: this.layerContextMenu,
        layerTouchStart: this.layerTouchStart,
        layerTouchEnd: this.layerTouchEnd,
        layerTouchCancel: this.layerTouchCancel,
        click: this.click,
        dblClick: this.dblClick,
        mouseDown: this.mouseDown,
        mouseUp: this.mouseUp,
        mouseEnter: this.mouseEnter,
        mouseLeave: this.mouseLeave,
        mouseMove: this.mouseMove,
        mouseOver: this.mouseOver,
        mouseOut: this.mouseOut,
        contextMenu: this.contextMenu,
        touchStart: this.touchStart,
        touchEnd: this.touchEnd,
        touchCancel: this.touchCancel,
      },
    };
    this.mapService.addLayer(layer, bindEvents, this.before);
    this.layerAdded = true;
  }

  private warnDeprecatedOutputs() {
    const dw = deprecationWarning.bind(undefined, LayerComponent.name);
    if (this.click.observed) {
      dw('click', 'layerClick');
    }
    if (this.dblClick.observed) {
      dw('dblClick', 'layerDblClick');
    }
    if (this.mouseDown.observed) {
      dw('mouseDown', 'layerMouseDown');
    }
    if (this.mouseUp.observed) {
      dw('mouseUp', 'layerMouseUp');
    }
    if (this.mouseEnter.observed) {
      dw('mouseEnter', 'layerMouseEnter');
    }
    if (this.mouseLeave.observed) {
      dw('mouseLeave', 'layerMouseLeave');
    }
    if (this.mouseMove.observed) {
      dw('mouseMove', 'layerMouseMove');
    }
    if (this.mouseOver.observed) {
      dw('mouseOver', 'layerMouseOver');
    }
    if (this.mouseOut.observed) {
      dw('mouseOut', 'layerMouseOut');
    }
    if (this.contextMenu.observed) {
      dw('contextMenu', 'layerContextMenu');
    }
    if (this.touchStart.observed) {
      dw('touchStart', 'layerTouchStart');
    }
    if (this.touchEnd.observed) {
      dw('touchEnd', 'layerTouchEnd');
    }
    if (this.touchCancel.observed) {
      dw('touchCancel', 'layerTouchCancel');
    }
  }
}
