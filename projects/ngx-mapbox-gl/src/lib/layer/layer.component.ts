import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventData, Layer, MapLayerMouseEvent, MapLayerTouchEvent } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter, mapTo, switchMap, startWith } from 'rxjs/operators';
import { MapService, SetupLayer } from '../map/map.service';
import { LayerEvents } from '../map/map.types';

@Component({
  selector: 'mgl-layer',
  template: '',
})
export class LayerComponent implements OnInit, OnDestroy, OnChanges, Layer, LayerEvents {
  /* Init inputs */
  @Input() id: Layer['id'];
  @Input() source?: Layer['source'];
  @Input() type: Layer['type'];
  @Input() metadata?: Layer['metadata'];
  @Input() sourceLayer?: Layer['source-layer'];

  /* Dynamic inputs */
  @Input() filter?: Layer['filter'];
  @Input() layout?: Layer['layout'];
  @Input() paint?: Layer['paint'];
  @Input() before?: string;
  @Input() minzoom?: Layer['minzoom'];
  @Input() maxzoom?: Layer['maxzoom'];

  @Output() click = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() dblClick = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() mouseDown = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() mouseUp = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() mouseEnter = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() mouseLeave = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() mouseMove = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() mouseOver = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() mouseOut = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() contextMenu = new EventEmitter<MapLayerMouseEvent & EventData>();
  @Output() touchStart = new EventEmitter<MapLayerTouchEvent & EventData>();
  @Output() touchEnd = new EventEmitter<MapLayerTouchEvent & EventData>();
  @Output() touchCancel = new EventEmitter<MapLayerTouchEvent & EventData>();

  private layerAdded = false;
  private sub: Subscription;

  constructor(private MapService: MapService) {}

  ngOnInit() {
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
      this.MapService.setAllLayerPaintProperty(this.id, changes.paint.currentValue!);
    }
    if (changes.layout && !changes.layout.isFirstChange()) {
      this.MapService.setAllLayerLayoutProperty(this.id, changes.layout.currentValue!);
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
        type: this.type,
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
}
