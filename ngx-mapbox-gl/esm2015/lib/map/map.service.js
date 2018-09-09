/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, InjectionToken, NgZone, Optional } from '@angular/core';
import bbox from '@turf/bbox';
import { polygon } from '@turf/helpers';
import * as MapboxGl from 'mapbox-gl';
import { AsyncSubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
/** @type {?} */
export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');
/**
 * @abstract
 */
export class MglResizeEventEmitter {
}
if (false) {
    /** @type {?} */
    MglResizeEventEmitter.prototype.resizeEvent;
}
/**
 * @record
 */
export function SetupMap() { }
/** @type {?|undefined} */
SetupMap.prototype.accessToken;
/** @type {?|undefined} */
SetupMap.prototype.customMapboxApiUrl;
/** @type {?} */
SetupMap.prototype.mapOptions;
/** @type {?} */
SetupMap.prototype.mapEvents;
/**
 * @record
 */
export function SetupLayer() { }
/** @type {?} */
SetupLayer.prototype.layerOptions;
/** @type {?} */
SetupLayer.prototype.layerEvents;
/**
 * @record
 */
export function SetupPopup() { }
/** @type {?} */
SetupPopup.prototype.popupOptions;
/** @type {?} */
SetupPopup.prototype.popupEvents;
/**
 * @record
 */
export function SetupMarker() { }
/** @type {?} */
SetupMarker.prototype.markersOptions;
/** @type {?} */
SetupMarker.prototype.markersEvents;
/** @typedef {?} */
var AllSource;
export { AllSource };
/** @typedef {?} */
var MovingOptions;
export { MovingOptions };
export class MapService {
    /**
     * @param {?} zone
     * @param {?} MAPBOX_API_KEY
     * @param {?} MglResizeEventEmitter
     */
    constructor(zone, MAPBOX_API_KEY, MglResizeEventEmitter) {
        this.zone = zone;
        this.MAPBOX_API_KEY = MAPBOX_API_KEY;
        this.MglResizeEventEmitter = MglResizeEventEmitter;
        this.mapCreated = new AsyncSubject();
        this.mapLoaded = new AsyncSubject();
        this.layerIdsToRemove = [];
        this.sourceIdsToRemove = [];
        this.markersToRemove = [];
        this.popupsToRemove = [];
        this.imageIdsToRemove = [];
        this.subscription = new Subscription();
        this.mapCreated$ = this.mapCreated.asObservable();
        this.mapLoaded$ = this.mapLoaded.asObservable();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setup(options) {
        // Need onStable to wait for a potential @angular/route transition to end
        this.zone.onStable.pipe(first()).subscribe(() => {
            // Workaround rollup issue
            this.assign(MapboxGl, 'accessToken', options.accessToken || this.MAPBOX_API_KEY);
            if (options.customMapboxApiUrl) {
                this.assign(MapboxGl, 'config.API_URL', options.customMapboxApiUrl);
            }
            this.createMap(options.mapOptions);
            this.hookEvents(options.mapEvents);
            this.mapEvents = options.mapEvents;
            this.mapCreated.next(undefined);
            this.mapCreated.complete();
        });
    }
    /**
     * @return {?}
     */
    destroyMap() {
        this.subscription.unsubscribe();
        this.mapInstance.remove();
    }
    /**
     * @param {?} minZoom
     * @return {?}
     */
    updateMinZoom(minZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMinZoom(minZoom);
        });
    }
    /**
     * @param {?} maxZoom
     * @return {?}
     */
    updateMaxZoom(maxZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxZoom(maxZoom);
        });
    }
    /**
     * @param {?} status
     * @return {?}
     */
    updateScrollZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status ? this.mapInstance.scrollZoom.enable() : this.mapInstance.scrollZoom.disable();
        });
    }
    /**
     * @param {?} status
     * @return {?}
     */
    updateDragRotate(status) {
        return this.zone.runOutsideAngular(() => {
            status ? this.mapInstance.dragRotate.enable() : this.mapInstance.dragRotate.disable();
        });
    }
    /**
     * @param {?} status
     * @return {?}
     */
    updateTouchZoomRotate(status) {
        return this.zone.runOutsideAngular(() => {
            status ? this.mapInstance.touchZoomRotate.enable() : this.mapInstance.touchZoomRotate.disable();
        });
    }
    /**
     * @param {?} status
     * @return {?}
     */
    updateDoubleClickZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status ? this.mapInstance.doubleClickZoom.enable() : this.mapInstance.doubleClickZoom.disable();
        });
    }
    /**
     * @param {?} status
     * @return {?}
     */
    updateKeyboard(status) {
        return this.zone.runOutsideAngular(() => {
            status ? this.mapInstance.keyboard.enable() : this.mapInstance.keyboard.disable();
        });
    }
    /**
     * @param {?} status
     * @return {?}
     */
    updateDragPan(status) {
        return this.zone.runOutsideAngular(() => {
            status ? this.mapInstance.dragPan.enable() : this.mapInstance.dragPan.disable();
        });
    }
    /**
     * @param {?} status
     * @return {?}
     */
    updateBoxZoom(status) {
        return this.zone.runOutsideAngular(() => {
            status ? this.mapInstance.boxZoom.enable() : this.mapInstance.boxZoom.disable();
        });
    }
    /**
     * @param {?} style
     * @return {?}
     */
    updateStyle(style) {
        // TODO Probably not so simple, write demo/tests
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setStyle(style);
        });
    }
    /**
     * @param {?} maxBounds
     * @return {?}
     */
    updateMaxBounds(maxBounds) {
        // TODO Probably not so simple, write demo/tests
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setMaxBounds(maxBounds);
        });
    }
    /**
     * @param {?} cursor
     * @return {?}
     */
    changeCanvasCursor(cursor) {
        /** @type {?} */
        const canvas = this.mapInstance.getCanvasContainer();
        canvas.style.cursor = cursor;
    }
    /**
     * @param {?=} pointOrBox
     * @param {?=} parameters
     * @return {?}
     */
    queryRenderedFeatures(pointOrBox, parameters) {
        return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
    }
    /**
     * @param {?} center
     * @param {?=} options
     * @return {?}
     */
    panTo(center, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.panTo(center, options);
        });
    }
    /**
     * @param {?} movingMethod
     * @param {?=} movingOptions
     * @param {?=} zoom
     * @param {?=} center
     * @param {?=} bearing
     * @param {?=} pitch
     * @return {?}
     */
    move(movingMethod, movingOptions, zoom, center, bearing, pitch) {
        return this.zone.runOutsideAngular(() => {
            (/** @type {?} */ (this.mapInstance[movingMethod]))(Object.assign({}, movingOptions, { zoom: zoom ? zoom : this.mapInstance.getZoom(), center: center ? center : this.mapInstance.getCenter(), bearing: bearing ? bearing : this.mapInstance.getBearing(), pitch: pitch ? pitch : this.mapInstance.getPitch() }));
        });
    }
    /**
     * @param {?} layer
     * @param {?} bindEvents
     * @param {?=} before
     * @return {?}
     */
    addLayer(layer, bindEvents, before) {
        this.zone.runOutsideAngular(() => {
            Object.keys(layer.layerOptions)
                .forEach((key) => {
                /** @type {?} */
                const tkey = /** @type {?} */ (key);
                if (layer.layerOptions[tkey] === undefined) {
                    delete layer.layerOptions[tkey];
                }
            });
            this.mapInstance.addLayer(layer.layerOptions, before);
            if (bindEvents) {
                if (layer.layerEvents.click.observers.length) {
                    this.mapInstance.on('click', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.click.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.mouseEnter.observers.length) {
                    this.mapInstance.on('mouseenter', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.mouseEnter.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.mouseLeave.observers.length) {
                    this.mapInstance.on('mouseleave', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.mouseLeave.emit(evt);
                        });
                    });
                }
                if (layer.layerEvents.mouseMove.observers.length) {
                    this.mapInstance.on('mousemove', layer.layerOptions.id, (evt) => {
                        this.zone.run(() => {
                            layer.layerEvents.mouseMove.emit(evt);
                        });
                    });
                }
            }
        });
    }
    /**
     * @param {?} layerId
     * @return {?}
     */
    removeLayer(layerId) {
        this.layerIdsToRemove.push(layerId);
    }
    /**
     * @param {?} marker
     * @return {?}
     */
    addMarker(marker) {
        /** @type {?} */
        const options = {
            offset: marker.markersOptions.offset,
            anchor: marker.markersOptions.anchor,
            draggable: !!marker.markersOptions.draggable
        };
        if (marker.markersOptions.element.childNodes.length > 0) {
            options.element = marker.markersOptions.element;
        }
        /** @type {?} */
        const markerInstance = new MapboxGl.Marker(options);
        if (marker.markersEvents.dragStart.observers.length) {
            markerInstance.on('dragstart', (event) => this.zone.run(() => marker.markersEvents.dragStart.emit(event.target)));
        }
        if (marker.markersEvents.drag.observers.length) {
            markerInstance.on('drag', (event) => this.zone.run(() => marker.markersEvents.drag.emit(event.target)));
        }
        if (marker.markersEvents.dragEnd.observers.length) {
            markerInstance.on('dragend', (event) => this.zone.run(() => marker.markersEvents.dragEnd.emit(event.target)));
        }
        markerInstance.setLngLat(marker.markersOptions.feature ? /** @type {?} */ ((marker.markersOptions.feature.geometry)).coordinates : /** @type {?} */
            ((marker.markersOptions.lngLat)));
        return this.zone.runOutsideAngular(() => {
            markerInstance.addTo(this.mapInstance);
            return markerInstance;
        });
    }
    /**
     * @param {?} marker
     * @return {?}
     */
    removeMarker(marker) {
        this.markersToRemove.push(marker);
    }
    /**
     * @param {?} popup
     * @param {?} element
     * @return {?}
     */
    createPopup(popup, element) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(popup.popupOptions)
                .forEach((key) => (/** @type {?} */ (popup.popupOptions))[key] === undefined && delete (/** @type {?} */ (popup.popupOptions))[key]);
            /** @type {?} */
            const popupInstance = new MapboxGl.Popup(popup.popupOptions);
            popupInstance.setDOMContent(element);
            if (popup.popupEvents.close.observers.length) {
                popupInstance.on('close', () => {
                    this.zone.run(() => {
                        popup.popupEvents.close.emit();
                    });
                });
            }
            if (popup.popupEvents.open.observers.length) {
                popupInstance.on('open', () => {
                    this.zone.run(() => {
                        popup.popupEvents.open.emit();
                    });
                });
            }
            return popupInstance;
        });
    }
    /**
     * @param {?} popup
     * @param {?} lngLat
     * @param {?=} skipOpenEvent
     * @return {?}
     */
    addPopupToMap(popup, lngLat, skipOpenEvent = false) {
        return this.zone.runOutsideAngular(() => {
            if (skipOpenEvent && (/** @type {?} */ (popup))._listeners) {
                delete (/** @type {?} */ (popup))._listeners['open'];
            }
            popup.setLngLat(lngLat);
            popup.addTo(this.mapInstance);
        });
    }
    /**
     * @param {?} marker
     * @param {?} popup
     * @return {?}
     */
    addPopupToMarker(marker, popup) {
        return this.zone.runOutsideAngular(() => {
            marker.setPopup(popup);
        });
    }
    /**
     * @param {?} popup
     * @param {?=} skipCloseEvent
     * @return {?}
     */
    removePopupFromMap(popup, skipCloseEvent = false) {
        if (skipCloseEvent && (/** @type {?} */ (popup))._listeners) {
            delete (/** @type {?} */ (popup))._listeners['close'];
        }
        this.popupsToRemove.push(popup);
    }
    /**
     * @param {?} marker
     * @return {?}
     */
    removePopupFromMarker(marker) {
        return this.zone.runOutsideAngular(() => {
            marker.setPopup(undefined);
        });
    }
    /**
     * @param {?} control
     * @param {?=} position
     * @return {?}
     */
    addControl(control, position) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.addControl(/** @type {?} */ (control), position);
        });
    }
    /**
     * @param {?} control
     * @return {?}
     */
    removeControl(control) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.removeControl(/** @type {?} */ (control));
        });
    }
    /**
     * @param {?} imageId
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    loadAndAddImage(imageId, url, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.zone.runOutsideAngular(() => {
                return new Promise((resolve, reject) => {
                    this.mapInstance.loadImage(url, (error, image) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        this.addImage(imageId, image, options);
                        resolve();
                    });
                });
            });
        });
    }
    /**
     * @param {?} imageId
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    addImage(imageId, data, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.addImage(imageId, /** @type {?} */ (data), options);
        });
    }
    /**
     * @param {?} imageId
     * @return {?}
     */
    removeImage(imageId) {
        this.imageIdsToRemove.push(imageId);
    }
    /**
     * @param {?} sourceId
     * @param {?} source
     * @return {?}
     */
    addSource(sourceId, source) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(source)
                .forEach((key) => (/** @type {?} */ (source))[key] === undefined && delete (/** @type {?} */ (source))[key]);
            this.mapInstance.addSource(sourceId, /** @type {?} */ (source)); // Typings issue
        });
    }
    /**
     * @template T
     * @param {?} sourceId
     * @return {?}
     */
    getSource(sourceId) {
        return /** @type {?} */ (/** @type {?} */ (this.mapInstance.getSource(sourceId)));
    }
    /**
     * @param {?} sourceId
     * @return {?}
     */
    removeSource(sourceId) {
        this.sourceIdsToRemove.push(sourceId);
    }
    /**
     * @param {?} layerId
     * @param {?} paint
     * @return {?}
     */
    setAllLayerPaintProperty(layerId, paint) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(paint).forEach((key) => {
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                this.mapInstance.setPaintProperty(layerId, key, (/** @type {?} */ (paint))[key]);
            });
        });
    }
    /**
     * @param {?} layerId
     * @param {?} layout
     * @return {?}
     */
    setAllLayerLayoutProperty(layerId, layout) {
        return this.zone.runOutsideAngular(() => {
            Object.keys(layout).forEach((key) => {
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                this.mapInstance.setLayoutProperty(layerId, key, (/** @type {?} */ (layout))[key]);
            });
        });
    }
    /**
     * @param {?} layerId
     * @param {?} filter
     * @return {?}
     */
    setLayerFilter(layerId, filter) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setFilter(layerId, filter);
        });
    }
    /**
     * @param {?} layerId
     * @param {?} beforeId
     * @return {?}
     */
    setLayerBefore(layerId, beforeId) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.moveLayer(layerId, beforeId);
        });
    }
    /**
     * @param {?} layerId
     * @param {?=} minZoom
     * @param {?=} maxZoom
     * @return {?}
     */
    setLayerZoomRange(layerId, minZoom, maxZoom) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setLayerZoomRange(layerId, minZoom ? minZoom : 0, maxZoom ? maxZoom : 20);
        });
    }
    /**
     * @param {?} bounds
     * @param {?=} options
     * @return {?}
     */
    fitBounds(bounds, options) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.fitBounds(bounds, options);
        });
    }
    /**
     * @return {?}
     */
    getCurrentViewportBbox() {
        /** @type {?} */
        const canvas = this.mapInstance.getCanvas();
        /** @type {?} */
        const w = parseInt(/** @type {?} */ ((canvas.style.width)), 10);
        /** @type {?} */
        const h = parseInt(/** @type {?} */ ((canvas.style.height)), 10);
        /** @type {?} */
        const upLeft = this.mapInstance.unproject([0, 0]).toArray();
        /** @type {?} */
        const upRight = this.mapInstance.unproject([w, 0]).toArray();
        /** @type {?} */
        const downRight = this.mapInstance.unproject([w, h]).toArray();
        /** @type {?} */
        const downLeft = this.mapInstance.unproject([0, h]).toArray();
        return /** @type {?} */ (bbox(polygon([[upLeft, upRight, downRight, downLeft, upLeft]])));
    }
    /**
     * @return {?}
     */
    applyChanges() {
        this.zone.runOutsideAngular(() => {
            this.removeLayers();
            this.removeSources();
            this.removeMarkers();
            this.removePopups();
            this.removeImages();
        });
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createMap(options) {
        NgZone.assertNotInAngularZone();
        Object.keys(options)
            .forEach((key) => {
            /** @type {?} */
            const tkey = /** @type {?} */ (key);
            if (options[tkey] === undefined) {
                delete options[tkey];
            }
        });
        this.mapInstance = new MapboxGl.Map(options);
        /** @type {?} */
        const subChanges = this.zone.onMicrotaskEmpty
            .subscribe(() => this.applyChanges());
        if (this.MglResizeEventEmitter) {
            /** @type {?} */
            const subResize = this.MglResizeEventEmitter.resizeEvent.subscribe(() => {
                this.mapInstance.resize();
            });
            this.subscription.add(subResize);
        }
        this.subscription.add(subChanges);
    }
    /**
     * @return {?}
     */
    removeLayers() {
        for (const layerId of this.layerIdsToRemove) {
            this.mapInstance.off('click', layerId);
            this.mapInstance.off('mouseenter', layerId);
            this.mapInstance.off('mouseleave', layerId);
            this.mapInstance.off('mousemove', layerId);
            this.mapInstance.removeLayer(layerId);
        }
        this.layerIdsToRemove = [];
    }
    /**
     * @return {?}
     */
    removeSources() {
        for (const sourceId of this.sourceIdsToRemove) {
            this.mapInstance.removeSource(sourceId);
        }
        this.sourceIdsToRemove = [];
    }
    /**
     * @return {?}
     */
    removeMarkers() {
        for (const marker of this.markersToRemove) {
            marker.remove();
        }
        this.markersToRemove = [];
    }
    /**
     * @return {?}
     */
    removePopups() {
        for (const popup of this.popupsToRemove) {
            popup.remove();
        }
        this.popupsToRemove = [];
    }
    /**
     * @return {?}
     */
    removeImages() {
        for (const imageId of this.imageIdsToRemove) {
            this.mapInstance.removeImage(imageId);
        }
        this.imageIdsToRemove = [];
    }
    /**
     * @param {?} events
     * @return {?}
     */
    hookEvents(events) {
        this.mapInstance.on('load', () => {
            this.mapLoaded.next(undefined);
            this.mapLoaded.complete();
            this.zone.run(() => events.load.emit(this.mapInstance));
        });
        if (events.resize.observers.length) {
            this.mapInstance.on('resize', () => this.zone.run(() => events.resize.emit()));
        }
        if (events.remove.observers.length) {
            this.mapInstance.on('remove', () => this.zone.run(() => events.remove.emit()));
        }
        if (events.mouseDown.observers.length) {
            this.mapInstance.on('mousedown', (evt) => this.zone.run(() => events.mouseDown.emit(evt)));
        }
        if (events.mouseUp.observers.length) {
            this.mapInstance.on('mouseup', (evt) => this.zone.run(() => events.mouseUp.emit(evt)));
        }
        if (events.mouseMove.observers.length) {
            this.mapInstance.on('mousemove', (evt) => this.zone.run(() => events.mouseMove.emit(evt)));
        }
        if (events.click.observers.length) {
            this.mapInstance.on('click', (evt) => this.zone.run(() => events.click.emit(evt)));
        }
        if (events.dblClick.observers.length) {
            this.mapInstance.on('dblclick', (evt) => this.zone.run(() => events.dblClick.emit(evt)));
        }
        if (events.mouseEnter.observers.length) {
            this.mapInstance.on('mouseenter', (evt) => this.zone.run(() => events.mouseEnter.emit(evt)));
        }
        if (events.mouseLeave.observers.length) {
            this.mapInstance.on('mouseleave', (evt) => this.zone.run(() => events.mouseLeave.emit(evt)));
        }
        if (events.mouseOver.observers.length) {
            this.mapInstance.on('mouseover', (evt) => this.zone.run(() => events.mouseOver.emit(evt)));
        }
        if (events.mouseOut.observers.length) {
            this.mapInstance.on('mouseout', (evt) => this.zone.run(() => events.mouseOut.emit(evt)));
        }
        if (events.contextMenu.observers.length) {
            this.mapInstance.on('contextmenu', (evt) => this.zone.run(() => events.contextMenu.emit(evt)));
        }
        if (events.touchStart.observers.length) {
            this.mapInstance.on('touchstart', (evt) => this.zone.run(() => events.touchStart.emit(evt)));
        }
        if (events.touchEnd.observers.length) {
            this.mapInstance.on('touchend', (evt) => this.zone.run(() => events.touchEnd.emit(evt)));
        }
        if (events.touchMove.observers.length) {
            this.mapInstance.on('touchmove', (evt) => this.zone.run(() => events.touchMove.emit(evt)));
        }
        if (events.touchCancel.observers.length) {
            this.mapInstance.on('touchcancel', (evt) => this.zone.run(() => events.touchCancel.emit(evt)));
        }
        if (events.wheel.observers.length) {
            // MapboxGl.MapWheelEvent
            this.mapInstance.on('wheel', (evt) => this.zone.run(() => events.wheel.emit(evt)));
        }
        if (events.moveStart.observers.length) {
            this.mapInstance.on('movestart', (evt) => this.zone.run(() => events.moveStart.emit(evt)));
        }
        if (events.move.observers.length) {
            this.mapInstance.on('move', (evt) => this.zone.run(() => events.move.emit(evt)));
        }
        if (events.moveEnd.observers.length) {
            this.mapInstance.on('moveend', (evt) => this.zone.run(() => events.moveEnd.emit(evt)));
        }
        if (events.dragStart.observers.length) {
            this.mapInstance.on('dragstart', (evt) => this.zone.run(() => events.dragStart.emit(evt)));
        }
        if (events.drag.observers.length) {
            this.mapInstance.on('drag', (evt) => this.zone.run(() => events.drag.emit(evt)));
        }
        if (events.dragEnd.observers.length) {
            this.mapInstance.on('dragend', (evt) => this.zone.run(() => events.dragEnd.emit(evt)));
        }
        if (events.zoomStart.observers.length) {
            this.mapInstance.on('zoomstart', (evt) => this.zone.run(() => events.zoomStart.emit(evt)));
        }
        if (events.zoomEvt.observers.length) {
            this.mapInstance.on('zoom', (evt) => this.zone.run(() => events.zoomEvt.emit(evt)));
        }
        if (events.zoomEnd.observers.length) {
            this.mapInstance.on('zoomend', (evt) => this.zone.run(() => events.zoomEnd.emit(evt)));
        }
        if (events.rotateStart.observers.length) {
            this.mapInstance.on('rotatestart', (evt) => this.zone.run(() => events.rotateStart.emit(evt)));
        }
        if (events.rotate.observers.length) {
            this.mapInstance.on('rotate', (evt) => this.zone.run(() => events.rotate.emit(evt)));
        }
        if (events.rotateEnd.observers.length) {
            this.mapInstance.on('rotateend', (evt) => this.zone.run(() => events.rotateEnd.emit(evt)));
        }
        if (events.pitchStart.observers.length) {
            this.mapInstance.on('pitchstart', (evt) => this.zone.run(() => events.pitchStart.emit(evt)));
        }
        if (events.pitchEvt.observers.length) {
            this.mapInstance.on('pitch', (evt) => this.zone.run(() => events.pitchEvt.emit(evt)));
        }
        if (events.pitchEnd.observers.length) {
            this.mapInstance.on('pitchend', (evt) => this.zone.run(() => events.pitchEnd.emit(evt)));
        }
        if (events.boxZoomStart.observers.length) {
            this.mapInstance.on('boxzoomstart', (evt) => this.zone.run(() => events.boxZoomStart.emit(evt)));
        }
        if (events.boxZoomEnd.observers.length) {
            this.mapInstance.on('boxzoomend', (evt) => this.zone.run(() => events.boxZoomEnd.emit(evt)));
        }
        if (events.boxZoomCancel.observers.length) {
            this.mapInstance.on('boxzoomcancel', (evt) => this.zone.run(() => events.boxZoomCancel.emit(evt)));
        }
        if (events.webGlContextLost.observers.length) {
            this.mapInstance.on('webglcontextlost', () => this.zone.run(() => events.webGlContextLost.emit()));
        }
        if (events.webGlContextRestored.observers.length) {
            this.mapInstance.on('webglcontextrestored', () => this.zone.run(() => events.webGlContextRestored.emit()));
        }
        if (events.render.observers.length) {
            this.mapInstance.on('render', () => this.zone.run(() => events.render.emit()));
        }
        if (events.error.observers.length) {
            this.mapInstance.on('error', () => this.zone.run(() => events.error.emit()));
        }
        if (events.data.observers.length) {
            this.mapInstance.on('data', (evt) => this.zone.run(() => events.data.emit(evt)));
        }
        if (events.styleData.observers.length) {
            this.mapInstance.on('styledata', (evt) => this.zone.run(() => events.styleData.emit(evt)));
        }
        if (events.sourceData.observers.length) {
            this.mapInstance.on('sourcedata', (evt) => this.zone.run(() => events.sourceData.emit(evt)));
        }
        if (events.dataLoading.observers.length) {
            this.mapInstance.on('dataloading', (evt) => this.zone.run(() => events.dataLoading.emit(evt)));
        }
        if (events.styleDataLoading.observers.length) {
            this.mapInstance.on('styledataloading', (evt) => this.zone.run(() => events.styleDataLoading.emit(evt)));
        }
        if (events.sourceDataLoading.observers.length) {
            this.mapInstance.on('sourcedataloading', (evt) => this.zone.run(() => events.sourceDataLoading.emit(evt)));
        }
    }
    /**
     * @param {?} obj
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    assign(obj, prop, value) {
        if (typeof prop === 'string') {
            // tslint:disable-next-line:no-parameter-reassignment
            prop = prop.split('.');
        }
        if (prop.length > 1) {
            /** @type {?} */
            const e = prop.shift();
            this.assign(obj[e] =
                Object.prototype.toString.call(obj[e]) === '[object Object]'
                    ? obj[e]
                    : {}, prop, value);
        }
        else {
            obj[prop[0]] = value;
        }
    }
}
MapService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MapService.ctorParameters = () => [
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAPBOX_API_KEY,] }] },
    { type: MglResizeEventEmitter, decorators: [{ type: Optional }] }
];
if (false) {
    /** @type {?} */
    MapService.prototype.mapInstance;
    /** @type {?} */
    MapService.prototype.mapCreated$;
    /** @type {?} */
    MapService.prototype.mapLoaded$;
    /** @type {?} */
    MapService.prototype.mapEvents;
    /** @type {?} */
    MapService.prototype.mapCreated;
    /** @type {?} */
    MapService.prototype.mapLoaded;
    /** @type {?} */
    MapService.prototype.layerIdsToRemove;
    /** @type {?} */
    MapService.prototype.sourceIdsToRemove;
    /** @type {?} */
    MapService.prototype.markersToRemove;
    /** @type {?} */
    MapService.prototype.popupsToRemove;
    /** @type {?} */
    MapService.prototype.imageIdsToRemove;
    /** @type {?} */
    MapService.prototype.subscription;
    /** @type {?} */
    MapService.prototype.zone;
    /** @type {?} */
    MapService.prototype.MAPBOX_API_KEY;
    /** @type {?} */
    MapService.prototype.MglResizeEventEmitter;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL21hcC9tYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBZ0IsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFDOUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBSXZDLGFBQWEsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O0FBRWpFLE1BQU07Q0FFTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3REQsTUFBTTs7Ozs7O0lBZUosWUFDVSxNQUM2QyxjQUFzQixFQUM5QyxxQkFBNEM7UUFGakUsU0FBSSxHQUFKLElBQUk7UUFDeUMsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFDOUMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjswQkFadEQsSUFBSSxZQUFZLEVBQVE7eUJBQ3pCLElBQUksWUFBWSxFQUFRO2dDQUNQLEVBQUU7aUNBQ0QsRUFBRTsrQkFDSyxFQUFFOzhCQUNKLEVBQUU7Z0NBQ1IsRUFBRTs0QkFDaEIsSUFBSSxZQUFZLEVBQUU7UUFPdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZ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LENBQUM7U0FDaEY7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUc7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUEyQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTs7WUFFakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekY7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1B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SUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0c7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUc7UUFDRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUE2QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUE2QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxHQUE2QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDcEc7UUFDRCxJQUFJLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDNUc7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEY7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUU7UUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEc7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsR0FBdUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsR0FBdUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEk7Ozs7Ozs7O0lBSUssTUFBTSxDQUFDLEdBQVEsRUFBRSxJQUFTLEVBQUUsS0FBVTtRQUM1QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTs7WUFFNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztZQUNuQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssaUJBQWlCO29CQUMxRCxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixDQUFDLENBQUMsRUFBRSxFQUNOLElBQUksRUFDSixLQUFLLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3RCOzs7O1lBMW9CSixVQUFVOzs7O1lBcEVnRCxNQUFNO3lDQXNGNUQsUUFBUSxZQUFJLE1BQU0sU0FBQyxjQUFjO1lBQ2tCLHFCQUFxQix1QkFBeEUsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGJib3ggZnJvbSAnQHR1cmYvYmJveCc7XG5pbXBvcnQgeyBwb2x5Z29uIH0gZnJvbSAnQHR1cmYvaGVscGVycyc7XG5pbXBvcnQgKiBhcyBNYXBib3hHbCBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgQXN5bmNTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQkJveCB9IGZyb20gJ3N1cGVyY2x1c3Rlcic7XG5pbXBvcnQgeyBNYXBFdmVudCwgTWFwSW1hZ2VEYXRhLCBNYXBJbWFnZU9wdGlvbnMgfSBmcm9tICcuL21hcC50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBNQVBCT1hfQVBJX0tFWSA9IG5ldyBJbmplY3Rpb25Ub2tlbignTWFwYm94QXBpS2V5Jyk7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZ2xSZXNpemVFdmVudEVtaXR0ZXIge1xuICBhYnN0cmFjdCByZXNpemVFdmVudDogT2JzZXJ2YWJsZTx2b2lkPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cE1hcCB7XG4gIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBjdXN0b21NYXBib3hBcGlVcmw/OiBzdHJpbmc7XG4gIG1hcE9wdGlvbnM6IGFueTsgLy8gTWFwYm94R2wuTWFwYm94T3B0aW9uc1xuICBtYXBFdmVudHM6IE1hcEV2ZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTGF5ZXIge1xuICBsYXllck9wdGlvbnM6IE1hcGJveEdsLkxheWVyO1xuICBsYXllckV2ZW50czoge1xuICAgIGNsaWNrOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gICAgbW91c2VFbnRlcjogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICAgIG1vdXNlTGVhdmU6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgICBtb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cFBvcHVwIHtcbiAgcG9wdXBPcHRpb25zOiBNYXBib3hHbC5Qb3B1cE9wdGlvbnM7XG4gIHBvcHVwRXZlbnRzOiB7XG4gICAgb3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIGNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBNYXJrZXIge1xuICBtYXJrZXJzT3B0aW9uczoge1xuICAgIG9mZnNldD86IE1hcGJveEdsLlBvaW50TGlrZTtcbiAgICBhbmNob3I/OiBNYXBib3hHbC5BbmNob3I7XG4gICAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBmZWF0dXJlPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+O1xuICAgIGxuZ0xhdD86IE1hcGJveEdsLkxuZ0xhdExpa2U7XG4gIH07XG4gIG1hcmtlcnNFdmVudHM6IHtcbiAgICBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXJrZXI+O1xuICAgIGRyYWc6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXJrZXI+O1xuICAgIGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXJrZXI+O1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBBbGxTb3VyY2UgPSBNYXBib3hHbC5WZWN0b3JTb3VyY2UgfFxuICBNYXBib3hHbC5SYXN0ZXJTb3VyY2UgfFxuICBNYXBib3hHbC5HZW9KU09OU291cmNlIHxcbiAgTWFwYm94R2wuSW1hZ2VTb3VyY2VPcHRpb25zIHxcbiAgTWFwYm94R2wuVmlkZW9Tb3VyY2VPcHRpb25zIHxcbiAgTWFwYm94R2wuR2VvSlNPTlNvdXJjZVJhdyB8XG4gIE1hcGJveEdsLkNhbnZhc1NvdXJjZU9wdGlvbnM7XG5cbmV4cG9ydCB0eXBlIE1vdmluZ09wdGlvbnMgPSBNYXBib3hHbC5GbHlUb09wdGlvbnMgfFxuICAoTWFwYm94R2wuQW5pbWF0aW9uT3B0aW9ucyAmIE1hcGJveEdsLkNhbWVyYU9wdGlvbnMpIHxcbiAgTWFwYm94R2wuQ2FtZXJhT3B0aW9ucztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcFNlcnZpY2Uge1xuICBtYXBJbnN0YW5jZTogTWFwYm94R2wuTWFwO1xuICBtYXBDcmVhdGVkJDogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgbWFwTG9hZGVkJDogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgbWFwRXZlbnRzOiBNYXBFdmVudDtcblxuICBwcml2YXRlIG1hcENyZWF0ZWQgPSBuZXcgQXN5bmNTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgbWFwTG9hZGVkID0gbmV3IEFzeW5jU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGxheWVySWRzVG9SZW1vdmU6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgc291cmNlSWRzVG9SZW1vdmU6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgbWFya2Vyc1RvUmVtb3ZlOiBNYXBib3hHbC5NYXJrZXJbXSA9IFtdO1xuICBwcml2YXRlIHBvcHVwc1RvUmVtb3ZlOiBNYXBib3hHbC5Qb3B1cFtdID0gW107XG4gIHByaXZhdGUgaW1hZ2VJZHNUb1JlbW92ZTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVBCT1hfQVBJX0tFWSkgcHJpdmF0ZSByZWFkb25seSBNQVBCT1hfQVBJX0tFWTogc3RyaW5nLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgTWdsUmVzaXplRXZlbnRFbWl0dGVyOiBNZ2xSZXNpemVFdmVudEVtaXR0ZXJcbiAgKSB7XG4gICAgdGhpcy5tYXBDcmVhdGVkJCA9IHRoaXMubWFwQ3JlYXRlZC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLm1hcExvYWRlZCQgPSB0aGlzLm1hcExvYWRlZC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHNldHVwKG9wdGlvbnM6IFNldHVwTWFwKSB7XG4gICAgLy8gTmVlZCBvblN0YWJsZSB0byB3YWl0IGZvciBhIHBvdGVudGlhbCBAYW5ndWxhci9yb3V0ZSB0cmFuc2l0aW9uIHRvIGVuZFxuICAgIHRoaXMuem9uZS5vblN0YWJsZS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBXb3JrYXJvdW5kIHJvbGx1cCBpc3N1ZVxuICAgICAgdGhpcy5hc3NpZ24oTWFwYm94R2wsICdhY2Nlc3NUb2tlbicsIG9wdGlvbnMuYWNjZXNzVG9rZW4gfHwgdGhpcy5NQVBCT1hfQVBJX0tFWSk7XG4gICAgICBpZiAob3B0aW9ucy5jdXN0b21NYXBib3hBcGlVcmwpIHtcbiAgICAgICAgdGhpcy5hc3NpZ24oTWFwYm94R2wsICdjb25maWcuQVBJX1VSTCcsIG9wdGlvbnMuY3VzdG9tTWFwYm94QXBpVXJsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3JlYXRlTWFwKG9wdGlvbnMubWFwT3B0aW9ucyk7XG4gICAgICB0aGlzLmhvb2tFdmVudHMob3B0aW9ucy5tYXBFdmVudHMpO1xuICAgICAgdGhpcy5tYXBFdmVudHMgPSBvcHRpb25zLm1hcEV2ZW50cztcbiAgICAgIHRoaXMubWFwQ3JlYXRlZC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICB0aGlzLm1hcENyZWF0ZWQuY29tcGxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3lNYXAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZSgpO1xuICB9XG5cbiAgdXBkYXRlTWluWm9vbShtaW5ab29tOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWluWm9vbShtaW5ab29tKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1heFpvb20obWF4Wm9vbTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1heFpvb20obWF4Wm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTY3JvbGxab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5zY3JvbGxab29tLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5zY3JvbGxab29tLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURyYWdSb3RhdGUoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmRyYWdSb3RhdGUuZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdSb3RhdGUuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVG91Y2hab29tUm90YXRlKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS50b3VjaFpvb21Sb3RhdGUuZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLnRvdWNoWm9vbVJvdGF0ZS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEb3VibGVDbGlja1pvb20oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmRvdWJsZUNsaWNrWm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuZG91YmxlQ2xpY2tab29tLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUtleWJvYXJkKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5rZXlib2FyZC5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRHJhZ1BhbihzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuZHJhZ1Bhbi5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuZHJhZ1Bhbi5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVCb3hab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5ib3hab29tLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5ib3hab29tLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVN0eWxlKHN0eWxlOiBNYXBib3hHbC5TdHlsZSkge1xuICAgIC8vIFRPRE8gUHJvYmFibHkgbm90IHNvIHNpbXBsZSwgd3JpdGUgZGVtby90ZXN0c1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRTdHlsZShzdHlsZSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVNYXhCb3VuZHMobWF4Qm91bmRzOiBNYXBib3hHbC5MbmdMYXRCb3VuZHNMaWtlKSB7XG4gICAgLy8gVE9ETyBQcm9iYWJseSBub3Qgc28gc2ltcGxlLCB3cml0ZSBkZW1vL3Rlc3RzXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1heEJvdW5kcyhtYXhCb3VuZHMpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlQ2FudmFzQ3Vyc29yKGN1cnNvcjogc3RyaW5nKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tYXBJbnN0YW5jZS5nZXRDYW52YXNDb250YWluZXIoKTtcbiAgICBjYW52YXMuc3R5bGUuY3Vyc29yID0gY3Vyc29yO1xuICB9XG5cbiAgcXVlcnlSZW5kZXJlZEZlYXR1cmVzKFxuICAgIHBvaW50T3JCb3g/OiBNYXBib3hHbC5Qb2ludExpa2UgfCBNYXBib3hHbC5Qb2ludExpa2VbXSxcbiAgICBwYXJhbWV0ZXJzPzogeyBsYXllcnM/OiBzdHJpbmdbXSwgZmlsdGVyPzogYW55W10gfVxuICApOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD5bXSB7XG4gICAgcmV0dXJuIHRoaXMubWFwSW5zdGFuY2UucXVlcnlSZW5kZXJlZEZlYXR1cmVzKHBvaW50T3JCb3gsIHBhcmFtZXRlcnMpO1xuICB9XG5cbiAgcGFuVG8oY2VudGVyOiBNYXBib3hHbC5MbmdMYXRMaWtlLCBvcHRpb25zPzogTWFwYm94R2wuQW5pbWF0aW9uT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5wYW5UbyhjZW50ZXIsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgbW92ZShcbiAgICBtb3ZpbmdNZXRob2Q6ICdqdW1wVG8nIHwgJ2Vhc2VUbycgfCAnZmx5VG8nLFxuICAgIG1vdmluZ09wdGlvbnM/OiBNb3ZpbmdPcHRpb25zLFxuICAgIHpvb20/OiBudW1iZXIsXG4gICAgY2VudGVyPzogTWFwYm94R2wuTG5nTGF0TGlrZSxcbiAgICBiZWFyaW5nPzogbnVtYmVyLFxuICAgIHBpdGNoPzogbnVtYmVyXG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgKDxhbnk+dGhpcy5tYXBJbnN0YW5jZVttb3ZpbmdNZXRob2RdKSh7XG4gICAgICAgIC4uLm1vdmluZ09wdGlvbnMsXG4gICAgICAgIHpvb206IHpvb20gPyB6b29tIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRab29tKCksXG4gICAgICAgIGNlbnRlcjogY2VudGVyID8gY2VudGVyIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRDZW50ZXIoKSxcbiAgICAgICAgYmVhcmluZzogYmVhcmluZyA/IGJlYXJpbmcgOiB0aGlzLm1hcEluc3RhbmNlLmdldEJlYXJpbmcoKSxcbiAgICAgICAgcGl0Y2g6IHBpdGNoID8gcGl0Y2ggOiB0aGlzLm1hcEluc3RhbmNlLmdldFBpdGNoKClcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkTGF5ZXIobGF5ZXI6IFNldHVwTGF5ZXIsIGJpbmRFdmVudHM6IGJvb2xlYW4sIGJlZm9yZT86IHN0cmluZykge1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhsYXllci5sYXllck9wdGlvbnMpXG4gICAgICAgIC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgTWFwYm94R2wuTGF5ZXI+a2V5O1xuICAgICAgICAgIGlmIChsYXllci5sYXllck9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIGxheWVyLmxheWVyT3B0aW9uc1t0a2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRMYXllcihsYXllci5sYXllck9wdGlvbnMsIGJlZm9yZSk7XG4gICAgICBpZiAoYmluZEV2ZW50cykge1xuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMuY2xpY2suZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLm1vdXNlRW50ZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZW50ZXInLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZUVudGVyLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5tb3VzZUxlYXZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWxlYXZlJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VMZWF2ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubW91c2VNb3ZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW1vdmUnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZU1vdmUuZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUxheWVyKGxheWVySWQ6IHN0cmluZykge1xuICAgIHRoaXMubGF5ZXJJZHNUb1JlbW92ZS5wdXNoKGxheWVySWQpO1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlcjogU2V0dXBNYXJrZXIpIHtcbiAgICBjb25zdCBvcHRpb25zOiBNYXBib3hHbC5NYXJrZXJPcHRpb25zID0ge1xuICAgICAgb2Zmc2V0OiBtYXJrZXIubWFya2Vyc09wdGlvbnMub2Zmc2V0LFxuICAgICAgYW5jaG9yOiBtYXJrZXIubWFya2Vyc09wdGlvbnMuYW5jaG9yLFxuICAgICAgZHJhZ2dhYmxlOiAhIW1hcmtlci5tYXJrZXJzT3B0aW9ucy5kcmFnZ2FibGVcbiAgICB9O1xuICAgIGlmIChtYXJrZXIubWFya2Vyc09wdGlvbnMuZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIG9wdGlvbnMuZWxlbWVudCA9IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5lbGVtZW50O1xuICAgIH1cbiAgICBjb25zdCBtYXJrZXJJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5NYXJrZXIob3B0aW9ucyk7XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICBtYXJrZXJJbnN0YW5jZS5vbignZHJhZ3N0YXJ0JywgKGV2ZW50OiB7IHRhcmdldDogTWFwYm94R2wuTWFya2VyIH0pID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gbWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZ1N0YXJ0LmVtaXQoZXZlbnQudGFyZ2V0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIG1hcmtlckluc3RhbmNlLm9uKCdkcmFnJywgKGV2ZW50OiB7IHRhcmdldDogTWFwYm94R2wuTWFya2VyIH0pID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gbWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZy5lbWl0KGV2ZW50LnRhcmdldCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZ0VuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICBtYXJrZXJJbnN0YW5jZS5vbignZHJhZ2VuZCcsIChldmVudDogeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdFbmQuZW1pdChldmVudC50YXJnZXQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgbWFya2VySW5zdGFuY2Uuc2V0TG5nTGF0KG1hcmtlci5tYXJrZXJzT3B0aW9ucy5mZWF0dXJlID9cbiAgICAgIG1hcmtlci5tYXJrZXJzT3B0aW9ucy5mZWF0dXJlLmdlb21ldHJ5IS5jb29yZGluYXRlcyA6XG4gICAgICBtYXJrZXIubWFya2Vyc09wdGlvbnMubG5nTGF0IVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBtYXJrZXJJbnN0YW5jZS5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICAgIHJldHVybiBtYXJrZXJJbnN0YW5jZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHRoaXMubWFya2Vyc1RvUmVtb3ZlLnB1c2gobWFya2VyKTtcbiAgfVxuXG4gIGNyZWF0ZVBvcHVwKHBvcHVwOiBTZXR1cFBvcHVwLCBlbGVtZW50OiBOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwb3B1cC5wb3B1cE9wdGlvbnMpXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgKDxhbnk+cG9wdXAucG9wdXBPcHRpb25zKVtrZXldID09PSB1bmRlZmluZWQgJiYgZGVsZXRlICg8YW55PnBvcHVwLnBvcHVwT3B0aW9ucylba2V5XSk7XG4gICAgICBjb25zdCBwb3B1cEluc3RhbmNlID0gbmV3IE1hcGJveEdsLlBvcHVwKHBvcHVwLnBvcHVwT3B0aW9ucyk7XG4gICAgICBwb3B1cEluc3RhbmNlLnNldERPTUNvbnRlbnQoZWxlbWVudCk7XG4gICAgICBpZiAocG9wdXAucG9wdXBFdmVudHMuY2xvc2Uub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb3B1cEluc3RhbmNlLm9uKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLmNsb3NlLmVtaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAocG9wdXAucG9wdXBFdmVudHMub3Blbi5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ29wZW4nLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5vcGVuLmVtaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9wdXBJbnN0YW5jZTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXAocG9wdXA6IE1hcGJveEdsLlBvcHVwLCBsbmdMYXQ6IE1hcGJveEdsLkxuZ0xhdExpa2UsIHNraXBPcGVuRXZlbnQgPSBmYWxzZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHNraXBPcGVuRXZlbnQgJiYgKDxhbnk+cG9wdXApLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgZGVsZXRlICg8YW55PnBvcHVwKS5fbGlzdGVuZXJzWydvcGVuJ107XG4gICAgICB9XG4gICAgICBwb3B1cC5zZXRMbmdMYXQobG5nTGF0KTtcbiAgICAgIHBvcHVwLmFkZFRvKHRoaXMubWFwSW5zdGFuY2UpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkUG9wdXBUb01hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlciwgcG9wdXA6IE1hcGJveEdsLlBvcHVwKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBtYXJrZXIuc2V0UG9wdXAocG9wdXApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlUG9wdXBGcm9tTWFwKHBvcHVwOiBNYXBib3hHbC5Qb3B1cCwgc2tpcENsb3NlRXZlbnQgPSBmYWxzZSkge1xuICAgIGlmIChza2lwQ2xvc2VFdmVudCAmJiAoPGFueT5wb3B1cCkuX2xpc3RlbmVycykge1xuICAgICAgZGVsZXRlICg8YW55PnBvcHVwKS5fbGlzdGVuZXJzWydjbG9zZSddO1xuICAgIH1cbiAgICB0aGlzLnBvcHVwc1RvUmVtb3ZlLnB1c2gocG9wdXApO1xuICB9XG5cbiAgcmVtb3ZlUG9wdXBGcm9tTWFya2VyKG1hcmtlcjogTWFwYm94R2wuTWFya2VyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBtYXJrZXIuc2V0UG9wdXAodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvbnRyb2woY29udHJvbDogTWFwYm94R2wuQ29udHJvbCB8IE1hcGJveEdsLklDb250cm9sLCBwb3NpdGlvbj86ICd0b3AtcmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICdib3R0b20tcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0Jykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRDb250cm9sKDxhbnk+Y29udHJvbCwgcG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ29udHJvbChjb250cm9sOiBNYXBib3hHbC5Db250cm9sIHwgTWFwYm94R2wuSUNvbnRyb2wpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlQ29udHJvbCg8YW55PmNvbnRyb2wpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZEFkZEltYWdlKGltYWdlSWQ6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2UubG9hZEltYWdlKHVybCwgKGVycm9yOiB7IHN0YXR1czogbnVtYmVyIH0gfCBudWxsLCBpbWFnZTogSW1hZ2VEYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEltYWdlKGltYWdlSWQsIGltYWdlLCBvcHRpb25zKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJbWFnZShpbWFnZUlkOiBzdHJpbmcsIGRhdGE6IE1hcEltYWdlRGF0YSwgb3B0aW9ucz86IE1hcEltYWdlT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRJbWFnZShpbWFnZUlkLCA8YW55PmRhdGEsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlSW1hZ2UoaW1hZ2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlLnB1c2goaW1hZ2VJZCk7XG4gIH1cblxuICBhZGRTb3VyY2Uoc291cmNlSWQ6IHN0cmluZywgc291cmNlOiBBbGxTb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSlcbiAgICAgICAgLmZvckVhY2goKGtleSkgPT5cbiAgICAgICAgICAoPGFueT5zb3VyY2UpW2tleV0gPT09IHVuZGVmaW5lZCAmJiBkZWxldGUgKDxhbnk+c291cmNlKVtrZXldKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkU291cmNlKHNvdXJjZUlkLCA8YW55PnNvdXJjZSk7IC8vIFR5cGluZ3MgaXNzdWVcbiAgICB9KTtcbiAgfVxuXG4gIGdldFNvdXJjZTxUPihzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIDxUPjxhbnk+dGhpcy5tYXBJbnN0YW5jZS5nZXRTb3VyY2Uoc291cmNlSWQpO1xuICB9XG5cbiAgcmVtb3ZlU291cmNlKHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvdXJjZUlkc1RvUmVtb3ZlLnB1c2goc291cmNlSWQpO1xuICB9XG5cbiAgc2V0QWxsTGF5ZXJQYWludFByb3BlcnR5KFxuICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICBwYWludDogTWFwYm94R2wuQmFja2dyb3VuZFBhaW50IHxcbiAgICAgIE1hcGJveEdsLkZpbGxQYWludCB8XG4gICAgICBNYXBib3hHbC5GaWxsRXh0cnVzaW9uUGFpbnQgfFxuICAgICAgTWFwYm94R2wuTGluZVBhaW50IHxcbiAgICAgIE1hcGJveEdsLlN5bWJvbFBhaW50IHxcbiAgICAgIE1hcGJveEdsLlJhc3RlclBhaW50IHxcbiAgICAgIE1hcGJveEdsLkNpcmNsZVBhaW50XG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocGFpbnQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFBhaW50UHJvcGVydHkobGF5ZXJJZCwga2V5LCAoPGFueT5wYWludClba2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEFsbExheWVyTGF5b3V0UHJvcGVydHkoXG4gICAgbGF5ZXJJZDogc3RyaW5nLFxuICAgIGxheW91dDogTWFwYm94R2wuQmFja2dyb3VuZExheW91dCB8XG4gICAgICBNYXBib3hHbC5GaWxsTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkZpbGxFeHRydXNpb25MYXlvdXQgfFxuICAgICAgTWFwYm94R2wuTGluZUxheW91dCB8XG4gICAgICBNYXBib3hHbC5TeW1ib2xMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuUmFzdGVyTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkNpcmNsZUxheW91dFxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGxheW91dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIHBlcmYsIHNldFBhaW50UHJvcGVydHkgb25seSBvbiBjaGFuZ2VkIHBhaW50IHByb3BzIG1heWJlXG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TGF5b3V0UHJvcGVydHkobGF5ZXJJZCwga2V5LCAoPGFueT5sYXlvdXQpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckZpbHRlcihsYXllcklkOiBzdHJpbmcsIGZpbHRlcjogYW55W10pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0RmlsdGVyKGxheWVySWQsIGZpbHRlcik7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckJlZm9yZShsYXllcklkOiBzdHJpbmcsIGJlZm9yZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UubW92ZUxheWVyKGxheWVySWQsIGJlZm9yZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyWm9vbVJhbmdlKGxheWVySWQ6IHN0cmluZywgbWluWm9vbT86IG51bWJlciwgbWF4Wm9vbT86IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRMYXllclpvb21SYW5nZShsYXllcklkLCBtaW5ab29tID8gbWluWm9vbSA6IDAsIG1heFpvb20gPyBtYXhab29tIDogMjApO1xuICAgIH0pO1xuICB9XG5cbiAgZml0Qm91bmRzKGJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSwgb3B0aW9ucz86IGFueSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5maXRCb3VuZHMoYm91bmRzLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRWaWV3cG9ydEJib3goKTogQkJveCB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tYXBJbnN0YW5jZS5nZXRDYW52YXMoKTtcbiAgICBjb25zdCB3ID0gcGFyc2VJbnQoY2FudmFzLnN0eWxlLndpZHRoISwgMTApO1xuICAgIGNvbnN0IGggPSBwYXJzZUludChjYW52YXMuc3R5bGUuaGVpZ2h0ISwgMTApO1xuICAgIGNvbnN0IHVwTGVmdCA9IHRoaXMubWFwSW5zdGFuY2UudW5wcm9qZWN0KFswLCAwXSkudG9BcnJheSgpO1xuICAgIGNvbnN0IHVwUmlnaHQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbdywgMF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCBkb3duUmlnaHQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbdywgaF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCBkb3duTGVmdCA9IHRoaXMubWFwSW5zdGFuY2UudW5wcm9qZWN0KFswLCBoXSkudG9BcnJheSgpO1xuICAgIHJldHVybiA8YW55PmJib3gocG9seWdvbihbW3VwTGVmdCwgdXBSaWdodCwgZG93blJpZ2h0LCBkb3duTGVmdCwgdXBMZWZ0XV0pKTtcbiAgfVxuXG4gIGFwcGx5Q2hhbmdlcygpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVMYXllcnMoKTtcbiAgICAgIHRoaXMucmVtb3ZlU291cmNlcygpO1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJzKCk7XG4gICAgICB0aGlzLnJlbW92ZVBvcHVwcygpO1xuICAgICAgdGhpcy5yZW1vdmVJbWFnZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFwKG9wdGlvbnM6IE1hcGJveEdsLk1hcGJveE9wdGlvbnMpIHtcbiAgICBOZ1pvbmUuYXNzZXJ0Tm90SW5Bbmd1bGFyWm9uZSgpO1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiBNYXBib3hHbC5NYXBib3hPcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLm1hcEluc3RhbmNlID0gbmV3IE1hcGJveEdsLk1hcChvcHRpb25zKTtcbiAgICBjb25zdCBzdWJDaGFuZ2VzID0gdGhpcy56b25lLm9uTWljcm90YXNrRW1wdHlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hcHBseUNoYW5nZXMoKSk7XG4gICAgaWYgKHRoaXMuTWdsUmVzaXplRXZlbnRFbWl0dGVyKSB7XG4gICAgICBjb25zdCBzdWJSZXNpemUgPSB0aGlzLk1nbFJlc2l6ZUV2ZW50RW1pdHRlci5yZXNpemVFdmVudC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnJlc2l6ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoc3ViUmVzaXplKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1YkNoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMYXllcnMoKSB7XG4gICAgZm9yIChjb25zdCBsYXllcklkIG9mIHRoaXMubGF5ZXJJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ2NsaWNrJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignbW91c2VlbnRlcicsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ21vdXNlbGVhdmUnLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdtb3VzZW1vdmUnLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlTGF5ZXIobGF5ZXJJZCk7XG4gICAgfVxuICAgIHRoaXMubGF5ZXJJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVTb3VyY2VzKCkge1xuICAgIGZvciAoY29uc3Qgc291cmNlSWQgb2YgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVTb3VyY2Uoc291cmNlSWQpO1xuICAgIH1cbiAgICB0aGlzLnNvdXJjZUlkc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU1hcmtlcnMoKSB7XG4gICAgZm9yIChjb25zdCBtYXJrZXIgb2YgdGhpcy5tYXJrZXJzVG9SZW1vdmUpIHtcbiAgICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5tYXJrZXJzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUG9wdXBzKCkge1xuICAgIGZvciAoY29uc3QgcG9wdXAgb2YgdGhpcy5wb3B1cHNUb1JlbW92ZSkge1xuICAgICAgcG9wdXAucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMucG9wdXBzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlSW1hZ2VzKCkge1xuICAgIGZvciAoY29uc3QgaW1hZ2VJZCBvZiB0aGlzLmltYWdlSWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlSW1hZ2UoaW1hZ2VJZCk7XG4gICAgfVxuICAgIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGV2ZW50czogTWFwRXZlbnQpIHtcbiAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdsb2FkJywgKCkgPT4ge1xuICAgICAgdGhpcy5tYXBMb2FkZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBMb2FkZWQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmxvYWQuZW1pdCh0aGlzLm1hcEluc3RhbmNlKSk7XG4gICAgfSk7XG4gICAgaWYgKGV2ZW50cy5yZXNpemUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVzaXplJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVzaXplLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlbW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW1vdmUnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZW1vdmUuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VEb3duLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZG93bicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlRG93bi5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZVVwLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNldXAnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZVVwLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW1vdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZU1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY2xpY2snLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jbGljay5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYmxDbGljay5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYmxjbGljaycsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRibENsaWNrLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlRW50ZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VlbnRlcicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlRW50ZXIuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VMZWF2ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWxlYXZlJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VMZWF2ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU92ZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VvdmVyJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VPdmVyLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlT3V0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3V0JywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VPdXQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY29udGV4dE1lbnUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY29udGV4dG1lbnUnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jb250ZXh0TWVudS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaFN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaFN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoZW5kJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hNb3ZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNobW92ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoTW92ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaENhbmNlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGNhbmNlbCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoQ2FuY2VsLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndoZWVsLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIC8vIE1hcGJveEdsLk1hcFdoZWVsRXZlbnRcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3doZWVsJywgKGV2dDogYW55KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53aGVlbC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3ZlU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZXN0YXJ0JywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3ZlJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3ZlZW5kJywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRyYWdTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnc3RhcnQnLCAoZXZ0OiBEcmFnRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWdTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWcnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZHJhZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZ0OiBEcmFnRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWdFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb21zdGFydCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy56b29tU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbUV2dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnpvb21FdnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tZW5kJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnpvb21FbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMucm90YXRlU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yb3RhdGUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy5yb3RhdGVFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaHN0YXJ0JywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaFN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoRXZ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaEV2dC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaEVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaGVuZCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21zdGFydCcsIChldnQ6IE1hcGJveEdsLk1hcEJveFpvb21FdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21FbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcEJveFpvb21FdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tQ2FuY2VsLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21jYW5jZWwnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21DYW5jZWwuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMud2ViR2xDb250ZXh0TG9zdC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRsb3N0JywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2ViR2xDb250ZXh0TG9zdC5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53ZWJHbENvbnRleHRSZXN0b3JlZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRyZXN0b3JlZCcsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlbmRlci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW5kZXInLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZW5kZXIuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZXJyb3InLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5lcnJvci5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRhdGEuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc3R5bGVEYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3N0eWxlZGF0YScsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGEub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc291cmNlZGF0YScsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZGF0YUxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc3R5bGVEYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWRhdGFsb2FkaW5nJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zdHlsZURhdGFMb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGFMb2FkaW5nLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGFsb2FkaW5nJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zb3VyY2VEYXRhTG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIG1vdmUgdGhpcyBlbHNld2hlcmVcbiAgcHJpdmF0ZSBhc3NpZ24ob2JqOiBhbnksIHByb3A6IGFueSwgdmFsdWU6IGFueSkge1xuICAgIGlmICh0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICBwcm9wID0gcHJvcC5zcGxpdCgnLicpO1xuICAgIH1cbiAgICBpZiAocHJvcC5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBlID0gcHJvcC5zaGlmdCgpO1xuICAgICAgdGhpcy5hc3NpZ24ob2JqW2VdID1cbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtlXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgICAgICAgPyBvYmpbZV1cbiAgICAgICAgICA6IHt9LFxuICAgICAgICBwcm9wLFxuICAgICAgICB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtwcm9wWzBdXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19