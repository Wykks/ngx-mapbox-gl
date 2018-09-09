import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RasterSource } from 'mapbox-gl';
import { MapService } from '../map/map.service';
export declare class RasterSourceComponent implements OnInit, OnDestroy, OnChanges, RasterSource {
    private MapService;
    id: string;
    url: string;
    tiles?: string[];
    bounds?: number[];
    minzoom?: number;
    maxzoom?: number;
    tileSize?: number;
    type: 'raster';
    private sourceAdded;
    private sub;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
}
