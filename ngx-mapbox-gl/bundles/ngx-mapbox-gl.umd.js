(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@turf/bbox'), require('@turf/helpers'), require('mapbox-gl'), require('rxjs'), require('rxjs/operators'), require('supercluster'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-mapbox-gl', ['exports', '@angular/core', '@turf/bbox', '@turf/helpers', 'mapbox-gl', 'rxjs', 'rxjs/operators', 'supercluster', '@angular/common'], factory) :
    (factory((global['ngx-mapbox-gl'] = {}),global.ng.core,global.bbox,global.helpers,global.MapboxGl,global.rxjs,global.rxjs.operators,global.supercluster,global.ng.common));
}(this, (function (exports,core,bbox,helpers,MapboxGl,rxjs,operators,supercluster,common) { 'use strict';

    bbox = bbox && bbox.hasOwnProperty('default') ? bbox['default'] : bbox;
    supercluster = supercluster && supercluster.hasOwnProperty('default') ? supercluster['default'] : supercluster;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MAPBOX_API_KEY = new core.InjectionToken('MapboxApiKey');
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ MglResizeEventEmitter = /** @class */ (function () {
        function MglResizeEventEmitter() {
        }
        return MglResizeEventEmitter;
    }());
    var MapService = /** @class */ (function () {
        function MapService(zone, MAPBOX_API_KEY, MglResizeEventEmitter) {
            this.zone = zone;
            this.MAPBOX_API_KEY = MAPBOX_API_KEY;
            this.MglResizeEventEmitter = MglResizeEventEmitter;
            this.mapCreated = new rxjs.AsyncSubject();
            this.mapLoaded = new rxjs.AsyncSubject();
            this.layerIdsToRemove = [];
            this.sourceIdsToRemove = [];
            this.markersToRemove = [];
            this.popupsToRemove = [];
            this.imageIdsToRemove = [];
            this.subscription = new rxjs.Subscription();
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
                this.zone.onStable.pipe(operators.first()).subscribe(function () {
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
                    ( /** @type {?} */(_this.mapInstance[movingMethod]))(__assign({}, movingOptions, { zoom: zoom ? zoom : _this.mapInstance.getZoom(), center: center ? center : _this.mapInstance.getCenter(), bearing: bearing ? bearing : _this.mapInstance.getBearing(), pitch: pitch ? pitch : _this.mapInstance.getPitch() }));
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
                        return ( /** @type {?} */(popup.popupOptions))[key] === undefined && delete ( /** @type {?} */(popup.popupOptions))[key];
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
                if (skipOpenEvent === void 0) {
                    skipOpenEvent = false;
                }
                return this.zone.runOutsideAngular(function () {
                    if (skipOpenEvent && ( /** @type {?} */(popup))._listeners) {
                        delete ( /** @type {?} */(popup))._listeners['open'];
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
                if (skipCloseEvent === void 0) {
                    skipCloseEvent = false;
                }
                if (skipCloseEvent && ( /** @type {?} */(popup))._listeners) {
                    delete ( /** @type {?} */(popup))._listeners['close'];
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
                        return ( /** @type {?} */(source))[key] === undefined && delete ( /** @type {?} */(source))[key];
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
                return /** @type {?} */ ( /** @type {?} */(this.mapInstance.getSource(sourceId)));
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
                        _this.mapInstance.setPaintProperty(layerId, key, ( /** @type {?} */(paint))[key]);
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
                        _this.mapInstance.setLayoutProperty(layerId, key, ( /** @type {?} */(layout))[key]);
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
                return /** @type {?} */ (bbox(helpers.polygon([[upLeft, upRight, downRight, downLeft, upLeft]])));
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
                core.NgZone.assertNotInAngularZone();
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
                    for (var _b = __values(this.layerIdsToRemove), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var layerId = _c.value;
                        this.mapInstance.off('click', layerId);
                        this.mapInstance.off('mouseenter', layerId);
                        this.mapInstance.off('mouseleave', layerId);
                        this.mapInstance.off('mousemove', layerId);
                        this.mapInstance.removeLayer(layerId);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
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
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
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
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
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
                    this.mapInstance.on('zoomstart', function (evt) {
                        return _this.zone.run(function () {
                            return events.zoomStart.emit(evt);
                        });
                    });
                }
                if (events.zoomEvt.observers.length) {
                    this.mapInstance.on('zoom', function (evt) { return _this.zone.run(function () { return events.zoomEvt.emit(evt); }); });
                }
                if (events.zoomEnd.observers.length) {
                    this.mapInstance.on('zoomend', function (evt) {
                        return _this.zone.run(function () {
                            return events.zoomEnd.emit(evt);
                        });
                    });
                }
                if (events.rotateStart.observers.length) {
                    this.mapInstance.on('rotatestart', function (evt) {
                        return _this.zone.run(function () {
                            return events.rotateStart.emit(evt);
                        });
                    });
                }
                if (events.rotate.observers.length) {
                    this.mapInstance.on('rotate', function (evt) { return _this.zone.run(function () { return events.rotate.emit(evt); }); });
                }
                if (events.rotateEnd.observers.length) {
                    this.mapInstance.on('rotateend', function (evt) {
                        return _this.zone.run(function () {
                            return events.rotateEnd.emit(evt);
                        });
                    });
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MapService.ctorParameters = function () {
            return [
                { type: core.NgZone },
                { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAPBOX_API_KEY,] }] },
                { type: MglResizeEventEmitter, decorators: [{ type: core.Optional }] }
            ];
        };
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
            { type: core.Component, args: [{
                        selector: 'mgl-control',
                        template: '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        ControlComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        ControlComponent.propDecorators = {
            position: [{ type: core.Input }],
            content: [{ type: core.ViewChild, args: ['content',] }]
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
                    _this.ControlComponent.control = new MapboxGl.AttributionControl(options);
                    _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
                });
            };
        AttributionControlDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mglAttribution]'
                    },] }
        ];
        /** @nocollapse */
        AttributionControlDirective.ctorParameters = function () {
            return [
                { type: MapService },
                { type: ControlComponent, decorators: [{ type: core.Host }] }
            ];
        };
        AttributionControlDirective.propDecorators = {
            compact: [{ type: core.Input }]
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
                    _this.ControlComponent.control = new MapboxGl.FullscreenControl();
                    _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
                });
            };
        FullscreenControlDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mglFullscreen]'
                    },] }
        ];
        /** @nocollapse */
        FullscreenControlDirective.ctorParameters = function () {
            return [
                { type: MapService },
                { type: ControlComponent, decorators: [{ type: core.Host }] }
            ];
        };
        return FullscreenControlDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
    /** @type {?} */
    var MAPBOX_GEOCODER_API_KEY = new core.InjectionToken('MapboxApiKey');
    var GeocoderControlDirective = /** @class */ (function () {
        function GeocoderControlDirective(MapService$$1, zone, ControlComponent$$1, MAPBOX_GEOCODER_API_KEY) {
            this.MapService = MapService$$1;
            this.zone = zone;
            this.ControlComponent = ControlComponent$$1;
            this.MAPBOX_GEOCODER_API_KEY = MAPBOX_GEOCODER_API_KEY;
            this.clear = new core.EventEmitter();
            this.loading = new core.EventEmitter();
            this.results = new core.EventEmitter();
            this.result = new core.EventEmitter();
            this.error = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: '[mglGeocoder]'
                    },] }
        ];
        /** @nocollapse */
        GeocoderControlDirective.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone },
                { type: ControlComponent, decorators: [{ type: core.Host }] },
                { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAPBOX_GEOCODER_API_KEY,] }] }
            ];
        };
        GeocoderControlDirective.propDecorators = {
            country: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            zoom: [{ type: core.Input }],
            bbox: [{ type: core.Input }],
            types: [{ type: core.Input }],
            flyTo: [{ type: core.Input }],
            minLength: [{ type: core.Input }],
            limit: [{ type: core.Input }],
            language: [{ type: core.Input }],
            accessToken: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            localGeocoder: [{ type: core.Input }],
            proximity: [{ type: core.Input }],
            searchInput: [{ type: core.Input }],
            clear: [{ type: core.Output }],
            loading: [{ type: core.Output }],
            results: [{ type: core.Output }],
            result: [{ type: core.Output }],
            error: [{ type: core.Output }]
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
                    _this.ControlComponent.control = new MapboxGl.GeolocateControl(options);
                    _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
                });
            };
        GeolocateControlDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mglGeolocate]'
                    },] }
        ];
        /** @nocollapse */
        GeolocateControlDirective.ctorParameters = function () {
            return [
                { type: MapService },
                { type: ControlComponent, decorators: [{ type: core.Host }] }
            ];
        };
        GeolocateControlDirective.propDecorators = {
            positionOptions: [{ type: core.Input }],
            fitBoundsOptions: [{ type: core.Input }],
            trackUserLocation: [{ type: core.Input }],
            showUserLocation: [{ type: core.Input }]
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
                    _this.ControlComponent.control = new MapboxGl.NavigationControl(options);
                    _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
                });
            };
        NavigationControlDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mglNavigation]'
                    },] }
        ];
        /** @nocollapse */
        NavigationControlDirective.ctorParameters = function () {
            return [
                { type: MapService },
                { type: ControlComponent, decorators: [{ type: core.Host }] }
            ];
        };
        NavigationControlDirective.propDecorators = {
            showCompass: [{ type: core.Input }],
            showZoom: [{ type: core.Input }]
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
                    ( /** @type {?} */(this.ControlComponent.control)).setUnit(changes["unit"].currentValue);
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
                    _this.ControlComponent.control = new MapboxGl.ScaleControl(options);
                    _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
                });
            };
        ScaleControlDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mglScale]'
                    },] }
        ];
        /** @nocollapse */
        ScaleControlDirective.ctorParameters = function () {
            return [
                { type: MapService },
                { type: ControlComponent, decorators: [{ type: core.Host }] }
            ];
        };
        ScaleControlDirective.propDecorators = {
            maxWidth: [{ type: core.Input }],
            unit: [{ type: core.Input }]
        };
        return ScaleControlDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MarkerComponent = /** @class */ (function () {
        function MarkerComponent(MapService$$1) {
            this.MapService = MapService$$1;
            this.dragStart = new core.EventEmitter();
            this.drag = new core.EventEmitter();
            this.dragEnd = new core.EventEmitter();
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
                    /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ (( /** @type {?} */((this.feature)).geometry)).coordinates);
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
            { type: core.Component, args: [{
                        selector: 'mgl-marker',
                        template: '<div #content><ng-content></ng-content></div>',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n    .mapboxgl-marker {\n      line-height: 0;\n    }\n  "]
                    }] }
        ];
        /** @nocollapse */
        MarkerComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        MarkerComponent.propDecorators = {
            offset: [{ type: core.Input }],
            anchor: [{ type: core.Input }],
            feature: [{ type: core.Input }],
            lngLat: [{ type: core.Input }],
            draggable: [{ type: core.Input }],
            dragStart: [{ type: core.Output }],
            drag: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            content: [{ type: core.ViewChild, args: ['content',] }]
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
            this.updateFeatureData = new rxjs.Subject();
            this.sub = new rxjs.Subscription();
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
                    var sub = rxjs.fromEvent(_this.MapService.mapInstance, 'styledata').pipe(operators.filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
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
                var sub = this.updateFeatureData.pipe(operators.debounceTime(0)).subscribe(function () {
                    /** @type {?} */
                    var source = _this.MapService.getSource(_this.id);
                    source.setData(/** @type {?} */ ((_this.data)));
                });
                this.sub.add(sub);
                this.sourceAdded = true;
            };
        GeoJSONSourceComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-geojson-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        GeoJSONSourceComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        GeoJSONSourceComponent.propDecorators = {
            id: [{ type: core.Input }],
            data: [{ type: core.Input }],
            minzoom: [{ type: core.Input }],
            maxzoom: [{ type: core.Input }],
            buffer: [{ type: core.Input }],
            tolerance: [{ type: core.Input }],
            cluster: [{ type: core.Input }],
            clusterRadius: [{ type: core.Input }],
            clusterMaxZoom: [{ type: core.Input }]
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
                ( /** @type {?} */(this.feature.geometry)).coordinates = coordinates;
                this.GeoJSONSourceComponent.updateFeatureData.next();
            };
        FeatureComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-feature',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        FeatureComponent.ctorParameters = function () {
            return [
                { type: GeoJSONSourceComponent, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return GeoJSONSourceComponent; }),] }] }
            ];
        };
        FeatureComponent.propDecorators = {
            id: [{ type: core.Input }],
            geometry: [{ type: core.Input }],
            properties: [{ type: core.Input }]
        };
        return FeatureComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DraggableDirective = /** @class */ (function () {
        function DraggableDirective(MapService$$1, NgZone, FeatureComponent$$1, MarkerComponent$$1) {
            this.MapService = MapService$$1;
            this.NgZone = NgZone;
            this.FeatureComponent = FeatureComponent$$1;
            this.MarkerComponent = MarkerComponent$$1;
            this.dragStart = new core.EventEmitter();
            this.dragEnd = new core.EventEmitter();
            this.drag = new core.EventEmitter();
            this.destroyed$ = new rxjs.ReplaySubject(1);
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
                    var markerElement = ( /** @type {?} */(this.MarkerComponent.content.nativeElement));
                    if (markerElement.children.length === 1) {
                        markerElement = markerElement.children[0];
                    }
                    enter$ = rxjs.fromEvent(markerElement, 'mouseenter');
                    leave$ = rxjs.fromEvent(markerElement, 'mouseleave');
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
                    var mouseUp$ = rxjs.fromEvent(_this.MapService.mapInstance, 'mouseup');
                    /** @type {?} */
                    var dragStart$ = enter$.pipe(operators.takeUntil(_this.destroyed$), operators.filter(function () { return !moving; }), operators.filter(function (evt) { return _this.filterFeature(evt); }), operators.tap(function () {
                        inside = true;
                        _this.MapService.changeCanvasCursor('move');
                        _this.MapService.updateDragPan(false);
                    }), operators.switchMap(function () {
                        return rxjs.fromEvent(_this.MapService.mapInstance, 'mousedown')
                            .pipe(operators.takeUntil(leave$));
                    }));
                    /** @type {?} */
                    var dragging$ = dragStart$.pipe(operators.switchMap(function () {
                        return rxjs.fromEvent(_this.MapService.mapInstance, 'mousemove')
                            .pipe(operators.takeUntil(mouseUp$));
                    }));
                    /** @type {?} */
                    var dragEnd$ = dragStart$.pipe(operators.switchMap(function () { return mouseUp$.pipe(operators.take(1)); }));
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
                    leave$.pipe(operators.takeUntil(_this.destroyed$), operators.tap(function () { return inside = false; }), operators.filter(function () { return !moving; })).subscribe(function () {
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
            { type: core.Directive, args: [{
                        selector: '[mglDraggable]'
                    },] }
        ];
        /** @nocollapse */
        DraggableDirective.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone },
                { type: FeatureComponent, decorators: [{ type: core.Optional }, { type: core.Host }] },
                { type: MarkerComponent, decorators: [{ type: core.Optional }, { type: core.Host }] }
            ];
        };
        DraggableDirective.propDecorators = {
            layer: [{ type: core.Input, args: ['mglDraggable',] }],
            dragStart: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            drag: [{ type: core.Output }]
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
            this.error = new core.EventEmitter();
            this.loaded = new core.EventEmitter();
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
                this.MapService.mapLoaded$.subscribe(function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        var error_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this.data)
                                        return [3 /*break*/, 1];
                                    this.MapService.addImage(this.id, this.data, this.options);
                                    this.imageAdded = true;
                                    return [3 /*break*/, 5];
                                case 1:
                                    if (!this.url)
                                        return [3 /*break*/, 5];
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
                    });
                });
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
            { type: core.Component, args: [{
                        selector: 'mgl-image',
                        template: ''
                    }] }
        ];
        /** @nocollapse */
        ImageComponent.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.NgZone }
            ];
        };
        ImageComponent.propDecorators = {
            id: [{ type: core.Input }],
            data: [{ type: core.Input }],
            options: [{ type: core.Input }],
            url: [{ type: core.Input }],
            error: [{ type: core.Output }],
            loaded: [{ type: core.Output }]
        };
        return ImageComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LayerComponent = /** @class */ (function () {
        function LayerComponent(MapService$$1) {
            this.MapService = MapService$$1;
            this.click = new core.EventEmitter();
            this.mouseEnter = new core.EventEmitter();
            this.mouseLeave = new core.EventEmitter();
            this.mouseMove = new core.EventEmitter();
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
                    _this.sub = rxjs.fromEvent(_this.MapService.mapInstance, 'styledata').pipe(operators.filter(function () { return !_this.MapService.mapInstance.getLayer(_this.id); })).subscribe(function () {
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
            { type: core.Component, args: [{
                        selector: 'mgl-layer',
                        template: ''
                    }] }
        ];
        /** @nocollapse */
        LayerComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        LayerComponent.propDecorators = {
            id: [{ type: core.Input }],
            source: [{ type: core.Input }],
            type: [{ type: core.Input }],
            metadata: [{ type: core.Input }],
            sourceLayer: [{ type: core.Input }],
            filter: [{ type: core.Input }],
            layout: [{ type: core.Input }],
            paint: [{ type: core.Input }],
            before: [{ type: core.Input }],
            minzoom: [{ type: core.Input }],
            maxzoom: [{ type: core.Input }],
            click: [{ type: core.Output }],
            mouseEnter: [{ type: core.Output }],
            mouseLeave: [{ type: core.Output }],
            mouseMove: [{ type: core.Output }]
        };
        return LayerComponent;
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
            this.resize = new core.EventEmitter();
            this.remove = new core.EventEmitter();
            this.mouseDown = new core.EventEmitter();
            this.mouseUp = new core.EventEmitter();
            this.mouseMove = new core.EventEmitter();
            this.click = new core.EventEmitter();
            this.dblClick = new core.EventEmitter();
            this.mouseEnter = new core.EventEmitter();
            this.mouseLeave = new core.EventEmitter();
            this.mouseOver = new core.EventEmitter();
            this.mouseOut = new core.EventEmitter();
            this.contextMenu = new core.EventEmitter();
            this.touchStart = new core.EventEmitter();
            this.touchEnd = new core.EventEmitter();
            this.touchMove = new core.EventEmitter();
            this.touchCancel = new core.EventEmitter();
            this.wheel = new core.EventEmitter();
            this.moveStart = new core.EventEmitter();
            this.move = new core.EventEmitter();
            this.moveEnd = new core.EventEmitter();
            this.dragStart = new core.EventEmitter();
            this.drag = new core.EventEmitter();
            this.dragEnd = new core.EventEmitter();
            this.zoomStart = new core.EventEmitter();
            this.zoomEvt = new core.EventEmitter();
            this.zoomEnd = new core.EventEmitter();
            this.rotateStart = new core.EventEmitter();
            this.rotate = new core.EventEmitter();
            this.rotateEnd = new core.EventEmitter();
            this.pitchStart = new core.EventEmitter();
            this.pitchEvt = new core.EventEmitter();
            this.pitchEnd = new core.EventEmitter();
            this.boxZoomStart = new core.EventEmitter();
            this.boxZoomEnd = new core.EventEmitter();
            this.boxZoomCancel = new core.EventEmitter();
            this.webGlContextLost = new core.EventEmitter();
            this.webGlContextRestored = new core.EventEmitter();
            this.load = new core.EventEmitter();
            this.render = new core.EventEmitter();
            this.error = new core.EventEmitter();
            this.data = new core.EventEmitter();
            this.styleData = new core.EventEmitter();
            this.sourceData = new core.EventEmitter();
            this.dataLoading = new core.EventEmitter();
            this.styleDataLoading = new core.EventEmitter();
            this.sourceDataLoading = new core.EventEmitter();
        }
        Object.defineProperty(MapComponent.prototype, "mapInstance", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'mgl-map',
                        template: '<div #container></div>',
                        providers: [
                            MapService
                        ],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n  :host {\n    display: block;\n  }\n  div {\n    height: 100%;\n    width: 100%;\n  }\n  "]
                    }] }
        ];
        /** @nocollapse */
        MapComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        MapComponent.propDecorators = {
            accessToken: [{ type: core.Input }],
            customMapboxApiUrl: [{ type: core.Input }],
            hash: [{ type: core.Input }],
            refreshExpiredTiles: [{ type: core.Input }],
            failIfMajorPerformanceCaveat: [{ type: core.Input }],
            classes: [{ type: core.Input }],
            bearingSnap: [{ type: core.Input }],
            interactive: [{ type: core.Input }],
            pitchWithRotate: [{ type: core.Input }],
            attributionControl: [{ type: core.Input }],
            logoPosition: [{ type: core.Input }],
            maxTileCacheSize: [{ type: core.Input }],
            localIdeographFontFamily: [{ type: core.Input }],
            preserveDrawingBuffer: [{ type: core.Input }],
            renderWorldCopies: [{ type: core.Input }],
            trackResize: [{ type: core.Input }],
            transformRequest: [{ type: core.Input }],
            minZoom: [{ type: core.Input }],
            maxZoom: [{ type: core.Input }],
            scrollZoom: [{ type: core.Input }],
            dragRotate: [{ type: core.Input }],
            touchZoomRotate: [{ type: core.Input }],
            doubleClickZoom: [{ type: core.Input }],
            keyboard: [{ type: core.Input }],
            dragPan: [{ type: core.Input }],
            boxZoom: [{ type: core.Input }],
            style: [{ type: core.Input }],
            center: [{ type: core.Input }],
            maxBounds: [{ type: core.Input }],
            zoom: [{ type: core.Input }],
            bearing: [{ type: core.Input }],
            pitch: [{ type: core.Input }],
            movingMethod: [{ type: core.Input }],
            movingOptions: [{ type: core.Input }],
            fitBounds: [{ type: core.Input }],
            fitBoundsOptions: [{ type: core.Input }],
            centerWithPanTo: [{ type: core.Input }],
            panToOptions: [{ type: core.Input }],
            cursorStyle: [{ type: core.Input }],
            resize: [{ type: core.Output }],
            remove: [{ type: core.Output }],
            mouseDown: [{ type: core.Output }],
            mouseUp: [{ type: core.Output }],
            mouseMove: [{ type: core.Output }],
            click: [{ type: core.Output }],
            dblClick: [{ type: core.Output }],
            mouseEnter: [{ type: core.Output }],
            mouseLeave: [{ type: core.Output }],
            mouseOver: [{ type: core.Output }],
            mouseOut: [{ type: core.Output }],
            contextMenu: [{ type: core.Output }],
            touchStart: [{ type: core.Output }],
            touchEnd: [{ type: core.Output }],
            touchMove: [{ type: core.Output }],
            touchCancel: [{ type: core.Output }],
            wheel: [{ type: core.Output }],
            moveStart: [{ type: core.Output }],
            move: [{ type: core.Output }],
            moveEnd: [{ type: core.Output }],
            dragStart: [{ type: core.Output }],
            drag: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            zoomStart: [{ type: core.Output }],
            zoomEvt: [{ type: core.Output }],
            zoomEnd: [{ type: core.Output }],
            rotateStart: [{ type: core.Output }],
            rotate: [{ type: core.Output }],
            rotateEnd: [{ type: core.Output }],
            pitchStart: [{ type: core.Output }],
            pitchEvt: [{ type: core.Output }],
            pitchEnd: [{ type: core.Output }],
            boxZoomStart: [{ type: core.Output }],
            boxZoomEnd: [{ type: core.Output }],
            boxZoomCancel: [{ type: core.Output }],
            webGlContextLost: [{ type: core.Output }],
            webGlContextRestored: [{ type: core.Output }],
            load: [{ type: core.Output }],
            render: [{ type: core.Output }],
            error: [{ type: core.Output }],
            data: [{ type: core.Output }],
            styleData: [{ type: core.Output }],
            sourceData: [{ type: core.Output }],
            dataLoading: [{ type: core.Output }],
            styleDataLoading: [{ type: core.Output }],
            sourceDataLoading: [{ type: core.Output }],
            mapContainer: [{ type: core.ViewChild, args: ['container',] }]
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
            { type: core.Directive, args: [{ selector: 'ng-template[mglPoint]' },] }
        ];
        return PointDirective;
    }());
    var ClusterPointDirective = /** @class */ (function () {
        function ClusterPointDirective() {
        }
        ClusterPointDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[mglClusterPoint]' },] }
        ];
        return ClusterPointDirective;
    }());
    var MarkerClusterComponent = /** @class */ (function () {
        function MarkerClusterComponent(MapService$$1, ChangeDetectorRef, zone) {
            var _this = this;
            this.MapService = MapService$$1;
            this.ChangeDetectorRef = ChangeDetectorRef;
            this.zone = zone;
            this.load = new core.EventEmitter();
            this.sub = new rxjs.Subscription();
            this.getLeavesFn = function (feature) {
                return function (limit, offset) { return ( /** @type {?} */(_this.supercluster.getLeaves))(/** @type {?} */ ((feature.properties.cluster_id)), limit, offset); };
            };
            this.getChildrenFn = function (feature) {
                return function () { return ( /** @type {?} */(_this.supercluster.getChildren))(/** @type {?} */ ((feature.properties.cluster_id))); };
            };
            this.getClusterExpansionZoomFn = function (feature) {
                return function () { return ( /** @type {?} */(_this.supercluster.getClusterExpansionZoom))(/** @type {?} */ ((feature.properties.cluster_id))); };
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
                    var mapMove$ = rxjs.merge(rxjs.fromEvent(_this.MapService.mapInstance, 'zoomChange'), rxjs.fromEvent(_this.MapService.mapInstance, 'move'));
                    /** @type {?} */
                    var sub = mapMove$.pipe(operators.startWith(undefined)).subscribe(function () {
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
            { type: core.Component, args: [{
                        selector: 'mgl-marker-cluster',
                        template: "\n    <ng-container *ngFor=\"let feature of clusterPoints\">\n      <ng-container *ngIf=\"feature.properties.cluster; else point\">\n        <mgl-marker\n          [feature]=\"feature\"\n        >\n          <ng-container *ngTemplateOutlet=\"clusterPointTpl; context: {\n            $implicit: feature,\n            getLeavesFn: getLeavesFn(feature),\n            getChildrenFn: getChildrenFn(feature),\n            getClusterExpansionZoomFn: getClusterExpansionZoomFn(feature)\n          }\"></ng-container>\n        </mgl-marker>\n      </ng-container>\n      <ng-template #point>\n        <mgl-marker\n          [feature]=\"feature\"\n        >\n          <ng-container *ngTemplateOutlet=\"pointTpl; context: { $implicit: feature }\"></ng-container>\n        </mgl-marker>\n      </ng-template>\n    </ng-container>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MarkerClusterComponent.ctorParameters = function () {
            return [
                { type: MapService },
                { type: core.ChangeDetectorRef },
                { type: core.NgZone }
            ];
        };
        MarkerClusterComponent.propDecorators = {
            radius: [{ type: core.Input }],
            maxZoom: [{ type: core.Input }],
            minZoom: [{ type: core.Input }],
            extent: [{ type: core.Input }],
            nodeSize: [{ type: core.Input }],
            log: [{ type: core.Input }],
            reduce: [{ type: core.Input }],
            initial: [{ type: core.Input }],
            map: [{ type: core.Input }],
            data: [{ type: core.Input }],
            load: [{ type: core.Output }],
            pointTpl: [{ type: core.ContentChild, args: [PointDirective, { read: core.TemplateRef },] }],
            clusterPointTpl: [{ type: core.ContentChild, args: [ClusterPointDirective, { read: core.TemplateRef },] }]
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
            this.close = new core.EventEmitter();
            this.open = new core.EventEmitter();
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
                    var newlngLat = changes["lngLat"] ? /** @type {?} */ ((this.lngLat)) : /** @type {?} */ (( /** @type {?} */(( /** @type {?} */((this.feature)).geometry)).coordinates));
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
                        _this.MapService.addPopupToMap(popup, _this.lngLat ? _this.lngLat : /** @type {?} */ (( /** @type {?} */(( /** @type {?} */((_this.feature)).geometry)).coordinates)));
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
            { type: core.Component, args: [{
                        selector: 'mgl-popup',
                        template: '<div #content><ng-content></ng-content></div>',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PopupComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        PopupComponent.propDecorators = {
            closeButton: [{ type: core.Input }],
            closeOnClick: [{ type: core.Input }],
            anchor: [{ type: core.Input }],
            offset: [{ type: core.Input }],
            feature: [{ type: core.Input }],
            lngLat: [{ type: core.Input }],
            marker: [{ type: core.Input }],
            close: [{ type: core.Output }],
            open: [{ type: core.Output }],
            content: [{ type: core.ViewChild, args: ['content',] }]
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
            this.sub = new rxjs.Subscription();
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
                    var sub = rxjs.fromEvent(_this.MapService.mapInstance, 'styledata').pipe(operators.filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
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
            { type: core.Component, args: [{
                        selector: 'mgl-canvas-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        CanvasSourceComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        CanvasSourceComponent.propDecorators = {
            id: [{ type: core.Input }],
            coordinates: [{ type: core.Input }],
            canvas: [{ type: core.Input }],
            animate: [{ type: core.Input }]
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
            this.sub = new rxjs.Subscription();
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
                    var sub = rxjs.fromEvent(_this.MapService.mapInstance, 'styledata').pipe(operators.filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
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
            { type: core.Component, args: [{
                        selector: 'mgl-image-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        ImageSourceComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        ImageSourceComponent.propDecorators = {
            id: [{ type: core.Input }],
            url: [{ type: core.Input }],
            coordinates: [{ type: core.Input }]
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
            this.sub = new rxjs.Subscription();
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
                    var sub = rxjs.fromEvent(_this.MapService.mapInstance, 'styledata').pipe(operators.filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
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
            { type: core.Component, args: [{
                        selector: 'mgl-raster-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        RasterSourceComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        RasterSourceComponent.propDecorators = {
            id: [{ type: core.Input }],
            url: [{ type: core.Input }],
            tiles: [{ type: core.Input }],
            bounds: [{ type: core.Input }],
            minzoom: [{ type: core.Input }],
            maxzoom: [{ type: core.Input }],
            tileSize: [{ type: core.Input }]
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
            this.sub = new rxjs.Subscription();
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
                    var sub = rxjs.fromEvent(_this.MapService.mapInstance, 'styledata').pipe(operators.filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
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
            { type: core.Component, args: [{
                        selector: 'mgl-vector-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        VectorSourceComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        VectorSourceComponent.propDecorators = {
            id: [{ type: core.Input }],
            url: [{ type: core.Input }],
            tiles: [{ type: core.Input }],
            minzoom: [{ type: core.Input }],
            maxzoom: [{ type: core.Input }]
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
            this.sub = new rxjs.Subscription();
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
                    var sub = rxjs.fromEvent(_this.MapService.mapInstance, 'styledata').pipe(operators.filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
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
            { type: core.Component, args: [{
                        selector: 'mgl-video-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        VideoSourceComponent.ctorParameters = function () {
            return [
                { type: MapService }
            ];
        };
        VideoSourceComponent.propDecorators = {
            id: [{ type: core.Input }],
            urls: [{ type: core.Input }],
            coordinates: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.NgxMapboxGLModule = NgxMapboxGLModule;
    exports.MAPBOX_API_KEY = MAPBOX_API_KEY;
    exports.MglResizeEventEmitter = MglResizeEventEmitter;
    exports.MapService = MapService;
    exports.MapComponent = MapComponent;
    exports.ɵs = AttributionControlDirective;
    exports.ɵm = ControlComponent;
    exports.ɵn = FullscreenControlDirective;
    exports.ɵq = GeocoderControlDirective;
    exports.ɵp = MAPBOX_GEOCODER_API_KEY;
    exports.ɵr = GeolocateControlDirective;
    exports.ɵo = NavigationControlDirective;
    exports.ɵt = ScaleControlDirective;
    exports.ɵb = DraggableDirective;
    exports.ɵf = ImageComponent;
    exports.ɵa = LayerComponent;
    exports.ɵv = ClusterPointDirective;
    exports.ɵw = MarkerClusterComponent;
    exports.ɵu = PointDirective;
    exports.ɵe = MarkerComponent;
    exports.ɵl = PopupComponent;
    exports.ɵk = CanvasSourceComponent;
    exports.ɵc = FeatureComponent;
    exports.ɵd = GeoJSONSourceComponent;
    exports.ɵi = ImageSourceComponent;
    exports.ɵh = RasterSourceComponent;
    exports.ɵg = VectorSourceComponent;
    exports.ɵj = VideoSourceComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC51bWQuanMubWFwIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9tYXAvbWFwLnNlcnZpY2UudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvY29udHJvbC5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvYXR0cmlidXRpb24tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZnVsbHNjcmVlbi1jb250cm9sLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvY29udHJvbC9nZW9jb2Rlci1jb250cm9sLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvY29udHJvbC9nZW9sb2NhdGUtY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvbmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvY29udHJvbC9zY2FsZS1jb250cm9sLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS9nZW9qc29uL2dlb2pzb24tc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9pbWFnZS9pbWFnZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2xheWVyL2xheWVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFwL21hcC5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL21hcmtlci1jbHVzdGVyL21hcmtlci1jbHVzdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvcG9wdXAvcG9wdXAuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvY2FudmFzLXNvdXJjZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvcmFzdGVyLXNvdXJjZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS92ZWN0b3Itc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL3ZpZGVvLXNvdXJjZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL25neC1tYXBib3gtZ2wubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgYmJveCBmcm9tICdAdHVyZi9iYm94JztcbmltcG9ydCB7IHBvbHlnb24gfSBmcm9tICdAdHVyZi9oZWxwZXJzJztcbmltcG9ydCAqIGFzIE1hcGJveEdsIGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBBc3luY1N1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCQm94IH0gZnJvbSAnc3VwZXJjbHVzdGVyJztcbmltcG9ydCB7IE1hcEV2ZW50LCBNYXBJbWFnZURhdGEsIE1hcEltYWdlT3B0aW9ucyB9IGZyb20gJy4vbWFwLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IE1BUEJPWF9BUElfS0VZID0gbmV3IEluamVjdGlvblRva2VuKCdNYXBib3hBcGlLZXknKTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1nbFJlc2l6ZUV2ZW50RW1pdHRlciB7XG4gIGFic3RyYWN0IHJlc2l6ZUV2ZW50OiBPYnNlcnZhYmxlPHZvaWQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTWFwIHtcbiAgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIGN1c3RvbU1hcGJveEFwaVVybD86IHN0cmluZztcbiAgbWFwT3B0aW9uczogYW55OyAvLyBNYXBib3hHbC5NYXBib3hPcHRpb25zXG4gIG1hcEV2ZW50czogTWFwRXZlbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBMYXllciB7XG4gIGxheWVyT3B0aW9uczogTWFwYm94R2wuTGF5ZXI7XG4gIGxheWVyRXZlbnRzOiB7XG4gICAgY2xpY2s6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgICBtb3VzZUVudGVyOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gICAgbW91c2VMZWF2ZTogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICAgIG1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwUG9wdXAge1xuICBwb3B1cE9wdGlvbnM6IE1hcGJveEdsLlBvcHVwT3B0aW9ucztcbiAgcG9wdXBFdmVudHM6IHtcbiAgICBvcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgY2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cE1hcmtlciB7XG4gIG1hcmtlcnNPcHRpb25zOiB7XG4gICAgb2Zmc2V0PzogTWFwYm94R2wuUG9pbnRMaWtlO1xuICAgIGFuY2hvcj86IE1hcGJveEdsLkFuY2hvcjtcbiAgICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIGZlYXR1cmU/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD47XG4gICAgbG5nTGF0PzogTWFwYm94R2wuTG5nTGF0TGlrZTtcbiAgfTtcbiAgbWFya2Vyc0V2ZW50czoge1xuICAgIGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcmtlcj47XG4gICAgZHJhZzogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcmtlcj47XG4gICAgZHJhZ0VuZDogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcmtlcj47XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIEFsbFNvdXJjZSA9IE1hcGJveEdsLlZlY3RvclNvdXJjZSB8XG4gIE1hcGJveEdsLlJhc3RlclNvdXJjZSB8XG4gIE1hcGJveEdsLkdlb0pTT05Tb3VyY2UgfFxuICBNYXBib3hHbC5JbWFnZVNvdXJjZU9wdGlvbnMgfFxuICBNYXBib3hHbC5WaWRlb1NvdXJjZU9wdGlvbnMgfFxuICBNYXBib3hHbC5HZW9KU09OU291cmNlUmF3IHxcbiAgTWFwYm94R2wuQ2FudmFzU291cmNlT3B0aW9ucztcblxuZXhwb3J0IHR5cGUgTW92aW5nT3B0aW9ucyA9IE1hcGJveEdsLkZseVRvT3B0aW9ucyB8XG4gIChNYXBib3hHbC5BbmltYXRpb25PcHRpb25zICYgTWFwYm94R2wuQ2FtZXJhT3B0aW9ucykgfFxuICBNYXBib3hHbC5DYW1lcmFPcHRpb25zO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwU2VydmljZSB7XG4gIG1hcEluc3RhbmNlOiBNYXBib3hHbC5NYXA7XG4gIG1hcENyZWF0ZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBtYXBMb2FkZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBtYXBFdmVudHM6IE1hcEV2ZW50O1xuXG4gIHByaXZhdGUgbWFwQ3JlYXRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBtYXBMb2FkZWQgPSBuZXcgQXN5bmNTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgbGF5ZXJJZHNUb1JlbW92ZTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBzb3VyY2VJZHNUb1JlbW92ZTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBtYXJrZXJzVG9SZW1vdmU6IE1hcGJveEdsLk1hcmtlcltdID0gW107XG4gIHByaXZhdGUgcG9wdXBzVG9SZW1vdmU6IE1hcGJveEdsLlBvcHVwW10gPSBbXTtcbiAgcHJpdmF0ZSBpbWFnZUlkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BUEJPWF9BUElfS0VZKSBwcml2YXRlIHJlYWRvbmx5IE1BUEJPWF9BUElfS0VZOiBzdHJpbmcsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBNZ2xSZXNpemVFdmVudEVtaXR0ZXI6IE1nbFJlc2l6ZUV2ZW50RW1pdHRlclxuICApIHtcbiAgICB0aGlzLm1hcENyZWF0ZWQkID0gdGhpcy5tYXBDcmVhdGVkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubWFwTG9hZGVkJCA9IHRoaXMubWFwTG9hZGVkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgc2V0dXAob3B0aW9uczogU2V0dXBNYXApIHtcbiAgICAvLyBOZWVkIG9uU3RhYmxlIHRvIHdhaXQgZm9yIGEgcG90ZW50aWFsIEBhbmd1bGFyL3JvdXRlIHRyYW5zaXRpb24gdG8gZW5kXG4gICAgdGhpcy56b25lLm9uU3RhYmxlLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIFdvcmthcm91bmQgcm9sbHVwIGlzc3VlXG4gICAgICB0aGlzLmFzc2lnbihNYXBib3hHbCwgJ2FjY2Vzc1Rva2VuJywgb3B0aW9ucy5hY2Nlc3NUb2tlbiB8fCB0aGlzLk1BUEJPWF9BUElfS0VZKTtcbiAgICAgIGlmIChvcHRpb25zLmN1c3RvbU1hcGJveEFwaVVybCkge1xuICAgICAgICB0aGlzLmFzc2lnbihNYXBib3hHbCwgJ2NvbmZpZy5BUElfVVJMJywgb3B0aW9ucy5jdXN0b21NYXBib3hBcGlVcmwpO1xuICAgICAgfVxuICAgICAgdGhpcy5jcmVhdGVNYXAob3B0aW9ucy5tYXBPcHRpb25zKTtcbiAgICAgIHRoaXMuaG9va0V2ZW50cyhvcHRpb25zLm1hcEV2ZW50cyk7XG4gICAgICB0aGlzLm1hcEV2ZW50cyA9IG9wdGlvbnMubWFwRXZlbnRzO1xuICAgICAgdGhpcy5tYXBDcmVhdGVkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIHRoaXMubWFwQ3JlYXRlZC5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveU1hcCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlKCk7XG4gIH1cblxuICB1cGRhdGVNaW5ab29tKG1pblpvb206IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNaW5ab29tKG1pblpvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4Wm9vbShtYXhab29tOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4Wm9vbShtYXhab29tKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVNjcm9sbFpvb20oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLnNjcm9sbFpvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLnNjcm9sbFpvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRHJhZ1JvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuZHJhZ1JvdGF0ZS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuZHJhZ1JvdGF0ZS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVUb3VjaFpvb21Sb3RhdGUoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLnRvdWNoWm9vbVJvdGF0ZS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURvdWJsZUNsaWNrWm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuZG91YmxlQ2xpY2tab29tLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlS2V5Ym9hcmQoc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5rZXlib2FyZC5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEcmFnUGFuKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUGFuLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kcmFnUGFuLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUJveFpvb20oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmJveFpvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmJveFpvb20uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3R5bGUoc3R5bGU6IE1hcGJveEdsLlN0eWxlKSB7XG4gICAgLy8gVE9ETyBQcm9iYWJseSBub3Qgc28gc2ltcGxlLCB3cml0ZSBkZW1vL3Rlc3RzXG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFN0eWxlKHN0eWxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1heEJvdW5kcyhtYXhCb3VuZHM6IE1hcGJveEdsLkxuZ0xhdEJvdW5kc0xpa2UpIHtcbiAgICAvLyBUT0RPIFByb2JhYmx5IG5vdCBzbyBzaW1wbGUsIHdyaXRlIGRlbW8vdGVzdHNcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TWF4Qm91bmRzKG1heEJvdW5kcyk7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VDYW52YXNDdXJzb3IoY3Vyc29yOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1hcEluc3RhbmNlLmdldENhbnZhc0NvbnRhaW5lcigpO1xuICAgIGNhbnZhcy5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7XG4gIH1cblxuICBxdWVyeVJlbmRlcmVkRmVhdHVyZXMoXG4gICAgcG9pbnRPckJveD86IE1hcGJveEdsLlBvaW50TGlrZSB8IE1hcGJveEdsLlBvaW50TGlrZVtdLFxuICAgIHBhcmFtZXRlcnM/OiB7IGxheWVycz86IHN0cmluZ1tdLCBmaWx0ZXI/OiBhbnlbXSB9XG4gICk6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PltdIHtcbiAgICByZXR1cm4gdGhpcy5tYXBJbnN0YW5jZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMocG9pbnRPckJveCwgcGFyYW1ldGVycyk7XG4gIH1cblxuICBwYW5UbyhjZW50ZXI6IE1hcGJveEdsLkxuZ0xhdExpa2UsIG9wdGlvbnM/OiBNYXBib3hHbC5BbmltYXRpb25PcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnBhblRvKGNlbnRlciwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlKFxuICAgIG1vdmluZ01ldGhvZDogJ2p1bXBUbycgfCAnZWFzZVRvJyB8ICdmbHlUbycsXG4gICAgbW92aW5nT3B0aW9ucz86IE1vdmluZ09wdGlvbnMsXG4gICAgem9vbT86IG51bWJlcixcbiAgICBjZW50ZXI/OiBNYXBib3hHbC5MbmdMYXRMaWtlLFxuICAgIGJlYXJpbmc/OiBudW1iZXIsXG4gICAgcGl0Y2g/OiBudW1iZXJcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAoPGFueT50aGlzLm1hcEluc3RhbmNlW21vdmluZ01ldGhvZF0pKHtcbiAgICAgICAgLi4ubW92aW5nT3B0aW9ucyxcbiAgICAgICAgem9vbTogem9vbSA/IHpvb20gOiB0aGlzLm1hcEluc3RhbmNlLmdldFpvb20oKSxcbiAgICAgICAgY2VudGVyOiBjZW50ZXIgPyBjZW50ZXIgOiB0aGlzLm1hcEluc3RhbmNlLmdldENlbnRlcigpLFxuICAgICAgICBiZWFyaW5nOiBiZWFyaW5nID8gYmVhcmluZyA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0QmVhcmluZygpLFxuICAgICAgICBwaXRjaDogcGl0Y2ggPyBwaXRjaCA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0UGl0Y2goKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRMYXllcihsYXllcjogU2V0dXBMYXllciwgYmluZEV2ZW50czogYm9vbGVhbiwgYmVmb3JlPzogc3RyaW5nKSB7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGxheWVyLmxheWVyT3B0aW9ucylcbiAgICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiBNYXBib3hHbC5MYXllcj5rZXk7XG4gICAgICAgICAgaWYgKGxheWVyLmxheWVyT3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWxldGUgbGF5ZXIubGF5ZXJPcHRpb25zW3RrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZExheWVyKGxheWVyLmxheWVyT3B0aW9ucywgYmVmb3JlKTtcbiAgICAgIGlmIChiaW5kRXZlbnRzKSB7XG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5jbGljay5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY2xpY2snLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5jbGljay5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubW91c2VFbnRlci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VlbnRlcicsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlRW50ZXIuZW1pdChldnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTGVhdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbGVhdmUnLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICBsYXllci5sYXllckV2ZW50cy5tb3VzZUxlYXZlLmVtaXQoZXZ0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5tb3VzZU1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbW92ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTGF5ZXIobGF5ZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5sYXllcklkc1RvUmVtb3ZlLnB1c2gobGF5ZXJJZCk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyOiBTZXR1cE1hcmtlcikge1xuICAgIGNvbnN0IG9wdGlvbnM6IE1hcGJveEdsLk1hcmtlck9wdGlvbnMgPSB7XG4gICAgICBvZmZzZXQ6IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5vZmZzZXQsXG4gICAgICBhbmNob3I6IG1hcmtlci5tYXJrZXJzT3B0aW9ucy5hbmNob3IsXG4gICAgICBkcmFnZ2FibGU6ICEhbWFya2VyLm1hcmtlcnNPcHRpb25zLmRyYWdnYWJsZVxuICAgIH07XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzT3B0aW9ucy5lbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9ucy5lbGVtZW50ID0gbWFya2VyLm1hcmtlcnNPcHRpb25zLmVsZW1lbnQ7XG4gICAgfVxuICAgIGNvbnN0IG1hcmtlckluc3RhbmNlID0gbmV3IE1hcGJveEdsLk1hcmtlcihvcHRpb25zKTtcbiAgICBpZiAobWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZ1N0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIG1hcmtlckluc3RhbmNlLm9uKCdkcmFnc3RhcnQnLCAoZXZlbnQ6IHsgdGFyZ2V0OiBNYXBib3hHbC5NYXJrZXIgfSkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnU3RhcnQuZW1pdChldmVudC50YXJnZXQpKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1hcmtlci5tYXJrZXJzRXZlbnRzLmRyYWcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgbWFya2VySW5zdGFuY2Uub24oJ2RyYWcnLCAoZXZlbnQ6IHsgdGFyZ2V0OiBNYXBib3hHbC5NYXJrZXIgfSkgPT5cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnLmVtaXQoZXZlbnQudGFyZ2V0KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChtYXJrZXIubWFya2Vyc0V2ZW50cy5kcmFnRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIG1hcmtlckluc3RhbmNlLm9uKCdkcmFnZW5kJywgKGV2ZW50OiB7IHRhcmdldDogTWFwYm94R2wuTWFya2VyIH0pID0+XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gbWFya2VyLm1hcmtlcnNFdmVudHMuZHJhZ0VuZC5lbWl0KGV2ZW50LnRhcmdldCkpXG4gICAgICApO1xuICAgIH1cbiAgICBtYXJrZXJJbnN0YW5jZS5zZXRMbmdMYXQobWFya2VyLm1hcmtlcnNPcHRpb25zLmZlYXR1cmUgP1xuICAgICAgbWFya2VyLm1hcmtlcnNPcHRpb25zLmZlYXR1cmUuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzIDpcbiAgICAgIG1hcmtlci5tYXJrZXJzT3B0aW9ucy5sbmdMYXQhXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIG1hcmtlckluc3RhbmNlLmFkZFRvKHRoaXMubWFwSW5zdGFuY2UpO1xuICAgICAgcmV0dXJuIG1hcmtlckluc3RhbmNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFwYm94R2wuTWFya2VyKSB7XG4gICAgdGhpcy5tYXJrZXJzVG9SZW1vdmUucHVzaChtYXJrZXIpO1xuICB9XG5cbiAgY3JlYXRlUG9wdXAocG9wdXA6IFNldHVwUG9wdXAsIGVsZW1lbnQ6IE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBvcHVwLnBvcHVwT3B0aW9ucylcbiAgICAgICAgLmZvckVhY2goKGtleSkgPT5cbiAgICAgICAgICAoPGFueT5wb3B1cC5wb3B1cE9wdGlvbnMpW2tleV0gPT09IHVuZGVmaW5lZCAmJiBkZWxldGUgKDxhbnk+cG9wdXAucG9wdXBPcHRpb25zKVtrZXldKTtcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2UgPSBuZXcgTWFwYm94R2wuUG9wdXAocG9wdXAucG9wdXBPcHRpb25zKTtcbiAgICAgIHBvcHVwSW5zdGFuY2Uuc2V0RE9NQ29udGVudChlbGVtZW50KTtcbiAgICAgIGlmIChwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMuY2xvc2UuZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3B1cC5wb3B1cEV2ZW50cy5vcGVuLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9wdXBJbnN0YW5jZS5vbignb3BlbicsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLm9wZW4uZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb3B1cEluc3RhbmNlO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkUG9wdXBUb01hcChwb3B1cDogTWFwYm94R2wuUG9wdXAsIGxuZ0xhdDogTWFwYm94R2wuTG5nTGF0TGlrZSwgc2tpcE9wZW5FdmVudCA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBpZiAoc2tpcE9wZW5FdmVudCAmJiAoPGFueT5wb3B1cCkuX2xpc3RlbmVycykge1xuICAgICAgICBkZWxldGUgKDxhbnk+cG9wdXApLl9saXN0ZW5lcnNbJ29wZW4nXTtcbiAgICAgIH1cbiAgICAgIHBvcHVwLnNldExuZ0xhdChsbmdMYXQpO1xuICAgICAgcG9wdXAuYWRkVG8odGhpcy5tYXBJbnN0YW5jZSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRQb3B1cFRvTWFya2VyKG1hcmtlcjogTWFwYm94R2wuTWFya2VyLCBwb3B1cDogTWFwYm94R2wuUG9wdXApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIG1hcmtlci5zZXRQb3B1cChwb3B1cCk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVQb3B1cEZyb21NYXAocG9wdXA6IE1hcGJveEdsLlBvcHVwLCBza2lwQ2xvc2VFdmVudCA9IGZhbHNlKSB7XG4gICAgaWYgKHNraXBDbG9zZUV2ZW50ICYmICg8YW55PnBvcHVwKS5fbGlzdGVuZXJzKSB7XG4gICAgICBkZWxldGUgKDxhbnk+cG9wdXApLl9saXN0ZW5lcnNbJ2Nsb3NlJ107XG4gICAgfVxuICAgIHRoaXMucG9wdXBzVG9SZW1vdmUucHVzaChwb3B1cCk7XG4gIH1cblxuICByZW1vdmVQb3B1cEZyb21NYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIG1hcmtlci5zZXRQb3B1cCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkQ29udHJvbChjb250cm9sOiBNYXBib3hHbC5Db250cm9sIHwgTWFwYm94R2wuSUNvbnRyb2wsIHBvc2l0aW9uPzogJ3RvcC1yaWdodCcgfCAndG9wLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCcgfCAnYm90dG9tLWxlZnQnKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZENvbnRyb2woPGFueT5jb250cm9sLCBwb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVDb250cm9sKGNvbnRyb2w6IE1hcGJveEdsLkNvbnRyb2wgfCBNYXBib3hHbC5JQ29udHJvbCkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVDb250cm9sKDxhbnk+Y29udHJvbCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsb2FkQW5kQWRkSW1hZ2UoaW1hZ2VJZDogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9ucz86IE1hcEltYWdlT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5sb2FkSW1hZ2UodXJsLCAoZXJyb3I6IHsgc3RhdHVzOiBudW1iZXIgfSB8IG51bGwsIGltYWdlOiBJbWFnZURhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkSW1hZ2UoaW1hZ2VJZCwgaW1hZ2UsIG9wdGlvbnMpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEltYWdlKGltYWdlSWQ6IHN0cmluZywgZGF0YTogTWFwSW1hZ2VEYXRhLCBvcHRpb25zPzogTWFwSW1hZ2VPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmFkZEltYWdlKGltYWdlSWQsIDxhbnk+ZGF0YSwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVJbWFnZShpbWFnZUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmltYWdlSWRzVG9SZW1vdmUucHVzaChpbWFnZUlkKTtcbiAgfVxuXG4gIGFkZFNvdXJjZShzb3VyY2VJZDogc3RyaW5nLCBzb3VyY2U6IEFsbFNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoc291cmNlKVxuICAgICAgICAuZm9yRWFjaCgoa2V5KSA9PlxuICAgICAgICAgICg8YW55PnNvdXJjZSlba2V5XSA9PT0gdW5kZWZpbmVkICYmIGRlbGV0ZSAoPGFueT5zb3VyY2UpW2tleV0pO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRTb3VyY2Uoc291cmNlSWQsIDxhbnk+c291cmNlKTsgLy8gVHlwaW5ncyBpc3N1ZVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U291cmNlPFQ+KHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gPFQ+PGFueT50aGlzLm1hcEluc3RhbmNlLmdldFNvdXJjZShzb3VyY2VJZCk7XG4gIH1cblxuICByZW1vdmVTb3VyY2Uoc291cmNlSWQ6IHN0cmluZykge1xuICAgIHRoaXMuc291cmNlSWRzVG9SZW1vdmUucHVzaChzb3VyY2VJZCk7XG4gIH1cblxuICBzZXRBbGxMYXllclBhaW50UHJvcGVydHkoXG4gICAgbGF5ZXJJZDogc3RyaW5nLFxuICAgIHBhaW50OiBNYXBib3hHbC5CYWNrZ3JvdW5kUGFpbnQgfFxuICAgICAgTWFwYm94R2wuRmlsbFBhaW50IHxcbiAgICAgIE1hcGJveEdsLkZpbGxFeHRydXNpb25QYWludCB8XG4gICAgICBNYXBib3hHbC5MaW5lUGFpbnQgfFxuICAgICAgTWFwYm94R2wuU3ltYm9sUGFpbnQgfFxuICAgICAgTWFwYm94R2wuUmFzdGVyUGFpbnQgfFxuICAgICAgTWFwYm94R2wuQ2lyY2xlUGFpbnRcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwYWludCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIHBlcmYsIHNldFBhaW50UHJvcGVydHkgb25seSBvbiBjaGFuZ2VkIHBhaW50IHByb3BzIG1heWJlXG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0UGFpbnRQcm9wZXJ0eShsYXllcklkLCBrZXksICg8YW55PnBhaW50KVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0QWxsTGF5ZXJMYXlvdXRQcm9wZXJ0eShcbiAgICBsYXllcklkOiBzdHJpbmcsXG4gICAgbGF5b3V0OiBNYXBib3hHbC5CYWNrZ3JvdW5kTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkZpbGxMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuRmlsbEV4dHJ1c2lvbkxheW91dCB8XG4gICAgICBNYXBib3hHbC5MaW5lTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLlN5bWJvbExheW91dCB8XG4gICAgICBNYXBib3hHbC5SYXN0ZXJMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuQ2lyY2xlTGF5b3V0XG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMobGF5b3V0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgcGVyZiwgc2V0UGFpbnRQcm9wZXJ0eSBvbmx5IG9uIGNoYW5nZWQgcGFpbnQgcHJvcHMgbWF5YmVcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRMYXlvdXRQcm9wZXJ0eShsYXllcklkLCBrZXksICg8YW55PmxheW91dClba2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyRmlsdGVyKGxheWVySWQ6IHN0cmluZywgZmlsdGVyOiBhbnlbXSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRGaWx0ZXIobGF5ZXJJZCwgZmlsdGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyQmVmb3JlKGxheWVySWQ6IHN0cmluZywgYmVmb3JlSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5tb3ZlTGF5ZXIobGF5ZXJJZCwgYmVmb3JlSWQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0TGF5ZXJab29tUmFuZ2UobGF5ZXJJZDogc3RyaW5nLCBtaW5ab29tPzogbnVtYmVyLCBtYXhab29tPzogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldExheWVyWm9vbVJhbmdlKGxheWVySWQsIG1pblpvb20gPyBtaW5ab29tIDogMCwgbWF4Wm9vbSA/IG1heFpvb20gOiAyMCk7XG4gICAgfSk7XG4gIH1cblxuICBmaXRCb3VuZHMoYm91bmRzOiBNYXBib3hHbC5MbmdMYXRCb3VuZHNMaWtlLCBvcHRpb25zPzogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLmZpdEJvdW5kcyhib3VuZHMsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q3VycmVudFZpZXdwb3J0QmJveCgpOiBCQm94IHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLm1hcEluc3RhbmNlLmdldENhbnZhcygpO1xuICAgIGNvbnN0IHcgPSBwYXJzZUludChjYW52YXMuc3R5bGUud2lkdGghLCAxMCk7XG4gICAgY29uc3QgaCA9IHBhcnNlSW50KGNhbnZhcy5zdHlsZS5oZWlnaHQhLCAxMCk7XG4gICAgY29uc3QgdXBMZWZ0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoWzAsIDBdKS50b0FycmF5KCk7XG4gICAgY29uc3QgdXBSaWdodCA9IHRoaXMubWFwSW5zdGFuY2UudW5wcm9qZWN0KFt3LCAwXSkudG9BcnJheSgpO1xuICAgIGNvbnN0IGRvd25SaWdodCA9IHRoaXMubWFwSW5zdGFuY2UudW5wcm9qZWN0KFt3LCBoXSkudG9BcnJheSgpO1xuICAgIGNvbnN0IGRvd25MZWZ0ID0gdGhpcy5tYXBJbnN0YW5jZS51bnByb2plY3QoWzAsIGhdKS50b0FycmF5KCk7XG4gICAgcmV0dXJuIDxhbnk+YmJveChwb2x5Z29uKFtbdXBMZWZ0LCB1cFJpZ2h0LCBkb3duUmlnaHQsIGRvd25MZWZ0LCB1cExlZnRdXSkpO1xuICB9XG5cbiAgYXBwbHlDaGFuZ2VzKCkge1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZUxheWVycygpO1xuICAgICAgdGhpcy5yZW1vdmVTb3VyY2VzKCk7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcnMoKTtcbiAgICAgIHRoaXMucmVtb3ZlUG9wdXBzKCk7XG4gICAgICB0aGlzLnJlbW92ZUltYWdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNYXAob3B0aW9uczogTWFwYm94R2wuTWFwYm94T3B0aW9ucykge1xuICAgIE5nWm9uZS5hc3NlcnROb3RJbkFuZ3VsYXJab25lKCk7XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgIC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIE1hcGJveEdsLk1hcGJveE9wdGlvbnM+a2V5O1xuICAgICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMubWFwSW5zdGFuY2UgPSBuZXcgTWFwYm94R2wuTWFwKG9wdGlvbnMpO1xuICAgIGNvbnN0IHN1YkNoYW5nZXMgPSB0aGlzLnpvbmUub25NaWNyb3Rhc2tFbXB0eVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFwcGx5Q2hhbmdlcygpKTtcbiAgICBpZiAodGhpcy5NZ2xSZXNpemVFdmVudEVtaXR0ZXIpIHtcbiAgICAgIGNvbnN0IHN1YlJlc2l6ZSA9IHRoaXMuTWdsUmVzaXplRXZlbnRFbWl0dGVyLnJlc2l6ZUV2ZW50LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVzaXplKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChzdWJSZXNpemUpO1xuICAgIH1cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoc3ViQ2hhbmdlcyk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUxheWVycygpIHtcbiAgICBmb3IgKGNvbnN0IGxheWVySWQgb2YgdGhpcy5sYXllcklkc1RvUmVtb3ZlKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignY2xpY2snLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdtb3VzZWVudGVyJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignbW91c2VsZWF2ZScsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ21vdXNlbW92ZScsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVMYXllcihsYXllcklkKTtcbiAgICB9XG4gICAgdGhpcy5sYXllcklkc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVNvdXJjZXMoKSB7XG4gICAgZm9yIChjb25zdCBzb3VyY2VJZCBvZiB0aGlzLnNvdXJjZUlkc1RvUmVtb3ZlKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnJlbW92ZVNvdXJjZShzb3VyY2VJZCk7XG4gICAgfVxuICAgIHRoaXMuc291cmNlSWRzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTWFya2VycygpIHtcbiAgICBmb3IgKGNvbnN0IG1hcmtlciBvZiB0aGlzLm1hcmtlcnNUb1JlbW92ZSkge1xuICAgICAgbWFya2VyLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLm1hcmtlcnNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVQb3B1cHMoKSB7XG4gICAgZm9yIChjb25zdCBwb3B1cCBvZiB0aGlzLnBvcHVwc1RvUmVtb3ZlKSB7XG4gICAgICBwb3B1cC5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5wb3B1cHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVJbWFnZXMoKSB7XG4gICAgZm9yIChjb25zdCBpbWFnZUlkIG9mIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVJbWFnZShpbWFnZUlkKTtcbiAgICB9XG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIGhvb2tFdmVudHMoZXZlbnRzOiBNYXBFdmVudCkge1xuICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2xvYWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLm1hcExvYWRlZC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICB0aGlzLm1hcExvYWRlZC5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubG9hZC5lbWl0KHRoaXMubWFwSW5zdGFuY2UpKTtcbiAgICB9KTtcbiAgICBpZiAoZXZlbnRzLnJlc2l6ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZXNpemUnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZXNpemUuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucmVtb3ZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JlbW92ZScsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlbW92ZS5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZURvd24ub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2Vkb3duJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VEb3duLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlVXAub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2V1cCcsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlVXAuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VNb3ZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbW92ZScsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlTW92ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5jbGljay5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjbGljaycsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmNsaWNrLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRibENsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RibGNsaWNrJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZGJsQ2xpY2suZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VFbnRlci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWVudGVyJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VFbnRlci5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZUxlYXZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbGVhdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZUxlYXZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlT3Zlci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW92ZXInLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZU92ZXIuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VPdXQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VvdXQnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZU91dC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5jb250ZXh0TWVudS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdjb250ZXh0bWVudScsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmNvbnRleHRNZW51LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hzdGFydCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2hlbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaEVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaE1vdmUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigndG91Y2htb3ZlJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hNb3ZlLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoQ2FuY2VsLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoY2FuY2VsJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hDYW5jZWwuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMud2hlZWwub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgLy8gTWFwYm94R2wuTWFwV2hlZWxFdmVudFxuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignd2hlZWwnLCAoZXZ0OiBhbnkpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndoZWVsLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdmVTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3Zlc3RhcnQnLCAoZXZ0OiBEcmFnRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdmVTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3ZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW92ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3ZlRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdmVlbmQnLCAoZXZ0OiBEcmFnRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdmVFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZHJhZ1N0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWdzdGFydCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZHJhZ1N0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRyYWcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZHJhZycsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kcmFnLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRyYWdFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZHJhZ2VuZCcsIChldnQ6IERyYWdFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZHJhZ0VuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy56b29tU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignem9vbXN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnpvb21TdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy56b29tRXZ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb20nLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuem9vbUV2dC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy56b29tRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb21lbmQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMuem9vbUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yb3RhdGVTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyb3RhdGVzdGFydCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy5yb3RhdGVTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yb3RhdGUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJvdGF0ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yb3RhdGVFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlZW5kJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnJvdGF0ZUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaFN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hFdnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncGl0Y2gnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnBpdGNoRXZ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoZW5kJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaEVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbXN0YXJ0JywgKGV2dDogTWFwYm94R2wuTWFwQm94Wm9vbUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdib3h6b29tZW5kJywgKGV2dDogTWFwYm94R2wuTWFwQm94Wm9vbUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5ib3hab29tRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21DYW5jZWwub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbWNhbmNlbCcsIChldnQ6IE1hcGJveEdsLk1hcEJveFpvb21FdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbUNhbmNlbC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53ZWJHbENvbnRleHRMb3N0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3dlYmdsY29udGV4dGxvc3QnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53ZWJHbENvbnRleHRMb3N0LmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3dlYmdsY29udGV4dHJlc3RvcmVkJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2ViR2xDb250ZXh0UmVzdG9yZWQuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucmVuZGVyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JlbmRlcicsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlbmRlci5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5lcnJvci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdlcnJvcicsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmVycm9yLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRhdGEub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZGF0YScsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZGF0YS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zdHlsZURhdGEub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc3R5bGVkYXRhJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zdHlsZURhdGEuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc291cmNlRGF0YS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzb3VyY2VkYXRhJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zb3VyY2VEYXRhLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRhdGFMb2FkaW5nLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RhdGFsb2FkaW5nJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5kYXRhTG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5zdHlsZURhdGFMb2FkaW5nLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3N0eWxlZGF0YWxvYWRpbmcnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnN0eWxlRGF0YUxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc291cmNlRGF0YUxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc291cmNlZGF0YWxvYWRpbmcnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnNvdXJjZURhdGFMb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gbW92ZSB0aGlzIGVsc2V3aGVyZVxuICBwcml2YXRlIGFzc2lnbihvYmo6IGFueSwgcHJvcDogYW55LCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICAgIHByb3AgPSBwcm9wLnNwbGl0KCcuJyk7XG4gICAgfVxuICAgIGlmIChwcm9wLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGUgPSBwcm9wLnNoaWZ0KCk7XG4gICAgICB0aGlzLmFzc2lnbihvYmpbZV0gPVxuICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW2VdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbiAgICAgICAgICA/IG9ialtlXVxuICAgICAgICAgIDoge30sXG4gICAgICAgIHByb3AsXG4gICAgICAgIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW3Byb3BbMF1dID0gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb250cm9sLCBJQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21Db250cm9sIGltcGxlbWVudHMgSUNvbnRyb2wge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgKSB7XG4gIH1cblxuICBvbkFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG4gIH1cblxuICBvblJlbW92ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiAndG9wLXJpZ2h0JztcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtY29udHJvbCcsXG4gIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIm1hcGJveGdsLWN0cmxcIiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uPzogJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnRyb2w6IENvbnRyb2wgfCBJQ29udHJvbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNvbnRyb2wgPSBuZXcgQ3VzdG9tQ29udHJvbCh0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5jb250cm9sISwgdGhpcy5wb3NpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlQ29udHJvbCh0aGlzLmNvbnRyb2wpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbEF0dHJpYnV0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgY29tcGFjdD86IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uczogeyBjb21wYWN0PzogYm9vbGVhbiB9ID0ge307XG4gICAgICBpZiAodGhpcy5jb21wYWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy5jb21wYWN0ID0gdGhpcy5jb21wYWN0O1xuICAgICAgfVxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgQXR0cmlidXRpb25Db250cm9sKG9wdGlvbnMpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0LCBIb3N0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbEZ1bGxzY3JlZW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgRnVsbHNjcmVlbkNvbnRyb2woKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLCB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbiAgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2VvY29kZXJFdmVudCB9IGZyb20gJy4uL21hcC9tYXAudHlwZXMnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5jb25zdCBNYXBib3hHZW9jb2RlciA9IHJlcXVpcmUoJ0BtYXBib3gvbWFwYm94LWdsLWdlb2NvZGVyJyk7XG5cbmV4cG9ydCBjb25zdCBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSA9IG5ldyBJbmplY3Rpb25Ub2tlbignTWFwYm94QXBpS2V5Jyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG5nTGF0TGl0ZXJhbCB7XG4gIGxhdGl0dWRlOiBudW1iZXI7XG4gIGxvbmdpdHVkZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdHMgZXh0ZW5kcyBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uUG9pbnQ+IHtcbiAgYXR0cmlidXRpb246IHN0cmluZztcbiAgcXVlcnk6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdCBleHRlbmRzIEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PiB7XG4gIGJib3g6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICBjZW50ZXI6IG51bWJlcltdO1xuICBwbGFjZV9uYW1lOiBzdHJpbmc7XG4gIHBsYWNlX3R5cGU6IHN0cmluZ1tdO1xuICByZWxldmFuY2U6IG51bWJlcjtcbiAgdGV4dDogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvbnRleHQ6IGFueVtdO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsR2VvY29kZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW9jb2RlckNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgR2VvY29kZXJFdmVudCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGNvdW50cnk/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKSB6b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBiYm94PzogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIEBJbnB1dCgpIHR5cGVzPzogc3RyaW5nO1xuICBASW5wdXQoKSBmbHlUbz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1pbkxlbmd0aD86IG51bWJlcjtcbiAgQElucHV0KCkgbGltaXQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxhbmd1YWdlPzogc3RyaW5nO1xuICBASW5wdXQoKSBhY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgQElucHV0KCkgZmlsdGVyPzogKGZlYXR1cmU6IFJlc3VsdCkgPT4gYm9vbGVhbjtcbiAgQElucHV0KCkgbG9jYWxHZW9jb2Rlcj86IChxdWVyeTogc3RyaW5nKSA9PiBSZXN1bHRbXTtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBwcm94aW1pdHk/OiBMbmdMYXRMaXRlcmFsO1xuICBASW5wdXQoKSBzZWFyY2hJbnB1dD86IHN0cmluZztcblxuICBAT3V0cHV0KCkgY2xlYXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBsb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx7IHF1ZXJ5OiBzdHJpbmcgfT4oKTtcbiAgQE91dHB1dCgpIHJlc3VsdHMgPSBuZXcgRXZlbnRFbWl0dGVyPFJlc3VsdHM+KCk7XG4gIEBPdXRwdXQoKSByZXN1bHQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgcmVzdWx0OiBSZXN1bHQgfT4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2VvY29kZXI6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSkgcHJpdmF0ZSByZWFkb25seSBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWTogc3RyaW5nXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgcHJveGltaXR5OiB0aGlzLnByb3hpbWl0eSxcbiAgICAgICAgY291bnRyeTogdGhpcy5jb3VudHJ5LFxuICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgICAgem9vbTogdGhpcy56b29tLFxuICAgICAgICBiYm94OiB0aGlzLmJib3gsXG4gICAgICAgIHR5cGVzOiB0aGlzLnR5cGVzLFxuICAgICAgICBmbHlUbzogdGhpcy5mbHlUbyxcbiAgICAgICAgbWluTGVuZ3RoOiB0aGlzLm1pbkxlbmd0aCxcbiAgICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBsb2NhbEdlb2NvZGVyOiB0aGlzLmxvY2FsR2VvY29kZXIsXG4gICAgICAgIGFjY2Vzc1Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuIHx8IHRoaXMuTUFQQk9YX0dFT0NPREVSX0FQSV9LRVlcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgdHlwZW9mIG9wdGlvbnM+a2V5O1xuICAgICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5nZW9jb2RlciA9IG5ldyBNYXBib3hHZW9jb2RlcihvcHRpb25zKTtcbiAgICAgIHRoaXMuaG9va0V2ZW50cyh0aGlzKTtcbiAgICAgIHRoaXMuYWRkQ29udHJvbCgpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLnNlYXJjaElucHV0KSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdlb2NvZGVyLnF1ZXJ5KHRoaXMuc2VhcmNoSW5wdXQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5nZW9jb2Rlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wcm94aW1pdHkgJiYgIWNoYW5nZXMucHJveGltaXR5LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5zZXRQcm94aW1pdHkoY2hhbmdlcy5wcm94aW1pdHkuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIucXVlcnkodGhpcy5zZWFyY2hJbnB1dCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb250cm9sKCkge1xuICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gdGhpcy5nZW9jb2RlcjtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbChcbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLFxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaG9va0V2ZW50cyhldmVudHM6IEdlb2NvZGVyRXZlbnQpIHtcbiAgICBpZiAoZXZlbnRzLnJlc3VsdHMub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbigncmVzdWx0cycsIChldnQ6IFJlc3VsdHMpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlc3VsdHMuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucmVzdWx0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ3Jlc3VsdCcsIChldnQ6IHsgcmVzdWx0OiBSZXN1bHQgfSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVzdWx0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmVycm9yLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ2Vycm9yJywgKGV2dDogYW55KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5lcnJvci5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5sb2FkaW5nLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ2xvYWRpbmcnLCAoZXZ0OiB7IHF1ZXJ5OiBzdHJpbmcgfSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5jbGVhci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdjbGVhcicsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmNsZWFyLmVtaXQoKSkpO1xuICAgIH1cblxuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb2xvY2F0ZUNvbnRyb2wsIEZpdEJvdW5kc09wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xHZW9sb2NhdGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgcG9zaXRpb25PcHRpb25zPzogUG9zaXRpb25PcHRpb25zO1xuICBASW5wdXQoKSBmaXRCb3VuZHNPcHRpb25zPzogRml0Qm91bmRzT3B0aW9ucztcbiAgQElucHV0KCkgdHJhY2tVc2VyTG9jYXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSBzaG93VXNlckxvY2F0aW9uPzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwb3NpdGlvbk9wdGlvbnM6IHRoaXMucG9zaXRpb25PcHRpb25zLFxuICAgICAgICBmaXRCb3VuZHNPcHRpb25zOiB0aGlzLmZpdEJvdW5kc09wdGlvbnMsXG4gICAgICAgIHRyYWNrVXNlckxvY2F0aW9uOiB0aGlzLnRyYWNrVXNlckxvY2F0aW9uLFxuICAgICAgICBzaG93VXNlckxvY2F0aW9uOiB0aGlzLnNob3dVc2VyTG9jYXRpb25cbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgIC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgdHlwZW9mIG9wdGlvbnM+a2V5O1xuICAgICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBHZW9sb2NhdGVDb250cm9sKG9wdGlvbnMpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xOYXZpZ2F0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBzaG93Q29tcGFzcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dab29tPzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBsZXQgb3B0aW9uczogeyBzaG93Q29tcGFzcz86IGJvb2xlYW4sIHNob3dab29tPzogYm9vbGVhbiB9ID0ge307XG4gICAgICBpZiAodGhpcy5zaG93Q29tcGFzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMuc2hvd0NvbXBhc3MgPSB0aGlzLnNob3dDb21wYXNzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2hvd1pvb20gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLnNob3dab29tID0gdGhpcy5zaG93Wm9vbTtcbiAgICAgIH1cbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IE5hdmlnYXRpb25Db250cm9sKG9wdGlvbnMpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY2FsZUNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xTY2FsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjYWxlQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgbWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdW5pdD86ICdpbXBlcmlhbCcgfCAnbWV0cmljJyB8ICduYXV0aWNhbCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnVuaXQgJiYgIWNoYW5nZXMudW5pdC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICg8YW55PnRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKS5zZXRVbml0KGNoYW5nZXMudW5pdC5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnM6IHsgbWF4V2lkdGg/OiBudW1iZXIsIHVuaXQ/OiBzdHJpbmcgfSA9IHt9O1xuICAgICAgaWYgKHRoaXMubWF4V2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLm1heFdpZHRoID0gdGhpcy5tYXhXaWR0aDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnVuaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLnVuaXQgPSB0aGlzLnVuaXQ7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBTY2FsZUNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG5nTGF0TGlrZSwgTWFya2VyLCBQb2ludExpa2UsIEFuY2hvciB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlcicsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICAgIC5tYXBib3hnbC1tYXJrZXIge1xuICAgICAgbGluZS1oZWlnaHQ6IDA7XG4gICAgfVxuICBgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgb2Zmc2V0PzogUG9pbnRMaWtlO1xuICBASW5wdXQoKSBhbmNob3I/OiBBbmNob3I7XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBASW5wdXQoKSBmZWF0dXJlPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+O1xuICBASW5wdXQoKSBsbmdMYXQ/OiBMbmdMYXRMaWtlO1xuICBASW5wdXQoKSBkcmFnZ2FibGU/OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBtYXJrZXJJbnN0YW5jZT86IE1hcmtlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5mZWF0dXJlICYmIHRoaXMubG5nTGF0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZlYXR1cmUgYW5kIGxuZ0xhdCBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmxuZ0xhdCAmJiAhY2hhbmdlcy5sbmdMYXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQodGhpcy5sbmdMYXQhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZmVhdHVyZSAmJiAhY2hhbmdlcy5mZWF0dXJlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZHJhZ2dhYmxlICYmICFjaGFuZ2VzLmRyYWdnYWJsZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldERyYWdnYWJsZSghIXRoaXMuZHJhZ2dhYmxlKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdGhpcy5NYXBTZXJ2aWNlLmFkZE1hcmtlcih7XG4gICAgICAgIG1hcmtlcnNPcHRpb25zOiB7XG4gICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCxcbiAgICAgICAgICBhbmNob3I6IHRoaXMuYW5jaG9yLFxuICAgICAgICAgIGRyYWdnYWJsZTogISF0aGlzLmRyYWdnYWJsZSxcbiAgICAgICAgICBlbGVtZW50OiB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLmZlYXR1cmUsXG4gICAgICAgICAgbG5nTGF0OiB0aGlzLmxuZ0xhdFxuICAgICAgICB9LFxuICAgICAgICBtYXJrZXJzRXZlbnRzOiB7XG4gICAgICAgICAgZHJhZ1N0YXJ0OiB0aGlzLmRyYWdTdGFydCxcbiAgICAgICAgICBkcmFnOiB0aGlzLmRyYWcsXG4gICAgICAgICAgZHJhZ0VuZDogdGhpcy5kcmFnRW5kXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZU1hcmtlcih0aGlzLm1hcmtlckluc3RhbmNlISk7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRvZ2dsZVBvcHVwKCkge1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnRvZ2dsZVBvcHVwKCk7XG4gIH1cblxuICB1cGRhdGVDb29yZGluYXRlcyhjb29yZGluYXRlczogbnVtYmVyW10pIHtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQoY29vcmRpbmF0ZXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VvSlNPTlNvdXJjZSwgR2VvSlNPTlNvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1nZW9qc29uLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEdlb0pTT05Tb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBkYXRhPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnk+IHwgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5PiB8IHN0cmluZztcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgYnVmZmVyPzogbnVtYmVyO1xuICBASW5wdXQoKSB0b2xlcmFuY2U/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNsdXN0ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBjbHVzdGVyUmFkaXVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBjbHVzdGVyTWF4Wm9vbT86IG51bWJlcjtcblxuICB1cGRhdGVGZWF0dXJlRGF0YSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBmZWF0dXJlSWRDb3VudGVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICBmZWF0dXJlczogW11cbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5tYXh6b29tICYmICFjaGFuZ2VzLm1heHpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuYnVmZmVyICYmICFjaGFuZ2VzLmJ1ZmZlci5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudG9sZXJhbmNlICYmICFjaGFuZ2VzLnRvbGVyYW5jZS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2x1c3RlciAmJiAhY2hhbmdlcy5jbHVzdGVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jbHVzdGVyUmFkaXVzICYmICFjaGFuZ2VzLmNsdXN0ZXJSYWRpdXMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNsdXN0ZXJNYXhab29tICYmICFjaGFuZ2VzLmNsdXN0ZXJNYXhab29tLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLk1hcFNlcnZpY2UuZ2V0U291cmNlPEdlb0pTT05Tb3VyY2U+KHRoaXMuaWQpO1xuICAgICAgc291cmNlLnNldERhdGEodGhpcy5kYXRhISk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICBhZGRGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSA8R2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pj50aGlzLmRhdGE7XG4gICAgY29sbGVjdGlvbi5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgIHRoaXMudXBkYXRlRmVhdHVyZURhdGEubmV4dCgpO1xuICB9XG5cbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4pIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gPEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4+dGhpcy5kYXRhO1xuICAgIGNvbnN0IGluZGV4ID0gY29sbGVjdGlvbi5mZWF0dXJlcy5pbmRleE9mKGZlYXR1cmUpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjb2xsZWN0aW9uLmZlYXR1cmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlRmVhdHVyZURhdGEubmV4dCgpO1xuICB9XG5cbiAgZ2V0TmV3RmVhdHVyZUlkKCkge1xuICAgIHJldHVybiArK3RoaXMuZmVhdHVyZUlkQ291bnRlcjtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgIGJ1ZmZlcjogdGhpcy5idWZmZXIsXG4gICAgICB0b2xlcmFuY2U6IHRoaXMudG9sZXJhbmNlLFxuICAgICAgY2x1c3RlcjogdGhpcy5jbHVzdGVyLFxuICAgICAgY2x1c3RlclJhZGl1czogdGhpcy5jbHVzdGVyUmFkaXVzLFxuICAgICAgY2x1c3Rlck1heFpvb206IHRoaXMuY2x1c3Rlck1heFpvb20sXG4gICAgfSk7XG4gICAgY29uc3Qgc3ViID0gdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5waXBlKGRlYm91bmNlVGltZSgwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuTWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBzb3VyY2Uuc2V0RGF0YSh0aGlzLmRhdGEhKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb0pTT05Tb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL2dlb2pzb24tc291cmNlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1mZWF0dXJlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGZWF0dXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PiB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkPzogbnVtYmVyOyAvLyBGSVhNRSBudW1iZXIgb25seSBmb3Igbm93IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LWdsLWpzL2lzc3Vlcy8yNzE2XG4gIEBJbnB1dCgpIGdlb21ldHJ5OiBHZW9KU09OLkdlb21ldHJ5T2JqZWN0O1xuICBASW5wdXQoKSBwcm9wZXJ0aWVzOiBhbnk7XG4gIHR5cGU6ICdGZWF0dXJlJyA9ICdGZWF0dXJlJztcblxuICBwcml2YXRlIGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gR2VvSlNPTlNvdXJjZUNvbXBvbmVudCkpIHByaXZhdGUgR2VvSlNPTlNvdXJjZUNvbXBvbmVudDogR2VvSlNPTlNvdXJjZUNvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgdGhpcy5pZCA9IHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5nZXROZXdGZWF0dXJlSWQoKTtcbiAgICB9XG4gICAgdGhpcy5mZWF0dXJlID0ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgZ2VvbWV0cnk6IHRoaXMuZ2VvbWV0cnksXG4gICAgICBwcm9wZXJ0aWVzOiB0aGlzLnByb3BlcnRpZXMgPyB0aGlzLnByb3BlcnRpZXMgOiB7fVxuICAgIH07XG4gICAgdGhpcy5mZWF0dXJlLmlkID0gdGhpcy5pZDtcbiAgICB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQuYWRkRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LnJlbW92ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xuICAgICg8R2VvSlNPTi5Qb2ludD50aGlzLmZlYXR1cmUuZ2VvbWV0cnkpLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwTW91c2VFdmVudCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwLCB0YWtlLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExheWVyQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5ZXIvbGF5ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbXBvbmVudCB9IGZyb20gJy4uL3NvdXJjZS9nZW9qc29uL2ZlYXR1cmUuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbERyYWdnYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ21nbERyYWdnYWJsZScpIGxheWVyPzogTGF5ZXJDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuXG4gIHByaXZhdGUgZGVzdHJveWVkJDogUmVwbGF5U3ViamVjdDx2b2lkPiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIE5nWm9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBGZWF0dXJlQ29tcG9uZW50PzogRmVhdHVyZUNvbXBvbmVudCxcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgTWFya2VyQ29tcG9uZW50PzogTWFya2VyQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IGVudGVyJDtcbiAgICBsZXQgbGVhdmUkO1xuICAgIGxldCB1cGRhdGVDb29yZHM7XG4gICAgaWYgKHRoaXMuTWFya2VyQ29tcG9uZW50KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ21nbERyYWdnYWJsZSBvbiBNYXJrZXIgaXMgZGVwcmVjYXRlZCwgdXNlIGRyYWdnYWJsZSBpbnB1dCBpbnN0ZWFkJyk7XG4gICAgICBsZXQgbWFya2VyRWxlbWVudCA9ICg8RWxlbWVudD50aGlzLk1hcmtlckNvbXBvbmVudC5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKG1hcmtlckVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1hcmtlckVsZW1lbnQgPSBtYXJrZXJFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgfVxuICAgICAgZW50ZXIkID0gZnJvbUV2ZW50KG1hcmtlckVsZW1lbnQsICdtb3VzZWVudGVyJyk7XG4gICAgICBsZWF2ZSQgPSBmcm9tRXZlbnQobWFya2VyRWxlbWVudCwgJ21vdXNlbGVhdmUnKTtcbiAgICAgIHVwZGF0ZUNvb3JkcyA9IHRoaXMuTWFya2VyQ29tcG9uZW50LnVwZGF0ZUNvb3JkaW5hdGVzLmJpbmQodGhpcy5NYXJrZXJDb21wb25lbnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5GZWF0dXJlQ29tcG9uZW50ICYmIHRoaXMubGF5ZXIpIHtcbiAgICAgIGVudGVyJCA9IHRoaXMubGF5ZXIubW91c2VFbnRlcjtcbiAgICAgIGxlYXZlJCA9IHRoaXMubGF5ZXIubW91c2VMZWF2ZTtcbiAgICAgIHVwZGF0ZUNvb3JkcyA9IHRoaXMuRmVhdHVyZUNvbXBvbmVudC51cGRhdGVDb29yZGluYXRlcy5iaW5kKHRoaXMuRmVhdHVyZUNvbXBvbmVudCk7XG4gICAgICBpZiAodGhpcy5GZWF0dXJlQ29tcG9uZW50Lmdlb21ldHJ5LnR5cGUgIT09ICdQb2ludCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2xEcmFnZ2FibGUgb25seSBzdXBwb3J0IHBvaW50IGZlYXR1cmUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2xEcmFnZ2FibGUgY2FuIG9ubHkgYmUgdXNlZCBvbiBGZWF0dXJlICh3aXRoIGEgbGF5ZXIgYXMgaW5wdXQpIG9yIE1hcmtlcicpO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRHJhZ2dhYmxlKGVudGVyJCwgbGVhdmUkLCB1cGRhdGVDb29yZHMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQkLm5leHQodW5kZWZpbmVkKTtcbiAgICB0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRHJhZ2dhYmxlKGVudGVyJDogT2JzZXJ2YWJsZTxhbnk+LCBsZWF2ZSQ6IE9ic2VydmFibGU8YW55PiwgdXBkYXRlQ29vcmRzOiAoY29vcmQ6IG51bWJlcltdKSA9PiB2b2lkKSB7XG4gICAgbGV0IG1vdmluZyA9IGZhbHNlO1xuICAgIGxldCBpbnNpZGUgPSBmYWxzZTtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IG1vdXNlVXAkID0gZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdXNldXAnKTtcbiAgICAgIGNvbnN0IGRyYWdTdGFydCQgPSBlbnRlciQucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhbW92aW5nKSxcbiAgICAgICAgZmlsdGVyKChldnQpID0+IHRoaXMuZmlsdGVyRmVhdHVyZShldnQpKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJ21vdmUnKTtcbiAgICAgICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1BhbihmYWxzZSk7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2Vkb3duJylcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbChsZWF2ZSQpKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29uc3QgZHJhZ2dpbmckID0gZHJhZ1N0YXJ0JC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdXNlbW92ZScpXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKG1vdXNlVXAkKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRyYWdFbmQkID0gZHJhZ1N0YXJ0JC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbW91c2VVcCQucGlwZSh0YWtlKDEpKSlcbiAgICAgICk7XG4gICAgICBkcmFnU3RhcnQkLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgIG1vdmluZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmRyYWdTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5OZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ1N0YXJ0LmVtaXQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZHJhZ2dpbmckLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgIHVwZGF0ZUNvb3JkcyhbZXZ0LmxuZ0xhdC5sbmcsIGV2dC5sbmdMYXQubGF0XSk7XG4gICAgICAgIGlmICh0aGlzLmRyYWcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuTmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWcuZW1pdChldnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkcmFnRW5kJC5zdWJzY3JpYmUoKGV2dCkgPT4ge1xuICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0VuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5OZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ0VuZC5lbWl0KGV2dCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaW5zaWRlKSB7IC8vIEl0J3MgcG9zc2libGUgdG8gZHJhZ0VuZCBvdXRzaWRlIHRoZSB0YXJnZXQgKHNtYWxsIGlucHV0IGxhZylcbiAgICAgICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKCcnKTtcbiAgICAgICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1Bhbih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsZWF2ZSQucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCksXG4gICAgICAgIHRhcCgoKSA9PiBpbnNpZGUgPSBmYWxzZSksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhbW92aW5nKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKCcnKTtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4odHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyRmVhdHVyZShldnQ6IE1hcE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5GZWF0dXJlQ29tcG9uZW50ICYmIHRoaXMubGF5ZXIpIHtcbiAgICAgIGNvbnN0IGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxhbnk+ID0gdGhpcy5NYXBTZXJ2aWNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhcbiAgICAgICAgZXZ0LnBvaW50LFxuICAgICAgICB7XG4gICAgICAgICAgbGF5ZXJzOiBbdGhpcy5sYXllci5pZF0sXG4gICAgICAgICAgZmlsdGVyOiBbXG4gICAgICAgICAgICAnYWxsJyxcbiAgICAgICAgICAgIFsnPT0nLCAnJHR5cGUnLCAnUG9pbnQnXSxcbiAgICAgICAgICAgIFsnPT0nLCAnJGlkJywgdGhpcy5GZWF0dXJlQ29tcG9uZW50LmlkXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgKVswXTtcbiAgICAgIGlmICghZmVhdHVyZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cblxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwSW1hZ2VEYXRhLCBNYXBJbWFnZU9wdGlvbnMgfSBmcm9tICcuLi9tYXAvbWFwLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWltYWdlJyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgZGF0YT86IE1hcEltYWdlRGF0YTtcbiAgQElucHV0KCkgb3B0aW9ucz86IE1hcEltYWdlT3B0aW9ucztcbiAgQElucHV0KCkgdXJsPzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdGF0dXM6IG51bWJlciB9PigpO1xuICBAT3V0cHV0KCkgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgaW1hZ2VBZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRJbWFnZShcbiAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgIHRoaXMuZGF0YSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbWFnZUFkZGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy51cmwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLk1hcFNlcnZpY2UubG9hZEFuZEFkZEltYWdlKFxuICAgICAgICAgICAgdGhpcy5pZCxcbiAgICAgICAgICAgIHRoaXMudXJsLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmltYWdlQWRkZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZUltYWdlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYWNrZ3JvdW5kTGF5b3V0LFxuICBCYWNrZ3JvdW5kUGFpbnQsXG4gIENpcmNsZUxheW91dCxcbiAgQ2lyY2xlUGFpbnQsXG4gIEZpbGxFeHRydXNpb25MYXlvdXQsXG4gIEZpbGxFeHRydXNpb25QYWludCxcbiAgRmlsbExheW91dCxcbiAgRmlsbFBhaW50LFxuICBHZW9KU09OU291cmNlLFxuICBHZW9KU09OU291cmNlUmF3LFxuICBJbWFnZVNvdXJjZSxcbiAgTGF5ZXIsXG4gIExpbmVMYXlvdXQsXG4gIExpbmVQYWludCxcbiAgTWFwTW91c2VFdmVudCxcbiAgUmFzdGVyTGF5b3V0LFxuICBSYXN0ZXJQYWludCxcbiAgUmFzdGVyU291cmNlLFxuICBTeW1ib2xMYXlvdXQsXG4gIFN5bWJvbFBhaW50LFxuICBWZWN0b3JTb3VyY2UsXG4gIFZpZGVvU291cmNlXG59IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1sYXllcicsXG4gIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBMYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIExheWVyIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgc291cmNlPzogc3RyaW5nIHwgVmVjdG9yU291cmNlIHwgUmFzdGVyU291cmNlIHwgR2VvSlNPTlNvdXJjZSB8IEltYWdlU291cmNlIHwgVmlkZW9Tb3VyY2UgfCBHZW9KU09OU291cmNlUmF3O1xuICBASW5wdXQoKSB0eXBlOiAnc3ltYm9sJyB8ICdmaWxsJyB8ICdsaW5lJyB8ICdjaXJjbGUnIHwgJ2ZpbGwtZXh0cnVzaW9uJyB8ICdyYXN0ZXInIHwgJ2JhY2tncm91bmQnO1xuICBASW5wdXQoKSBtZXRhZGF0YT86IGFueTtcbiAgQElucHV0KCkgc291cmNlTGF5ZXI/OiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgZmlsdGVyPzogYW55W107XG4gIEBJbnB1dCgpIGxheW91dD86IEJhY2tncm91bmRMYXlvdXQgfCBGaWxsTGF5b3V0IHwgRmlsbEV4dHJ1c2lvbkxheW91dCB8IExpbmVMYXlvdXQgfCBTeW1ib2xMYXlvdXQgfCBSYXN0ZXJMYXlvdXQgfCBDaXJjbGVMYXlvdXQ7XG4gIEBJbnB1dCgpIHBhaW50PzogQmFja2dyb3VuZFBhaW50IHwgRmlsbFBhaW50IHwgRmlsbEV4dHJ1c2lvblBhaW50IHwgTGluZVBhaW50IHwgU3ltYm9sUGFpbnQgfCBSYXN0ZXJQYWludCB8IENpcmNsZVBhaW50O1xuICBASW5wdXQoKSBiZWZvcmU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbnpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heHpvb20/OiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBsYXllckFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCh0cnVlKTtcbiAgICAgIHRoaXMuc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldExheWVyKHRoaXMuaWQpKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXQoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmxheWVyQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMucGFpbnQgJiYgIWNoYW5nZXMucGFpbnQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0QWxsTGF5ZXJQYWludFByb3BlcnR5KHRoaXMuaWQsIGNoYW5nZXMucGFpbnQuY3VycmVudFZhbHVlISk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmxheW91dCAmJiAhY2hhbmdlcy5sYXlvdXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0QWxsTGF5ZXJMYXlvdXRQcm9wZXJ0eSh0aGlzLmlkLCBjaGFuZ2VzLmxheW91dC5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZmlsdGVyICYmICFjaGFuZ2VzLmZpbHRlci5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllckZpbHRlcih0aGlzLmlkLCBjaGFuZ2VzLmZpbHRlci5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuYmVmb3JlICYmICFjaGFuZ2VzLmJlZm9yZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllckJlZm9yZSh0aGlzLmlkLCBjaGFuZ2VzLmJlZm9yZS5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllclpvb21SYW5nZSh0aGlzLmlkLCB0aGlzLm1pbnpvb20sIHRoaXMubWF4em9vbSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZUxheWVyKHRoaXMuaWQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdWIpIHtcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KGJpbmRFdmVudHM6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBsYXllciA9IHtcbiAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICBtZXRhZGF0YTogdGhpcy5tZXRhZGF0YSxcbiAgICAgICAgJ3NvdXJjZS1sYXllcic6IHRoaXMuc291cmNlTGF5ZXIsXG4gICAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0LFxuICAgICAgICBwYWludDogdGhpcy5wYWludFxuICAgICAgfSxcbiAgICAgIGxheWVyRXZlbnRzOiB7XG4gICAgICAgIGNsaWNrOiB0aGlzLmNsaWNrLFxuICAgICAgICBtb3VzZUVudGVyOiB0aGlzLm1vdXNlRW50ZXIsXG4gICAgICAgIG1vdXNlTGVhdmU6IHRoaXMubW91c2VMZWF2ZSxcbiAgICAgICAgbW91c2VNb3ZlOiB0aGlzLm1vdXNlTW92ZVxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZExheWVyKGxheWVyLCBiaW5kRXZlbnRzLCB0aGlzLmJlZm9yZSk7XG4gICAgdGhpcy5sYXllckFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQW5pbWF0aW9uT3B0aW9ucyxcbiAgRXZlbnREYXRhLFxuICBMbmdMYXRCb3VuZHNMaWtlLFxuICBMbmdMYXRMaWtlLFxuICBNYXAsXG4gIE1hcEJveFpvb21FdmVudCxcbiAgTWFwTW91c2VFdmVudCxcbiAgTWFwVG91Y2hFdmVudCxcbiAgUGFkZGluZ09wdGlvbnMsXG4gIFBvaW50TGlrZSxcbiAgU3R5bGVcbiAgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSwgTW92aW5nT3B0aW9ucyB9IGZyb20gJy4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwRXZlbnQgfSBmcm9tICcuL21hcC50eXBlcyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIG5hbWVzcGFjZSBtYXBib3hnbCB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBNYXBib3hPcHRpb25zIHtcbiAgICAgIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ/OiBib29sZWFuO1xuICAgICAgdHJhbnNmb3JtUmVxdWVzdD86IEZ1bmN0aW9uO1xuICAgICAgbG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5Pzogc3RyaW5nO1xuICAgICAgcGl0Y2hXaXRoUm90YXRlPzogYm9vbGVhbjtcbiAgICB9XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcCcsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGFpbmVyPjwvZGl2PicsXG4gIHN0eWxlczogW2BcbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIGRpdiB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIGBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBNYXBTZXJ2aWNlXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBNYXBFdmVudCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBASW5wdXQoKSBjdXN0b21NYXBib3hBcGlVcmw/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhhc2g/OiBib29sZWFuO1xuICBASW5wdXQoKSByZWZyZXNoRXhwaXJlZFRpbGVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsYXNzZXM/OiBzdHJpbmdbXTtcbiAgQElucHV0KCkgYmVhcmluZ1NuYXA/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGludGVyYWN0aXZlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcGl0Y2hXaXRoUm90YXRlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXR0cmlidXRpb25Db250cm9sPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbG9nb1Bvc2l0aW9uPzogJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuICBASW5wdXQoKSBtYXhUaWxlQ2FjaGVTaXplPzogbnVtYmVyO1xuICBASW5wdXQoKSBsb2NhbElkZW9ncmFwaEZvbnRGYW1pbHk/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByZXNlcnZlRHJhd2luZ0J1ZmZlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlcldvcmxkQ29waWVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdHJhY2tSZXNpemU/OiBib29sZWFuO1xuICBASW5wdXQoKSB0cmFuc2Zvcm1SZXF1ZXN0PzogRnVuY3Rpb247XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgbWluWm9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4Wm9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgc2Nyb2xsWm9vbT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRyYWdSb3RhdGU/OiBib29sZWFuO1xuICBASW5wdXQoKSB0b3VjaFpvb21Sb3RhdGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBkb3VibGVDbGlja1pvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBrZXlib2FyZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRyYWdQYW4/OiBib29sZWFuO1xuICBASW5wdXQoKSBib3hab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc3R5bGU6IFN0eWxlIHwgc3RyaW5nO1xuICBASW5wdXQoKSBjZW50ZXI/OiBMbmdMYXRMaWtlO1xuICBASW5wdXQoKSBtYXhCb3VuZHM/OiBMbmdMYXRCb3VuZHNMaWtlO1xuICBASW5wdXQoKSB6b29tPzogW251bWJlcl07XG4gIEBJbnB1dCgpIGJlYXJpbmc/OiBbbnVtYmVyXTtcbiAgQElucHV0KCkgcGl0Y2g/OiBbbnVtYmVyXTtcblxuICAvKiBBZGRlZCBieSBuZ3gtbWFwYm94LWdsICovXG4gIEBJbnB1dCgpIG1vdmluZ01ldGhvZDogJ2p1bXBUbycgfCAnZWFzZVRvJyB8ICdmbHlUbycgPSAnZmx5VG8nO1xuICBASW5wdXQoKSBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucztcbiAgQElucHV0KCkgZml0Qm91bmRzPzogTG5nTGF0Qm91bmRzTGlrZTtcbiAgQElucHV0KCkgZml0Qm91bmRzT3B0aW9ucz86IHtcbiAgICBsaW5lYXI/OiBib29sZWFuLFxuICAgIGVhc2luZz86IEZ1bmN0aW9uLFxuICAgIHBhZGRpbmc/OiBudW1iZXIgfCBQYWRkaW5nT3B0aW9ucyxcbiAgICBvZmZzZXQ/OiBQb2ludExpa2UsXG4gICAgbWF4Wm9vbT86IG51bWJlclxuICB9O1xuICBASW5wdXQoKSBjZW50ZXJXaXRoUGFuVG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBwYW5Ub09wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zO1xuICBASW5wdXQoKSBjdXJzb3JTdHlsZT86IHN0cmluZztcblxuICBAT3V0cHV0KCkgcmVzaXplID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgbW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgY29udGV4dE1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgdG91Y2hFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaE1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHdoZWVsID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIFRPRE8gTWFwV2hlZWxFdmVudFxuICBAT3V0cHV0KCkgbW92ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7IC8vIFRPRE8gQ2hlY2sgdHlwZVxuICBAT3V0cHV0KCkgbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3ZlRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xuICBAT3V0cHV0KCkgem9vbVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHpvb21FdnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgem9vbUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGVTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcm90YXRlRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHBpdGNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHBpdGNoRXZ0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgYm94Wm9vbVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRMb3N0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgd2ViR2xDb250ZXh0UmVzdG9yZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSByZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpOyAvLyBUT0RPIENoZWNrIHR5cGVcbiAgQE91dHB1dCgpIGRhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHN0eWxlRGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgZGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHN0eWxlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHNvdXJjZURhdGFMb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG5cbiAgZ2V0IG1hcEluc3RhbmNlKCk6IE1hcCB7XG4gICAgcmV0dXJuIHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIG1hcENvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLnNldHVwKHtcbiAgICAgIGFjY2Vzc1Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLFxuICAgICAgY3VzdG9tTWFwYm94QXBpVXJsOiB0aGlzLmN1c3RvbU1hcGJveEFwaVVybCxcbiAgICAgIG1hcE9wdGlvbnM6IHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLm1hcENvbnRhaW5lci5uYXRpdmVFbGVtZW50LFxuICAgICAgICBtaW5ab29tOiB0aGlzLm1pblpvb20sXG4gICAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICAgIGhhc2g6IHRoaXMuaGFzaCxcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMuaW50ZXJhY3RpdmUsXG4gICAgICAgIGJlYXJpbmdTbmFwOiB0aGlzLmJlYXJpbmdTbmFwLFxuICAgICAgICBwaXRjaFdpdGhSb3RhdGU6IHRoaXMucGl0Y2hXaXRoUm90YXRlLFxuICAgICAgICBjbGFzc2VzOiB0aGlzLmNsYXNzZXMsXG4gICAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogdGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wsXG4gICAgICAgIGxvZ29Qb3NpdGlvbjogdGhpcy5sb2dvUG9zaXRpb24sXG4gICAgICAgIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ6IHRoaXMuZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdCxcbiAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0aGlzLnByZXNlcnZlRHJhd2luZ0J1ZmZlcixcbiAgICAgICAgcmVmcmVzaEV4cGlyZWRUaWxlczogdGhpcy5yZWZyZXNoRXhwaXJlZFRpbGVzLFxuICAgICAgICBtYXhCb3VuZHM6IHRoaXMubWF4Qm91bmRzLFxuICAgICAgICBzY3JvbGxab29tOiB0aGlzLnNjcm9sbFpvb20sXG4gICAgICAgIGJveFpvb206IHRoaXMuYm94Wm9vbSxcbiAgICAgICAgZHJhZ1JvdGF0ZTogdGhpcy5kcmFnUm90YXRlLFxuICAgICAgICBkcmFnUGFuOiB0aGlzLmRyYWdQYW4sXG4gICAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkLFxuICAgICAgICBkb3VibGVDbGlja1pvb206IHRoaXMuZG91YmxlQ2xpY2tab29tLFxuICAgICAgICB0b3VjaFpvb21Sb3RhdGU6IHRoaXMudG91Y2hab29tUm90YXRlLFxuICAgICAgICB0cmFja1Jlc2l6ZTogdGhpcy50cmFja1Jlc2l6ZSxcbiAgICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcbiAgICAgICAgem9vbTogdGhpcy56b29tLFxuICAgICAgICBiZWFyaW5nOiB0aGlzLmJlYXJpbmcsXG4gICAgICAgIHBpdGNoOiB0aGlzLnBpdGNoLFxuICAgICAgICByZW5kZXJXb3JsZENvcGllczogdGhpcy5yZW5kZXJXb3JsZENvcGllcyxcbiAgICAgICAgbWF4VGlsZUNhY2hlU2l6ZTogdGhpcy5tYXhUaWxlQ2FjaGVTaXplLFxuICAgICAgICBsb2NhbElkZW9ncmFwaEZvbnRGYW1pbHk6IHRoaXMubG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5LFxuICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiB0aGlzLnRyYW5zZm9ybVJlcXVlc3RcbiAgICAgIH0sXG4gICAgICBtYXBFdmVudHM6IHRoaXNcbiAgICB9KTtcbiAgICBpZiAodGhpcy5jdXJzb3JTdHlsZSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcih0aGlzLmN1cnNvclN0eWxlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuZGVzdHJveU1hcCgpO1xuICB9XG5cbiAgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGF3YWl0IHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC50b1Byb21pc2UoKTtcbiAgICBpZiAoY2hhbmdlcy5jdXJzb3JTdHlsZSAmJiAhY2hhbmdlcy5jdXJzb3JTdHlsZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoY2hhbmdlcy5jdXJzb3JTdHlsZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5taW5ab29tICYmICFjaGFuZ2VzLm1pblpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlTWluWm9vbShjaGFuZ2VzLm1pblpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubWF4Wm9vbSAmJiAhY2hhbmdlcy5tYXhab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZU1heFpvb20oY2hhbmdlcy5tYXhab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnNjcm9sbFpvb20gJiYgIWNoYW5nZXMuc2Nyb2xsWm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVTY3JvbGxab29tKGNoYW5nZXMuc2Nyb2xsWm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kcmFnUm90YXRlICYmICFjaGFuZ2VzLmRyYWdSb3RhdGUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1JvdGF0ZShjaGFuZ2VzLmRyYWdSb3RhdGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMudG91Y2hab29tUm90YXRlICYmICFjaGFuZ2VzLnRvdWNoWm9vbVJvdGF0ZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVUb3VjaFpvb21Sb3RhdGUoY2hhbmdlcy50b3VjaFpvb21Sb3RhdGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZG91YmxlQ2xpY2tab29tICYmICFjaGFuZ2VzLmRvdWJsZUNsaWNrWm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEb3VibGVDbGlja1pvb20oY2hhbmdlcy5kb3VibGVDbGlja1pvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMua2V5Ym9hcmQgJiYgIWNoYW5nZXMua2V5Ym9hcmQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlS2V5Ym9hcmQoY2hhbmdlcy5rZXlib2FyZC5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kcmFnUGFuICYmICFjaGFuZ2VzLmRyYWdQYW4uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1BhbihjaGFuZ2VzLmRyYWdQYW4uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuYm94Wm9vbSAmJiAhY2hhbmdlcy5ib3hab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZUJveFpvb20oY2hhbmdlcy5ib3hab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnN0eWxlICYmICFjaGFuZ2VzLnN0eWxlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZVN0eWxlKGNoYW5nZXMuc3R5bGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubWF4Qm91bmRzICYmICFjaGFuZ2VzLm1heEJvdW5kcy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVNYXhCb3VuZHMoY2hhbmdlcy5tYXhCb3VuZHMuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZml0Qm91bmRzICYmICFjaGFuZ2VzLmZpdEJvdW5kcy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5maXRCb3VuZHMoY2hhbmdlcy5maXRCb3VuZHMuY3VycmVudFZhbHVlLCB0aGlzLmZpdEJvdW5kc09wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLmNlbnRlcldpdGhQYW5UbyAmJlxuICAgICAgY2hhbmdlcy5jZW50ZXIgJiYgIWNoYW5nZXMuY2VudGVyLmlzRmlyc3RDaGFuZ2UoKSAmJlxuICAgICAgIWNoYW5nZXMuem9vbSAmJiAhY2hhbmdlcy5iZWFyaW5nICYmICFjaGFuZ2VzLnBpdGNoXG4gICAgKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucGFuVG8odGhpcy5jZW50ZXIhLCB0aGlzLnBhblRvT3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGNoYW5nZXMuY2VudGVyICYmICFjaGFuZ2VzLmNlbnRlci5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuem9vbSAmJiAhY2hhbmdlcy56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5iZWFyaW5nICYmICFjaGFuZ2VzLmJlYXJpbmcuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnBpdGNoICYmICFjaGFuZ2VzLnBpdGNoLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLm1vdmUoXG4gICAgICAgIHRoaXMubW92aW5nTWV0aG9kLFxuICAgICAgICB0aGlzLm1vdmluZ09wdGlvbnMsXG4gICAgICAgIGNoYW5nZXMuem9vbSAmJiB0aGlzLnpvb20gPyB0aGlzLnpvb21bMF0gOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXMuY2VudGVyID8gdGhpcy5jZW50ZXIgOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXMuYmVhcmluZyAmJiB0aGlzLmJlYXJpbmcgPyB0aGlzLmJlYXJpbmdbMF0gOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXMucGl0Y2ggJiYgdGhpcy5waXRjaCA/IHRoaXMucGl0Y2hbMF0gOiB1bmRlZmluZWRcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHN1cGVyY2x1c3RlciwgeyBDbHVzdGVyLCBPcHRpb25zIGFzIFN1cGVyY2x1c3Rlck9wdGlvbnMsIFN1cGVyY2x1c3RlciB9IGZyb20gJ3N1cGVyY2x1c3Rlcic7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbWdsUG9pbnRdJyB9KVxuZXhwb3J0IGNsYXNzIFBvaW50RGlyZWN0aXZlIHsgfVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttZ2xDbHVzdGVyUG9pbnRdJyB9KVxuZXhwb3J0IGNsYXNzIENsdXN0ZXJQb2ludERpcmVjdGl2ZSB7IH1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlci1jbHVzdGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmZWF0dXJlIG9mIGNsdXN0ZXJQb2ludHNcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3RlcjsgZWxzZSBwb2ludFwiPlxuICAgICAgICA8bWdsLW1hcmtlclxuICAgICAgICAgIFtmZWF0dXJlXT1cImZlYXR1cmVcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNsdXN0ZXJQb2ludFRwbDsgY29udGV4dDoge1xuICAgICAgICAgICAgJGltcGxpY2l0OiBmZWF0dXJlLFxuICAgICAgICAgICAgZ2V0TGVhdmVzRm46IGdldExlYXZlc0ZuKGZlYXR1cmUpLFxuICAgICAgICAgICAgZ2V0Q2hpbGRyZW5GbjogZ2V0Q2hpbGRyZW5GbihmZWF0dXJlKSxcbiAgICAgICAgICAgIGdldENsdXN0ZXJFeHBhbnNpb25ab29tRm46IGdldENsdXN0ZXJFeHBhbnNpb25ab29tRm4oZmVhdHVyZSlcbiAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWdsLW1hcmtlcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLXRlbXBsYXRlICNwb2ludD5cbiAgICAgICAgPG1nbC1tYXJrZXJcbiAgICAgICAgICBbZmVhdHVyZV09XCJmZWF0dXJlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwb2ludFRwbDsgY29udGV4dDogeyAkaW1wbGljaXQ6IGZlYXR1cmUgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21nbC1tYXJrZXI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ2x1c3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBPbkluaXQge1xuICAvKiBJbml0IGlucHV0ICovXG4gIEBJbnB1dCgpIHJhZGl1cz86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4Wm9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWluWm9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgZXh0ZW50PzogbnVtYmVyO1xuICBASW5wdXQoKSBub2RlU2l6ZT86IG51bWJlcjtcbiAgQElucHV0KCkgbG9nPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVkdWNlPzogKGFjY3VtdWxhdGVkOiBhbnksIHByb3BzOiBhbnkpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIGluaXRpYWw/OiAoKSA9PiBhbnk7XG4gIEBJbnB1dCgpIG1hcD86IChwcm9wczogYW55KSA9PiBhbnk7XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBASW5wdXQoKSBkYXRhOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uUG9pbnQ+O1xuXG4gIEBPdXRwdXQoKSBsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxTdXBlcmNsdXN0ZXI+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChQb2ludERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KSBwb2ludFRwbDogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChDbHVzdGVyUG9pbnREaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgY2x1c3RlclBvaW50VHBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNsdXN0ZXJQb2ludHM6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PltdO1xuXG4gIHByaXZhdGUgc3VwZXJjbHVzdGVyOiBTdXBlcmNsdXN0ZXI7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIENoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IG9wdGlvbnM6IFN1cGVyY2x1c3Rlck9wdGlvbnMgPSB7XG4gICAgICByYWRpdXM6IHRoaXMucmFkaXVzLFxuICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgbWluWm9vbTogdGhpcy5taW5ab29tLFxuICAgICAgZXh0ZW50OiB0aGlzLmV4dGVudCxcbiAgICAgIG5vZGVTaXplOiB0aGlzLm5vZGVTaXplLFxuICAgICAgbG9nOiB0aGlzLmxvZyxcbiAgICAgIHJlZHVjZTogdGhpcy5yZWR1Y2UsXG4gICAgICBpbml0aWFsOiB0aGlzLmluaXRpYWwsXG4gICAgICBtYXA6IHRoaXMubWFwXG4gICAgfTtcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgU3VwZXJjbHVzdGVyT3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5zdXBlcmNsdXN0ZXIgPSBzdXBlcmNsdXN0ZXIob3B0aW9ucyk7XG4gICAgdGhpcy5zdXBlcmNsdXN0ZXIubG9hZCh0aGlzLmRhdGEuZmVhdHVyZXMpO1xuICAgIHRoaXMubG9hZC5lbWl0KHRoaXMuc3VwZXJjbHVzdGVyKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnN1cGVyY2x1c3Rlci5sb2FkKHRoaXMuZGF0YS5mZWF0dXJlcyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgbWFwTW92ZSQgPSBtZXJnZShcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3pvb21DaGFuZ2UnKSxcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdmUnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHN1YiA9IG1hcE1vdmUkLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aDxhbnk+KHVuZGVmaW5lZClcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVDbHVzdGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBnZXRMZWF2ZXNGbiA9IChmZWF0dXJlOiBDbHVzdGVyKSA9PiB7XG4gICAgcmV0dXJuIChsaW1pdD86IG51bWJlciwgb2Zmc2V0PzogbnVtYmVyKSA9PiAoPGFueT50aGlzLnN1cGVyY2x1c3Rlci5nZXRMZWF2ZXMpKGZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyX2lkISwgbGltaXQsIG9mZnNldCk7XG4gIH1cblxuICBnZXRDaGlsZHJlbkZuID0gKGZlYXR1cmU6IENsdXN0ZXIpID0+IHtcbiAgICByZXR1cm4gKCkgPT4gKDxhbnk+dGhpcy5zdXBlcmNsdXN0ZXIuZ2V0Q2hpbGRyZW4pKGZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyX2lkISk7XG4gIH1cblxuICBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbUZuID0gKGZlYXR1cmU6IENsdXN0ZXIpID0+IHtcbiAgICByZXR1cm4gKCkgPT4gKDxhbnk+dGhpcy5zdXBlcmNsdXN0ZXIuZ2V0Q2x1c3RlckV4cGFuc2lvblpvb20pKGZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyX2lkISk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNsdXN0ZXIoKSB7XG4gICAgY29uc3QgYmJveCA9IHRoaXMuTWFwU2VydmljZS5nZXRDdXJyZW50Vmlld3BvcnRCYm94KCk7XG4gICAgY29uc3QgY3VycmVudFpvb20gPSBNYXRoLnJvdW5kKHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRab29tKCkpO1xuICAgIHRoaXMuY2x1c3RlclBvaW50cyA9IHRoaXMuc3VwZXJjbHVzdGVyLmdldENsdXN0ZXJzKGJib3gsIGN1cnJlbnRab29tKTtcbiAgICB0aGlzLkNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvaW50TGlrZSwgUG9wdXAsIExuZ0xhdExpa2UgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1wb3B1cCcsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSBjbG9zZUJ1dHRvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsb3NlT25DbGljaz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuY2hvcj86ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JztcbiAgQElucHV0KCkgb2Zmc2V0PzogbnVtYmVyIHwgUG9pbnRMaWtlIHwgeyBbYW5jaG9yOiBzdHJpbmddOiBbbnVtYmVyLCBudW1iZXJdIH07XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBASW5wdXQoKSBmZWF0dXJlPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+O1xuICBASW5wdXQoKSBsbmdMYXQ/OiBMbmdMYXRMaWtlO1xuICBASW5wdXQoKSBtYXJrZXI/OiBNYXJrZXJDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBwb3B1cEluc3RhbmNlPzogUG9wdXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubG5nTGF0ICYmIHRoaXMubWFya2VyIHx8IHRoaXMuZmVhdHVyZSAmJiB0aGlzLmxuZ0xhdCB8fCB0aGlzLmZlYXR1cmUgJiYgdGhpcy5tYXJrZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWFya2VyLCBsbmdMYXQsIGZlYXR1cmUgaW5wdXQgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZScpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmxuZ0xhdCAmJiAhY2hhbmdlcy5sbmdMYXQuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmZlYXR1cmUgJiYgIWNoYW5nZXMuZmVhdHVyZS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIGNvbnN0IG5ld2xuZ0xhdCA9IGNoYW5nZXMubG5nTGF0ID8gdGhpcy5sbmdMYXQhIDogdGhpcy5mZWF0dXJlIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMhO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcCh0aGlzLnBvcHVwSW5zdGFuY2UhLCB0cnVlKTtcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2VUbXAgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcChwb3B1cEluc3RhbmNlVG1wLCBuZXdsbmdMYXQsIHRoaXMucG9wdXBJbnN0YW5jZSEuaXNPcGVuKCkpO1xuICAgICAgdGhpcy5wb3B1cEluc3RhbmNlID0gcG9wdXBJbnN0YW5jZVRtcDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubWFya2VyICYmICFjaGFuZ2VzLm1hcmtlci5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzTWFya2VyOiBNYXJrZXJDb21wb25lbnQgPSBjaGFuZ2VzLm1hcmtlci5wcmV2aW91c1ZhbHVlO1xuICAgICAgaWYgKHByZXZpb3VzTWFya2VyLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXJrZXIocHJldmlvdXNNYXJrZXIubWFya2VySW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlICYmIHRoaXMucG9wdXBJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSwgdGhpcy5wb3B1cEluc3RhbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5wb3B1cEluc3RhbmNlID0gdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgIHRoaXMuYWRkUG9wdXAodGhpcy5wb3B1cEluc3RhbmNlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnBvcHVwSW5zdGFuY2UpIHtcbiAgICAgIGlmICh0aGlzLmxuZ0xhdCkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFwKHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVBvcHVwKCkge1xuICAgIHJldHVybiB0aGlzLk1hcFNlcnZpY2UuY3JlYXRlUG9wdXAoe1xuICAgICAgcG9wdXBPcHRpb25zOiB7XG4gICAgICAgIGNsb3NlQnV0dG9uOiB0aGlzLmNsb3NlQnV0dG9uLFxuICAgICAgICBjbG9zZU9uQ2xpY2s6IHRoaXMuY2xvc2VPbkNsaWNrLFxuICAgICAgICBhbmNob3I6IHRoaXMuYW5jaG9yLFxuICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0XG4gICAgICB9LFxuICAgICAgcG9wdXBFdmVudHM6IHtcbiAgICAgICAgb3BlbjogdGhpcy5vcGVuLFxuICAgICAgICBjbG9zZTogdGhpcy5jbG9zZVxuICAgICAgfVxuICAgIH0sIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUG9wdXAocG9wdXA6IFBvcHVwKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5sbmdMYXQgfHwgdGhpcy5mZWF0dXJlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKHBvcHVwLCB0aGlzLmxuZ0xhdCA/IHRoaXMubG5nTGF0IDogdGhpcy5mZWF0dXJlIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMhKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UsIHBvcHVwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWdsLXBvcHVwIG5lZWQgZWl0aGVyIGxuZ0xhdC9tYXJrZXIvZmVhdHVyZSB0byBiZSBzZXQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbnZhc1NvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtY2FudmFzLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2FudmFzU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQ2FudmFzU291cmNlT3B0aW9ucyB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgY29vcmRpbmF0ZXM6IG51bWJlcltdW107XG4gIEBJbnB1dCgpIGNhbnZhczogc3RyaW5nO1xuICBASW5wdXQoKSBhbmltYXRlPzogYm9vbGVhbjtcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5jb29yZGluYXRlcyAmJiAhY2hhbmdlcy5jb29yZGluYXRlcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2FudmFzICYmICFjaGFuZ2VzLmNhbnZhcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuYW5pbWF0ZSAmJiAhY2hhbmdlcy5hbmltYXRlLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHtcbiAgICAgIHR5cGU6ICdjYW52YXMnLFxuICAgICAgY29vcmRpbmF0ZXM6IHRoaXMuY29vcmRpbmF0ZXMsXG4gICAgICBjYW52YXM6IHRoaXMuY2FudmFzLFxuICAgICAgYW5pbWF0ZTogdGhpcy5hbmltYXRlLFxuICAgIH07XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2VPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWltYWdlLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBJbWFnZVNvdXJjZU9wdGlvbnMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICBASW5wdXQoKSBjb29yZGluYXRlczogbnVtYmVyW11bXTtcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy51cmwgJiYgIWNoYW5nZXMudXJsLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jb29yZGluYXRlcyAmJiAhY2hhbmdlcy5jb29yZGluYXRlcy5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgY29vcmRpbmF0ZXM6IHRoaXMuY29vcmRpbmF0ZXNcbiAgICB9KTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJhc3RlclNvdXJjZSB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1yYXN0ZXItc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBSYXN0ZXJTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBSYXN0ZXJTb3VyY2Uge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICBASW5wdXQoKSB0aWxlcz86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBib3VuZHM/OiBudW1iZXJbXTtcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgdGlsZVNpemU/OiBudW1iZXI7XG5cbiAgdHlwZTogJ3Jhc3RlcicgPSAncmFzdGVyJzsgLy8gSnVzdCB0byBtYWtlIHRzIGhhcHB5XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICBjb25zdCBzdWIgPSBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnc3R5bGVkYXRhJykucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0U291cmNlKHRoaXMuaWQpKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMudXJsICYmICFjaGFuZ2VzLnVybC5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudGlsZXMgJiYgIWNoYW5nZXMudGlsZXMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmJvdW5kcyAmJiAhY2hhbmdlcy5ib3VuZHMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWF4em9vbSAmJiAhY2hhbmdlcy5tYXh6b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50aWxlU2l6ZSAmJiAhY2hhbmdlcy50aWxlU2l6ZS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBjb25zdCBzb3VyY2UgPSB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgdGlsZXM6IHRoaXMudGlsZXMsXG4gICAgICBib3VuZHM6IHRoaXMuYm91bmRzLFxuICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgdGlsZVNpemU6IHRoaXMudGlsZVNpemVcbiAgICB9O1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwgc291cmNlKTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZlY3RvclNvdXJjZSB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC12ZWN0b3Itc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBWZWN0b3JTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBWZWN0b3JTb3VyY2Uge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybD86IHN0cmluZztcbiAgQElucHV0KCkgdGlsZXM/OiBzdHJpbmdbXTtcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcblxuICB0eXBlOiAndmVjdG9yJyA9ICd2ZWN0b3InOyAvLyBKdXN0IHRvIG1ha2UgdHMgaGFwcHlcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy51cmwgJiYgIWNoYW5nZXMudXJsLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50aWxlcyAmJiAhY2hhbmdlcy50aWxlcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5tYXh6b29tICYmICFjaGFuZ2VzLm1heHpvb20uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCB7XG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgdGlsZXM6IHRoaXMudGlsZXMsXG4gICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20sXG4gICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgfSk7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWRlb1NvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtdmlkZW8tc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBWaWRlb1NvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFZpZGVvU291cmNlT3B0aW9ucyB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsczogc3RyaW5nW107XG4gIEBJbnB1dCgpIGNvb3JkaW5hdGVzOiBudW1iZXJbXVtdO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgY29uc3Qgc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFNvdXJjZSh0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybHMgJiYgIWNoYW5nZXMudXJscy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY29vcmRpbmF0ZXMgJiYgIWNoYW5nZXMuY29vcmRpbmF0ZXMuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCB7XG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgdXJsczogdGhpcy51cmxzLFxuICAgICAgY29vcmRpbmF0ZXM6IHRoaXMuY29vcmRpbmF0ZXNcbiAgICB9KTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvYXR0cmlidXRpb24tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC9jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9mdWxsc2NyZWVuLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSwgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkgfSBmcm9tICcuL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9nZW9sb2NhdGUtY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvbmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY2FsZUNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvc2NhbGUtY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnZ2FibGUvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2UvaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IExheWVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwQ29tcG9uZW50IH0gZnJvbSAnLi9tYXAvbWFwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNQVBCT1hfQVBJX0tFWSB9IGZyb20gJy4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENsdXN0ZXJQb2ludERpcmVjdGl2ZSwgTWFya2VyQ2x1c3RlckNvbXBvbmVudCwgUG9pbnREaXJlY3RpdmUgfSBmcm9tICcuL21hcmtlci1jbHVzdGVyL21hcmtlci1jbHVzdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9wb3B1cC9wb3B1cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvY2FudmFzLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2dlb2pzb24vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvaW1hZ2Utc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYXN0ZXJTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9yYXN0ZXItc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZWN0b3JTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS92ZWN0b3Itc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWRlb1NvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZpZGVvLXNvdXJjZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hcENvbXBvbmVudCxcbiAgICBMYXllckNvbXBvbmVudCxcbiAgICBEcmFnZ2FibGVEaXJlY3RpdmUsXG4gICAgSW1hZ2VDb21wb25lbnQsXG4gICAgVmVjdG9yU291cmNlQ29tcG9uZW50LFxuICAgIEdlb0pTT05Tb3VyY2VDb21wb25lbnQsXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxuICAgIFZpZGVvU291cmNlQ29tcG9uZW50LFxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBQb3B1cENvbXBvbmVudCxcbiAgICBDb250cm9sQ29tcG9uZW50LFxuICAgIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSxcbiAgICBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlLFxuICAgIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSxcbiAgICBTY2FsZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgUG9pbnREaXJlY3RpdmUsXG4gICAgQ2x1c3RlclBvaW50RGlyZWN0aXZlLFxuICAgIE1hcmtlckNsdXN0ZXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hcENvbXBvbmVudCxcbiAgICBMYXllckNvbXBvbmVudCxcbiAgICBEcmFnZ2FibGVEaXJlY3RpdmUsXG4gICAgSW1hZ2VDb21wb25lbnQsXG4gICAgVmVjdG9yU291cmNlQ29tcG9uZW50LFxuICAgIEdlb0pTT05Tb3VyY2VDb21wb25lbnQsXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxuICAgIFZpZGVvU291cmNlQ29tcG9uZW50LFxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBQb3B1cENvbXBvbmVudCxcbiAgICBDb250cm9sQ29tcG9uZW50LFxuICAgIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSxcbiAgICBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlLFxuICAgIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSxcbiAgICBTY2FsZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgUG9pbnREaXJlY3RpdmUsXG4gICAgQ2x1c3RlclBvaW50RGlyZWN0aXZlLFxuICAgIE1hcmtlckNsdXN0ZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXBib3hHTE1vZHVsZSB7XG4gIHN0YXRpYyB3aXRoQ29uZmlnKGNvbmZpZzogeyBhY2Nlc3NUb2tlbjogc3RyaW5nLCBnZW9jb2RlckFjY2Vzc1Rva2VuPzogc3RyaW5nIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1hcGJveEdMTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNQVBCT1hfQVBJX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLmFjY2Vzc1Rva2VuXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLmdlb2NvZGVyQWNjZXNzVG9rZW4gfHwgY29uZmlnLmFjY2Vzc1Rva2VuXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkluamVjdGlvblRva2VuIiwiQXN5bmNTdWJqZWN0IiwiU3Vic2NyaXB0aW9uIiwiZmlyc3QiLCJNYXBib3hHbC5NYXJrZXIiLCJNYXBib3hHbC5Qb3B1cCIsInBvbHlnb24iLCJOZ1pvbmUiLCJNYXBib3hHbC5NYXAiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiSW5qZWN0YWJsZSIsIk9wdGlvbmFsIiwiSW5qZWN0IiwiTWFwU2VydmljZSIsIkNvbXBvbmVudCIsIkNoYW5nZURldGVjdGlvblN0cmF0ZWd5IiwiSW5wdXQiLCJWaWV3Q2hpbGQiLCJDb250cm9sQ29tcG9uZW50IiwiQXR0cmlidXRpb25Db250cm9sIiwiRGlyZWN0aXZlIiwiSG9zdCIsIkZ1bGxzY3JlZW5Db250cm9sIiwiRXZlbnRFbWl0dGVyIiwiT3V0cHV0IiwiR2VvbG9jYXRlQ29udHJvbCIsIk5hdmlnYXRpb25Db250cm9sIiwiU2NhbGVDb250cm9sIiwiVmlld0VuY2Fwc3VsYXRpb24iLCJTdWJqZWN0IiwiZnJvbUV2ZW50IiwiZmlsdGVyIiwiZGVib3VuY2VUaW1lIiwiR2VvSlNPTlNvdXJjZUNvbXBvbmVudCIsImZvcndhcmRSZWYiLCJGZWF0dXJlQ29tcG9uZW50IiwiTWFya2VyQ29tcG9uZW50IiwiUmVwbGF5U3ViamVjdCIsInRha2VVbnRpbCIsInRhcCIsInN3aXRjaE1hcCIsInRha2UiLCJtZXJnZSIsInN0YXJ0V2l0aCIsImJib3giLCJDaGFuZ2VEZXRlY3RvclJlZiIsIkNvbnRlbnRDaGlsZCIsIlRlbXBsYXRlUmVmIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLElBZU8sSUFBSSxRQUFRLEdBQUc7UUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUM7WUFDM0MsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztvQkFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEY7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNaLENBQUE7UUFDRCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQTtBQUVELHVCQXlCMEIsT0FBTyxFQUFFLFVBQVUsRUFB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QUFDLENBQUMsRUFBRSxJQUFJO3dCQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM3SixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNULEtBQUssQ0FBQyxDQUFDO3dCQUFDLEtBQUssQ0FBQzs0QkFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLE1BQU07d0JBQzlCLEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUN4RCxLQUFLLENBQUM7NEJBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2QkFBRTs0QkFDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUztxQkFDOUI7b0JBQ0QsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQUMsQ0FBQyxHQUFH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cEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDaEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDcEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDNUc7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDbEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDdEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDdEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDcEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDbEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDeEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDdEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztpQkFDbEg7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQTJCLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFNLE9B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