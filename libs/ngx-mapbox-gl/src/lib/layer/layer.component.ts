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
  Layer,
  MapMouseEvent,
  MapTouchEvent,
  SourceSpecification,
} from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter, mapTo, startWith, switchMap } from 'rxjs/operators';
import { MapService, SetupLayer } from '../map/map.service';
import { LayerEvents } from '../map/map.types';

@Component({
  selector: 'mgl-layer',
  template: '',
})
export class LayerComponent
  implements OnInit, OnDestroy, OnChanges, Omit<Layer, 'source'>, LayerEvents {

  /* Init inputs */
  @Input() id: Layer['id'];
  @Input() source?: SourceSpecification | Layer['source'];
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

  constructor(private mapService: MapService) { }

  ngOnInit() {
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

      const inlineLayerSourceId = `${this.id}___source___`;
      const inlineLayerSource = this.mapService.getSource(inlineLayerSourceId);

      if (inlineLayerSource) {
        this.mapService.removeSource(inlineLayerSourceId);
      }
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  get inlineLayerSourceId() {
    return `${this.id}___source___`;
  }

  private init(bindEvents: boolean) {
    let source: Layer['source'];

    if (typeof this.source === 'object') {
      const tempSourceId = `${this.id}___source___`;
      this.mapService.addSource(tempSourceId, this.source);
      source = tempSourceId;
    } else {
      source = this.source!;
    }

    const layer: SetupLayer = {
      layerOptions: {
        id: this.id,
        type: this.type as any,
        source,
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
        layerTouchCancel: this.layerTouchCancel
      },
    };

    this.mapService.addLayer(layer, bindEvents, this.before);
    this.layerAdded = true;
  }

}
