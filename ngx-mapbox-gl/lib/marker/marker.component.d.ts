import { AfterViewInit, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import { LngLatLike, Marker, PointLike, Anchor } from 'mapbox-gl';
import { MapService } from '../map/map.service';
export declare class MarkerComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
    private MapService;
    offset?: PointLike;
    anchor?: Anchor;
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: LngLatLike;
    draggable?: boolean;
    dragStart: EventEmitter<Marker>;
    drag: EventEmitter<Marker>;
    dragEnd: EventEmitter<Marker>;
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
