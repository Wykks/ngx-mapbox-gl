import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { VideoSourceOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
export declare class VideoSourceComponent implements OnInit, OnDestroy, OnChanges, VideoSourceOptions {
    private MapService;
    id: string;
    urls: string[];
    coordinates: number[][];
    private sourceAdded;
    private sub;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private init;
}
