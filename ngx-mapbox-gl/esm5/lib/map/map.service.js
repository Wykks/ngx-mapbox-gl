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
     * @param {?} bindEvents
     * @param {?=} before
     * @return {?}
     */
    MapService.prototype.addLayer = /**
     * @param {?} layer
     * @param {?} bindEvents
     * @param {?=} before
     * @return {?}
     */
    function (layer, bindEvents, before) {
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
            if (bindEvents) {
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
        /** @type {?} */
        var options = {
            offset: marker.markersOptions.offset,
            anchor: marker.markersOptions.anchor,
            draggable: !!marker.markersOptions.draggable
        };
        if (marker.markersOptions.element.childNodes.length > 0) {
            options.element = marker.markersOptions.element;
        }
        /** @type {?} */
        var markerInstance = new MapboxGl.Marker(options);
        if (marker.markersEvents.dragStart.observers.length) {
            markerInstance.on('dragstart', function (event) {
                return _this.zone.run(function () { return marker.markersEvents.dragStart.emit(event.target); });
            });
        }
        if (marker.markersEvents.drag.observers.length) {
            markerInstance.on('drag', function (event) {
                return _this.zone.run(function () { return marker.markersEvents.drag.emit(event.target); });
            });
        }
        if (marker.markersEvents.dragEnd.observers.length) {
            markerInstance.on('dragend', function (event) {
                return _this.zone.run(function () { return marker.markersEvents.dragEnd.emit(event.target); });
            });
        }
        markerInstance.setLngLat(marker.markersOptions.feature ? /** @type {?} */ ((marker.markersOptions.feature.geometry)).coordinates : /** @type {?} */
            ((marker.markersOptions.lngLat)));
        return this.zone.runOutsideAngular(function () {
            markerInstance.addTo(_this.mapInstance);
            return markerInstance;
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
     * @param {?=} skipOpenEvent
     * @return {?}
     */
    MapService.prototype.addPopupToMap = /**
     * @param {?} popup
     * @param {?} lngLat
     * @param {?=} skipOpenEvent
     * @return {?}
     */
    function (popup, lngLat, skipOpenEvent) {
        var _this = this;
        if (skipOpenEvent === void 0) { skipOpenEvent = false; }
        return this.zone.runOutsideAngular(function () {
            if (skipOpenEvent && (/** @type {?} */ (popup))._listeners) {
                delete (/** @type {?} */ (popup))._listeners['open'];
            }
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
     * @param {?=} skipCloseEvent
     * @return {?}
     */
    MapService.prototype.removePopupFromMap = /**
     * @param {?} popup
     * @param {?=} skipCloseEvent
     * @return {?}
     */
    function (popup, skipCloseEvent) {
        if (skipCloseEvent === void 0) { skipCloseEvent = false; }
        if (skipCloseEvent && (/** @type {?} */ (popup))._listeners) {
            delete (/** @type {?} */ (popup))._listeners['close'];
        }
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
        var w = parseInt(/** @type {?} */ ((canvas.style.width)), 10);
        /** @type {?} */
        var h = parseInt(/** @type {?} */ ((canvas.style.height)), 10);
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
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.layerIdsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
                var layerId = _c.value;
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
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.layerIdsToRemove = [];
    };
    /**
     * @return {?}
     */
    MapService.prototype.removeSources = /**
     * @return {?}
     */
    function () {
        var e_2, _a;
        try {
            for (var _b = tslib_1.__values(this.sourceIdsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sourceId = _c.value;
                this.mapInstance.removeSource(sourceId);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.sourceIdsToRemove = [];
    };
    /**
     * @return {?}
     */
    MapService.prototype.removeMarkers = /**
     * @return {?}
     */
    function () {
        var e_3, _a;
        try {
            for (var _b = tslib_1.__values(this.markersToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
                var marker = _c.value;
                marker.remove();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.markersToRemove = [];
    };
    /**
     * @return {?}
     */
    MapService.prototype.removePopups = /**
     * @return {?}
     */
    function () {
        var e_4, _a;
        try {
            for (var _b = tslib_1.__values(this.popupsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
                var popup = _c.value;
                popup.remove();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.popupsToRemove = [];
    };
    /**
     * @return {?}
     */
    MapService.prototype.removeImages = /**
     * @return {?}
     */
    function () {
        var e_5, _a;
        try {
            for (var _b = tslib_1.__values(this.imageIdsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
                var imageId = _c.value;
                this.mapInstance.removeImage(imageId);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.imageIdsToRemove = [];
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
        { type: Injectable }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL21hcC9tYXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBZ0IsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFDOUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBSXZDLFdBQWEsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O0FBRWpFOzs7QUFBQTs7O2dDQVhBO0lBYUMsQ0FBQTs7OztBQUZELGlDQUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1RUMsb0JBQ1UsTUFDNkMsY0FBc0IsRUFDOUMscUJBQTRDO1FBRmpFLFNBQUksR0FBSixJQUFJO1FBQ3lDLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBQzlDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7MEJBWnRELElBQUksWUFBWSxFQUFRO3lCQUN6QixJQUFJLFlBQVksRUFBUTtnQ0FDUCxFQUFFO2lDQUNELEVBQUU7K0JBQ0ssRUFBRTs4QkFDSixFQUFFO2dDQUNSLEVBQUU7NEJBQ2hCLElBQUksWUFBWSxFQUFFO1FBT3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FB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dGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuaW1wb3J0IHsgcG9seWdvbiB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuaW1wb3J0ICogYXMgTWFwYm94R2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJCb3ggfSBmcm9tICdzdXBlcmNsdXN0ZXInO1xuaW1wb3J0IHsgTWFwRXZlbnQsIE1hcEltYWdlRGF0YSwgTWFwSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi9tYXAudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWdsUmVzaXplRXZlbnRFbWl0dGVyIHtcbiAgYWJzdHJhY3QgcmVzaXplRXZlbnQ6IE9ic2VydmFibGU8dm9pZD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBNYXAge1xuICBhY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgY3VzdG9tTWFwYm94QXBpVXJsPzogc3RyaW5nO1xuICBtYXBPcHRpb25zOiBhbnk7IC8vIE1hcGJveEdsLk1hcGJveE9wdGlvbnNcbiAgbWFwRXZlbnRzOiBNYXBFdmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cExheWVyIHtcbiAgbGF5ZXJPcHRpb25zOiBNYXBib3hHbC5MYXllcjtcbiAgbGF5ZXJFdmVudHM6IHtcbiAgICBjbGljazogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICAgIG1vdXNlRW50ZXI6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgICBtb3VzZUxlYXZlOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gICAgbW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBQb3B1cCB7XG4gIHBvcHVwT3B0aW9uczogTWFwYm94R2wuUG9wdXBPcHRpb25zO1xuICBwb3B1cEV2ZW50czoge1xuICAgIG9wZW46IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICBjbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTWFya2VyIHtcbiAgbWFya2Vyc09wdGlvbnM6IHtcbiAgICBvZmZzZXQ/OiBNYXBib3hHbC5Qb2ludExpa2U7XG4gICAgYW5jaG9yPzogTWFwYm94R2wuQW5jaG9yO1xuICAgIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcbiAgICBsbmdMYXQ/OiBNYXBib3hHbC5MbmdMYXRMaWtlO1xuICB9O1xuICBtYXJrZXJzRXZlbnRzOiB7XG4gICAgZHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgICBkcmFnOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgICBkcmFnRW5kOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQWxsU291cmNlID0gTWFwYm94R2wuVmVjdG9yU291cmNlIHxcbiAgTWFwYm94R2wuUmFzdGVyU291cmNlIHxcbiAgTWFwYm94R2wuR2VvSlNPTlNvdXJjZSB8XG4gIE1hcGJveEdsLkltYWdlU291cmNlT3B0aW9ucyB8XG4gIE1hcGJveEdsLlZpZGVvU291cmNlT3B0aW9ucyB8XG4gIE1hcGJveEdsLkdlb0pTT05Tb3VyY2VSYXcgfFxuICBNYXBib3hHbC5DYW52YXNTb3VyY2VPcHRpb25zO1xuXG5leHBvcnQgdHlwZSBNb3ZpbmdPcHRpb25zID0gTWFwYm94R2wuRmx5VG9PcHRpb25zIHxcbiAgKE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMgJiBNYXBib3hHbC5DYW1lcmFPcHRpb25zKSB8XG4gIE1hcGJveEdsLkNhbWVyYU9wdGlvbnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcbiAgbWFwSW5zdGFuY2U6IE1hcGJveEdsLk1hcDtcbiAgbWFwQ3JlYXRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcExvYWRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcEV2ZW50czogTWFwRXZlbnQ7XG5cbiAgcHJpdmF0ZSBtYXBDcmVhdGVkID0gbmV3IEFzeW5jU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIG1hcExvYWRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsYXllcklkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHNvdXJjZUlkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIG1hcmtlcnNUb1JlbW92ZTogTWFwYm94R2wuTWFya2VyW10gPSBbXTtcbiAgcHJpdmF0ZSBwb3B1cHNUb1JlbW92ZTogTWFwYm94R2wuUG9wdXBbXSA9IFtdO1xuICBwcml2YXRlIGltYWdlSWRzVG9SZW1vdmU6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFQQk9YX0FQSV9LRVkpIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0FQSV9LRVk6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IE1nbFJlc2l6ZUV2ZW50RW1pdHRlcjogTWdsUmVzaXplRXZlbnRFbWl0dGVyXG4gICkge1xuICAgIHRoaXMubWFwQ3JlYXRlZCQgPSB0aGlzLm1hcENyZWF0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYXBMb2FkZWQkID0gdGhpcy5tYXBMb2FkZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXR1cChvcHRpb25zOiBTZXR1cE1hcCkge1xuICAgIC8vIE5lZWQgb25TdGFibGUgdG8gd2FpdCBmb3IgYSBwb3RlbnRpYWwgQGFuZ3VsYXIvcm91dGUgdHJhbnNpdGlvbiB0byBlbmRcbiAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgLy8gV29ya2Fyb3VuZCByb2xsdXAgaXNzdWVcbiAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnYWNjZXNzVG9rZW4nLCBvcHRpb25zLmFjY2Vzc1Rva2VuIHx8IHRoaXMuTUFQQk9YX0FQSV9LRVkpO1xuICAgICAgaWYgKG9wdGlvbnMuY3VzdG9tTWFwYm94QXBpVXJsKSB7XG4gICAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnY29uZmlnLkFQSV9VUkwnLCBvcHRpb25zLmN1c3RvbU1hcGJveEFwaVVybCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNyZWF0ZU1hcChvcHRpb25zLm1hcE9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKG9wdGlvbnMubWFwRXZlbnRzKTtcbiAgICAgIHRoaXMubWFwRXZlbnRzID0gb3B0aW9ucy5tYXBFdmVudHM7XG4gICAgICB0aGlzLm1hcENyZWF0ZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBDcmVhdGVkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95TWFwKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pblpvb20obWluWm9vbTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1pblpvb20obWluWm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVNYXhab29tKG1heFpvb206IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhab29tKG1heFpvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU2Nyb2xsWm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEcmFnUm90YXRlKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS50b3VjaFpvb21Sb3RhdGUuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRG91YmxlQ2xpY2tab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVLZXlib2FyZChzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURyYWdQYW4oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQm94Wm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdHlsZShzdHlsZTogTWFwYm94R2wuU3R5bGUpIHtcbiAgICAvLyBUT0RPIFByb2JhYmx5IG5vdCBzbyBzaW1wbGUsIHdyaXRlIGRlbW8vdGVzdHNcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4Qm91bmRzKG1heEJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSkge1xuICAgIC8vIFRPRE8gUHJvYmFibHkgbm90IHNvIHNpbXBsZSwgd3JpdGUgZGVtby90ZXN0c1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhCb3VuZHMobWF4Qm91bmRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUNhbnZhc0N1cnNvcihjdXJzb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzQ29udGFpbmVyKCk7XG4gICAgY2FudmFzLnN0eWxlLmN1cnNvciA9IGN1cnNvcjtcbiAgfVxuXG4gIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhcbiAgICBwb2ludE9yQm94PzogTWFwYm94R2wuUG9pbnRMaWtlIHwgTWFwYm94R2wuUG9pbnRMaWtlW10sXG4gICAgcGFyYW1ldGVycz86IHsgbGF5ZXJzPzogc3RyaW5nW10sIGZpbHRlcj86IGFueVtdIH1cbiAgKTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+W10ge1xuICAgIHJldHVybiB0aGlzLm1hcEluc3RhbmNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhwb2ludE9yQm94LCBwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHBhblRvKGNlbnRlcjogTWFwYm94R2wuTG5nTGF0TGlrZSwgb3B0aW9ucz86IE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucGFuVG8oY2VudGVyLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmUoXG4gICAgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyxcbiAgICBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucyxcbiAgICB6b29tPzogbnVtYmVyLFxuICAgIGNlbnRlcj86IE1hcGJveEdsLkxuZ0xhdExpa2UsXG4gICAgYmVhcmluZz86IG51bWJlcixcbiAgICBwaXRjaD86IG51bWJlclxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICg8YW55PnRoaXMubWFwSW5zdGFuY2VbbW92aW5nTWV0aG9kXSkoe1xuICAgICAgICAuLi5tb3ZpbmdPcHRpb25zLFxuICAgICAgICB6b29tOiB6b29tID8gem9vbSA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpLFxuICAgICAgICBjZW50ZXI6IGNlbnRlciA/IGNlbnRlciA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2VudGVyKCksXG4gICAgICAgIGJlYXJpbmc6IGJlYXJpbmcgPyBiZWFyaW5nIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRCZWFyaW5nKCksXG4gICAgICAgIHBpdGNoOiBwaXRjaCA/IHBpdGNoIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRQaXRjaCgpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZExheWVyKGxheWVyOiBTZXR1cExheWVyLCBiaW5kRXZlbnRzOiBib29sZWFuLCBiZWZvcmU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMobGF5ZXIubGF5ZXJPcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIE1hcGJveEdsLkxheWVyPmtleTtcbiAgICAgICAgICBpZiAobGF5ZXIubGF5ZXJPcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsYXllci5sYXllck9wdGlvbnNbdGtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkTGF5ZXIobGF5ZXIubGF5ZXJPcHRpb25zLCBiZWZvcmUpO1xuICAgICAgaWYgKGJpbmRFdmVudHMpIHtcbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjbGljaycsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5tb3VzZUVudGVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWVudGVyJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VFbnRlci5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubW91c2VMZWF2ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTGVhdmUuZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vtb3ZlJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVMYXllcihsYXllcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUucHVzaChsYXllcklkKTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IFNldHVwTWFya2VyKSB7XG4gICAgY29uc3Qgb3B0aW9uczogTWFwYm94R2wuTWFya2VyT3B0aW9ucyA9IHtcbiAgICAgIG9mZnNldDogbWFya2VyLm1hcmtlcnNPcHRpb25zLm9mZnNldCxcbiAgICAgIGFuY2hvcjogbWFya2VyLm1hcmtlcnNPcHRpb25zLmFuY2hvcixcbiAgICAgIGRyYWdnYWJsZTogISFtYXJrZXIubWFya2Vyc09wdGlvbnMuZHJhZ2dhYmxlXG4gICAgfTtcbiAgICBpZiAobWFya2VyLm1hcmtlcnNPcHRpb25zLmVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBvcHRpb25zLmVsZW1lbnQgPSBtYXJrZXIubWFya2Vyc09wdGlvbnMuZWxlbWVudDtcbiAgICB9XG4gICAgY29uc3QgbWFya2VySW5zdGFuY2UgPSBuZXcgTWFwYm94R2wuTWFya2VyKG9wdGlvbnMpO1xuICAgIGlmIChtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWdzdGFydCcsIChldmVudDogeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdTdGFydC5lbWl0KGV2ZW50LnRhcmdldCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICBtYXJrZXJJbnN0YW5jZS5vbignZHJhZycsIChldmVudDogeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWcuZW1pdChldmVudC50YXJnZXQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZlbnQ6IHsgdGFyZ2V0OiBNYXBib3hHbC5NYXJrZXIgfSkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnRW5kLmVtaXQoZXZlbnQudGFyZ2V0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIG1hcmtlckluc3RhbmNlLnNldExuZ0xhdChtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZSA/XG4gICAgICBtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMgOlxuICAgICAgbWFya2VyLm1hcmtlcnNPcHRpb25zLmxuZ0xhdCFcbiAgICApO1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VySW5zdGFuY2UuYWRkVG8odGhpcy5tYXBJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gbWFya2VySW5zdGFuY2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIpIHtcbiAgICB0aGlzLm1hcmtlcnNUb1JlbW92ZS5wdXNoKG1hcmtlcik7XG4gIH1cblxuICBjcmVhdGVQb3B1cChwb3B1cDogU2V0dXBQb3B1cCwgZWxlbWVudDogTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocG9wdXAucG9wdXBPcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgICAgICg8YW55PnBvcHVwLnBvcHVwT3B0aW9ucylba2V5XSA9PT0gdW5kZWZpbmVkICYmIGRlbGV0ZSAoPGFueT5wb3B1cC5wb3B1cE9wdGlvbnMpW2tleV0pO1xuICAgICAgY29uc3QgcG9wdXBJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5Qb3B1cChwb3B1cC5wb3B1cE9wdGlvbnMpO1xuICAgICAgcG9wdXBJbnN0YW5jZS5zZXRET01Db250ZW50KGVsZW1lbnQpO1xuICAgICAgaWYgKHBvcHVwLnBvcHVwRXZlbnRzLmNsb3NlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9wdXBJbnN0YW5jZS5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHBvcHVwLnBvcHVwRXZlbnRzLm9wZW4ub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb3B1cEluc3RhbmNlLm9uKCdvcGVuJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMub3Blbi5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcHVwSW5zdGFuY2U7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQb3B1cFRvTWFwKHBvcHVwOiBNYXBib3hHbC5Qb3B1cCwgbG5nTGF0OiBNYXBib3hHbC5MbmdMYXRMaWtlLCBza2lwT3BlbkV2ZW50ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmIChza2lwT3BlbkV2ZW50ICYmICg8YW55PnBvcHVwKS5fbGlzdGVuZXJzKSB7XG4gICAgICAgIGRlbGV0ZSAoPGFueT5wb3B1cCkuX2xpc3RlbmVyc1snb3BlbiddO1xuICAgICAgfVxuICAgICAgcG9wdXAuc2V0TG5nTGF0KGxuZ0xhdCk7XG4gICAgICBwb3B1cC5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIsIHBvcHVwOiBNYXBib3hHbC5Qb3B1cCkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHBvcHVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcChwb3B1cDogTWFwYm94R2wuUG9wdXAsIHNraXBDbG9zZUV2ZW50ID0gZmFsc2UpIHtcbiAgICBpZiAoc2tpcENsb3NlRXZlbnQgJiYgKDxhbnk+cG9wdXApLl9saXN0ZW5lcnMpIHtcbiAgICAgIGRlbGV0ZSAoPGFueT5wb3B1cCkuX2xpc3RlbmVyc1snY2xvc2UnXTtcbiAgICB9XG4gICAgdGhpcy5wb3B1cHNUb1JlbW92ZS5wdXNoKHBvcHVwKTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRDb250cm9sKGNvbnRyb2w6IE1hcGJveEdsLkNvbnRyb2wgfCBNYXBib3hHbC5JQ29udHJvbCwgcG9zaXRpb24/OiAndG9wLXJpZ2h0JyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkQ29udHJvbCg8YW55PmNvbnRyb2wsIHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUNvbnRyb2woY29udHJvbDogTWFwYm94R2wuQ29udHJvbCB8IE1hcGJveEdsLklDb250cm9sKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUNvbnRyb2woPGFueT5jb250cm9sKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRBbmRBZGRJbWFnZShpbWFnZUlkOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLmxvYWRJbWFnZSh1cmwsIChlcnJvcjogeyBzdGF0dXM6IG51bWJlciB9IHwgbnVsbCwgaW1hZ2U6IEltYWdlRGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRJbWFnZShpbWFnZUlkLCBpbWFnZSwgb3B0aW9ucyk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSW1hZ2UoaW1hZ2VJZDogc3RyaW5nLCBkYXRhOiBNYXBJbWFnZURhdGEsIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkSW1hZ2UoaW1hZ2VJZCwgPGFueT5kYXRhLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUltYWdlKGltYWdlSWQ6IHN0cmluZykge1xuICAgIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZS5wdXNoKGltYWdlSWQpO1xuICB9XG5cbiAgYWRkU291cmNlKHNvdXJjZUlkOiBzdHJpbmcsIHNvdXJjZTogQWxsU291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhzb3VyY2UpXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgKDxhbnk+c291cmNlKVtrZXldID09PSB1bmRlZmluZWQgJiYgZGVsZXRlICg8YW55PnNvdXJjZSlba2V5XSk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZFNvdXJjZShzb3VyY2VJZCwgPGFueT5zb3VyY2UpOyAvLyBUeXBpbmdzIGlzc3VlXG4gICAgfSk7XG4gIH1cblxuICBnZXRTb3VyY2U8VD4oc291cmNlSWQ6IHN0cmluZykge1xuICAgIHJldHVybiA8VD48YW55PnRoaXMubWFwSW5zdGFuY2UuZ2V0U291cmNlKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHJlbW92ZVNvdXJjZShzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZS5wdXNoKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHNldEFsbExheWVyUGFpbnRQcm9wZXJ0eShcbiAgICBsYXllcklkOiBzdHJpbmcsXG4gICAgcGFpbnQ6IE1hcGJveEdsLkJhY2tncm91bmRQYWludCB8XG4gICAgICBNYXBib3hHbC5GaWxsUGFpbnQgfFxuICAgICAgTWFwYm94R2wuRmlsbEV4dHJ1c2lvblBhaW50IHxcbiAgICAgIE1hcGJveEdsLkxpbmVQYWludCB8XG4gICAgICBNYXBib3hHbC5TeW1ib2xQYWludCB8XG4gICAgICBNYXBib3hHbC5SYXN0ZXJQYWludCB8XG4gICAgICBNYXBib3hHbC5DaXJjbGVQYWludFxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBhaW50KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgcGVyZiwgc2V0UGFpbnRQcm9wZXJ0eSBvbmx5IG9uIGNoYW5nZWQgcGFpbnQgcHJvcHMgbWF5YmVcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRQYWludFByb3BlcnR5KGxheWVySWQsIGtleSwgKDxhbnk+cGFpbnQpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRBbGxMYXllckxheW91dFByb3BlcnR5KFxuICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICBsYXlvdXQ6IE1hcGJveEdsLkJhY2tncm91bmRMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuRmlsbExheW91dCB8XG4gICAgICBNYXBib3hHbC5GaWxsRXh0cnVzaW9uTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkxpbmVMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuU3ltYm9sTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLlJhc3RlckxheW91dCB8XG4gICAgICBNYXBib3hHbC5DaXJjbGVMYXlvdXRcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhsYXlvdXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldExheW91dFByb3BlcnR5KGxheWVySWQsIGtleSwgKDxhbnk+bGF5b3V0KVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJGaWx0ZXIobGF5ZXJJZDogc3RyaW5nLCBmaWx0ZXI6IGFueVtdKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldEZpbHRlcihsYXllcklkLCBmaWx0ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJCZWZvcmUobGF5ZXJJZDogc3RyaW5nLCBiZWZvcmVJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm1vdmVMYXllcihsYXllcklkLCBiZWZvcmVJZCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllclpvb21SYW5nZShsYXllcklkOiBzdHJpbmcsIG1pblpvb20/OiBudW1iZXIsIG1heFpvb20/OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TGF5ZXJab29tUmFuZ2UobGF5ZXJJZCwgbWluWm9vbSA/IG1pblpvb20gOiAwLCBtYXhab29tID8gbWF4Wm9vbSA6IDIwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpdEJvdW5kcyhib3VuZHM6IE1hcGJveEdsLkxuZ0xhdEJvdW5kc0xpa2UsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuZml0Qm91bmRzKGJvdW5kcywgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50Vmlld3BvcnRCYm94KCk6IEJCb3gge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzKCk7XG4gICAgY29uc3QgdyA9IHBhcnNlSW50KGNhbnZhcy5zdHlsZS53aWR0aCEsIDEwKTtcbiAgICBjb25zdCBoID0gcGFyc2VJbnQoY2FudmFzLnN0eWxlLmhlaWdodCEsIDEwKTtcbiAgICBjb25zdCB1cExlZnQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbMCwgMF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoW3csIDBdKS50b0FycmF5KCk7XG4gICAgY29uc3QgZG93blJpZ2h0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoW3csIGhdKS50b0FycmF5KCk7XG4gICAgY29uc3QgZG93bkxlZnQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbMCwgaF0pLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gPGFueT5iYm94KHBvbHlnb24oW1t1cExlZnQsIHVwUmlnaHQsIGRvd25SaWdodCwgZG93bkxlZnQsIHVwTGVmdF1dKSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKCk7XG4gICAgICB0aGlzLnJlbW92ZVNvdXJjZXMoKTtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VycygpO1xuICAgICAgdGhpcy5yZW1vdmVQb3B1cHMoKTtcbiAgICAgIHRoaXMucmVtb3ZlSW1hZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1hcChvcHRpb25zOiBNYXBib3hHbC5NYXBib3hPcHRpb25zKSB7XG4gICAgTmdab25lLmFzc2VydE5vdEluQW5ndWxhclpvbmUoKTtcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgTWFwYm94R2wuTWFwYm94T3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5NYXAob3B0aW9ucyk7XG4gICAgY29uc3Qgc3ViQ2hhbmdlcyA9IHRoaXMuem9uZS5vbk1pY3JvdGFza0VtcHR5XG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXBwbHlDaGFuZ2VzKCkpO1xuICAgIGlmICh0aGlzLk1nbFJlc2l6ZUV2ZW50RW1pdHRlcikge1xuICAgICAgY29uc3Qgc3ViUmVzaXplID0gdGhpcy5NZ2xSZXNpemVFdmVudEVtaXR0ZXIucmVzaXplRXZlbnQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZXNpemUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1YlJlc2l6ZSk7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChzdWJDaGFuZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJzKCkge1xuICAgIGZvciAoY29uc3QgbGF5ZXJJZCBvZiB0aGlzLmxheWVySWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdjbGljaycsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ21vdXNlZW50ZXInLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdtb3VzZWxlYXZlJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignbW91c2Vtb3ZlJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUxheWVyKGxheWVySWQpO1xuICAgIH1cbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlcygpIHtcbiAgICBmb3IgKGNvbnN0IHNvdXJjZUlkIG9mIHRoaXMuc291cmNlSWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlU291cmNlKHNvdXJjZUlkKTtcbiAgICB9XG4gICAgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVNYXJrZXJzKCkge1xuICAgIGZvciAoY29uc3QgbWFya2VyIG9mIHRoaXMubWFya2Vyc1RvUmVtb3ZlKSB7XG4gICAgICBtYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMubWFya2Vyc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVBvcHVwcygpIHtcbiAgICBmb3IgKGNvbnN0IHBvcHVwIG9mIHRoaXMucG9wdXBzVG9SZW1vdmUpIHtcbiAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLnBvcHVwc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUltYWdlcygpIHtcbiAgICBmb3IgKGNvbnN0IGltYWdlSWQgb2YgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUltYWdlKGltYWdlSWQpO1xuICAgIH1cbiAgICB0aGlzLmltYWdlSWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgaG9va0V2ZW50cyhldmVudHM6IE1hcEV2ZW50KSB7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbG9hZCcsICgpID0+IHtcbiAgICAgIHRoaXMubWFwTG9hZGVkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMubWFwTG9hZGVkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5sb2FkLmVtaXQodGhpcy5tYXBJbnN0YW5jZSkpO1xuICAgIH0pO1xuICAgIGlmIChldmVudHMucmVzaXplLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3Jlc2l6ZScsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlc2l6ZS5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZW1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVtb3ZlJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVtb3ZlLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlRG93bi5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWRvd24nLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZURvd24uZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VVcC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZXVwJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VVcC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vtb3ZlJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY2xpY2suZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGJsQ2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGJsY2xpY2snLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYmxDbGljay5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZUVudGVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZW50ZXInLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZUVudGVyLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlTGVhdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlTGVhdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VPdmVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3ZlcicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlT3Zlci5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU91dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW91dCcsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlT3V0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNvbnRleHRNZW51Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NvbnRleHRtZW51JywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY29udGV4dE1lbnUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaHN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaEVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaG1vdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaE1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hDYW5jZWwub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hjYW5jZWwnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaENhbmNlbC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53aGVlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAvLyBNYXBib3hHbC5NYXBXaGVlbEV2ZW50XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3aGVlbCcsIChldnQ6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2hlZWwuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdmVzdGFydCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmVFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZWVuZCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZHJhZ3N0YXJ0JywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZ0VuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnZW5kJywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21TdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMuem9vbVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FdnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy56b29tRXZ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy56b29tRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZXN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnJvdGF0ZVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucm90YXRlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGVlbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMucm90YXRlRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hzdGFydCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaEV2dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hFdnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hlbmQnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21TdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21TdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21lbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21FbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbUNhbmNlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tY2FuY2VsJywgKGV2dDogTWFwYm94R2wuTWFwQm94Wm9vbUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tQ2FuY2VsLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dExvc3Qub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0bG9zdCcsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dExvc3QuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMud2ViR2xDb250ZXh0UmVzdG9yZWQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0cmVzdG9yZWQnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53ZWJHbENvbnRleHRSZXN0b3JlZC5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZW5kZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVuZGVyJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVuZGVyLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmVycm9yLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2Vycm9yJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZXJyb3IuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYXRhLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWRhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnN0eWxlRGF0YS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zb3VyY2VEYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnNvdXJjZURhdGEuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGF0YWxvYWRpbmcnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRhdGFMb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhTG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zb3VyY2VEYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzb3VyY2VkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YUxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBtb3ZlIHRoaXMgZWxzZXdoZXJlXG4gIHByaXZhdGUgYXNzaWduKG9iajogYW55LCBwcm9wOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgcHJvcCA9IHByb3Auc3BsaXQoJy4nKTtcbiAgICB9XG4gICAgaWYgKHByb3AubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgZSA9IHByb3Auc2hpZnQoKTtcbiAgICAgIHRoaXMuYXNzaWduKG9ialtlXSA9XG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbZV0pID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAgID8gb2JqW2VdXG4gICAgICAgICAgOiB7fSxcbiAgICAgICAgcHJvcCxcbiAgICAgICAgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbcHJvcFswXV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==