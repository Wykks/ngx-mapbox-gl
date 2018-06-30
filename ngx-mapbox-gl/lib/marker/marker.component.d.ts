import { ElementRef, OnChanges, OnDestroy, SimpleChanges, AfterViewInit, OnInit } from '@angular/core';
import { LngLatLike, Marker, PointLike } from 'mapbox-gl';
import { MapService } from '../map/map.service';
export declare class MarkerComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
    private MapService;
    offset?: PointLike;
    anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: LngLatLike;
    content: ElementRef;
    markerInstance?: Marker;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    togglePopup(): void;
    updateCoordinates(coordinates: number[]): void;
}
