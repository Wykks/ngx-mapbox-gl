import { OnInit } from '@angular/core';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
export declare class AttributionControlDirective implements OnInit {
    private MapService;
    private ControlComponent;
    compact?: boolean;
    constructor(MapService: MapService, ControlComponent: ControlComponent);
    ngOnInit(): void;
}
