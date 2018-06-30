import { OnDestroy, OnInit } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
export declare class FeatureComponent implements OnInit, OnDestroy, GeoJSON.Feature<GeoJSON.GeometryObject> {
    private GeoJSONSourceComponent;
    id?: number;
    geometry: GeoJSON.GeometryObject;
    properties: any;
    type: 'Feature';
    private feature;
    constructor(GeoJSONSourceComponent: GeoJSONSourceComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateCoordinates(coordinates: number[]): void;
}
