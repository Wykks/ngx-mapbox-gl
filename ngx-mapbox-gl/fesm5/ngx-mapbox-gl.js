import { __awaiter, __generator, __assign, __values } from 'tslib';
import { Inject, Injectable, InjectionToken, NgZone, Optional, ChangeDetectionStrategy, Component, Input, ViewChild, Directive, Host, EventEmitter, Output, ViewEncapsulation, forwardRef, ChangeDetectorRef, ContentChild, TemplateRef, NgModule } from '@angular/core';
import bbox from '@turf/bbox';
import { polygon } from '@turf/helpers';
import * as MapboxGl from 'mapbox-gl';
import { AttributionControl, FullscreenControl, NavigationControl, GeolocateControl, ScaleControl, Marker, Popup, Map } from 'mapbox-gl';
import { AsyncSubject, Subscription, fromEvent, Subject, ReplaySubject, merge } from 'rxjs';
import { first, filter, debounceTime, switchMap, take, takeUntil, tap, startWith } from 'rxjs/operators';
import supercluster from 'supercluster';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');
/**
 * @abstract
 */
var  /**
 * @abstract
 */
MglResizeEventEmitter = /** @class */ (function () {
    function MglResizeEventEmitter() {
    }
    return MglResizeEventEmitter;
}());
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
            (/** @type {?} */ (_this.mapInstance[movingMethod]))(__assign({}, movingOptions, { zoom: zoom ? zoom : _this.mapInstance.getZoom(), center: center ? center : _this.mapInstance.getCenter(), bearing: bearing ? bearing : _this.mapInstance.getBearing(), pitch: pitch ? pitch : _this.mapInstance.getPitch() }));
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
        var markerInstance = new Marker(options);
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
            var popupInstance = new Popup(popup.popupOptions);
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
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
    function (layerId, filter$$1) {
        var _this = this;
        return this.zone.runOutsideAngular(function () {
            _this.mapInstance.setFilter(layerId, filter$$1);
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
        this.mapInstance = new Map(options);
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
            for (var _b = __values(this.layerIdsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = __values(this.sourceIdsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = __values(this.markersToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = __values(this.popupsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = __values(this.imageIdsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CustomControl = /** @class */ (function () {
    function CustomControl(container) {
        this.container = container;
    }
    /**
     * @return {?}
     */
    CustomControl.prototype.onAdd = /**
     * @return {?}
     */
    function () {
        return this.container;
    };
    /**
     * @return {?}
     */
    CustomControl.prototype.onRemove = /**
     * @return {?}
     */
    function () {
        return /** @type {?} */ ((this.container.parentNode)).removeChild(this.container);
    };
    /**
     * @return {?}
     */
    CustomControl.prototype.getDefaultPosition = /**
     * @return {?}
     */
    function () {
        return 'top-right';
    };
    return CustomControl;
}());
var ControlComponent = /** @class */ (function () {
    function ControlComponent(MapService$$1) {
        this.MapService = MapService$$1;
    }
    /**
     * @return {?}
     */
    ControlComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.content.nativeElement.childNodes.length) {
            this.control = new CustomControl(this.content.nativeElement);
            this.MapService.mapCreated$.subscribe(function () {
                _this.MapService.addControl(/** @type {?} */ ((_this.control)), _this.position);
            });
        }
    };
    /**
     * @return {?}
     */
    ControlComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.MapService.removeControl(this.control);
    };
    ControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-control',
                    template: '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    ControlComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    ControlComponent.propDecorators = {
        position: [{ type: Input }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return ControlComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AttributionControlDirective = /** @class */ (function () {
    function AttributionControlDirective(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @return {?}
     */
    AttributionControlDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            if (_this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            var options = {};
            if (_this.compact !== undefined) {
                options.compact = _this.compact;
            }
            _this.ControlComponent.control = new AttributionControl(options);
            _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
        });
    };
    AttributionControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglAttribution]'
                },] }
    ];
    /** @nocollapse */
    AttributionControlDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: ControlComponent, decorators: [{ type: Host }] }
    ]; };
    AttributionControlDirective.propDecorators = {
        compact: [{ type: Input }]
    };
    return AttributionControlDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FullscreenControlDirective = /** @class */ (function () {
    function FullscreenControlDirective(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @return {?}
     */
    FullscreenControlDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            if (_this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            _this.ControlComponent.control = new FullscreenControl();
            _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
        });
    };
    FullscreenControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglFullscreen]'
                },] }
    ];
    /** @nocollapse */
    FullscreenControlDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: ControlComponent, decorators: [{ type: Host }] }
    ]; };
    return FullscreenControlDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
