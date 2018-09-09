import { Control, IControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { AfterContentInit, ElementRef, OnDestroy } from '@angular/core';
export declare class CustomControl implements IControl {
    private container;
    constructor(container: HTMLElement);
    onAdd(): HTMLElement;
    onRemove(): HTMLElement;
    getDefaultPosition(): string;
}
export declare class ControlComponent implements OnDestroy, AfterContentInit {
    private MapService;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    content: ElementRef;
    control: Control | IControl;
    constructor(MapService: MapService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
