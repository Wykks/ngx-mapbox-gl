import { EventEmitter, InjectionToken, NgZone } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { BBox } from 'supercluster';
import { MapEvent, MapImageData, MapImageOptions } from './map.types';
export declare const MAPBOX_API_KEY: InjectionToken<{}>;
export declare abstract class MglResizeEventEmitter {
    abstract resizeEvent: Observable<void>;
}
export interface SetupMap {
    accessToken?: string;
    customMapboxApiUrl?: string;
    mapOptions: any;
    mapEvents: MapEvent;
}
export interface SetupLayer {
    layerOptions: MapboxGl.Layer;
    layerEvents: {
        click: EventEmitter<MapboxGl.MapMouseEvent>;
        mouseEnter: EventEmitter<MapboxGl.MapMouseEvent>;
        mouseLeave: EventEmitter<MapboxGl.MapMouseEvent>;
        mouseMove: EventEmitter<MapboxGl.MapMouseEvent>;
    };
}
export interface SetupPopup {
    popupOptions: MapboxGl.PopupOptions;
    popupEvents: {
        open: EventEmitter<void>;
        close: EventEmitter<void>;
    };
}
export declare type AllSource = MapboxGl.VectorSource | MapboxGl.RasterSource | MapboxGl.GeoJSONSource | MapboxGl.ImageSourceOptions | MapboxGl.VideoSource | MapboxGl.GeoJSONSourceRaw | MapboxGl.CanvasSourceOptions;
export declare type MovingOptions = MapboxGl.FlyToOptions | (MapboxGl.AnimationOptions & MapboxGl.CameraOptions) | MapboxGl.CameraOptions;
export declare class MapService {
    private zone;
    private readonly MAPBOX_API_KEY;
    private readonly MglResizeEventEmitter;
    mapInstance: MapboxGl.Map;
    mapCreated$: Observable<void>;
    mapLoaded$: Observable<void>;
    mapEvents: MapEvent;
    private mapCreated;
    private mapLoaded;
    private layerIdsToRemove;
    private sourceIdsToRemove;
    private markersToRemove;
    private popupsToRemove;
    private imageIdsToRemove;
    private subscription;
    constructor(zone: NgZone, MAPBOX_API_KEY: string, MglResizeEventEmitter: MglResizeEventEmitter);
    setup(options: SetupMap): void;
    destroyMap(): void;
    updateMinZoom(minZoom: number): void;
    updateMaxZoom(maxZoom: number): void;
    updateScrollZoom(status: boolean): void;
    updateDragRotate(status: boolean): void;
    updateTouchZoomRotate(status: boolean): void;
    updateDoubleClickZoom(status: boolean): void;
    updateKeyboard(status: boolean): void;
    updateDragPan(status: boolean): void;
    updateBoxZoom(status: boolean): void;
    updateStyle(style: MapboxGl.Style): void;
    updateMaxBounds(maxBounds: MapboxGl.LngLatBoundsLike): void;
    changeCanvasCursor(cursor: string): void;
    queryRenderedFeatures(pointOrBox?: MapboxGl.PointLike | MapboxGl.PointLike[], parameters?: {
        layers?: string[];
        filter?: any[];
    }): GeoJSON.Feature<GeoJSON.GeometryObject>[];
    panTo(center: MapboxGl.LngLatLike, options?: MapboxGl.AnimationOptions): void;
    move(movingMethod: 'jumpTo' | 'easeTo' | 'flyTo', movingOptions?: MovingOptions, zoom?: number, center?: MapboxGl.LngLatLike, bearing?: number, pitch?: number): void;
    addLayer(layer: SetupLayer, before?: string): void;
    removeLayer(layerId: string): void;
    addMarker(marker: MapboxGl.Marker): void;
    removeMarker(marker: MapboxGl.Marker): void;
    createPopup(popup: SetupPopup, element: Node): MapboxGl.Popup;
    addPopupToMap(popup: MapboxGl.Popup, lngLat: MapboxGl.LngLatLike): void;
    addPopupToMarker(marker: MapboxGl.Marker, popup: MapboxGl.Popup): void;
    removePopupFromMap(popup: MapboxGl.Popup): void;
    removePopupFromMarker(marker: MapboxGl.Marker): void;
    addControl(control: MapboxGl.Control | MapboxGl.IControl, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'): void;
    removeControl(control: MapboxGl.Control | MapboxGl.IControl): void;
    loadAndAddImage(imageId: string, url: string, options?: MapImageOptions): Promise<{}>;
    addImage(imageId: string, data: MapImageData, options?: MapImageOptions): void;
    removeImage(imageId: string): void;
    addSource(sourceId: string, source: AllSource): void;
    getSource<T>(sourceId: string): T;
    removeSource(sourceId: string): void;
    setAllLayerPaintProperty(layerId: string, paint: MapboxGl.BackgroundPaint | MapboxGl.FillPaint | MapboxGl.FillExtrusionPaint | MapboxGl.LinePaint | MapboxGl.SymbolPaint | MapboxGl.RasterPaint | MapboxGl.CirclePaint): void;
    setAllLayerLayoutProperty(layerId: string, layout: MapboxGl.BackgroundLayout | MapboxGl.FillLayout | MapboxGl.FillExtrusionLayout | MapboxGl.LineLayout | MapboxGl.SymbolLayout | MapboxGl.RasterLayout | MapboxGl.CircleLayout): void;
    setLayerFilter(layerId: string, filter: any[]): void;
    setLayerBefore(layerId: string, beforeId: string): void;
    setLayerZoomRange(layerId: string, minZoom?: number, maxZoom?: number): void;
    fitBounds(bounds: MapboxGl.LngLatBoundsLike, options?: any): void;
    getCurrentViewportBbox(): BBox;
    applyChanges(): void;
    private createMap(options);
    private removeLayers();
    private removeSources();
    private removeMarkers();
    private removePopups();
    private removeImages();
    private hookEvents(events);
    private assign(obj, prop, value);
}
