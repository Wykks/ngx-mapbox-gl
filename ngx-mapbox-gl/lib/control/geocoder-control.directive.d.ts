import { EventEmitter, InjectionToken, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { GeocoderEvent } from '../map/map.types';
import { ControlComponent } from './control.component';
export declare const MAPBOX_GEOCODER_API_KEY: InjectionToken<{}>;
export interface LngLatLiteral {
    latitude: number;
    longitude: number;
}
export interface Results extends GeoJSON.FeatureCollection<GeoJSON.Point> {
    attribution: string;
    query: string[];
}
export interface Result extends GeoJSON.Feature<GeoJSON.Point> {
    bbox: [number, number, number, number];
    center: number[];
    place_name: string;
    place_type: string[];
    relevance: number;
    text: string;
    address: string;
    context: any[];
}
export declare class GeocoderControlDirective implements OnInit, OnChanges, GeocoderEvent {
    private MapService;
    private zone;
    private ControlComponent;
    private readonly MAPBOX_GEOCODER_API_KEY;
    country?: string;
    placeholder?: string;
    zoom?: number;
    bbox?: [number, number, number, number];
    types?: string;
    flyTo?: boolean;
    minLength?: number;
    limit?: number;
    language?: string;
    accessToken?: string;
    filter?: (feature: Result) => boolean;
    localGeocoder?: (query: string) => Result[];
    proximity?: LngLatLiteral;
    searchInput?: string;
    clear: EventEmitter<void>;
    loading: EventEmitter<{
        query: string;
    }>;
    results: EventEmitter<Results>;
    result: EventEmitter<{
        result: Result;
    }>;
    error: EventEmitter<any>;
    geocoder: any;
    constructor(MapService: MapService, zone: NgZone, ControlComponent: ControlComponent, MAPBOX_GEOCODER_API_KEY: string);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private addControl();
    private hookEvents(events);
}
