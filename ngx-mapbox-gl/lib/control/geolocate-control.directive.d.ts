import { OnInit } from '@angular/core';
import { FitBoundsOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
export declare class GeolocateControlDirective implements OnInit {
    private MapService;
    private ControlComponent;
    positionOptions?: PositionOptions;
    fitBoundsOptions?: FitBoundsOptions;
    trackUserLocation?: boolean;
    showUserLocation?: boolean;
    constructor(MapService: MapService, ControlComponent: ControlComponent);
    ngOnInit(): void;
}
