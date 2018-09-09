import { __awaiter } from 'tslib';
import { Inject, Injectable, InjectionToken, NgZone, Optional, ChangeDetectionStrategy, Component, Input, ViewChild, Directive, Host, EventEmitter, Output, ViewEncapsulation, forwardRef, ChangeDetectorRef, ContentChild, TemplateRef, NgModule } from '@angular/core';
import bbox from '@turf/bbox';
import { polygon } from '@turf/helpers';
import * as MapboxGl from 'mapbox-gl';
import { AttributionControl, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Marker, Popup, Map } from 'mapbox-gl';
import { AsyncSubject, Subscription, fromEvent, Subject, ReplaySubject, merge } from 'rxjs';
import { first, filter, debounceTime, switchMap, take, takeUntil, tap, startWith } from 'rxjs/operators';
import supercluster from 'supercluster';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');
/**
 * @abstract
 */
class MglResizeEventEmitter {
}
class MapService {
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
        const markerInstance = new Marker(options);
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
            const popupInstance = new Popup(popup.popupOptions);
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
        return __awaiter(this, void 0, void 0, function* () {
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
    setLayerFilter(layerId, filter$$1) {
        return this.zone.runOutsideAngular(() => {
            this.mapInstance.setFilter(layerId, filter$$1);
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
        this.mapInstance = new Map(options);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CustomControl {
    /**
     * @param {?} container
     */
    constructor(container) {
        this.container = container;
    }
    /**
     * @return {?}
     */
    onAdd() {
        return this.container;
    }
    /**
     * @return {?}
     */
    onRemove() {
        return /** @type {?} */ ((this.container.parentNode)).removeChild(this.container);
    }
    /**
     * @return {?}
     */
    getDefaultPosition() {
        return 'top-right';
    }
}
class ControlComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.content.nativeElement.childNodes.length) {
            this.control = new CustomControl(this.content.nativeElement);
            this.MapService.mapCreated$.subscribe(() => {
                this.MapService.addControl(/** @type {?} */ ((this.control)), this.position);
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.MapService.removeControl(this.control);
    }
}
ControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-control',
                template: '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
ControlComponent.ctorParameters = () => [
    { type: MapService }
];
ControlComponent.propDecorators = {
    position: [{ type: Input }],
    content: [{ type: ViewChild, args: ['content',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AttributionControlDirective {
    /**
     * @param {?} MapService
     * @param {?} ControlComponent
     */
    constructor(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapCreated$.subscribe(() => {
            if (this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            const options = {};
            if (this.compact !== undefined) {
                options.compact = this.compact;
            }
            this.ControlComponent.control = new AttributionControl(options);
            this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
        });
    }
}
AttributionControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglAttribution]'
            },] }
];
/** @nocollapse */
AttributionControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: ControlComponent, decorators: [{ type: Host }] }
];
AttributionControlDirective.propDecorators = {
    compact: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FullscreenControlDirective {
    /**
     * @param {?} MapService
     * @param {?} ControlComponent
     */
    constructor(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapCreated$.subscribe(() => {
            if (this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            this.ControlComponent.control = new FullscreenControl();
            this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
        });
    }
}
FullscreenControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglFullscreen]'
            },] }
];
/** @nocollapse */
FullscreenControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: ControlComponent, decorators: [{ type: Host }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
/** @type {?} */
const MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');
class GeocoderControlDirective {
    /**
     * @param {?} MapService
     * @param {?} zone
     * @param {?} ControlComponent
     * @param {?} MAPBOX_GEOCODER_API_KEY
     */
    constructor(MapService$$1, zone, ControlComponent$$1, MAPBOX_GEOCODER_API_KEY) {
        this.MapService = MapService$$1;
        this.zone = zone;
        this.ControlComponent = ControlComponent$$1;
        this.MAPBOX_GEOCODER_API_KEY = MAPBOX_GEOCODER_API_KEY;
        this.clear = new EventEmitter();
        this.loading = new EventEmitter();
        this.results = new EventEmitter();
        this.result = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapCreated$.subscribe(() => {
            if (this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            const options = {
                proximity: this.proximity,
                country: this.country,
                placeholder: this.placeholder,
                zoom: this.zoom,
                bbox: this.bbox,
                types: this.types,
                flyTo: this.flyTo,
                minLength: this.minLength,
                limit: this.limit,
                language: this.language,
                filter: this.filter,
                localGeocoder: this.localGeocoder,
                accessToken: this.accessToken || this.MAPBOX_GEOCODER_API_KEY
            };
            Object.keys(options).forEach((key) => {
                /** @type {?} */
                const tkey = /** @type {?} */ (key);
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            this.geocoder = new MapboxGeocoder(options);
            this.hookEvents(this);
            this.addControl();
        });
        if (this.searchInput) {
            this.MapService.mapLoaded$.subscribe(() => {
                this.geocoder.query(this.searchInput);
            });
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.geocoder) {
            return;
        }
        if (changes["proximity"] && !changes["proximity"].isFirstChange()) {
            this.geocoder.setProximity(changes["proximity"].currentValue);
        }
        if (changes["searchInput"]) {
            this.geocoder.query(this.searchInput);
        }
    }
    /**
     * @return {?}
     */
    addControl() {
        this.ControlComponent.control = this.geocoder;
        this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
    }
    /**
     * @param {?} events
     * @return {?}
     */
    hookEvents(events) {
        if (events.results.observers.length) {
            this.geocoder.on('results', (evt) => this.zone.run(() => events.results.emit(evt)));
        }
        if (events.result.observers.length) {
            this.geocoder.on('result', (evt) => this.zone.run(() => events.result.emit(evt)));
        }
        if (events.error.observers.length) {
            this.geocoder.on('error', (evt) => this.zone.run(() => events.error.emit(evt)));
        }
        if (events.loading.observers.length) {
            this.geocoder.on('loading', (evt) => this.zone.run(() => events.loading.emit(evt)));
        }
        if (events.clear.observers.length) {
            this.geocoder.on('clear', () => this.zone.run(() => events.clear.emit()));
        }
    }
}
GeocoderControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglGeocoder]'
            },] }
];
/** @nocollapse */
GeocoderControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: NgZone },
    { type: ControlComponent, decorators: [{ type: Host }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAPBOX_GEOCODER_API_KEY,] }] }
];
GeocoderControlDirective.propDecorators = {
    country: [{ type: Input }],
    placeholder: [{ type: Input }],
    zoom: [{ type: Input }],
    bbox: [{ type: Input }],
    types: [{ type: Input }],
    flyTo: [{ type: Input }],
    minLength: [{ type: Input }],
    limit: [{ type: Input }],
    language: [{ type: Input }],
    accessToken: [{ type: Input }],
    filter: [{ type: Input }],
    localGeocoder: [{ type: Input }],
    proximity: [{ type: Input }],
    searchInput: [{ type: Input }],
    clear: [{ type: Output }],
    loading: [{ type: Output }],
    results: [{ type: Output }],
    result: [{ type: Output }],
    error: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GeolocateControlDirective {
    /**
     * @param {?} MapService
     * @param {?} ControlComponent
     */
    constructor(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapCreated$.subscribe(() => {
            if (this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            const options = {
                positionOptions: this.positionOptions,
                fitBoundsOptions: this.fitBoundsOptions,
                trackUserLocation: this.trackUserLocation,
                showUserLocation: this.showUserLocation
            };
            Object.keys(options)
                .forEach((key) => {
                /** @type {?} */
                const tkey = /** @type {?} */ (key);
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            this.ControlComponent.control = new GeolocateControl(options);
            this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
        });
    }
}
GeolocateControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglGeolocate]'
            },] }
];
/** @nocollapse */
GeolocateControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: ControlComponent, decorators: [{ type: Host }] }
];
GeolocateControlDirective.propDecorators = {
    positionOptions: [{ type: Input }],
    fitBoundsOptions: [{ type: Input }],
    trackUserLocation: [{ type: Input }],
    showUserLocation: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NavigationControlDirective {
    /**
     * @param {?} MapService
     * @param {?} ControlComponent
     */
    constructor(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapCreated$.subscribe(() => {
            if (this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            let options = {};
            if (this.showCompass !== undefined) {
                options.showCompass = this.showCompass;
            }
            if (this.showZoom !== undefined) {
                options.showZoom = this.showZoom;
            }
            this.ControlComponent.control = new NavigationControl(options);
            this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
        });
    }
}
NavigationControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglNavigation]'
            },] }
];
/** @nocollapse */
NavigationControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: ControlComponent, decorators: [{ type: Host }] }
];
NavigationControlDirective.propDecorators = {
    showCompass: [{ type: Input }],
    showZoom: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ScaleControlDirective {
    /**
     * @param {?} MapService
     * @param {?} ControlComponent
     */
    constructor(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["unit"] && !changes["unit"].isFirstChange()) {
            (/** @type {?} */ (this.ControlComponent.control)).setUnit(changes["unit"].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapCreated$.subscribe(() => {
            if (this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            const options = {};
            if (this.maxWidth !== undefined) {
                options.maxWidth = this.maxWidth;
            }
            if (this.unit !== undefined) {
                options.unit = this.unit;
            }
            this.ControlComponent.control = new ScaleControl(options);
            this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
        });
    }
}
ScaleControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglScale]'
            },] }
];
/** @nocollapse */
ScaleControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: ControlComponent, decorators: [{ type: Host }] }
];
ScaleControlDirective.propDecorators = {
    maxWidth: [{ type: Input }],
    unit: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class LayerComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.click = new EventEmitter();
        this.mouseEnter = new EventEmitter();
        this.mouseLeave = new EventEmitter();
        this.mouseMove = new EventEmitter();
        this.layerAdded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.init(true);
            this.sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getLayer(this.id))).subscribe(() => {
                this.init(false);
            });
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.layerAdded) {
            return;
        }
        if (changes["paint"] && !changes["paint"].isFirstChange()) {
            this.MapService.setAllLayerPaintProperty(this.id, /** @type {?} */ ((changes["paint"].currentValue)));
        }
        if (changes["layout"] && !changes["layout"].isFirstChange()) {
            this.MapService.setAllLayerLayoutProperty(this.id, /** @type {?} */ ((changes["layout"].currentValue)));
        }
        if (changes["filter"] && !changes["filter"].isFirstChange()) {
            this.MapService.setLayerFilter(this.id, /** @type {?} */ ((changes["filter"].currentValue)));
        }
        if (changes["before"] && !changes["before"].isFirstChange()) {
            this.MapService.setLayerBefore(this.id, /** @type {?} */ ((changes["before"].currentValue)));
        }
        if (changes["minzoom"] && !changes["minzoom"].isFirstChange() ||
            changes["maxzoom"] && !changes["maxzoom"].isFirstChange()) {
            this.MapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.layerAdded) {
            this.MapService.removeLayer(this.id);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    /**
     * @param {?} bindEvents
     * @return {?}
     */
    init(bindEvents) {
        /** @type {?} */
        const layer = {
            layerOptions: {
                id: this.id,
                type: this.type,
                source: this.source,
                metadata: this.metadata,
                'source-layer': this.sourceLayer,
                minzoom: this.minzoom,
                maxzoom: this.maxzoom,
                filter: this.filter,
                layout: this.layout,
                paint: this.paint
            },
            layerEvents: {
                click: this.click,
                mouseEnter: this.mouseEnter,
                mouseLeave: this.mouseLeave,
                mouseMove: this.mouseMove
            }
        };
        this.MapService.addLayer(layer, bindEvents, this.before);
        this.layerAdded = true;
    }
}
LayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-layer',
                template: ''
            }] }
];
/** @nocollapse */
LayerComponent.ctorParameters = () => [
    { type: MapService }
];
LayerComponent.propDecorators = {
    id: [{ type: Input }],
    source: [{ type: Input }],
    type: [{ type: Input }],
    metadata: [{ type: Input }],
    sourceLayer: [{ type: Input }],
    filter: [{ type: Input }],
    layout: [{ type: Input }],
    paint: [{ type: Input }],
    before: [{ type: Input }],
    minzoom: [{ type: Input }],
    maxzoom: [{ type: Input }],
    click: [{ type: Output }],
    mouseEnter: [{ type: Output }],
    mouseLeave: [{ type: Output }],
    mouseMove: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MarkerComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.dragStart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.feature && this.lngLat) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((this.lngLat)));
        }
        if (changes["feature"] && !changes["feature"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates);
        }
        if (changes["draggable"] && !changes["draggable"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setDraggable(!!this.draggable);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.MapService.mapCreated$.subscribe(() => {
            this.markerInstance = this.MapService.addMarker({
                markersOptions: {
                    offset: this.offset,
                    anchor: this.anchor,
                    draggable: !!this.draggable,
                    element: this.content.nativeElement,
                    feature: this.feature,
                    lngLat: this.lngLat
                },
                markersEvents: {
                    dragStart: this.dragStart,
                    drag: this.drag,
                    dragEnd: this.dragEnd
                }
            });
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.MapService.removeMarker(/** @type {?} */ ((this.markerInstance)));
        this.markerInstance = undefined;
    }
    /**
     * @return {?}
     */
    togglePopup() {
        /** @type {?} */ ((this.markerInstance)).togglePopup();
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    updateCoordinates(coordinates) {
        /** @type {?} */ ((this.markerInstance)).setLngLat(coordinates);
    }
}
MarkerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-marker',
                template: '<div #content><ng-content></ng-content></div>',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    .mapboxgl-marker {
      line-height: 0;
    }
  `]
            }] }
];
/** @nocollapse */
MarkerComponent.ctorParameters = () => [
    { type: MapService }
];
MarkerComponent.propDecorators = {
    offset: [{ type: Input }],
    anchor: [{ type: Input }],
    feature: [{ type: Input }],
    lngLat: [{ type: Input }],
    draggable: [{ type: Input }],
    dragStart: [{ type: Output }],
    drag: [{ type: Output }],
    dragEnd: [{ type: Output }],
    content: [{ type: ViewChild, args: ['content',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GeoJSONSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.updateFeatureData = new Subject();
        this.sub = new Subscription();
        this.sourceAdded = false;
        this.featureIdCounter = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.data) {
            this.data = {
                type: 'FeatureCollection',
                features: []
            };
        }
        this.MapService.mapLoaded$.subscribe(() => {
            this.init();
            /** @type {?} */
            const sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getSource(this.id))).subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["maxzoom"] && !changes["maxzoom"].isFirstChange() ||
            changes["minzoom"] && !changes["minzoom"].isFirstChange() ||
            changes["buffer"] && !changes["buffer"].isFirstChange() ||
            changes["tolerance"] && !changes["tolerance"].isFirstChange() ||
            changes["cluster"] && !changes["cluster"].isFirstChange() ||
            changes["clusterRadius"] && !changes["clusterRadius"].isFirstChange() ||
            changes["clusterMaxZoom"] && !changes["clusterMaxZoom"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        if (changes["data"] && !changes["data"].isFirstChange()) {
            /** @type {?} */
            const source = this.MapService.getSource(this.id);
            source.setData(/** @type {?} */ ((this.data)));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    addFeature(feature) {
        /** @type {?} */
        const collection = /** @type {?} */ (this.data);
        collection.features.push(feature);
        this.updateFeatureData.next();
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    removeFeature(feature) {
        /** @type {?} */
        const collection = /** @type {?} */ (this.data);
        /** @type {?} */
        const index = collection.features.indexOf(feature);
        if (index > -1) {
            collection.features.splice(index, 1);
        }
        this.updateFeatureData.next();
    }
    /**
     * @return {?}
     */
    getNewFeatureId() {
        return ++this.featureIdCounter;
    }
    /**
     * @return {?}
     */
    init() {
        this.MapService.addSource(this.id, {
            type: 'geojson',
            data: this.data,
            maxzoom: this.maxzoom,
            minzoom: this.minzoom,
            buffer: this.buffer,
            tolerance: this.tolerance,
            cluster: this.cluster,
            clusterRadius: this.clusterRadius,
            clusterMaxZoom: this.clusterMaxZoom,
        });
        /** @type {?} */
        const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
            /** @type {?} */
            const source = this.MapService.getSource(this.id);
            source.setData(/** @type {?} */ ((this.data)));
        });
        this.sub.add(sub);
        this.sourceAdded = true;
    }
}
GeoJSONSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-geojson-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
GeoJSONSourceComponent.ctorParameters = () => [
    { type: MapService }
];
GeoJSONSourceComponent.propDecorators = {
    id: [{ type: Input }],
    data: [{ type: Input }],
    minzoom: [{ type: Input }],
    maxzoom: [{ type: Input }],
    buffer: [{ type: Input }],
    tolerance: [{ type: Input }],
    cluster: [{ type: Input }],
    clusterRadius: [{ type: Input }],
    clusterMaxZoom: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FeatureComponent {
    /**
     * @param {?} GeoJSONSourceComponent
     */
    constructor(GeoJSONSourceComponent$$1) {
        this.GeoJSONSourceComponent = GeoJSONSourceComponent$$1;
        this.type = 'Feature';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.id) {
            this.id = this.GeoJSONSourceComponent.getNewFeatureId();
        }
        this.feature = {
            type: this.type,
            geometry: this.geometry,
            properties: this.properties ? this.properties : {}
        };
        this.feature.id = this.id;
        this.GeoJSONSourceComponent.addFeature(this.feature);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.GeoJSONSourceComponent.removeFeature(this.feature);
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    updateCoordinates(coordinates) {
        (/** @type {?} */ (this.feature.geometry)).coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next();
    }
}
FeatureComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-feature',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
FeatureComponent.ctorParameters = () => [
    { type: GeoJSONSourceComponent, decorators: [{ type: Inject, args: [forwardRef(() => GeoJSONSourceComponent),] }] }
];
FeatureComponent.propDecorators = {
    id: [{ type: Input }],
    geometry: [{ type: Input }],
    properties: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DraggableDirective {
    /**
     * @param {?} MapService
     * @param {?} NgZone
     * @param {?=} FeatureComponent
     * @param {?=} MarkerComponent
     */
    constructor(MapService$$1, NgZone$$1, FeatureComponent$$1, MarkerComponent$$1) {
        this.MapService = MapService$$1;
        this.NgZone = NgZone$$1;
        this.FeatureComponent = FeatureComponent$$1;
        this.MarkerComponent = MarkerComponent$$1;
        this.dragStart = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.drag = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let enter$;
        /** @type {?} */
        let leave$;
        /** @type {?} */
        let updateCoords;
        if (this.MarkerComponent) {
            console.warn('mglDraggable on Marker is deprecated, use draggable input instead');
            /** @type {?} */
            let markerElement = (/** @type {?} */ (this.MarkerComponent.content.nativeElement));
            if (markerElement.children.length === 1) {
                markerElement = markerElement.children[0];
            }
            enter$ = fromEvent(markerElement, 'mouseenter');
            leave$ = fromEvent(markerElement, 'mouseleave');
            updateCoords = this.MarkerComponent.updateCoordinates.bind(this.MarkerComponent);
        }
        else if (this.FeatureComponent && this.layer) {
            enter$ = this.layer.mouseEnter;
            leave$ = this.layer.mouseLeave;
            updateCoords = this.FeatureComponent.updateCoordinates.bind(this.FeatureComponent);
            if (this.FeatureComponent.geometry.type !== 'Point') {
                throw new Error('mglDraggable only support point feature');
            }
        }
        else {
            throw new Error('mglDraggable can only be used on Feature (with a layer as input) or Marker');
        }
        this.handleDraggable(enter$, leave$, updateCoords);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed$.next(undefined);
        this.destroyed$.complete();
    }
    /**
     * @param {?} enter$
     * @param {?} leave$
     * @param {?} updateCoords
     * @return {?}
     */
    handleDraggable(enter$, leave$, updateCoords) {
        /** @type {?} */
        let moving = false;
        /** @type {?} */
        let inside = false;
        this.MapService.mapCreated$.subscribe(() => {
            /** @type {?} */
            const mouseUp$ = fromEvent(this.MapService.mapInstance, 'mouseup');
            /** @type {?} */
            const dragStart$ = enter$.pipe(takeUntil(this.destroyed$), filter(() => !moving), filter((evt) => this.filterFeature(evt)), tap(() => {
                inside = true;
                this.MapService.changeCanvasCursor('move');
                this.MapService.updateDragPan(false);
            }), switchMap(() => fromEvent(this.MapService.mapInstance, 'mousedown')
                .pipe(takeUntil(leave$))));
            /** @type {?} */
            const dragging$ = dragStart$.pipe(switchMap(() => fromEvent(this.MapService.mapInstance, 'mousemove')
                .pipe(takeUntil(mouseUp$))));
            /** @type {?} */
            const dragEnd$ = dragStart$.pipe(switchMap(() => mouseUp$.pipe(take(1))));
            dragStart$.subscribe((evt) => {
                moving = true;
                if (this.dragStart.observers.length) {
                    this.NgZone.run(() => this.dragStart.emit(evt));
                }
            });
            dragging$.subscribe((evt) => {
                updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
                if (this.drag.observers.length) {
                    this.NgZone.run(() => this.drag.emit(evt));
                }
            });
            dragEnd$.subscribe((evt) => {
                moving = false;
                if (this.dragEnd.observers.length) {
                    this.NgZone.run(() => this.dragEnd.emit(evt));
                }
                if (!inside) { // It's possible to dragEnd outside the target (small input lag)
                    // It's possible to dragEnd outside the target (small input lag)
                    this.MapService.changeCanvasCursor('');
                    this.MapService.updateDragPan(true);
                }
            });
            leave$.pipe(takeUntil(this.destroyed$), tap(() => inside = false), filter(() => !moving)).subscribe(() => {
                this.MapService.changeCanvasCursor('');
                this.MapService.updateDragPan(true);
            });
        });
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    filterFeature(evt) {
        if (this.FeatureComponent && this.layer) {
            /** @type {?} */
            const feature = this.MapService.queryRenderedFeatures(evt.point, {
                layers: [this.layer.id],
                filter: [
                    'all',
                    ['==', '$type', 'Point'],
                    ['==', '$id', this.FeatureComponent.id]
                ]
            })[0];
            if (!feature) {
                return false;
            }
        }
        return true;
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglDraggable]'
            },] }
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: MapService },
    { type: NgZone },
    { type: FeatureComponent, decorators: [{ type: Optional }, { type: Host }] },
    { type: MarkerComponent, decorators: [{ type: Optional }, { type: Host }] }
];
DraggableDirective.propDecorators = {
    layer: [{ type: Input, args: ['mglDraggable',] }],
    dragStart: [{ type: Output }],
    dragEnd: [{ type: Output }],
    drag: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ImageComponent {
    /**
     * @param {?} MapService
     * @param {?} zone
     */
    constructor(MapService$$1, zone) {
        this.MapService = MapService$$1;
        this.zone = zone;
        this.error = new EventEmitter();
        this.loaded = new EventEmitter();
        this.imageAdded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data) {
                this.MapService.addImage(this.id, this.data, this.options);
                this.imageAdded = true;
            }
            else if (this.url) {
                try {
                    yield this.MapService.loadAndAddImage(this.id, this.url, this.options);
                    this.imageAdded = true;
                    this.zone.run(() => {
                        this.loaded.emit();
                    });
                }
                catch (error) {
                    this.zone.run(() => {
                        this.error.emit(error);
                    });
                }
            }
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["data"] && !changes["data"].isFirstChange() ||
            changes["options"] && !changes["options"].isFirstChange() ||
            changes["url"] && !changes["url"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.imageAdded) {
            this.MapService.removeImage(this.id);
        }
    }
}
ImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-image',
                template: ''
            }] }
];
/** @nocollapse */
ImageComponent.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
ImageComponent.propDecorators = {
    id: [{ type: Input }],
    data: [{ type: Input }],
    options: [{ type: Input }],
    url: [{ type: Input }],
    error: [{ type: Output }],
    loaded: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MapComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        /* Added by ngx-mapbox-gl */
        this.movingMethod = 'flyTo';
        this.resize = new EventEmitter();
        this.remove = new EventEmitter();
        this.mouseDown = new EventEmitter();
        this.mouseUp = new EventEmitter();
        this.mouseMove = new EventEmitter();
        this.click = new EventEmitter();
        this.dblClick = new EventEmitter();
        this.mouseEnter = new EventEmitter();
        this.mouseLeave = new EventEmitter();
        this.mouseOver = new EventEmitter();
        this.mouseOut = new EventEmitter();
        this.contextMenu = new EventEmitter();
        this.touchStart = new EventEmitter();
        this.touchEnd = new EventEmitter();
        this.touchMove = new EventEmitter();
        this.touchCancel = new EventEmitter();
        this.wheel = new EventEmitter();
        this.moveStart = new EventEmitter();
        this.move = new EventEmitter();
        this.moveEnd = new EventEmitter();
        this.dragStart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.zoomStart = new EventEmitter();
        this.zoomEvt = new EventEmitter();
        this.zoomEnd = new EventEmitter();
        this.rotateStart = new EventEmitter();
        this.rotate = new EventEmitter();
        this.rotateEnd = new EventEmitter();
        this.pitchStart = new EventEmitter();
        this.pitchEvt = new EventEmitter();
        this.pitchEnd = new EventEmitter();
        this.boxZoomStart = new EventEmitter();
        this.boxZoomEnd = new EventEmitter();
        this.boxZoomCancel = new EventEmitter();
        this.webGlContextLost = new EventEmitter();
        this.webGlContextRestored = new EventEmitter();
        this.load = new EventEmitter();
        this.render = new EventEmitter();
        this.error = new EventEmitter();
        this.data = new EventEmitter();
        this.styleData = new EventEmitter();
        this.sourceData = new EventEmitter();
        this.dataLoading = new EventEmitter();
        this.styleDataLoading = new EventEmitter();
        this.sourceDataLoading = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get mapInstance() {
        return this.MapService.mapInstance;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.MapService.setup({
            accessToken: this.accessToken,
            customMapboxApiUrl: this.customMapboxApiUrl,
            mapOptions: {
                container: this.mapContainer.nativeElement,
                minZoom: this.minZoom,
                maxZoom: this.maxZoom,
                style: this.style,
                hash: this.hash,
                interactive: this.interactive,
                bearingSnap: this.bearingSnap,
                pitchWithRotate: this.pitchWithRotate,
                classes: this.classes,
                attributionControl: this.attributionControl,
                logoPosition: this.logoPosition,
                failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
                preserveDrawingBuffer: this.preserveDrawingBuffer,
                refreshExpiredTiles: this.refreshExpiredTiles,
                maxBounds: this.maxBounds,
                scrollZoom: this.scrollZoom,
                boxZoom: this.boxZoom,
                dragRotate: this.dragRotate,
                dragPan: this.dragPan,
                keyboard: this.keyboard,
                doubleClickZoom: this.doubleClickZoom,
                touchZoomRotate: this.touchZoomRotate,
                trackResize: this.trackResize,
                center: this.center,
                zoom: this.zoom,
                bearing: this.bearing,
                pitch: this.pitch,
                renderWorldCopies: this.renderWorldCopies,
                maxTileCacheSize: this.maxTileCacheSize,
                localIdeographFontFamily: this.localIdeographFontFamily,
                transformRequest: this.transformRequest
            },
            mapEvents: this
        });
        if (this.cursorStyle) {
            this.MapService.changeCanvasCursor(this.cursorStyle);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.MapService.destroyMap();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.MapService.mapCreated$.toPromise();
            if (changes["cursorStyle"] && !changes["cursorStyle"].isFirstChange()) {
                this.MapService.changeCanvasCursor(changes["cursorStyle"].currentValue);
            }
            if (changes["minZoom"] && !changes["minZoom"].isFirstChange()) {
                this.MapService.updateMinZoom(changes["minZoom"].currentValue);
            }
            if (changes["maxZoom"] && !changes["maxZoom"].isFirstChange()) {
                this.MapService.updateMaxZoom(changes["maxZoom"].currentValue);
            }
            if (changes["scrollZoom"] && !changes["scrollZoom"].isFirstChange()) {
                this.MapService.updateScrollZoom(changes["scrollZoom"].currentValue);
            }
            if (changes["dragRotate"] && !changes["dragRotate"].isFirstChange()) {
                this.MapService.updateDragRotate(changes["dragRotate"].currentValue);
            }
            if (changes["touchZoomRotate"] && !changes["touchZoomRotate"].isFirstChange()) {
                this.MapService.updateTouchZoomRotate(changes["touchZoomRotate"].currentValue);
            }
            if (changes["doubleClickZoom"] && !changes["doubleClickZoom"].isFirstChange()) {
                this.MapService.updateDoubleClickZoom(changes["doubleClickZoom"].currentValue);
            }
            if (changes["keyboard"] && !changes["keyboard"].isFirstChange()) {
                this.MapService.updateKeyboard(changes["keyboard"].currentValue);
            }
            if (changes["dragPan"] && !changes["dragPan"].isFirstChange()) {
                this.MapService.updateDragPan(changes["dragPan"].currentValue);
            }
            if (changes["boxZoom"] && !changes["boxZoom"].isFirstChange()) {
                this.MapService.updateBoxZoom(changes["boxZoom"].currentValue);
            }
            if (changes["style"] && !changes["style"].isFirstChange()) {
                this.MapService.updateStyle(changes["style"].currentValue);
            }
            if (changes["maxBounds"] && !changes["maxBounds"].isFirstChange()) {
                this.MapService.updateMaxBounds(changes["maxBounds"].currentValue);
            }
            if (changes["fitBounds"] && !changes["fitBounds"].isFirstChange()) {
                this.MapService.fitBounds(changes["fitBounds"].currentValue, this.fitBoundsOptions);
            }
            if (this.centerWithPanTo && changes["center"] && !changes["center"].isFirstChange() &&
                !changes["zoom"] && !changes["bearing"] && !changes["pitch"]) {
                this.MapService.panTo(/** @type {?} */ ((this.center)), this.panToOptions);
            }
            else if (changes["center"] && !changes["center"].isFirstChange() ||
                changes["zoom"] && !changes["zoom"].isFirstChange() ||
                changes["bearing"] && !changes["bearing"].isFirstChange() ||
                changes["pitch"] && !changes["pitch"].isFirstChange()) {
                this.MapService.move(this.movingMethod, this.movingOptions, changes["zoom"] && this.zoom ? this.zoom[0] : undefined, changes["center"] ? this.center : undefined, changes["bearing"] && this.bearing ? this.bearing[0] : undefined, changes["pitch"] && this.pitch ? this.pitch[0] : undefined);
            }
        });
    }
}
MapComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-map',
                template: '<div #container></div>',
                providers: [
                    MapService
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
  :host {
    display: block;
  }
  div {
    height: 100%;
    width: 100%;
  }
  `]
            }] }
];
/** @nocollapse */
MapComponent.ctorParameters = () => [
    { type: MapService }
];
MapComponent.propDecorators = {
    accessToken: [{ type: Input }],
    customMapboxApiUrl: [{ type: Input }],
    hash: [{ type: Input }],
    refreshExpiredTiles: [{ type: Input }],
    failIfMajorPerformanceCaveat: [{ type: Input }],
    classes: [{ type: Input }],
    bearingSnap: [{ type: Input }],
    interactive: [{ type: Input }],
    pitchWithRotate: [{ type: Input }],
    attributionControl: [{ type: Input }],
    logoPosition: [{ type: Input }],
    maxTileCacheSize: [{ type: Input }],
    localIdeographFontFamily: [{ type: Input }],
    preserveDrawingBuffer: [{ type: Input }],
    renderWorldCopies: [{ type: Input }],
    trackResize: [{ type: Input }],
    transformRequest: [{ type: Input }],
    minZoom: [{ type: Input }],
    maxZoom: [{ type: Input }],
    scrollZoom: [{ type: Input }],
    dragRotate: [{ type: Input }],
    touchZoomRotate: [{ type: Input }],
    doubleClickZoom: [{ type: Input }],
    keyboard: [{ type: Input }],
    dragPan: [{ type: Input }],
    boxZoom: [{ type: Input }],
    style: [{ type: Input }],
    center: [{ type: Input }],
    maxBounds: [{ type: Input }],
    zoom: [{ type: Input }],
    bearing: [{ type: Input }],
    pitch: [{ type: Input }],
    movingMethod: [{ type: Input }],
    movingOptions: [{ type: Input }],
    fitBounds: [{ type: Input }],
    fitBoundsOptions: [{ type: Input }],
    centerWithPanTo: [{ type: Input }],
    panToOptions: [{ type: Input }],
    cursorStyle: [{ type: Input }],
    resize: [{ type: Output }],
    remove: [{ type: Output }],
    mouseDown: [{ type: Output }],
    mouseUp: [{ type: Output }],
    mouseMove: [{ type: Output }],
    click: [{ type: Output }],
    dblClick: [{ type: Output }],
    mouseEnter: [{ type: Output }],
    mouseLeave: [{ type: Output }],
    mouseOver: [{ type: Output }],
    mouseOut: [{ type: Output }],
    contextMenu: [{ type: Output }],
    touchStart: [{ type: Output }],
    touchEnd: [{ type: Output }],
    touchMove: [{ type: Output }],
    touchCancel: [{ type: Output }],
    wheel: [{ type: Output }],
    moveStart: [{ type: Output }],
    move: [{ type: Output }],
    moveEnd: [{ type: Output }],
    dragStart: [{ type: Output }],
    drag: [{ type: Output }],
    dragEnd: [{ type: Output }],
    zoomStart: [{ type: Output }],
    zoomEvt: [{ type: Output }],
    zoomEnd: [{ type: Output }],
    rotateStart: [{ type: Output }],
    rotate: [{ type: Output }],
    rotateEnd: [{ type: Output }],
    pitchStart: [{ type: Output }],
    pitchEvt: [{ type: Output }],
    pitchEnd: [{ type: Output }],
    boxZoomStart: [{ type: Output }],
    boxZoomEnd: [{ type: Output }],
    boxZoomCancel: [{ type: Output }],
    webGlContextLost: [{ type: Output }],
    webGlContextRestored: [{ type: Output }],
    load: [{ type: Output }],
    render: [{ type: Output }],
    error: [{ type: Output }],
    data: [{ type: Output }],
    styleData: [{ type: Output }],
    sourceData: [{ type: Output }],
    dataLoading: [{ type: Output }],
    styleDataLoading: [{ type: Output }],
    sourceDataLoading: [{ type: Output }],
    mapContainer: [{ type: ViewChild, args: ['container',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PointDirective {
}
PointDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[mglPoint]' },] }
];
class ClusterPointDirective {
}
ClusterPointDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[mglClusterPoint]' },] }
];
class MarkerClusterComponent {
    /**
     * @param {?} MapService
     * @param {?} ChangeDetectorRef
     * @param {?} zone
     */
    constructor(MapService$$1, ChangeDetectorRef$$1, zone) {
        this.MapService = MapService$$1;
        this.ChangeDetectorRef = ChangeDetectorRef$$1;
        this.zone = zone;
        this.load = new EventEmitter();
        this.sub = new Subscription();
        this.getLeavesFn = (feature) => {
            return (limit, offset) => (/** @type {?} */ (this.supercluster.getLeaves))(/** @type {?} */ ((feature.properties.cluster_id)), limit, offset);
        };
        this.getChildrenFn = (feature) => {
            return () => (/** @type {?} */ (this.supercluster.getChildren))(/** @type {?} */ ((feature.properties.cluster_id)));
        };
        this.getClusterExpansionZoomFn = (feature) => {
            return () => (/** @type {?} */ (this.supercluster.getClusterExpansionZoom))(/** @type {?} */ ((feature.properties.cluster_id)));
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const options = {
            radius: this.radius,
            maxZoom: this.maxZoom,
            minZoom: this.minZoom,
            extent: this.extent,
            nodeSize: this.nodeSize,
            log: this.log,
            reduce: this.reduce,
            initial: this.initial,
            map: this.map
        };
        Object.keys(options)
            .forEach((key) => {
            /** @type {?} */
            const tkey = /** @type {?} */ (key);
            if (options[tkey] === undefined) {
                delete options[tkey];
            }
        });
        this.supercluster = supercluster(options);
        this.supercluster.load(this.data.features);
        this.load.emit(this.supercluster);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["data"] && !changes["data"].isFirstChange()) {
            this.supercluster.load(this.data.features);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.MapService.mapCreated$.subscribe(() => {
            /** @type {?} */
            const mapMove$ = merge(fromEvent(this.MapService.mapInstance, 'zoomChange'), fromEvent(this.MapService.mapInstance, 'move'));
            /** @type {?} */
            const sub = mapMove$.pipe(startWith(undefined)).subscribe(() => {
                this.zone.run(() => {
                    this.updateCluster();
                });
            });
            this.sub.add(sub);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    /**
     * @return {?}
     */
    updateCluster() {
        /** @type {?} */
        const bbox$$1 = this.MapService.getCurrentViewportBbox();
        /** @type {?} */
        const currentZoom = Math.round(this.MapService.mapInstance.getZoom());
        this.clusterPoints = this.supercluster.getClusters(bbox$$1, currentZoom);
        this.ChangeDetectorRef.markForCheck();
    }
}
MarkerClusterComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-marker-cluster',
                template: `
    <ng-container *ngFor="let feature of clusterPoints">
      <ng-container *ngIf="feature.properties.cluster; else point">
        <mgl-marker
          [feature]="feature"
        >
          <ng-container *ngTemplateOutlet="clusterPointTpl; context: {
            $implicit: feature,
            getLeavesFn: getLeavesFn(feature),
            getChildrenFn: getChildrenFn(feature),
            getClusterExpansionZoomFn: getClusterExpansionZoomFn(feature)
          }"></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-template #point>
        <mgl-marker
          [feature]="feature"
        >
          <ng-container *ngTemplateOutlet="pointTpl; context: { $implicit: feature }"></ng-container>
        </mgl-marker>
      </ng-template>
    </ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MarkerClusterComponent.ctorParameters = () => [
    { type: MapService },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
MarkerClusterComponent.propDecorators = {
    radius: [{ type: Input }],
    maxZoom: [{ type: Input }],
    minZoom: [{ type: Input }],
    extent: [{ type: Input }],
    nodeSize: [{ type: Input }],
    log: [{ type: Input }],
    reduce: [{ type: Input }],
    initial: [{ type: Input }],
    map: [{ type: Input }],
    data: [{ type: Input }],
    load: [{ type: Output }],
    pointTpl: [{ type: ContentChild, args: [PointDirective, { read: TemplateRef },] }],
    clusterPointTpl: [{ type: ContentChild, args: [ClusterPointDirective, { read: TemplateRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PopupComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.close = new EventEmitter();
        this.open = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.lngLat && this.marker || this.feature && this.lngLat || this.feature && this.marker) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange() ||
            changes["feature"] && !changes["feature"].isFirstChange()) {
            /** @type {?} */
            const newlngLat = changes["lngLat"] ? /** @type {?} */ ((this.lngLat)) : /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates));
            this.MapService.removePopupFromMap(/** @type {?} */ ((this.popupInstance)), true);
            /** @type {?} */
            const popupInstanceTmp = this.createPopup();
            this.MapService.addPopupToMap(popupInstanceTmp, newlngLat, /** @type {?} */ ((this.popupInstance)).isOpen());
            this.popupInstance = popupInstanceTmp;
        }
        if (changes["marker"] && !changes["marker"].isFirstChange()) {
            /** @type {?} */
            const previousMarker = changes["marker"].previousValue;
            if (previousMarker.markerInstance) {
                this.MapService.removePopupFromMarker(previousMarker.markerInstance);
            }
            if (this.marker && this.marker.markerInstance && this.popupInstance) {
                this.MapService.addPopupToMarker(this.marker.markerInstance, this.popupInstance);
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.popupInstance) {
            if (this.lngLat) {
                this.MapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.MapService.removePopupFromMarker(this.marker.markerInstance);
            }
        }
        this.popupInstance = undefined;
    }
    /**
     * @return {?}
     */
    createPopup() {
        return this.MapService.createPopup({
            popupOptions: {
                closeButton: this.closeButton,
                closeOnClick: this.closeOnClick,
                anchor: this.anchor,
                offset: this.offset
            },
            popupEvents: {
                open: this.open,
                close: this.close
            }
        }, this.content.nativeElement);
    }
    /**
     * @param {?} popup
     * @return {?}
     */
    addPopup(popup) {
        this.MapService.mapCreated$.subscribe(() => {
            if (this.lngLat || this.feature) {
                this.MapService.addPopupToMap(popup, this.lngLat ? this.lngLat : /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates)));
            }
            else if (this.marker && this.marker.markerInstance) {
                this.MapService.addPopupToMarker(this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    }
}
PopupComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-popup',
                template: '<div #content><ng-content></ng-content></div>',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
PopupComponent.ctorParameters = () => [
    { type: MapService }
];
PopupComponent.propDecorators = {
    closeButton: [{ type: Input }],
    closeOnClick: [{ type: Input }],
    anchor: [{ type: Input }],
    offset: [{ type: Input }],
    feature: [{ type: Input }],
    lngLat: [{ type: Input }],
    marker: [{ type: Input }],
    close: [{ type: Output }],
    open: [{ type: Output }],
    content: [{ type: ViewChild, args: ['content',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CanvasSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.init();
            /** @type {?} */
            const sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getSource(this.id))).subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["coordinates"] && !changes["coordinates"].isFirstChange() ||
            changes["canvas"] && !changes["canvas"].isFirstChange() ||
            changes["animate"] && !changes["animate"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        const source = {
            type: 'canvas',
            coordinates: this.coordinates,
            canvas: this.canvas,
            animate: this.animate,
        };
        this.MapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
}
CanvasSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-canvas-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CanvasSourceComponent.ctorParameters = () => [
    { type: MapService }
];
CanvasSourceComponent.propDecorators = {
    id: [{ type: Input }],
    coordinates: [{ type: Input }],
    canvas: [{ type: Input }],
    animate: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ImageSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.init();
            /** @type {?} */
            const sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getSource(this.id))).subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["url"] && !changes["url"].isFirstChange() ||
            changes["coordinates"] && !changes["coordinates"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
    /**
     * @return {?}
     */
    init() {
        this.MapService.addSource(this.id, {
            type: 'image',
            url: this.url,
            coordinates: this.coordinates
        });
        this.sourceAdded = true;
    }
}
ImageSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-image-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
ImageSourceComponent.ctorParameters = () => [
    { type: MapService }
];
ImageSourceComponent.propDecorators = {
    id: [{ type: Input }],
    url: [{ type: Input }],
    coordinates: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class RasterSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.type = 'raster';
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.init();
            /** @type {?} */
            const sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getSource(this.id))).subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["url"] && !changes["url"].isFirstChange() ||
            changes["tiles"] && !changes["tiles"].isFirstChange() ||
            changes["bounds"] && !changes["bounds"].isFirstChange() ||
            changes["minzoom"] && !changes["minzoom"].isFirstChange() ||
            changes["maxzoom"] && !changes["maxzoom"].isFirstChange() ||
            changes["tileSize"] && !changes["tileSize"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        const source = {
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            bounds: this.bounds,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
            tileSize: this.tileSize
        };
        this.MapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
}
RasterSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-raster-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
RasterSourceComponent.ctorParameters = () => [
    { type: MapService }
];
RasterSourceComponent.propDecorators = {
    id: [{ type: Input }],
    url: [{ type: Input }],
    tiles: [{ type: Input }],
    bounds: [{ type: Input }],
    minzoom: [{ type: Input }],
    maxzoom: [{ type: Input }],
    tileSize: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VectorSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.type = 'vector';
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.init();
            /** @type {?} */
            const sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getSource(this.id))).subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["url"] && !changes["url"].isFirstChange() ||
            changes["tiles"] && !changes["tiles"].isFirstChange() ||
            changes["minzoom"] && !changes["minzoom"].isFirstChange() ||
            changes["maxzoom"] && !changes["maxzoom"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
    /**
     * @return {?}
     */
    init() {
        this.MapService.addSource(this.id, {
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
        });
        this.sourceAdded = true;
    }
}
VectorSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-vector-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
VectorSourceComponent.ctorParameters = () => [
    { type: MapService }
];
VectorSourceComponent.propDecorators = {
    id: [{ type: Input }],
    url: [{ type: Input }],
    tiles: [{ type: Input }],
    minzoom: [{ type: Input }],
    maxzoom: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VideoSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService$$1) {
        this.MapService = MapService$$1;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.init();
            /** @type {?} */
            const sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getSource(this.id))).subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["urls"] && !changes["urls"].isFirstChange() ||
            changes["coordinates"] && !changes["coordinates"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
    /**
     * @return {?}
     */
    init() {
        this.MapService.addSource(this.id, {
            type: 'video',
            urls: this.urls,
            coordinates: this.coordinates
        });
        this.sourceAdded = true;
    }
}
VideoSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-video-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
VideoSourceComponent.ctorParameters = () => [
    { type: MapService }
];
VideoSourceComponent.propDecorators = {
    id: [{ type: Input }],
    urls: [{ type: Input }],
    coordinates: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMapboxGLModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static withConfig(config) {
        return {
            ngModule: NgxMapboxGLModule,
            providers: [
                {
                    provide: MAPBOX_API_KEY,
                    useValue: config.accessToken
                },
                {
                    provide: MAPBOX_GEOCODER_API_KEY,
                    useValue: config.geocoderAccessToken || config.accessToken
                }
            ],
        };
    }
}
NgxMapboxGLModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    MapComponent,
                    LayerComponent,
                    DraggableDirective,
                    ImageComponent,
                    VectorSourceComponent,
                    GeoJSONSourceComponent,
                    RasterSourceComponent,
                    ImageSourceComponent,
                    VideoSourceComponent,
                    CanvasSourceComponent,
                    FeatureComponent,
                    MarkerComponent,
                    PopupComponent,
                    ControlComponent,
                    FullscreenControlDirective,
                    NavigationControlDirective,
                    GeocoderControlDirective,
                    GeolocateControlDirective,
                    AttributionControlDirective,
                    ScaleControlDirective,
                    PointDirective,
                    ClusterPointDirective,
                    MarkerClusterComponent
                ],
                exports: [
                    MapComponent,
                    LayerComponent,
                    DraggableDirective,
                    ImageComponent,
                    VectorSourceComponent,
                    GeoJSONSourceComponent,
                    RasterSourceComponent,
                    ImageSourceComponent,
                    VideoSourceComponent,
                    CanvasSourceComponent,
                    FeatureComponent,
                    MarkerComponent,
                    PopupComponent,
                    ControlComponent,
                    FullscreenControlDirective,
                    NavigationControlDirective,
                    GeocoderControlDirective,
                    GeolocateControlDirective,
                    AttributionControlDirective,
                    ScaleControlDirective,
                    PointDirective,
                    ClusterPointDirective,
                    MarkerClusterComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxMapboxGLModule, MAPBOX_API_KEY, MglResizeEventEmitter, MapService, MapComponent, AttributionControlDirective as ɵs, ControlComponent as ɵm, FullscreenControlDirective as ɵn, GeocoderControlDirective as ɵq, MAPBOX_GEOCODER_API_KEY as ɵp, GeolocateControlDirective as ɵr, NavigationControlDirective as ɵo, ScaleControlDirective as ɵt, DraggableDirective as ɵb, ImageComponent as ɵf, LayerComponent as ɵa, ClusterPointDirective as ɵv, MarkerClusterComponent as ɵw, PointDirective as ɵu, MarkerComponent as ɵe, PopupComponent as ɵl, CanvasSourceComponent as ɵk, FeatureComponent as ɵc, GeoJSONSourceComponent as ɵd, ImageSourceComponent as ɵi, RasterSourceComponent as ɵh, VectorSourceComponent as ɵg, VideoSourceComponent as ɵj };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFwL21hcC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2F0dHJpYnV0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2Z1bGxzY3JlZW4tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL25hdmlnYXRpb24tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvc2NhbGUtY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2xheWVyL2xheWVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS9nZW9qc29uL2dlb2pzb24tc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9pbWFnZS9pbWFnZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL21hcC9tYXAuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9tYXJrZXItY2x1c3Rlci9tYXJrZXItY2x1c3Rlci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3BvcHVwL3BvcHVwLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL2NhbnZhcy1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvaW1hZ2Utc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL3Jhc3Rlci1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvdmVjdG9yLXNvdXJjZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS92aWRlby1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9uZ3gtbWFwYm94LWdsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuaW1wb3J0IHsgcG9seWdvbiB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuaW1wb3J0ICogYXMgTWFwYm94R2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJCb3ggfSBmcm9tICdzdXBlcmNsdXN0ZXInO1xuaW1wb3J0IHsgTWFwRXZlbnQsIE1hcEltYWdlRGF0YSwgTWFwSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi9tYXAudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWdsUmVzaXplRXZlbnRFbWl0dGVyIHtcbiAgYWJzdHJhY3QgcmVzaXplRXZlbnQ6IE9ic2VydmFibGU8dm9pZD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBNYXAge1xuICBhY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgY3VzdG9tTWFwYm94QXBpVXJsPzogc3RyaW5nO1xuICBtYXBPcHRpb25zOiBhbnk7IC8vIE1hcGJveEdsLk1hcGJveE9wdGlvbnNcbiAgbWFwRXZlbnRzOiBNYXBFdmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cExheWVyIHtcbiAgbGF5ZXJPcHRpb25zOiBNYXBib3hHbC5MYXllcjtcbiAgbGF5ZXJFdmVudHM6IHtcbiAgICBjbGljazogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICAgIG1vdXNlRW50ZXI6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgICBtb3VzZUxlYXZlOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gICAgbW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBQb3B1cCB7XG4gIHBvcHVwT3B0aW9uczogTWFwYm94R2wuUG9wdXBPcHRpb25zO1xuICBwb3B1cEV2ZW50czoge1xuICAgIG9wZW46IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICBjbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTWFya2VyIHtcbiAgbWFya2Vyc09wdGlvbnM6IHtcbiAgICBvZmZzZXQ/OiBNYXBib3hHbC5Qb2ludExpa2U7XG4gICAgYW5jaG9yPzogTWFwYm94R2wuQW5jaG9yO1xuICAgIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcbiAgICBsbmdMYXQ/OiBNYXBib3hHbC5MbmdMYXRMaWtlO1xuICB9O1xuICBtYXJrZXJzRXZlbnRzOiB7XG4gICAgZHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgICBkcmFnOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgICBkcmFnRW5kOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQWxsU291cmNlID0gTWFwYm94R2wuVmVjdG9yU291cmNlIHxcbiAgTWFwYm94R2wuUmFzdGVyU291cmNlIHxcbiAgTWFwYm94R2wuR2VvSlNPTlNvdXJjZSB8XG4gIE1hcGJveEdsLkltYWdlU291cmNlT3B0aW9ucyB8XG4gIE1hcGJveEdsLlZpZGVvU291cmNlT3B0aW9ucyB8XG4gIE1hcGJveEdsLkdlb0pTT05Tb3VyY2VSYXcgfFxuICBNYXBib3hHbC5DYW52YXNTb3VyY2VPcHRpb25zO1xuXG5leHBvcnQgdHlwZSBNb3ZpbmdPcHRpb25zID0gTWFwYm94R2wuRmx5VG9PcHRpb25zIHxcbiAgKE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMgJiBNYXBib3hHbC5DYW1lcmFPcHRpb25zKSB8XG4gIE1hcGJveEdsLkNhbWVyYU9wdGlvbnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcbiAgbWFwSW5zdGFuY2U6IE1hcGJveEdsLk1hcDtcbiAgbWFwQ3JlYXRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcExvYWRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcEV2ZW50czogTWFwRXZlbnQ7XG5cbiAgcHJpdmF0ZSBtYXBDcmVhdGVkID0gbmV3IEFzeW5jU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIG1hcExvYWRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsYXllcklkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHNvdXJjZUlkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIG1hcmtlcnNUb1JlbW92ZTogTWFwYm94R2wuTWFya2VyW10gPSBbXTtcbiAgcHJpdmF0ZSBwb3B1cHNUb1JlbW92ZTogTWFwYm94R2wuUG9wdXBbXSA9IFtdO1xuICBwcml2YXRlIGltYWdlSWRzVG9SZW1vdmU6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFQQk9YX0FQSV9LRVkpIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0FQSV9LRVk6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IE1nbFJlc2l6ZUV2ZW50RW1pdHRlcjogTWdsUmVzaXplRXZlbnRFbWl0dGVyXG4gICkge1xuICAgIHRoaXMubWFwQ3JlYXRlZCQgPSB0aGlzLm1hcENyZWF0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYXBMb2FkZWQkID0gdGhpcy5tYXBMb2FkZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXR1cChvcHRpb25zOiBTZXR1cE1hcCkge1xuICAgIC8vIE5lZWQgb25TdGFibGUgdG8gd2FpdCBmb3IgYSBwb3RlbnRpYWwgQGFuZ3VsYXIvcm91dGUgdHJhbnNpdGlvbiB0byBlbmRcbiAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgLy8gV29ya2Fyb3VuZCByb2xsdXAgaXNzdWVcbiAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnYWNjZXNzVG9rZW4nLCBvcHRpb25zLmFjY2Vzc1Rva2VuIHx8IHRoaXMuTUFQQk9YX0FQSV9LRVkpO1xuICAgICAgaWYgKG9wdGlvbnMuY3VzdG9tTWFwYm94QXBpVXJsKSB7XG4gICAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnY29uZmlnLkFQSV9VUkwnLCBvcHRpb25zLmN1c3RvbU1hcGJveEFwaVVybCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNyZWF0ZU1hcChvcHRpb25zLm1hcE9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKG9wdGlvbnMubWFwRXZlbnRzKTtcbiAgICAgIHRoaXMubWFwRXZlbnRzID0gb3B0aW9ucy5tYXBFdmVudHM7XG4gICAgICB0aGlzLm1hcENyZWF0ZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBDcmVhdGVkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95TWFwKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pblpvb20obWluWm9vbTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1pblpvb20obWluWm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVNYXhab29tKG1heFpvb206IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhab29tKG1heFpvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU2Nyb2xsWm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEcmFnUm90YXRlKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS50b3VjaFpvb21Sb3RhdGUuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRG91YmxlQ2xpY2tab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVLZXlib2FyZChzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURyYWdQYW4oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQm94Wm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdHlsZShzdHlsZTogTWFwYm94R2wuU3R5bGUpIHtcbiAgICAvLyBUT0RPIFByb2JhYmx5IG5vdCBzbyBzaW1wbGUsIHdyaXRlIGRlbW8vdGVzdHNcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4Qm91bmRzKG1heEJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSkge1xuICAgIC8vIFRPRE8gUHJvYmFibHkgbm90IHNvIHNpbXBsZSwgd3JpdGUgZGVtby90ZXN0c1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhCb3VuZHMobWF4Qm91bmRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUNhbnZhc0N1cnNvcihjdXJzb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzQ29udGFpbmVyKCk7XG4gICAgY2FudmFzLnN0eWxlLmN1cnNvciA9IGN1cnNvcjtcbiAgfVxuXG4gIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhcbiAgICBwb2ludE9yQm94PzogTWFwYm94R2wuUG9pbnRMaWtlIHwgTWFwYm94R2wuUG9pbnRMaWtlW10sXG4gICAgcGFyYW1ldGVycz86IHsgbGF5ZXJzPzogc3RyaW5nW10sIGZpbHRlcj86IGFueVtdIH1cbiAgKTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+W10ge1xuICAgIHJldHVybiB0aGlzLm1hcEluc3RhbmNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhwb2ludE9yQm94LCBwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHBhblRvKGNlbnRlcjogTWFwYm94R2wuTG5nTGF0TGlrZSwgb3B0aW9ucz86IE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucGFuVG8oY2VudGVyLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmUoXG4gICAgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyxcbiAgICBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucyxcbiAgICB6b29tPzogbnVtYmVyLFxuICAgIGNlbnRlcj86IE1hcGJveEdsLkxuZ0xhdExpa2UsXG4gICAgYmVhcmluZz86IG51bWJlcixcbiAgICBwaXRjaD86IG51bWJlclxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICg8YW55PnRoaXMubWFwSW5zdGFuY2VbbW92aW5nTWV0aG9kXSkoe1xuICAgICAgICAuLi5tb3ZpbmdPcHRpb25zLFxuICAgICAgICB6b29tOiB6b29tID8gem9vbSA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpLFxuICAgICAgICBjZW50ZXI6IGNlbnRlciA/IGNlbnRlciA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2VudGVyKCksXG4gICAgICAgIGJlYXJpbmc6IGJlYXJpbmcgPyBiZWFyaW5nIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRCZWFyaW5nKCksXG4gICAgICAgIHBpdGNoOiBwaXRjaCA/IHBpdGNoIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRQaXRjaCgpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZExheWVyKGxheWVyOiBTZXR1cExheWVyLCBiaW5kRXZlbnRzOiBib29sZWFuLCBiZWZvcmU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMobGF5ZXIubGF5ZXJPcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIE1hcGJveEdsLkxheWVyPmtleTtcbiAgICAgICAgICBpZiAobGF5ZXIubGF5ZXJPcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsYXllci5sYXllck9wdGlvbnNbdGtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkTGF5ZXIobGF5ZXIubGF5ZXJPcHRpb25zLCBiZWZvcmUpO1xuICAgICAgaWYgKGJpbmRFdmVudHMpIHtcbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjbGljaycsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5tb3VzZUVudGVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWVudGVyJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VFbnRlci5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubW91c2VMZWF2ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTGVhdmUuZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vtb3ZlJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVMYXllcihsYXllcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUucHVzaChsYXllcklkKTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IFNldHVwTWFya2VyKSB7XG4gICAgY29uc3Qgb3B0aW9uczogTWFwYm94R2wuTWFya2VyT3B0aW9ucyA9IHtcbiAgICAgIG9mZnNldDogbWFya2VyLm1hcmtlcnNPcHRpb25zLm9mZnNldCxcbiAgICAgIGFuY2hvcjogbWFya2VyLm1hcmtlcnNPcHRpb25zLmFuY2hvcixcbiAgICAgIGRyYWdnYWJsZTogISFtYXJrZXIubWFya2Vyc09wdGlvbnMuZHJhZ2dhYmxlXG4gICAgfTtcbiAgICBpZiAobWFya2VyLm1hcmtlcnNPcHRpb25zLmVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBvcHRpb25zLmVsZW1lbnQgPSBtYXJrZXIubWFya2Vyc09wdGlvbnMuZWxlbWVudDtcbiAgICB9XG4gICAgY29uc3QgbWFya2VySW5zdGFuY2UgPSBuZXcgTWFwYm94R2wuTWFya2VyKG9wdGlvbnMpO1xuICAgIGlmIChtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWdzdGFydCcsIChldmVudDogeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdTdGFydC5lbWl0KGV2ZW50LnRhcmdldCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICBtYXJrZXJJbnN0YW5jZS5vbignZHJhZycsIChldmVudDogeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWcuZW1pdChldmVudC50YXJnZXQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZlbnQ6IHsgdGFyZ2V0OiBNYXBib3hHbC5NYXJrZXIgfSkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnRW5kLmVtaXQoZXZlbnQudGFyZ2V0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIG1hcmtlckluc3RhbmNlLnNldExuZ0xhdChtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZSA/XG4gICAgICBtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMgOlxuICAgICAgbWFya2VyLm1hcmtlcnNPcHRpb25zLmxuZ0xhdCFcbiAgICApO1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VySW5zdGFuY2UuYWRkVG8odGhpcy5tYXBJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gbWFya2VySW5zdGFuY2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIpIHtcbiAgICB0aGlzLm1hcmtlcnNUb1JlbW92ZS5wdXNoKG1hcmtlcik7XG4gIH1cblxuICBjcmVhdGVQb3B1cChwb3B1cDogU2V0dXBQb3B1cCwgZWxlbWVudDogTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocG9wdXAucG9wdXBPcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgICAgICg8YW55PnBvcHVwLnBvcHVwT3B0aW9ucylba2V5XSA9PT0gdW5kZWZpbmVkICYmIGRlbGV0ZSAoPGFueT5wb3B1cC5wb3B1cE9wdGlvbnMpW2tleV0pO1xuICAgICAgY29uc3QgcG9wdXBJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5Qb3B1cChwb3B1cC5wb3B1cE9wdGlvbnMpO1xuICAgICAgcG9wdXBJbnN0YW5jZS5zZXRET01Db250ZW50KGVsZW1lbnQpO1xuICAgICAgaWYgKHBvcHVwLnBvcHVwRXZlbnRzLmNsb3NlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9wdXBJbnN0YW5jZS5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHBvcHVwLnBvcHVwRXZlbnRzLm9wZW4ub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb3B1cEluc3RhbmNlLm9uKCdvcGVuJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMub3Blbi5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcHVwSW5zdGFuY2U7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQb3B1cFRvTWFwKHBvcHVwOiBNYXBib3hHbC5Qb3B1cCwgbG5nTGF0OiBNYXBib3hHbC5MbmdMYXRMaWtlLCBza2lwT3BlbkV2ZW50ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmIChza2lwT3BlbkV2ZW50ICYmICg8YW55PnBvcHVwKS5fbGlzdGVuZXJzKSB7XG4gICAgICAgIGRlbGV0ZSAoPGFueT5wb3B1cCkuX2xpc3RlbmVyc1snb3BlbiddO1xuICAgICAgfVxuICAgICAgcG9wdXAuc2V0TG5nTGF0KGxuZ0xhdCk7XG4gICAgICBwb3B1cC5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIsIHBvcHVwOiBNYXBib3hHbC5Qb3B1cCkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHBvcHVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcChwb3B1cDogTWFwYm94R2wuUG9wdXAsIHNraXBDbG9zZUV2ZW50ID0gZmFsc2UpIHtcbiAgICBpZiAoc2tpcENsb3NlRXZlbnQgJiYgKDxhbnk+cG9wdXApLl9saXN0ZW5lcnMpIHtcbiAgICAgIGRlbGV0ZSAoPGFueT5wb3B1cCkuX2xpc3RlbmVyc1snY2xvc2UnXTtcbiAgICB9XG4gICAgdGhpcy5wb3B1cHNUb1JlbW92ZS5wdXNoKHBvcHVwKTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRDb250cm9sKGNvbnRyb2w6IE1hcGJveEdsLkNvbnRyb2wgfCBNYXBib3hHbC5JQ29udHJvbCwgcG9zaXRpb24/OiAndG9wLXJpZ2h0JyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkQ29udHJvbCg8YW55PmNvbnRyb2wsIHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUNvbnRyb2woY29udHJvbDogTWFwYm94R2wuQ29udHJvbCB8IE1hcGJveEdsLklDb250cm9sKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUNvbnRyb2woPGFueT5jb250cm9sKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRBbmRBZGRJbWFnZShpbWFnZUlkOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLmxvYWRJbWFnZSh1cmwsIChlcnJvcjogeyBzdGF0dXM6IG51bWJlciB9IHwgbnVsbCwgaW1hZ2U6IEltYWdlRGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRJbWFnZShpbWFnZUlkLCBpbWFnZSwgb3B0aW9ucyk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSW1hZ2UoaW1hZ2VJZDogc3RyaW5nLCBkYXRhOiBNYXBJbWFnZURhdGEsIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkSW1hZ2UoaW1hZ2VJZCwgPGFueT5kYXRhLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUltYWdlKGltYWdlSWQ6IHN0cmluZykge1xuICAgIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZS5wdXNoKGltYWdlSWQpO1xuICB9XG5cbiAgYWRkU291cmNlKHNvdXJjZUlkOiBzdHJpbmcsIHNvdXJjZTogQWxsU291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhzb3VyY2UpXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgKDxhbnk+c291cmNlKVtrZXldID09PSB1bmRlZmluZWQgJiYgZGVsZXRlICg8YW55PnNvdXJjZSlba2V5XSk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZFNvdXJjZShzb3VyY2VJZCwgPGFueT5zb3VyY2UpOyAvLyBUeXBpbmdzIGlzc3VlXG4gICAgfSk7XG4gIH1cblxuICBnZXRTb3VyY2U8VD4oc291cmNlSWQ6IHN0cmluZykge1xuICAgIHJldHVybiA8VD48YW55PnRoaXMubWFwSW5zdGFuY2UuZ2V0U291cmNlKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHJlbW92ZVNvdXJjZShzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZS5wdXNoKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHNldEFsbExheWVyUGFpbnRQcm9wZXJ0eShcbiAgICBsYXllcklkOiBzdHJpbmcsXG4gICAgcGFpbnQ6IE1hcGJveEdsLkJhY2tncm91bmRQYWludCB8XG4gICAgICBNYXBib3hHbC5GaWxsUGFpbnQgfFxuICAgICAgTWFwYm94R2wuRmlsbEV4dHJ1c2lvblBhaW50IHxcbiAgICAgIE1hcGJveEdsLkxpbmVQYWludCB8XG4gICAgICBNYXBib3hHbC5TeW1ib2xQYWludCB8XG4gICAgICBNYXBib3hHbC5SYXN0ZXJQYWludCB8XG4gICAgICBNYXBib3hHbC5DaXJjbGVQYWludFxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBhaW50KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgcGVyZiwgc2V0UGFpbnRQcm9wZXJ0eSBvbmx5IG9uIGNoYW5nZWQgcGFpbnQgcHJvcHMgbWF5YmVcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRQYWludFByb3BlcnR5KGxheWVySWQsIGtleSwgKDxhbnk+cGFpbnQpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRBbGxMYXllckxheW91dFByb3BlcnR5KFxuICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICBsYXlvdXQ6IE1hcGJveEdsLkJhY2tncm91bmRMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuRmlsbExheW91dCB8XG4gICAgICBNYXBib3hHbC5GaWxsRXh0cnVzaW9uTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkxpbmVMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuU3ltYm9sTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLlJhc3RlckxheW91dCB8XG4gICAgICBNYXBib3hHbC5DaXJjbGVMYXlvdXRcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhsYXlvdXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldExheW91dFByb3BlcnR5KGxheWVySWQsIGtleSwgKDxhbnk+bGF5b3V0KVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJGaWx0ZXIobGF5ZXJJZDogc3RyaW5nLCBmaWx0ZXI6IGFueVtdKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldEZpbHRlcihsYXllcklkLCBmaWx0ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJCZWZvcmUobGF5ZXJJZDogc3RyaW5nLCBiZWZvcmVJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm1vdmVMYXllcihsYXllcklkLCBiZWZvcmVJZCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllclpvb21SYW5nZShsYXllcklkOiBzdHJpbmcsIG1pblpvb20/OiBudW1iZXIsIG1heFpvb20/OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TGF5ZXJab29tUmFuZ2UobGF5ZXJJZCwgbWluWm9vbSA/IG1pblpvb20gOiAwLCBtYXhab29tID8gbWF4Wm9vbSA6IDIwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpdEJvdW5kcyhib3VuZHM6IE1hcGJveEdsLkxuZ0xhdEJvdW5kc0xpa2UsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuZml0Qm91bmRzKGJvdW5kcywgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50Vmlld3BvcnRCYm94KCk6IEJCb3gge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzKCk7XG4gICAgY29uc3QgdyA9IHBhcnNlSW50KGNhbnZhcy5zdHlsZS53aWR0aCEsIDEwKTtcbiAgICBjb25zdCBoID0gcGFyc2VJbnQoY2FudmFzLnN0eWxlLmhlaWdodCEsIDEwKTtcbiAgICBjb25zdCB1cExlZnQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbMCwgMF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoW3csIDBdKS50b0FycmF5KCk7XG4gICAgY29uc3QgZG93blJpZ2h0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoW3csIGhdKS50b0FycmF5KCk7XG4gICAgY29uc3QgZG93bkxlZnQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbMCwgaF0pLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gPGFueT5iYm94KHBvbHlnb24oW1t1cExlZnQsIHVwUmlnaHQsIGRvd25SaWdodCwgZG93bkxlZnQsIHVwTGVmdF1dKSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKCk7XG4gICAgICB0aGlzLnJlbW92ZVNvdXJjZXMoKTtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VycygpO1xuICAgICAgdGhpcy5yZW1vdmVQb3B1cHMoKTtcbiAgICAgIHRoaXMucmVtb3ZlSW1hZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1hcChvcHRpb25zOiBNYXBib3hHbC5NYXBib3hPcHRpb25zKSB7XG4gICAgTmdab25lLmFzc2VydE5vdEluQW5ndWxhclpvbmUoKTtcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgTWFwYm94R2wuTWFwYm94T3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5NYXAob3B0aW9ucyk7XG4gICAgY29uc3Qgc3ViQ2hhbmdlcyA9IHRoaXMuem9uZS5vbk1pY3JvdGFza0VtcHR5XG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXBwbHlDaGFuZ2VzKCkpO1xuICAgIGlmICh0aGlzLk1nbFJlc2l6ZUV2ZW50RW1pdHRlcikge1xuICAgICAgY29uc3Qgc3ViUmVzaXplID0gdGhpcy5NZ2xSZXNpemVFdmVudEVtaXR0ZXIucmVzaXplRXZlbnQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZXNpemUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1YlJlc2l6ZSk7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChzdWJDaGFuZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJzKCkge1xuICAgIGZvciAoY29uc3QgbGF5ZXJJZCBvZiB0aGlzLmxheWVySWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdjbGljaycsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ21vdXNlZW50ZXInLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdtb3VzZWxlYXZlJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignbW91c2Vtb3ZlJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUxheWVyKGxheWVySWQpO1xuICAgIH1cbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlcygpIHtcbiAgICBmb3IgKGNvbnN0IHNvdXJjZUlkIG9mIHRoaXMuc291cmNlSWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlU291cmNlKHNvdXJjZUlkKTtcbiAgICB9XG4gICAgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVNYXJrZXJzKCkge1xuICAgIGZvciAoY29uc3QgbWFya2VyIG9mIHRoaXMubWFya2Vyc1RvUmVtb3ZlKSB7XG4gICAgICBtYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMubWFya2Vyc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVBvcHVwcygpIHtcbiAgICBmb3IgKGNvbnN0IHBvcHVwIG9mIHRoaXMucG9wdXBzVG9SZW1vdmUpIHtcbiAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLnBvcHVwc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUltYWdlcygpIHtcbiAgICBmb3IgKGNvbnN0IGltYWdlSWQgb2YgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUltYWdlKGltYWdlSWQpO1xuICAgIH1cbiAgICB0aGlzLmltYWdlSWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgaG9va0V2ZW50cyhldmVudHM6IE1hcEV2ZW50KSB7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbG9hZCcsICgpID0+IHtcbiAgICAgIHRoaXMubWFwTG9hZGVkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMubWFwTG9hZGVkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5sb2FkLmVtaXQodGhpcy5tYXBJbnN0YW5jZSkpO1xuICAgIH0pO1xuICAgIGlmIChldmVudHMucmVzaXplLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3Jlc2l6ZScsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlc2l6ZS5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZW1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVtb3ZlJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVtb3ZlLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlRG93bi5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWRvd24nLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZURvd24uZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VVcC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZXVwJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VVcC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vtb3ZlJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY2xpY2suZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGJsQ2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGJsY2xpY2snLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYmxDbGljay5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZUVudGVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZW50ZXInLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZUVudGVyLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlTGVhdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlTGVhdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VPdmVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3ZlcicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlT3Zlci5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU91dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW91dCcsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlT3V0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNvbnRleHRNZW51Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NvbnRleHRtZW51JywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY29udGV4dE1lbnUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaHN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaEVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaG1vdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaE1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hDYW5jZWwub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hjYW5jZWwnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaENhbmNlbC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53aGVlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAvLyBNYXBib3hHbC5NYXBXaGVlbEV2ZW50XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3aGVlbCcsIChldnQ6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2hlZWwuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdmVzdGFydCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmVFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZWVuZCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZHJhZ3N0YXJ0JywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZ0VuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnZW5kJywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21TdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMuem9vbVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FdnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy56b29tRXZ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy56b29tRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZXN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnJvdGF0ZVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucm90YXRlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGVlbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMucm90YXRlRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hzdGFydCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaEV2dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hFdnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hlbmQnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21TdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21TdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21lbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21FbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbUNhbmNlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tY2FuY2VsJywgKGV2dDogTWFwYm94R2wuTWFwQm94Wm9vbUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tQ2FuY2VsLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dExvc3Qub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0bG9zdCcsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dExvc3QuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMud2ViR2xDb250ZXh0UmVzdG9yZWQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0cmVzdG9yZWQnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53ZWJHbENvbnRleHRSZXN0b3JlZC5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZW5kZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVuZGVyJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVuZGVyLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmVycm9yLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2Vycm9yJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZXJyb3IuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYXRhLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWRhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnN0eWxlRGF0YS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zb3VyY2VEYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnNvdXJjZURhdGEuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGF0YWxvYWRpbmcnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRhdGFMb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhTG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zb3VyY2VEYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzb3VyY2VkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YUxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBtb3ZlIHRoaXMgZWxzZXdoZXJlXG4gIHByaXZhdGUgYXNzaWduKG9iajogYW55LCBwcm9wOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgcHJvcCA9IHByb3Auc3BsaXQoJy4nKTtcbiAgICB9XG4gICAgaWYgKHByb3AubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgZSA9IHByb3Auc2hpZnQoKTtcbiAgICAgIHRoaXMuYXNzaWduKG9ialtlXSA9XG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbZV0pID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAgID8gb2JqW2VdXG4gICAgICAgICAgOiB7fSxcbiAgICAgICAgcHJvcCxcbiAgICAgICAgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbcHJvcFswXV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2wsIElDb250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbnRyb2wgaW1wbGVtZW50cyBJQ29udHJvbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudFxuICApIHtcbiAgfVxuXG4gIG9uQWRkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lcjtcbiAgfVxuXG4gIG9uUmVtb3ZlKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBnZXREZWZhdWx0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuICd0b3AtcmlnaHQnO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1jb250cm9sJyxcbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwibWFwYm94Z2wtY3RybFwiICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgcG9zaXRpb24/OiAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCc7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29udHJvbDogQ29udHJvbCB8IElDb250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY29udHJvbCA9IG5ldyBDdXN0b21Db250cm9sKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLmNvbnRyb2whLCB0aGlzLnBvc2l0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVDb250cm9sKHRoaXMuY29udHJvbCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsQXR0cmlidXRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBjb21wYWN0PzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zOiB7IGNvbXBhY3Q/OiBib29sZWFuIH0gPSB7fTtcbiAgICAgIGlmICh0aGlzLmNvbXBhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLmNvbXBhY3QgPSB0aGlzLmNvbXBhY3Q7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBBdHRyaWJ1dGlvbkNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZ1bGxzY3JlZW5Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsRnVsbHNjcmVlbl0nXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBGdWxsc2NyZWVuQ29udHJvbCgpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xuICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBHZW9jb2RlckV2ZW50IH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbmNvbnN0IE1hcGJveEdlb2NvZGVyID0gcmVxdWlyZSgnQG1hcGJveC9tYXBib3gtZ2wtZ2VvY29kZXInKTtcblxuZXhwb3J0IGNvbnN0IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZID0gbmV3IEluamVjdGlvblRva2VuKCdNYXBib3hBcGlLZXknKTtcblxuZXhwb3J0IGludGVyZmFjZSBMbmdMYXRMaXRlcmFsIHtcbiAgbGF0aXR1ZGU6IG51bWJlcjtcbiAgbG9uZ2l0dWRlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0cyBleHRlbmRzIEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5Qb2ludD4ge1xuICBhdHRyaWJ1dGlvbjogc3RyaW5nO1xuICBxdWVyeTogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0IGV4dGVuZHMgR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+IHtcbiAgYmJveDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGNlbnRlcjogbnVtYmVyW107XG4gIHBsYWNlX25hbWU6IHN0cmluZztcbiAgcGxhY2VfdHlwZTogc3RyaW5nW107XG4gIHJlbGV2YW5jZTogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29udGV4dDogYW55W107XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xHZW9jb2Rlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBHZW9jb2RlckV2ZW50IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgY291bnRyeT86IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGJib3g/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgQElucHV0KCkgdHlwZXM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZseVRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBASW5wdXQoKSBsaW1pdD86IG51bWJlcjtcbiAgQElucHV0KCkgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBASW5wdXQoKSBmaWx0ZXI/OiAoZmVhdHVyZTogUmVzdWx0KSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBsb2NhbEdlb2NvZGVyPzogKHF1ZXJ5OiBzdHJpbmcpID0+IFJlc3VsdFtdO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHByb3hpbWl0eT86IExuZ0xhdExpdGVyYWw7XG4gIEBJbnB1dCgpIHNlYXJjaElucHV0Pzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBjbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHsgcXVlcnk6IHN0cmluZyB9PigpO1xuICBAT3V0cHV0KCkgcmVzdWx0cyA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzdWx0cz4oKTtcbiAgQE91dHB1dCgpIHJlc3VsdCA9IG5ldyBFdmVudEVtaXR0ZXI8eyByZXN1bHQ6IFJlc3VsdCB9PigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBnZW9jb2RlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZKSBwcml2YXRlIHJlYWRvbmx5IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZOiBzdHJpbmdcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwcm94aW1pdHk6IHRoaXMucHJveGltaXR5LFxuICAgICAgICBjb3VudHJ5OiB0aGlzLmNvdW50cnksXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgIGJib3g6IHRoaXMuYmJveCxcbiAgICAgICAgdHlwZXM6IHRoaXMudHlwZXMsXG4gICAgICAgIGZseVRvOiB0aGlzLmZseVRvLFxuICAgICAgICBtaW5MZW5ndGg6IHRoaXMubWluTGVuZ3RoLFxuICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGxvY2FsR2VvY29kZXI6IHRoaXMubG9jYWxHZW9jb2RlcixcbiAgICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4gfHwgdGhpcy5NQVBCT1hfR0VPQ09ERVJfQVBJX0tFWVxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiB0eXBlb2Ygb3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IE1hcGJveEdlb2NvZGVyKG9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKHRoaXMpO1xuICAgICAgdGhpcy5hZGRDb250cm9sKCk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIucXVlcnkodGhpcy5zZWFyY2hJbnB1dCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmdlb2NvZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnByb3hpbWl0eSAmJiAhY2hhbmdlcy5wcm94aW1pdHkuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLnNldFByb3hpbWl0eShjaGFuZ2VzLnByb3hpbWl0eS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5zZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5xdWVyeSh0aGlzLnNlYXJjaElucHV0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZENvbnRyb2woKSB7XG4gICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSB0aGlzLmdlb2NvZGVyO1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKFxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb25cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGV2ZW50czogR2VvY29kZXJFdmVudCkge1xuICAgIGlmIChldmVudHMucmVzdWx0cy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdyZXN1bHRzJywgKGV2dDogUmVzdWx0cykgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVzdWx0cy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZXN1bHQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbigncmVzdWx0JywgKGV2dDogeyByZXN1bHQ6IFJlc3VsdCB9KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZXN1bHQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignZXJyb3InLCAoZXZ0OiBhbnkpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmVycm9yLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignbG9hZGluZycsIChldnQ6IHsgcXVlcnk6IHN0cmluZyB9KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5sb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNsZWFyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ2NsZWFyJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY2xlYXIuZW1pdCgpKSk7XG4gICAgfVxuXG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VvbG9jYXRlQ29udHJvbCwgRml0Qm91bmRzT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbEdlb2xvY2F0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBwb3NpdGlvbk9wdGlvbnM/OiBQb3NpdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIGZpdEJvdW5kc09wdGlvbnM/OiBGaXRCb3VuZHNPcHRpb25zO1xuICBASW5wdXQoKSB0cmFja1VzZXJMb2NhdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dVc2VyTG9jYXRpb24/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHBvc2l0aW9uT3B0aW9uczogdGhpcy5wb3NpdGlvbk9wdGlvbnMsXG4gICAgICAgIGZpdEJvdW5kc09wdGlvbnM6IHRoaXMuZml0Qm91bmRzT3B0aW9ucyxcbiAgICAgICAgdHJhY2tVc2VyTG9jYXRpb246IHRoaXMudHJhY2tVc2VyTG9jYXRpb24sXG4gICAgICAgIHNob3dVc2VyTG9jYXRpb246IHRoaXMuc2hvd1VzZXJMb2NhdGlvblxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiB0eXBlb2Ygb3B0aW9ucz5rZXk7XG4gICAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IEdlb2xvY2F0ZUNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbE5hdmlnYXRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIHNob3dDb21wYXNzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd1pvb20/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGxldCBvcHRpb25zOiB7IHNob3dDb21wYXNzPzogYm9vbGVhbiwgc2hvd1pvb20/OiBib29sZWFuIH0gPSB7fTtcbiAgICAgIGlmICh0aGlzLnNob3dDb21wYXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy5zaG93Q29tcGFzcyA9IHRoaXMuc2hvd0NvbXBhc3M7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zaG93Wm9vbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMuc2hvd1pvb20gPSB0aGlzLnNob3dab29tO1xuICAgICAgfVxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgTmF2aWdhdGlvbkNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjYWxlQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbFNjYWxlXSdcbn0pXG5leHBvcnQgY2xhc3MgU2NhbGVDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1bml0PzogJ2ltcGVyaWFsJyB8ICdtZXRyaWMnIHwgJ25hdXRpY2FsJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMudW5pdCAmJiAhY2hhbmdlcy51bml0LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgKDxhbnk+dGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpLnNldFVuaXQoY2hhbmdlcy51bml0LmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uczogeyBtYXhXaWR0aD86IG51bWJlciwgdW5pdD86IHN0cmluZyB9ID0ge307XG4gICAgICBpZiAodGhpcy5tYXhXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMubWF4V2lkdGggPSB0aGlzLm1heFdpZHRoO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudW5pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMudW5pdCA9IHRoaXMudW5pdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IFNjYWxlQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLCB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhY2tncm91bmRMYXlvdXQsXG4gIEJhY2tncm91bmRQYWludCxcbiAgQ2lyY2xlTGF5b3V0LFxuICBDaXJjbGVQYWludCxcbiAgRmlsbEV4dHJ1c2lvbkxheW91dCxcbiAgRmlsbEV4dHJ1c2lvblBhaW50LFxuICBGaWxsTGF5b3V0LFxuICBGaWxsUGFpbnQsXG4gIEdlb0pTT05Tb3VyY2UsXG4gIEdlb0pTT05Tb3VyY2VSYXcsXG4gIEltYWdlU291cmNlLFxuICBMYXllcixcbiAgTGluZUxheW91dCxcbiAgTGluZVBhaW50LFxuICBNYXBNb3VzZUV2ZW50LFxuICBSYXN0ZXJMYXlvdXQsXG4gIFJhc3RlclBhaW50LFxuICBSYXN0ZXJTb3VyY2UsXG4gIFN5bWJvbExheW91dCxcbiAgU3ltYm9sUGFpbnQsXG4gIFZlY3RvclNvdXJjZSxcbiAgVmlkZW9Tb3VyY2Vcbn0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWxheWVyJyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIExheWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgTGF5ZXIge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBzb3VyY2U/OiBzdHJpbmcgfCBWZWN0b3JTb3VyY2UgfCBSYXN0ZXJTb3VyY2UgfCBHZW9KU09OU291cmNlIHwgSW1hZ2VTb3VyY2UgfCBWaWRlb1NvdXJjZSB8IEdlb0pTT05Tb3VyY2VSYXc7XG4gIEBJbnB1dCgpIHR5cGU6ICdzeW1ib2wnIHwgJ2ZpbGwnIHwgJ2xpbmUnIHwgJ2NpcmNsZScgfCAnZmlsbC1leHRydXNpb24nIHwgJ3Jhc3RlcicgfCAnYmFja2dyb3VuZCc7XG4gIEBJbnB1dCgpIG1ldGFkYXRhPzogYW55O1xuICBASW5wdXQoKSBzb3VyY2VMYXllcj86IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBmaWx0ZXI/OiBhbnlbXTtcbiAgQElucHV0KCkgbGF5b3V0PzogQmFja2dyb3VuZExheW91dCB8IEZpbGxMYXlvdXQgfCBGaWxsRXh0cnVzaW9uTGF5b3V0IHwgTGluZUxheW91dCB8IFN5bWJvbExheW91dCB8IFJhc3RlckxheW91dCB8IENpcmNsZUxheW91dDtcbiAgQElucHV0KCkgcGFpbnQ/OiBCYWNrZ3JvdW5kUGFpbnQgfCBGaWxsUGFpbnQgfCBGaWxsRXh0cnVzaW9uUGFpbnQgfCBMaW5lUGFpbnQgfCBTeW1ib2xQYWludCB8IFJhc3RlclBhaW50IHwgQ2lyY2xlUGFpbnQ7XG4gIEBJbnB1dCgpIGJlZm9yZT86IHN0cmluZztcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcblxuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcblxuICBwcml2YXRlIGxheWVyQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KHRydWUpO1xuICAgICAgdGhpcy5zdWIgPSBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnc3R5bGVkYXRhJykucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0TGF5ZXIodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdChmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wYWludCAmJiAhY2hhbmdlcy5wYWludC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRBbGxMYXllclBhaW50UHJvcGVydHkodGhpcy5pZCwgY2hhbmdlcy5wYWludC5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubGF5b3V0ICYmICFjaGFuZ2VzLmxheW91dC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRBbGxMYXllckxheW91dFByb3BlcnR5KHRoaXMuaWQsIGNoYW5nZXMubGF5b3V0LmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5maWx0ZXIgJiYgIWNoYW5nZXMuZmlsdGVyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyRmlsdGVyKHRoaXMuaWQsIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5iZWZvcmUgJiYgIWNoYW5nZXMuYmVmb3JlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyQmVmb3JlKHRoaXMuaWQsIGNoYW5nZXMuYmVmb3JlLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWF4em9vbSAmJiAhY2hhbmdlcy5tYXh6b29tLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyWm9vbVJhbmdlKHRoaXMuaWQsIHRoaXMubWluem9vbSwgdGhpcy5tYXh6b29tKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5sYXllckFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlTGF5ZXIodGhpcy5pZCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoYmluZEV2ZW50czogYm9vbGVhbikge1xuICAgIGNvbnN0IGxheWVyID0ge1xuICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1ldGFkYXRhOiB0aGlzLm1ldGFkYXRhLFxuICAgICAgICAnc291cmNlLWxheWVyJzogdGhpcy5zb3VyY2VMYXllcixcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGxheW91dDogdGhpcy5sYXlvdXQsXG4gICAgICAgIHBhaW50OiB0aGlzLnBhaW50XG4gICAgICB9LFxuICAgICAgbGF5ZXJFdmVudHM6IHtcbiAgICAgICAgY2xpY2s6IHRoaXMuY2xpY2ssXG4gICAgICAgIG1vdXNlRW50ZXI6IHRoaXMubW91c2VFbnRlcixcbiAgICAgICAgbW91c2VMZWF2ZTogdGhpcy5tb3VzZUxlYXZlLFxuICAgICAgICBtb3VzZU1vdmU6IHRoaXMubW91c2VNb3ZlXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkTGF5ZXIobGF5ZXIsIGJpbmRFdmVudHMsIHRoaXMuYmVmb3JlKTtcbiAgICB0aGlzLmxheWVyQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMbmdMYXRMaWtlLCBNYXJrZXIsIFBvaW50TGlrZSwgQW5jaG9yIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFya2VyJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBzdHlsZXM6IFtgXG4gICAgLm1hcGJveGdsLW1hcmtlciB7XG4gICAgICBsaW5lLWhlaWdodDogMDtcbiAgICB9XG4gIGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSBvZmZzZXQ/OiBQb2ludExpa2U7XG4gIEBJbnB1dCgpIGFuY2hvcj86IEFuY2hvcjtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIEBJbnB1dCgpIGZlYXR1cmU/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD47XG4gIEBJbnB1dCgpIGxuZ0xhdD86IExuZ0xhdExpa2U7XG4gIEBJbnB1dCgpIGRyYWdnYWJsZT86IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIG1hcmtlckluc3RhbmNlPzogTWFya2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmZlYXR1cmUgJiYgdGhpcy5sbmdMYXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZmVhdHVyZSBhbmQgbG5nTGF0IGlucHV0IGFyZSBtdXR1YWxseSBleGNsdXNpdmUnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMubG5nTGF0ICYmICFjaGFuZ2VzLmxuZ0xhdC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdCh0aGlzLmxuZ0xhdCEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5mZWF0dXJlICYmICFjaGFuZ2VzLmZlYXR1cmUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQodGhpcy5mZWF0dXJlIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kcmFnZ2FibGUgJiYgIWNoYW5nZXMuZHJhZ2dhYmxlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0RHJhZ2dhYmxlKCEhdGhpcy5kcmFnZ2FibGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UgPSB0aGlzLk1hcFNlcnZpY2UuYWRkTWFya2VyKHtcbiAgICAgICAgbWFya2Vyc09wdGlvbnM6IHtcbiAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0LFxuICAgICAgICAgIGFuY2hvcjogdGhpcy5hbmNob3IsXG4gICAgICAgICAgZHJhZ2dhYmxlOiAhIXRoaXMuZHJhZ2dhYmxlLFxuICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgIGZlYXR1cmU6IHRoaXMuZmVhdHVyZSxcbiAgICAgICAgICBsbmdMYXQ6IHRoaXMubG5nTGF0XG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtlcnNFdmVudHM6IHtcbiAgICAgICAgICBkcmFnU3RhcnQ6IHRoaXMuZHJhZ1N0YXJ0LFxuICAgICAgICAgIGRyYWc6IHRoaXMuZHJhZyxcbiAgICAgICAgICBkcmFnRW5kOiB0aGlzLmRyYWdFbmRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlTWFya2VyKHRoaXMubWFya2VySW5zdGFuY2UhKTtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdG9nZ2xlUG9wdXAoKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEudG9nZ2xlUG9wdXAoKTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdChjb29yZGluYXRlcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlLCBHZW9KU09OU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWdlb2pzb24tc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHZW9KU09OU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgR2VvSlNPTlNvdXJjZU9wdGlvbnMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIGRhdGE/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeT4gfCBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uR2VvbWV0cnk+IHwgc3RyaW5nO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBidWZmZXI/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHRvbGVyYW5jZT86IG51bWJlcjtcbiAgQElucHV0KCkgY2x1c3Rlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsdXN0ZXJSYWRpdXM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNsdXN0ZXJNYXhab29tPzogbnVtYmVyO1xuXG4gIHVwZGF0ZUZlYXR1cmVEYXRhID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGZlYXR1cmVJZENvdW50ZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kYXRhKSB7XG4gICAgICB0aGlzLmRhdGEgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgIGZlYXR1cmVzOiBbXVxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5idWZmZXIgJiYgIWNoYW5nZXMuYnVmZmVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50b2xlcmFuY2UgJiYgIWNoYW5nZXMudG9sZXJhbmNlLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jbHVzdGVyICYmICFjaGFuZ2VzLmNsdXN0ZXIuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNsdXN0ZXJSYWRpdXMgJiYgIWNoYW5nZXMuY2x1c3RlclJhZGl1cy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2x1c3Rlck1heFpvb20gJiYgIWNoYW5nZXMuY2x1c3Rlck1heFpvb20uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuTWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBzb3VyY2Uuc2V0RGF0YSh0aGlzLmRhdGEhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEZlYXR1cmUoZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+KSB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IDxHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+PnRoaXMuZGF0YTtcbiAgICBjb2xsZWN0aW9uLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KCk7XG4gIH1cblxuICByZW1vdmVGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSA8R2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pj50aGlzLmRhdGE7XG4gICAgY29uc3QgaW5kZXggPSBjb2xsZWN0aW9uLmZlYXR1cmVzLmluZGV4T2YoZmVhdHVyZSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGNvbGxlY3Rpb24uZmVhdHVyZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KCk7XG4gIH1cblxuICBnZXROZXdGZWF0dXJlSWQoKSB7XG4gICAgcmV0dXJuICsrdGhpcy5mZWF0dXJlSWRDb3VudGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgYnVmZmVyOiB0aGlzLmJ1ZmZlcixcbiAgICAgIHRvbGVyYW5jZTogdGhpcy50b2xlcmFuY2UsXG4gICAgICBjbHVzdGVyOiB0aGlzLmNsdXN0ZXIsXG4gICAgICBjbHVzdGVyUmFkaXVzOiB0aGlzLmNsdXN0ZXJSYWRpdXMsXG4gICAgICBjbHVzdGVyTWF4Wm9vbTogdGhpcy5jbHVzdGVyTWF4Wm9vbSxcbiAgICB9KTtcbiAgICBjb25zdCBzdWIgPSB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLnBpcGUoZGVib3VuY2VUaW1lKDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5NYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICAgIHNvdXJjZS5zZXREYXRhKHRoaXMuZGF0YSEpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWZlYXR1cmUnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ/OiBudW1iZXI7IC8vIEZJWE1FIG51bWJlciBvbmx5IGZvciBub3cgaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvaXNzdWVzLzI3MTZcbiAgQElucHV0KCkgZ2VvbWV0cnk6IEdlb0pTT04uR2VvbWV0cnlPYmplY3Q7XG4gIEBJbnB1dCgpIHByb3BlcnRpZXM6IGFueTtcbiAgdHlwZTogJ0ZlYXR1cmUnID0gJ0ZlYXR1cmUnO1xuXG4gIHByaXZhdGUgZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBHZW9KU09OU291cmNlQ29tcG9uZW50KSkgcHJpdmF0ZSBHZW9KU09OU291cmNlQ29tcG9uZW50OiBHZW9KU09OU291cmNlQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LmdldE5ld0ZlYXR1cmVJZCgpO1xuICAgIH1cbiAgICB0aGlzLmZlYXR1cmUgPSB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBnZW9tZXRyeTogdGhpcy5nZW9tZXRyeSxcbiAgICAgIHByb3BlcnRpZXM6IHRoaXMucHJvcGVydGllcyA/IHRoaXMucHJvcGVydGllcyA6IHt9XG4gICAgfTtcbiAgICB0aGlzLmZlYXR1cmUuaWQgPSB0aGlzLmlkO1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5hZGRGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQucmVtb3ZlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICB9XG5cbiAgdXBkYXRlQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXM6IG51bWJlcltdKSB7XG4gICAgKDxHZW9KU09OLlBvaW50PnRoaXMuZmVhdHVyZS5nZW9tZXRyeSkuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcbiAgICB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQudXBkYXRlRmVhdHVyZURhdGEubmV4dCgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBNb3VzZUV2ZW50IH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuLi9sYXllci9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi4vc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsRHJhZ2dhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnbWdsRHJhZ2dhYmxlJykgbGF5ZXI/OiBMYXllckNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBkZXN0cm95ZWQkOiBSZXBsYXlTdWJqZWN0PHZvaWQ+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgTmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIEZlYXR1cmVDb21wb25lbnQ/OiBGZWF0dXJlQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBNYXJrZXJDb21wb25lbnQ/OiBNYXJrZXJDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgZW50ZXIkO1xuICAgIGxldCBsZWF2ZSQ7XG4gICAgbGV0IHVwZGF0ZUNvb3JkcztcbiAgICBpZiAodGhpcy5NYXJrZXJDb21wb25lbnQpIHtcbiAgICAgIGNvbnNvbGUud2FybignbWdsRHJhZ2dhYmxlIG9uIE1hcmtlciBpcyBkZXByZWNhdGVkLCB1c2UgZHJhZ2dhYmxlIGlucHV0IGluc3RlYWQnKTtcbiAgICAgIGxldCBtYXJrZXJFbGVtZW50ID0gKDxFbGVtZW50PnRoaXMuTWFya2VyQ29tcG9uZW50LmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICBpZiAobWFya2VyRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWFya2VyRWxlbWVudCA9IG1hcmtlckVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICB9XG4gICAgICBlbnRlciQgPSBmcm9tRXZlbnQobWFya2VyRWxlbWVudCwgJ21vdXNlZW50ZXInKTtcbiAgICAgIGxlYXZlJCA9IGZyb21FdmVudChtYXJrZXJFbGVtZW50LCAnbW91c2VsZWF2ZScpO1xuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5NYXJrZXJDb21wb25lbnQudXBkYXRlQ29vcmRpbmF0ZXMuYmluZCh0aGlzLk1hcmtlckNvbXBvbmVudCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgZW50ZXIkID0gdGhpcy5sYXllci5tb3VzZUVudGVyO1xuICAgICAgbGVhdmUkID0gdGhpcy5sYXllci5tb3VzZUxlYXZlO1xuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5GZWF0dXJlQ29tcG9uZW50LnVwZGF0ZUNvb3JkaW5hdGVzLmJpbmQodGhpcy5GZWF0dXJlQ29tcG9uZW50KTtcbiAgICAgIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQuZ2VvbWV0cnkudHlwZSAhPT0gJ1BvaW50Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbERyYWdnYWJsZSBvbmx5IHN1cHBvcnQgcG9pbnQgZmVhdHVyZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbERyYWdnYWJsZSBjYW4gb25seSBiZSB1c2VkIG9uIEZlYXR1cmUgKHdpdGggYSBsYXllciBhcyBpbnB1dCkgb3IgTWFya2VyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEcmFnZ2FibGUoZW50ZXIkLCBsZWF2ZSQsIHVwZGF0ZUNvb3Jkcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCh1bmRlZmluZWQpO1xuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVEcmFnZ2FibGUoZW50ZXIkOiBPYnNlcnZhYmxlPGFueT4sIGxlYXZlJDogT2JzZXJ2YWJsZTxhbnk+LCB1cGRhdGVDb29yZHM6IChjb29yZDogbnVtYmVyW10pID0+IHZvaWQpIHtcbiAgICBsZXQgbW92aW5nID0gZmFsc2U7XG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgbW91c2VVcCQgPSBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2V1cCcpO1xuICAgICAgY29uc3QgZHJhZ1N0YXJ0JCA9IGVudGVyJC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICFtb3ZpbmcpLFxuICAgICAgICBmaWx0ZXIoKGV2dCkgPT4gdGhpcy5maWx0ZXJGZWF0dXJlKGV2dCkpLFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGluc2lkZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignbW92ZScpO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKGZhbHNlKTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIGZyb21FdmVudDxNYXBNb3VzZUV2ZW50Pih0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3VzZWRvd24nKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGxlYXZlJCkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCBkcmFnZ2luZyQgPSBkcmFnU3RhcnQkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2Vtb3ZlJylcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwobW91c2VVcCQpKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29uc3QgZHJhZ0VuZCQgPSBkcmFnU3RhcnQkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtb3VzZVVwJC5waXBlKHRha2UoMSkpKVxuICAgICAgKTtcbiAgICAgIGRyYWdTdGFydCQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgbW92aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnU3RhcnQuZW1pdChldnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkcmFnZ2luZyQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgdXBkYXRlQ29vcmRzKFtldnQubG5nTGF0LmxuZywgZXZ0LmxuZ0xhdC5sYXRdKTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5OZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZy5lbWl0KGV2dCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRyYWdFbmQkLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgIG1vdmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5kcmFnRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnRW5kLmVtaXQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbnNpZGUpIHsgLy8gSXQncyBwb3NzaWJsZSB0byBkcmFnRW5kIG91dHNpZGUgdGhlIHRhcmdldCAoc21hbGwgaW5wdXQgbGFnKVxuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxlYXZlJC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSxcbiAgICAgICAgdGFwKCgpID0+IGluc2lkZSA9IGZhbHNlKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICFtb3ZpbmcpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1Bhbih0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJGZWF0dXJlKGV2dDogTWFwTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgY29uc3QgZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPGFueT4gPSB0aGlzLk1hcFNlcnZpY2UucXVlcnlSZW5kZXJlZEZlYXR1cmVzKFxuICAgICAgICBldnQucG9pbnQsXG4gICAgICAgIHtcbiAgICAgICAgICBsYXllcnM6IFt0aGlzLmxheWVyLmlkXSxcbiAgICAgICAgICBmaWx0ZXI6IFtcbiAgICAgICAgICAgICdhbGwnLFxuICAgICAgICAgICAgWyc9PScsICckdHlwZScsICdQb2ludCddLFxuICAgICAgICAgICAgWyc9PScsICckaWQnLCB0aGlzLkZlYXR1cmVDb21wb25lbnQuaWRdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICApWzBdO1xuICAgICAgaWYgKCFmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBJbWFnZURhdGEsIE1hcEltYWdlT3B0aW9ucyB9IGZyb20gJy4uL21hcC9tYXAudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2UnLFxuICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBkYXRhPzogTWFwSW1hZ2VEYXRhO1xuICBASW5wdXQoKSBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zO1xuICBASW5wdXQoKSB1cmw/OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjx7IHN0YXR1czogbnVtYmVyIH0+KCk7XG4gIEBPdXRwdXQoKSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBpbWFnZUFkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRhdGEpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZEltYWdlKFxuICAgICAgICAgIHRoaXMuaWQsXG4gICAgICAgICAgdGhpcy5kYXRhLFxuICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmltYWdlQWRkZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnVybCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuTWFwU2VydmljZS5sb2FkQW5kQWRkSW1hZ2UoXG4gICAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgICAgdGhpcy51cmwsXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuaW1hZ2VBZGRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm9wdGlvbnMgJiYgIWNoYW5nZXMub3B0aW9ucy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudXJsICYmICFjaGFuZ2VzLnVybC5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5pbWFnZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlSW1hZ2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBbmltYXRpb25PcHRpb25zLFxuICBFdmVudERhdGEsXG4gIExuZ0xhdEJvdW5kc0xpa2UsXG4gIExuZ0xhdExpa2UsXG4gIE1hcCxcbiAgTWFwQm94Wm9vbUV2ZW50LFxuICBNYXBNb3VzZUV2ZW50LFxuICBNYXBUb3VjaEV2ZW50LFxuICBQYWRkaW5nT3B0aW9ucyxcbiAgUG9pbnRMaWtlLFxuICBTdHlsZVxuICB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlLCBNb3ZpbmdPcHRpb25zIH0gZnJvbSAnLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBFdmVudCB9IGZyb20gJy4vbWFwLnR5cGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgbmFtZXNwYWNlIG1hcGJveGdsIHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIE1hcGJveE9wdGlvbnMge1xuICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdD86IGJvb2xlYW47XG4gICAgICB0cmFuc2Zvcm1SZXF1ZXN0PzogRnVuY3Rpb247XG4gICAgICBsb2NhbElkZW9ncmFwaEZvbnRGYW1pbHk/OiBzdHJpbmc7XG4gICAgICBwaXRjaFdpdGhSb3RhdGU/OiBib29sZWFuO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFwJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250YWluZXI+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbiAgZGl2IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgYF0sXG4gIHByb3ZpZGVyczogW1xuICAgIE1hcFNlcnZpY2VcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE1hcEV2ZW50IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGN1c3RvbU1hcGJveEFwaVVybD86IHN0cmluZztcbiAgQElucHV0KCkgaGFzaD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlZnJlc2hFeHBpcmVkVGlsZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xhc3Nlcz86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBiZWFyaW5nU25hcD86IG51bWJlcjtcbiAgQElucHV0KCkgaW50ZXJhY3RpdmU/OiBib29sZWFuO1xuICBASW5wdXQoKSBwaXRjaFdpdGhSb3RhdGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBhdHRyaWJ1dGlvbkNvbnRyb2w/OiBib29sZWFuO1xuICBASW5wdXQoKSBsb2dvUG9zaXRpb24/OiAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCc7XG4gIEBJbnB1dCgpIG1heFRpbGVDYWNoZVNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseT86IHN0cmluZztcbiAgQElucHV0KCkgcHJlc2VydmVEcmF3aW5nQnVmZmVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyV29ybGRDb3BpZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSB0cmFja1Jlc2l6ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRyYW5zZm9ybVJlcXVlc3Q/OiBGdW5jdGlvbjtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBtaW5ab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXhab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBzY3JvbGxab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZHJhZ1JvdGF0ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRvdWNoWm9vbVJvdGF0ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRvdWJsZUNsaWNrWm9vbT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGtleWJvYXJkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZHJhZ1Bhbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJveFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBzdHlsZTogU3R5bGUgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGNlbnRlcj86IExuZ0xhdExpa2U7XG4gIEBJbnB1dCgpIG1heEJvdW5kcz86IExuZ0xhdEJvdW5kc0xpa2U7XG4gIEBJbnB1dCgpIHpvb20/OiBbbnVtYmVyXTtcbiAgQElucHV0KCkgYmVhcmluZz86IFtudW1iZXJdO1xuICBASW5wdXQoKSBwaXRjaD86IFtudW1iZXJdO1xuXG4gIC8qIEFkZGVkIGJ5IG5neC1tYXBib3gtZ2wgKi9cbiAgQElucHV0KCkgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyA9ICdmbHlUbyc7XG4gIEBJbnB1dCgpIG1vdmluZ09wdGlvbnM/OiBNb3ZpbmdPcHRpb25zO1xuICBASW5wdXQoKSBmaXRCb3VuZHM/OiBMbmdMYXRCb3VuZHNMaWtlO1xuICBASW5wdXQoKSBmaXRCb3VuZHNPcHRpb25zPzoge1xuICAgIGxpbmVhcj86IGJvb2xlYW4sXG4gICAgZWFzaW5nPzogRnVuY3Rpb24sXG4gICAgcGFkZGluZz86IG51bWJlciB8IFBhZGRpbmdPcHRpb25zLFxuICAgIG9mZnNldD86IFBvaW50TGlrZSxcbiAgICBtYXhab29tPzogbnVtYmVyXG4gIH07XG4gIEBJbnB1dCgpIGNlbnRlcldpdGhQYW5Ubz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBhblRvT3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIGN1cnNvclN0eWxlPzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSByZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBjb250ZXh0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgd2hlZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTsgLy8gVE9ETyBNYXBXaGVlbEV2ZW50XG4gIEBPdXRwdXQoKSBtb3ZlU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTsgLy8gVE9ETyBDaGVjayB0eXBlXG4gIEBPdXRwdXQoKSBtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdmVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB6b29tU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgem9vbUV2dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB6b29tRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcGl0Y2hTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgcGl0Y2hFdnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHBpdGNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIHdlYkdsQ29udGV4dExvc3QgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRSZXN0b3JlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIFRPRE8gQ2hlY2sgdHlwZVxuICBAT3V0cHV0KCkgZGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc3R5bGVEYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBzb3VyY2VEYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBkYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc3R5bGVEYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcblxuICBnZXQgbWFwSW5zdGFuY2UoKTogTWFwIHtcbiAgICByZXR1cm4gdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgbWFwQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0dXAoe1xuICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXG4gICAgICBjdXN0b21NYXBib3hBcGlVcmw6IHRoaXMuY3VzdG9tTWFwYm94QXBpVXJsLFxuICAgICAgbWFwT3B0aW9uczoge1xuICAgICAgICBjb250YWluZXI6IHRoaXMubWFwQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgICBzdHlsZTogdGhpcy5zdHlsZSxcbiAgICAgICAgaGFzaDogdGhpcy5oYXNoLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdGhpcy5pbnRlcmFjdGl2ZSxcbiAgICAgICAgYmVhcmluZ1NuYXA6IHRoaXMuYmVhcmluZ1NuYXAsXG4gICAgICAgIHBpdGNoV2l0aFJvdGF0ZTogdGhpcy5waXRjaFdpdGhSb3RhdGUsXG4gICAgICAgIGNsYXNzZXM6IHRoaXMuY2xhc3NlcyxcbiAgICAgICAgYXR0cmlidXRpb25Db250cm9sOiB0aGlzLmF0dHJpYnV0aW9uQ29udHJvbCxcbiAgICAgICAgbG9nb1Bvc2l0aW9uOiB0aGlzLmxvZ29Qb3NpdGlvbixcbiAgICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdDogdGhpcy5mYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0LFxuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRoaXMucHJlc2VydmVEcmF3aW5nQnVmZmVyLFxuICAgICAgICByZWZyZXNoRXhwaXJlZFRpbGVzOiB0aGlzLnJlZnJlc2hFeHBpcmVkVGlsZXMsXG4gICAgICAgIG1heEJvdW5kczogdGhpcy5tYXhCb3VuZHMsXG4gICAgICAgIHNjcm9sbFpvb206IHRoaXMuc2Nyb2xsWm9vbSxcbiAgICAgICAgYm94Wm9vbTogdGhpcy5ib3hab29tLFxuICAgICAgICBkcmFnUm90YXRlOiB0aGlzLmRyYWdSb3RhdGUsXG4gICAgICAgIGRyYWdQYW46IHRoaXMuZHJhZ1BhbixcbiAgICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQsXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogdGhpcy5kb3VibGVDbGlja1pvb20sXG4gICAgICAgIHRvdWNoWm9vbVJvdGF0ZTogdGhpcy50b3VjaFpvb21Sb3RhdGUsXG4gICAgICAgIHRyYWNrUmVzaXplOiB0aGlzLnRyYWNrUmVzaXplLFxuICAgICAgICBjZW50ZXI6IHRoaXMuY2VudGVyLFxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgIGJlYXJpbmc6IHRoaXMuYmVhcmluZyxcbiAgICAgICAgcGl0Y2g6IHRoaXMucGl0Y2gsXG4gICAgICAgIHJlbmRlcldvcmxkQ29waWVzOiB0aGlzLnJlbmRlcldvcmxkQ29waWVzLFxuICAgICAgICBtYXhUaWxlQ2FjaGVTaXplOiB0aGlzLm1heFRpbGVDYWNoZVNpemUsXG4gICAgICAgIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseTogdGhpcy5sb2NhbElkZW9ncmFwaEZvbnRGYW1pbHksXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IHRoaXMudHJhbnNmb3JtUmVxdWVzdFxuICAgICAgfSxcbiAgICAgIG1hcEV2ZW50czogdGhpc1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmN1cnNvclN0eWxlKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKHRoaXMuY3Vyc29yU3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5kZXN0cm95TWFwKCk7XG4gIH1cblxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgYXdhaXQgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnRvUHJvbWlzZSgpO1xuICAgIGlmIChjaGFuZ2VzLmN1cnNvclN0eWxlICYmICFjaGFuZ2VzLmN1cnNvclN0eWxlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcihjaGFuZ2VzLmN1cnNvclN0eWxlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1pblpvb20gJiYgIWNoYW5nZXMubWluWm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVNaW5ab29tKGNoYW5nZXMubWluWm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXhab29tICYmICFjaGFuZ2VzLm1heFpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlTWF4Wm9vbShjaGFuZ2VzLm1heFpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc2Nyb2xsWm9vbSAmJiAhY2hhbmdlcy5zY3JvbGxab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZVNjcm9sbFpvb20oY2hhbmdlcy5zY3JvbGxab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRyYWdSb3RhdGUgJiYgIWNoYW5nZXMuZHJhZ1JvdGF0ZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUm90YXRlKGNoYW5nZXMuZHJhZ1JvdGF0ZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy50b3VjaFpvb21Sb3RhdGUgJiYgIWNoYW5nZXMudG91Y2hab29tUm90YXRlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShjaGFuZ2VzLnRvdWNoWm9vbVJvdGF0ZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kb3VibGVDbGlja1pvb20gJiYgIWNoYW5nZXMuZG91YmxlQ2xpY2tab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURvdWJsZUNsaWNrWm9vbShjaGFuZ2VzLmRvdWJsZUNsaWNrWm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5rZXlib2FyZCAmJiAhY2hhbmdlcy5rZXlib2FyZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVLZXlib2FyZChjaGFuZ2VzLmtleWJvYXJkLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRyYWdQYW4gJiYgIWNoYW5nZXMuZHJhZ1Bhbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKGNoYW5nZXMuZHJhZ1Bhbi5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5ib3hab29tICYmICFjaGFuZ2VzLmJveFpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlQm94Wm9vbShjaGFuZ2VzLmJveFpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc3R5bGUgJiYgIWNoYW5nZXMuc3R5bGUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlU3R5bGUoY2hhbmdlcy5zdHlsZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXhCb3VuZHMgJiYgIWNoYW5nZXMubWF4Qm91bmRzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZU1heEJvdW5kcyhjaGFuZ2VzLm1heEJvdW5kcy5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5maXRCb3VuZHMgJiYgIWNoYW5nZXMuZml0Qm91bmRzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmZpdEJvdW5kcyhjaGFuZ2VzLmZpdEJvdW5kcy5jdXJyZW50VmFsdWUsIHRoaXMuZml0Qm91bmRzT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuY2VudGVyV2l0aFBhblRvICYmXG4gICAgICBjaGFuZ2VzLmNlbnRlciAmJiAhY2hhbmdlcy5jZW50ZXIuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICAhY2hhbmdlcy56b29tICYmICFjaGFuZ2VzLmJlYXJpbmcgJiYgIWNoYW5nZXMucGl0Y2hcbiAgICApIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5wYW5Ubyh0aGlzLmNlbnRlciEsIHRoaXMucGFuVG9PcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgY2hhbmdlcy5jZW50ZXIgJiYgIWNoYW5nZXMuY2VudGVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy56b29tICYmICFjaGFuZ2VzLnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmJlYXJpbmcgJiYgIWNoYW5nZXMuYmVhcmluZy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMucGl0Y2ggJiYgIWNoYW5nZXMucGl0Y2guaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UubW92ZShcbiAgICAgICAgdGhpcy5tb3ZpbmdNZXRob2QsXG4gICAgICAgIHRoaXMubW92aW5nT3B0aW9ucyxcbiAgICAgICAgY2hhbmdlcy56b29tICYmIHRoaXMuem9vbSA/IHRoaXMuem9vbVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5jZW50ZXIgPyB0aGlzLmNlbnRlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5iZWFyaW5nICYmIHRoaXMuYmVhcmluZyA/IHRoaXMuYmVhcmluZ1swXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5waXRjaCAmJiB0aGlzLnBpdGNoID8gdGhpcy5waXRjaFswXSA6IHVuZGVmaW5lZFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgc3VwZXJjbHVzdGVyLCB7IENsdXN0ZXIsIE9wdGlvbnMgYXMgU3VwZXJjbHVzdGVyT3B0aW9ucywgU3VwZXJjbHVzdGVyIH0gZnJvbSAnc3VwZXJjbHVzdGVyJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttZ2xQb2ludF0nIH0pXG5leHBvcnQgY2xhc3MgUG9pbnREaXJlY3RpdmUgeyB9XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbENsdXN0ZXJQb2ludF0nIH0pXG5leHBvcnQgY2xhc3MgQ2x1c3RlclBvaW50RGlyZWN0aXZlIHsgfVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFya2VyLWNsdXN0ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZlYXR1cmUgb2YgY2x1c3RlclBvaW50c1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyOyBlbHNlIHBvaW50XCI+XG4gICAgICAgIDxtZ2wtbWFya2VyXG4gICAgICAgICAgW2ZlYXR1cmVdPVwiZmVhdHVyZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2x1c3RlclBvaW50VHBsOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAkaW1wbGljaXQ6IGZlYXR1cmUsXG4gICAgICAgICAgICBnZXRMZWF2ZXNGbjogZ2V0TGVhdmVzRm4oZmVhdHVyZSksXG4gICAgICAgICAgICBnZXRDaGlsZHJlbkZuOiBnZXRDaGlsZHJlbkZuKGZlYXR1cmUpLFxuICAgICAgICAgICAgZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbjogZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbihmZWF0dXJlKVxuICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZ2wtbWFya2VyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI3BvaW50PlxuICAgICAgICA8bWdsLW1hcmtlclxuICAgICAgICAgIFtmZWF0dXJlXT1cImZlYXR1cmVcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBvaW50VHBsOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogZmVhdHVyZSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWdsLW1hcmtlcj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDbHVzdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgcmFkaXVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXhab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtaW5ab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBleHRlbnQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG5vZGVTaXplPzogbnVtYmVyO1xuICBASW5wdXQoKSBsb2c/OiBib29sZWFuO1xuICBASW5wdXQoKSByZWR1Y2U/OiAoYWNjdW11bGF0ZWQ6IGFueSwgcHJvcHM6IGFueSkgPT4gdm9pZDtcbiAgQElucHV0KCkgaW5pdGlhbD86ICgpID0+IGFueTtcbiAgQElucHV0KCkgbWFwPzogKHByb3BzOiBhbnkpID0+IGFueTtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIEBJbnB1dCgpIGRhdGE6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5Qb2ludD47XG5cbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPFN1cGVyY2x1c3Rlcj4oKTtcblxuICBAQ29udGVudENoaWxkKFBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIHBvaW50VHBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKENsdXN0ZXJQb2ludERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KSBjbHVzdGVyUG9pbnRUcGw6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY2x1c3RlclBvaW50czogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+W107XG5cbiAgcHJpdmF0ZSBzdXBlcmNsdXN0ZXI6IFN1cGVyY2x1c3RlcjtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgQ2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3Qgb3B0aW9uczogU3VwZXJjbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgIHJhZGl1czogdGhpcy5yYWRpdXMsXG4gICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXG4gICAgICBtaW5ab29tOiB0aGlzLm1pblpvb20sXG4gICAgICBleHRlbnQ6IHRoaXMuZXh0ZW50LFxuICAgICAgbm9kZVNpemU6IHRoaXMubm9kZVNpemUsXG4gICAgICBsb2c6IHRoaXMubG9nLFxuICAgICAgcmVkdWNlOiB0aGlzLnJlZHVjZSxcbiAgICAgIGluaXRpYWw6IHRoaXMuaW5pdGlhbCxcbiAgICAgIG1hcDogdGhpcy5tYXBcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiBTdXBlcmNsdXN0ZXJPcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLnN1cGVyY2x1c3RlciA9IHN1cGVyY2x1c3RlcihvcHRpb25zKTtcbiAgICB0aGlzLnN1cGVyY2x1c3Rlci5sb2FkKHRoaXMuZGF0YS5mZWF0dXJlcyk7XG4gICAgdGhpcy5sb2FkLmVtaXQodGhpcy5zdXBlcmNsdXN0ZXIpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuc3VwZXJjbHVzdGVyLmxvYWQodGhpcy5kYXRhLmZlYXR1cmVzKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBtYXBNb3ZlJCA9IG1lcmdlKFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnem9vbUNoYW5nZScpLFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW92ZScpXG4gICAgICApO1xuICAgICAgY29uc3Qgc3ViID0gbWFwTW92ZSQucGlwZShcbiAgICAgICAgc3RhcnRXaXRoPGFueT4odW5kZWZpbmVkKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNsdXN0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGdldExlYXZlc0ZuID0gKGZlYXR1cmU6IENsdXN0ZXIpID0+IHtcbiAgICByZXR1cm4gKGxpbWl0PzogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldExlYXZlcykoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhLCBsaW1pdCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGdldENoaWxkcmVuRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAoKSA9PiAoPGFueT50aGlzLnN1cGVyY2x1c3Rlci5nZXRDaGlsZHJlbikoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhKTtcbiAgfVxuXG4gIGdldENsdXN0ZXJFeHBhbnNpb25ab29tRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAoKSA9PiAoPGFueT50aGlzLnN1cGVyY2x1c3Rlci5nZXRDbHVzdGVyRXhwYW5zaW9uWm9vbSkoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ2x1c3RlcigpIHtcbiAgICBjb25zdCBiYm94ID0gdGhpcy5NYXBTZXJ2aWNlLmdldEN1cnJlbnRWaWV3cG9ydEJib3goKTtcbiAgICBjb25zdCBjdXJyZW50Wm9vbSA9IE1hdGgucm91bmQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFpvb20oKSk7XG4gICAgdGhpcy5jbHVzdGVyUG9pbnRzID0gdGhpcy5zdXBlcmNsdXN0ZXIuZ2V0Q2x1c3RlcnMoYmJveCwgY3VycmVudFpvb20pO1xuICAgIHRoaXMuQ2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9pbnRMaWtlLCBQb3B1cCwgTG5nTGF0TGlrZSB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4uL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXBvcHVwJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuICAvKiBJbml0IGlucHV0ICovXG4gIEBJbnB1dCgpIGNsb3NlQnV0dG9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xvc2VPbkNsaWNrPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYW5jaG9yPzogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnO1xuICBASW5wdXQoKSBvZmZzZXQ/OiBudW1iZXIgfCBQb2ludExpa2UgfCB7IFthbmNob3I6IHN0cmluZ106IFtudW1iZXIsIG51bWJlcl0gfTtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIEBJbnB1dCgpIGZlYXR1cmU/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD47XG4gIEBJbnB1dCgpIGxuZ0xhdD86IExuZ0xhdExpa2U7XG4gIEBJbnB1dCgpIG1hcmtlcj86IE1hcmtlckNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIHBvcHVwSW5zdGFuY2U/OiBQb3B1cDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5sbmdMYXQgJiYgdGhpcy5tYXJrZXIgfHwgdGhpcy5mZWF0dXJlICYmIHRoaXMubG5nTGF0IHx8IHRoaXMuZmVhdHVyZSAmJiB0aGlzLm1hcmtlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXJrZXIsIGxuZ0xhdCwgZmVhdHVyZSBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXMubG5nTGF0ICYmICFjaGFuZ2VzLmxuZ0xhdC5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuZmVhdHVyZSAmJiAhY2hhbmdlcy5mZWF0dXJlLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgY29uc3QgbmV3bG5nTGF0ID0gY2hhbmdlcy5sbmdMYXQgPyB0aGlzLmxuZ0xhdCEgOiB0aGlzLmZlYXR1cmUhLmdlb21ldHJ5IS5jb29yZGluYXRlcyE7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFwKHRoaXMucG9wdXBJbnN0YW5jZSEsIHRydWUpO1xuICAgICAgY29uc3QgcG9wdXBJbnN0YW5jZVRtcCA9IHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKHBvcHVwSW5zdGFuY2VUbXAsIG5ld2xuZ0xhdCwgdGhpcy5wb3B1cEluc3RhbmNlIS5pc09wZW4oKSk7XG4gICAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSBwb3B1cEluc3RhbmNlVG1wO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXJrZXIgJiYgIWNoYW5nZXMubWFya2VyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgY29uc3QgcHJldmlvdXNNYXJrZXI6IE1hcmtlckNvbXBvbmVudCA9IGNoYW5nZXMubWFya2VyLnByZXZpb3VzVmFsdWU7XG4gICAgICBpZiAocHJldmlvdXNNYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcihwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UgJiYgdGhpcy5wb3B1cEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlLCB0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgdGhpcy5hZGRQb3B1cCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucG9wdXBJbnN0YW5jZSkge1xuICAgICAgaWYgKHRoaXMubG5nTGF0KSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUG9wdXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuTWFwU2VydmljZS5jcmVhdGVQb3B1cCh7XG4gICAgICBwb3B1cE9wdGlvbnM6IHtcbiAgICAgICAgY2xvc2VCdXR0b246IHRoaXMuY2xvc2VCdXR0b24sXG4gICAgICAgIGNsb3NlT25DbGljazogdGhpcy5jbG9zZU9uQ2xpY2ssXG4gICAgICAgIGFuY2hvcjogdGhpcy5hbmNob3IsXG4gICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXRcbiAgICAgIH0sXG4gICAgICBwb3B1cEV2ZW50czoge1xuICAgICAgICBvcGVuOiB0aGlzLm9wZW4sXG4gICAgICAgIGNsb3NlOiB0aGlzLmNsb3NlXG4gICAgICB9XG4gICAgfSwgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQb3B1cChwb3B1cDogUG9wdXApIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmxuZ0xhdCB8fCB0aGlzLmZlYXR1cmUpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXAocG9wdXAsIHRoaXMubG5nTGF0ID8gdGhpcy5sbmdMYXQgOiB0aGlzLmZlYXR1cmUhLmdlb21ldHJ5IS5jb29yZGluYXRlcyEpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSwgcG9wdXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2wtcG9wdXAgbmVlZCBlaXRoZXIgbG5nTGF0L21hcmtlci9mZWF0dXJlIHRvIGJlIHNldCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FudmFzU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1jYW52YXMtc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYW52YXNTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBDYW52YXNTb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBjb29yZGluYXRlczogbnVtYmVyW11bXTtcbiAgQElucHV0KCkgY2FudmFzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFuaW1hdGU/OiBib29sZWFuO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmNvb3JkaW5hdGVzICYmICFjaGFuZ2VzLmNvb3JkaW5hdGVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jYW52YXMgJiYgIWNoYW5nZXMuY2FudmFzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5hbmltYXRlICYmICFjaGFuZ2VzLmFuaW1hdGUuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgY29uc3Qgc291cmNlID0ge1xuICAgICAgdHlwZTogJ2NhbnZhcycsXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlcyxcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbmltYXRlOiB0aGlzLmFuaW1hdGUsXG4gICAgfTtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHNvdXJjZSk7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZVNvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2Utc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZVNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEltYWdlU291cmNlT3B0aW9ucyB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvb3JkaW5hdGVzOiBudW1iZXJbXVtdO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNvb3JkaW5hdGVzICYmICFjaGFuZ2VzLmNvb3JkaW5hdGVzLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlc1xuICAgIH0pO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFzdGVyU291cmNlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXJhc3Rlci1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFJhc3RlclNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFJhc3RlclNvdXJjZSB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpbGVzPzogc3RyaW5nW107XG4gIEBJbnB1dCgpIGJvdW5kcz86IG51bWJlcltdO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSB0aWxlU2l6ZT86IG51bWJlcjtcblxuICB0eXBlOiAncmFzdGVyJyA9ICdyYXN0ZXInOyAvLyBKdXN0IHRvIG1ha2UgdHMgaGFwcHlcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy51cmwgJiYgIWNoYW5nZXMudXJsLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50aWxlcyAmJiAhY2hhbmdlcy50aWxlcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuYm91bmRzICYmICFjaGFuZ2VzLmJvdW5kcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5tYXh6b29tICYmICFjaGFuZ2VzLm1heHpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRpbGVTaXplICYmICFjaGFuZ2VzLnRpbGVTaXplLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICB0aWxlczogdGhpcy50aWxlcyxcbiAgICAgIGJvdW5kczogdGhpcy5ib3VuZHMsXG4gICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20sXG4gICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICB0aWxlU2l6ZTogdGhpcy50aWxlU2l6ZVxuICAgIH07XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmVjdG9yU291cmNlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXZlY3Rvci1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFZlY3RvclNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFZlY3RvclNvdXJjZSB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsPzogc3RyaW5nO1xuICBASW5wdXQoKSB0aWxlcz86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuXG4gIHR5cGU6ICd2ZWN0b3InID0gJ3ZlY3Rvcic7IC8vIEp1c3QgdG8gbWFrZSB0cyBoYXBweVxuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRpbGVzICYmICFjaGFuZ2VzLnRpbGVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICB0aWxlczogdGhpcy50aWxlcyxcbiAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICB9KTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZGVvU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC12aWRlby1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgVmlkZW9Tb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1cmxzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgY29vcmRpbmF0ZXM6IG51bWJlcltdW107XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICBjb25zdCBzdWIgPSBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnc3R5bGVkYXRhJykucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0U291cmNlKHRoaXMuaWQpKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMudXJscyAmJiAhY2hhbmdlcy51cmxzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jb29yZGluYXRlcyAmJiAhY2hhbmdlcy5jb29yZGluYXRlcy5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICB1cmxzOiB0aGlzLnVybHMsXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlc1xuICAgIH0pO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9hdHRyaWJ1dGlvbi1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2Z1bGxzY3JlZW4tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLCBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSB9IGZyb20gJy4vY29udHJvbC9nZW9jb2Rlci1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2dlb2xvY2F0ZS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9uYXZpZ2F0aW9uLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjYWxlQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9zY2FsZS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZS9pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuL2xheWVyL2xheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBDb21wb25lbnQgfSBmcm9tICcuL21hcC9tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IE1BUEJPWF9BUElfS0VZIH0gZnJvbSAnLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2x1c3RlclBvaW50RGlyZWN0aXZlLCBNYXJrZXJDbHVzdGVyQ29tcG9uZW50LCBQb2ludERpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2VyLWNsdXN0ZXIvbWFya2VyLWNsdXN0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL3BvcHVwL3BvcHVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW52YXNTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9jYW52YXMtc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFJhc3RlclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3Jhc3Rlci1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZlY3RvclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZlY3Rvci1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZGVvU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvdmlkZW8tc291cmNlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJTb3VyY2VDb21wb25lbnQsXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXG4gICAgQ2FudmFzU291cmNlQ29tcG9uZW50LFxuICAgIEZlYXR1cmVDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFBvcHVwQ29tcG9uZW50LFxuICAgIENvbnRyb2xDb21wb25lbnQsXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2VyQ2x1c3RlckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJTb3VyY2VDb21wb25lbnQsXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXG4gICAgQ2FudmFzU291cmNlQ29tcG9uZW50LFxuICAgIEZlYXR1cmVDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFBvcHVwQ29tcG9uZW50LFxuICAgIENvbnRyb2xDb21wb25lbnQsXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2VyQ2x1c3RlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hcGJveEdMTW9kdWxlIHtcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiB7IGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGdlb2NvZGVyQWNjZXNzVG9rZW4/OiBzdHJpbmcgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWFwYm94R0xNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9BUElfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuYWNjZXNzVG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuZ2VvY29kZXJBY2Nlc3NUb2tlbiB8fCBjb25maWcuYWNjZXNzVG9rZW5cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWFwYm94R2wuTWFya2VyIiwiTWFwYm94R2wuUG9wdXAiLCJmaWx0ZXIiLCJNYXBib3hHbC5NYXAiLCJNYXBTZXJ2aWNlIiwiQ29udHJvbENvbXBvbmVudCIsIkdlb0pTT05Tb3VyY2VDb21wb25lbnQiLCJOZ1pvbmUiLCJGZWF0dXJlQ29tcG9uZW50IiwiTWFya2VyQ29tcG9uZW50IiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJiYm94Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsTUFBYSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7QUFFakU7Q0FFQzs7Ozs7OztJQXVFQyxZQUNVLE1BQzZDLGNBQXNCLEVBQzlDLHFCQUE0QztRQUZqRSxTQUFJLEdBQUosSUFBSTtRQUN5QyxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUM5QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCOzBCQVp0RCxJQUFJLFlBQVksRUFBUTt5QkFDekIsSUFBSSxZQUFZLEVBQVE7Z0NBQ1AsRUFBRTtpQ0FDRCxFQUFFOytCQUNLLEVBQUU7OEJBQ0osRUFBRTtnQ0FDUixFQUFFOzRCQUNoQixJQUFJLFlBQVksRUFBRTtRQU92QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ2pEOzs7OztJQUVELEtBQUssQ0FBQyxPQUFpQjs7UUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDOztZQUV6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakYsSUFBSSxPQUFPLENBQUMsa0JBQWtCLEVBQUU7Z0JBQzlCLElB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SSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoSDtRQUNELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQTJCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUEyQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVHO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBMkIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsSDtRQUNELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQTJCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMs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Q0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xIO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBdUIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRztRQUNELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQXVCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUc7UUFDRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUE2QixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVIO1FBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBNkIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4SDtRQUNELElBQUksTUFBTSxDQUFDLGFB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