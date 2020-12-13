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
import {
  AnyLayer,
  EventData,
  Layer,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter, mapTo, startWith, switchMap } from 'rxjs/operators';
import { MapService, SetupLayer } from '../map/map.service';
import { LayerEvents } from '../map/map.types';
import { deprecationWarning } from '../utils';

@Component({
  selector: 'mgl-layer',
  template: '',
})
export class LayerComponent
  implements OnInit, OnDestroy, OnChanges, Layer, LayerEvents {
  /* Init inputs */
  @Input() id: AnyLayer['id'];
  @Input() source?: Layer['source'];
  @Input() type: AnyLayer['type'];
  @Input() metadata?: Layer['metadata'];
  @Input() sourceLayer?: Layer['source-layer'];

  /* Dynamic inputs */
  @Input() filter?: Layer['filter'];
  @Input() layout?: Layer['layout'];
  @Input() paint?: Layer['paint'];
  @Input() before?: string;
  @Input() minzoom?: Layer['minzoom'];
  @Input() maxzoom?: Layer['maxzoom'];

  @Output() layerClick = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() layerDblClick = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() layerMouseDown = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() layerMouseUp = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() layerMouseEnter = new EventEmitter<
    MapLayerMouseEvent & EventData
  >();
  @Output() layerMouseLeave = new EventEmitter<
    MapLayerMouseEvent & EventData
  >();
  @Output() layerMouseMove = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() layerMouseOver = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() layerMouseOut = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() layerContextMenu = new EventEmitter<
    MapLayerMouseEvent & EventData
  >();
  @Output() layerTouchStart = new EventEmitter<
    MapLayerTouchEvent & EventData
  >();
  @Output() layerTouchEnd = new EventEmitter<MapLayerTouchEvent & EventData>();
  @Output() layerTouchCancel = new EventEmitter<
    MapLayerTouchEvent & EventData
  >();
  /**
   * @deprecated Use layerClick instead
   */
  @Output() click = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerDblClick instead
   */
  @Output() dblClick = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseDown instead
   */
  @Output() mouseDown = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseUp instead
   */
  @Output() mouseUp = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseEnter instead
   */
  @Output() mouseEnter = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseLeave instead
   */
  @Output() mouseLeave = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseMove instead
   */
  @Output() mouseMove = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseOver instead
   */
  @Output() mouseOver = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerMouseOut instead
   */
  @Output() mouseOut = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerContextMenu instead
   */
  @Output() contextMenu = new EventEmitter<MapLayerMouseEvent & EventData>();
  /**
   * @deprecated Use layerTouchStart instead
   */
  @Output() touchStart = new EventEmitter<MapLayerTouchEvent & EventData>();
  /**
   * @deprecated Use layerTouchEnd instead
   */
  @Output() touchEnd = new EventEmitter<MapLayerTouchEvent & EventData>();
  /**
   * @deprecated Use layerTouchCancel instead
   */
  @Output() touchCancel = new EventEmitter<MapLayerTouchEvent & EventData>();

  private layerAdded = false;
  private sub: Subscription;

  constructor(private MapService: MapService) {}

  ngOnInit() {
    this.warnDeprecatedOutputs();
    this.sub = this.MapService.mapLoaded$
      .pipe(
        switchMap(() =>
          fromEvent(<any>this.MapService.mapInstance, 'styledata').pipe(
            mapTo(false),
            filter(() => !this.MapService.mapInstance.getLayer(this.id)),
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
    if (changes.paint && !changes.paint.isFirstChange()) {
      this.MapService.setAllLayerPaintProperty(
        this.id,
        changes.paint.currentValue!
      );
    }
    if (changes.layout && !changes.layout.isFirstChange()) {
      this.MapService.setAllLayerLayoutProperty(
        this.id,
        changes.layout.currentValue!
      );
    }
    if (changes.filter && !changes.filter.isFirstChange()) {
      this.MapService.setLayerFilter(this.id, changes.filter.currentValue!);
    }
    if (changes.before && !changes.before.isFirstChange()) {
      this.MapService.setLayerBefore(this.id, changes.before.currentValue!);
    }
    if (
      (changes.minzoom && !changes.minzoom.isFirstChange()) ||
      (changes.maxzoom && !changes.maxzoom.isFirstChange())
    ) {
      this.MapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
    }
  }

  ngOnDestroy() {
    if (this.layerAdded) {
      this.MapService.removeLayer(this.id);
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private init(bindEvents: boolean) {
    const layer: SetupLayer = {
      layerOptions: {
        id: this.id,
        type: <any>this.type,
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
    this.MapService.addLayer(layer, bindEvents, this.before);
    this.layerAdded = true;
  }

  private warnDeprecatedOutputs() {
    const dw = deprecationWarning.bind(undefined, LayerComponent.name);
    if (this.click.observers.length) {
      dw('click', 'layerClick');
    }
    if (this.dblClick.observers.length) {
      dw('dblClick', 'layerDblClick');
    }
    if (this.mouseDown.observers.length) {
      dw('mouseDown', 'layerMouseDown');
    }
    if (this.mouseUp.observers.length) {
      dw('mouseUp', 'layerMouseUp');
    }
    if (this.mouseEnter.observers.length) {
      dw('mouseEnter', 'layerMouseEnter');
    }
    if (this.mouseLeave.observers.length) {
      dw('mouseLeave', 'layerMouseLeave');
    }
    if (this.mouseMove.observers.length) {
      dw('mouseMove', 'layerMouseMove');
    }
    if (this.mouseOver.observers.length) {
      dw('mouseOver', 'layerMouseOver');
    }
    if (this.mouseOut.observers.length) {
      dw('mouseOut', 'layerMouseOut');
    }
    if (this.contextMenu.observers.length) {
      dw('contextMenu', 'layerContextMenu');
    }
    if (this.touchStart.observers.length) {
      dw('touchStart', 'layerTouchStart');
    }
    if (this.touchEnd.observers.length) {
      dw('touchEnd', 'layerTouchEnd');
    }
    if (this.touchCancel.observers.length) {
      dw('touchCancel', 'layerTouchCancel');
    }
  }
}
