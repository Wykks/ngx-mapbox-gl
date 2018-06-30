import { __awaiter } from 'tslib';
import { Inject, Injectable, InjectionToken, NgZone, Optional, ChangeDetectionStrategy, Component, Input, ViewChild, Directive, Host, EventEmitter, Output, ViewEncapsulation, forwardRef, ChangeDetectorRef, ContentChild, TemplateRef, NgModule } from '@angular/core';
import bbox from '@turf/bbox';
import { polygon } from '@turf/helpers';
import * as MapboxGl from 'mapbox-gl';
import { AttributionControl, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Marker, Popup, Map } from 'mapbox-gl';
import { AsyncSubject, Subscription, Subject, fromEvent, ReplaySubject, merge } from 'rxjs';
import { first, debounceTime, filter, switchMap, take, takeUntil, tap, startWith } from 'rxjs/operators';
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
     * @param {?=} before
     * @return {?}
     */
    addLayer(layer, before) {
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
        return this.zone.runOutsideAngular(() => {
            marker.addTo(this.mapInstance);
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
     * @return {?}
     */
    addPopupToMap(popup, lngLat) {
        return this.zone.runOutsideAngular(() => {
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
     * @return {?}
     */
    removePopupFromMap(popup) {
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
        const w = canvas.width;
        /** @type {?} */
        const h = canvas.height;
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
    { type: Injectable },
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
            },] },
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
            },] },
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
            },] },
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
            },] },
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
            },] },
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
            this.ControlComponent.control = new NavigationControl();
            this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
        });
    }
}
NavigationControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglNavigation]'
            },] },
];
/** @nocollapse */
NavigationControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: ControlComponent, decorators: [{ type: Host }] }
];

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
            },] },
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
            this.MapService.addLayer({
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
            }, this.before);
            this.layerAdded = true;
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
    }
}
LayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-layer',
                template: ''
            },] },
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
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.markerInstance = new Marker(/** @type {?} */ ({ offset: this.offset, element: this.content.nativeElement, anchor: this.anchor }));
        this.markerInstance.setLngLat(this.feature ? /** @type {?} */ ((this.feature.geometry)).coordinates : /** @type {?} */ ((this.lngLat)));
        this.MapService.mapCreated$.subscribe(() => {
            this.MapService.addMarker(/** @type {?} */ ((this.markerInstance)));
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
                styles: [`
    .mapboxgl-marker {
      line-height: 0;
    }
  `],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
            this.sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
                /** @type {?} */
                const source = this.MapService.getSource(this.id);
                source.setData(/** @type {?} */ ((this.data)));
            });
            this.sourceAdded = true;
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
        if (this.sourceAdded) {
            this.sub.unsubscribe();
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
}
GeoJSONSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-geojson-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
            },] },
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
                if (!inside) {
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
            },] },
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
            },] },
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
                styles: [`
  :host {
    display: block;
  }
  div {
    height: 100%;
    width: 100%;
  }
  `],
                providers: [
                    MapService
                ],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
    { type: Directive, args: [{ selector: 'ng-template[mglPoint]' },] },
];
class ClusterPointDirective {
}
ClusterPointDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[mglClusterPoint]' },] },
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
            },] },
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
        if (this.lngLat && this.marker) {
            throw new Error('marker and lngLat input are mutually exclusive');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange()) {
            this.MapService.removePopupFromMap(/** @type {?} */ ((this.popupInstance)));
            /** @type {?} */
            const popupInstanceTmp = this.createPopup();
            this.MapService.addPopupToMap(popupInstanceTmp, changes["lngLat"].currentValue);
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
            if (this.lngLat) {
                this.MapService.addPopupToMap(popup, this.lngLat);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.MapService.addPopupToMarker(this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat or marker to be set');
            }
        });
    }
}
PopupComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-popup',
                template: '<div #content><ng-content></ng-content></div>',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            /** @type {?} */
            const source = {
                type: 'canvas',
                coordinates: this.coordinates,
                canvas: this.canvas,
                animate: this.animate,
            };
            this.MapService.addSource(this.id, source);
            this.sourceAdded = true;
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
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
}
CanvasSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-canvas-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.MapService.addSource(this.id, {
                type: 'image',
                url: this.url,
                coordinates: this.coordinates
            });
            this.sourceAdded = true;
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
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
}
ImageSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-image-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
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
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
}
RasterSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-raster-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.MapService.addSource(this.id, {
                type: this.type,
                url: this.url,
                tiles: this.tiles,
                minzoom: this.minzoom,
                maxzoom: this.maxzoom,
            });
            this.sourceAdded = true;
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
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
}
VectorSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-vector-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.MapService.addSource(this.id, {
                type: 'video',
                urls: this.urls,
                coordinates: this.coordinates
            });
            this.sourceAdded = true;
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
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
}
VideoSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-video-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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
            },] },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFwL21hcC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2F0dHJpYnV0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2Z1bGxzY3JlZW4tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL25hdmlnYXRpb24tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvc2NhbGUtY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2xheWVyL2xheWVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS9nZW9qc29uL2dlb2pzb24tc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9pbWFnZS9pbWFnZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL21hcC9tYXAuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9tYXJrZXItY2x1c3Rlci9tYXJrZXItY2x1c3Rlci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3BvcHVwL3BvcHVwLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL2NhbnZhcy1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvaW1hZ2Utc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL3Jhc3Rlci1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvdmVjdG9yLXNvdXJjZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS92aWRlby1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9uZ3gtbWFwYm94LWdsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuaW1wb3J0IHsgcG9seWdvbiB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuaW1wb3J0ICogYXMgTWFwYm94R2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJCb3ggfSBmcm9tICdzdXBlcmNsdXN0ZXInO1xuaW1wb3J0IHsgTWFwRXZlbnQsIE1hcEltYWdlRGF0YSwgTWFwSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi9tYXAudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWdsUmVzaXplRXZlbnRFbWl0dGVyIHtcbiAgYWJzdHJhY3QgcmVzaXplRXZlbnQ6IE9ic2VydmFibGU8dm9pZD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBNYXAge1xuICBhY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgY3VzdG9tTWFwYm94QXBpVXJsPzogc3RyaW5nO1xuICBtYXBPcHRpb25zOiBhbnk7IC8vIE1hcGJveEdsLk1hcGJveE9wdGlvbnNcbiAgbWFwRXZlbnRzOiBNYXBFdmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cExheWVyIHtcbiAgbGF5ZXJPcHRpb25zOiBNYXBib3hHbC5MYXllcjtcbiAgbGF5ZXJFdmVudHM6IHtcbiAgICBjbGljazogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICAgIG1vdXNlRW50ZXI6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgICBtb3VzZUxlYXZlOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gICAgbW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBQb3B1cCB7XG4gIHBvcHVwT3B0aW9uczogTWFwYm94R2wuUG9wdXBPcHRpb25zO1xuICBwb3B1cEV2ZW50czoge1xuICAgIG9wZW46IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICBjbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBBbGxTb3VyY2UgPSBNYXBib3hHbC5WZWN0b3JTb3VyY2UgfFxuICBNYXBib3hHbC5SYXN0ZXJTb3VyY2UgfFxuICBNYXBib3hHbC5HZW9KU09OU291cmNlIHxcbiAgTWFwYm94R2wuSW1hZ2VTb3VyY2VPcHRpb25zIHxcbiAgTWFwYm94R2wuVmlkZW9Tb3VyY2UgfFxuICBNYXBib3hHbC5HZW9KU09OU291cmNlUmF3IHxcbiAgTWFwYm94R2wuQ2FudmFzU291cmNlT3B0aW9ucztcblxuZXhwb3J0IHR5cGUgTW92aW5nT3B0aW9ucyA9IE1hcGJveEdsLkZseVRvT3B0aW9ucyB8XG4gIChNYXBib3hHbC5BbmltYXRpb25PcHRpb25zICYgTWFwYm94R2wuQ2FtZXJhT3B0aW9ucykgfFxuICBNYXBib3hHbC5DYW1lcmFPcHRpb25zO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwU2VydmljZSB7XG4gIG1hcEluc3RhbmNlOiBNYXBib3hHbC5NYXA7XG4gIG1hcENyZWF0ZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBtYXBMb2FkZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBtYXBFdmVudHM6IE1hcEV2ZW50O1xuXG4gIHByaXZhdGUgbWFwQ3JlYXRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBtYXBMb2FkZWQgPSBuZXcgQXN5bmNTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgbGF5ZXJJZHNUb1JlbW92ZTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBzb3VyY2VJZHNUb1JlbW92ZTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBtYXJrZXJzVG9SZW1vdmU6IE1hcGJveEdsLk1hcmtlcltdID0gW107XG4gIHByaXZhdGUgcG9wdXBzVG9SZW1vdmU6IE1hcGJveEdsLlBvcHVwW10gPSBbXTtcbiAgcHJpdmF0ZSBpbWFnZUlkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BUEJPWF9BUElfS0VZKSBwcml2YXRlIHJlYWRvbmx5IE1BUEJPWF9BUElfS0VZOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBNZ2xSZXNpemVFdmVudEVtaXR0ZXI6IE1nbFJlc2l6ZUV2ZW50RW1pdHRlclxuICApIHtcbiAgICB0aGlzLm1hcENyZWF0ZWQkID0gdGhpcy5tYXBDcmVhdGVkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubWFwTG9hZGVkJCA9IHRoaXMubWFwTG9hZGVkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgc2V0dXAob3B0aW9uczogU2V0dXBNYXApIHtcbiAgICAvLyBOZWVkIG9uU3RhYmxlIHRvIHdhaXQgZm9yIGEgcG90ZW50aWFsIEBhbmd1bGFyL3JvdXRlIHRyYW5zaXRpb24gdG8gZW5kXG4gICAgdGhpcy56b25lLm9uU3RhYmxlLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIFdvcmthcm91bmQgcm9sbHVwIGlzc3VlXG4gICAgICB0aGlzLmFzc2lnbihNYXBib3hHbCwgJ2FjY2Vzc1Rva2VuJywgb3B0aW9ucy5hY2Nlc3NUb2tlbiB8fCB0aGlzLk1BUEJPWF9BUElfS0VZKTtcbiAgICAgIGlmIChvcHRpb25zLmN1c3RvbU1hcGJveEFwaVVybCkge1xuICAgICAgICB0aGlzLmFzc2lnbihNYXBib3hHbCwgJ2NvbmZpZy5BUElfVVJMJywgb3B0aW9ucy5jdXN0b21NYXBib3hBcGlVcmwpO1xuICAgICAgfVxuICAgICAgdGhpcy5jcmVhdGVNYXAob3B0aW9ucy5tYXBPcHRpb25zKTtcbiAgICAgIHRoaXMuaG9va0V2ZW50cyhvcHRpb25zLm1hcEV2ZW50cyk7XG4gICAgICB0aGlzLm1hcEV2ZW50cyA9IG9wdGlvbnMubWFwRXZlbnRzO1xuICAgICAgdGhpcy5tYXBDcmVhdGVkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMubWFwQ3JlYXRlZC5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveU1hcCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlKCk7XG4gIH1cblxuICB1cGRhdGVNaW5ab29tKG1pblpvb206IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNaW5ab29tKG1pblpvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4Wm9vbShtYXhab29tOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4Wm9vbShtYXhab29tKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVNjcm9sbFpvb20oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLnNjcm9sbFpvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLnNjcm9sbFpvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRHJhZ1JvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuZHJhZ1JvdGF0ZS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuZHJhZ1JvdGF0ZS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVUb3VjaFpvb21Sb3RhdGUoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLnRvdWNoWm9vbVJvdGF0ZS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURvdWJsZUNsaWNrWm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuZG91YmxlQ2xpY2tab29tLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlS2V5Ym9hcmQoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5rZXlib2FyZC5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEcmFnUGFuKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUGFuLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kcmFnUGFuLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUJveFpvb20oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmJveFpvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmJveFpvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3R5bGUoc3R5bGU6IE1hcGJveEdsLlN0eWxlKSB7XG4gICAgLy8gVE9ETyBQcm9iYWJseSBub3Qgc28gc2ltcGxlLCB3cml0ZSBkZW1vL3Rlc3RzXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFN0eWxlKHN0eWxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1heEJvdW5kcyhtYXhCb3VuZHM6IE1hcGJveEdsLkxuZ0xhdEJvdW5kc0xpa2UpIHtcbiAgICAvLyBUT0RPIFByb2JhYmx5IG5vdCBzbyBzaW1wbGUsIHdyaXRlIGRlbW8vdGVzdHNcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4Qm91bmRzKG1heEJvdW5kcyk7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VDYW52YXNDdXJzb3IoY3Vyc29yOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1hcEluc3RhbmNlLmdldENhbnZhc0NvbnRhaW5lcigpO1xuICAgIGNhbnZhcy5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7XG4gIH1cblxuICBxdWVyeVJlbmRlcmVkRmVhdHVyZXMoXG4gICAgcG9pbnRPckJveD86IE1hcGJveEdsLlBvaW50TGlrZSB8IE1hcGJveEdsLlBvaW50TGlrZVtdLFxuICAgIHBhcmFtZXRlcnM/OiB7IGxheWVycz86IHN0cmluZ1tdLCBmaWx0ZXI/OiBhbnlbXSB9XG4gICk6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PltdIHtcbiAgICByZXR1cm4gdGhpcy5tYXBJbnN0YW5jZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMocG9pbnRPckJveCwgcGFyYW1ldGVycyk7XG4gIH1cblxuICBwYW5UbyhjZW50ZXI6IE1hcGJveEdsLkxuZ0xhdExpa2UsIG9wdGlvbnM/OiBNYXBib3hHbC5BbmltYXRpb25PcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnBhblRvKGNlbnRlciwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlKFxuICAgIG1vdmluZ01ldGhvZDogJ2p1bXBUbycgfCAnZWFzZVRvJyB8ICdmbHlUbycsXG4gICAgbW92aW5nT3B0aW9ucz86IE1vdmluZ09wdGlvbnMsXG4gICAgem9vbT86IG51bWJlcixcbiAgICBjZW50ZXI/OiBNYXBib3hHbC5MbmdMYXRMaWtlLFxuICAgIGJlYXJpbmc/OiBudW1iZXIsXG4gICAgcGl0Y2g/OiBudW1iZXJcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAoPGFueT50aGlzLm1hcEluc3RhbmNlW21vdmluZ01ldGhvZF0pKHtcbiAgICAgICAgLi4ubW92aW5nT3B0aW9ucyxcbiAgICAgICAgem9vbTogem9vbSA/IHpvb20gOiB0aGlzLm1hcEluc3RhbmNlLmdldFpvb20oKSxcbiAgICAgICAgY2VudGVyOiBjZW50ZXIgPyBjZW50ZXIgOiB0aGlzLm1hcEluc3RhbmNlLmdldENlbnRlcigpLFxuICAgICAgICBiZWFyaW5nOiBiZWFyaW5nID8gYmVhcmluZyA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0QmVhcmluZygpLFxuICAgICAgICBwaXRjaDogcGl0Y2ggPyBwaXRjaCA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0UGl0Y2goKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRMYXllcihsYXllcjogU2V0dXBMYXllciwgYmVmb3JlPzogc3RyaW5nKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGxheWVyLmxheWVyT3B0aW9ucylcbiAgICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiBNYXBib3hHbC5MYXllcj5rZXk7XG4gICAgICAgICAgaWYgKGxheWVyLmxheWVyT3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWxldGUgbGF5ZXIubGF5ZXJPcHRpb25zW3RrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZExheWVyKGxheWVyLmxheWVyT3B0aW9ucywgYmVmb3JlKTtcbiAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5jbGljay5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5jbGljay5lbWl0KGV2dCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLm1vdXNlRW50ZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWVudGVyJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZUVudGVyLmVtaXQoZXZ0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubW91c2VMZWF2ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbGVhdmUnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTGVhdmUuZW1pdChldnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5tb3VzZU1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW1vdmUnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTGF5ZXIobGF5ZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5sYXllcklkc1RvUmVtb3ZlLnB1c2gobGF5ZXJJZCk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIG1hcmtlci5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHRoaXMubWFya2Vyc1RvUmVtb3ZlLnB1c2gobWFya2VyKTtcbiAgfVxuXG4gIGNyZWF0ZVBvcHVwKHBvcHVwOiBTZXR1cFBvcHVwLCBlbGVtZW50OiBOb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwb3B1cC5wb3B1cE9wdGlvbnMpXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgKDxhbnk+cG9wdXAucG9wdXBPcHRpb25zKVtrZXldID09PSB1bmRlZmluZWQgJiYgZGVsZXRlICg8YW55PnBvcHVwLnBvcHVwT3B0aW9ucylba2V5XSk7XG4gICAgICBjb25zdCBwb3B1cEluc3RhbmNlID0gbmV3IE1hcGJveEdsLlBvcHVwKHBvcHVwLnBvcHVwT3B0aW9ucyk7XG4gICAgICBwb3B1cEluc3RhbmNlLnNldERPTUNvbnRlbnQoZWxlbWVudCk7XG4gICAgICBpZiAocG9wdXAucG9wdXBFdmVudHMuY2xvc2Uub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb3B1cEluc3RhbmNlLm9uKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLmNsb3NlLmVtaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAocG9wdXAucG9wdXBFdmVudHMub3Blbi5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ29wZW4nLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5vcGVuLmVtaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9wdXBJbnN0YW5jZTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXAocG9wdXA6IE1hcGJveEdsLlBvcHVwLCBsbmdMYXQ6IE1hcGJveEdsLkxuZ0xhdExpa2UpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHBvcHVwLnNldExuZ0xhdChsbmdMYXQpO1xuICAgICAgcG9wdXAuYWRkVG8odGhpcy5tYXBJbnN0YW5jZSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQb3B1cFRvTWFya2VyKG1hcmtlcjogTWFwYm94R2wuTWFya2VyLCBwb3B1cDogTWFwYm94R2wuUG9wdXApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIG1hcmtlci5zZXRQb3B1cChwb3B1cCk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVQb3B1cEZyb21NYXAocG9wdXA6IE1hcGJveEdsLlBvcHVwKSB7XG4gICAgdGhpcy5wb3B1cHNUb1JlbW92ZS5wdXNoKHBvcHVwKTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRDb250cm9sKGNvbnRyb2w6IE1hcGJveEdsLkNvbnRyb2wgfCBNYXBib3hHbC5JQ29udHJvbCwgcG9zaXRpb24/OiAndG9wLXJpZ2h0JyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkQ29udHJvbCg8YW55PmNvbnRyb2wsIHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUNvbnRyb2woY29udHJvbDogTWFwYm94R2wuQ29udHJvbCB8IE1hcGJveEdsLklDb250cm9sKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUNvbnRyb2woPGFueT5jb250cm9sKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRBbmRBZGRJbWFnZShpbWFnZUlkOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLmxvYWRJbWFnZSh1cmwsIChlcnJvcjogeyBzdGF0dXM6IG51bWJlciB9IHwgbnVsbCwgaW1hZ2U6IEltYWdlRGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRJbWFnZShpbWFnZUlkLCBpbWFnZSwgb3B0aW9ucyk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSW1hZ2UoaW1hZ2VJZDogc3RyaW5nLCBkYXRhOiBNYXBJbWFnZURhdGEsIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkSW1hZ2UoaW1hZ2VJZCwgPGFueT5kYXRhLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUltYWdlKGltYWdlSWQ6IHN0cmluZykge1xuICAgIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZS5wdXNoKGltYWdlSWQpO1xuICB9XG5cbiAgYWRkU291cmNlKHNvdXJjZUlkOiBzdHJpbmcsIHNvdXJjZTogQWxsU291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhzb3VyY2UpXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgKDxhbnk+c291cmNlKVtrZXldID09PSB1bmRlZmluZWQgJiYgZGVsZXRlICg8YW55PnNvdXJjZSlba2V5XSk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZFNvdXJjZShzb3VyY2VJZCwgPGFueT5zb3VyY2UpOyAvLyBUeXBpbmdzIGlzc3VlXG4gICAgfSk7XG4gIH1cblxuICBnZXRTb3VyY2U8VD4oc291cmNlSWQ6IHN0cmluZykge1xuICAgIHJldHVybiA8VD48YW55PnRoaXMubWFwSW5zdGFuY2UuZ2V0U291cmNlKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHJlbW92ZVNvdXJjZShzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZS5wdXNoKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHNldEFsbExheWVyUGFpbnRQcm9wZXJ0eShcbiAgICBsYXllcklkOiBzdHJpbmcsXG4gICAgcGFpbnQ6IE1hcGJveEdsLkJhY2tncm91bmRQYWludCB8XG4gICAgICBNYXBib3hHbC5GaWxsUGFpbnQgfFxuICAgICAgTWFwYm94R2wuRmlsbEV4dHJ1c2lvblBhaW50IHxcbiAgICAgIE1hcGJveEdsLkxpbmVQYWludCB8XG4gICAgICBNYXBib3hHbC5TeW1ib2xQYWludCB8XG4gICAgICBNYXBib3hHbC5SYXN0ZXJQYWludCB8XG4gICAgICBNYXBib3hHbC5DaXJjbGVQYWludFxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBhaW50KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgcGVyZiwgc2V0UGFpbnRQcm9wZXJ0eSBvbmx5IG9uIGNoYW5nZWQgcGFpbnQgcHJvcHMgbWF5YmVcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRQYWludFByb3BlcnR5KGxheWVySWQsIGtleSwgKDxhbnk+cGFpbnQpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRBbGxMYXllckxheW91dFByb3BlcnR5KFxuICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICBsYXlvdXQ6IE1hcGJveEdsLkJhY2tncm91bmRMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuRmlsbExheW91dCB8XG4gICAgICBNYXBib3hHbC5GaWxsRXh0cnVzaW9uTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkxpbmVMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuU3ltYm9sTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLlJhc3RlckxheW91dCB8XG4gICAgICBNYXBib3hHbC5DaXJjbGVMYXlvdXRcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhsYXlvdXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldExheW91dFByb3BlcnR5KGxheWVySWQsIGtleSwgKDxhbnk+bGF5b3V0KVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJGaWx0ZXIobGF5ZXJJZDogc3RyaW5nLCBmaWx0ZXI6IGFueVtdKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldEZpbHRlcihsYXllcklkLCBmaWx0ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJCZWZvcmUobGF5ZXJJZDogc3RyaW5nLCBiZWZvcmVJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm1vdmVMYXllcihsYXllcklkLCBiZWZvcmVJZCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllclpvb21SYW5nZShsYXllcklkOiBzdHJpbmcsIG1pblpvb20/OiBudW1iZXIsIG1heFpvb20/OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TGF5ZXJab29tUmFuZ2UobGF5ZXJJZCwgbWluWm9vbSA/IG1pblpvb20gOiAwLCBtYXhab29tID8gbWF4Wm9vbSA6IDIwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpdEJvdW5kcyhib3VuZHM6IE1hcGJveEdsLkxuZ0xhdEJvdW5kc0xpa2UsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuZml0Qm91bmRzKGJvdW5kcywgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50Vmlld3BvcnRCYm94KCk6IEJCb3gge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzKCk7XG4gICAgY29uc3QgdyA9IGNhbnZhcy53aWR0aDtcbiAgICBjb25zdCBoID0gY2FudmFzLmhlaWdodDtcbiAgICBjb25zdCB1cExlZnQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbMCwgMF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoW3csIDBdKS50b0FycmF5KCk7XG4gICAgY29uc3QgZG93blJpZ2h0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoW3csIGhdKS50b0FycmF5KCk7XG4gICAgY29uc3QgZG93bkxlZnQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbMCwgaF0pLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gPGFueT5iYm94KHBvbHlnb24oW1t1cExlZnQsIHVwUmlnaHQsIGRvd25SaWdodCwgZG93bkxlZnQsIHVwTGVmdF1dKSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKCk7XG4gICAgICB0aGlzLnJlbW92ZVNvdXJjZXMoKTtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VycygpO1xuICAgICAgdGhpcy5yZW1vdmVQb3B1cHMoKTtcbiAgICAgIHRoaXMucmVtb3ZlSW1hZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1hcChvcHRpb25zOiBNYXBib3hHbC5NYXBib3hPcHRpb25zKSB7XG4gICAgTmdab25lLmFzc2VydE5vdEluQW5ndWxhclpvbmUoKTtcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgTWFwYm94R2wuTWFwYm94T3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5NYXAob3B0aW9ucyk7XG4gICAgY29uc3Qgc3ViQ2hhbmdlcyA9IHRoaXMuem9uZS5vbk1pY3JvdGFza0VtcHR5XG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXBwbHlDaGFuZ2VzKCkpO1xuICAgIGlmICh0aGlzLk1nbFJlc2l6ZUV2ZW50RW1pdHRlcikge1xuICAgICAgY29uc3Qgc3ViUmVzaXplID0gdGhpcy5NZ2xSZXNpemVFdmVudEVtaXR0ZXIucmVzaXplRXZlbnQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZXNpemUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1YlJlc2l6ZSk7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChzdWJDaGFuZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJzKCkge1xuICAgIGZvciAoY29uc3QgbGF5ZXJJZCBvZiB0aGlzLmxheWVySWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdjbGljaycsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ21vdXNlZW50ZXInLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdtb3VzZWxlYXZlJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignbW91c2Vtb3ZlJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUxheWVyKGxheWVySWQpO1xuICAgIH1cbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlcygpIHtcbiAgICBmb3IgKGNvbnN0IHNvdXJjZUlkIG9mIHRoaXMuc291cmNlSWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlU291cmNlKHNvdXJjZUlkKTtcbiAgICB9XG4gICAgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVNYXJrZXJzKCkge1xuICAgIGZvciAoY29uc3QgbWFya2VyIG9mIHRoaXMubWFya2Vyc1RvUmVtb3ZlKSB7XG4gICAgICBtYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMubWFya2Vyc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVBvcHVwcygpIHtcbiAgICBmb3IgKGNvbnN0IHBvcHVwIG9mIHRoaXMucG9wdXBzVG9SZW1vdmUpIHtcbiAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLnBvcHVwc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUltYWdlcygpIHtcbiAgICBmb3IgKGNvbnN0IGltYWdlSWQgb2YgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUltYWdlKGltYWdlSWQpO1xuICAgIH1cbiAgICB0aGlzLmltYWdlSWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgaG9va0V2ZW50cyhldmVudHM6IE1hcEV2ZW50KSB7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbG9hZCcsICgpID0+IHtcbiAgICAgIHRoaXMubWFwTG9hZGVkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMubWFwTG9hZGVkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5sb2FkLmVtaXQodGhpcy5tYXBJbnN0YW5jZSkpO1xuICAgIH0pO1xuICAgIGlmIChldmVudHMucmVzaXplLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3Jlc2l6ZScsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlc2l6ZS5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZW1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVtb3ZlJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVtb3ZlLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlRG93bi5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWRvd24nLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZURvd24uZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VVcC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZXVwJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VVcC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vtb3ZlJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY2xpY2suZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGJsQ2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGJsY2xpY2snLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYmxDbGljay5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZUVudGVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZW50ZXInLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZUVudGVyLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlTGVhdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlTGVhdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VPdmVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3ZlcicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlT3Zlci5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU91dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW91dCcsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlT3V0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNvbnRleHRNZW51Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NvbnRleHRtZW51JywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY29udGV4dE1lbnUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaHN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaEVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaG1vdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaE1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hDYW5jZWwub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hjYW5jZWwnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaENhbmNlbC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53aGVlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAvLyBNYXBib3hHbC5NYXBXaGVlbEV2ZW50XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3aGVlbCcsIChldnQ6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2hlZWwuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdmVzdGFydCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmVFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZWVuZCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZHJhZ3N0YXJ0JywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZ0VuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnZW5kJywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21TdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMuem9vbVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FdnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy56b29tRXZ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy56b29tRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZXN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnJvdGF0ZVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucm90YXRlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGVlbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMucm90YXRlRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hzdGFydCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaEV2dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hFdnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hlbmQnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21TdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21TdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21lbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21FbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbUNhbmNlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tY2FuY2VsJywgKGV2dDogTWFwYm94R2wuTWFwQm94Wm9vbUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tQ2FuY2VsLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dExvc3Qub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0bG9zdCcsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dExvc3QuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMud2ViR2xDb250ZXh0UmVzdG9yZWQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0cmVzdG9yZWQnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53ZWJHbENvbnRleHRSZXN0b3JlZC5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZW5kZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVuZGVyJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVuZGVyLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmVycm9yLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2Vycm9yJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZXJyb3IuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYXRhLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWRhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnN0eWxlRGF0YS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zb3VyY2VEYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnNvdXJjZURhdGEuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGF0YWxvYWRpbmcnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRhdGFMb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhTG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zb3VyY2VEYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzb3VyY2VkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YUxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBtb3ZlIHRoaXMgZWxzZXdoZXJlXG4gIHByaXZhdGUgYXNzaWduKG9iajogYW55LCBwcm9wOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgcHJvcCA9IHByb3Auc3BsaXQoJy4nKTtcbiAgICB9XG4gICAgaWYgKHByb3AubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgZSA9IHByb3Auc2hpZnQoKTtcbiAgICAgIHRoaXMuYXNzaWduKG9ialtlXSA9XG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbZV0pID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAgID8gb2JqW2VdXG4gICAgICAgICAgOiB7fSxcbiAgICAgICAgcHJvcCxcbiAgICAgICAgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbcHJvcFswXV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2wsIElDb250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbnRyb2wgaW1wbGVtZW50cyBJQ29udHJvbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudFxuICApIHtcbiAgfVxuXG4gIG9uQWRkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lcjtcbiAgfVxuXG4gIG9uUmVtb3ZlKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBnZXREZWZhdWx0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuICd0b3AtcmlnaHQnO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1jb250cm9sJyxcbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwibWFwYm94Z2wtY3RybFwiICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgcG9zaXRpb24/OiAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCc7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29udHJvbDogQ29udHJvbCB8IElDb250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY29udHJvbCA9IG5ldyBDdXN0b21Db250cm9sKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLmNvbnRyb2whLCB0aGlzLnBvc2l0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVDb250cm9sKHRoaXMuY29udHJvbCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsQXR0cmlidXRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBjb21wYWN0PzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zOiB7IGNvbXBhY3Q/OiBib29sZWFuIH0gPSB7fTtcbiAgICAgIGlmICh0aGlzLmNvbXBhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLmNvbXBhY3QgPSB0aGlzLmNvbXBhY3Q7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBBdHRyaWJ1dGlvbkNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZ1bGxzY3JlZW5Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsRnVsbHNjcmVlbl0nXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBGdWxsc2NyZWVuQ29udHJvbCgpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xuICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBHZW9jb2RlckV2ZW50IH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbmNvbnN0IE1hcGJveEdlb2NvZGVyID0gcmVxdWlyZSgnQG1hcGJveC9tYXBib3gtZ2wtZ2VvY29kZXInKTtcblxuZXhwb3J0IGNvbnN0IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZID0gbmV3IEluamVjdGlvblRva2VuKCdNYXBib3hBcGlLZXknKTtcblxuZXhwb3J0IGludGVyZmFjZSBMbmdMYXRMaXRlcmFsIHtcbiAgbGF0aXR1ZGU6IG51bWJlcjtcbiAgbG9uZ2l0dWRlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0cyBleHRlbmRzIEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5Qb2ludD4ge1xuICBhdHRyaWJ1dGlvbjogc3RyaW5nO1xuICBxdWVyeTogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0IGV4dGVuZHMgR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+IHtcbiAgYmJveDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGNlbnRlcjogbnVtYmVyW107XG4gIHBsYWNlX25hbWU6IHN0cmluZztcbiAgcGxhY2VfdHlwZTogc3RyaW5nW107XG4gIHJlbGV2YW5jZTogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29udGV4dDogYW55W107XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xHZW9jb2Rlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBHZW9jb2RlckV2ZW50IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgY291bnRyeT86IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGJib3g/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgQElucHV0KCkgdHlwZXM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZseVRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBASW5wdXQoKSBsaW1pdD86IG51bWJlcjtcbiAgQElucHV0KCkgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBASW5wdXQoKSBmaWx0ZXI/OiAoZmVhdHVyZTogUmVzdWx0KSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBsb2NhbEdlb2NvZGVyPzogKHF1ZXJ5OiBzdHJpbmcpID0+IFJlc3VsdFtdO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHByb3hpbWl0eT86IExuZ0xhdExpdGVyYWw7XG4gIEBJbnB1dCgpIHNlYXJjaElucHV0Pzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBjbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHsgcXVlcnk6IHN0cmluZyB9PigpO1xuICBAT3V0cHV0KCkgcmVzdWx0cyA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzdWx0cz4oKTtcbiAgQE91dHB1dCgpIHJlc3VsdCA9IG5ldyBFdmVudEVtaXR0ZXI8eyByZXN1bHQ6IFJlc3VsdCB9PigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBnZW9jb2RlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZKSBwcml2YXRlIHJlYWRvbmx5IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZOiBzdHJpbmdcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwcm94aW1pdHk6IHRoaXMucHJveGltaXR5LFxuICAgICAgICBjb3VudHJ5OiB0aGlzLmNvdW50cnksXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgIGJib3g6IHRoaXMuYmJveCxcbiAgICAgICAgdHlwZXM6IHRoaXMudHlwZXMsXG4gICAgICAgIGZseVRvOiB0aGlzLmZseVRvLFxuICAgICAgICBtaW5MZW5ndGg6IHRoaXMubWluTGVuZ3RoLFxuICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGxvY2FsR2VvY29kZXI6IHRoaXMubG9jYWxHZW9jb2RlcixcbiAgICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4gfHwgdGhpcy5NQVBCT1hfR0VPQ09ERVJfQVBJX0tFWVxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiB0eXBlb2Ygb3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IE1hcGJveEdlb2NvZGVyKG9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKHRoaXMpO1xuICAgICAgdGhpcy5hZGRDb250cm9sKCk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIucXVlcnkodGhpcy5zZWFyY2hJbnB1dCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmdlb2NvZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnByb3hpbWl0eSAmJiAhY2hhbmdlcy5wcm94aW1pdHkuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLnNldFByb3hpbWl0eShjaGFuZ2VzLnByb3hpbWl0eS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5zZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5xdWVyeSh0aGlzLnNlYXJjaElucHV0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZENvbnRyb2woKSB7XG4gICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSB0aGlzLmdlb2NvZGVyO1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKFxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb25cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGV2ZW50czogR2VvY29kZXJFdmVudCkge1xuICAgIGlmIChldmVudHMucmVzdWx0cy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdyZXN1bHRzJywgKGV2dDogUmVzdWx0cykgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVzdWx0cy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZXN1bHQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbigncmVzdWx0JywgKGV2dDogeyByZXN1bHQ6IFJlc3VsdCB9KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZXN1bHQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignZXJyb3InLCAoZXZ0OiBhbnkpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmVycm9yLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignbG9hZGluZycsIChldnQ6IHsgcXVlcnk6IHN0cmluZyB9KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5sb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNsZWFyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ2NsZWFyJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY2xlYXIuZW1pdCgpKSk7XG4gICAgfVxuXG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VvbG9jYXRlQ29udHJvbCwgRml0Qm91bmRzT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbEdlb2xvY2F0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBwb3NpdGlvbk9wdGlvbnM/OiBQb3NpdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIGZpdEJvdW5kc09wdGlvbnM/OiBGaXRCb3VuZHNPcHRpb25zO1xuICBASW5wdXQoKSB0cmFja1VzZXJMb2NhdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dVc2VyTG9jYXRpb24/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHBvc2l0aW9uT3B0aW9uczogdGhpcy5wb3NpdGlvbk9wdGlvbnMsXG4gICAgICAgIGZpdEJvdW5kc09wdGlvbnM6IHRoaXMuZml0Qm91bmRzT3B0aW9ucyxcbiAgICAgICAgdHJhY2tVc2VyTG9jYXRpb246IHRoaXMudHJhY2tVc2VyTG9jYXRpb24sXG4gICAgICAgIHNob3dVc2VyTG9jYXRpb246IHRoaXMuc2hvd1VzZXJMb2NhdGlvblxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiB0eXBlb2Ygb3B0aW9ucz5rZXk7XG4gICAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IEdlb2xvY2F0ZUNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsTmF2aWdhdGlvbl0nXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBOYXZpZ2F0aW9uQ29udHJvbCgpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY2FsZUNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xTY2FsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjYWxlQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgbWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdW5pdD86ICdpbXBlcmlhbCcgfCAnbWV0cmljJyB8ICduYXV0aWNhbCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnVuaXQgJiYgIWNoYW5nZXMudW5pdC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICg8YW55PnRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKS5zZXRVbml0KGNoYW5nZXMudW5pdC5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnM6IHsgbWF4V2lkdGg/OiBudW1iZXIsIHVuaXQ/OiBzdHJpbmcgfSA9IHt9O1xuICAgICAgaWYgKHRoaXMubWF4V2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLm1heFdpZHRoID0gdGhpcy5tYXhXaWR0aDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnVuaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLnVuaXQgPSB0aGlzLnVuaXQ7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBTY2FsZUNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYWNrZ3JvdW5kTGF5b3V0LFxuICBCYWNrZ3JvdW5kUGFpbnQsXG4gIENpcmNsZUxheW91dCxcbiAgQ2lyY2xlUGFpbnQsXG4gIEZpbGxFeHRydXNpb25MYXlvdXQsXG4gIEZpbGxFeHRydXNpb25QYWludCxcbiAgRmlsbExheW91dCxcbiAgRmlsbFBhaW50LFxuICBHZW9KU09OU291cmNlLFxuICBHZW9KU09OU291cmNlUmF3LFxuICBJbWFnZVNvdXJjZSxcbiAgTGF5ZXIsXG4gIExpbmVMYXlvdXQsXG4gIExpbmVQYWludCxcbiAgTWFwTW91c2VFdmVudCxcbiAgUmFzdGVyTGF5b3V0LFxuICBSYXN0ZXJQYWludCxcbiAgUmFzdGVyU291cmNlLFxuICBTeW1ib2xMYXlvdXQsXG4gIFN5bWJvbFBhaW50LFxuICBWZWN0b3JTb3VyY2UsXG4gIFZpZGVvU291cmNlXG59IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWxheWVyJyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIExheWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgTGF5ZXIge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBzb3VyY2U/OiBzdHJpbmcgfCBWZWN0b3JTb3VyY2UgfCBSYXN0ZXJTb3VyY2UgfCBHZW9KU09OU291cmNlIHwgSW1hZ2VTb3VyY2UgfCBWaWRlb1NvdXJjZSB8IEdlb0pTT05Tb3VyY2VSYXc7XG4gIEBJbnB1dCgpIHR5cGU6ICdzeW1ib2wnIHwgJ2ZpbGwnIHwgJ2xpbmUnIHwgJ2NpcmNsZScgfCAnZmlsbC1leHRydXNpb24nIHwgJ3Jhc3RlcicgfCAnYmFja2dyb3VuZCc7XG4gIEBJbnB1dCgpIG1ldGFkYXRhPzogYW55O1xuICBASW5wdXQoKSBzb3VyY2VMYXllcj86IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBmaWx0ZXI/OiBhbnlbXTtcbiAgQElucHV0KCkgbGF5b3V0PzogQmFja2dyb3VuZExheW91dCB8IEZpbGxMYXlvdXQgfCBGaWxsRXh0cnVzaW9uTGF5b3V0IHwgTGluZUxheW91dCB8IFN5bWJvbExheW91dCB8IFJhc3RlckxheW91dCB8IENpcmNsZUxheW91dDtcbiAgQElucHV0KCkgcGFpbnQ/OiBCYWNrZ3JvdW5kUGFpbnQgfCBGaWxsUGFpbnQgfCBGaWxsRXh0cnVzaW9uUGFpbnQgfCBMaW5lUGFpbnQgfCBTeW1ib2xQYWludCB8IFJhc3RlclBhaW50IHwgQ2lyY2xlUGFpbnQ7XG4gIEBJbnB1dCgpIGJlZm9yZT86IHN0cmluZztcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcblxuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcblxuICBwcml2YXRlIGxheWVyQWRkZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZExheWVyKHtcbiAgICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWV0YWRhdGE6IHRoaXMubWV0YWRhdGEsXG4gICAgICAgICAgJ3NvdXJjZS1sYXllcic6IHRoaXMuc291cmNlTGF5ZXIsXG4gICAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICAgIGxheW91dDogdGhpcy5sYXlvdXQsXG4gICAgICAgICAgcGFpbnQ6IHRoaXMucGFpbnRcbiAgICAgICAgfSxcbiAgICAgICAgbGF5ZXJFdmVudHM6IHtcbiAgICAgICAgICBjbGljazogdGhpcy5jbGljayxcbiAgICAgICAgICBtb3VzZUVudGVyOiB0aGlzLm1vdXNlRW50ZXIsXG4gICAgICAgICAgbW91c2VMZWF2ZTogdGhpcy5tb3VzZUxlYXZlLFxuICAgICAgICAgIG1vdXNlTW92ZTogdGhpcy5tb3VzZU1vdmVcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5iZWZvcmUpO1xuICAgICAgdGhpcy5sYXllckFkZGVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wYWludCAmJiAhY2hhbmdlcy5wYWludC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRBbGxMYXllclBhaW50UHJvcGVydHkodGhpcy5pZCwgY2hhbmdlcy5wYWludC5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubGF5b3V0ICYmICFjaGFuZ2VzLmxheW91dC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRBbGxMYXllckxheW91dFByb3BlcnR5KHRoaXMuaWQsIGNoYW5nZXMubGF5b3V0LmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5maWx0ZXIgJiYgIWNoYW5nZXMuZmlsdGVyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyRmlsdGVyKHRoaXMuaWQsIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5iZWZvcmUgJiYgIWNoYW5nZXMuYmVmb3JlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyQmVmb3JlKHRoaXMuaWQsIGNoYW5nZXMuYmVmb3JlLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWF4em9vbSAmJiAhY2hhbmdlcy5tYXh6b29tLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyWm9vbVJhbmdlKHRoaXMuaWQsIHRoaXMubWluem9vbSwgdGhpcy5tYXh6b29tKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5sYXllckFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlTGF5ZXIodGhpcy5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBPbkluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMbmdMYXRMaWtlLCBNYXJrZXIsIFBvaW50TGlrZSB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlcicsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICAgIC5tYXBib3hnbC1tYXJrZXIge1xuICAgICAgbGluZS1oZWlnaHQ6IDA7XG4gICAgfVxuICBgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgb2Zmc2V0PzogUG9pbnRMaWtlO1xuICBASW5wdXQoKSBhbmNob3I/OiAnY2VudGVyJyB8ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcbiAgQElucHV0KCkgbG5nTGF0PzogTG5nTGF0TGlrZTtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBtYXJrZXJJbnN0YW5jZT86IE1hcmtlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5mZWF0dXJlICYmIHRoaXMubG5nTGF0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZlYXR1cmUgYW5kIGxuZ0xhdCBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmxuZ0xhdCAmJiAhY2hhbmdlcy5sbmdMYXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQodGhpcy5sbmdMYXQhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZmVhdHVyZSAmJiAhY2hhbmdlcy5mZWF0dXJlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSA9IG5ldyBNYXJrZXIoPGFueT57IG9mZnNldDogdGhpcy5vZmZzZXQsIGVsZW1lbnQ6IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LCBhbmNob3I6IHRoaXMuYW5jaG9yIH0pO1xuICAgIHRoaXMubWFya2VySW5zdGFuY2Uuc2V0TG5nTGF0KHRoaXMuZmVhdHVyZSA/IHRoaXMuZmVhdHVyZS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMgOiB0aGlzLmxuZ0xhdCEpO1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZE1hcmtlcih0aGlzLm1hcmtlckluc3RhbmNlISk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlTWFya2VyKHRoaXMubWFya2VySW5zdGFuY2UhKTtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdG9nZ2xlUG9wdXAoKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEudG9nZ2xlUG9wdXAoKTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdChjb29yZGluYXRlcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9KU09OR2VvbWV0cnksIEdlb0pTT05Tb3VyY2UsIEdlb0pTT05Tb3VyY2VPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1nZW9qc29uLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEdlb0pTT05Tb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBkYXRhPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT05HZW9tZXRyeT4gfCBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT05HZW9tZXRyeT4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbnpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heHpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGJ1ZmZlcj86IG51bWJlcjtcbiAgQElucHV0KCkgdG9sZXJhbmNlPzogbnVtYmVyO1xuICBASW5wdXQoKSBjbHVzdGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2x1c3RlclJhZGl1cz86IG51bWJlcjtcbiAgQElucHV0KCkgY2x1c3Rlck1heFpvb20/OiBudW1iZXI7XG5cbiAgdXBkYXRlRmVhdHVyZURhdGEgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBmZWF0dXJlSWRDb3VudGVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICBmZWF0dXJlczogW11cbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICBidWZmZXI6IHRoaXMuYnVmZmVyLFxuICAgICAgICB0b2xlcmFuY2U6IHRoaXMudG9sZXJhbmNlLFxuICAgICAgICBjbHVzdGVyOiB0aGlzLmNsdXN0ZXIsXG4gICAgICAgIGNsdXN0ZXJSYWRpdXM6IHRoaXMuY2x1c3RlclJhZGl1cyxcbiAgICAgICAgY2x1c3Rlck1heFpvb206IHRoaXMuY2x1c3Rlck1heFpvb20sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViID0gdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMClcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5NYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICAgICAgc291cmNlLnNldERhdGEodGhpcy5kYXRhISk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5idWZmZXIgJiYgIWNoYW5nZXMuYnVmZmVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50b2xlcmFuY2UgJiYgIWNoYW5nZXMudG9sZXJhbmNlLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jbHVzdGVyICYmICFjaGFuZ2VzLmNsdXN0ZXIuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNsdXN0ZXJSYWRpdXMgJiYgIWNoYW5nZXMuY2x1c3RlclJhZGl1cy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2x1c3Rlck1heFpvb20gJiYgIWNoYW5nZXMuY2x1c3Rlck1heFpvb20uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuTWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBzb3VyY2Uuc2V0RGF0YSh0aGlzLmRhdGEhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4pIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gPEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4+dGhpcy5kYXRhO1xuICAgIGNvbGxlY3Rpb24uZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQoKTtcbiAgfVxuXG4gIHJlbW92ZUZlYXR1cmUoZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+KSB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IDxHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+PnRoaXMuZGF0YTtcbiAgICBjb25zdCBpbmRleCA9IGNvbGxlY3Rpb24uZmVhdHVyZXMuaW5kZXhPZihmZWF0dXJlKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29sbGVjdGlvbi5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQoKTtcbiAgfVxuXG4gIGdldE5ld0ZlYXR1cmVJZCgpIHtcbiAgICByZXR1cm4gKyt0aGlzLmZlYXR1cmVJZENvdW50ZXI7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtZmVhdHVyZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRmVhdHVyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4ge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZD86IG51bWJlcjsgLy8gRklYTUUgbnVtYmVyIG9ubHkgZm9yIG5vdyBodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC1nbC1qcy9pc3N1ZXMvMjcxNlxuICBASW5wdXQoKSBnZW9tZXRyeTogR2VvSlNPTi5HZW9tZXRyeU9iamVjdDtcbiAgQElucHV0KCkgcHJvcGVydGllczogYW55O1xuICB0eXBlOiAnRmVhdHVyZScgPSAnRmVhdHVyZSc7XG5cbiAgcHJpdmF0ZSBmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEdlb0pTT05Tb3VyY2VDb21wb25lbnQpKSBwcml2YXRlIEdlb0pTT05Tb3VyY2VDb21wb25lbnQ6IEdlb0pTT05Tb3VyY2VDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQuZ2V0TmV3RmVhdHVyZUlkKCk7XG4gICAgfVxuICAgIHRoaXMuZmVhdHVyZSA9IHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmdlb21ldHJ5LFxuICAgICAgcHJvcGVydGllczogdGhpcy5wcm9wZXJ0aWVzID8gdGhpcy5wcm9wZXJ0aWVzIDoge31cbiAgICB9O1xuICAgIHRoaXMuZmVhdHVyZS5pZCA9IHRoaXMuaWQ7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LmFkZEZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5yZW1vdmVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gIH1cblxuICB1cGRhdGVDb29yZGluYXRlcyhjb29yZGluYXRlczogbnVtYmVyW10pIHtcbiAgICAoPEdlb0pTT04uUG9pbnQ+dGhpcy5mZWF0dXJlLmdlb21ldHJ5KS5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcE1vdXNlRXZlbnQgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYXllckNvbXBvbmVudCB9IGZyb20gJy4uL2xheWVyL2xheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4uL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZlYXR1cmVDb21wb25lbnQgfSBmcm9tICcuLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xEcmFnZ2FibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdtZ2xEcmFnZ2FibGUnKSBsYXllcj86IExheWVyQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcblxuICBwcml2YXRlIGRlc3Ryb3llZCQ6IFJlcGxheVN1YmplY3Q8dm9pZD4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBOZ1pvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgRmVhdHVyZUNvbXBvbmVudD86IEZlYXR1cmVDb21wb25lbnQsXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIE1hcmtlckNvbXBvbmVudD86IE1hcmtlckNvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGxldCBlbnRlciQ7XG4gICAgbGV0IGxlYXZlJDtcbiAgICBsZXQgdXBkYXRlQ29vcmRzO1xuICAgIGlmICh0aGlzLk1hcmtlckNvbXBvbmVudCkge1xuICAgICAgbGV0IG1hcmtlckVsZW1lbnQgPSAoPEVsZW1lbnQ+dGhpcy5NYXJrZXJDb21wb25lbnQuY29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIGlmIChtYXJrZXJFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtYXJrZXJFbGVtZW50ID0gbWFya2VyRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIH1cbiAgICAgIGVudGVyJCA9IGZyb21FdmVudChtYXJrZXJFbGVtZW50LCAnbW91c2VlbnRlcicpO1xuICAgICAgbGVhdmUkID0gZnJvbUV2ZW50KG1hcmtlckVsZW1lbnQsICdtb3VzZWxlYXZlJyk7XG4gICAgICB1cGRhdGVDb29yZHMgPSB0aGlzLk1hcmtlckNvbXBvbmVudC51cGRhdGVDb29yZGluYXRlcy5iaW5kKHRoaXMuTWFya2VyQ29tcG9uZW50KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuRmVhdHVyZUNvbXBvbmVudCAmJiB0aGlzLmxheWVyKSB7XG4gICAgICBlbnRlciQgPSB0aGlzLmxheWVyLm1vdXNlRW50ZXI7XG4gICAgICBsZWF2ZSQgPSB0aGlzLmxheWVyLm1vdXNlTGVhdmU7XG4gICAgICB1cGRhdGVDb29yZHMgPSB0aGlzLkZlYXR1cmVDb21wb25lbnQudXBkYXRlQ29vcmRpbmF0ZXMuYmluZCh0aGlzLkZlYXR1cmVDb21wb25lbnQpO1xuICAgICAgaWYgKHRoaXMuRmVhdHVyZUNvbXBvbmVudC5nZW9tZXRyeS50eXBlICE9PSAnUG9pbnQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWdsRHJhZ2dhYmxlIG9ubHkgc3VwcG9ydCBwb2ludCBmZWF0dXJlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWdsRHJhZ2dhYmxlIGNhbiBvbmx5IGJlIHVzZWQgb24gRmVhdHVyZSAod2l0aCBhIGxheWVyIGFzIGlucHV0KSBvciBNYXJrZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURyYWdnYWJsZShlbnRlciQsIGxlYXZlJCwgdXBkYXRlQ29vcmRzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgdGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZURyYWdnYWJsZShlbnRlciQ6IE9ic2VydmFibGU8YW55PiwgbGVhdmUkOiBPYnNlcnZhYmxlPGFueT4sIHVwZGF0ZUNvb3JkczogKGNvb3JkOiBudW1iZXJbXSkgPT4gdm9pZCkge1xuICAgIGxldCBtb3ZpbmcgPSBmYWxzZTtcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBtb3VzZVVwJCA9IGZyb21FdmVudDxNYXBNb3VzZUV2ZW50Pih0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3VzZXVwJyk7XG4gICAgICBjb25zdCBkcmFnU3RhcnQkID0gZW50ZXIkLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIW1vdmluZyksXG4gICAgICAgIGZpbHRlcigoZXZ0KSA9PiB0aGlzLmZpbHRlckZlYXR1cmUoZXZ0KSksXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgaW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKCdtb3ZlJyk7XG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4oZmFsc2UpO1xuICAgICAgICB9KSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdXNlZG93bicpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwobGVhdmUkKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRyYWdnaW5nJCA9IGRyYWdTdGFydCQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb21FdmVudDxNYXBNb3VzZUV2ZW50Pih0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3VzZW1vdmUnKVxuICAgICAgICAgIC5waXBlKHRha2VVbnRpbChtb3VzZVVwJCkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCBkcmFnRW5kJCA9IGRyYWdTdGFydCQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1vdXNlVXAkLnBpcGUodGFrZSgxKSkpXG4gICAgICApO1xuICAgICAgZHJhZ1N0YXJ0JC5zdWJzY3JpYmUoKGV2dCkgPT4ge1xuICAgICAgICBtb3ZpbmcgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuTmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdTdGFydC5lbWl0KGV2dCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRyYWdnaW5nJC5zdWJzY3JpYmUoKGV2dCkgPT4ge1xuICAgICAgICB1cGRhdGVDb29yZHMoW2V2dC5sbmdMYXQubG5nLCBldnQubG5nTGF0LmxhdF0pO1xuICAgICAgICBpZiAodGhpcy5kcmFnLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnLmVtaXQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZHJhZ0VuZCQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgbW92aW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmRyYWdFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuTmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdFbmQuZW1pdChldnQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWluc2lkZSkgeyAvLyBJdCdzIHBvc3NpYmxlIHRvIGRyYWdFbmQgb3V0c2lkZSB0aGUgdGFyZ2V0IChzbWFsbCBpbnB1dCBsYWcpXG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignJyk7XG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4odHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGVhdmUkLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpLFxuICAgICAgICB0YXAoKCkgPT4gaW5zaWRlID0gZmFsc2UpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIW1vdmluZylcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignJyk7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZpbHRlckZlYXR1cmUoZXZ0OiBNYXBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuRmVhdHVyZUNvbXBvbmVudCAmJiB0aGlzLmxheWVyKSB7XG4gICAgICBjb25zdCBmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8YW55PiA9IHRoaXMuTWFwU2VydmljZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMoXG4gICAgICAgIGV2dC5wb2ludCxcbiAgICAgICAge1xuICAgICAgICAgIGxheWVyczogW3RoaXMubGF5ZXIuaWRdLFxuICAgICAgICAgIGZpbHRlcjogW1xuICAgICAgICAgICAgJ2FsbCcsXG4gICAgICAgICAgICBbJz09JywgJyR0eXBlJywgJ1BvaW50J10sXG4gICAgICAgICAgICBbJz09JywgJyRpZCcsIHRoaXMuRmVhdHVyZUNvbXBvbmVudC5pZF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIClbMF07XG4gICAgICBpZiAoIWZlYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEltYWdlRGF0YSwgTWFwSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1pbWFnZScsXG4gIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIGRhdGE/OiBNYXBJbWFnZURhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnM7XG4gIEBJbnB1dCgpIHVybD86IHN0cmluZztcblxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHsgc3RhdHVzOiBudW1iZXIgfT4oKTtcbiAgQE91dHB1dCgpIGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIGltYWdlQWRkZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGF0YSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkSW1hZ2UoXG4gICAgICAgICAgdGhpcy5pZCxcbiAgICAgICAgICB0aGlzLmRhdGEsXG4gICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW1hZ2VBZGRlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudXJsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5NYXBTZXJ2aWNlLmxvYWRBbmRBZGRJbWFnZShcbiAgICAgICAgICAgIHRoaXMuaWQsXG4gICAgICAgICAgICB0aGlzLnVybCxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5pbWFnZUFkZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkLmVtaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMub3B0aW9ucyAmJiAhY2hhbmdlcy5vcHRpb25zLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy51cmwgJiYgIWNoYW5nZXMudXJsLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmltYWdlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVJbWFnZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFuaW1hdGlvbk9wdGlvbnMsXG4gIEV2ZW50RGF0YSxcbiAgTG5nTGF0Qm91bmRzTGlrZSxcbiAgTG5nTGF0TGlrZSxcbiAgTWFwLFxuICBNYXBCb3hab29tRXZlbnQsXG4gIE1hcE1vdXNlRXZlbnQsXG4gIE1hcFRvdWNoRXZlbnQsXG4gIFBhZGRpbmdPcHRpb25zLFxuICBQb2ludExpa2UsXG4gIFN0eWxlXG4gIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UsIE1vdmluZ09wdGlvbnMgfSBmcm9tICcuL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEV2ZW50IH0gZnJvbSAnLi9tYXAudHlwZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBuYW1lc3BhY2UgbWFwYm94Z2wge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgTWFwYm94T3B0aW9ucyB7XG4gICAgICBmYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0PzogYm9vbGVhbjtcbiAgICAgIHRyYW5zZm9ybVJlcXVlc3Q/OiBGdW5jdGlvbjtcbiAgICAgIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseT86IHN0cmluZztcbiAgICAgIHBpdGNoV2l0aFJvdGF0ZT86IGJvb2xlYW47XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1tYXAnLFxuICB0ZW1wbGF0ZTogJzxkaXYgI2NvbnRhaW5lcj48L2Rpdj4nLFxuICBzdHlsZXM6IFtgXG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICBkaXYge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICBgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTWFwU2VydmljZVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgTWFwRXZlbnQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBhY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgQElucHV0KCkgY3VzdG9tTWFwYm94QXBpVXJsPzogc3RyaW5nO1xuICBASW5wdXQoKSBoYXNoPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVmcmVzaEV4cGlyZWRUaWxlcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBjbGFzc2VzPzogc3RyaW5nW107XG4gIEBJbnB1dCgpIGJlYXJpbmdTbmFwPzogbnVtYmVyO1xuICBASW5wdXQoKSBpbnRlcmFjdGl2ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBpdGNoV2l0aFJvdGF0ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF0dHJpYnV0aW9uQ29udHJvbD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxvZ29Qb3NpdGlvbj86ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcgfCAnYm90dG9tLXJpZ2h0JztcbiAgQElucHV0KCkgbWF4VGlsZUNhY2hlU2l6ZT86IG51bWJlcjtcbiAgQElucHV0KCkgbG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5Pzogc3RyaW5nO1xuICBASW5wdXQoKSBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJXb3JsZENvcGllcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRyYWNrUmVzaXplPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdHJhbnNmb3JtUmVxdWVzdD86IEZ1bmN0aW9uO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIG1pblpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heFpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHNjcm9sbFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBkcmFnUm90YXRlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdG91Y2hab29tUm90YXRlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZG91YmxlQ2xpY2tab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkga2V5Ym9hcmQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBkcmFnUGFuPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYm94Wm9vbT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN0eWxlOiBTdHlsZSB8IHN0cmluZztcbiAgQElucHV0KCkgY2VudGVyPzogTG5nTGF0TGlrZTtcbiAgQElucHV0KCkgbWF4Qm91bmRzPzogTG5nTGF0Qm91bmRzTGlrZTtcbiAgQElucHV0KCkgem9vbT86IFtudW1iZXJdO1xuICBASW5wdXQoKSBiZWFyaW5nPzogW251bWJlcl07XG4gIEBJbnB1dCgpIHBpdGNoPzogW251bWJlcl07XG5cbiAgLyogQWRkZWQgYnkgbmd4LW1hcGJveC1nbCAqL1xuICBASW5wdXQoKSBtb3ZpbmdNZXRob2Q6ICdqdW1wVG8nIHwgJ2Vhc2VUbycgfCAnZmx5VG8nID0gJ2ZseVRvJztcbiAgQElucHV0KCkgbW92aW5nT3B0aW9ucz86IE1vdmluZ09wdGlvbnM7XG4gIEBJbnB1dCgpIGZpdEJvdW5kcz86IExuZ0xhdEJvdW5kc0xpa2U7XG4gIEBJbnB1dCgpIGZpdEJvdW5kc09wdGlvbnM/OiB7XG4gICAgbGluZWFyPzogYm9vbGVhbixcbiAgICBlYXNpbmc/OiBGdW5jdGlvbixcbiAgICBwYWRkaW5nPzogbnVtYmVyIHwgUGFkZGluZ09wdGlvbnMsXG4gICAgb2Zmc2V0PzogUG9pbnRMaWtlLFxuICAgIG1heFpvb20/OiBudW1iZXJcbiAgfTtcbiAgQElucHV0KCkgY2VudGVyV2l0aFBhblRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcGFuVG9PcHRpb25zPzogQW5pbWF0aW9uT3B0aW9ucztcbiAgQElucHV0KCkgY3Vyc29yU3R5bGU/OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHJlc2l6ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZU92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZU91dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGNvbnRleHRNZW51ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgdG91Y2hTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgdG91Y2hNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgdG91Y2hDYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB3aGVlbCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpOyAvLyBUT0RPIE1hcFdoZWVsRXZlbnRcbiAgQE91dHB1dCgpIG1vdmVTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpOyAvLyBUT0RPIENoZWNrIHR5cGVcbiAgQE91dHB1dCgpIG1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW92ZUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcbiAgQE91dHB1dCgpIHpvb21TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB6b29tRXZ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHpvb21FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcm90YXRlU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcm90YXRlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaEV2dCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgcGl0Y2hFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwQm94Wm9vbUV2ZW50PigpO1xuICBAT3V0cHV0KCkgYm94Wm9vbUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwQm94Wm9vbUV2ZW50PigpO1xuICBAT3V0cHV0KCkgYm94Wm9vbUNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwQm94Wm9vbUV2ZW50PigpO1xuICBAT3V0cHV0KCkgd2ViR2xDb250ZXh0TG9zdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHdlYkdsQ29udGV4dFJlc3RvcmVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgbG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTsgLy8gVE9ETyBDaGVjayB0eXBlXG4gIEBPdXRwdXQoKSBkYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBzdHlsZURhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHNvdXJjZURhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIGRhdGFMb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBzdHlsZURhdGFMb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBzb3VyY2VEYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuXG4gIGdldCBtYXBJbnN0YW5jZSgpOiBNYXAge1xuICAgIHJldHVybiB0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2U7XG4gIH1cblxuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBtYXBDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5zZXR1cCh7XG4gICAgICBhY2Nlc3NUb2tlbjogdGhpcy5hY2Nlc3NUb2tlbixcbiAgICAgIGN1c3RvbU1hcGJveEFwaVVybDogdGhpcy5jdXN0b21NYXBib3hBcGlVcmwsXG4gICAgICBtYXBPcHRpb25zOiB7XG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5tYXBDb250YWluZXIubmF0aXZlRWxlbWVudCxcbiAgICAgICAgbWluWm9vbTogdGhpcy5taW5ab29tLFxuICAgICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXG4gICAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgICBoYXNoOiB0aGlzLmhhc2gsXG4gICAgICAgIGludGVyYWN0aXZlOiB0aGlzLmludGVyYWN0aXZlLFxuICAgICAgICBiZWFyaW5nU25hcDogdGhpcy5iZWFyaW5nU25hcCxcbiAgICAgICAgcGl0Y2hXaXRoUm90YXRlOiB0aGlzLnBpdGNoV2l0aFJvdGF0ZSxcbiAgICAgICAgY2xhc3NlczogdGhpcy5jbGFzc2VzLFxuICAgICAgICBhdHRyaWJ1dGlvbkNvbnRyb2w6IHRoaXMuYXR0cmlidXRpb25Db250cm9sLFxuICAgICAgICBsb2dvUG9zaXRpb246IHRoaXMubG9nb1Bvc2l0aW9uLFxuICAgICAgICBmYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0OiB0aGlzLmZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQsXG4gICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdGhpcy5wcmVzZXJ2ZURyYXdpbmdCdWZmZXIsXG4gICAgICAgIHJlZnJlc2hFeHBpcmVkVGlsZXM6IHRoaXMucmVmcmVzaEV4cGlyZWRUaWxlcyxcbiAgICAgICAgbWF4Qm91bmRzOiB0aGlzLm1heEJvdW5kcyxcbiAgICAgICAgc2Nyb2xsWm9vbTogdGhpcy5zY3JvbGxab29tLFxuICAgICAgICBib3hab29tOiB0aGlzLmJveFpvb20sXG4gICAgICAgIGRyYWdSb3RhdGU6IHRoaXMuZHJhZ1JvdGF0ZSxcbiAgICAgICAgZHJhZ1BhbjogdGhpcy5kcmFnUGFuLFxuICAgICAgICBrZXlib2FyZDogdGhpcy5rZXlib2FyZCxcbiAgICAgICAgZG91YmxlQ2xpY2tab29tOiB0aGlzLmRvdWJsZUNsaWNrWm9vbSxcbiAgICAgICAgdG91Y2hab29tUm90YXRlOiB0aGlzLnRvdWNoWm9vbVJvdGF0ZSxcbiAgICAgICAgdHJhY2tSZXNpemU6IHRoaXMudHJhY2tSZXNpemUsXG4gICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgICAgYmVhcmluZzogdGhpcy5iZWFyaW5nLFxuICAgICAgICBwaXRjaDogdGhpcy5waXRjaCxcbiAgICAgICAgcmVuZGVyV29ybGRDb3BpZXM6IHRoaXMucmVuZGVyV29ybGRDb3BpZXMsXG4gICAgICAgIG1heFRpbGVDYWNoZVNpemU6IHRoaXMubWF4VGlsZUNhY2hlU2l6ZSxcbiAgICAgICAgbG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5OiB0aGlzLmxvY2FsSWRlb2dyYXBoRm9udEZhbWlseSxcbiAgICAgICAgdHJhbnNmb3JtUmVxdWVzdDogdGhpcy50cmFuc2Zvcm1SZXF1ZXN0XG4gICAgICB9LFxuICAgICAgbWFwRXZlbnRzOiB0aGlzXG4gICAgfSk7XG4gICAgaWYgKHRoaXMuY3Vyc29yU3R5bGUpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IodGhpcy5jdXJzb3JTdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmRlc3Ryb3lNYXAoKTtcbiAgfVxuXG4gIGFzeW5jIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBhd2FpdCB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQudG9Qcm9taXNlKCk7XG4gICAgaWYgKGNoYW5nZXMuY3Vyc29yU3R5bGUgJiYgIWNoYW5nZXMuY3Vyc29yU3R5bGUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKGNoYW5nZXMuY3Vyc29yU3R5bGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubWluWm9vbSAmJiAhY2hhbmdlcy5taW5ab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZU1pblpvb20oY2hhbmdlcy5taW5ab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1heFpvb20gJiYgIWNoYW5nZXMubWF4Wm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVNYXhab29tKGNoYW5nZXMubWF4Wm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5zY3JvbGxab29tICYmICFjaGFuZ2VzLnNjcm9sbFpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlU2Nyb2xsWm9vbShjaGFuZ2VzLnNjcm9sbFpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZHJhZ1JvdGF0ZSAmJiAhY2hhbmdlcy5kcmFnUm90YXRlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURyYWdSb3RhdGUoY2hhbmdlcy5kcmFnUm90YXRlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnRvdWNoWm9vbVJvdGF0ZSAmJiAhY2hhbmdlcy50b3VjaFpvb21Sb3RhdGUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlVG91Y2hab29tUm90YXRlKGNoYW5nZXMudG91Y2hab29tUm90YXRlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRvdWJsZUNsaWNrWm9vbSAmJiAhY2hhbmdlcy5kb3VibGVDbGlja1pvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRG91YmxlQ2xpY2tab29tKGNoYW5nZXMuZG91YmxlQ2xpY2tab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmtleWJvYXJkICYmICFjaGFuZ2VzLmtleWJvYXJkLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZUtleWJvYXJkKGNoYW5nZXMua2V5Ym9hcmQuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZHJhZ1BhbiAmJiAhY2hhbmdlcy5kcmFnUGFuLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4oY2hhbmdlcy5kcmFnUGFuLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmJveFpvb20gJiYgIWNoYW5nZXMuYm94Wm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVCb3hab29tKGNoYW5nZXMuYm94Wm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5zdHlsZSAmJiAhY2hhbmdlcy5zdHlsZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVTdHlsZShjaGFuZ2VzLnN0eWxlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1heEJvdW5kcyAmJiAhY2hhbmdlcy5tYXhCb3VuZHMuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlTWF4Qm91bmRzKGNoYW5nZXMubWF4Qm91bmRzLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmZpdEJvdW5kcyAmJiAhY2hhbmdlcy5maXRCb3VuZHMuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuZml0Qm91bmRzKGNoYW5nZXMuZml0Qm91bmRzLmN1cnJlbnRWYWx1ZSwgdGhpcy5maXRCb3VuZHNPcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5jZW50ZXJXaXRoUGFuVG8gJiZcbiAgICAgIGNoYW5nZXMuY2VudGVyICYmICFjaGFuZ2VzLmNlbnRlci5pc0ZpcnN0Q2hhbmdlKCkgJiZcbiAgICAgICFjaGFuZ2VzLnpvb20gJiYgIWNoYW5nZXMuYmVhcmluZyAmJiAhY2hhbmdlcy5waXRjaFxuICAgICkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnBhblRvKHRoaXMuY2VudGVyISwgdGhpcy5wYW5Ub09wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBjaGFuZ2VzLmNlbnRlciAmJiAhY2hhbmdlcy5jZW50ZXIuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnpvb20gJiYgIWNoYW5nZXMuem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuYmVhcmluZyAmJiAhY2hhbmdlcy5iZWFyaW5nLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5waXRjaCAmJiAhY2hhbmdlcy5waXRjaC5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5tb3ZlKFxuICAgICAgICB0aGlzLm1vdmluZ01ldGhvZCxcbiAgICAgICAgdGhpcy5tb3ZpbmdPcHRpb25zLFxuICAgICAgICBjaGFuZ2VzLnpvb20gJiYgdGhpcy56b29tID8gdGhpcy56b29tWzBdIDogdW5kZWZpbmVkLFxuICAgICAgICBjaGFuZ2VzLmNlbnRlciA/IHRoaXMuY2VudGVyIDogdW5kZWZpbmVkLFxuICAgICAgICBjaGFuZ2VzLmJlYXJpbmcgJiYgdGhpcy5iZWFyaW5nID8gdGhpcy5iZWFyaW5nWzBdIDogdW5kZWZpbmVkLFxuICAgICAgICBjaGFuZ2VzLnBpdGNoICYmIHRoaXMucGl0Y2ggPyB0aGlzLnBpdGNoWzBdIDogdW5kZWZpbmVkXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBzdXBlcmNsdXN0ZXIsIHsgQ2x1c3RlciwgT3B0aW9ucyBhcyBTdXBlcmNsdXN0ZXJPcHRpb25zLCBTdXBlcmNsdXN0ZXIgfSBmcm9tICdzdXBlcmNsdXN0ZXInO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbFBvaW50XScgfSlcbmV4cG9ydCBjbGFzcyBQb2ludERpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbWdsQ2x1c3RlclBvaW50XScgfSlcbmV4cG9ydCBjbGFzcyBDbHVzdGVyUG9pbnREaXJlY3RpdmUgeyB9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1tYXJrZXItY2x1c3RlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmVhdHVyZSBvZiBjbHVzdGVyUG9pbnRzXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXI7IGVsc2UgcG9pbnRcIj5cbiAgICAgICAgPG1nbC1tYXJrZXJcbiAgICAgICAgICBbZmVhdHVyZV09XCJmZWF0dXJlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbHVzdGVyUG9pbnRUcGw7IGNvbnRleHQ6IHtcbiAgICAgICAgICAgICRpbXBsaWNpdDogZmVhdHVyZSxcbiAgICAgICAgICAgIGdldExlYXZlc0ZuOiBnZXRMZWF2ZXNGbihmZWF0dXJlKSxcbiAgICAgICAgICAgIGdldENoaWxkcmVuRm46IGdldENoaWxkcmVuRm4oZmVhdHVyZSksXG4gICAgICAgICAgICBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbUZuOiBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbUZuKGZlYXR1cmUpXG4gICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21nbC1tYXJrZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjcG9pbnQ+XG4gICAgICAgIDxtZ2wtbWFya2VyXG4gICAgICAgICAgW2ZlYXR1cmVdPVwiZmVhdHVyZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicG9pbnRUcGw7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBmZWF0dXJlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZ2wtbWFya2VyPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNsdXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSByYWRpdXM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heFpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1pblpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGV4dGVudD86IG51bWJlcjtcbiAgQElucHV0KCkgbm9kZVNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxvZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlZHVjZT86IChhY2N1bXVsYXRlZDogYW55LCBwcm9wczogYW55KSA9PiB2b2lkO1xuICBASW5wdXQoKSBpbml0aWFsPzogKCkgPT4gYW55O1xuICBASW5wdXQoKSBtYXA/OiAocHJvcHM6IGFueSkgPT4gYW55O1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgZGF0YTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLlBvaW50PjtcblxuICBAT3V0cHV0KCkgbG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8U3VwZXJjbHVzdGVyPigpO1xuXG4gIEBDb250ZW50Q2hpbGQoUG9pbnREaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgcG9pbnRUcGw6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoQ2x1c3RlclBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGNsdXN0ZXJQb2ludFRwbDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjbHVzdGVyUG9pbnRzOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD5bXTtcblxuICBwcml2YXRlIHN1cGVyY2x1c3RlcjogU3VwZXJjbHVzdGVyO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBDaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBvcHRpb25zOiBTdXBlcmNsdXN0ZXJPcHRpb25zID0ge1xuICAgICAgcmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgIGV4dGVudDogdGhpcy5leHRlbnQsXG4gICAgICBub2RlU2l6ZTogdGhpcy5ub2RlU2l6ZSxcbiAgICAgIGxvZzogdGhpcy5sb2csXG4gICAgICByZWR1Y2U6IHRoaXMucmVkdWNlLFxuICAgICAgaW5pdGlhbDogdGhpcy5pbml0aWFsLFxuICAgICAgbWFwOiB0aGlzLm1hcFxuICAgIH07XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgIC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIFN1cGVyY2x1c3Rlck9wdGlvbnM+a2V5O1xuICAgICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuc3VwZXJjbHVzdGVyID0gc3VwZXJjbHVzdGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuc3VwZXJjbHVzdGVyLmxvYWQodGhpcy5kYXRhLmZlYXR1cmVzKTtcbiAgICB0aGlzLmxvYWQuZW1pdCh0aGlzLnN1cGVyY2x1c3Rlcik7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5zdXBlcmNsdXN0ZXIubG9hZCh0aGlzLmRhdGEuZmVhdHVyZXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IG1hcE1vdmUkID0gbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICd6b29tQ2hhbmdlJyksXG4gICAgICAgIGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3ZlJylcbiAgICAgICk7XG4gICAgICBjb25zdCBzdWIgPSBtYXBNb3ZlJC5waXBlKFxuICAgICAgICBzdGFydFdpdGg8YW55Pih1bmRlZmluZWQpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlQ2x1c3RlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZ2V0TGVhdmVzRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAobGltaXQ/OiBudW1iZXIsIG9mZnNldD86IG51bWJlcikgPT4gKDxhbnk+dGhpcy5zdXBlcmNsdXN0ZXIuZ2V0TGVhdmVzKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEsIGxpbWl0LCBvZmZzZXQpO1xuICB9XG5cbiAgZ2V0Q2hpbGRyZW5GbiA9IChmZWF0dXJlOiBDbHVzdGVyKSA9PiB7XG4gICAgcmV0dXJuICgpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldENoaWxkcmVuKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEpO1xuICB9XG5cbiAgZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbiA9IChmZWF0dXJlOiBDbHVzdGVyKSA9PiB7XG4gICAgcmV0dXJuICgpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldENsdXN0ZXJFeHBhbnNpb25ab29tKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDbHVzdGVyKCkge1xuICAgIGNvbnN0IGJib3ggPSB0aGlzLk1hcFNlcnZpY2UuZ2V0Q3VycmVudFZpZXdwb3J0QmJveCgpO1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gTWF0aC5yb3VuZCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpKTtcbiAgICB0aGlzLmNsdXN0ZXJQb2ludHMgPSB0aGlzLnN1cGVyY2x1c3Rlci5nZXRDbHVzdGVycyhiYm94LCBjdXJyZW50Wm9vbSk7XG4gICAgdGhpcy5DaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2ludExpa2UsIFBvcHVwLCBMbmdMYXRMaWtlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtcG9wdXAnLFxuICB0ZW1wbGF0ZTogJzxkaXYgI2NvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBvcHVwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgY2xvc2VCdXR0b24/OiBib29sZWFuO1xuICBASW5wdXQoKSBjbG9zZU9uQ2xpY2s/OiBib29sZWFuO1xuICBASW5wdXQoKSBhbmNob3I/OiAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCc7XG4gIEBJbnB1dCgpIG9mZnNldD86IG51bWJlciB8IFBvaW50TGlrZSB8IHsgW2FuY2hvcjogc3RyaW5nXTogW251bWJlciwgbnVtYmVyXSB9O1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgbG5nTGF0PzogTG5nTGF0TGlrZTtcbiAgQElucHV0KCkgbWFya2VyPzogTWFya2VyQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcG9wdXBJbnN0YW5jZT86IFBvcHVwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmxuZ0xhdCAmJiB0aGlzLm1hcmtlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXJrZXIgYW5kIGxuZ0xhdCBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmxuZ0xhdCAmJiAhY2hhbmdlcy5sbmdMYXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFwKHRoaXMucG9wdXBJbnN0YW5jZSEpO1xuICAgICAgY29uc3QgcG9wdXBJbnN0YW5jZVRtcCA9IHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKHBvcHVwSW5zdGFuY2VUbXAsIGNoYW5nZXMubG5nTGF0LmN1cnJlbnRWYWx1ZSk7XG4gICAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSBwb3B1cEluc3RhbmNlVG1wO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXJrZXIgJiYgIWNoYW5nZXMubWFya2VyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgY29uc3QgcHJldmlvdXNNYXJrZXI6IE1hcmtlckNvbXBvbmVudCA9IGNoYW5nZXMubWFya2VyLnByZXZpb3VzVmFsdWU7XG4gICAgICBpZiAocHJldmlvdXNNYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcihwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UgJiYgdGhpcy5wb3B1cEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlLCB0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgdGhpcy5hZGRQb3B1cCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucG9wdXBJbnN0YW5jZSkge1xuICAgICAgaWYgKHRoaXMubG5nTGF0KSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUG9wdXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuTWFwU2VydmljZS5jcmVhdGVQb3B1cCh7XG4gICAgICBwb3B1cE9wdGlvbnM6IHtcbiAgICAgICAgY2xvc2VCdXR0b246IHRoaXMuY2xvc2VCdXR0b24sXG4gICAgICAgIGNsb3NlT25DbGljazogdGhpcy5jbG9zZU9uQ2xpY2ssXG4gICAgICAgIGFuY2hvcjogdGhpcy5hbmNob3IsXG4gICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXRcbiAgICAgIH0sXG4gICAgICBwb3B1cEV2ZW50czoge1xuICAgICAgICBvcGVuOiB0aGlzLm9wZW4sXG4gICAgICAgIGNsb3NlOiB0aGlzLmNsb3NlXG4gICAgICB9XG4gICAgfSwgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQb3B1cChwb3B1cDogUG9wdXApIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmxuZ0xhdCkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcChwb3B1cCwgdGhpcy5sbmdMYXQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSwgcG9wdXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2wtcG9wdXAgbmVlZCBlaXRoZXIgbG5nTGF0IG9yIG1hcmtlciB0byBiZSBzZXQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbnZhc1NvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1jYW52YXMtc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYW52YXNTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBDYW52YXNTb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBjb29yZGluYXRlczogbnVtYmVyW11bXTtcbiAgQElucHV0KCkgY2FudmFzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFuaW1hdGU/OiBib29sZWFuO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlID0ge1xuICAgICAgICB0eXBlOiAnY2FudmFzJyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IHRoaXMuY29vcmRpbmF0ZXMsXG4gICAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICAgIGFuaW1hdGU6IHRoaXMuYW5pbWF0ZSxcbiAgICAgIH07XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHNvdXJjZSk7XG4gICAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5jb29yZGluYXRlcyAmJiAhY2hhbmdlcy5jb29yZGluYXRlcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2FudmFzICYmICFjaGFuZ2VzLmNhbnZhcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuYW5pbWF0ZSAmJiAhY2hhbmdlcy5hbmltYXRlLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWltYWdlLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBJbWFnZVNvdXJjZU9wdGlvbnMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICBASW5wdXQoKSBjb29yZGluYXRlczogbnVtYmVyW11bXTtcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlc1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy51cmwgJiYgIWNoYW5nZXMudXJsLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jb29yZGluYXRlcyAmJiAhY2hhbmdlcy5jb29yZGluYXRlcy5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSYXN0ZXJTb3VyY2UgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1yYXN0ZXItc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBSYXN0ZXJTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBSYXN0ZXJTb3VyY2Uge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICBASW5wdXQoKSB0aWxlcz86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBib3VuZHM/OiBudW1iZXJbXTtcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgdGlsZVNpemU/OiBudW1iZXI7XG5cbiAgdHlwZTogJ3Jhc3RlcicgPSAncmFzdGVyJzsgLy8gSnVzdCB0byBtYWtlIHRzIGhhcHB5XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB7XG4gICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgdGlsZXM6IHRoaXMudGlsZXMsXG4gICAgICAgIGJvdW5kczogdGhpcy5ib3VuZHMsXG4gICAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgICB0aWxlU2l6ZTogdGhpcy50aWxlU2l6ZVxuICAgICAgfTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwgc291cmNlKTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRpbGVzICYmICFjaGFuZ2VzLnRpbGVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5ib3VuZHMgJiYgIWNoYW5nZXMuYm91bmRzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudGlsZVNpemUgJiYgIWNoYW5nZXMudGlsZVNpemUuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmVjdG9yU291cmNlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtdmVjdG9yLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVmVjdG9yU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgVmVjdG9yU291cmNlIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1cmw/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpbGVzPzogc3RyaW5nW107XG4gIEBJbnB1dCgpIG1pbnpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heHpvb20/OiBudW1iZXI7XG5cbiAgdHlwZTogJ3ZlY3RvcicgPSAndmVjdG9yJzsgLy8gSnVzdCB0byBtYWtlIHRzIGhhcHB5XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICB0aWxlczogdGhpcy50aWxlcyxcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRpbGVzICYmICFjaGFuZ2VzLnRpbGVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWRlb1NvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC12aWRlby1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgVmlkZW9Tb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1cmxzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgY29vcmRpbmF0ZXM6IG51bWJlcltdW107XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgICAgdXJsczogdGhpcy51cmxzLFxuICAgICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlc1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy51cmxzICYmICFjaGFuZ2VzLnVybHMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNvb3JkaW5hdGVzICYmICFjaGFuZ2VzLmNvb3JkaW5hdGVzLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvYXR0cmlidXRpb24tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC9jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9mdWxsc2NyZWVuLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSwgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkgfSBmcm9tICcuL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9nZW9sb2NhdGUtY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvbmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY2FsZUNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvc2NhbGUtY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnZ2FibGUvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2UvaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IExheWVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwQ29tcG9uZW50IH0gZnJvbSAnLi9tYXAvbWFwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNQVBCT1hfQVBJX0tFWSB9IGZyb20gJy4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENsdXN0ZXJQb2ludERpcmVjdGl2ZSwgTWFya2VyQ2x1c3RlckNvbXBvbmVudCwgUG9pbnREaXJlY3RpdmUgfSBmcm9tICcuL21hcmtlci1jbHVzdGVyL21hcmtlci1jbHVzdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9wb3B1cC9wb3B1cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvY2FudmFzLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2dlb2pzb24vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvaW1hZ2Utc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYXN0ZXJTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9yYXN0ZXItc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZWN0b3JTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS92ZWN0b3Itc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWRlb1NvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZpZGVvLXNvdXJjZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hcENvbXBvbmVudCxcbiAgICBMYXllckNvbXBvbmVudCxcbiAgICBEcmFnZ2FibGVEaXJlY3RpdmUsXG4gICAgSW1hZ2VDb21wb25lbnQsXG4gICAgVmVjdG9yU291cmNlQ29tcG9uZW50LFxuICAgIEdlb0pTT05Tb3VyY2VDb21wb25lbnQsXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxuICAgIFZpZGVvU291cmNlQ29tcG9uZW50LFxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBQb3B1cENvbXBvbmVudCxcbiAgICBDb250cm9sQ29tcG9uZW50LFxuICAgIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSxcbiAgICBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlLFxuICAgIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSxcbiAgICBTY2FsZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgUG9pbnREaXJlY3RpdmUsXG4gICAgQ2x1c3RlclBvaW50RGlyZWN0aXZlLFxuICAgIE1hcmtlckNsdXN0ZXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hcENvbXBvbmVudCxcbiAgICBMYXllckNvbXBvbmVudCxcbiAgICBEcmFnZ2FibGVEaXJlY3RpdmUsXG4gICAgSW1hZ2VDb21wb25lbnQsXG4gICAgVmVjdG9yU291cmNlQ29tcG9uZW50LFxuICAgIEdlb0pTT05Tb3VyY2VDb21wb25lbnQsXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxuICAgIFZpZGVvU291cmNlQ29tcG9uZW50LFxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBQb3B1cENvbXBvbmVudCxcbiAgICBDb250cm9sQ29tcG9uZW50LFxuICAgIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSxcbiAgICBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlLFxuICAgIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSxcbiAgICBTY2FsZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgUG9pbnREaXJlY3RpdmUsXG4gICAgQ2x1c3RlclBvaW50RGlyZWN0aXZlLFxuICAgIE1hcmtlckNsdXN0ZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXBib3hHTE1vZHVsZSB7XG4gIHN0YXRpYyB3aXRoQ29uZmlnKGNvbmZpZzogeyBhY2Nlc3NUb2tlbjogc3RyaW5nLCBnZW9jb2RlckFjY2Vzc1Rva2VuPzogc3RyaW5nIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1hcGJveEdMTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNQVBCT1hfQVBJX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLmFjY2Vzc1Rva2VuXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLmdlb2NvZGVyQWNjZXNzVG9rZW4gfHwgY29uZmlnLmFjY2Vzc1Rva2VuXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk1hcGJveEdsLlBvcHVwIiwiZmlsdGVyIiwiTWFwYm94R2wuTWFwIiwiTWFwU2VydmljZSIsIkNvbnRyb2xDb21wb25lbnQiLCJHZW9KU09OU291cmNlQ29tcG9uZW50IiwiTmdab25lIiwiRmVhdHVyZUNvbXBvbmVudCIsIk1hcmtlckNvbXBvbmVudCIsIkNoYW5nZURldGVjdG9yUmVmIiwiYmJveCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVNBLE1BQWEsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O0FBRWpFO0NBRUM7Ozs7Ozs7SUF1REMsWUFDVSxNQUM2QyxjQUFzQixFQUM5QyxxQkFBNEM7UUFGakUsU0FBSSxHQUFKLElBQUk7UUFDeUMsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFDOUMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjswQkFadEQsSUFBSSxZQUFZLEVBQVE7eUJBQ3pCLElBQUksWUFBWSxFQUFRO2dDQUNQLEVBQUU7aUNBQ0QsRUFBRTsrQkFDSyxFQUFFOzhCQUNKLEVBQUU7Z0NBQ1IsRUFBRTs0QkFDaEIsSUFBSSxZQUFZLEVBQUU7UUFPdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNqRDs7Ozs7SUFFRCxLQUFLLENBQUMsT0FBaUI7O1FBRXJCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7WUFFekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxXQUFXLElB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Q0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsSDtRQUNELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQTJCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUEyQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RIO1FBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBMkIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwSDtRQUNELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQTJCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUEyQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hIO1FBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBMkIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0SDtRQUNELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQTJCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUEyQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BIO1FBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFF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