import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CanvasSourceOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
export declare class CanvasSourceComponent implements OnInit, OnDestroy, OnChanges, CanvasSourceOptions {
    private MapService;
    id: string;
    coordinates: number[][];
    canvas: string;
    animate?: boolean;
    private sourceAdded;
    private sub;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
}
