import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type {
  Layer,
  MapMouseEvent,
  MapTouchEvent,
  Map,
  SourceSpecification,
  LayerSpecification,
} from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { MapService, SetupLayer } from '../map/map.service';
import { LayerEvents } from '../map/map.types';

type AnyLayerSource = LayerSpecification['source'] | SourceSpecification;

@Component({
  selector: 'mgl-layer',
  template: '',
})
export class LayerComponent
  implements OnInit, OnDestroy, OnChanges, LayerEvents
{
  private mapService = inject(MapService);

  /* Init inputs */
  id = input.required<Layer['id']>();
  source = input<AnyLayerSource>();
  type = input.required<Layer['type']>();
  metadata = input<Layer['metadata']>();
  sourceLayer = input<Layer['source-layer']>();

  /* Dynamic inputs */
  filter = input<Layer['filter']>();
  layout = input<Layer['layout']>();
  paint = input<Layer['paint']>();
  before = input<Parameters<Map['moveLayer']>[1]>();
  minzoom = input<Layer['minzoom']>();
  maxzoom = input<Layer['maxzoom']>();

  @Output() layerClick = new EventEmitter<MapMouseEvent>();
  @Output() layerDblClick = new EventEmitter<MapMouseEvent>();
  @Output() layerMouseDown = new EventEmitter<MapMouseEvent>();
  @Output() layerMouseUp = new EventEmitter<MapMouseEvent>();
  @Output() layerMouseEnter = new EventEmitter<MapMouseEvent>();
  @Output() layerMouseLeave = new EventEmitter<MapMouseEvent>();
  @Output() layerMouseMove = new EventEmitter<MapMouseEvent>();
  @Output() layerMouseOver = new EventEmitter<MapMouseEvent>();
  @Output() layerMouseOut = new EventEmitter<MapMouseEvent>();
  @Output() layerContextMenu = new EventEmitter<MapMouseEvent>();
  @Output() layerTouchStart = new EventEmitter<MapTouchEvent>();
  @Output() layerTouchEnd = new EventEmitter<MapTouchEvent>();
  @Output() layerTouchCancel = new EventEmitter<MapTouchEvent>();

  private layerAdded = false;
  private sub: Subscription;

  ngOnInit() {
    this.sub = this.mapService.mapLoaded$
      .pipe(
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            map(() => false),
            filter(() => !this.mapService.mapInstance.getLayer(this.id())),
            startWith(true),
          ),
        ),
      )
      .subscribe((bindEvents: boolean) => this.init(bindEvents));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.layerAdded) {
      return;
    }
    if (changes['paint'] && !changes['paint'].isFirstChange()) {
      this.mapService.setLayerAllPaintProperty(
        this.id(),
        changes['paint'].currentValue!,
      );
    }
    if (changes['layout'] && !changes['layout'].isFirstChange()) {
      this.mapService.setLayerAllLayoutProperty(
        this.id(),
        changes['layout'].currentValue!,
      );
    }
    if (changes['filter'] && !changes['filter'].isFirstChange()) {
      this.mapService.setLayerFilter(
        this.id(),
        changes['filter'].currentValue!,
      );
    }
    if (changes['before'] && !changes['before'].isFirstChange()) {
      this.mapService.setLayerBefore(
        this.id(),
        changes['before'].currentValue!,
      );
    }
    if (
      (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
      (changes['maxzoom'] && !changes['maxzoom'].isFirstChange())
    ) {
      this.mapService.setLayerZoomRange(
        this.id(),
        this.minzoom(),
        this.maxzoom(),
      );
    }
  }

  ngOnDestroy() {
    if (this.layerAdded) {
      this.mapService.removeLayer(this.id());
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private init(bindEvents: boolean) {
    const layer: SetupLayer = {
      layerOptions: {
        id: this.id(),
        type: this.type(),
        source: this.source(),
        metadata: this.metadata(),
        'source-layer': this.sourceLayer(),
        minzoom: this.minzoom(),
        maxzoom: this.maxzoom(),
        filter: this.filter(),
        layout: this.layout(),
        paint: this.paint(),
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
      },
    };
    this.mapService.addLayer(layer, bindEvents, this.before());
    this.layerAdded = true;
  }
}
