import { OnInit } from '@angular/core';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
export declare class FullscreenControlDirective implements OnInit {
    private MapService;
    private ControlComponent;
    constructor(MapService: MapService, ControlComponent: ControlComponent);
    ngOnInit(): void;
}