/** @type {?} */
var MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');
var GeocoderControlDirective = /** @class */ (function () {
    function GeocoderControlDirective(MapService$$1, zone, ControlComponent$$1, MAPBOX_GEOCODER_API_KEY) {
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
    GeocoderControlDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            if (_this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            var options = {
                proximity: _this.proximity,
                country: _this.country,
                placeholder: _this.placeholder,
                zoom: _this.zoom,
                bbox: _this.bbox,
                types: _this.types,
                flyTo: _this.flyTo,
                minLength: _this.minLength,
                limit: _this.limit,
                language: _this.language,
                filter: _this.filter,
                localGeocoder: _this.localGeocoder,
                accessToken: _this.accessToken || _this.MAPBOX_GEOCODER_API_KEY
            };
            Object.keys(options).forEach(function (key) {
                /** @type {?} */
                var tkey = /** @type {?} */ (key);
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            _this.geocoder = new MapboxGeocoder(options);
            _this.hookEvents(_this);
            _this.addControl();
        });
        if (this.searchInput) {
            this.MapService.mapLoaded$.subscribe(function () {
                _this.geocoder.query(_this.searchInput);
            });
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    GeocoderControlDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.geocoder) {
            return;
        }
        if (changes["proximity"] && !changes["proximity"].isFirstChange()) {
            this.geocoder.setProximity(changes["proximity"].currentValue);
        }
        if (changes["searchInput"]) {
            this.geocoder.query(this.searchInput);
        }
    };
    /**
     * @return {?}
     */
    GeocoderControlDirective.prototype.addControl = /**
     * @return {?}
     */
    function () {
        this.ControlComponent.control = this.geocoder;
        this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
    };
    /**
     * @param {?} events
     * @return {?}
     */
    GeocoderControlDirective.prototype.hookEvents = /**
     * @param {?} events
     * @return {?}
     */
    function (events) {
        var _this = this;
        if (events.results.observers.length) {
            this.geocoder.on('results', function (evt) { return _this.zone.run(function () { return events.results.emit(evt); }); });
        }
        if (events.result.observers.length) {
            this.geocoder.on('result', function (evt) { return _this.zone.run(function () { return events.result.emit(evt); }); });
        }
        if (events.error.observers.length) {
            this.geocoder.on('error', function (evt) { return _this.zone.run(function () { return events.error.emit(evt); }); });
        }
        if (events.loading.observers.length) {
            this.geocoder.on('loading', function (evt) { return _this.zone.run(function () { return events.loading.emit(evt); }); });
        }
        if (events.clear.observers.length) {
            this.geocoder.on('clear', function () { return _this.zone.run(function () { return events.clear.emit(); }); });
        }
    };
    GeocoderControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglGeocoder]'
                },] }
    ];
    /** @nocollapse */
    GeocoderControlDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone },
        { type: ControlComponent, decorators: [{ type: Host }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAPBOX_GEOCODER_API_KEY,] }] }
    ]; };
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
    return GeocoderControlDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GeolocateControlDirective = /** @class */ (function () {
    function GeolocateControlDirective(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @return {?}
     */
    GeolocateControlDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            if (_this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            var options = {
                positionOptions: _this.positionOptions,
                fitBoundsOptions: _this.fitBoundsOptions,
                trackUserLocation: _this.trackUserLocation,
                showUserLocation: _this.showUserLocation
            };
            Object.keys(options)
                .forEach(function (key) {
                /** @type {?} */
                var tkey = /** @type {?} */ (key);
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            _this.ControlComponent.control = new GeolocateControl(options);
            _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
        });
    };
    GeolocateControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglGeolocate]'
                },] }
    ];
    /** @nocollapse */
    GeolocateControlDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: ControlComponent, decorators: [{ type: Host }] }
    ]; };
    GeolocateControlDirective.propDecorators = {
        positionOptions: [{ type: Input }],
        fitBoundsOptions: [{ type: Input }],
        trackUserLocation: [{ type: Input }],
        showUserLocation: [{ type: Input }]
    };
    return GeolocateControlDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NavigationControlDirective = /** @class */ (function () {
    function NavigationControlDirective(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @return {?}
     */
    NavigationControlDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            if (_this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            var options = {};
            if (_this.showCompass !== undefined) {
                options.showCompass = _this.showCompass;
            }
            if (_this.showZoom !== undefined) {
                options.showZoom = _this.showZoom;
            }
            _this.ControlComponent.control = new NavigationControl(options);
            _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
        });
    };
    NavigationControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglNavigation]'
                },] }
    ];
    /** @nocollapse */
    NavigationControlDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: ControlComponent, decorators: [{ type: Host }] }
    ]; };
    NavigationControlDirective.propDecorators = {
        showCompass: [{ type: Input }],
        showZoom: [{ type: Input }]
    };
    return NavigationControlDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ScaleControlDirective = /** @class */ (function () {
    function ScaleControlDirective(MapService$$1, ControlComponent$$1) {
        this.MapService = MapService$$1;
        this.ControlComponent = ControlComponent$$1;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ScaleControlDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["unit"] && !changes["unit"].isFirstChange()) {
            (/** @type {?} */ (this.ControlComponent.control)).setUnit(changes["unit"].currentValue);
        }
    };
    /**
     * @return {?}
     */
    ScaleControlDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            if (_this.ControlComponent.control) {
                throw new Error('Another control is already set for this control');
            }
            /** @type {?} */
            var options = {};
            if (_this.maxWidth !== undefined) {
                options.maxWidth = _this.maxWidth;
            }
            if (_this.unit !== undefined) {
                options.unit = _this.unit;
            }
            _this.ControlComponent.control = new ScaleControl(options);
            _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
        });
    };
    ScaleControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglScale]'
                },] }
    ];
    /** @nocollapse */
    ScaleControlDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: ControlComponent, decorators: [{ type: Host }] }
    ]; };
    ScaleControlDirective.propDecorators = {
        maxWidth: [{ type: Input }],
        unit: [{ type: Input }]
    };
    return ScaleControlDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LayerComponent = /** @class */ (function () {
    function LayerComponent(MapService$$1) {
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
    LayerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init(true);
            _this.sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getLayer(_this.id); })).subscribe(function () {
                _this.init(false);
            });
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    LayerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @return {?}
     */
    LayerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.layerAdded) {
            this.MapService.removeLayer(this.id);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    /**
     * @param {?} bindEvents
     * @return {?}
     */
    LayerComponent.prototype.init = /**
     * @param {?} bindEvents
     * @return {?}
     */
    function (bindEvents) {
        /** @type {?} */
        var layer = {
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
    };
    LayerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-layer',
                    template: ''
                }] }
    ];
    /** @nocollapse */
    LayerComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
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
    return LayerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MarkerComponent = /** @class */ (function () {
    function MarkerComponent(MapService$$1) {
        this.MapService = MapService$$1;
        this.dragStart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.feature && this.lngLat) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MarkerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((this.lngLat)));
        }
        if (changes["feature"] && !changes["feature"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates);
        }
        if (changes["draggable"] && !changes["draggable"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setDraggable(!!this.draggable);
        }
    };
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            _this.markerInstance = _this.MapService.addMarker({
                markersOptions: {
                    offset: _this.offset,
                    anchor: _this.anchor,
                    draggable: !!_this.draggable,
                    element: _this.content.nativeElement,
                    feature: _this.feature,
                    lngLat: _this.lngLat
                },
                markersEvents: {
                    dragStart: _this.dragStart,
                    drag: _this.drag,
                    dragEnd: _this.dragEnd
                }
            });
        });
    };
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.MapService.removeMarker(/** @type {?} */ ((this.markerInstance)));
        this.markerInstance = undefined;
    };
    /**
     * @return {?}
     */
    MarkerComponent.prototype.togglePopup = /**
     * @return {?}
     */
    function () {
        /** @type {?} */ ((this.markerInstance)).togglePopup();
    };
    /**
     * @param {?} coordinates
     * @return {?}
     */
    MarkerComponent.prototype.updateCoordinates = /**
     * @param {?} coordinates
     * @return {?}
     */
    function (coordinates) {
        /** @type {?} */ ((this.markerInstance)).setLngLat(coordinates);
    };
    MarkerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-marker',
                    template: '<div #content><ng-content></ng-content></div>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    .mapboxgl-marker {\n      line-height: 0;\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    MarkerComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
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
    return MarkerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GeoJSONSourceComponent = /** @class */ (function () {
    function GeoJSONSourceComponent(MapService$$1) {
        this.MapService = MapService$$1;
        this.updateFeatureData = new Subject();
        this.sub = new Subscription();
        this.sourceAdded = false;
        this.featureIdCounter = 0;
    }
    /**
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.data) {
            this.data = {
                type: 'FeatureCollection',
                features: []
            };
        }
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init();
            /** @type {?} */
            var sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
                _this.init();
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
            var source = this.MapService.getSource(this.id);
            source.setData(/** @type {?} */ ((this.data)));
        }
    };
    /**
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.addFeature = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /** @type {?} */
        var collection = /** @type {?} */ (this.data);
        collection.features.push(feature);
        this.updateFeatureData.next();
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.removeFeature = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /** @type {?} */
        var collection = /** @type {?} */ (this.data);
        /** @type {?} */
        var index = collection.features.indexOf(feature);
        if (index > -1) {
            collection.features.splice(index, 1);
        }
        this.updateFeatureData.next();
    };
    /**
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.getNewFeatureId = /**
     * @return {?}
     */
    function () {
        return ++this.featureIdCounter;
    };
    /**
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        var sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(function () {
            /** @type {?} */
            var source = _this.MapService.getSource(_this.id);
            source.setData(/** @type {?} */ ((_this.data)));
        });
        this.sub.add(sub);
        this.sourceAdded = true;
    };
    GeoJSONSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-geojson-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    GeoJSONSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
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
    return GeoJSONSourceComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FeatureComponent = /** @class */ (function () {
    function FeatureComponent(GeoJSONSourceComponent$$1) {
        this.GeoJSONSourceComponent = GeoJSONSourceComponent$$1;
        this.type = 'Feature';
    }
    /**
     * @return {?}
     */
    FeatureComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    FeatureComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.GeoJSONSourceComponent.removeFeature(this.feature);
    };
    /**
     * @param {?} coordinates
     * @return {?}
     */
    FeatureComponent.prototype.updateCoordinates = /**
     * @param {?} coordinates
     * @return {?}
     */
    function (coordinates) {
        (/** @type {?} */ (this.feature.geometry)).coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next();
    };
    FeatureComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-feature',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    FeatureComponent.ctorParameters = function () { return [
        { type: GeoJSONSourceComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return GeoJSONSourceComponent; }),] }] }
    ]; };
    FeatureComponent.propDecorators = {
        id: [{ type: Input }],
        geometry: [{ type: Input }],
        properties: [{ type: Input }]
    };
    return FeatureComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(MapService$$1, NgZone$$1, FeatureComponent$$1, MarkerComponent$$1) {
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
    DraggableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var enter$;
        /** @type {?} */
        var leave$;
        /** @type {?} */
        var updateCoords;
        if (this.MarkerComponent) {
            console.warn('mglDraggable on Marker is deprecated, use draggable input instead');
            /** @type {?} */
            var markerElement = (/** @type {?} */ (this.MarkerComponent.content.nativeElement));
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
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed$.next(undefined);
        this.destroyed$.complete();
    };
    /**
     * @param {?} enter$
     * @param {?} leave$
     * @param {?} updateCoords
     * @return {?}
     */
    DraggableDirective.prototype.handleDraggable = /**
     * @param {?} enter$
     * @param {?} leave$
     * @param {?} updateCoords
     * @return {?}
     */
    function (enter$, leave$, updateCoords) {
        var _this = this;
        /** @type {?} */
        var moving = false;
        /** @type {?} */
        var inside = false;
        this.MapService.mapCreated$.subscribe(function () {
            /** @type {?} */
            var mouseUp$ = fromEvent(_this.MapService.mapInstance, 'mouseup');
            /** @type {?} */
            var dragStart$ = enter$.pipe(takeUntil(_this.destroyed$), filter(function () { return !moving; }), filter(function (evt) { return _this.filterFeature(evt); }), tap(function () {
                inside = true;
                _this.MapService.changeCanvasCursor('move');
                _this.MapService.updateDragPan(false);
            }), switchMap(function () {
                return fromEvent(_this.MapService.mapInstance, 'mousedown')
                    .pipe(takeUntil(leave$));
            }));
            /** @type {?} */
            var dragging$ = dragStart$.pipe(switchMap(function () { return fromEvent(_this.MapService.mapInstance, 'mousemove')
                .pipe(takeUntil(mouseUp$)); }));
            /** @type {?} */
            var dragEnd$ = dragStart$.pipe(switchMap(function () { return mouseUp$.pipe(take(1)); }));
            dragStart$.subscribe(function (evt) {
                moving = true;
                if (_this.dragStart.observers.length) {
                    _this.NgZone.run(function () { return _this.dragStart.emit(evt); });
                }
            });
            dragging$.subscribe(function (evt) {
                updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
                if (_this.drag.observers.length) {
                    _this.NgZone.run(function () { return _this.drag.emit(evt); });
                }
            });
            dragEnd$.subscribe(function (evt) {
                moving = false;
                if (_this.dragEnd.observers.length) {
                    _this.NgZone.run(function () { return _this.dragEnd.emit(evt); });
                }
                if (!inside) { // It's possible to dragEnd outside the target (small input lag)
                    // It's possible to dragEnd outside the target (small input lag)
                    _this.MapService.changeCanvasCursor('');
                    _this.MapService.updateDragPan(true);
                }
            });
            leave$.pipe(takeUntil(_this.destroyed$), tap(function () { return inside = false; }), filter(function () { return !moving; })).subscribe(function () {
                _this.MapService.changeCanvasCursor('');
                _this.MapService.updateDragPan(true);
            });
        });
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DraggableDirective.prototype.filterFeature = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        if (this.FeatureComponent && this.layer) {
            /** @type {?} */
            var feature = this.MapService.queryRenderedFeatures(evt.point, {
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
    };
    DraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglDraggable]'
                },] }
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone },
        { type: FeatureComponent, decorators: [{ type: Optional }, { type: Host }] },
        { type: MarkerComponent, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    DraggableDirective.propDecorators = {
        layer: [{ type: Input, args: ['mglDraggable',] }],
        dragStart: [{ type: Output }],
        dragEnd: [{ type: Output }],
        drag: [{ type: Output }]
    };
    return DraggableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ImageComponent = /** @class */ (function () {
    function ImageComponent(MapService$$1, zone) {
        this.MapService = MapService$$1;
        this.zone = zone;
        this.error = new EventEmitter();
        this.loaded = new EventEmitter();
        this.imageAdded = false;
    }
    /**
     * @return {?}
     */
    ImageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data) return [3 /*break*/, 1];
                        this.MapService.addImage(this.id, this.data, this.options);
                        this.imageAdded = true;
                        return [3 /*break*/, 5];
                    case 1:
                        if (!this.url) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.MapService.loadAndAddImage(this.id, this.url, this.options)];
                    case 3:
                        _a.sent();
                        this.imageAdded = true;
                        this.zone.run(function () {
                            _this.loaded.emit();
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        this.zone.run(function () {
                            _this.error.emit(error_1);
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ImageComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["data"] && !changes["data"].isFirstChange() ||
            changes["options"] && !changes["options"].isFirstChange() ||
            changes["url"] && !changes["url"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    };
    /**
     * @return {?}
     */
    ImageComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.imageAdded) {
            this.MapService.removeImage(this.id);
        }
    };
    ImageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-image',
                    template: ''
                }] }
    ];
    /** @nocollapse */
    ImageComponent.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    ImageComponent.propDecorators = {
        id: [{ type: Input }],
        data: [{ type: Input }],
        options: [{ type: Input }],
        url: [{ type: Input }],
        error: [{ type: Output }],
        loaded: [{ type: Output }]
    };
    return ImageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MapComponent = /** @class */ (function () {
    function MapComponent(MapService$$1) {
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
    Object.defineProperty(MapComponent.prototype, "mapInstance", {
        get: /**
         * @return {?}
         */
        function () {
            return this.MapService.mapInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MapComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    MapComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.MapService.destroyMap();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MapComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.MapService.mapCreated$.toPromise()];
                    case 1:
                        _a.sent();
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
                        return [2 /*return*/];
                }
            });
        });
    };
    MapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-map',
                    template: '<div #container></div>',
                    providers: [
                        MapService
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n  :host {\n    display: block;\n  }\n  div {\n    height: 100%;\n    width: 100%;\n  }\n  "]
                }] }
    ];
    /** @nocollapse */
    MapComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
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
    return MapComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PointDirective = /** @class */ (function () {
    function PointDirective() {
    }
    PointDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[mglPoint]' },] }
    ];
    return PointDirective;
}());
var ClusterPointDirective = /** @class */ (function () {
    function ClusterPointDirective() {
    }
    ClusterPointDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[mglClusterPoint]' },] }
    ];
    return ClusterPointDirective;
}());
var MarkerClusterComponent = /** @class */ (function () {
    function MarkerClusterComponent(MapService$$1, ChangeDetectorRef$$1, zone) {
        var _this = this;
        this.MapService = MapService$$1;
        this.ChangeDetectorRef = ChangeDetectorRef$$1;
        this.zone = zone;
        this.load = new EventEmitter();
        this.sub = new Subscription();
        this.getLeavesFn = function (feature) {
            return function (limit, offset) { return (/** @type {?} */ (_this.supercluster.getLeaves))(/** @type {?} */ ((feature.properties.cluster_id)), limit, offset); };
        };
        this.getChildrenFn = function (feature) {
            return function () { return (/** @type {?} */ (_this.supercluster.getChildren))(/** @type {?} */ ((feature.properties.cluster_id))); };
        };
        this.getClusterExpansionZoomFn = function (feature) {
            return function () { return (/** @type {?} */ (_this.supercluster.getClusterExpansionZoom))(/** @type {?} */ ((feature.properties.cluster_id))); };
        };
    }
    /**
     * @return {?}
     */
    MarkerClusterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var options = {
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
            .forEach(function (key) {
            /** @type {?} */
            var tkey = /** @type {?} */ (key);
            if (options[tkey] === undefined) {
                delete options[tkey];
            }
        });
        this.supercluster = supercluster(options);
        this.supercluster.load(this.data.features);
        this.load.emit(this.supercluster);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MarkerClusterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["data"] && !changes["data"].isFirstChange()) {
            this.supercluster.load(this.data.features);
        }
    };
    /**
     * @return {?}
     */
    MarkerClusterComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            /** @type {?} */
            var mapMove$ = merge(fromEvent(_this.MapService.mapInstance, 'zoomChange'), fromEvent(_this.MapService.mapInstance, 'move'));
            /** @type {?} */
            var sub = mapMove$.pipe(startWith(undefined)).subscribe(function () {
                _this.zone.run(function () {
                    _this.updateCluster();
                });
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @return {?}
     */
    MarkerClusterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
    };
    /**
     * @return {?}
     */
    MarkerClusterComponent.prototype.updateCluster = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bbox$$1 = this.MapService.getCurrentViewportBbox();
        /** @type {?} */
        var currentZoom = Math.round(this.MapService.mapInstance.getZoom());
        this.clusterPoints = this.supercluster.getClusters(bbox$$1, currentZoom);
        this.ChangeDetectorRef.markForCheck();
    };
    MarkerClusterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-marker-cluster',
                    template: "\n    <ng-container *ngFor=\"let feature of clusterPoints\">\n      <ng-container *ngIf=\"feature.properties.cluster; else point\">\n        <mgl-marker\n          [feature]=\"feature\"\n        >\n          <ng-container *ngTemplateOutlet=\"clusterPointTpl; context: {\n            $implicit: feature,\n            getLeavesFn: getLeavesFn(feature),\n            getChildrenFn: getChildrenFn(feature),\n            getClusterExpansionZoomFn: getClusterExpansionZoomFn(feature)\n          }\"></ng-container>\n        </mgl-marker>\n      </ng-container>\n      <ng-template #point>\n        <mgl-marker\n          [feature]=\"feature\"\n        >\n          <ng-container *ngTemplateOutlet=\"pointTpl; context: { $implicit: feature }\"></ng-container>\n        </mgl-marker>\n      </ng-template>\n    </ng-container>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    MarkerClusterComponent.ctorParameters = function () { return [
        { type: MapService },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
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
    return MarkerClusterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PopupComponent = /** @class */ (function () {
    function PopupComponent(MapService$$1) {
        this.MapService = MapService$$1;
        this.close = new EventEmitter();
        this.open = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PopupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.lngLat && this.marker || this.feature && this.lngLat || this.feature && this.marker) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PopupComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange() ||
            changes["feature"] && !changes["feature"].isFirstChange()) {
            /** @type {?} */
            var newlngLat = changes["lngLat"] ? /** @type {?} */ ((this.lngLat)) : /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates));
            this.MapService.removePopupFromMap(/** @type {?} */ ((this.popupInstance)), true);
            /** @type {?} */
            var popupInstanceTmp = this.createPopup();
            this.MapService.addPopupToMap(popupInstanceTmp, newlngLat, /** @type {?} */ ((this.popupInstance)).isOpen());
            this.popupInstance = popupInstanceTmp;
        }
        if (changes["marker"] && !changes["marker"].isFirstChange()) {
            /** @type {?} */
            var previousMarker = changes["marker"].previousValue;
            if (previousMarker.markerInstance) {
                this.MapService.removePopupFromMarker(previousMarker.markerInstance);
            }
            if (this.marker && this.marker.markerInstance && this.popupInstance) {
                this.MapService.addPopupToMarker(this.marker.markerInstance, this.popupInstance);
            }
        }
    };
    /**
     * @return {?}
     */
    PopupComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    };
    /**
     * @return {?}
     */
    PopupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.popupInstance) {
            if (this.lngLat) {
                this.MapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.MapService.removePopupFromMarker(this.marker.markerInstance);
            }
        }
        this.popupInstance = undefined;
    };
    /**
     * @return {?}
     */
    PopupComponent.prototype.createPopup = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} popup
     * @return {?}
     */
    PopupComponent.prototype.addPopup = /**
     * @param {?} popup
     * @return {?}
     */
    function (popup) {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            if (_this.lngLat || _this.feature) {
                _this.MapService.addPopupToMap(popup, _this.lngLat ? _this.lngLat : /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((_this.feature)).geometry)).coordinates)));
            }
            else if (_this.marker && _this.marker.markerInstance) {
                _this.MapService.addPopupToMarker(_this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    };
    PopupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-popup',
                    template: '<div #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
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
    return PopupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var CanvasSourceComponent = /** @class */ (function () {
    function CanvasSourceComponent(MapService$$1) {
        this.MapService = MapService$$1;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    CanvasSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init();
            /** @type {?} */
            var sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
                _this.init();
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CanvasSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["coordinates"] && !changes["coordinates"].isFirstChange() ||
            changes["canvas"] && !changes["canvas"].isFirstChange() ||
            changes["animate"] && !changes["animate"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    };
    /**
     * @return {?}
     */
    CanvasSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    };
    /**
     * @return {?}
     */
    CanvasSourceComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var source = {
            type: 'canvas',
            coordinates: this.coordinates,
            canvas: this.canvas,
            animate: this.animate,
        };
        this.MapService.addSource(this.id, source);
        this.sourceAdded = true;
    };
    CanvasSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-canvas-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CanvasSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    CanvasSourceComponent.propDecorators = {
        id: [{ type: Input }],
        coordinates: [{ type: Input }],
        canvas: [{ type: Input }],
        animate: [{ type: Input }]
    };
    return CanvasSourceComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ImageSourceComponent = /** @class */ (function () {
    function ImageSourceComponent(MapService$$1) {
        this.MapService = MapService$$1;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    ImageSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init();
            /** @type {?} */
            var sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
                _this.init();
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ImageSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["url"] && !changes["url"].isFirstChange() ||
            changes["coordinates"] && !changes["coordinates"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    };
    /**
     * @return {?}
     */
    ImageSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    };
    /**
     * @return {?}
     */
    ImageSourceComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.MapService.addSource(this.id, {
            type: 'image',
            url: this.url,
            coordinates: this.coordinates
        });
        this.sourceAdded = true;
    };
    ImageSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-image-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    ImageSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    ImageSourceComponent.propDecorators = {
        id: [{ type: Input }],
        url: [{ type: Input }],
        coordinates: [{ type: Input }]
    };
    return ImageSourceComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RasterSourceComponent = /** @class */ (function () {
    function RasterSourceComponent(MapService$$1) {
        this.MapService = MapService$$1;
        this.type = 'raster';
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    RasterSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init();
            /** @type {?} */
            var sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
                _this.init();
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    RasterSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @return {?}
     */
    RasterSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    };
    /**
     * @return {?}
     */
    RasterSourceComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var source = {
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
    };
    RasterSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-raster-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    RasterSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    RasterSourceComponent.propDecorators = {
        id: [{ type: Input }],
        url: [{ type: Input }],
        tiles: [{ type: Input }],
        bounds: [{ type: Input }],
        minzoom: [{ type: Input }],
        maxzoom: [{ type: Input }],
        tileSize: [{ type: Input }]
    };
    return RasterSourceComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var VectorSourceComponent = /** @class */ (function () {
    function VectorSourceComponent(MapService$$1) {
        this.MapService = MapService$$1;
        this.type = 'vector';
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    VectorSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init();
            /** @type {?} */
            var sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
                _this.init();
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    VectorSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @return {?}
     */
    VectorSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    };
    /**
     * @return {?}
     */
    VectorSourceComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.MapService.addSource(this.id, {
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
        });
        this.sourceAdded = true;
    };
    VectorSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-vector-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    VectorSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    VectorSourceComponent.propDecorators = {
        id: [{ type: Input }],
        url: [{ type: Input }],
        tiles: [{ type: Input }],
        minzoom: [{ type: Input }],
        maxzoom: [{ type: Input }]
    };
    return VectorSourceComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var VideoSourceComponent = /** @class */ (function () {
    function VideoSourceComponent(MapService$$1) {
        this.MapService = MapService$$1;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    VideoSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init();
            /** @type {?} */
            var sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
                _this.init();
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    VideoSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["urls"] && !changes["urls"].isFirstChange() ||
            changes["coordinates"] && !changes["coordinates"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    };
    /**
     * @return {?}
     */
    VideoSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    };
    /**
     * @return {?}
     */
    VideoSourceComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.MapService.addSource(this.id, {
            type: 'video',
            urls: this.urls,
            coordinates: this.coordinates
        });
        this.sourceAdded = true;
    };
    VideoSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-video-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    VideoSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    VideoSourceComponent.propDecorators = {
        id: [{ type: Input }],
        urls: [{ type: Input }],
        coordinates: [{ type: Input }]
    };
    return VideoSourceComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxMapboxGLModule = /** @class */ (function () {
    function NgxMapboxGLModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NgxMapboxGLModule.withConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
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
    };
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
    return NgxMapboxGLModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxMapboxGLModule, MAPBOX_API_KEY, MglResizeEventEmitter, MapService, MapComponent, AttributionControlDirective as ɵs, ControlComponent as ɵm, FullscreenControlDirective as ɵn, GeocoderControlDirective as ɵq, MAPBOX_GEOCODER_API_KEY as ɵp, GeolocateControlDirective as ɵr, NavigationControlDirective as ɵo, ScaleControlDirective as ɵt, DraggableDirective as ɵb, ImageComponent as ɵf, LayerComponent as ɵa, ClusterPointDirective as ɵv, MarkerClusterComponent as ɵw, PointDirective as ɵu, MarkerComponent as ɵe, PopupComponent as ɵl, CanvasSourceComponent as ɵk, FeatureComponent as ɵc, GeoJSONSourceComponent as ɵd, ImageSourceComponent as ɵi, RasterSourceComponent as ɵh, VectorSourceComponent as ɵg, VideoSourceComponent as ɵj };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFwL21hcC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2F0dHJpYnV0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2Z1bGxzY3JlZW4tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL25hdmlnYXRpb24tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvc2NhbGUtY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2xheWVyL2xheWVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS9nZW9qc29uL2dlb2pzb24tc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9pbWFnZS9pbWFnZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL21hcC9tYXAuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9tYXJrZXItY2x1c3Rlci9tYXJrZXItY2x1c3Rlci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3BvcHVwL3BvcHVwLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL2NhbnZhcy1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvaW1hZ2Utc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL3Jhc3Rlci1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvdmVjdG9yLXNvdXJjZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS92aWRlby1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9uZ3gtbWFwYm94LWdsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBiYm94IGZyb20gJ0B0dXJmL2Jib3gnO1xuaW1wb3J0IHsgcG9seWdvbiB9IGZyb20gJ0B0dXJmL2hlbHBlcnMnO1xuaW1wb3J0ICogYXMgTWFwYm94R2wgZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJCb3ggfSBmcm9tICdzdXBlcmNsdXN0ZXInO1xuaW1wb3J0IHsgTWFwRXZlbnQsIE1hcEltYWdlRGF0YSwgTWFwSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi9tYXAudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTWdsUmVzaXplRXZlbnRFbWl0dGVyIHtcbiAgYWJzdHJhY3QgcmVzaXplRXZlbnQ6IE9ic2VydmFibGU8dm9pZD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBNYXAge1xuICBhY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgY3VzdG9tTWFwYm94QXBpVXJsPzogc3RyaW5nO1xuICBtYXBPcHRpb25zOiBhbnk7IC8vIE1hcGJveEdsLk1hcGJveE9wdGlvbnNcbiAgbWFwRXZlbnRzOiBNYXBFdmVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cExheWVyIHtcbiAgbGF5ZXJPcHRpb25zOiBNYXBib3hHbC5MYXllcjtcbiAgbGF5ZXJFdmVudHM6IHtcbiAgICBjbGljazogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICAgIG1vdXNlRW50ZXI6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgICBtb3VzZUxlYXZlOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gICAgbW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBQb3B1cCB7XG4gIHBvcHVwT3B0aW9uczogTWFwYm94R2wuUG9wdXBPcHRpb25zO1xuICBwb3B1cEV2ZW50czoge1xuICAgIG9wZW46IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICBjbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTWFya2VyIHtcbiAgbWFya2Vyc09wdGlvbnM6IHtcbiAgICBvZmZzZXQ/OiBNYXBib3hHbC5Qb2ludExpa2U7XG4gICAgYW5jaG9yPzogTWFwYm94R2wuQW5jaG9yO1xuICAgIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcbiAgICBsbmdMYXQ/OiBNYXBib3hHbC5MbmdMYXRMaWtlO1xuICB9O1xuICBtYXJrZXJzRXZlbnRzOiB7XG4gICAgZHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgICBkcmFnOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgICBkcmFnRW5kOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFya2VyPjtcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQWxsU291cmNlID0gTWFwYm94R2wuVmVjdG9yU291cmNlIHxcbiAgTWFwYm94R2wuUmFzdGVyU291cmNlIHxcbiAgTWFwYm94R2wuR2VvSlNPTlNvdXJjZSB8XG4gIE1hcGJveEdsLkltYWdlU291cmNlT3B0aW9ucyB8XG4gIE1hcGJveEdsLlZpZGVvU291cmNlT3B0aW9ucyB8XG4gIE1hcGJveEdsLkdlb0pTT05Tb3VyY2VSYXcgfFxuICBNYXBib3hHbC5DYW52YXNTb3VyY2VPcHRpb25zO1xuXG5leHBvcnQgdHlwZSBNb3ZpbmdPcHRpb25zID0gTWFwYm94R2wuRmx5VG9PcHRpb25zIHxcbiAgKE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMgJiBNYXBib3hHbC5DYW1lcmFPcHRpb25zKSB8XG4gIE1hcGJveEdsLkNhbWVyYU9wdGlvbnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcbiAgbWFwSW5zdGFuY2U6IE1hcGJveEdsLk1hcDtcbiAgbWFwQ3JlYXRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcExvYWRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcEV2ZW50czogTWFwRXZlbnQ7XG5cbiAgcHJpdmF0ZSBtYXBDcmVhdGVkID0gbmV3IEFzeW5jU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIG1hcExvYWRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsYXllcklkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHNvdXJjZUlkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIG1hcmtlcnNUb1JlbW92ZTogTWFwYm94R2wuTWFya2VyW10gPSBbXTtcbiAgcHJpdmF0ZSBwb3B1cHNUb1JlbW92ZTogTWFwYm94R2wuUG9wdXBbXSA9IFtdO1xuICBwcml2YXRlIGltYWdlSWRzVG9SZW1vdmU6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFQQk9YX0FQSV9LRVkpIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0FQSV9LRVk6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IE1nbFJlc2l6ZUV2ZW50RW1pdHRlcjogTWdsUmVzaXplRXZlbnRFbWl0dGVyXG4gICkge1xuICAgIHRoaXMubWFwQ3JlYXRlZCQgPSB0aGlzLm1hcENyZWF0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYXBMb2FkZWQkID0gdGhpcy5tYXBMb2FkZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXR1cChvcHRpb25zOiBTZXR1cE1hcCkge1xuICAgIC8vIE5lZWQgb25TdGFibGUgdG8gd2FpdCBmb3IgYSBwb3RlbnRpYWwgQGFuZ3VsYXIvcm91dGUgdHJhbnNpdGlvbiB0byBlbmRcbiAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgLy8gV29ya2Fyb3VuZCByb2xsdXAgaXNzdWVcbiAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnYWNjZXNzVG9rZW4nLCBvcHRpb25zLmFjY2Vzc1Rva2VuIHx8IHRoaXMuTUFQQk9YX0FQSV9LRVkpO1xuICAgICAgaWYgKG9wdGlvbnMuY3VzdG9tTWFwYm94QXBpVXJsKSB7XG4gICAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnY29uZmlnLkFQSV9VUkwnLCBvcHRpb25zLmN1c3RvbU1hcGJveEFwaVVybCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNyZWF0ZU1hcChvcHRpb25zLm1hcE9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKG9wdGlvbnMubWFwRXZlbnRzKTtcbiAgICAgIHRoaXMubWFwRXZlbnRzID0gb3B0aW9ucy5tYXBFdmVudHM7XG4gICAgICB0aGlzLm1hcENyZWF0ZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBDcmVhdGVkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95TWFwKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pblpvb20obWluWm9vbTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1pblpvb20obWluWm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVNYXhab29tKG1heFpvb206IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhab29tKG1heFpvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU2Nyb2xsWm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEcmFnUm90YXRlKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS50b3VjaFpvb21Sb3RhdGUuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRG91YmxlQ2xpY2tab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVLZXlib2FyZChzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURyYWdQYW4oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQm94Wm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdHlsZShzdHlsZTogTWFwYm94R2wuU3R5bGUpIHtcbiAgICAvLyBUT0RPIFByb2JhYmx5IG5vdCBzbyBzaW1wbGUsIHdyaXRlIGRlbW8vdGVzdHNcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4Qm91bmRzKG1heEJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSkge1xuICAgIC8vIFRPRE8gUHJvYmFibHkgbm90IHNvIHNpbXBsZSwgd3JpdGUgZGVtby90ZXN0c1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhCb3VuZHMobWF4Qm91bmRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUNhbnZhc0N1cnNvcihjdXJzb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzQ29udGFpbmVyKCk7XG4gICAgY2FudmFzLnN0eWxlLmN1cnNvciA9IGN1cnNvcjtcbiAgfVxuXG4gIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhcbiAgICBwb2ludE9yQm94PzogTWFwYm94R2wuUG9pbnRMaWtlIHwgTWFwYm94R2wuUG9pbnRMaWtlW10sXG4gICAgcGFyYW1ldGVycz86IHsgbGF5ZXJzPzogc3RyaW5nW10sIGZpbHRlcj86IGFueVtdIH1cbiAgKTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+W10ge1xuICAgIHJldHVybiB0aGlzLm1hcEluc3RhbmNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhwb2ludE9yQm94LCBwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHBhblRvKGNlbnRlcjogTWFwYm94R2wuTG5nTGF0TGlrZSwgb3B0aW9ucz86IE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucGFuVG8oY2VudGVyLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmUoXG4gICAgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyxcbiAgICBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucyxcbiAgICB6b29tPzogbnVtYmVyLFxuICAgIGNlbnRlcj86IE1hcGJveEdsLkxuZ0xhdExpa2UsXG4gICAgYmVhcmluZz86IG51bWJlcixcbiAgICBwaXRjaD86IG51bWJlclxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICg8YW55PnRoaXMubWFwSW5zdGFuY2VbbW92aW5nTWV0aG9kXSkoe1xuICAgICAgICAuLi5tb3ZpbmdPcHRpb25zLFxuICAgICAgICB6b29tOiB6b29tID8gem9vbSA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpLFxuICAgICAgICBjZW50ZXI6IGNlbnRlciA/IGNlbnRlciA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2VudGVyKCksXG4gICAgICAgIGJlYXJpbmc6IGJlYXJpbmcgPyBiZWFyaW5nIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRCZWFyaW5nKCksXG4gICAgICAgIHBpdGNoOiBwaXRjaCA/IHBpdGNoIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRQaXRjaCgpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZExheWVyKGxheWVyOiBTZXR1cExheWVyLCBiaW5kRXZlbnRzOiBib29sZWFuLCBiZWZvcmU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMobGF5ZXIubGF5ZXJPcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIE1hcGJveEdsLkxheWVyPmtleTtcbiAgICAgICAgICBpZiAobGF5ZXIubGF5ZXJPcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsYXllci5sYXllck9wdGlvbnNbdGtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkTGF5ZXIobGF5ZXIubGF5ZXJPcHRpb25zLCBiZWZvcmUpO1xuICAgICAgaWYgKGJpbmRFdmVudHMpIHtcbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjbGljaycsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5tb3VzZUVudGVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWVudGVyJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VFbnRlci5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubW91c2VMZWF2ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTGVhdmUuZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vtb3ZlJywgbGF5ZXIubGF5ZXJPcHRpb25zLmlkLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVMYXllcihsYXllcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUucHVzaChsYXllcklkKTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IFNldHVwTWFya2VyKSB7XG4gICAgY29uc3Qgb3B0aW9uczogTWFwYm94R2wuTWFya2VyT3B0aW9ucyA9IHtcbiAgICAgIG9mZnNldDogbWFya2VyLm1hcmtlcnNPcHRpb25zLm9mZnNldCxcbiAgICAgIGFuY2hvcjogbWFya2VyLm1hcmtlcnNPcHRpb25zLmFuY2hvcixcbiAgICAgIGRyYWdnYWJsZTogISFtYXJrZXIubWFya2Vyc09wdGlvbnMuZHJhZ2dhYmxlXG4gICAgfTtcbiAgICBpZiAobWFya2VyLm1hcmtlcnNPcHRpb25zLmVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBvcHRpb25zLmVsZW1lbnQgPSBtYXJrZXIubWFya2Vyc09wdGlvbnMuZWxlbWVudDtcbiAgICB9XG4gICAgY29uc3QgbWFya2VySW5zdGFuY2UgPSBuZXcgTWFwYm94R2wuTWFya2VyKG9wdGlvbnMpO1xuICAgIGlmIChtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWdzdGFydCcsIChldmVudDogeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdTdGFydC5lbWl0KGV2ZW50LnRhcmdldCkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICBtYXJrZXJJbnN0YW5jZS5vbignZHJhZycsIChldmVudDogeyB0YXJnZXQ6IE1hcGJveEdsLk1hcmtlciB9KSA9PlxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWcuZW1pdChldmVudC50YXJnZXQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWdFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZlbnQ6IHsgdGFyZ2V0OiBNYXBib3hHbC5NYXJrZXIgfSkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnRW5kLmVtaXQoZXZlbnQudGFyZ2V0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIG1hcmtlckluc3RhbmNlLnNldExuZ0xhdChtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZSA/XG4gICAgICBtYXJrZXIubWFya2Vyc09wdGlvbnMuZmVhdHVyZS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMgOlxuICAgICAgbWFya2VyLm1hcmtlcnNPcHRpb25zLmxuZ0xhdCFcbiAgICApO1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VySW5zdGFuY2UuYWRkVG8odGhpcy5tYXBJbnN0YW5jZSk7XG4gICAgICByZXR1cm4gbWFya2VySW5zdGFuY2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIpIHtcbiAgICB0aGlzLm1hcmtlcnNUb1JlbW92ZS5wdXNoKG1hcmtlcik7XG4gIH1cblxuICBjcmVhdGVQb3B1cChwb3B1cDogU2V0dXBQb3B1cCwgZWxlbWVudDogTm9kZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocG9wdXAucG9wdXBPcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgICAgICg8YW55PnBvcHVwLnBvcHVwT3B0aW9ucylba2V5XSA9PT0gdW5kZWZpbmVkICYmIGRlbGV0ZSAoPGFueT5wb3B1cC5wb3B1cE9wdGlvbnMpW2tleV0pO1xuICAgICAgY29uc3QgcG9wdXBJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5Qb3B1cChwb3B1cC5wb3B1cE9wdGlvbnMpO1xuICAgICAgcG9wdXBJbnN0YW5jZS5zZXRET01Db250ZW50KGVsZW1lbnQpO1xuICAgICAgaWYgKHBvcHVwLnBvcHVwRXZlbnRzLmNsb3NlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9wdXBJbnN0YW5jZS5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHBvcHVwLnBvcHVwRXZlbnRzLm9wZW4ub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb3B1cEluc3RhbmNlLm9uKCdvcGVuJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMub3Blbi5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcHVwSW5zdGFuY2U7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQb3B1cFRvTWFwKHBvcHVwOiBNYXBib3hHbC5Qb3B1cCwgbG5nTGF0OiBNYXBib3hHbC5MbmdMYXRMaWtlLCBza2lwT3BlbkV2ZW50ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmIChza2lwT3BlbkV2ZW50ICYmICg8YW55PnBvcHVwKS5fbGlzdGVuZXJzKSB7XG4gICAgICAgIGRlbGV0ZSAoPGFueT5wb3B1cCkuX2xpc3RlbmVyc1snb3BlbiddO1xuICAgICAgfVxuICAgICAgcG9wdXAuc2V0TG5nTGF0KGxuZ0xhdCk7XG4gICAgICBwb3B1cC5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIsIHBvcHVwOiBNYXBib3hHbC5Qb3B1cCkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHBvcHVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcChwb3B1cDogTWFwYm94R2wuUG9wdXAsIHNraXBDbG9zZUV2ZW50ID0gZmFsc2UpIHtcbiAgICBpZiAoc2tpcENsb3NlRXZlbnQgJiYgKDxhbnk+cG9wdXApLl9saXN0ZW5lcnMpIHtcbiAgICAgIGRlbGV0ZSAoPGFueT5wb3B1cCkuX2xpc3RlbmVyc1snY2xvc2UnXTtcbiAgICB9XG4gICAgdGhpcy5wb3B1cHNUb1JlbW92ZS5wdXNoKHBvcHVwKTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRDb250cm9sKGNvbnRyb2w6IE1hcGJveEdsLkNvbnRyb2wgfCBNYXBib3hHbC5JQ29udHJvbCwgcG9zaXRpb24/OiAndG9wLXJpZ2h0JyB8ICd0b3AtbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkQ29udHJvbCg8YW55PmNvbnRyb2wsIHBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUNvbnRyb2woY29udHJvbDogTWFwYm94R2wuQ29udHJvbCB8IE1hcGJveEdsLklDb250cm9sKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUNvbnRyb2woPGFueT5jb250cm9sKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRBbmRBZGRJbWFnZShpbWFnZUlkOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLmxvYWRJbWFnZSh1cmwsIChlcnJvcjogeyBzdGF0dXM6IG51bWJlciB9IHwgbnVsbCwgaW1hZ2U6IEltYWdlRGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRJbWFnZShpbWFnZUlkLCBpbWFnZSwgb3B0aW9ucyk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSW1hZ2UoaW1hZ2VJZDogc3RyaW5nLCBkYXRhOiBNYXBJbWFnZURhdGEsIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkSW1hZ2UoaW1hZ2VJZCwgPGFueT5kYXRhLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUltYWdlKGltYWdlSWQ6IHN0cmluZykge1xuICAgIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZS5wdXNoKGltYWdlSWQpO1xuICB9XG5cbiAgYWRkU291cmNlKHNvdXJjZUlkOiBzdHJpbmcsIHNvdXJjZTogQWxsU291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhzb3VyY2UpXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgKDxhbnk+c291cmNlKVtrZXldID09PSB1bmRlZmluZWQgJiYgZGVsZXRlICg8YW55PnNvdXJjZSlba2V5XSk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZFNvdXJjZShzb3VyY2VJZCwgPGFueT5zb3VyY2UpOyAvLyBUeXBpbmdzIGlzc3VlXG4gICAgfSk7XG4gIH1cblxuICBnZXRTb3VyY2U8VD4oc291cmNlSWQ6IHN0cmluZykge1xuICAgIHJldHVybiA8VD48YW55PnRoaXMubWFwSW5zdGFuY2UuZ2V0U291cmNlKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHJlbW92ZVNvdXJjZShzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZS5wdXNoKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHNldEFsbExheWVyUGFpbnRQcm9wZXJ0eShcbiAgICBsYXllcklkOiBzdHJpbmcsXG4gICAgcGFpbnQ6IE1hcGJveEdsLkJhY2tncm91bmRQYWludCB8XG4gICAgICBNYXBib3hHbC5GaWxsUGFpbnQgfFxuICAgICAgTWFwYm94R2wuRmlsbEV4dHJ1c2lvblBhaW50IHxcbiAgICAgIE1hcGJveEdsLkxpbmVQYWludCB8XG4gICAgICBNYXBib3hHbC5TeW1ib2xQYWludCB8XG4gICAgICBNYXBib3hHbC5SYXN0ZXJQYWludCB8XG4gICAgICBNYXBib3hHbC5DaXJjbGVQYWludFxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBhaW50KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgcGVyZiwgc2V0UGFpbnRQcm9wZXJ0eSBvbmx5IG9uIGNoYW5nZWQgcGFpbnQgcHJvcHMgbWF5YmVcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRQYWludFByb3BlcnR5KGxheWVySWQsIGtleSwgKDxhbnk+cGFpbnQpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRBbGxMYXllckxheW91dFByb3BlcnR5KFxuICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICBsYXlvdXQ6IE1hcGJveEdsLkJhY2tncm91bmRMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuRmlsbExheW91dCB8XG4gICAgICBNYXBib3hHbC5GaWxsRXh0cnVzaW9uTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkxpbmVMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuU3ltYm9sTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLlJhc3RlckxheW91dCB8XG4gICAgICBNYXBib3hHbC5DaXJjbGVMYXlvdXRcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhsYXlvdXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldExheW91dFByb3BlcnR5KGxheWVySWQsIGtleSwgKDxhbnk+bGF5b3V0KVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJGaWx0ZXIobGF5ZXJJZDogc3RyaW5nLCBmaWx0ZXI6IGFueVtdKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldEZpbHRlcihsYXllcklkLCBmaWx0ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJCZWZvcmUobGF5ZXJJZDogc3RyaW5nLCBiZWZvcmVJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm1vdmVMYXllcihsYXllcklkLCBiZWZvcmVJZCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllclpvb21SYW5nZShsYXllcklkOiBzdHJpbmcsIG1pblpvb20/OiBudW1iZXIsIG1heFpvb20/OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TGF5ZXJab29tUmFuZ2UobGF5ZXJJZCwgbWluWm9vbSA/IG1pblpvb20gOiAwLCBtYXhab29tID8gbWF4Wm9vbSA6IDIwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpdEJvdW5kcyhib3VuZHM6IE1hcGJveEdsLkxuZ0xhdEJvdW5kc0xpa2UsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuZml0Qm91bmRzKGJvdW5kcywgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDdXJyZW50Vmlld3BvcnRCYm94KCk6IEJCb3gge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzKCk7XG4gICAgY29uc3QgdyA9IHBhcnNlSW50KGNhbnZhcy5zdHlsZS53aWR0aCEsIDEwKTtcbiAgICBjb25zdCBoID0gcGFyc2VJbnQoY2FudmFzLnN0eWxlLmhlaWdodCEsIDEwKTtcbiAgICBjb25zdCB1cExlZnQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbMCwgMF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCB1cFJpZ2h0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoW3csIDBdKS50b0FycmF5KCk7XG4gICAgY29uc3QgZG93blJpZ2h0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoW3csIGhdKS50b0FycmF5KCk7XG4gICAgY29uc3QgZG93bkxlZnQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbMCwgaF0pLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gPGFueT5iYm94KHBvbHlnb24oW1t1cExlZnQsIHVwUmlnaHQsIGRvd25SaWdodCwgZG93bkxlZnQsIHVwTGVmdF1dKSk7XG4gIH1cblxuICBhcHBseUNoYW5nZXMoKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJzKCk7XG4gICAgICB0aGlzLnJlbW92ZVNvdXJjZXMoKTtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VycygpO1xuICAgICAgdGhpcy5yZW1vdmVQb3B1cHMoKTtcbiAgICAgIHRoaXMucmVtb3ZlSW1hZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1hcChvcHRpb25zOiBNYXBib3hHbC5NYXBib3hPcHRpb25zKSB7XG4gICAgTmdab25lLmFzc2VydE5vdEluQW5ndWxhclpvbmUoKTtcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgTWFwYm94R2wuTWFwYm94T3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZSA9IG5ldyBNYXBib3hHbC5NYXAob3B0aW9ucyk7XG4gICAgY29uc3Qgc3ViQ2hhbmdlcyA9IHRoaXMuem9uZS5vbk1pY3JvdGFza0VtcHR5XG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXBwbHlDaGFuZ2VzKCkpO1xuICAgIGlmICh0aGlzLk1nbFJlc2l6ZUV2ZW50RW1pdHRlcikge1xuICAgICAgY29uc3Qgc3ViUmVzaXplID0gdGhpcy5NZ2xSZXNpemVFdmVudEVtaXR0ZXIucmVzaXplRXZlbnQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZXNpemUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1YlJlc2l6ZSk7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChzdWJDaGFuZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTGF5ZXJzKCkge1xuICAgIGZvciAoY29uc3QgbGF5ZXJJZCBvZiB0aGlzLmxheWVySWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdjbGljaycsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ21vdXNlZW50ZXInLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdtb3VzZWxlYXZlJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignbW91c2Vtb3ZlJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUxheWVyKGxheWVySWQpO1xuICAgIH1cbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU291cmNlcygpIHtcbiAgICBmb3IgKGNvbnN0IHNvdXJjZUlkIG9mIHRoaXMuc291cmNlSWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlU291cmNlKHNvdXJjZUlkKTtcbiAgICB9XG4gICAgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVNYXJrZXJzKCkge1xuICAgIGZvciAoY29uc3QgbWFya2VyIG9mIHRoaXMubWFya2Vyc1RvUmVtb3ZlKSB7XG4gICAgICBtYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMubWFya2Vyc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVBvcHVwcygpIHtcbiAgICBmb3IgKGNvbnN0IHBvcHVwIG9mIHRoaXMucG9wdXBzVG9SZW1vdmUpIHtcbiAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLnBvcHVwc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUltYWdlcygpIHtcbiAgICBmb3IgKGNvbnN0IGltYWdlSWQgb2YgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZUltYWdlKGltYWdlSWQpO1xuICAgIH1cbiAgICB0aGlzLmltYWdlSWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgaG9va0V2ZW50cyhldmVudHM6IE1hcEV2ZW50KSB7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbG9hZCcsICgpID0+IHtcbiAgICAgIHRoaXMubWFwTG9hZGVkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMubWFwTG9hZGVkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5sb2FkLmVtaXQodGhpcy5tYXBJbnN0YW5jZSkpO1xuICAgIH0pO1xuICAgIGlmIChldmVudHMucmVzaXplLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3Jlc2l6ZScsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlc2l6ZS5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZW1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVtb3ZlJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVtb3ZlLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlRG93bi5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWRvd24nLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZURvd24uZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VVcC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZXVwJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VVcC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vtb3ZlJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NsaWNrJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY2xpY2suZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGJsQ2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGJsY2xpY2snLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYmxDbGljay5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZUVudGVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZW50ZXInLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZUVudGVyLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlTGVhdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlTGVhdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VPdmVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3ZlcicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlT3Zlci5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU91dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW91dCcsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlT3V0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNvbnRleHRNZW51Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2NvbnRleHRtZW51JywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY29udGV4dE1lbnUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaHN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaEVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaG1vdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaE1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hDYW5jZWwub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hjYW5jZWwnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaENhbmNlbC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53aGVlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAvLyBNYXBib3hHbC5NYXBXaGVlbEV2ZW50XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3aGVlbCcsIChldnQ6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2hlZWwuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdmVzdGFydCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmVFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZWVuZCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZHJhZ3N0YXJ0JywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZ0VuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnZW5kJywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21TdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMuem9vbVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FdnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy56b29tRXZ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnpvb21FbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy56b29tRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZXN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnJvdGF0ZVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucm90YXRlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJvdGF0ZUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGVlbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMucm90YXRlRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hzdGFydCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaEV2dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hFdnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2hlbmQnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21TdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21TdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21lbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21FbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbUNhbmNlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tY2FuY2VsJywgKGV2dDogTWFwYm94R2wuTWFwQm94Wm9vbUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tQ2FuY2VsLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dExvc3Qub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0bG9zdCcsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dExvc3QuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMud2ViR2xDb250ZXh0UmVzdG9yZWQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2ViZ2xjb250ZXh0cmVzdG9yZWQnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53ZWJHbENvbnRleHRSZXN0b3JlZC5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZW5kZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVuZGVyJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVuZGVyLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmVycm9yLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2Vycm9yJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZXJyb3IuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYXRhLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWRhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnN0eWxlRGF0YS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zb3VyY2VEYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnNvdXJjZURhdGEuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGF0YWxvYWRpbmcnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRhdGFMb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnN0eWxlRGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhTG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zb3VyY2VEYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzb3VyY2VkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YUxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBtb3ZlIHRoaXMgZWxzZXdoZXJlXG4gIHByaXZhdGUgYXNzaWduKG9iajogYW55LCBwcm9wOiBhbnksIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgcHJvcCA9IHByb3Auc3BsaXQoJy4nKTtcbiAgICB9XG4gICAgaWYgKHByb3AubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgZSA9IHByb3Auc2hpZnQoKTtcbiAgICAgIHRoaXMuYXNzaWduKG9ialtlXSA9XG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbZV0pID09PSAnW29iamVjdCBPYmplY3RdJ1xuICAgICAgICAgID8gb2JqW2VdXG4gICAgICAgICAgOiB7fSxcbiAgICAgICAgcHJvcCxcbiAgICAgICAgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbcHJvcFswXV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2wsIElDb250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbnRyb2wgaW1wbGVtZW50cyBJQ29udHJvbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudFxuICApIHtcbiAgfVxuXG4gIG9uQWRkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lcjtcbiAgfVxuXG4gIG9uUmVtb3ZlKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBnZXREZWZhdWx0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuICd0b3AtcmlnaHQnO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1jb250cm9sJyxcbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwibWFwYm94Z2wtY3RybFwiICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgcG9zaXRpb24/OiAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCc7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29udHJvbDogQ29udHJvbCB8IElDb250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY29udHJvbCA9IG5ldyBDdXN0b21Db250cm9sKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLmNvbnRyb2whLCB0aGlzLnBvc2l0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVDb250cm9sKHRoaXMuY29udHJvbCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsQXR0cmlidXRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBjb21wYWN0PzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zOiB7IGNvbXBhY3Q/OiBib29sZWFuIH0gPSB7fTtcbiAgICAgIGlmICh0aGlzLmNvbXBhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLmNvbXBhY3QgPSB0aGlzLmNvbXBhY3Q7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBBdHRyaWJ1dGlvbkNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQsIEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZ1bGxzY3JlZW5Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsRnVsbHNjcmVlbl0nXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBGdWxsc2NyZWVuQ29udHJvbCgpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xuICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBHZW9jb2RlckV2ZW50IH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbmNvbnN0IE1hcGJveEdlb2NvZGVyID0gcmVxdWlyZSgnQG1hcGJveC9tYXBib3gtZ2wtZ2VvY29kZXInKTtcblxuZXhwb3J0IGNvbnN0IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZID0gbmV3IEluamVjdGlvblRva2VuKCdNYXBib3hBcGlLZXknKTtcblxuZXhwb3J0IGludGVyZmFjZSBMbmdMYXRMaXRlcmFsIHtcbiAgbGF0aXR1ZGU6IG51bWJlcjtcbiAgbG9uZ2l0dWRlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0cyBleHRlbmRzIEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5Qb2ludD4ge1xuICBhdHRyaWJ1dGlvbjogc3RyaW5nO1xuICBxdWVyeTogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0IGV4dGVuZHMgR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+IHtcbiAgYmJveDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGNlbnRlcjogbnVtYmVyW107XG4gIHBsYWNlX25hbWU6IHN0cmluZztcbiAgcGxhY2VfdHlwZTogc3RyaW5nW107XG4gIHJlbGV2YW5jZTogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29udGV4dDogYW55W107XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xHZW9jb2Rlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBHZW9jb2RlckV2ZW50IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgY291bnRyeT86IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGJib3g/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgQElucHV0KCkgdHlwZXM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZseVRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBASW5wdXQoKSBsaW1pdD86IG51bWJlcjtcbiAgQElucHV0KCkgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBASW5wdXQoKSBmaWx0ZXI/OiAoZmVhdHVyZTogUmVzdWx0KSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBsb2NhbEdlb2NvZGVyPzogKHF1ZXJ5OiBzdHJpbmcpID0+IFJlc3VsdFtdO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHByb3hpbWl0eT86IExuZ0xhdExpdGVyYWw7XG4gIEBJbnB1dCgpIHNlYXJjaElucHV0Pzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBjbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHsgcXVlcnk6IHN0cmluZyB9PigpO1xuICBAT3V0cHV0KCkgcmVzdWx0cyA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzdWx0cz4oKTtcbiAgQE91dHB1dCgpIHJlc3VsdCA9IG5ldyBFdmVudEVtaXR0ZXI8eyByZXN1bHQ6IFJlc3VsdCB9PigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBnZW9jb2RlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZKSBwcml2YXRlIHJlYWRvbmx5IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZOiBzdHJpbmdcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwcm94aW1pdHk6IHRoaXMucHJveGltaXR5LFxuICAgICAgICBjb3VudHJ5OiB0aGlzLmNvdW50cnksXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgIGJib3g6IHRoaXMuYmJveCxcbiAgICAgICAgdHlwZXM6IHRoaXMudHlwZXMsXG4gICAgICAgIGZseVRvOiB0aGlzLmZseVRvLFxuICAgICAgICBtaW5MZW5ndGg6IHRoaXMubWluTGVuZ3RoLFxuICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGxvY2FsR2VvY29kZXI6IHRoaXMubG9jYWxHZW9jb2RlcixcbiAgICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4gfHwgdGhpcy5NQVBCT1hfR0VPQ09ERVJfQVBJX0tFWVxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiB0eXBlb2Ygb3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IE1hcGJveEdlb2NvZGVyKG9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKHRoaXMpO1xuICAgICAgdGhpcy5hZGRDb250cm9sKCk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIucXVlcnkodGhpcy5zZWFyY2hJbnB1dCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmdlb2NvZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnByb3hpbWl0eSAmJiAhY2hhbmdlcy5wcm94aW1pdHkuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLnNldFByb3hpbWl0eShjaGFuZ2VzLnByb3hpbWl0eS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5zZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5xdWVyeSh0aGlzLnNlYXJjaElucHV0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZENvbnRyb2woKSB7XG4gICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSB0aGlzLmdlb2NvZGVyO1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKFxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb25cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGV2ZW50czogR2VvY29kZXJFdmVudCkge1xuICAgIGlmIChldmVudHMucmVzdWx0cy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdyZXN1bHRzJywgKGV2dDogUmVzdWx0cykgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVzdWx0cy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZXN1bHQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbigncmVzdWx0JywgKGV2dDogeyByZXN1bHQ6IFJlc3VsdCB9KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZXN1bHQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignZXJyb3InLCAoZXZ0OiBhbnkpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmVycm9yLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignbG9hZGluZycsIChldnQ6IHsgcXVlcnk6IHN0cmluZyB9KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5sb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNsZWFyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ2NsZWFyJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY2xlYXIuZW1pdCgpKSk7XG4gICAgfVxuXG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VvbG9jYXRlQ29udHJvbCwgRml0Qm91bmRzT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbEdlb2xvY2F0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBwb3NpdGlvbk9wdGlvbnM/OiBQb3NpdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIGZpdEJvdW5kc09wdGlvbnM/OiBGaXRCb3VuZHNPcHRpb25zO1xuICBASW5wdXQoKSB0cmFja1VzZXJMb2NhdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dVc2VyTG9jYXRpb24/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHBvc2l0aW9uT3B0aW9uczogdGhpcy5wb3NpdGlvbk9wdGlvbnMsXG4gICAgICAgIGZpdEJvdW5kc09wdGlvbnM6IHRoaXMuZml0Qm91bmRzT3B0aW9ucyxcbiAgICAgICAgdHJhY2tVc2VyTG9jYXRpb246IHRoaXMudHJhY2tVc2VyTG9jYXRpb24sXG4gICAgICAgIHNob3dVc2VyTG9jYXRpb246IHRoaXMuc2hvd1VzZXJMb2NhdGlvblxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiB0eXBlb2Ygb3B0aW9ucz5rZXk7XG4gICAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IEdlb2xvY2F0ZUNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbE5hdmlnYXRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIHNob3dDb21wYXNzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd1pvb20/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGxldCBvcHRpb25zOiB7IHNob3dDb21wYXNzPzogYm9vbGVhbiwgc2hvd1pvb20/OiBib29sZWFuIH0gPSB7fTtcbiAgICAgIGlmICh0aGlzLnNob3dDb21wYXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy5zaG93Q29tcGFzcyA9IHRoaXMuc2hvd0NvbXBhc3M7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zaG93Wm9vbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMuc2hvd1pvb20gPSB0aGlzLnNob3dab29tO1xuICAgICAgfVxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgTmF2aWdhdGlvbkNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjYWxlQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbFNjYWxlXSdcbn0pXG5leHBvcnQgY2xhc3MgU2NhbGVDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1bml0PzogJ2ltcGVyaWFsJyB8ICdtZXRyaWMnIHwgJ25hdXRpY2FsJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMudW5pdCAmJiAhY2hhbmdlcy51bml0LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgKDxhbnk+dGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpLnNldFVuaXQoY2hhbmdlcy51bml0LmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uczogeyBtYXhXaWR0aD86IG51bWJlciwgdW5pdD86IHN0cmluZyB9ID0ge307XG4gICAgICBpZiAodGhpcy5tYXhXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMubWF4V2lkdGggPSB0aGlzLm1heFdpZHRoO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudW5pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMudW5pdCA9IHRoaXMudW5pdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IFNjYWxlQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLCB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJhY2tncm91bmRMYXlvdXQsXG4gIEJhY2tncm91bmRQYWludCxcbiAgQ2lyY2xlTGF5b3V0LFxuICBDaXJjbGVQYWludCxcbiAgRmlsbEV4dHJ1c2lvbkxheW91dCxcbiAgRmlsbEV4dHJ1c2lvblBhaW50LFxuICBGaWxsTGF5b3V0LFxuICBGaWxsUGFpbnQsXG4gIEdlb0pTT05Tb3VyY2UsXG4gIEdlb0pTT05Tb3VyY2VSYXcsXG4gIEltYWdlU291cmNlLFxuICBMYXllcixcbiAgTGluZUxheW91dCxcbiAgTGluZVBhaW50LFxuICBNYXBNb3VzZUV2ZW50LFxuICBSYXN0ZXJMYXlvdXQsXG4gIFJhc3RlclBhaW50LFxuICBSYXN0ZXJTb3VyY2UsXG4gIFN5bWJvbExheW91dCxcbiAgU3ltYm9sUGFpbnQsXG4gIFZlY3RvclNvdXJjZSxcbiAgVmlkZW9Tb3VyY2Vcbn0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWxheWVyJyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIExheWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgTGF5ZXIge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBzb3VyY2U/OiBzdHJpbmcgfCBWZWN0b3JTb3VyY2UgfCBSYXN0ZXJTb3VyY2UgfCBHZW9KU09OU291cmNlIHwgSW1hZ2VTb3VyY2UgfCBWaWRlb1NvdXJjZSB8IEdlb0pTT05Tb3VyY2VSYXc7XG4gIEBJbnB1dCgpIHR5cGU6ICdzeW1ib2wnIHwgJ2ZpbGwnIHwgJ2xpbmUnIHwgJ2NpcmNsZScgfCAnZmlsbC1leHRydXNpb24nIHwgJ3Jhc3RlcicgfCAnYmFja2dyb3VuZCc7XG4gIEBJbnB1dCgpIG1ldGFkYXRhPzogYW55O1xuICBASW5wdXQoKSBzb3VyY2VMYXllcj86IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBmaWx0ZXI/OiBhbnlbXTtcbiAgQElucHV0KCkgbGF5b3V0PzogQmFja2dyb3VuZExheW91dCB8IEZpbGxMYXlvdXQgfCBGaWxsRXh0cnVzaW9uTGF5b3V0IHwgTGluZUxheW91dCB8IFN5bWJvbExheW91dCB8IFJhc3RlckxheW91dCB8IENpcmNsZUxheW91dDtcbiAgQElucHV0KCkgcGFpbnQ/OiBCYWNrZ3JvdW5kUGFpbnQgfCBGaWxsUGFpbnQgfCBGaWxsRXh0cnVzaW9uUGFpbnQgfCBMaW5lUGFpbnQgfCBTeW1ib2xQYWludCB8IFJhc3RlclBhaW50IHwgQ2lyY2xlUGFpbnQ7XG4gIEBJbnB1dCgpIGJlZm9yZT86IHN0cmluZztcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcblxuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcblxuICBwcml2YXRlIGxheWVyQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KHRydWUpO1xuICAgICAgdGhpcy5zdWIgPSBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnc3R5bGVkYXRhJykucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0TGF5ZXIodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdChmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wYWludCAmJiAhY2hhbmdlcy5wYWludC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRBbGxMYXllclBhaW50UHJvcGVydHkodGhpcy5pZCwgY2hhbmdlcy5wYWludC5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubGF5b3V0ICYmICFjaGFuZ2VzLmxheW91dC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRBbGxMYXllckxheW91dFByb3BlcnR5KHRoaXMuaWQsIGNoYW5nZXMubGF5b3V0LmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5maWx0ZXIgJiYgIWNoYW5nZXMuZmlsdGVyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyRmlsdGVyKHRoaXMuaWQsIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5iZWZvcmUgJiYgIWNoYW5nZXMuYmVmb3JlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyQmVmb3JlKHRoaXMuaWQsIGNoYW5nZXMuYmVmb3JlLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWF4em9vbSAmJiAhY2hhbmdlcy5tYXh6b29tLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyWm9vbVJhbmdlKHRoaXMuaWQsIHRoaXMubWluem9vbSwgdGhpcy5tYXh6b29tKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5sYXllckFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlTGF5ZXIodGhpcy5pZCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoYmluZEV2ZW50czogYm9vbGVhbikge1xuICAgIGNvbnN0IGxheWVyID0ge1xuICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIG1ldGFkYXRhOiB0aGlzLm1ldGFkYXRhLFxuICAgICAgICAnc291cmNlLWxheWVyJzogdGhpcy5zb3VyY2VMYXllcixcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGxheW91dDogdGhpcy5sYXlvdXQsXG4gICAgICAgIHBhaW50OiB0aGlzLnBhaW50XG4gICAgICB9LFxuICAgICAgbGF5ZXJFdmVudHM6IHtcbiAgICAgICAgY2xpY2s6IHRoaXMuY2xpY2ssXG4gICAgICAgIG1vdXNlRW50ZXI6IHRoaXMubW91c2VFbnRlcixcbiAgICAgICAgbW91c2VMZWF2ZTogdGhpcy5tb3VzZUxlYXZlLFxuICAgICAgICBtb3VzZU1vdmU6IHRoaXMubW91c2VNb3ZlXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkTGF5ZXIobGF5ZXIsIGJpbmRFdmVudHMsIHRoaXMuYmVmb3JlKTtcbiAgICB0aGlzLmxheWVyQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMbmdMYXRMaWtlLCBNYXJrZXIsIFBvaW50TGlrZSwgQW5jaG9yIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFya2VyJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBzdHlsZXM6IFtgXG4gICAgLm1hcGJveGdsLW1hcmtlciB7XG4gICAgICBsaW5lLWhlaWdodDogMDtcbiAgICB9XG4gIGBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSBvZmZzZXQ/OiBQb2ludExpa2U7XG4gIEBJbnB1dCgpIGFuY2hvcj86IEFuY2hvcjtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIEBJbnB1dCgpIGZlYXR1cmU/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD47XG4gIEBJbnB1dCgpIGxuZ0xhdD86IExuZ0xhdExpa2U7XG4gIEBJbnB1dCgpIGRyYWdnYWJsZT86IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFya2VyPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIG1hcmtlckluc3RhbmNlPzogTWFya2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmZlYXR1cmUgJiYgdGhpcy5sbmdMYXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZmVhdHVyZSBhbmQgbG5nTGF0IGlucHV0IGFyZSBtdXR1YWxseSBleGNsdXNpdmUnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMubG5nTGF0ICYmICFjaGFuZ2VzLmxuZ0xhdC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdCh0aGlzLmxuZ0xhdCEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5mZWF0dXJlICYmICFjaGFuZ2VzLmZlYXR1cmUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQodGhpcy5mZWF0dXJlIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kcmFnZ2FibGUgJiYgIWNoYW5nZXMuZHJhZ2dhYmxlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0RHJhZ2dhYmxlKCEhdGhpcy5kcmFnZ2FibGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UgPSB0aGlzLk1hcFNlcnZpY2UuYWRkTWFya2VyKHtcbiAgICAgICAgbWFya2Vyc09wdGlvbnM6IHtcbiAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0LFxuICAgICAgICAgIGFuY2hvcjogdGhpcy5hbmNob3IsXG4gICAgICAgICAgZHJhZ2dhYmxlOiAhIXRoaXMuZHJhZ2dhYmxlLFxuICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgIGZlYXR1cmU6IHRoaXMuZmVhdHVyZSxcbiAgICAgICAgICBsbmdMYXQ6IHRoaXMubG5nTGF0XG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtlcnNFdmVudHM6IHtcbiAgICAgICAgICBkcmFnU3RhcnQ6IHRoaXMuZHJhZ1N0YXJ0LFxuICAgICAgICAgIGRyYWc6IHRoaXMuZHJhZyxcbiAgICAgICAgICBkcmFnRW5kOiB0aGlzLmRyYWdFbmRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlTWFya2VyKHRoaXMubWFya2VySW5zdGFuY2UhKTtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdG9nZ2xlUG9wdXAoKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEudG9nZ2xlUG9wdXAoKTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdChjb29yZGluYXRlcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlLCBHZW9KU09OU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWdlb2pzb24tc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHZW9KU09OU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgR2VvSlNPTlNvdXJjZU9wdGlvbnMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIGRhdGE/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeT4gfCBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uR2VvbWV0cnk+IHwgc3RyaW5nO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBidWZmZXI/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHRvbGVyYW5jZT86IG51bWJlcjtcbiAgQElucHV0KCkgY2x1c3Rlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsdXN0ZXJSYWRpdXM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNsdXN0ZXJNYXhab29tPzogbnVtYmVyO1xuXG4gIHVwZGF0ZUZlYXR1cmVEYXRhID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGZlYXR1cmVJZENvdW50ZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kYXRhKSB7XG4gICAgICB0aGlzLmRhdGEgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgIGZlYXR1cmVzOiBbXVxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5idWZmZXIgJiYgIWNoYW5nZXMuYnVmZmVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50b2xlcmFuY2UgJiYgIWNoYW5nZXMudG9sZXJhbmNlLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jbHVzdGVyICYmICFjaGFuZ2VzLmNsdXN0ZXIuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNsdXN0ZXJSYWRpdXMgJiYgIWNoYW5nZXMuY2x1c3RlclJhZGl1cy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2x1c3Rlck1heFpvb20gJiYgIWNoYW5nZXMuY2x1c3Rlck1heFpvb20uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuTWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBzb3VyY2Uuc2V0RGF0YSh0aGlzLmRhdGEhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEZlYXR1cmUoZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+KSB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IDxHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+PnRoaXMuZGF0YTtcbiAgICBjb2xsZWN0aW9uLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KCk7XG4gIH1cblxuICByZW1vdmVGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSA8R2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pj50aGlzLmRhdGE7XG4gICAgY29uc3QgaW5kZXggPSBjb2xsZWN0aW9uLmZlYXR1cmVzLmluZGV4T2YoZmVhdHVyZSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGNvbGxlY3Rpb24uZmVhdHVyZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KCk7XG4gIH1cblxuICBnZXROZXdGZWF0dXJlSWQoKSB7XG4gICAgcmV0dXJuICsrdGhpcy5mZWF0dXJlSWRDb3VudGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgYnVmZmVyOiB0aGlzLmJ1ZmZlcixcbiAgICAgIHRvbGVyYW5jZTogdGhpcy50b2xlcmFuY2UsXG4gICAgICBjbHVzdGVyOiB0aGlzLmNsdXN0ZXIsXG4gICAgICBjbHVzdGVyUmFkaXVzOiB0aGlzLmNsdXN0ZXJSYWRpdXMsXG4gICAgICBjbHVzdGVyTWF4Wm9vbTogdGhpcy5jbHVzdGVyTWF4Wm9vbSxcbiAgICB9KTtcbiAgICBjb25zdCBzdWIgPSB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLnBpcGUoZGVib3VuY2VUaW1lKDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5NYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICAgIHNvdXJjZS5zZXREYXRhKHRoaXMuZGF0YSEpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWZlYXR1cmUnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ/OiBudW1iZXI7IC8vIEZJWE1FIG51bWJlciBvbmx5IGZvciBub3cgaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvaXNzdWVzLzI3MTZcbiAgQElucHV0KCkgZ2VvbWV0cnk6IEdlb0pTT04uR2VvbWV0cnlPYmplY3Q7XG4gIEBJbnB1dCgpIHByb3BlcnRpZXM6IGFueTtcbiAgdHlwZTogJ0ZlYXR1cmUnID0gJ0ZlYXR1cmUnO1xuXG4gIHByaXZhdGUgZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBHZW9KU09OU291cmNlQ29tcG9uZW50KSkgcHJpdmF0ZSBHZW9KU09OU291cmNlQ29tcG9uZW50OiBHZW9KU09OU291cmNlQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LmdldE5ld0ZlYXR1cmVJZCgpO1xuICAgIH1cbiAgICB0aGlzLmZlYXR1cmUgPSB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICBnZW9tZXRyeTogdGhpcy5nZW9tZXRyeSxcbiAgICAgIHByb3BlcnRpZXM6IHRoaXMucHJvcGVydGllcyA/IHRoaXMucHJvcGVydGllcyA6IHt9XG4gICAgfTtcbiAgICB0aGlzLmZlYXR1cmUuaWQgPSB0aGlzLmlkO1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5hZGRGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQucmVtb3ZlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICB9XG5cbiAgdXBkYXRlQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXM6IG51bWJlcltdKSB7XG4gICAgKDxHZW9KU09OLlBvaW50PnRoaXMuZmVhdHVyZS5nZW9tZXRyeSkuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcbiAgICB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQudXBkYXRlRmVhdHVyZURhdGEubmV4dCgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBNb3VzZUV2ZW50IH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuLi9sYXllci9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi4vc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsRHJhZ2dhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnbWdsRHJhZ2dhYmxlJykgbGF5ZXI/OiBMYXllckNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBkZXN0cm95ZWQkOiBSZXBsYXlTdWJqZWN0PHZvaWQ+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgTmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIEZlYXR1cmVDb21wb25lbnQ/OiBGZWF0dXJlQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBNYXJrZXJDb21wb25lbnQ/OiBNYXJrZXJDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgZW50ZXIkO1xuICAgIGxldCBsZWF2ZSQ7XG4gICAgbGV0IHVwZGF0ZUNvb3JkcztcbiAgICBpZiAodGhpcy5NYXJrZXJDb21wb25lbnQpIHtcbiAgICAgIGNvbnNvbGUud2FybignbWdsRHJhZ2dhYmxlIG9uIE1hcmtlciBpcyBkZXByZWNhdGVkLCB1c2UgZHJhZ2dhYmxlIGlucHV0IGluc3RlYWQnKTtcbiAgICAgIGxldCBtYXJrZXJFbGVtZW50ID0gKDxFbGVtZW50PnRoaXMuTWFya2VyQ29tcG9uZW50LmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICBpZiAobWFya2VyRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWFya2VyRWxlbWVudCA9IG1hcmtlckVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICB9XG4gICAgICBlbnRlciQgPSBmcm9tRXZlbnQobWFya2VyRWxlbWVudCwgJ21vdXNlZW50ZXInKTtcbiAgICAgIGxlYXZlJCA9IGZyb21FdmVudChtYXJrZXJFbGVtZW50LCAnbW91c2VsZWF2ZScpO1xuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5NYXJrZXJDb21wb25lbnQudXBkYXRlQ29vcmRpbmF0ZXMuYmluZCh0aGlzLk1hcmtlckNvbXBvbmVudCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgZW50ZXIkID0gdGhpcy5sYXllci5tb3VzZUVudGVyO1xuICAgICAgbGVhdmUkID0gdGhpcy5sYXllci5tb3VzZUxlYXZlO1xuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5GZWF0dXJlQ29tcG9uZW50LnVwZGF0ZUNvb3JkaW5hdGVzLmJpbmQodGhpcy5GZWF0dXJlQ29tcG9uZW50KTtcbiAgICAgIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQuZ2VvbWV0cnkudHlwZSAhPT0gJ1BvaW50Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbERyYWdnYWJsZSBvbmx5IHN1cHBvcnQgcG9pbnQgZmVhdHVyZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbERyYWdnYWJsZSBjYW4gb25seSBiZSB1c2VkIG9uIEZlYXR1cmUgKHdpdGggYSBsYXllciBhcyBpbnB1dCkgb3IgTWFya2VyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEcmFnZ2FibGUoZW50ZXIkLCBsZWF2ZSQsIHVwZGF0ZUNvb3Jkcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCh1bmRlZmluZWQpO1xuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVEcmFnZ2FibGUoZW50ZXIkOiBPYnNlcnZhYmxlPGFueT4sIGxlYXZlJDogT2JzZXJ2YWJsZTxhbnk+LCB1cGRhdGVDb29yZHM6IChjb29yZDogbnVtYmVyW10pID0+IHZvaWQpIHtcbiAgICBsZXQgbW92aW5nID0gZmFsc2U7XG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgbW91c2VVcCQgPSBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2V1cCcpO1xuICAgICAgY29uc3QgZHJhZ1N0YXJ0JCA9IGVudGVyJC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICFtb3ZpbmcpLFxuICAgICAgICBmaWx0ZXIoKGV2dCkgPT4gdGhpcy5maWx0ZXJGZWF0dXJlKGV2dCkpLFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGluc2lkZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignbW92ZScpO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKGZhbHNlKTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIGZyb21FdmVudDxNYXBNb3VzZUV2ZW50Pih0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3VzZWRvd24nKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGxlYXZlJCkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCBkcmFnZ2luZyQgPSBkcmFnU3RhcnQkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2Vtb3ZlJylcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwobW91c2VVcCQpKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29uc3QgZHJhZ0VuZCQgPSBkcmFnU3RhcnQkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtb3VzZVVwJC5waXBlKHRha2UoMSkpKVxuICAgICAgKTtcbiAgICAgIGRyYWdTdGFydCQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgbW92aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnU3RhcnQuZW1pdChldnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkcmFnZ2luZyQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgdXBkYXRlQ29vcmRzKFtldnQubG5nTGF0LmxuZywgZXZ0LmxuZ0xhdC5sYXRdKTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5OZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZy5lbWl0KGV2dCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRyYWdFbmQkLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgIG1vdmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5kcmFnRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnRW5kLmVtaXQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbnNpZGUpIHsgLy8gSXQncyBwb3NzaWJsZSB0byBkcmFnRW5kIG91dHNpZGUgdGhlIHRhcmdldCAoc21hbGwgaW5wdXQgbGFnKVxuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxlYXZlJC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSxcbiAgICAgICAgdGFwKCgpID0+IGluc2lkZSA9IGZhbHNlKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICFtb3ZpbmcpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1Bhbih0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJGZWF0dXJlKGV2dDogTWFwTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgY29uc3QgZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPGFueT4gPSB0aGlzLk1hcFNlcnZpY2UucXVlcnlSZW5kZXJlZEZlYXR1cmVzKFxuICAgICAgICBldnQucG9pbnQsXG4gICAgICAgIHtcbiAgICAgICAgICBsYXllcnM6IFt0aGlzLmxheWVyLmlkXSxcbiAgICAgICAgICBmaWx0ZXI6IFtcbiAgICAgICAgICAgICdhbGwnLFxuICAgICAgICAgICAgWyc9PScsICckdHlwZScsICdQb2ludCddLFxuICAgICAgICAgICAgWyc9PScsICckaWQnLCB0aGlzLkZlYXR1cmVDb21wb25lbnQuaWRdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICApWzBdO1xuICAgICAgaWYgKCFmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBJbWFnZURhdGEsIE1hcEltYWdlT3B0aW9ucyB9IGZyb20gJy4uL21hcC9tYXAudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2UnLFxuICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBkYXRhPzogTWFwSW1hZ2VEYXRhO1xuICBASW5wdXQoKSBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zO1xuICBASW5wdXQoKSB1cmw/OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjx7IHN0YXR1czogbnVtYmVyIH0+KCk7XG4gIEBPdXRwdXQoKSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBpbWFnZUFkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRhdGEpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZEltYWdlKFxuICAgICAgICAgIHRoaXMuaWQsXG4gICAgICAgICAgdGhpcy5kYXRhLFxuICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmltYWdlQWRkZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnVybCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuTWFwU2VydmljZS5sb2FkQW5kQWRkSW1hZ2UoXG4gICAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgICAgdGhpcy51cmwsXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuaW1hZ2VBZGRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZC5lbWl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVycm9yLmVtaXQoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm9wdGlvbnMgJiYgIWNoYW5nZXMub3B0aW9ucy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudXJsICYmICFjaGFuZ2VzLnVybC5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5pbWFnZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlSW1hZ2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBbmltYXRpb25PcHRpb25zLFxuICBFdmVudERhdGEsXG4gIExuZ0xhdEJvdW5kc0xpa2UsXG4gIExuZ0xhdExpa2UsXG4gIE1hcCxcbiAgTWFwQm94Wm9vbUV2ZW50LFxuICBNYXBNb3VzZUV2ZW50LFxuICBNYXBUb3VjaEV2ZW50LFxuICBQYWRkaW5nT3B0aW9ucyxcbiAgUG9pbnRMaWtlLFxuICBTdHlsZVxuICB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlLCBNb3ZpbmdPcHRpb25zIH0gZnJvbSAnLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBFdmVudCB9IGZyb20gJy4vbWFwLnR5cGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgbmFtZXNwYWNlIG1hcGJveGdsIHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIE1hcGJveE9wdGlvbnMge1xuICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdD86IGJvb2xlYW47XG4gICAgICB0cmFuc2Zvcm1SZXF1ZXN0PzogRnVuY3Rpb247XG4gICAgICBsb2NhbElkZW9ncmFwaEZvbnRGYW1pbHk/OiBzdHJpbmc7XG4gICAgICBwaXRjaFdpdGhSb3RhdGU/OiBib29sZWFuO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFwJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250YWluZXI+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbiAgZGl2IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgYF0sXG4gIHByb3ZpZGVyczogW1xuICAgIE1hcFNlcnZpY2VcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE1hcEV2ZW50IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGN1c3RvbU1hcGJveEFwaVVybD86IHN0cmluZztcbiAgQElucHV0KCkgaGFzaD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlZnJlc2hFeHBpcmVkVGlsZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xhc3Nlcz86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBiZWFyaW5nU25hcD86IG51bWJlcjtcbiAgQElucHV0KCkgaW50ZXJhY3RpdmU/OiBib29sZWFuO1xuICBASW5wdXQoKSBwaXRjaFdpdGhSb3RhdGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBhdHRyaWJ1dGlvbkNvbnRyb2w/OiBib29sZWFuO1xuICBASW5wdXQoKSBsb2dvUG9zaXRpb24/OiAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCc7XG4gIEBJbnB1dCgpIG1heFRpbGVDYWNoZVNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseT86IHN0cmluZztcbiAgQElucHV0KCkgcHJlc2VydmVEcmF3aW5nQnVmZmVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyV29ybGRDb3BpZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSB0cmFja1Jlc2l6ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRyYW5zZm9ybVJlcXVlc3Q/OiBGdW5jdGlvbjtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBtaW5ab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXhab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBzY3JvbGxab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZHJhZ1JvdGF0ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRvdWNoWm9vbVJvdGF0ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRvdWJsZUNsaWNrWm9vbT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGtleWJvYXJkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZHJhZ1Bhbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJveFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBzdHlsZTogU3R5bGUgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGNlbnRlcj86IExuZ0xhdExpa2U7XG4gIEBJbnB1dCgpIG1heEJvdW5kcz86IExuZ0xhdEJvdW5kc0xpa2U7XG4gIEBJbnB1dCgpIHpvb20/OiBbbnVtYmVyXTtcbiAgQElucHV0KCkgYmVhcmluZz86IFtudW1iZXJdO1xuICBASW5wdXQoKSBwaXRjaD86IFtudW1iZXJdO1xuXG4gIC8qIEFkZGVkIGJ5IG5neC1tYXBib3gtZ2wgKi9cbiAgQElucHV0KCkgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyA9ICdmbHlUbyc7XG4gIEBJbnB1dCgpIG1vdmluZ09wdGlvbnM/OiBNb3ZpbmdPcHRpb25zO1xuICBASW5wdXQoKSBmaXRCb3VuZHM/OiBMbmdMYXRCb3VuZHNMaWtlO1xuICBASW5wdXQoKSBmaXRCb3VuZHNPcHRpb25zPzoge1xuICAgIGxpbmVhcj86IGJvb2xlYW4sXG4gICAgZWFzaW5nPzogRnVuY3Rpb24sXG4gICAgcGFkZGluZz86IG51bWJlciB8IFBhZGRpbmdPcHRpb25zLFxuICAgIG9mZnNldD86IFBvaW50TGlrZSxcbiAgICBtYXhab29tPzogbnVtYmVyXG4gIH07XG4gIEBJbnB1dCgpIGNlbnRlcldpdGhQYW5Ubz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBhblRvT3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIGN1cnNvclN0eWxlPzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSByZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBjb250ZXh0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgd2hlZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTsgLy8gVE9ETyBNYXBXaGVlbEV2ZW50XG4gIEBPdXRwdXQoKSBtb3ZlU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTsgLy8gVE9ETyBDaGVjayB0eXBlXG4gIEBPdXRwdXQoKSBtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdmVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB6b29tU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgem9vbUV2dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB6b29tRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcGl0Y2hTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgcGl0Y2hFdnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHBpdGNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIHdlYkdsQ29udGV4dExvc3QgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRSZXN0b3JlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIFRPRE8gQ2hlY2sgdHlwZVxuICBAT3V0cHV0KCkgZGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc3R5bGVEYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBzb3VyY2VEYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBkYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc3R5bGVEYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcblxuICBnZXQgbWFwSW5zdGFuY2UoKTogTWFwIHtcbiAgICByZXR1cm4gdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgbWFwQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0dXAoe1xuICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXG4gICAgICBjdXN0b21NYXBib3hBcGlVcmw6IHRoaXMuY3VzdG9tTWFwYm94QXBpVXJsLFxuICAgICAgbWFwT3B0aW9uczoge1xuICAgICAgICBjb250YWluZXI6IHRoaXMubWFwQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgICBzdHlsZTogdGhpcy5zdHlsZSxcbiAgICAgICAgaGFzaDogdGhpcy5oYXNoLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdGhpcy5pbnRlcmFjdGl2ZSxcbiAgICAgICAgYmVhcmluZ1NuYXA6IHRoaXMuYmVhcmluZ1NuYXAsXG4gICAgICAgIHBpdGNoV2l0aFJvdGF0ZTogdGhpcy5waXRjaFdpdGhSb3RhdGUsXG4gICAgICAgIGNsYXNzZXM6IHRoaXMuY2xhc3NlcyxcbiAgICAgICAgYXR0cmlidXRpb25Db250cm9sOiB0aGlzLmF0dHJpYnV0aW9uQ29udHJvbCxcbiAgICAgICAgbG9nb1Bvc2l0aW9uOiB0aGlzLmxvZ29Qb3NpdGlvbixcbiAgICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdDogdGhpcy5mYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0LFxuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRoaXMucHJlc2VydmVEcmF3aW5nQnVmZmVyLFxuICAgICAgICByZWZyZXNoRXhwaXJlZFRpbGVzOiB0aGlzLnJlZnJlc2hFeHBpcmVkVGlsZXMsXG4gICAgICAgIG1heEJvdW5kczogdGhpcy5tYXhCb3VuZHMsXG4gICAgICAgIHNjcm9sbFpvb206IHRoaXMuc2Nyb2xsWm9vbSxcbiAgICAgICAgYm94Wm9vbTogdGhpcy5ib3hab29tLFxuICAgICAgICBkcmFnUm90YXRlOiB0aGlzLmRyYWdSb3RhdGUsXG4gICAgICAgIGRyYWdQYW46IHRoaXMuZHJhZ1BhbixcbiAgICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQsXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogdGhpcy5kb3VibGVDbGlja1pvb20sXG4gICAgICAgIHRvdWNoWm9vbVJvdGF0ZTogdGhpcy50b3VjaFpvb21Sb3RhdGUsXG4gICAgICAgIHRyYWNrUmVzaXplOiB0aGlzLnRyYWNrUmVzaXplLFxuICAgICAgICBjZW50ZXI6IHRoaXMuY2VudGVyLFxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgIGJlYXJpbmc6IHRoaXMuYmVhcmluZyxcbiAgICAgICAgcGl0Y2g6IHRoaXMucGl0Y2gsXG4gICAgICAgIHJlbmRlcldvcmxkQ29waWVzOiB0aGlzLnJlbmRlcldvcmxkQ29waWVzLFxuICAgICAgICBtYXhUaWxlQ2FjaGVTaXplOiB0aGlzLm1heFRpbGVDYWNoZVNpemUsXG4gICAgICAgIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseTogdGhpcy5sb2NhbElkZW9ncmFwaEZvbnRGYW1pbHksXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IHRoaXMudHJhbnNmb3JtUmVxdWVzdFxuICAgICAgfSxcbiAgICAgIG1hcEV2ZW50czogdGhpc1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmN1cnNvclN0eWxlKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKHRoaXMuY3Vyc29yU3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5kZXN0cm95TWFwKCk7XG4gIH1cblxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgYXdhaXQgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnRvUHJvbWlzZSgpO1xuICAgIGlmIChjaGFuZ2VzLmN1cnNvclN0eWxlICYmICFjaGFuZ2VzLmN1cnNvclN0eWxlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcihjaGFuZ2VzLmN1cnNvclN0eWxlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1pblpvb20gJiYgIWNoYW5nZXMubWluWm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVNaW5ab29tKGNoYW5nZXMubWluWm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXhab29tICYmICFjaGFuZ2VzLm1heFpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlTWF4Wm9vbShjaGFuZ2VzLm1heFpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc2Nyb2xsWm9vbSAmJiAhY2hhbmdlcy5zY3JvbGxab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZVNjcm9sbFpvb20oY2hhbmdlcy5zY3JvbGxab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRyYWdSb3RhdGUgJiYgIWNoYW5nZXMuZHJhZ1JvdGF0ZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUm90YXRlKGNoYW5nZXMuZHJhZ1JvdGF0ZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy50b3VjaFpvb21Sb3RhdGUgJiYgIWNoYW5nZXMudG91Y2hab29tUm90YXRlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShjaGFuZ2VzLnRvdWNoWm9vbVJvdGF0ZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kb3VibGVDbGlja1pvb20gJiYgIWNoYW5nZXMuZG91YmxlQ2xpY2tab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURvdWJsZUNsaWNrWm9vbShjaGFuZ2VzLmRvdWJsZUNsaWNrWm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5rZXlib2FyZCAmJiAhY2hhbmdlcy5rZXlib2FyZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVLZXlib2FyZChjaGFuZ2VzLmtleWJvYXJkLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRyYWdQYW4gJiYgIWNoYW5nZXMuZHJhZ1Bhbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKGNoYW5nZXMuZHJhZ1Bhbi5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5ib3hab29tICYmICFjaGFuZ2VzLmJveFpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlQm94Wm9vbShjaGFuZ2VzLmJveFpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc3R5bGUgJiYgIWNoYW5nZXMuc3R5bGUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlU3R5bGUoY2hhbmdlcy5zdHlsZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXhCb3VuZHMgJiYgIWNoYW5nZXMubWF4Qm91bmRzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZU1heEJvdW5kcyhjaGFuZ2VzLm1heEJvdW5kcy5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5maXRCb3VuZHMgJiYgIWNoYW5nZXMuZml0Qm91bmRzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmZpdEJvdW5kcyhjaGFuZ2VzLmZpdEJvdW5kcy5jdXJyZW50VmFsdWUsIHRoaXMuZml0Qm91bmRzT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuY2VudGVyV2l0aFBhblRvICYmXG4gICAgICBjaGFuZ2VzLmNlbnRlciAmJiAhY2hhbmdlcy5jZW50ZXIuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICAhY2hhbmdlcy56b29tICYmICFjaGFuZ2VzLmJlYXJpbmcgJiYgIWNoYW5nZXMucGl0Y2hcbiAgICApIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5wYW5Ubyh0aGlzLmNlbnRlciEsIHRoaXMucGFuVG9PcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgY2hhbmdlcy5jZW50ZXIgJiYgIWNoYW5nZXMuY2VudGVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy56b29tICYmICFjaGFuZ2VzLnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmJlYXJpbmcgJiYgIWNoYW5nZXMuYmVhcmluZy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMucGl0Y2ggJiYgIWNoYW5nZXMucGl0Y2guaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UubW92ZShcbiAgICAgICAgdGhpcy5tb3ZpbmdNZXRob2QsXG4gICAgICAgIHRoaXMubW92aW5nT3B0aW9ucyxcbiAgICAgICAgY2hhbmdlcy56b29tICYmIHRoaXMuem9vbSA/IHRoaXMuem9vbVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5jZW50ZXIgPyB0aGlzLmNlbnRlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5iZWFyaW5nICYmIHRoaXMuYmVhcmluZyA/IHRoaXMuYmVhcmluZ1swXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5waXRjaCAmJiB0aGlzLnBpdGNoID8gdGhpcy5waXRjaFswXSA6IHVuZGVmaW5lZFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgc3VwZXJjbHVzdGVyLCB7IENsdXN0ZXIsIE9wdGlvbnMgYXMgU3VwZXJjbHVzdGVyT3B0aW9ucywgU3VwZXJjbHVzdGVyIH0gZnJvbSAnc3VwZXJjbHVzdGVyJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttZ2xQb2ludF0nIH0pXG5leHBvcnQgY2xhc3MgUG9pbnREaXJlY3RpdmUgeyB9XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbENsdXN0ZXJQb2ludF0nIH0pXG5leHBvcnQgY2xhc3MgQ2x1c3RlclBvaW50RGlyZWN0aXZlIHsgfVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFya2VyLWNsdXN0ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZlYXR1cmUgb2YgY2x1c3RlclBvaW50c1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyOyBlbHNlIHBvaW50XCI+XG4gICAgICAgIDxtZ2wtbWFya2VyXG4gICAgICAgICAgW2ZlYXR1cmVdPVwiZmVhdHVyZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2x1c3RlclBvaW50VHBsOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAkaW1wbGljaXQ6IGZlYXR1cmUsXG4gICAgICAgICAgICBnZXRMZWF2ZXNGbjogZ2V0TGVhdmVzRm4oZmVhdHVyZSksXG4gICAgICAgICAgICBnZXRDaGlsZHJlbkZuOiBnZXRDaGlsZHJlbkZuKGZlYXR1cmUpLFxuICAgICAgICAgICAgZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbjogZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbihmZWF0dXJlKVxuICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZ2wtbWFya2VyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI3BvaW50PlxuICAgICAgICA8bWdsLW1hcmtlclxuICAgICAgICAgIFtmZWF0dXJlXT1cImZlYXR1cmVcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBvaW50VHBsOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogZmVhdHVyZSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWdsLW1hcmtlcj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDbHVzdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgcmFkaXVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXhab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtaW5ab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBleHRlbnQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG5vZGVTaXplPzogbnVtYmVyO1xuICBASW5wdXQoKSBsb2c/OiBib29sZWFuO1xuICBASW5wdXQoKSByZWR1Y2U/OiAoYWNjdW11bGF0ZWQ6IGFueSwgcHJvcHM6IGFueSkgPT4gdm9pZDtcbiAgQElucHV0KCkgaW5pdGlhbD86ICgpID0+IGFueTtcbiAgQElucHV0KCkgbWFwPzogKHByb3BzOiBhbnkpID0+IGFueTtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIEBJbnB1dCgpIGRhdGE6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5Qb2ludD47XG5cbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPFN1cGVyY2x1c3Rlcj4oKTtcblxuICBAQ29udGVudENoaWxkKFBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIHBvaW50VHBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKENsdXN0ZXJQb2ludERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KSBjbHVzdGVyUG9pbnRUcGw6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY2x1c3RlclBvaW50czogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+W107XG5cbiAgcHJpdmF0ZSBzdXBlcmNsdXN0ZXI6IFN1cGVyY2x1c3RlcjtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgQ2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3Qgb3B0aW9uczogU3VwZXJjbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgIHJhZGl1czogdGhpcy5yYWRpdXMsXG4gICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXG4gICAgICBtaW5ab29tOiB0aGlzLm1pblpvb20sXG4gICAgICBleHRlbnQ6IHRoaXMuZXh0ZW50LFxuICAgICAgbm9kZVNpemU6IHRoaXMubm9kZVNpemUsXG4gICAgICBsb2c6IHRoaXMubG9nLFxuICAgICAgcmVkdWNlOiB0aGlzLnJlZHVjZSxcbiAgICAgIGluaXRpYWw6IHRoaXMuaW5pdGlhbCxcbiAgICAgIG1hcDogdGhpcy5tYXBcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiBTdXBlcmNsdXN0ZXJPcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLnN1cGVyY2x1c3RlciA9IHN1cGVyY2x1c3RlcihvcHRpb25zKTtcbiAgICB0aGlzLnN1cGVyY2x1c3Rlci5sb2FkKHRoaXMuZGF0YS5mZWF0dXJlcyk7XG4gICAgdGhpcy5sb2FkLmVtaXQodGhpcy5zdXBlcmNsdXN0ZXIpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuc3VwZXJjbHVzdGVyLmxvYWQodGhpcy5kYXRhLmZlYXR1cmVzKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBtYXBNb3ZlJCA9IG1lcmdlKFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnem9vbUNoYW5nZScpLFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW92ZScpXG4gICAgICApO1xuICAgICAgY29uc3Qgc3ViID0gbWFwTW92ZSQucGlwZShcbiAgICAgICAgc3RhcnRXaXRoPGFueT4odW5kZWZpbmVkKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNsdXN0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGdldExlYXZlc0ZuID0gKGZlYXR1cmU6IENsdXN0ZXIpID0+IHtcbiAgICByZXR1cm4gKGxpbWl0PzogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldExlYXZlcykoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhLCBsaW1pdCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGdldENoaWxkcmVuRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAoKSA9PiAoPGFueT50aGlzLnN1cGVyY2x1c3Rlci5nZXRDaGlsZHJlbikoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhKTtcbiAgfVxuXG4gIGdldENsdXN0ZXJFeHBhbnNpb25ab29tRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAoKSA9PiAoPGFueT50aGlzLnN1cGVyY2x1c3Rlci5nZXRDbHVzdGVyRXhwYW5zaW9uWm9vbSkoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ2x1c3RlcigpIHtcbiAgICBjb25zdCBiYm94ID0gdGhpcy5NYXBTZXJ2aWNlLmdldEN1cnJlbnRWaWV3cG9ydEJib3goKTtcbiAgICBjb25zdCBjdXJyZW50Wm9vbSA9IE1hdGgucm91bmQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFpvb20oKSk7XG4gICAgdGhpcy5jbHVzdGVyUG9pbnRzID0gdGhpcy5zdXBlcmNsdXN0ZXIuZ2V0Q2x1c3RlcnMoYmJveCwgY3VycmVudFpvb20pO1xuICAgIHRoaXMuQ2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9pbnRMaWtlLCBQb3B1cCwgTG5nTGF0TGlrZSB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4uL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXBvcHVwJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj4nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuICAvKiBJbml0IGlucHV0ICovXG4gIEBJbnB1dCgpIGNsb3NlQnV0dG9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xvc2VPbkNsaWNrPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYW5jaG9yPzogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnO1xuICBASW5wdXQoKSBvZmZzZXQ/OiBudW1iZXIgfCBQb2ludExpa2UgfCB7IFthbmNob3I6IHN0cmluZ106IFtudW1iZXIsIG51bWJlcl0gfTtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIEBJbnB1dCgpIGZlYXR1cmU/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD47XG4gIEBJbnB1dCgpIGxuZ0xhdD86IExuZ0xhdExpa2U7XG4gIEBJbnB1dCgpIG1hcmtlcj86IE1hcmtlckNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIHBvcHVwSW5zdGFuY2U/OiBQb3B1cDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5sbmdMYXQgJiYgdGhpcy5tYXJrZXIgfHwgdGhpcy5mZWF0dXJlICYmIHRoaXMubG5nTGF0IHx8IHRoaXMuZmVhdHVyZSAmJiB0aGlzLm1hcmtlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXJrZXIsIGxuZ0xhdCwgZmVhdHVyZSBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXMubG5nTGF0ICYmICFjaGFuZ2VzLmxuZ0xhdC5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuZmVhdHVyZSAmJiAhY2hhbmdlcy5mZWF0dXJlLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgY29uc3QgbmV3bG5nTGF0ID0gY2hhbmdlcy5sbmdMYXQgPyB0aGlzLmxuZ0xhdCEgOiB0aGlzLmZlYXR1cmUhLmdlb21ldHJ5IS5jb29yZGluYXRlcyE7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFwKHRoaXMucG9wdXBJbnN0YW5jZSEsIHRydWUpO1xuICAgICAgY29uc3QgcG9wdXBJbnN0YW5jZVRtcCA9IHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKHBvcHVwSW5zdGFuY2VUbXAsIG5ld2xuZ0xhdCwgdGhpcy5wb3B1cEluc3RhbmNlIS5pc09wZW4oKSk7XG4gICAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSBwb3B1cEluc3RhbmNlVG1wO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXJrZXIgJiYgIWNoYW5nZXMubWFya2VyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgY29uc3QgcHJldmlvdXNNYXJrZXI6IE1hcmtlckNvbXBvbmVudCA9IGNoYW5nZXMubWFya2VyLnByZXZpb3VzVmFsdWU7XG4gICAgICBpZiAocHJldmlvdXNNYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcihwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UgJiYgdGhpcy5wb3B1cEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlLCB0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgdGhpcy5hZGRQb3B1cCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucG9wdXBJbnN0YW5jZSkge1xuICAgICAgaWYgKHRoaXMubG5nTGF0KSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUG9wdXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuTWFwU2VydmljZS5jcmVhdGVQb3B1cCh7XG4gICAgICBwb3B1cE9wdGlvbnM6IHtcbiAgICAgICAgY2xvc2VCdXR0b246IHRoaXMuY2xvc2VCdXR0b24sXG4gICAgICAgIGNsb3NlT25DbGljazogdGhpcy5jbG9zZU9uQ2xpY2ssXG4gICAgICAgIGFuY2hvcjogdGhpcy5hbmNob3IsXG4gICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXRcbiAgICAgIH0sXG4gICAgICBwb3B1cEV2ZW50czoge1xuICAgICAgICBvcGVuOiB0aGlzLm9wZW4sXG4gICAgICAgIGNsb3NlOiB0aGlzLmNsb3NlXG4gICAgICB9XG4gICAgfSwgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQb3B1cChwb3B1cDogUG9wdXApIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmxuZ0xhdCB8fCB0aGlzLmZlYXR1cmUpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXAocG9wdXAsIHRoaXMubG5nTGF0ID8gdGhpcy5sbmdMYXQgOiB0aGlzLmZlYXR1cmUhLmdlb21ldHJ5IS5jb29yZGluYXRlcyEpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSwgcG9wdXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2wtcG9wdXAgbmVlZCBlaXRoZXIgbG5nTGF0L21hcmtlci9mZWF0dXJlIHRvIGJlIHNldCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FudmFzU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1jYW52YXMtc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYW52YXNTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBDYW52YXNTb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBjb29yZGluYXRlczogbnVtYmVyW11bXTtcbiAgQElucHV0KCkgY2FudmFzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFuaW1hdGU/OiBib29sZWFuO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmNvb3JkaW5hdGVzICYmICFjaGFuZ2VzLmNvb3JkaW5hdGVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jYW52YXMgJiYgIWNoYW5nZXMuY2FudmFzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5hbmltYXRlICYmICFjaGFuZ2VzLmFuaW1hdGUuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgY29uc3Qgc291cmNlID0ge1xuICAgICAgdHlwZTogJ2NhbnZhcycsXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlcyxcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBhbmltYXRlOiB0aGlzLmFuaW1hdGUsXG4gICAgfTtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHNvdXJjZSk7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZVNvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2Utc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZVNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEltYWdlU291cmNlT3B0aW9ucyB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvb3JkaW5hdGVzOiBudW1iZXJbXVtdO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNvb3JkaW5hdGVzICYmICFjaGFuZ2VzLmNvb3JkaW5hdGVzLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlc1xuICAgIH0pO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFzdGVyU291cmNlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXJhc3Rlci1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFJhc3RlclNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFJhc3RlclNvdXJjZSB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpbGVzPzogc3RyaW5nW107XG4gIEBJbnB1dCgpIGJvdW5kcz86IG51bWJlcltdO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSB0aWxlU2l6ZT86IG51bWJlcjtcblxuICB0eXBlOiAncmFzdGVyJyA9ICdyYXN0ZXInOyAvLyBKdXN0IHRvIG1ha2UgdHMgaGFwcHlcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy51cmwgJiYgIWNoYW5nZXMudXJsLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50aWxlcyAmJiAhY2hhbmdlcy50aWxlcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuYm91bmRzICYmICFjaGFuZ2VzLmJvdW5kcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5tYXh6b29tICYmICFjaGFuZ2VzLm1heHpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRpbGVTaXplICYmICFjaGFuZ2VzLnRpbGVTaXplLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICB0aWxlczogdGhpcy50aWxlcyxcbiAgICAgIGJvdW5kczogdGhpcy5ib3VuZHMsXG4gICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20sXG4gICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICB0aWxlU2l6ZTogdGhpcy50aWxlU2l6ZVxuICAgIH07XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmVjdG9yU291cmNlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXZlY3Rvci1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFZlY3RvclNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFZlY3RvclNvdXJjZSB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsPzogc3RyaW5nO1xuICBASW5wdXQoKSB0aWxlcz86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuXG4gIHR5cGU6ICd2ZWN0b3InID0gJ3ZlY3Rvcic7IC8vIEp1c3QgdG8gbWFrZSB0cyBoYXBweVxuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRpbGVzICYmICFjaGFuZ2VzLnRpbGVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICB0aWxlczogdGhpcy50aWxlcyxcbiAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICB9KTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZGVvU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC12aWRlby1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgVmlkZW9Tb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1cmxzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgY29vcmRpbmF0ZXM6IG51bWJlcltdW107XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICBjb25zdCBzdWIgPSBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnc3R5bGVkYXRhJykucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0U291cmNlKHRoaXMuaWQpKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMudXJscyAmJiAhY2hhbmdlcy51cmxzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jb29yZGluYXRlcyAmJiAhY2hhbmdlcy5jb29yZGluYXRlcy5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICB1cmxzOiB0aGlzLnVybHMsXG4gICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlc1xuICAgIH0pO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9hdHRyaWJ1dGlvbi1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2Z1bGxzY3JlZW4tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLCBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSB9IGZyb20gJy4vY29udHJvbC9nZW9jb2Rlci1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2dlb2xvY2F0ZS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9uYXZpZ2F0aW9uLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjYWxlQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9zY2FsZS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZS9pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuL2xheWVyL2xheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBDb21wb25lbnQgfSBmcm9tICcuL21hcC9tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IE1BUEJPWF9BUElfS0VZIH0gZnJvbSAnLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2x1c3RlclBvaW50RGlyZWN0aXZlLCBNYXJrZXJDbHVzdGVyQ29tcG9uZW50LCBQb2ludERpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2VyLWNsdXN0ZXIvbWFya2VyLWNsdXN0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL3BvcHVwL3BvcHVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW52YXNTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9jYW52YXMtc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFJhc3RlclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3Jhc3Rlci1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZlY3RvclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZlY3Rvci1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZGVvU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvdmlkZW8tc291cmNlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJTb3VyY2VDb21wb25lbnQsXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXG4gICAgQ2FudmFzU291cmNlQ29tcG9uZW50LFxuICAgIEZlYXR1cmVDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFBvcHVwQ29tcG9uZW50LFxuICAgIENvbnRyb2xDb21wb25lbnQsXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2VyQ2x1c3RlckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJTb3VyY2VDb21wb25lbnQsXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXG4gICAgQ2FudmFzU291cmNlQ29tcG9uZW50LFxuICAgIEZlYXR1cmVDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFBvcHVwQ29tcG9uZW50LFxuICAgIENvbnRyb2xDb21wb25lbnQsXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2VyQ2x1c3RlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hcGJveEdMTW9kdWxlIHtcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiB7IGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGdlb2NvZGVyQWNjZXNzVG9rZW4/OiBzdHJpbmcgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWFwYm94R0xNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9BUElfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuYWNjZXNzVG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuZ2VvY29kZXJBY2Nlc3NUb2tlbiB8fCBjb25maWcuYWNjZXNzVG9rZW5cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsiTWFwYm94R2wuTWFya2VyIiwiTWFwYm94R2wuUG9wdXAiLCJmaWx0ZXIiLCJNYXBib3hHbC5NYXAiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiTWFwU2VydmljZSIsIkNvbnRyb2xDb21wb25lbnQiLCJHZW9KU09OU291cmNlQ29tcG9uZW50IiwiTmdab25lIiwiRmVhdHVyZUNvbXBvbmVudCIsIk1hcmtlckNvbXBvbmVudCIsIkNoYW5nZURldGVjdG9yUmVmIiwiYmJveCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVNBLElBQWEsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O0FBRWpFOzs7QUFBQTs7O2dDQVhBO0lBYUMsQ0FBQTs7SUF1RUMsb0JBQ1UsTUFDNkMsY0FBc0IsRUFDOUMscUJBQTRDO1FBRmpFLFNBQUksR0FBSixJQUFJO1FBQ3lDLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBQzlDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7MEJBWnRELElBQUksWUFBWSxFQUFRO3lCQUN6QixJQUFJLFlBQVksRUFBUTtnQ0FDUCxFQUFFO2lDQUNELEVBQUU7K0JBQ0ssRUFBRTs4QkFDSixFQUFFO2dDQUNSLEVBQUU7NEJBQ2hCLElBQUksWUFBWSxFQUFFO1FBT3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDakQ7Ozs7O0lBRUQsMEJBQUs7Ozs7SUFBTCxVQUFNLE9BQWlCO1FBQXZCLGlCQWNDOztRQVpDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7O1lBRXpDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsV0FBVyxJQUFJLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNqRixJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtnQkFDOUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDckU7WUFDRCxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDbkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM1QixDQUFDLENBQUM7S0FDSjs7OztJQUVELCtCQUFVOzs7SUFBVjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUMzQjs7Ozs7SUFFRCxrQ0FBYTs7OztJQUFiLFVBQWMsT0FBZTtRQUE3QixpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxrQ0FBYTs7OztJQUFiLFVBQWMsT0FBZTtRQUE3QixpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxxQ0FBZ0I7Ozs7SUFBaEIsVUFBaUIsTUFBZTtRQUFoQyxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkYsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQscUNBQWdCOzs7O0lBQWhCLFVBQWlCLE1BQWU7UUFBaEMsaUJBSUM7UUFIQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDakMsTUFBTSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZGLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELDBDQUFxQjs7OztJQUFyQixVQUFzQixNQUFlO1FBQXJDLGlCQUlDO1FBSEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pDLE1BQU0sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqRyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCwwQ0FBcUI7Ozs7SUFBckIsVUFBc0IsTUFBZTtRQUFyQyxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDakcsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsbUNBQWM7Ozs7SUFBZCxVQUFlLE1BQWU7UUFBOUIsaUJBSUM7UUFIQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDakMsTUFBTSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ25GLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELGtDQUFhOzs7O0lBQWIsVUFBYyxNQUFlO1FBQTdCLGlCQUlDO1FBSEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pDLE1BQU0sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxrQ0FBYTs7OztJQUFiLFVBQWMsTUFBZTtRQUE3QixpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDakYsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsZ0NBQVc7Ozs7SUFBWCxVQUFZLEtBQXFCO1FBQWpDLGlCQUtDOztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxvQ0FBZTs7OztJQUFmLFVBQWdCLFNBQW9DO1FBQXBELGlCQUtDOztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQyxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCx1Q0FBa0I7Ozs7SUFBbEIsVUFBbUIsTUFBYzs7UUFDL0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUM5Qjs7Ozs7O0lBRUQsMENBQXFCOzs7OztJQUFyQixVQUNFLFVBQXNELEVBQ3RELFVBQWtEO1FBRWxELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDdkU7Ozs7OztJQUVELDBCQUFLOzs7OztJQUFMLFVBQU0sTUFBMkIsRUFBRSxPQUFtQztRQUF0RSxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDekMsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7Ozs7SUFFRCx5QkFBSTs7Ozs7Ozs7O0lBQUosVUFDRSxZQUEyQyxFQUMzQyxhQUE2QixFQUM3QixJQUFhLEVBQ2IsTUFBNEIsRUFDNUIsT0FBZ0IsRUFDaEIsS0FBYztRQU5oQixpQkFpQkM7UUFUQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDakMsbUJBQU0sS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsZ0JBQy9CLGFBQWEsSUFDaEIsSUFBSSxFQUFFLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFDOUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsRUFDdEQsT0FBTyxFQUFFLE9BQU8sR0FBRyxPQUFPLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsRUFDMUQsS0FBSyxFQUFFLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFDbEQsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKOzs7Ozs7O0lBRUQsNkJBQVE7Ozs7OztJQUFSLFVBQVMsS0FBaUIsRUFBRSxVQUFtQixFQUFFLE1BQWU7UUFBaEUsaUJBeUNDO1FBeENDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2lCQUM1QixPQUFPLENBQUMsVUFBQyxHQUFXOztnQkFDbkIsSUFBTSxJQUFJLHFCQUF5QixHQUFHLEVBQUM7Z0JBQ3ZDLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQzFDLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDakM7YUFDRixDQUFDLENBQUM7WUFDTCxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELElBQUksVUFBVSxFQUFFO2dCQUNkLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDNUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBMkI7d0JBQzlFLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUNaLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDbkMsQ0FBQyxDQUFDO3FCQUNKLENBQUMsQ0FBQztpQkFDSjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ2pELEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxVQUFDLEdBQTJCO3dCQUNuRixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDWixLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3hDLENBQUMsQ0FBQztxQkFDSixDQUFDLENBQUM7aUJBQ0o7Z0JBQ0QsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO29CQUNqRCxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsVUFBQyxHQUEyQjt3QkFDbkYsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQ1osS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUN4QyxDQUFDLENBQUM7cUJBQ0osQ0FBQyxDQUFDO2lCQUNKO2dCQUNELElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDaEQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBMkI7d0JBQ2xGLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUNaLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDdkMsQ0FBQyxDQUFDO3FCQUNKLENBQUMsQ0FBQztpQkFDSjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsZ0NBQVc7Ozs7SUFBWCxVQUFZLE9BQWU7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFFRCw4QkFBUzs7OztJQUFULFVBQVUsTUFBbUI7UUFBN0IsaUJBaUNDOztRQWhDQyxJQUFNLE9BQU8sR0FBMkI7WUFDdEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTTtZQUNwQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTO1NBQzdDLENBQUM7UUFDRixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7U0FDakQ7O1FBQ0QsSUFBTSxjQUFjLEdBQUcsSUFBSUEsTUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNuRCxjQUFjLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEtBQWtDO2dCQUNoRSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFBLENBQUM7YUFBQSxDQUN2RSxDQUFDO1NBQ0g7UUFDRCxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDOUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFrQztnQkFDM0QsT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBQSxDQUFDO2FBQUEsQ0FDbEUsQ0FBQztTQUNIO1FBQ0QsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2pELGNBQWMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsS0FBa0M7Z0JBQzlELE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUEsQ0FBQzthQUFBLENBQ3JFLENBQUM7U0FDSDtRQUNELGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLHNCQUNwRCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUUsV0FBVztjQUNuRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBQyxDQUM5QixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pDLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sY0FBYyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELGlDQUFZOzs7O0lBQVosVUFBYSxNQUF1QjtRQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQzs7Ozs7O0lBRUQsZ0NBQVc7Ozs7O0lBQVgsVUFBWSxLQUFpQixFQUFFLE9BQWE7UUFBNUMsaUJBdUJDO1FBdEJDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7aUJBQzVCLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBQ1gsT0FBQSxtQkFBTSxLQUFLLENBQUMsWUFBWSxHQUFFLEdBQUcsQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLG1CQUFNLEtBQUssQ0FBQyxZQUFZLEdBQUUsR0FBRyxDQUFDO2FBQUEsQ0FBQyxDQUFDOztZQUMzRixJQUFNLGFBQWEsR0FBRyxJQUFJQyxLQUFjLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdELGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUM1QyxhQUFhLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDeEIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQ1osS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ2hDLENBQUMsQ0FBQztpQkFDSixDQUFDLENBQUM7YUFDSjtZQUNELElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDM0MsYUFBYSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3dCQUNaLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUMvQixDQUFDLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLGFBQWEsQ0FBQztTQUN0QixDQUFDLENBQUM7S0FDSjs7Ozs7OztJQUVELGtDQUFhOzs7Ozs7SUFBYixVQUFjLEtBQXFCLEVBQUUsTUFBMkIsRUFBRSxhQUFxQjtRQUF2RixpQkFRQztRQVJpRSw4QkFBQSxFQUFBLHFCQUFxQjtRQUNyRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDakMsSUFBSSxhQUFhLElBQUksbUJBQU0sS0FBSyxHQUFFLFVBQVUsRUFBRTtnQkFDNUMsT0FBTyxtQkFBTSxLQUFLLEdBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMvQixDQUFDLENBQUM7S0FDSjs7Ozs7O0lBRUQscUNBQWdCOzs7OztJQUFoQixVQUFpQixNQUF1QixFQUFFLEtBQXFCO1FBQzdELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCLENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFRCx1Q0FBa0I7Ozs7O0lBQWxCLFVBQW1CLEtBQXFCLEVBQUUsY0FBc0I7UUFBdEIsK0JBQUEsRUFBQSxzQkFBc0I7UUFDOUQsSUFBSSxjQUFjLElBQUksbUJBQU0sS0FBSyxHQUFFLFVBQVUsRUFBRTtZQUM3QyxPQUFPLG1CQUFNLEtBQUssR0FBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQzs7Ozs7SUFFRCwwQ0FBcUI7Ozs7SUFBckIsVUFBc0IsTUFBdUI7UUFDM0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUIsQ0FBQyxDQUFDO0tBQ0o7Ozs7OztJQUVELCtCQUFVOzs7OztJQUFWLFVBQVcsT0FBNkMsRUFBRSxRQUFvRTtRQUE5SCxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsbUJBQU0sT0FBTyxHQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JELENBQUMsQ0FBQztLQUNKOzs7OztJQUVELGtDQUFhOzs7O0lBQWIsVUFBYyxPQUE2QztRQUEzRCxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsbUJBQU0sT0FBTyxFQUFDLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7SUFFSyxvQ0FBZTs7Ozs7O0lBQXJCLFVBQXNCLE9BQWUsRUFBRSxHQUFXLEVBQUUsT0FBeUI7Ozs7Z0JBQzNFLHNCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFVBQUMsS0FBZ0MsRUFBRSxLQUFnQjtnQ0FDakYsSUFBSSxLQUFLLEVBQUU7b0NBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUNkLE9BQU87aUNBQ1I7Z0NBQ0QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dDQUN2QyxPQUFPLEVBQUUsQ0FBQzs2QkFDWCxDQUFDLENBQUM7eUJBQ0osQ0FBQyxDQUFDO3FCQUNKLENBQUMsRUFBQzs7O0tBQ0o7Ozs7Ozs7SUFFRCw2QkFBUTs7Ozs7O0lBQVIsVUFBUyxPQUFlLEVBQUUsSUFBa0IsRUFBRSxPQUF5QjtRQUF2RSxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLG9CQUFPLElBQUksR0FBRSxPQUFPLENBQUMsQ0FBQztTQUN4RCxDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxnQ0FBVzs7OztJQUFYLFVBQVksT0FBZTtRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JDOzs7Ozs7SUFFRCw4QkFBUzs7Ozs7SUFBVCxVQUFVLFFBQWdCLEVBQUUsTUFBaUI7UUFBN0MsaUJBT0M7UUFOQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBQ1gsT0FBQSxtQkFBTSxNQUFNLEdBQUUsR0FBRyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sbUJBQU0sTUFBTSxHQUFFLEdBQUcsQ0FBQzthQUFBLENBQUMsQ0FBQztZQUNuRSxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLG9CQUFPLE1BQU0sRUFBQyxDQUFDO1NBQ25ELENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFRCw4QkFBUzs7Ozs7SUFBVCxVQUFhLFFBQWdCO1FBQzNCLDJDQUFlLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFDO0tBQ3JEOzs7OztJQUVELGlDQUFZOzs7O0lBQVosVUFBYSxRQUFnQjtRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZDOzs7Ozs7SUFFRCw2Q0FBd0I7Ozs7O0lBQXhCLFVBQ0UsT0FBZSxFQUNmLEtBTXNCO1FBUnhCLGlCQWdCQztRQU5DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7OztnQkFFN0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLG1CQUFNLEtBQUssR0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3BFLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFRCw4Q0FBeUI7Ozs7O0lBQXpCLFVBQ0UsT0FBZSxFQUNmLE1BTXVCO1FBUnpCLGlCQWdCQztRQU5DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7OztnQkFFOUIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLG1CQUFNLE1BQU0sR0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3RFLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFRCxtQ0FBYzs7Ozs7SUFBZCxVQUFlLE9BQWUsRUFBRUMsU0FBYTtRQUE3QyxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUVBLFNBQU0sQ0FBQyxDQUFDO1NBQzdDLENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFRCxtQ0FBYzs7Ozs7SUFBZCxVQUFlLE9BQWUsRUFBRSxRQUFnQjtRQUFoRCxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDL0MsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7SUFFRCxzQ0FBaUI7Ozs7OztJQUFqQixVQUFrQixPQUFlLEVBQUUsT0FBZ0IsRUFBRSxPQUFnQjtRQUFyRSxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzVGLENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFRCw4QkFBUzs7Ozs7SUFBVCxVQUFVLE1BQWlDLEVBQUUsT0FBYTtRQUExRCxpQkFJQztRQUhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDN0MsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCwyQ0FBc0I7OztJQUF0Qjs7UUFDRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDOztRQUM1QyxJQUFNLENBQUMsR0FBRyxRQUFRLG9CQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFHLEVBQUUsQ0FBQyxDQUFDOztRQUM1QyxJQUFNLENBQUMsR0FBRyxRQUFRLG9CQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFHLEVBQUUsQ0FBQyxDQUFDOztRQUM3QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztRQUM1RCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztRQUM3RCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztRQUMvRCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlELHlCQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztLQUM3RTs7OztJQUVELGlDQUFZOzs7SUFBWjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCLENBQUMsQ0FBQztLQUNKOzs7OztJQUVPLDhCQUFTOzs7O2NBQUMsT0FBK0I7O1FBQy9DLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ2pCLE9BQU8sQ0FBQyxVQUFDLEdBQVc7O1lBQ25CLElBQU0sSUFBSSxxQkFBaUMsR0FBRyxFQUFDO1lBQy9DLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEI7U0FDRixDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUlDLEdBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFDN0MsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7YUFDMUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxFQUFFLEdBQUEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFOztZQUM5QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztnQkFDakUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMzQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7OztJQUc1QixpQ0FBWTs7Ozs7O1lBQ2xCLEtBQXNCLElBQUEsS0FBQUMsU0FBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXhDLElBQU0sT0FBTyxXQUFBO2dCQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZDOzs7Ozs7Ozs7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDOzs7OztJQUdyQixrQ0FBYTs7Ozs7O1lBQ25CLEtBQXVCLElBQUEsS0FBQUEsU0FBQSxJQUFJLENBQUMsaUJBQWlCLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTFDLElBQU0sUUFBUSxXQUFBO2dCQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6Qzs7Ozs7Ozs7O1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQzs7Ozs7SUFHdEIsa0NBQWE7Ozs7OztZQUNuQixLQUFxQixJQUFBLEtBQUFBLFNBQUEsSUFBSSxDQUFDLGVBQWUsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBdEMsSUFBTSxNQUFNLFdBQUE7Z0JBQ2YsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCOzs7Ozs7Ozs7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQzs7Ozs7SUFHcEIsaUNBQVk7Ozs7OztZQUNsQixLQUFvQixJQUFBLEtBQUFBLFNBQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBcEMsSUFBTSxLQUFLLFdBQUE7Z0JBQ2QsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2hCOzs7Ozs7Ozs7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQzs7Ozs7SUFHbkIsaUNBQVk7Ozs7OztZQUNsQixLQUFzQixJQUFBLEtBQUFBLFNBQUEsSUFBSSxDQUFDLGdCQUFnQixDQUFBLGdCQUFBLDRCQUFFO2dCQUF4QyxJQUFNLE9BQU8sV0FBQTtnQkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkM7Ozs7Ozs7OztRQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Ozs7OztJQUdyQiwrQkFBVTs7OztjQUFDLE1BQWdCOztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDMUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMxQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFBLENBQUMsQ0FBQztTQUN6RCxDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDaEY7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDaEY7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDaEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDNUc7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDdEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDdEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDcEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDeEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDdEg7UUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBQyxHQUEyQixJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7U0FDbEg7UUFDRCxJQUFJLE1BQU0s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LENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQ2xIO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQzNHO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQzlHO1FBQ0QsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQUMsR0FBNkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQzVIO1FBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBNkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQ3hIO1FBQ0QsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsR0FBNkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQzlIO1FBQ0QsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQ3BHO1FBQ0QsSUFBSSxNQUFNLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQzVHO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQzlFO1FBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQ3RHO1FBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQ2hIO1FBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1NBQ2xI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