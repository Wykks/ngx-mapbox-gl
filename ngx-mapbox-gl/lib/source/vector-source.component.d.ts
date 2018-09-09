import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { VectorSource } from 'mapbox-gl';
import { MapService } from '../map/map.service';
export declare class VectorSourceComponent implements OnInit, OnDestroy, OnChanges, VectorSource {
    private MapService;
    id: string;
    url?: string;
    tiles?: string[];
    minzoom?: number;
    maxzoom?: number;
    type: 'vector';
    private sourceAdded;
    private sub;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
}
