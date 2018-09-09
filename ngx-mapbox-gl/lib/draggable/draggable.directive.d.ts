import { EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { FeatureComponent } from '../source/geojson/feature.component';
export declare class DraggableDirective implements OnInit, OnDestroy {
    private MapService;
    private NgZone;
    private FeatureComponent?;
    private MarkerComponent?;
    layer?: LayerComponent;
    dragStart: EventEmitter<MapMouseEvent>;
    dragEnd: EventEmitter<MapMouseEvent>;
    drag: EventEmitter<MapMouseEvent>;
    private destroyed$;
    constructor(MapService: MapService, NgZone: NgZone, FeatureComponent?: FeatureComponent | undefined, MarkerComponent?: MarkerComponent | undefined);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private handleDraggable;
    private filterFeature;
}
