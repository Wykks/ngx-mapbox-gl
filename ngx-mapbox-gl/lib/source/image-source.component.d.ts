import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ImageSourceOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
export declare class ImageSourceComponent implements OnInit, OnDestroy, OnChanges, ImageSourceOptions {
    private MapService;
    id: string;
    url: string;
    coordinates: number[][];
    private sourceAdded;
    private sub;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
}
