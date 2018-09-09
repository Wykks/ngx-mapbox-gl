import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BackgroundLayout, BackgroundPaint, CircleLayout, CirclePaint, FillExtrusionLayout, FillExtrusionPaint, FillLayout, FillPaint, GeoJSONSource, GeoJSONSourceRaw, ImageSource, Layer, LineLayout, LinePaint, MapMouseEvent, RasterLayout, RasterPaint, RasterSource, SymbolLayout, SymbolPaint, VectorSource, VideoSource } from 'mapbox-gl';
import { MapService } from '../map/map.service';
export declare class LayerComponent implements OnInit, OnDestroy, OnChanges, Layer {
    private MapService;
    id: string;
    source?: string | VectorSource | RasterSource | GeoJSONSource | ImageSource | VideoSource | GeoJSONSourceRaw;
    type: 'symbol' | 'fill' | 'line' | 'circle' | 'fill-extrusion' | 'raster' | 'background';
    metadata?: any;
    sourceLayer?: string;
    filter?: any[];
    layout?: BackgroundLayout | FillLayout | FillExtrusionLayout | LineLayout | SymbolLayout | RasterLayout | CircleLayout;
    paint?: BackgroundPaint | FillPaint | FillExtrusionPaint | LinePaint | SymbolPaint | RasterPaint | CirclePaint;
    before?: string;
    minzoom?: number;
    maxzoom?: number;
    click: EventEmitter<MapMouseEvent>;
    mouseEnter: EventEmitter<MapMouseEvent>;
    mouseLeave: EventEmitter<MapMouseEvent>;
    mouseMove: EventEmitter<MapMouseEvent>;
    private layerAdded;
    private sub;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
}
