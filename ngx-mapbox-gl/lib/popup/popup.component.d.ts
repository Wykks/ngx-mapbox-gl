import { AfterViewInit, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import { PointLike, Popup, LngLatLike } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
export declare class PopupComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
    private MapService;
    closeButton?: boolean;
    closeOnClick?: boolean;
    anchor?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left';
    offset?: number | PointLike | {
        [anchor: string]: [number, number];
    };
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: LngLatLike;
    marker?: MarkerComponent;
    close: EventEmitter<void>;
    open: EventEmitter<void>;
    content: ElementRef;
    popupInstance?: Popup;
    constructor(MapService: MapService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private createPopup;
    private addPopup;
}
