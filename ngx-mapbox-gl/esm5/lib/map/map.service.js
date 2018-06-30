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
export var MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');
/**
 * @abstract
 */
var /**
 * @abstract
 */
MglResizeEventEmitter = /** @class */ (function () {
    function MglResizeEventEmitter() {
    }
    return MglResizeEventEmitter;
}());
/**
 * @abstract
 */
export { MglResizeEventEmitter };
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
/** @typedef {?} */
var AllSource;
export { AllSource };
/** @typedef {?} */
var MovingOptions;
export { MovingOptions };
var MapService = /** @class */ (function () {
    function MapService(zone, MAPBOX_API_KEY, MglResizeEventEmitter) {
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
    MapService.prototype.setup = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        // Need onStable to wait for a potential @angular/route transition to end
        this.zone.onStable.pipe(first()).subscribe(function () {
            // Workaround rollup issue
            // Workaround rollup issue
            _this.assign(MapboxGl, 'accessToken', options.accessToken || _this.MAPBOX_API_KEY);
            if (options.customMapboxApiUrl) {
                _this.assign(MapboxGl, 'config.API_URL', options.customMapboxApiUrl);
            }
            _this.createMap(options.mapOptions);
            _this.hookEvents(options.mapEvents);
            _this.mapEvents = options.mapEvents;
            _this.mapCreated.next(undefined);
            _this.mapCreated.complete();
        });
    };
    /**
     * @return {?}
     */
    MapService.prototype.destroyMap = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
        this.mapInstance.remove();
    };
    /**
     * @param {?} minZoom
     * @return {?}
     */
    MapService.prototype.updateMinZoom = /**
     * @param {?} minZoom
     * @return {?}
     */
    function (minZoom) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.setMinZoom(minZoom);
        });
    };
    /**
     * @param {?} maxZoom
     * @return {?}
     */
    MapService.prototype.updateMaxZoom = /**
     * @param {?} maxZoom
     * @return {?}
     */
    function (maxZoom) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.setMaxZoom(maxZoom);
        });
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MapService.prototype.updateScrollZoom = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            status ? _this.mapInstance.scrollZoom.enable() : _this.mapInstance.scrollZoom.disable();
        });
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MapService.prototype.updateDragRotate = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            status ? _this.mapInstance.dragRotate.enable() : _this.mapInstance.dragRotate.disable();
        });
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MapService.prototype.updateTouchZoomRotate = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            status ? _this.mapInstance.touchZoomRotate.enable() : _this.mapInstance.touchZoomRotate.disable();
        });
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MapService.prototype.updateDoubleClickZoom = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            status ? _this.mapInstance.doubleClickZoom.enable() : _this.mapInstance.doubleClickZoom.disable();
        });
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MapService.prototype.updateKeyboard = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            status ? _this.mapInstance.keyboard.enable() : _this.mapInstance.keyboard.disable();
        });
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MapService.prototype.updateDragPan = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            status ? _this.mapInstance.dragPan.enable() : _this.mapInstance.dragPan.disable();
        });
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MapService.prototype.updateBoxZoom = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            status ? _this.mapInstance.boxZoom.enable() : _this.mapInstance.boxZoom.disable();
        });
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MapService.prototype.updateStyle = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        // TODO Probably not so simple, write demo/tests
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.setStyle(style);
        });
    };
    /**
     * @param {?} maxBounds
     * @return {?}
     */
    MapService.prototype.updateMaxBounds = /**
     * @param {?} maxBounds
     * @return {?}
     */
    function (maxBounds) {
        var _this = this;
        // TODO Probably not so simple, write demo/tests
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.setMaxBounds(maxBounds);
        });
    };
    /**
     * @param {?} cursor
     * @return {?}
     */
    MapService.prototype.changeCanvasCursor = /**
     * @param {?} cursor
     * @return {?}
     */
    function (cursor) {
        /** @type {?} */
        var canvas = this.mapInstance.getCanvasContainer();
        canvas.style.cursor = cursor;
    };
    /**
     * @param {?=} pointOrBox
     * @param {?=} parameters
     * @return {?}
     */
    MapService.prototype.queryRenderedFeatures = /**
     * @param {?=} pointOrBox
     * @param {?=} parameters
     * @return {?}
     */
    function (pointOrBox, parameters) {
        return this.mapInstance.queryRenderedFeatures(pointOrBox, parameters);
    };
    /**
     * @param {?} center
     * @param {?=} options
     * @return {?}
     */
    MapService.prototype.panTo = /**
     * @param {?} center
     * @param {?=} options
     * @return {?}
     */
    function (center, options) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.panTo(center, options);
        });
    };
    /**
     * @param {?} movingMethod
     * @param {?=} movingOptions
     * @param {?=} zoom
     * @param {?=} center
     * @param {?=} bearing
     * @param {?=} pitch
     * @return {?}
     */
    MapService.prototype.move = /**
     * @param {?} movingMethod
     * @param {?=} movingOptions
     * @param {?=} zoom
     * @param {?=} center
     * @param {?=} bearing
     * @param {?=} pitch
     * @return {?}
     */
    function (movingMethod, movingOptions, zoom, center, bearing, pitch) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            (/** @type {?} */ (_this.mapInstance[movingMethod]))(tslib_1.__assign({}, movingOptions, { zoom: zoom ? zoom : _this.mapInstance.getZoom(), center: center ? center : _this.mapInstance.getCenter(), bearing: bearing ? bearing : _this.mapInstance.getBearing(), pitch: pitch ? pitch : _this.mapInstance.getPitch() }));
        });
    };
    /**
     * @param {?} layer
     * @param {?=} before
     * @return {?}
     */
    MapService.prototype.addLayer = /**
     * @param {?} layer
     * @param {?=} before
     * @return {?}
     */
    function (layer, before) {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            Object.keys(layer.layerOptions)
                .forEach(function (key) {
                /** @type {?} */
                var tkey = /** @type {?} */ (key);
                if (layer.layerOptions[tkey] === undefined) {
                    delete layer.layerOptions[tkey];
                }
            });
            _this.mapInstance.addLayer(layer.layerOptions, before);
            if (layer.layerEvents.click.observers.length) {
                _this.mapInstance.on('click', layer.layerOptions.id, function (evt) {
                    _this.zone.run(function () {
                        layer.layerEvents.click.emit(evt);
                    });
                });
            }
            if (layer.layerEvents.mouseEnter.observers.length) {
                _this.mapInstance.on('mouseenter', layer.layerOptions.id, function (evt) {
                    _this.zone.run(function () {
                        layer.layerEvents.mouseEnter.emit(evt);
                    });
                });
            }
            if (layer.layerEvents.mouseLeave.observers.length) {
                _this.mapInstance.on('mouseleave', layer.layerOptions.id, function (evt) {
                    _this.zone.run(function () {
                        layer.layerEvents.mouseLeave.emit(evt);
                    });
                });
            }
            if (layer.layerEvents.mouseMove.observers.length) {
                _this.mapInstance.on('mousemove', layer.layerOptions.id, function (evt) {
                    _this.zone.run(function () {
                        layer.layerEvents.mouseMove.emit(evt);
                    });
                });
            }
        });
    };
    /**
     * @param {?} layerId
     * @return {?}
     */
    MapService.prototype.removeLayer = /**
     * @param {?} layerId
     * @return {?}
     */
    function (layerId) {
        this.layerIdsToRemove.push(layerId);
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MapService.prototype.addMarker = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            marker.addTo(_this.mapInstance);
        });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MapService.prototype.removeMarker = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        this.markersToRemove.push(marker);
    };
    /**
     * @param {?} popup
     * @param {?} element
     * @return {?}
     */
    MapService.prototype.createPopup = /**
     * @param {?} popup
     * @param {?} element
     * @return {?}
     */
    function (popup, element) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            Object.keys(popup.popupOptions)
                .forEach(function (key) {
                return (/** @type {?} */ (popup.popupOptions))[key] === undefined && delete (/** @type {?} */ (popup.popupOptions))[key];
            });
            /** @type {?} */
            var popupInstance = new MapboxGl.Popup(popup.popupOptions);
            popupInstance.setDOMContent(element);
            if (popup.popupEvents.close.observers.length) {
                popupInstance.on('close', function () {
                    _this.zone.run(function () {
                        popup.popupEvents.close.emit();
                    });
                });
            }
            if (popup.popupEvents.open.observers.length) {
                popupInstance.on('open', function () {
                    _this.zone.run(function () {
                        popup.popupEvents.open.emit();
                    });
                });
            }
            return popupInstance;
        });
    };
    /**
     * @param {?} popup
     * @param {?} lngLat
     * @return {?}
     */
    MapService.prototype.addPopupToMap = /**
     * @param {?} popup
     * @param {?} lngLat
     * @return {?}
     */
    function (popup, lngLat) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            popup.setLngLat(lngLat);
            popup.addTo(_this.mapInstance);
        });
    };
    /**
     * @param {?} marker
     * @param {?} popup
     * @return {?}
     */
    MapService.prototype.addPopupToMarker = /**
     * @param {?} marker
     * @param {?} popup
     * @return {?}
     */
    function (marker, popup) {
        return this.zone.runOutsideAngular(function () {
            marker.setPopup(popup);
        });
    };
    /**
     * @param {?} popup
     * @return {?}
     */
    MapService.prototype.removePopupFromMap = /**
     * @param {?} popup
     * @return {?}
     */
    function (popup) {
        this.popupsToRemove.push(popup);
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MapService.prototype.removePopupFromMarker = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this.zone.runOutsideAngular(function () {
            marker.setPopup(undefined);
        });
    };
    /**
     * @param {?} control
     * @param {?=} position
     * @return {?}
     */
    MapService.prototype.addControl = /**
     * @param {?} control
     * @param {?=} position
     * @return {?}
     */
    function (control, position) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.addControl(/** @type {?} */ (control), position);
        });
    };
    /**
     * @param {?} control
     * @return {?}
     */
    MapService.prototype.removeControl = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.removeControl(/** @type {?} */ (control));
        });
    };
    /**
     * @param {?} imageId
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    MapService.prototype.loadAndAddImage = /**
     * @param {?} imageId
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    function (imageId, url, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.zone.runOutsideAngular(function () {
                        return new Promise(function (resolve, reject) {
                            _this.mapInstance.loadImage(url, function (error, image) {
                                if (error) {
                                    reject(error);
                                    return;
                                }
                                _this.addImage(imageId, image, options);
                                resolve();
                            });
                        });
                    })];
            });
        });
    };
    /**
     * @param {?} imageId
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    MapService.prototype.addImage = /**
     * @param {?} imageId
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    function (imageId, data, options) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.addImage(imageId, /** @type {?} */ (data), options);
        });
    };
    /**
     * @param {?} imageId
     * @return {?}
     */
    MapService.prototype.removeImage = /**
     * @param {?} imageId
     * @return {?}
     */
    function (imageId) {
        this.imageIdsToRemove.push(imageId);
    };
    /**
     * @param {?} sourceId
     * @param {?} source
     * @return {?}
     */
    MapService.prototype.addSource = /**
     * @param {?} sourceId
     * @param {?} source
     * @return {?}
     */
    function (sourceId, source) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            Object.keys(source)
                .forEach(function (key) {
                return (/** @type {?} */ (source))[key] === undefined && delete (/** @type {?} */ (source))[key];
            });
            _this.mapInstance.addSource(sourceId, /** @type {?} */ (source)); // Typings issue
        });
    };
    /**
     * @template T
     * @param {?} sourceId
     * @return {?}
     */
    MapService.prototype.getSource = /**
     * @template T
     * @param {?} sourceId
     * @return {?}
     */
    function (sourceId) {
        return /** @type {?} */ (/** @type {?} */ (this.mapInstance.getSource(sourceId)));
    };
    /**
     * @param {?} sourceId
     * @return {?}
     */
    MapService.prototype.removeSource = /**
     * @param {?} sourceId
     * @return {?}
     */
    function (sourceId) {
        this.sourceIdsToRemove.push(sourceId);
    };
    /**
     * @param {?} layerId
     * @param {?} paint
     * @return {?}
     */
    MapService.prototype.setAllLayerPaintProperty = /**
     * @param {?} layerId
     * @param {?} paint
     * @return {?}
     */
    function (layerId, paint) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            Object.keys(paint).forEach(function (key) {
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                _this.mapInstance.setPaintProperty(layerId, key, (/** @type {?} */ (paint))[key]);
            });
        });
    };
    /**
     * @param {?} layerId
     * @param {?} layout
     * @return {?}
     */
    MapService.prototype.setAllLayerLayoutProperty = /**
     * @param {?} layerId
     * @param {?} layout
     * @return {?}
     */
    function (layerId, layout) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            Object.keys(layout).forEach(function (key) {
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                // TODO Check for perf, setPaintProperty only on changed paint props maybe
                _this.mapInstance.setLayoutProperty(layerId, key, (/** @type {?} */ (layout))[key]);
            });
        });
    };
    /**
     * @param {?} layerId
     * @param {?} filter
     * @return {?}
     */
    MapService.prototype.setLayerFilter = /**
     * @param {?} layerId
     * @param {?} filter
     * @return {?}
     */
    function (layerId, filter) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.setFilter(layerId, filter);
        });
    };
    /**
     * @param {?} layerId
     * @param {?} beforeId
     * @return {?}
     */
    MapService.prototype.setLayerBefore = /**
     * @param {?} layerId
     * @param {?} beforeId
     * @return {?}
     */
    function (layerId, beforeId) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.moveLayer(layerId, beforeId);
        });
    };
    /**
     * @param {?} layerId
     * @param {?=} minZoom
     * @param {?=} maxZoom
     * @return {?}
     */
    MapService.prototype.setLayerZoomRange = /**
     * @param {?} layerId
     * @param {?=} minZoom
     * @param {?=} maxZoom
     * @return {?}
     */
    function (layerId, minZoom, maxZoom) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.setLayerZoomRange(layerId, minZoom ? minZoom : 0, maxZoom ? maxZoom : 20);
        });
    };
    /**
     * @param {?} bounds
     * @param {?=} options
     * @return {?}
     */
    MapService.prototype.fitBounds = /**
     * @param {?} bounds
     * @param {?=} options
     * @return {?}
     */
    function (bounds, options) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.fitBounds(bounds, options);
        });
    };
    /**
     * @return {?}
     */
    MapService.prototype.getCurrentViewportBbox = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canvas = this.mapInstance.getCanvas();
        /** @type {?} */
        var w = canvas.width;
        /** @type {?} */
        var h = canvas.height;
        /** @type {?} */
        var upLeft = this.mapInstance.unproject([0, 0]).toArray();
        /** @type {?} */
        var upRight = this.mapInstance.unproject([w, 0]).toArray();
        /** @type {?} */
        var downRight = this.mapInstance.unproject([w, h]).toArray();
        /** @type {?} */
        var downLeft = this.mapInstance.unproject([0, h]).toArray();
        return /** @type {?} */ (bbox(polygon([[upLeft, upRight, downRight, downLeft, upLeft]])));
    };
    /**
     * @return {?}
     */
    MapService.prototype.applyChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.removeLayers();
            _this.removeSources();
            _this.removeMarkers();
            _this.removePopups();
            _this.removeImages();
        });
    };
    /**
     * @param {?} options
     * @return {?}
     */
    MapService.prototype.createMap = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        NgZone.assertNotInAngularZone();
        Object.keys(options)
            .forEach(function (key) {
            /** @type {?} */
            var tkey = /** @type {?} */ (key);
            if (options[tkey] === undefined) {
                delete options[tkey];
            }
        });
        this.mapInstance = new MapboxGl.Map(options);
        /** @type {?} */
        var subChanges = this.zone.onMicrotaskEmpty
            .subscribe(function () { return _this.applyChanges(); });
        if (this.MglResizeEventEmitter) {
            /** @type {?} */
            var subResize = this.MglResizeEventEmitter.resizeEvent.subscribe(function () {
                _this.mapInstance.resize();
            });
            this.subscription.add(subResize);
        }
        this.subscription.add(subChanges);
    };
    /**
     * @return {?}
     */
    MapService.prototype.removeLayers = /**
     * @return {?}
     */
    function () {
        try {
            for (var _a = tslib_1.__values(this.layerIdsToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                var layerId = _b.value;
                this.mapInstance.off('click', layerId);
                this.mapInstance.off('mouseenter', layerId);
                this.mapInstance.off('mouseleave', layerId);
                this.mapInstance.off('mousemove', layerId);
                this.mapInstance.removeLayer(layerId);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.layerIdsToRemove = [];
        var e_1, _c;
    };
    /**
     * @return {?}
     */
    MapService.prototype.removeSources = /**
     * @return {?}
     */
    function () {
        try {
            for (var _a = tslib_1.__values(this.sourceIdsToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                var sourceId = _b.value;
                this.mapInstance.removeSource(sourceId);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.sourceIdsToRemove = [];
        var e_2, _c;
    };
    /**
     * @return {?}
     */
    MapService.prototype.removeMarkers = /**
     * @return {?}
     */
    function () {
        try {
            for (var _a = tslib_1.__values(this.markersToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                var marker = _b.value;
                marker.remove();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.markersToRemove = [];
        var e_3, _c;
    };
    /**
     * @return {?}
     */
    MapService.prototype.removePopups = /**
     * @return {?}
     */
    function () {
        try {
            for (var _a = tslib_1.__values(this.popupsToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                var popup = _b.value;
                popup.remove();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.popupsToRemove = [];
        var e_4, _c;
    };
    /**
     * @return {?}
     */
    MapService.prototype.removeImages = /**
     * @return {?}
     */
    function () {
        try {
            for (var _a = tslib_1.__values(this.imageIdsToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                var imageId = _b.value;
                this.mapInstance.removeImage(imageId);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.imageIdsToRemove = [];
        var e_5, _c;
    };
    /**
     * @param {?} events
     * @return {?}
     */
    MapService.prototype.hookEvents = /**
     * @param {?} events
     * @return {?}
     */
    function (events) {
        var _this = this;
        this.mapInstance.on('load', function () {
            _this.mapLoaded.next(undefined);
            _this.mapLoaded.complete();
            _this.zone.run(function () { return events.load.emit(_this.mapInstance); });
        });
        if (events.resize.observers.length) {
            this.mapInstance.on('resize', function () { return _this.zone.run(function () { return events.resize.emit(); }); });
        }
        if (events.remove.observers.length) {
            this.mapInstance.on('remove', function () { return _this.zone.run(function () { return events.remove.emit(); }); });
        }
        if (events.mouseDown.observers.length) {
            this.mapInstance.on('mousedown', function (evt) { return _this.zone.run(function () { return events.mouseDown.emit(evt); }); });
        }
        if (events.mouseUp.observers.length) {
            this.mapInstance.on('mouseup', function (evt) { return _this.zone.run(function () { return events.mouseUp.emit(evt); }); });
        }
        if (events.mouseMove.observers.length) {
            this.mapInstance.on('mousemove', function (evt) { return _this.zone.run(function () { return events.mouseMove.emit(evt); }); });
        }
        if (events.click.observers.length) {
            this.mapInstance.on('click', function (evt) { return _this.zone.run(function () { return events.click.emit(evt); }); });
        }
        if (events.dblClick.observers.length) {
            this.mapInstance.on('dblclick', function (evt) { return _this.zone.run(function () { return events.dblClick.emit(evt); }); });
        }
        if (events.mouseEnter.observers.length) {
            this.mapInstance.on('mouseenter', function (evt) { return _this.zone.run(function () { return events.mouseEnter.emit(evt); }); });
        }
        if (events.mouseLeave.observers.length) {
            this.mapInstance.on('mouseleave', function (evt) { return _this.zone.run(function () { return events.mouseLeave.emit(evt); }); });
        }
        if (events.mouseOver.observers.length) {
            this.mapInstance.on('mouseover', function (evt) { return _this.zone.run(function () { return events.mouseOver.emit(evt); }); });
        }
        if (events.mouseOut.observers.length) {
            this.mapInstance.on('mouseout', function (evt) { return _this.zone.run(function () { return events.mouseOut.emit(evt); }); });
        }
        if (events.contextMenu.observers.length) {
            this.mapInstance.on('contextmenu', function (evt) { return _this.zone.run(function () { return events.contextMenu.emit(evt); }); });
        }
        if (events.touchStart.observers.length) {
            this.mapInstance.on('touchstart', function (evt) { return _this.zone.run(function () { return events.touchStart.emit(evt); }); });
        }
        if (events.touchEnd.observers.length) {
            this.mapInstance.on('touchend', function (evt) { return _this.zone.run(function () { return events.touchEnd.emit(evt); }); });
        }
        if (events.touchMove.observers.length) {
            this.mapInstance.on('touchmove', function (evt) { return _this.zone.run(function () { return events.touchMove.emit(evt); }); });
        }
        if (events.touchCancel.observers.length) {
            this.mapInstance.on('touchcancel', function (evt) { return _this.zone.run(function () { return events.touchCancel.emit(evt); }); });
        }
        if (events.wheel.observers.length) {
            // MapboxGl.MapWheelEvent
            this.mapInstance.on('wheel', function (evt) { return _this.zone.run(function () { return events.wheel.emit(evt); }); });
        }
        if (events.moveStart.observers.length) {
            this.mapInstance.on('movestart', function (evt) { return _this.zone.run(function () { return events.moveStart.emit(evt); }); });
        }
        if (events.move.observers.length) {
            this.mapInstance.on('move', function (evt) { return _this.zone.run(function () { return events.move.emit(evt); }); });
        }
        if (events.moveEnd.observers.length) {
            this.mapInstance.on('moveend', function (evt) { return _this.zone.run(function () { return events.moveEnd.emit(evt); }); });
        }
        if (events.dragStart.observers.length) {
            this.mapInstance.on('dragstart', function (evt) { return _this.zone.run(function () { return events.dragStart.emit(evt); }); });
        }
        if (events.drag.observers.length) {
            this.mapInstance.on('drag', function (evt) { return _this.zone.run(function () { return events.drag.emit(evt); }); });
        }
        if (events.dragEnd.observers.length) {
            this.mapInstance.on('dragend', function (evt) { return _this.zone.run(function () { return events.dragEnd.emit(evt); }); });
        }
        if (events.zoomStart.observers.length) {
            this.mapInstance.on('zoomstart', function (evt) { return _this.zone.run(function () {
                return events.zoomStart.emit(evt);
            }); });
        }
        if (events.zoomEvt.observers.length) {
            this.mapInstance.on('zoom', function (evt) { return _this.zone.run(function () { return events.zoomEvt.emit(evt); }); });
        }
        if (events.zoomEnd.observers.length) {
            this.mapInstance.on('zoomend', function (evt) { return _this.zone.run(function () {
                return events.zoomEnd.emit(evt);
            }); });
        }
        if (events.rotateStart.observers.length) {
            this.mapInstance.on('rotatestart', function (evt) { return _this.zone.run(function () {
                return events.rotateStart.emit(evt);
            }); });
        }
        if (events.rotate.observers.length) {
            this.mapInstance.on('rotate', function (evt) { return _this.zone.run(function () { return events.rotate.emit(evt); }); });
        }
        if (events.rotateEnd.observers.length) {
            this.mapInstance.on('rotateend', function (evt) { return _this.zone.run(function () {
                return events.rotateEnd.emit(evt);
            }); });
        }
        if (events.pitchStart.observers.length) {
            this.mapInstance.on('pitchstart', function (evt) { return _this.zone.run(function () { return events.pitchStart.emit(evt); }); });
        }
        if (events.pitchEvt.observers.length) {
            this.mapInstance.on('pitch', function (evt) { return _this.zone.run(function () { return events.pitchEvt.emit(evt); }); });
        }
        if (events.pitchEnd.observers.length) {
            this.mapInstance.on('pitchend', function (evt) { return _this.zone.run(function () { return events.pitchEnd.emit(evt); }); });
        }
        if (events.boxZoomStart.observers.length) {
            this.mapInstance.on('boxzoomstart', function (evt) { return _this.zone.run(function () { return events.boxZoomStart.emit(evt); }); });
        }
        if (events.boxZoomEnd.observers.length) {
            this.mapInstance.on('boxzoomend', function (evt) { return _this.zone.run(function () { return events.boxZoomEnd.emit(evt); }); });
        }
        if (events.boxZoomCancel.observers.length) {
            this.mapInstance.on('boxzoomcancel', function (evt) { return _this.zone.run(function () { return events.boxZoomCancel.emit(evt); }); });
        }
        if (events.webGlContextLost.observers.length) {
            this.mapInstance.on('webglcontextlost', function () { return _this.zone.run(function () { return events.webGlContextLost.emit(); }); });
        }
        if (events.webGlContextRestored.observers.length) {
            this.mapInstance.on('webglcontextrestored', function () { return _this.zone.run(function () { return events.webGlContextRestored.emit(); }); });
        }
        if (events.render.observers.length) {
            this.mapInstance.on('render', function () { return _this.zone.run(function () { return events.render.emit(); }); });
        }
        if (events.error.observers.length) {
            this.mapInstance.on('error', function () { return _this.zone.run(function () { return events.error.emit(); }); });
        }
        if (events.data.observers.length) {
            this.mapInstance.on('data', function (evt) { return _this.zone.run(function () { return events.data.emit(evt); }); });
        }
        if (events.styleData.observers.length) {
            this.mapInstance.on('styledata', function (evt) { return _this.zone.run(function () { return events.styleData.emit(evt); }); });
        }
        if (events.sourceData.observers.length) {
            this.mapInstance.on('sourcedata', function (evt) { return _this.zone.run(function () { return events.sourceData.emit(evt); }); });
        }
        if (events.dataLoading.observers.length) {
            this.mapInstance.on('dataloading', function (evt) { return _this.zone.run(function () { return events.dataLoading.emit(evt); }); });
        }
        if (events.styleDataLoading.observers.length) {
            this.mapInstance.on('styledataloading', function (evt) { return _this.zone.run(function () { return events.styleDataLoading.emit(evt); }); });
        }
        if (events.sourceDataLoading.observers.length) {
            this.mapInstance.on('sourcedataloading', function (evt) { return _this.zone.run(function () { return events.sourceDataLoading.emit(evt); }); });
        }
    };
    /**
     * @param {?} obj
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    MapService.prototype.assign = /**
     * @param {?} obj
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    function (obj, prop, value) {
        if (typeof prop === 'string') {
            // tslint:disable-next-line:no-parameter-reassignment
            prop = prop.split('.');
        }
        if (prop.length > 1) {
            /** @type {?} */
            var e = prop.shift();
            this.assign(obj[e] =
                Object.prototype.toString.call(obj[e]) === '[object Object]'
                    ? obj[e]
                    : {}, prop, value);
        }
        else {
            obj[prop[0]] = value;
        }
    };
    MapService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MapService.ctorParameters = function () { return [
        { type: NgZone },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAPBOX_API_KEY,] }] },
        { type: MglResizeEventEmitter, decorators: [{ type: Optional }] }
    ]; };
    return MapService;
}());
export { MapService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL21hcC9tYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBZ0IsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFDOUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBSXZDLFdBQWEsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O0FBRWpFOzs7QUFBQTs7O2dDQVhBO0lBYUMsQ0FBQTs7OztBQUZELGlDQUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdURDLG9CQUNVLE1BQzZDLGNBQXNCLEVBQzlDLHFCQUE0QztRQUZqRSxTQUFJLEdBQUosSUFBSTtRQUN5QyxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUM5QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCOzBCQVp0RCxJQUFJLFlBQVksRUFBUTt5QkFDekIsSUFBSSxZQUFZLEVBQVE7Z0NBQ1AsRUFBRTtpQ0FDRCxFQUFFOytCQUNLLEVBQUU7OEJBQ0osRUFBRTtnQ0FDUixFQUFFOzRCQUNoQixJQUFJLFlBQVksRUFBRTtRQU92QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxD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QUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3BCLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxpQkFBaUI7b0JBQzFELENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNSLENBQUMsQ0FBQyxFQUFFLEVBQ04sSUFBSSxFQUNKLEtBQUssQ0FBQyxDQUFDO1NBQ1Y7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDdEI7OztnQkFybUJKLFVBQVU7Ozs7Z0JBcERnRCxNQUFNOzZDQXNFNUQsUUFBUSxZQUFJLE1BQU0sU0FBQyxjQUFjO2dCQUNrQixxQkFBcUIsdUJBQXhFLFFBQVE7O3FCQXZFYjs7U0FxRGEsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGJib3ggZnJvbSAnQHR1cmYvYmJveCc7XG5pbXBvcnQgeyBwb2x5Z29uIH0gZnJvbSAnQHR1cmYvaGVscGVycyc7XG5pbXBvcnQgKiBhcyBNYXBib3hHbCBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgQXN5bmNTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQkJveCB9IGZyb20gJ3N1cGVyY2x1c3Rlcic7XG5pbXBvcnQgeyBNYXBFdmVudCwgTWFwSW1hZ2VEYXRhLCBNYXBJbWFnZU9wdGlvbnMgfSBmcm9tICcuL21hcC50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBNQVBCT1hfQVBJX0tFWSA9IG5ldyBJbmplY3Rpb25Ub2tlbignTWFwYm94QXBpS2V5Jyk7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZ2xSZXNpemVFdmVudEVtaXR0ZXIge1xuICBhYnN0cmFjdCByZXNpemVFdmVudDogT2JzZXJ2YWJsZTx2b2lkPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cE1hcCB7XG4gIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBjdXN0b21NYXBib3hBcGlVcmw/OiBzdHJpbmc7XG4gIG1hcE9wdGlvbnM6IGFueTsgLy8gTWFwYm94R2wuTWFwYm94T3B0aW9uc1xuICBtYXBFdmVudHM6IE1hcEV2ZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTGF5ZXIge1xuICBsYXllck9wdGlvbnM6IE1hcGJveEdsLkxheWVyO1xuICBsYXllckV2ZW50czoge1xuICAgIGNsaWNrOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gICAgbW91c2VFbnRlcjogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICAgIG1vdXNlTGVhdmU6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgICBtb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cFBvcHVwIHtcbiAgcG9wdXBPcHRpb25zOiBNYXBib3hHbC5Qb3B1cE9wdGlvbnM7XG4gIHBvcHVwRXZlbnRzOiB7XG4gICAgb3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIGNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIEFsbFNvdXJjZSA9IE1hcGJveEdsLlZlY3RvclNvdXJjZSB8XG4gIE1hcGJveEdsLlJhc3RlclNvdXJjZSB8XG4gIE1hcGJveEdsLkdlb0pTT05Tb3VyY2UgfFxuICBNYXBib3hHbC5JbWFnZVNvdXJjZU9wdGlvbnMgfFxuICBNYXBib3hHbC5WaWRlb1NvdXJjZSB8XG4gIE1hcGJveEdsLkdlb0pTT05Tb3VyY2VSYXcgfFxuICBNYXBib3hHbC5DYW52YXNTb3VyY2VPcHRpb25zO1xuXG5leHBvcnQgdHlwZSBNb3ZpbmdPcHRpb25zID0gTWFwYm94R2wuRmx5VG9PcHRpb25zIHxcbiAgKE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMgJiBNYXBib3hHbC5DYW1lcmFPcHRpb25zKSB8XG4gIE1hcGJveEdsLkNhbWVyYU9wdGlvbnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcbiAgbWFwSW5zdGFuY2U6IE1hcGJveEdsLk1hcDtcbiAgbWFwQ3JlYXRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcExvYWRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcEV2ZW50czogTWFwRXZlbnQ7XG5cbiAgcHJpdmF0ZSBtYXBDcmVhdGVkID0gbmV3IEFzeW5jU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIG1hcExvYWRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsYXllcklkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHNvdXJjZUlkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIG1hcmtlcnNUb1JlbW92ZTogTWFwYm94R2wuTWFya2VyW10gPSBbXTtcbiAgcHJpdmF0ZSBwb3B1cHNUb1JlbW92ZTogTWFwYm94R2wuUG9wdXBbXSA9IFtdO1xuICBwcml2YXRlIGltYWdlSWRzVG9SZW1vdmU6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFQQk9YX0FQSV9LRVkpIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0FQSV9LRVk6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IE1nbFJlc2l6ZUV2ZW50RW1pdHRlcjogTWdsUmVzaXplRXZlbnRFbWl0dGVyXG4gICkge1xuICAgIHRoaXMubWFwQ3JlYXRlZCQgPSB0aGlzLm1hcENyZWF0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYXBMb2FkZWQkID0gdGhpcy5tYXBMb2FkZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXR1cChvcHRpb25zOiBTZXR1cE1hcCkge1xuICAgIC8vIE5lZWQgb25TdGFibGUgdG8gd2FpdCBmb3IgYSBwb3RlbnRpYWwgQGFuZ3VsYXIvcm91dGUgdHJhbnNpdGlvbiB0byBlbmRcbiAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgLy8gV29ya2Fyb3VuZCByb2xsdXAgaXNzdWVcbiAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnYWNjZXNzVG9rZW4nLCBvcHRpb25zLmFjY2Vzc1Rva2VuIHx8IHRoaXMuTUFQQk9YX0FQSV9LRVkpO1xuICAgICAgaWYgKG9wdGlvbnMuY3VzdG9tTWFwYm94QXBpVXJsKSB7XG4gICAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnY29uZmlnLkFQSV9VUkwnLCBvcHRpb25zLmN1c3RvbU1hcGJveEFwaVVybCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNyZWF0ZU1hcChvcHRpb25zLm1hcE9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKG9wdGlvbnMubWFwRXZlbnRzKTtcbiAgICAgIHRoaXMubWFwRXZlbnRzID0gb3B0aW9ucy5tYXBFdmVudHM7XG4gICAgICB0aGlzLm1hcENyZWF0ZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBDcmVhdGVkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95TWFwKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pblpvb20obWluWm9vbTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1pblpvb20obWluWm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVNYXhab29tKG1heFpvb206IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhab29tKG1heFpvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU2Nyb2xsWm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEcmFnUm90YXRlKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS50b3VjaFpvb21Sb3RhdGUuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRG91YmxlQ2xpY2tab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVLZXlib2FyZChzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURyYWdQYW4oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQm94Wm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdHlsZShzdHlsZTogTWFwYm94R2wuU3R5bGUpIHtcbiAgICAvLyBUT0RPIFByb2JhYmx5IG5vdCBzbyBzaW1wbGUsIHdyaXRlIGRlbW8vdGVzdHNcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4Qm91bmRzKG1heEJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSkge1xuICAgIC8vIFRPRE8gUHJvYmFibHkgbm90IHNvIHNpbXBsZSwgd3JpdGUgZGVtby90ZXN0c1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhCb3VuZHMobWF4Qm91bmRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUNhbnZhc0N1cnNvcihjdXJzb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzQ29udGFpbmVyKCk7XG4gICAgY2FudmFzLnN0eWxlLmN1cnNvciA9IGN1cnNvcjtcbiAgfVxuXG4gIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhcbiAgICBwb2ludE9yQm94PzogTWFwYm94R2wuUG9pbnRMaWtlIHwgTWFwYm94R2wuUG9pbnRMaWtlW10sXG4gICAgcGFyYW1ldGVycz86IHsgbGF5ZXJzPzogc3RyaW5nW10sIGZpbHRlcj86IGFueVtdIH1cbiAgKTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+W10ge1xuICAgIHJldHVybiB0aGlzLm1hcEluc3RhbmNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhwb2ludE9yQm94LCBwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHBhblRvKGNlbnRlcjogTWFwYm94R2wuTG5nTGF0TGlrZSwgb3B0aW9ucz86IE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucGFuVG8oY2VudGVyLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmUoXG4gICAgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyxcbiAgICBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucyxcbiAgICB6b29tPzogbnVtYmVyLFxuICAgIGNlbnRlcj86IE1hcGJveEdsLkxuZ0xhdExpa2UsXG4gICAgYmVhcmluZz86IG51bWJlcixcbiAgICBwaXRjaD86IG51bWJlclxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICg8YW55PnRoaXMubWFwSW5zdGFuY2VbbW92aW5nTWV0aG9kXSkoe1xuICAgICAgICAuLi5tb3ZpbmdPcHRpb25zLFxuICAgICAgICB6b29tOiB6b29tID8gem9vbSA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpLFxuICAgICAgICBjZW50ZXI6IGNlbnRlciA/IGNlbnRlciA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2VudGVyKCksXG4gICAgICAgIGJlYXJpbmc6IGJlYXJpbmcgPyBiZWFyaW5nIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRCZWFyaW5nKCksXG4gICAgICAgIHBpdGNoOiBwaXRjaCA/IHBpdGNoIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRQaXRjaCgpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZExheWVyKGxheWVyOiBTZXR1cExheWVyLCBiZWZvcmU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMobGF5ZXIubGF5ZXJPcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIE1hcGJveEdsLkxheWVyPmtleTtcbiAgICAgICAgICBpZiAobGF5ZXIubGF5ZXJPcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsYXllci5sYXllck9wdGlvbnNbdGtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkTGF5ZXIobGF5ZXIubGF5ZXJPcHRpb25zLCBiZWZvcmUpO1xuICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY2xpY2snLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubW91c2VFbnRlci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZW50ZXInLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlRW50ZXIuZW1pdChldnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5tb3VzZUxlYXZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VMZWF2ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbW92ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVMYXllcihsYXllcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUucHVzaChsYXllcklkKTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLmFkZFRvKHRoaXMubWFwSW5zdGFuY2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFwYm94R2wuTWFya2VyKSB7XG4gICAgdGhpcy5tYXJrZXJzVG9SZW1vdmUucHVzaChtYXJrZXIpO1xuICB9XG5cbiAgY3JlYXRlUG9wdXAocG9wdXA6IFNldHVwUG9wdXAsIGVsZW1lbnQ6IE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBvcHVwLnBvcHVwT3B0aW9ucylcbiAgICAgICAgLmZvckVhY2goKGtleSkgPT5cbiAgICAgICAgICAoPGFueT5wb3B1cC5wb3B1cE9wdGlvbnMpW2tleV0gPT09IHVuZGVmaW5lZCAmJiBkZWxldGUgKDxhbnk+cG9wdXAucG9wdXBPcHRpb25zKVtrZXldKTtcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2UgPSBuZXcgTWFwYm94R2wuUG9wdXAocG9wdXAucG9wdXBPcHRpb25zKTtcbiAgICAgIHBvcHVwSW5zdGFuY2Uuc2V0RE9NQ29udGVudChlbGVtZW50KTtcbiAgICAgIGlmIChwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMuY2xvc2UuZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3B1cC5wb3B1cEV2ZW50cy5vcGVuLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9wdXBJbnN0YW5jZS5vbignb3BlbicsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLm9wZW4uZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb3B1cEluc3RhbmNlO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkUG9wdXBUb01hcChwb3B1cDogTWFwYm94R2wuUG9wdXAsIGxuZ0xhdDogTWFwYm94R2wuTG5nTGF0TGlrZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcG9wdXAuc2V0TG5nTGF0KGxuZ0xhdCk7XG4gICAgICBwb3B1cC5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIsIHBvcHVwOiBNYXBib3hHbC5Qb3B1cCkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHBvcHVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcChwb3B1cDogTWFwYm94R2wuUG9wdXApIHtcbiAgICB0aGlzLnBvcHVwc1RvUmVtb3ZlLnB1c2gocG9wdXApO1xuICB9XG5cbiAgcmVtb3ZlUG9wdXBGcm9tTWFya2VyKG1hcmtlcjogTWFwYm94R2wuTWFya2VyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBtYXJrZXIuc2V0UG9wdXAodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvbnRyb2woY29udHJvbDogTWFwYm94R2wuQ29udHJvbCB8IE1hcGJveEdsLklDb250cm9sLCBwb3NpdGlvbj86ICd0b3AtcmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICdib3R0b20tcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0Jykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRDb250cm9sKDxhbnk+Y29udHJvbCwgcG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ29udHJvbChjb250cm9sOiBNYXBib3hHbC5Db250cm9sIHwgTWFwYm94R2wuSUNvbnRyb2wpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlQ29udHJvbCg8YW55PmNvbnRyb2wpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZEFkZEltYWdlKGltYWdlSWQ6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2UubG9hZEltYWdlKHVybCwgKGVycm9yOiB7IHN0YXR1czogbnVtYmVyIH0gfCBudWxsLCBpbWFnZTogSW1hZ2VEYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEltYWdlKGltYWdlSWQsIGltYWdlLCBvcHRpb25zKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJbWFnZShpbWFnZUlkOiBzdHJpbmcsIGRhdGE6IE1hcEltYWdlRGF0YSwgb3B0aW9ucz86IE1hcEltYWdlT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRJbWFnZShpbWFnZUlkLCA8YW55PmRhdGEsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlSW1hZ2UoaW1hZ2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlLnB1c2goaW1hZ2VJZCk7XG4gIH1cblxuICBhZGRTb3VyY2Uoc291cmNlSWQ6IHN0cmluZywgc291cmNlOiBBbGxTb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSlcbiAgICAgICAgLmZvckVhY2goKGtleSkgPT5cbiAgICAgICAgICAoPGFueT5zb3VyY2UpW2tleV0gPT09IHVuZGVmaW5lZCAmJiBkZWxldGUgKDxhbnk+c291cmNlKVtrZXldKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkU291cmNlKHNvdXJjZUlkLCA8YW55PnNvdXJjZSk7IC8vIFR5cGluZ3MgaXNzdWVcbiAgICB9KTtcbiAgfVxuXG4gIGdldFNvdXJjZTxUPihzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIDxUPjxhbnk+dGhpcy5tYXBJbnN0YW5jZS5nZXRTb3VyY2Uoc291cmNlSWQpO1xuICB9XG5cbiAgcmVtb3ZlU291cmNlKHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvdXJjZUlkc1RvUmVtb3ZlLnB1c2goc291cmNlSWQpO1xuICB9XG5cbiAgc2V0QWxsTGF5ZXJQYWludFByb3BlcnR5KFxuICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICBwYWludDogTWFwYm94R2wuQmFja2dyb3VuZFBhaW50IHxcbiAgICAgIE1hcGJveEdsLkZpbGxQYWludCB8XG4gICAgICBNYXBib3hHbC5GaWxsRXh0cnVzaW9uUGFpbnQgfFxuICAgICAgTWFwYm94R2wuTGluZVBhaW50IHxcbiAgICAgIE1hcGJveEdsLlN5bWJvbFBhaW50IHxcbiAgICAgIE1hcGJveEdsLlJhc3RlclBhaW50IHxcbiAgICAgIE1hcGJveEdsLkNpcmNsZVBhaW50XG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocGFpbnQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFBhaW50UHJvcGVydHkobGF5ZXJJZCwga2V5LCAoPGFueT5wYWludClba2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEFsbExheWVyTGF5b3V0UHJvcGVydHkoXG4gICAgbGF5ZXJJZDogc3RyaW5nLFxuICAgIGxheW91dDogTWFwYm94R2wuQmFja2dyb3VuZExheW91dCB8XG4gICAgICBNYXBib3hHbC5GaWxsTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkZpbGxFeHRydXNpb25MYXlvdXQgfFxuICAgICAgTWFwYm94R2wuTGluZUxheW91dCB8XG4gICAgICBNYXBib3hHbC5TeW1ib2xMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuUmFzdGVyTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkNpcmNsZUxheW91dFxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGxheW91dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIHBlcmYsIHNldFBhaW50UHJvcGVydHkgb25seSBvbiBjaGFuZ2VkIHBhaW50IHByb3BzIG1heWJlXG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TGF5b3V0UHJvcGVydHkobGF5ZXJJZCwga2V5LCAoPGFueT5sYXlvdXQpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckZpbHRlcihsYXllcklkOiBzdHJpbmcsIGZpbHRlcjogYW55W10pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0RmlsdGVyKGxheWVySWQsIGZpbHRlcik7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckJlZm9yZShsYXllcklkOiBzdHJpbmcsIGJlZm9yZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UubW92ZUxheWVyKGxheWVySWQsIGJlZm9yZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyWm9vbVJhbmdlKGxheWVySWQ6IHN0cmluZywgbWluWm9vbT86IG51bWJlciwgbWF4Wm9vbT86IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRMYXllclpvb21SYW5nZShsYXllcklkLCBtaW5ab29tID8gbWluWm9vbSA6IDAsIG1heFpvb20gPyBtYXhab29tIDogMjApO1xuICAgIH0pO1xuICB9XG5cbiAgZml0Qm91bmRzKGJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSwgb3B0aW9ucz86IGFueSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5maXRCb3VuZHMoYm91bmRzLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRWaWV3cG9ydEJib3goKTogQkJveCB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tYXBJbnN0YW5jZS5nZXRDYW52YXMoKTtcbiAgICBjb25zdCB3ID0gY2FudmFzLndpZHRoO1xuICAgIGNvbnN0IGggPSBjYW52YXMuaGVpZ2h0O1xuICAgIGNvbnN0IHVwTGVmdCA9IHRoaXMubWFwSW5zdGFuY2UudW5wcm9qZWN0KFswLCAwXSkudG9BcnJheSgpO1xuICAgIGNvbnN0IHVwUmlnaHQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbdywgMF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCBkb3duUmlnaHQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbdywgaF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCBkb3duTGVmdCA9IHRoaXMubWFwSW5zdGFuY2UudW5wcm9qZWN0KFswLCBoXSkudG9BcnJheSgpO1xuICAgIHJldHVybiA8YW55PmJib3gocG9seWdvbihbW3VwTGVmdCwgdXBSaWdodCwgZG93blJpZ2h0LCBkb3duTGVmdCwgdXBMZWZ0XV0pKTtcbiAgfVxuXG4gIGFwcGx5Q2hhbmdlcygpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVMYXllcnMoKTtcbiAgICAgIHRoaXMucmVtb3ZlU291cmNlcygpO1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJzKCk7XG4gICAgICB0aGlzLnJlbW92ZVBvcHVwcygpO1xuICAgICAgdGhpcy5yZW1vdmVJbWFnZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFwKG9wdGlvbnM6IE1hcGJveEdsLk1hcGJveE9wdGlvbnMpIHtcbiAgICBOZ1pvbmUuYXNzZXJ0Tm90SW5Bbmd1bGFyWm9uZSgpO1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiBNYXBib3hHbC5NYXBib3hPcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLm1hcEluc3RhbmNlID0gbmV3IE1hcGJveEdsLk1hcChvcHRpb25zKTtcbiAgICBjb25zdCBzdWJDaGFuZ2VzID0gdGhpcy56b25lLm9uTWljcm90YXNrRW1wdHlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hcHBseUNoYW5nZXMoKSk7XG4gICAgaWYgKHRoaXMuTWdsUmVzaXplRXZlbnRFbWl0dGVyKSB7XG4gICAgICBjb25zdCBzdWJSZXNpemUgPSB0aGlzLk1nbFJlc2l6ZUV2ZW50RW1pdHRlci5yZXNpemVFdmVudC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnJlc2l6ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoc3ViUmVzaXplKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1YkNoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMYXllcnMoKSB7XG4gICAgZm9yIChjb25zdCBsYXllcklkIG9mIHRoaXMubGF5ZXJJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ2NsaWNrJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignbW91c2VlbnRlcicsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ21vdXNlbGVhdmUnLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdtb3VzZW1vdmUnLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlTGF5ZXIobGF5ZXJJZCk7XG4gICAgfVxuICAgIHRoaXMubGF5ZXJJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVTb3VyY2VzKCkge1xuICAgIGZvciAoY29uc3Qgc291cmNlSWQgb2YgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVTb3VyY2Uoc291cmNlSWQpO1xuICAgIH1cbiAgICB0aGlzLnNvdXJjZUlkc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU1hcmtlcnMoKSB7XG4gICAgZm9yIChjb25zdCBtYXJrZXIgb2YgdGhpcy5tYXJrZXJzVG9SZW1vdmUpIHtcbiAgICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5tYXJrZXJzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUG9wdXBzKCkge1xuICAgIGZvciAoY29uc3QgcG9wdXAgb2YgdGhpcy5wb3B1cHNUb1JlbW92ZSkge1xuICAgICAgcG9wdXAucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMucG9wdXBzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlSW1hZ2VzKCkge1xuICAgIGZvciAoY29uc3QgaW1hZ2VJZCBvZiB0aGlzLmltYWdlSWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlSW1hZ2UoaW1hZ2VJZCk7XG4gICAgfVxuICAgIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGV2ZW50czogTWFwRXZlbnQpIHtcbiAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdsb2FkJywgKCkgPT4ge1xuICAgICAgdGhpcy5tYXBMb2FkZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBMb2FkZWQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmxvYWQuZW1pdCh0aGlzLm1hcEluc3RhbmNlKSk7XG4gICAgfSk7XG4gICAgaWYgKGV2ZW50cy5yZXNpemUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVzaXplJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVzaXplLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlbW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW1vdmUnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZW1vdmUuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VEb3duLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZG93bicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlRG93bi5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZVVwLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNldXAnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZVVwLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW1vdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZU1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY2xpY2snLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jbGljay5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYmxDbGljay5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYmxjbGljaycsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRibENsaWNrLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlRW50ZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VlbnRlcicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlRW50ZXIuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VMZWF2ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWxlYXZlJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VMZWF2ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU92ZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VvdmVyJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VPdmVyLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlT3V0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3V0JywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VPdXQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY29udGV4dE1lbnUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY29udGV4dG1lbnUnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jb250ZXh0TWVudS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaFN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaFN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoZW5kJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hNb3ZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNobW92ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoTW92ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaENhbmNlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGNhbmNlbCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoQ2FuY2VsLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndoZWVsLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIC8vIE1hcGJveEdsLk1hcFdoZWVsRXZlbnRcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3doZWVsJywgKGV2dDogYW55KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53aGVlbC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3ZlU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZXN0YXJ0JywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3ZlJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3ZlZW5kJywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRyYWdTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnc3RhcnQnLCAoZXZ0OiBEcmFnRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWdTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWcnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZHJhZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZ0OiBEcmFnRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWdFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb21zdGFydCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy56b29tU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbUV2dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnpvb21FdnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tZW5kJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnpvb21FbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMucm90YXRlU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yb3RhdGUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy5yb3RhdGVFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaHN0YXJ0JywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaFN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoRXZ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaEV2dC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaEVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaGVuZCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21zdGFydCcsIChldnQ6IE1hcGJveEdsLk1hcEJveFpvb21FdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21FbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcEJveFpvb21FdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tQ2FuY2VsLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21jYW5jZWwnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21DYW5jZWwuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMud2ViR2xDb250ZXh0TG9zdC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRsb3N0JywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2ViR2xDb250ZXh0TG9zdC5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53ZWJHbENvbnRleHRSZXN0b3JlZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRyZXN0b3JlZCcsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlbmRlci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW5kZXInLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZW5kZXIuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZXJyb3InLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5lcnJvci5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRhdGEuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc3R5bGVEYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3N0eWxlZGF0YScsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGEub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc291cmNlZGF0YScsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZGF0YUxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc3R5bGVEYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWRhdGFsb2FkaW5nJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zdHlsZURhdGFMb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGFMb2FkaW5nLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGFsb2FkaW5nJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zb3VyY2VEYXRhTG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIG1vdmUgdGhpcyBlbHNld2hlcmVcbiAgcHJpdmF0ZSBhc3NpZ24ob2JqOiBhbnksIHByb3A6IGFueSwgdmFsdWU6IGFueSkge1xuICAgIGlmICh0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICBwcm9wID0gcHJvcC5zcGxpdCgnLicpO1xuICAgIH1cbiAgICBpZiAocHJvcC5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBlID0gcHJvcC5zaGlmdCgpO1xuICAgICAgdGhpcy5hc3NpZ24ob2JqW2VdID1cbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtlXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgICAgICAgPyBvYmpbZV1cbiAgICAgICAgICA6IHt9LFxuICAgICAgICBwcm9wLFxuICAgICAgICB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtwcm9wWzBdXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19