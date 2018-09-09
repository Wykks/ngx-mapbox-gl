import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GeoJSONSourceOptions } from 'mapbox-gl';
import { Subject } from 'rxjs';
import { MapService } from '../../map/map.service';
export declare class GeoJSONSourceComponent implements OnInit, OnDestroy, OnChanges, GeoJSONSourceOptions {
    private MapService;
    id: string;
    data?: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string;
    minzoom?: number;
    maxzoom?: number;
    buffer?: number;
    tolerance?: number;
    cluster?: boolean;
    clusterRadius?: number;
    clusterMaxZoom?: number;
    updateFeatureData: Subject<{}>;
    private sub;
    private sourceAdded;
    private featureIdCounter;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>): void;
    removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>): void;
    getNewFeatureId(): number;
    private init;
}
