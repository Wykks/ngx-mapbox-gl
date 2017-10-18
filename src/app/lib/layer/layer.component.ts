import { Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import {
  BackgroundLayout,
  CircleLayout,
  FillExtrusionLayout,
  FillLayout,
  GeoJSONSource,
  GeoJSONSourceRaw,
  ImageSource,
  Layer,
  LineLayout,
  RasterLayout,
  RasterSource,
  SymbolLayout,
  VectorSource,
  VideoSource,
  BackgroundPaint,
  FillPaint,
  FillExtrusionPaint,
  LinePaint,
  SymbolPaint,
  RasterPaint,
  CirclePaint
} from 'mapbox-gl';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-layer',
  template: ''
})
export class LayerComponent implements OnInit, OnDestroy, OnChanges, Layer {
  /* Init inputs */
  @Input() id: string;
  @Input() source?: string | VectorSource | RasterSource | GeoJSONSource | ImageSource | VideoSource | GeoJSONSourceRaw;
  @Input() type?: 'symbol' | 'fill' | 'line' | 'circle' | 'fill-extrusion' | 'raster' | 'background';
  @Input() metadata?: any;
  @Input() ref?: string;
  @Input() sourceLayer?: string;
  @Input() interactive?: boolean;

  /* Dynamic inputs */
  @Input() filter?: any[];
  @Input() layout?: BackgroundLayout | FillLayout | FillExtrusionLayout | LineLayout | SymbolLayout | RasterLayout | CircleLayout;
  @Input() paint?: BackgroundPaint | FillPaint | FillExtrusionPaint | LinePaint | SymbolPaint | RasterPaint | CirclePaint;
  @Input() before?: string;
  @Input() minzoom?: number;
  @Input() maxzoom?: number;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(() => {
      this.MapService.addLayer({
        id: this.id,
        type: this.type,
        source: this.source,
        metadata: this.metadata,
        ref: this.ref,
        'source-layer': this.sourceLayer,
        minzoom: this.minzoom,
        maxzoom: this.maxzoom,
        interactive: this.interactive,
        filter: this.filter,
        layout: this.layout,
        paint: this.paint
      }, this.before);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.paint && !changes.paint.isFirstChange()) {
      this.MapService.setAllPaintProperty(this.id, changes.paint.currentValue!);
    }
    if (changes.layout && !changes.layout.isFirstChange()) {
      this.MapService.setAllLayoutProperty(this.id, changes.layout.currentValue!);
    }
    // TODO Update others dynamic inputs
  }

  ngOnDestroy() {
    this.MapService.removeLayer(this.id);
  }
}
