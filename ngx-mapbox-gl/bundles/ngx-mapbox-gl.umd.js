(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@turf/bbox'), require('@turf/helpers'), require('mapbox-gl'), require('rxjs'), require('rxjs/operators'), require('supercluster'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-mapbox-gl', ['exports', '@angular/core', '@turf/bbox', '@turf/helpers', 'mapbox-gl', 'rxjs', 'rxjs/operators', 'supercluster', '@angular/common'], factory) :
    (factory((global['ngx-mapbox-gl'] = {}),global.ng.core,null,null,null,global.rxjs,global.rxjs.operators,null,global.ng.common));
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
     */ MglResizeEventEmitter = (function () {
        function MglResizeEventEmitter() {
        }
        return MglResizeEventEmitter;
    }());
    var MapService = (function () {
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
                    ((_this.mapInstance[movingMethod]))(__assign({}, movingOptions, { zoom: zoom ? zoom : _this.mapInstance.getZoom(), center: center ? center : _this.mapInstance.getCenter(), bearing: bearing ? bearing : _this.mapInstance.getBearing(), pitch: pitch ? pitch : _this.mapInstance.getPitch() }));
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
                        var tkey = (key);
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
                        return ((popup.popupOptions))[key] === undefined && delete ((popup.popupOptions))[key];
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
                        return ((source))[key] === undefined && delete ((source))[key];
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
                return /** @type {?} */ ((this.mapInstance.getSource(sourceId)));
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
                        _this.mapInstance.setPaintProperty(layerId, key, ((paint))[key]);
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
                        _this.mapInstance.setLayoutProperty(layerId, key, ((layout))[key]);
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
                    var tkey = (key);
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
                    for (var _a = __values(this.layerIdsToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var layerId = _b.value;
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
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                    for (var _a = __values(this.sourceIdsToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var sourceId = _b.value;
                        this.mapInstance.removeSource(sourceId);
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
                    for (var _a = __values(this.markersToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var marker = _b.value;
                        marker.remove();
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
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
                    for (var _a = __values(this.popupsToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var popup = _b.value;
                        popup.remove();
                    }
                }
                catch (e_4_1) {
                    e_4 = { error: e_4_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_4)
                            throw e_4.error;
                    }
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
                    for (var _a = __values(this.imageIdsToRemove), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var imageId = _b.value;
                        this.mapInstance.removeImage(imageId);
                    }
                }
                catch (e_5_1) {
                    e_5 = { error: e_5_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_5)
                            throw e_5.error;
                    }
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
            { type: core.Injectable },
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
    var CustomControl = (function () {
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
    var ControlComponent = (function () {
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
                    },] },
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
    var AttributionControlDirective = (function () {
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
                    },] },
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
    var FullscreenControlDirective = (function () {
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
                    },] },
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
    var GeocoderControlDirective = (function () {
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
                        var tkey = (key);
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
                    },] },
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
    var GeolocateControlDirective = (function () {
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
                        var tkey = (key);
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
                    },] },
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
    var NavigationControlDirective = (function () {
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
                    _this.ControlComponent.control = new MapboxGl.NavigationControl();
                    _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
                });
            };
        NavigationControlDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mglNavigation]'
                    },] },
        ];
        /** @nocollapse */
        NavigationControlDirective.ctorParameters = function () {
            return [
                { type: MapService },
                { type: ControlComponent, decorators: [{ type: core.Host }] }
            ];
        };
        return NavigationControlDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ScaleControlDirective = (function () {
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
                    ((this.ControlComponent.control)).setUnit(changes["unit"].currentValue);
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
                    },] },
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
    var MarkerComponent = (function () {
        function MarkerComponent(MapService$$1) {
            this.MapService = MapService$$1;
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
                    /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((((this.feature)).geometry)).coordinates);
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
                this.markerInstance = new MapboxGl.Marker(/** @type {?} */ ({ offset: this.offset, element: this.content.nativeElement, anchor: this.anchor }));
                this.markerInstance.setLngLat(this.feature ? /** @type {?} */ ((this.feature.geometry)).coordinates : /** @type {?} */ ((this.lngLat)));
                this.MapService.mapCreated$.subscribe(function () {
                    _this.MapService.addMarker(/** @type {?} */ ((_this.markerInstance)));
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
                        styles: ["\n    .mapboxgl-marker {\n      line-height: 0;\n    }\n  "],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
            content: [{ type: core.ViewChild, args: ['content',] }]
        };
        return MarkerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var GeoJSONSourceComponent = (function () {
        function GeoJSONSourceComponent(MapService$$1) {
            this.MapService = MapService$$1;
            this.updateFeatureData = new rxjs.Subject();
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
                    _this.MapService.addSource(_this.id, {
                        type: 'geojson',
                        data: _this.data,
                        maxzoom: _this.maxzoom,
                        minzoom: _this.minzoom,
                        buffer: _this.buffer,
                        tolerance: _this.tolerance,
                        cluster: _this.cluster,
                        clusterRadius: _this.clusterRadius,
                        clusterMaxZoom: _this.clusterMaxZoom,
                    });
                    _this.sub = _this.updateFeatureData.pipe(operators.debounceTime(0)).subscribe(function () {
                        /** @type {?} */
                        var source = _this.MapService.getSource(_this.id);
                        source.setData(/** @type {?} */ ((_this.data)));
                    });
                    _this.sourceAdded = true;
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
                if (this.sourceAdded) {
                    this.sub.unsubscribe();
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
                var collection = (this.data);
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
                var collection = (this.data);
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
        GeoJSONSourceComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-geojson-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var FeatureComponent = (function () {
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
                ((this.feature.geometry)).coordinates = coordinates;
                this.GeoJSONSourceComponent.updateFeatureData.next();
            };
        FeatureComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-feature',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var DraggableDirective = (function () {
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
                    /** @type {?} */
                    var markerElement = ((this.MarkerComponent.content.nativeElement));
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
                        if (!inside) {
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
                    },] },
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
    var ImageComponent = (function () {
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
                        var _this = this;
                        var error_1;
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
                    },] },
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
    var LayerComponent = (function () {
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
                    _this.MapService.addLayer({
                        layerOptions: {
                            id: _this.id,
                            type: _this.type,
                            source: _this.source,
                            metadata: _this.metadata,
                            'source-layer': _this.sourceLayer,
                            minzoom: _this.minzoom,
                            maxzoom: _this.maxzoom,
                            filter: _this.filter,
                            layout: _this.layout,
                            paint: _this.paint
                        },
                        layerEvents: {
                            click: _this.click,
                            mouseEnter: _this.mouseEnter,
                            mouseLeave: _this.mouseLeave,
                            mouseMove: _this.mouseMove
                        }
                    }, _this.before);
                    _this.layerAdded = true;
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
            };
        LayerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-layer',
                        template: ''
                    },] },
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
    var MapComponent = (function () {
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
                        styles: ["\n  :host {\n    display: block;\n  }\n  div {\n    height: 100%;\n    width: 100%;\n  }\n  "],
                        providers: [
                            MapService
                        ],
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var PointDirective = (function () {
        function PointDirective() {
        }
        PointDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[mglPoint]' },] },
        ];
        return PointDirective;
    }());
    var ClusterPointDirective = (function () {
        function ClusterPointDirective() {
        }
        ClusterPointDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'ng-template[mglClusterPoint]' },] },
        ];
        return ClusterPointDirective;
    }());
    var MarkerClusterComponent = (function () {
        function MarkerClusterComponent(MapService$$1, ChangeDetectorRef, zone) {
            var _this = this;
            this.MapService = MapService$$1;
            this.ChangeDetectorRef = ChangeDetectorRef;
            this.zone = zone;
            this.load = new core.EventEmitter();
            this.sub = new rxjs.Subscription();
            this.getLeavesFn = function (feature) {
                return function (limit, offset) { return ((_this.supercluster.getLeaves))(/** @type {?} */ ((feature.properties.cluster_id)), limit, offset); };
            };
            this.getChildrenFn = function (feature) {
                return function () { return ((_this.supercluster.getChildren))(/** @type {?} */ ((feature.properties.cluster_id))); };
            };
            this.getClusterExpansionZoomFn = function (feature) {
                return function () { return ((_this.supercluster.getClusterExpansionZoom))(/** @type {?} */ ((feature.properties.cluster_id))); };
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
                    var tkey = (key);
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
                    },] },
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
    var PopupComponent = (function () {
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
                if (this.lngLat && this.marker) {
                    throw new Error('marker and lngLat input are mutually exclusive');
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
                if (changes["lngLat"] && !changes["lngLat"].isFirstChange()) {
                    this.MapService.removePopupFromMap(/** @type {?} */ ((this.popupInstance)));
                    /** @type {?} */
                    var popupInstanceTmp = this.createPopup();
                    this.MapService.addPopupToMap(popupInstanceTmp, changes["lngLat"].currentValue);
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
                    if (_this.lngLat) {
                        _this.MapService.addPopupToMap(popup, _this.lngLat);
                    }
                    else if (_this.marker && _this.marker.markerInstance) {
                        _this.MapService.addPopupToMarker(_this.marker.markerInstance, popup);
                    }
                    else {
                        throw new Error('mgl-popup need either lngLat or marker to be set');
                    }
                });
            };
        PopupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-popup',
                        template: '<div #content><ng-content></ng-content></div>',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var CanvasSourceComponent = (function () {
        function CanvasSourceComponent(MapService$$1) {
            this.MapService = MapService$$1;
            this.sourceAdded = false;
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
                    /** @type {?} */
                    var source = {
                        type: 'canvas',
                        coordinates: _this.coordinates,
                        canvas: _this.canvas,
                        animate: _this.animate,
                    };
                    _this.MapService.addSource(_this.id, source);
                    _this.sourceAdded = true;
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
                if (this.sourceAdded) {
                    this.MapService.removeSource(this.id);
                }
            };
        CanvasSourceComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-canvas-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var ImageSourceComponent = (function () {
        function ImageSourceComponent(MapService$$1) {
            this.MapService = MapService$$1;
            this.sourceAdded = false;
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
                    _this.MapService.addSource(_this.id, {
                        type: 'image',
                        url: _this.url,
                        coordinates: _this.coordinates
                    });
                    _this.sourceAdded = true;
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
                if (this.sourceAdded) {
                    this.MapService.removeSource(this.id);
                }
            };
        ImageSourceComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-image-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var RasterSourceComponent = (function () {
        function RasterSourceComponent(MapService$$1) {
            this.MapService = MapService$$1;
            this.type = 'raster';
            this.sourceAdded = false;
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
                    /** @type {?} */
                    var source = {
                        type: _this.type,
                        url: _this.url,
                        tiles: _this.tiles,
                        bounds: _this.bounds,
                        minzoom: _this.minzoom,
                        maxzoom: _this.maxzoom,
                        tileSize: _this.tileSize
                    };
                    _this.MapService.addSource(_this.id, source);
                    _this.sourceAdded = true;
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
                if (this.sourceAdded) {
                    this.MapService.removeSource(this.id);
                }
            };
        RasterSourceComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-raster-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var VectorSourceComponent = (function () {
        function VectorSourceComponent(MapService$$1) {
            this.MapService = MapService$$1;
            this.type = 'vector';
            this.sourceAdded = false;
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
                    _this.MapService.addSource(_this.id, {
                        type: _this.type,
                        url: _this.url,
                        tiles: _this.tiles,
                        minzoom: _this.minzoom,
                        maxzoom: _this.maxzoom,
                    });
                    _this.sourceAdded = true;
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
                if (this.sourceAdded) {
                    this.MapService.removeSource(this.id);
                }
            };
        VectorSourceComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-vector-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var VideoSourceComponent = (function () {
        function VideoSourceComponent(MapService$$1) {
            this.MapService = MapService$$1;
            this.sourceAdded = false;
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
                    _this.MapService.addSource(_this.id, {
                        type: 'video',
                        urls: _this.urls,
                        coordinates: _this.coordinates
                    });
                    _this.sourceAdded = true;
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
                if (this.sourceAdded) {
                    this.MapService.removeSource(this.id);
                }
            };
        VideoSourceComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mgl-video-source',
                        template: '',
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
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
    var NgxMapboxGLModule = (function () {
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
                    },] },
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvbWFwL21hcC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2F0dHJpYnV0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL2Z1bGxzY3JlZW4tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9jb250cm9sL25hdmlnYXRpb24tY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL2NvbnRyb2wvc2NhbGUtY29udHJvbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL21hcmtlci9tYXJrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS9nZW9qc29uL2ZlYXR1cmUuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9kcmFnZ2FibGUvZHJhZ2dhYmxlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9sYXllci9sYXllci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL21hcC9tYXAuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9tYXJrZXItY2x1c3Rlci9tYXJrZXItY2x1c3Rlci5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3BvcHVwL3BvcHVwLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL2NhbnZhcy1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvaW1hZ2Utc291cmNlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LW1hcGJveC1nbC9saWIvc291cmNlL3Jhc3Rlci1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9zb3VyY2UvdmVjdG9yLXNvdXJjZS5jb21wb25lbnQudHMiLCJuZzovL25neC1tYXBib3gtZ2wvbGliL3NvdXJjZS92aWRlby1zb3VyY2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWFwYm94LWdsL2xpYi9uZ3gtbWFwYm94LWdsLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGJib3ggZnJvbSAnQHR1cmYvYmJveCc7XG5pbXBvcnQgeyBwb2x5Z29uIH0gZnJvbSAnQHR1cmYvaGVscGVycyc7XG5pbXBvcnQgKiBhcyBNYXBib3hHbCBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgQXN5bmNTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQkJveCB9IGZyb20gJ3N1cGVyY2x1c3Rlcic7XG5pbXBvcnQgeyBNYXBFdmVudCwgTWFwSW1hZ2VEYXRhLCBNYXBJbWFnZU9wdGlvbnMgfSBmcm9tICcuL21hcC50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBNQVBCT1hfQVBJX0tFWSA9IG5ldyBJbmplY3Rpb25Ub2tlbignTWFwYm94QXBpS2V5Jyk7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNZ2xSZXNpemVFdmVudEVtaXR0ZXIge1xuICBhYnN0cmFjdCByZXNpemVFdmVudDogT2JzZXJ2YWJsZTx2b2lkPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cE1hcCB7XG4gIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBjdXN0b21NYXBib3hBcGlVcmw/OiBzdHJpbmc7XG4gIG1hcE9wdGlvbnM6IGFueTsgLy8gTWFwYm94R2wuTWFwYm94T3B0aW9uc1xuICBtYXBFdmVudHM6IE1hcEV2ZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldHVwTGF5ZXIge1xuICBsYXllck9wdGlvbnM6IE1hcGJveEdsLkxheWVyO1xuICBsYXllckV2ZW50czoge1xuICAgIGNsaWNrOiBFdmVudEVtaXR0ZXI8TWFwYm94R2wuTWFwTW91c2VFdmVudD47XG4gICAgbW91c2VFbnRlcjogRXZlbnRFbWl0dGVyPE1hcGJveEdsLk1hcE1vdXNlRXZlbnQ+O1xuICAgIG1vdXNlTGVhdmU6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgICBtb3VzZU1vdmU6IEV2ZW50RW1pdHRlcjxNYXBib3hHbC5NYXBNb3VzZUV2ZW50PjtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXR1cFBvcHVwIHtcbiAgcG9wdXBPcHRpb25zOiBNYXBib3hHbC5Qb3B1cE9wdGlvbnM7XG4gIHBvcHVwRXZlbnRzOiB7XG4gICAgb3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIGNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIEFsbFNvdXJjZSA9IE1hcGJveEdsLlZlY3RvclNvdXJjZSB8XG4gIE1hcGJveEdsLlJhc3RlclNvdXJjZSB8XG4gIE1hcGJveEdsLkdlb0pTT05Tb3VyY2UgfFxuICBNYXBib3hHbC5JbWFnZVNvdXJjZU9wdGlvbnMgfFxuICBNYXBib3hHbC5WaWRlb1NvdXJjZSB8XG4gIE1hcGJveEdsLkdlb0pTT05Tb3VyY2VSYXcgfFxuICBNYXBib3hHbC5DYW52YXNTb3VyY2VPcHRpb25zO1xuXG5leHBvcnQgdHlwZSBNb3ZpbmdPcHRpb25zID0gTWFwYm94R2wuRmx5VG9PcHRpb25zIHxcbiAgKE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMgJiBNYXBib3hHbC5DYW1lcmFPcHRpb25zKSB8XG4gIE1hcGJveEdsLkNhbWVyYU9wdGlvbnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcbiAgbWFwSW5zdGFuY2U6IE1hcGJveEdsLk1hcDtcbiAgbWFwQ3JlYXRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcExvYWRlZCQ6IE9ic2VydmFibGU8dm9pZD47XG4gIG1hcEV2ZW50czogTWFwRXZlbnQ7XG5cbiAgcHJpdmF0ZSBtYXBDcmVhdGVkID0gbmV3IEFzeW5jU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIG1hcExvYWRlZCA9IG5ldyBBc3luY1N1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsYXllcklkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHNvdXJjZUlkc1RvUmVtb3ZlOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIG1hcmtlcnNUb1JlbW92ZTogTWFwYm94R2wuTWFya2VyW10gPSBbXTtcbiAgcHJpdmF0ZSBwb3B1cHNUb1JlbW92ZTogTWFwYm94R2wuUG9wdXBbXSA9IFtdO1xuICBwcml2YXRlIGltYWdlSWRzVG9SZW1vdmU6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFQQk9YX0FQSV9LRVkpIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0FQSV9LRVk6IHN0cmluZyxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IE1nbFJlc2l6ZUV2ZW50RW1pdHRlcjogTWdsUmVzaXplRXZlbnRFbWl0dGVyXG4gICkge1xuICAgIHRoaXMubWFwQ3JlYXRlZCQgPSB0aGlzLm1hcENyZWF0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5tYXBMb2FkZWQkID0gdGhpcy5tYXBMb2FkZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXR1cChvcHRpb25zOiBTZXR1cE1hcCkge1xuICAgIC8vIE5lZWQgb25TdGFibGUgdG8gd2FpdCBmb3IgYSBwb3RlbnRpYWwgQGFuZ3VsYXIvcm91dGUgdHJhbnNpdGlvbiB0byBlbmRcbiAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgLy8gV29ya2Fyb3VuZCByb2xsdXAgaXNzdWVcbiAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnYWNjZXNzVG9rZW4nLCBvcHRpb25zLmFjY2Vzc1Rva2VuIHx8IHRoaXMuTUFQQk9YX0FQSV9LRVkpO1xuICAgICAgaWYgKG9wdGlvbnMuY3VzdG9tTWFwYm94QXBpVXJsKSB7XG4gICAgICAgIHRoaXMuYXNzaWduKE1hcGJveEdsLCAnY29uZmlnLkFQSV9VUkwnLCBvcHRpb25zLmN1c3RvbU1hcGJveEFwaVVybCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNyZWF0ZU1hcChvcHRpb25zLm1hcE9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKG9wdGlvbnMubWFwRXZlbnRzKTtcbiAgICAgIHRoaXMubWFwRXZlbnRzID0gb3B0aW9ucy5tYXBFdmVudHM7XG4gICAgICB0aGlzLm1hcENyZWF0ZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBDcmVhdGVkLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBkZXN0cm95TWFwKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pblpvb20obWluWm9vbTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLnNldE1pblpvb20obWluWm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVNYXhab29tKG1heFpvb206IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhab29tKG1heFpvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU2Nyb2xsWm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2Uuc2Nyb2xsWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVEcmFnUm90YXRlKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS5kcmFnUm90YXRlLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UudG91Y2hab29tUm90YXRlLmVuYWJsZSgpIDogdGhpcy5tYXBJbnN0YW5jZS50b3VjaFpvb21Sb3RhdGUuZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlRG91YmxlQ2xpY2tab29tKHN0YXR1czogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3RhdHVzID8gdGhpcy5tYXBJbnN0YW5jZS5kb3VibGVDbGlja1pvb20uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVLZXlib2FyZChzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2Uua2V5Ym9hcmQuZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZURyYWdQYW4oc3RhdHVzOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzdGF0dXMgPyB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZW5hYmxlKCkgOiB0aGlzLm1hcEluc3RhbmNlLmRyYWdQYW4uZGlzYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQm94Wm9vbShzdGF0dXM6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN0YXR1cyA/IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5lbmFibGUoKSA6IHRoaXMubWFwSW5zdGFuY2UuYm94Wm9vbS5kaXNhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdHlsZShzdHlsZTogTWFwYm94R2wuU3R5bGUpIHtcbiAgICAvLyBUT0RPIFByb2JhYmx5IG5vdCBzbyBzaW1wbGUsIHdyaXRlIGRlbW8vdGVzdHNcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTWF4Qm91bmRzKG1heEJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSkge1xuICAgIC8vIFRPRE8gUHJvYmFibHkgbm90IHNvIHNpbXBsZSwgd3JpdGUgZGVtby90ZXN0c1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRNYXhCb3VuZHMobWF4Qm91bmRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZUNhbnZhc0N1cnNvcihjdXJzb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2FudmFzQ29udGFpbmVyKCk7XG4gICAgY2FudmFzLnN0eWxlLmN1cnNvciA9IGN1cnNvcjtcbiAgfVxuXG4gIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhcbiAgICBwb2ludE9yQm94PzogTWFwYm94R2wuUG9pbnRMaWtlIHwgTWFwYm94R2wuUG9pbnRMaWtlW10sXG4gICAgcGFyYW1ldGVycz86IHsgbGF5ZXJzPzogc3RyaW5nW10sIGZpbHRlcj86IGFueVtdIH1cbiAgKTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+W10ge1xuICAgIHJldHVybiB0aGlzLm1hcEluc3RhbmNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhwb2ludE9yQm94LCBwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHBhblRvKGNlbnRlcjogTWFwYm94R2wuTG5nTGF0TGlrZSwgb3B0aW9ucz86IE1hcGJveEdsLkFuaW1hdGlvbk9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucGFuVG8oY2VudGVyLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmUoXG4gICAgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyxcbiAgICBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucyxcbiAgICB6b29tPzogbnVtYmVyLFxuICAgIGNlbnRlcj86IE1hcGJveEdsLkxuZ0xhdExpa2UsXG4gICAgYmVhcmluZz86IG51bWJlcixcbiAgICBwaXRjaD86IG51bWJlclxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICg8YW55PnRoaXMubWFwSW5zdGFuY2VbbW92aW5nTWV0aG9kXSkoe1xuICAgICAgICAuLi5tb3ZpbmdPcHRpb25zLFxuICAgICAgICB6b29tOiB6b29tID8gem9vbSA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpLFxuICAgICAgICBjZW50ZXI6IGNlbnRlciA/IGNlbnRlciA6IHRoaXMubWFwSW5zdGFuY2UuZ2V0Q2VudGVyKCksXG4gICAgICAgIGJlYXJpbmc6IGJlYXJpbmcgPyBiZWFyaW5nIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRCZWFyaW5nKCksXG4gICAgICAgIHBpdGNoOiBwaXRjaCA/IHBpdGNoIDogdGhpcy5tYXBJbnN0YW5jZS5nZXRQaXRjaCgpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZExheWVyKGxheWVyOiBTZXR1cExheWVyLCBiZWZvcmU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMobGF5ZXIubGF5ZXJPcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIE1hcGJveEdsLkxheWVyPmtleTtcbiAgICAgICAgICBpZiAobGF5ZXIubGF5ZXJPcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsYXllci5sYXllck9wdGlvbnNbdGtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkTGF5ZXIobGF5ZXIubGF5ZXJPcHRpb25zLCBiZWZvcmUpO1xuICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY2xpY2snLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLmNsaWNrLmVtaXQoZXZ0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAobGF5ZXIubGF5ZXJFdmVudHMubW91c2VFbnRlci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZW50ZXInLCBsYXllci5sYXllck9wdGlvbnMuaWQsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGxheWVyLmxheWVyRXZlbnRzLm1vdXNlRW50ZXIuZW1pdChldnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChsYXllci5sYXllckV2ZW50cy5tb3VzZUxlYXZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VsZWF2ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VMZWF2ZS5lbWl0KGV2dCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGxheWVyLmxheWVyRXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlbW92ZScsIGxheWVyLmxheWVyT3B0aW9ucy5pZCwgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgbGF5ZXIubGF5ZXJFdmVudHMubW91c2VNb3ZlLmVtaXQoZXZ0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVMYXllcihsYXllcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxheWVySWRzVG9SZW1vdmUucHVzaChsYXllcklkKTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXI6IE1hcGJveEdsLk1hcmtlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLmFkZFRvKHRoaXMubWFwSW5zdGFuY2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKG1hcmtlcjogTWFwYm94R2wuTWFya2VyKSB7XG4gICAgdGhpcy5tYXJrZXJzVG9SZW1vdmUucHVzaChtYXJrZXIpO1xuICB9XG5cbiAgY3JlYXRlUG9wdXAocG9wdXA6IFNldHVwUG9wdXAsIGVsZW1lbnQ6IE5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHBvcHVwLnBvcHVwT3B0aW9ucylcbiAgICAgICAgLmZvckVhY2goKGtleSkgPT5cbiAgICAgICAgICAoPGFueT5wb3B1cC5wb3B1cE9wdGlvbnMpW2tleV0gPT09IHVuZGVmaW5lZCAmJiBkZWxldGUgKDxhbnk+cG9wdXAucG9wdXBPcHRpb25zKVtrZXldKTtcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2UgPSBuZXcgTWFwYm94R2wuUG9wdXAocG9wdXAucG9wdXBPcHRpb25zKTtcbiAgICAgIHBvcHVwSW5zdGFuY2Uuc2V0RE9NQ29udGVudChlbGVtZW50KTtcbiAgICAgIGlmIChwb3B1cC5wb3B1cEV2ZW50cy5jbG9zZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvcHVwSW5zdGFuY2Uub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXAucG9wdXBFdmVudHMuY2xvc2UuZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3B1cC5wb3B1cEV2ZW50cy5vcGVuLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9wdXBJbnN0YW5jZS5vbignb3BlbicsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHBvcHVwLnBvcHVwRXZlbnRzLm9wZW4uZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb3B1cEluc3RhbmNlO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkUG9wdXBUb01hcChwb3B1cDogTWFwYm94R2wuUG9wdXAsIGxuZ0xhdDogTWFwYm94R2wuTG5nTGF0TGlrZSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcG9wdXAuc2V0TG5nTGF0KGxuZ0xhdCk7XG4gICAgICBwb3B1cC5hZGRUbyh0aGlzLm1hcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFBvcHVwVG9NYXJrZXIobWFya2VyOiBNYXBib3hHbC5NYXJrZXIsIHBvcHVwOiBNYXBib3hHbC5Qb3B1cCkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgbWFya2VyLnNldFBvcHVwKHBvcHVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVBvcHVwRnJvbU1hcChwb3B1cDogTWFwYm94R2wuUG9wdXApIHtcbiAgICB0aGlzLnBvcHVwc1RvUmVtb3ZlLnB1c2gocG9wdXApO1xuICB9XG5cbiAgcmVtb3ZlUG9wdXBGcm9tTWFya2VyKG1hcmtlcjogTWFwYm94R2wuTWFya2VyKSB7XG4gICAgcmV0dXJuIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBtYXJrZXIuc2V0UG9wdXAodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvbnRyb2woY29udHJvbDogTWFwYm94R2wuQ29udHJvbCB8IE1hcGJveEdsLklDb250cm9sLCBwb3NpdGlvbj86ICd0b3AtcmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICdib3R0b20tcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0Jykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRDb250cm9sKDxhbnk+Y29udHJvbCwgcG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQ29udHJvbChjb250cm9sOiBNYXBib3hHbC5Db250cm9sIHwgTWFwYm94R2wuSUNvbnRyb2wpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlQ29udHJvbCg8YW55PmNvbnRyb2wpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZEFuZEFkZEltYWdlKGltYWdlSWQ6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2UubG9hZEltYWdlKHVybCwgKGVycm9yOiB7IHN0YXR1czogbnVtYmVyIH0gfCBudWxsLCBpbWFnZTogSW1hZ2VEYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEltYWdlKGltYWdlSWQsIGltYWdlLCBvcHRpb25zKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJbWFnZShpbWFnZUlkOiBzdHJpbmcsIGRhdGE6IE1hcEltYWdlRGF0YSwgb3B0aW9ucz86IE1hcEltYWdlT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5hZGRJbWFnZShpbWFnZUlkLCA8YW55PmRhdGEsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlSW1hZ2UoaW1hZ2VJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5pbWFnZUlkc1RvUmVtb3ZlLnB1c2goaW1hZ2VJZCk7XG4gIH1cblxuICBhZGRTb3VyY2Uoc291cmNlSWQ6IHN0cmluZywgc291cmNlOiBBbGxTb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSlcbiAgICAgICAgLmZvckVhY2goKGtleSkgPT5cbiAgICAgICAgICAoPGFueT5zb3VyY2UpW2tleV0gPT09IHVuZGVmaW5lZCAmJiBkZWxldGUgKDxhbnk+c291cmNlKVtrZXldKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UuYWRkU291cmNlKHNvdXJjZUlkLCA8YW55PnNvdXJjZSk7IC8vIFR5cGluZ3MgaXNzdWVcbiAgICB9KTtcbiAgfVxuXG4gIGdldFNvdXJjZTxUPihzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIDxUPjxhbnk+dGhpcy5tYXBJbnN0YW5jZS5nZXRTb3VyY2Uoc291cmNlSWQpO1xuICB9XG5cbiAgcmVtb3ZlU291cmNlKHNvdXJjZUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvdXJjZUlkc1RvUmVtb3ZlLnB1c2goc291cmNlSWQpO1xuICB9XG5cbiAgc2V0QWxsTGF5ZXJQYWludFByb3BlcnR5KFxuICAgIGxheWVySWQ6IHN0cmluZyxcbiAgICBwYWludDogTWFwYm94R2wuQmFja2dyb3VuZFBhaW50IHxcbiAgICAgIE1hcGJveEdsLkZpbGxQYWludCB8XG4gICAgICBNYXBib3hHbC5GaWxsRXh0cnVzaW9uUGFpbnQgfFxuICAgICAgTWFwYm94R2wuTGluZVBhaW50IHxcbiAgICAgIE1hcGJveEdsLlN5bWJvbFBhaW50IHxcbiAgICAgIE1hcGJveEdsLlJhc3RlclBhaW50IHxcbiAgICAgIE1hcGJveEdsLkNpcmNsZVBhaW50XG4gICkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocGFpbnQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBwZXJmLCBzZXRQYWludFByb3BlcnR5IG9ubHkgb24gY2hhbmdlZCBwYWludCBwcm9wcyBtYXliZVxuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnNldFBhaW50UHJvcGVydHkobGF5ZXJJZCwga2V5LCAoPGFueT5wYWludClba2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEFsbExheWVyTGF5b3V0UHJvcGVydHkoXG4gICAgbGF5ZXJJZDogc3RyaW5nLFxuICAgIGxheW91dDogTWFwYm94R2wuQmFja2dyb3VuZExheW91dCB8XG4gICAgICBNYXBib3hHbC5GaWxsTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkZpbGxFeHRydXNpb25MYXlvdXQgfFxuICAgICAgTWFwYm94R2wuTGluZUxheW91dCB8XG4gICAgICBNYXBib3hHbC5TeW1ib2xMYXlvdXQgfFxuICAgICAgTWFwYm94R2wuUmFzdGVyTGF5b3V0IHxcbiAgICAgIE1hcGJveEdsLkNpcmNsZUxheW91dFxuICApIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGxheW91dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIHBlcmYsIHNldFBhaW50UHJvcGVydHkgb25seSBvbiBjaGFuZ2VkIHBhaW50IHByb3BzIG1heWJlXG4gICAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0TGF5b3V0UHJvcGVydHkobGF5ZXJJZCwga2V5LCAoPGFueT5sYXlvdXQpW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckZpbHRlcihsYXllcklkOiBzdHJpbmcsIGZpbHRlcjogYW55W10pIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uuc2V0RmlsdGVyKGxheWVySWQsIGZpbHRlcik7XG4gICAgfSk7XG4gIH1cblxuICBzZXRMYXllckJlZm9yZShsYXllcklkOiBzdHJpbmcsIGJlZm9yZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UubW92ZUxheWVyKGxheWVySWQsIGJlZm9yZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldExheWVyWm9vbVJhbmdlKGxheWVySWQ6IHN0cmluZywgbWluWm9vbT86IG51bWJlciwgbWF4Wm9vbT86IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5zZXRMYXllclpvb21SYW5nZShsYXllcklkLCBtaW5ab29tID8gbWluWm9vbSA6IDAsIG1heFpvb20gPyBtYXhab29tIDogMjApO1xuICAgIH0pO1xuICB9XG5cbiAgZml0Qm91bmRzKGJvdW5kczogTWFwYm94R2wuTG5nTGF0Qm91bmRzTGlrZSwgb3B0aW9ucz86IGFueSkge1xuICAgIHJldHVybiB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5maXRCb3VuZHMoYm91bmRzLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRWaWV3cG9ydEJib3goKTogQkJveCB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5tYXBJbnN0YW5jZS5nZXRDYW52YXMoKTtcbiAgICBjb25zdCB3ID0gY2FudmFzLndpZHRoO1xuICAgIGNvbnN0IGggPSBjYW52YXMuaGVpZ2h0O1xuICAgIGNvbnN0IHVwTGVmdCA9IHRoaXMubWFwSW5zdGFuY2UudW5wcm9qZWN0KFswLCAwXSkudG9BcnJheSgpO1xuICAgIGNvbnN0IHVwUmlnaHQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbdywgMF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCBkb3duUmlnaHQgPSB0aGlzLm1hcEluc3RhbmNlLnVucHJvamVjdChbdywgaF0pLnRvQXJyYXkoKTtcbiAgICBjb25zdCBkb3duTGVmdCA9IHRoaXMubWFwSW5zdGFuY2UudW5wcm9qZWN0KFswLCBoXSkudG9BcnJheSgpO1xuICAgIHJldHVybiA8YW55PmJib3gocG9seWdvbihbW3VwTGVmdCwgdXBSaWdodCwgZG93blJpZ2h0LCBkb3duTGVmdCwgdXBMZWZ0XV0pKTtcbiAgfVxuXG4gIGFwcGx5Q2hhbmdlcygpIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVMYXllcnMoKTtcbiAgICAgIHRoaXMucmVtb3ZlU291cmNlcygpO1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXJzKCk7XG4gICAgICB0aGlzLnJlbW92ZVBvcHVwcygpO1xuICAgICAgdGhpcy5yZW1vdmVJbWFnZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWFwKG9wdGlvbnM6IE1hcGJveEdsLk1hcGJveE9wdGlvbnMpIHtcbiAgICBOZ1pvbmUuYXNzZXJ0Tm90SW5Bbmd1bGFyWm9uZSgpO1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiBNYXBib3hHbC5NYXBib3hPcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLm1hcEluc3RhbmNlID0gbmV3IE1hcGJveEdsLk1hcChvcHRpb25zKTtcbiAgICBjb25zdCBzdWJDaGFuZ2VzID0gdGhpcy56b25lLm9uTWljcm90YXNrRW1wdHlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hcHBseUNoYW5nZXMoKSk7XG4gICAgaWYgKHRoaXMuTWdsUmVzaXplRXZlbnRFbWl0dGVyKSB7XG4gICAgICBjb25zdCBzdWJSZXNpemUgPSB0aGlzLk1nbFJlc2l6ZUV2ZW50RW1pdHRlci5yZXNpemVFdmVudC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm1hcEluc3RhbmNlLnJlc2l6ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoc3ViUmVzaXplKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1YkNoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMYXllcnMoKSB7XG4gICAgZm9yIChjb25zdCBsYXllcklkIG9mIHRoaXMubGF5ZXJJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ2NsaWNrJywgbGF5ZXJJZCk7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9mZignbW91c2VlbnRlcicsIGxheWVySWQpO1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vZmYoJ21vdXNlbGVhdmUnLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub2ZmKCdtb3VzZW1vdmUnLCBsYXllcklkKTtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlTGF5ZXIobGF5ZXJJZCk7XG4gICAgfVxuICAgIHRoaXMubGF5ZXJJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVTb3VyY2VzKCkge1xuICAgIGZvciAoY29uc3Qgc291cmNlSWQgb2YgdGhpcy5zb3VyY2VJZHNUb1JlbW92ZSkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5yZW1vdmVTb3VyY2Uoc291cmNlSWQpO1xuICAgIH1cbiAgICB0aGlzLnNvdXJjZUlkc1RvUmVtb3ZlID0gW107XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU1hcmtlcnMoKSB7XG4gICAgZm9yIChjb25zdCBtYXJrZXIgb2YgdGhpcy5tYXJrZXJzVG9SZW1vdmUpIHtcbiAgICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5tYXJrZXJzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUG9wdXBzKCkge1xuICAgIGZvciAoY29uc3QgcG9wdXAgb2YgdGhpcy5wb3B1cHNUb1JlbW92ZSkge1xuICAgICAgcG9wdXAucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMucG9wdXBzVG9SZW1vdmUgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlSW1hZ2VzKCkge1xuICAgIGZvciAoY29uc3QgaW1hZ2VJZCBvZiB0aGlzLmltYWdlSWRzVG9SZW1vdmUpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2UucmVtb3ZlSW1hZ2UoaW1hZ2VJZCk7XG4gICAgfVxuICAgIHRoaXMuaW1hZ2VJZHNUb1JlbW92ZSA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGV2ZW50czogTWFwRXZlbnQpIHtcbiAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdsb2FkJywgKCkgPT4ge1xuICAgICAgdGhpcy5tYXBMb2FkZWQubmV4dCh1bmRlZmluZWQpO1xuICAgICAgdGhpcy5tYXBMb2FkZWQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmxvYWQuZW1pdCh0aGlzLm1hcEluc3RhbmNlKSk7XG4gICAgfSk7XG4gICAgaWYgKGV2ZW50cy5yZXNpemUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncmVzaXplJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVzaXplLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlbW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW1vdmUnLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZW1vdmUuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VEb3duLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlZG93bicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlRG93bi5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZVVwLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNldXAnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZVVwLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlTW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZW1vdmUnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3VzZU1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY2xpY2snLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jbGljay5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYmxDbGljay5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYmxjbGljaycsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRibENsaWNrLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlRW50ZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VlbnRlcicsIChldnQ6IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdXNlRW50ZXIuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW91c2VMZWF2ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3VzZWxlYXZlJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VMZWF2ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3VzZU92ZXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW91c2VvdmVyJywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VPdmVyLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLm1vdXNlT3V0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ21vdXNlb3V0JywgKGV2dDogTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMubW91c2VPdXQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY29udGV4dE1lbnUub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignY29udGV4dG1lbnUnLCAoZXZ0OiBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jb250ZXh0TWVudS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaFN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy50b3VjaFN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnRvdWNoRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNoZW5kJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMudG91Y2hFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMudG91Y2hNb3ZlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3RvdWNobW92ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoTW92ZS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy50b3VjaENhbmNlbC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd0b3VjaGNhbmNlbCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnRvdWNoQ2FuY2VsLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLndoZWVsLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIC8vIE1hcGJveEdsLk1hcFdoZWVsRXZlbnRcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3doZWVsJywgKGV2dDogYW55KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy53aGVlbC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5tb3ZlU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignbW92ZXN0YXJ0JywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3ZlJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLm1vdmUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubW92ZUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdtb3ZlZW5kJywgKGV2dDogRHJhZ0V2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5tb3ZlRW5kLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmRyYWdTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkcmFnc3RhcnQnLCAoZXZ0OiBEcmFnRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWdTdGFydC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWcnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZHJhZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kcmFnRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZXZ0OiBEcmFnRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRyYWdFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3pvb21zdGFydCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy56b29tU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbUV2dC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnpvb21FdnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuem9vbUVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd6b29tZW5kJywgKGV2dDogTWFwYm94R2wuTWFwVG91Y2hFdmVudCB8IE1hcGJveEdsLk1hcE1vdXNlRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT5cbiAgICAgICAgZXZlbnRzLnpvb21FbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbigncm90YXRlc3RhcnQnLCAoZXZ0OiBNYXBib3hHbC5NYXBUb3VjaEV2ZW50IHwgTWFwYm94R2wuTWFwTW91c2VFdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICBldmVudHMucm90YXRlU3RhcnQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZScsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yb3RhdGUuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucm90YXRlRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3JvdGF0ZWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcFRvdWNoRXZlbnQgfCBNYXBib3hHbC5NYXBNb3VzZUV2ZW50KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+XG4gICAgICAgIGV2ZW50cy5yb3RhdGVFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMucGl0Y2hTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaHN0YXJ0JywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaFN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnBpdGNoRXZ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3BpdGNoJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5waXRjaEV2dC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5waXRjaEVuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdwaXRjaGVuZCcsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucGl0Y2hFbmQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuYm94Wm9vbVN0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21zdGFydCcsIChldnQ6IE1hcGJveEdsLk1hcEJveFpvb21FdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbVN0YXJ0LmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmJveFpvb21FbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignYm94em9vbWVuZCcsIChldnQ6IE1hcGJveEdsLk1hcEJveFpvb21FdmVudCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuYm94Wm9vbUVuZC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5ib3hab29tQ2FuY2VsLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2JveHpvb21jYW5jZWwnLCAoZXZ0OiBNYXBib3hHbC5NYXBCb3hab29tRXZlbnQpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmJveFpvb21DYW5jZWwuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMud2ViR2xDb250ZXh0TG9zdC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRsb3N0JywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMud2ViR2xDb250ZXh0TG9zdC5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy53ZWJHbENvbnRleHRSZXN0b3JlZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCd3ZWJnbGNvbnRleHRyZXN0b3JlZCcsICgpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLndlYkdsQ29udGV4dFJlc3RvcmVkLmVtaXQoKSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlbmRlci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdyZW5kZXInLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZW5kZXIuZW1pdCgpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignZXJyb3InLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5lcnJvci5lbWl0KCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ2RhdGEnLCAoZXZ0OiBNYXBib3hHbC5FdmVudERhdGEpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmRhdGEuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc3R5bGVEYXRhLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3N0eWxlZGF0YScsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc3R5bGVEYXRhLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGEub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tYXBJbnN0YW5jZS5vbignc291cmNlZGF0YScsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuc291cmNlRGF0YS5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5kYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdkYXRhbG9hZGluZycsIChldnQ6IE1hcGJveEdsLkV2ZW50RGF0YSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZGF0YUxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuc3R5bGVEYXRhTG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1hcEluc3RhbmNlLm9uKCdzdHlsZWRhdGFsb2FkaW5nJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zdHlsZURhdGFMb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnNvdXJjZURhdGFMb2FkaW5nLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWFwSW5zdGFuY2Uub24oJ3NvdXJjZWRhdGFsb2FkaW5nJywgKGV2dDogTWFwYm94R2wuRXZlbnREYXRhKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5zb3VyY2VEYXRhTG9hZGluZy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIG1vdmUgdGhpcyBlbHNld2hlcmVcbiAgcHJpdmF0ZSBhc3NpZ24ob2JqOiBhbnksIHByb3A6IGFueSwgdmFsdWU6IGFueSkge1xuICAgIGlmICh0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICBwcm9wID0gcHJvcC5zcGxpdCgnLicpO1xuICAgIH1cbiAgICBpZiAocHJvcC5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBlID0gcHJvcC5zaGlmdCgpO1xuICAgICAgdGhpcy5hc3NpZ24ob2JqW2VdID1cbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtlXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgICAgICAgPyBvYmpbZV1cbiAgICAgICAgICA6IHt9LFxuICAgICAgICBwcm9wLFxuICAgICAgICB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtwcm9wWzBdXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbCwgSUNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tQ29udHJvbCBpbXBsZW1lbnRzIElDb250cm9sIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50XG4gICkge1xuICB9XG5cbiAgb25BZGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyO1xuICB9XG5cbiAgb25SZW1vdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIGdldERlZmF1bHRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gJ3RvcC1yaWdodCc7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWNvbnRyb2wnLFxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJtYXBib3hnbC1jdHJsXCIgI2NvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBwb3NpdGlvbj86ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcgfCAnYm90dG9tLXJpZ2h0JztcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBjb250cm9sOiBDb250cm9sIHwgSUNvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jb250cm9sID0gbmV3IEN1c3RvbUNvbnRyb2wodGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuY29udHJvbCEsIHRoaXMucG9zaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZUNvbnRyb2wodGhpcy5jb250cm9sKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xBdHRyaWJ1dGlvbl0nXG59KVxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGNvbXBhY3Q/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnM6IHsgY29tcGFjdD86IGJvb2xlYW4gfSA9IHt9O1xuICAgICAgaWYgKHRoaXMuY29tcGFjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMuY29tcGFjdCA9IHRoaXMuY29tcGFjdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IEF0dHJpYnV0aW9uQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLCB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCwgSG9zdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnVsbHNjcmVlbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xGdWxsc2NyZWVuXSdcbn0pXG5leHBvcnQgY2xhc3MgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IEZ1bGxzY3JlZW5Db250cm9sKCk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG4gIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEdlb2NvZGVyRXZlbnQgfSBmcm9tICcuLi9tYXAvbWFwLnR5cGVzJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuY29uc3QgTWFwYm94R2VvY29kZXIgPSByZXF1aXJlKCdAbWFwYm94L21hcGJveC1nbC1nZW9jb2RlcicpO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIExuZ0xhdExpdGVyYWwge1xuICBsYXRpdHVkZTogbnVtYmVyO1xuICBsb25naXR1ZGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRzIGV4dGVuZHMgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLlBvaW50PiB7XG4gIGF0dHJpYnV0aW9uOiBzdHJpbmc7XG4gIHF1ZXJ5OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHQgZXh0ZW5kcyBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD4ge1xuICBiYm94OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgY2VudGVyOiBudW1iZXJbXTtcbiAgcGxhY2VfbmFtZTogc3RyaW5nO1xuICBwbGFjZV90eXBlOiBzdHJpbmdbXTtcbiAgcmVsZXZhbmNlOiBudW1iZXI7XG4gIHRleHQ6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb250ZXh0OiBhbnlbXTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbEdlb2NvZGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEdlb2NvZGVyRXZlbnQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBjb3VudHJ5Pzogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgQElucHV0KCkgem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgYmJveD86IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICBASW5wdXQoKSB0eXBlcz86IHN0cmluZztcbiAgQElucHV0KCkgZmx5VG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBtaW5MZW5ndGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbWl0PzogbnVtYmVyO1xuICBASW5wdXQoKSBsYW5ndWFnZT86IHN0cmluZztcbiAgQElucHV0KCkgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZpbHRlcj86IChmZWF0dXJlOiBSZXN1bHQpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxvY2FsR2VvY29kZXI/OiAocXVlcnk6IHN0cmluZykgPT4gUmVzdWx0W107XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgcHJveGltaXR5PzogTG5nTGF0TGl0ZXJhbDtcbiAgQElucHV0KCkgc2VhcmNoSW5wdXQ/OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGNsZWFyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgbG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8eyBxdWVyeTogc3RyaW5nIH0+KCk7XG4gIEBPdXRwdXQoKSByZXN1bHRzID0gbmV3IEV2ZW50RW1pdHRlcjxSZXN1bHRzPigpO1xuICBAT3V0cHV0KCkgcmVzdWx0ID0gbmV3IEV2ZW50RW1pdHRlcjx7IHJlc3VsdDogUmVzdWx0IH0+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdlb2NvZGVyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkpIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVk6IHN0cmluZ1xuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHByb3hpbWl0eTogdGhpcy5wcm94aW1pdHksXG4gICAgICAgIGNvdW50cnk6IHRoaXMuY291bnRyeSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgICAgYmJveDogdGhpcy5iYm94LFxuICAgICAgICB0eXBlczogdGhpcy50eXBlcyxcbiAgICAgICAgZmx5VG86IHRoaXMuZmx5VG8sXG4gICAgICAgIG1pbkxlbmd0aDogdGhpcy5taW5MZW5ndGgsXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgbG9jYWxHZW9jb2RlcjogdGhpcy5sb2NhbEdlb2NvZGVyLFxuICAgICAgICBhY2Nlc3NUb2tlbjogdGhpcy5hY2Nlc3NUb2tlbiB8fCB0aGlzLk1BUEJPWF9HRU9DT0RFUl9BUElfS0VZXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIHR5cGVvZiBvcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2VvY29kZXIgPSBuZXcgTWFwYm94R2VvY29kZXIob3B0aW9ucyk7XG4gICAgICB0aGlzLmhvb2tFdmVudHModGhpcyk7XG4gICAgICB0aGlzLmFkZENvbnRyb2woKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZW9jb2Rlci5xdWVyeSh0aGlzLnNlYXJjaElucHV0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuZ2VvY29kZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMucHJveGltaXR5ICYmICFjaGFuZ2VzLnByb3hpbWl0eS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIuc2V0UHJveGltaXR5KGNoYW5nZXMucHJveGltaXR5LmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnNlYXJjaElucHV0KSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLnF1ZXJ5KHRoaXMuc2VhcmNoSW5wdXQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29udHJvbCgpIHtcbiAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IHRoaXMuZ2VvY29kZXI7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2woXG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCxcbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvblxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhvb2tFdmVudHMoZXZlbnRzOiBHZW9jb2RlckV2ZW50KSB7XG4gICAgaWYgKGV2ZW50cy5yZXN1bHRzLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ3Jlc3VsdHMnLCAoZXZ0OiBSZXN1bHRzKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZXN1bHRzLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlc3VsdC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdyZXN1bHQnLCAoZXZ0OiB7IHJlc3VsdDogUmVzdWx0IH0pID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlc3VsdC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5lcnJvci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdlcnJvcicsIChldnQ6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZXJyb3IuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdsb2FkaW5nJywgKGV2dDogeyBxdWVyeTogc3RyaW5nIH0pID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY2xlYXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignY2xlYXInLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jbGVhci5lbWl0KCkpKTtcbiAgICB9XG5cbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9sb2NhdGVDb250cm9sLCBGaXRCb3VuZHNPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsR2VvbG9jYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uT3B0aW9ucz86IFBvc2l0aW9uT3B0aW9ucztcbiAgQElucHV0KCkgZml0Qm91bmRzT3B0aW9ucz86IEZpdEJvdW5kc09wdGlvbnM7XG4gIEBJbnB1dCgpIHRyYWNrVXNlckxvY2F0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd1VzZXJMb2NhdGlvbj86IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgcG9zaXRpb25PcHRpb25zOiB0aGlzLnBvc2l0aW9uT3B0aW9ucyxcbiAgICAgICAgZml0Qm91bmRzT3B0aW9uczogdGhpcy5maXRCb3VuZHNPcHRpb25zLFxuICAgICAgICB0cmFja1VzZXJMb2NhdGlvbjogdGhpcy50cmFja1VzZXJMb2NhdGlvbixcbiAgICAgICAgc2hvd1VzZXJMb2NhdGlvbjogdGhpcy5zaG93VXNlckxvY2F0aW9uXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIHR5cGVvZiBvcHRpb25zPmtleTtcbiAgICAgICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgR2VvbG9jYXRlQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLCB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCwgSG9zdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xOYXZpZ2F0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IE5hdmlnYXRpb25Db250cm9sKCk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjYWxlQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbFNjYWxlXSdcbn0pXG5leHBvcnQgY2xhc3MgU2NhbGVDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSB1bml0PzogJ2ltcGVyaWFsJyB8ICdtZXRyaWMnIHwgJ25hdXRpY2FsJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMudW5pdCAmJiAhY2hhbmdlcy51bml0LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgKDxhbnk+dGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpLnNldFVuaXQoY2hhbmdlcy51bml0LmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uczogeyBtYXhXaWR0aD86IG51bWJlciwgdW5pdD86IHN0cmluZyB9ID0ge307XG4gICAgICBpZiAodGhpcy5tYXhXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMubWF4V2lkdGggPSB0aGlzLm1heFdpZHRoO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudW5pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMudW5pdCA9IHRoaXMudW5pdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IFNjYWxlQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLCB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBPbkluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMbmdMYXRMaWtlLCBNYXJrZXIsIFBvaW50TGlrZSB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlcicsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICAgIC5tYXBib3hnbC1tYXJrZXIge1xuICAgICAgbGluZS1oZWlnaHQ6IDA7XG4gICAgfVxuICBgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgb2Zmc2V0PzogUG9pbnRMaWtlO1xuICBASW5wdXQoKSBhbmNob3I/OiAnY2VudGVyJyB8ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcbiAgQElucHV0KCkgbG5nTGF0PzogTG5nTGF0TGlrZTtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBtYXJrZXJJbnN0YW5jZT86IE1hcmtlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5mZWF0dXJlICYmIHRoaXMubG5nTGF0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZlYXR1cmUgYW5kIGxuZ0xhdCBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmxuZ0xhdCAmJiAhY2hhbmdlcy5sbmdMYXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQodGhpcy5sbmdMYXQhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZmVhdHVyZSAmJiAhY2hhbmdlcy5mZWF0dXJlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSA9IG5ldyBNYXJrZXIoPGFueT57IG9mZnNldDogdGhpcy5vZmZzZXQsIGVsZW1lbnQ6IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LCBhbmNob3I6IHRoaXMuYW5jaG9yIH0pO1xuICAgIHRoaXMubWFya2VySW5zdGFuY2Uuc2V0TG5nTGF0KHRoaXMuZmVhdHVyZSA/IHRoaXMuZmVhdHVyZS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMgOiB0aGlzLmxuZ0xhdCEpO1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZE1hcmtlcih0aGlzLm1hcmtlckluc3RhbmNlISk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlTWFya2VyKHRoaXMubWFya2VySW5zdGFuY2UhKTtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdG9nZ2xlUG9wdXAoKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEudG9nZ2xlUG9wdXAoKTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdChjb29yZGluYXRlcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9KU09OR2VvbWV0cnksIEdlb0pTT05Tb3VyY2UsIEdlb0pTT05Tb3VyY2VPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1nZW9qc29uLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEdlb0pTT05Tb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBkYXRhPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT05HZW9tZXRyeT4gfCBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT05HZW9tZXRyeT4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbnpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heHpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGJ1ZmZlcj86IG51bWJlcjtcbiAgQElucHV0KCkgdG9sZXJhbmNlPzogbnVtYmVyO1xuICBASW5wdXQoKSBjbHVzdGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2x1c3RlclJhZGl1cz86IG51bWJlcjtcbiAgQElucHV0KCkgY2x1c3Rlck1heFpvb20/OiBudW1iZXI7XG5cbiAgdXBkYXRlRmVhdHVyZURhdGEgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBmZWF0dXJlSWRDb3VudGVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICBmZWF0dXJlczogW11cbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICBidWZmZXI6IHRoaXMuYnVmZmVyLFxuICAgICAgICB0b2xlcmFuY2U6IHRoaXMudG9sZXJhbmNlLFxuICAgICAgICBjbHVzdGVyOiB0aGlzLmNsdXN0ZXIsXG4gICAgICAgIGNsdXN0ZXJSYWRpdXM6IHRoaXMuY2x1c3RlclJhZGl1cyxcbiAgICAgICAgY2x1c3Rlck1heFpvb206IHRoaXMuY2x1c3Rlck1heFpvb20sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViID0gdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMClcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5NYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICAgICAgc291cmNlLnNldERhdGEodGhpcy5kYXRhISk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5idWZmZXIgJiYgIWNoYW5nZXMuYnVmZmVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50b2xlcmFuY2UgJiYgIWNoYW5nZXMudG9sZXJhbmNlLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jbHVzdGVyICYmICFjaGFuZ2VzLmNsdXN0ZXIuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNsdXN0ZXJSYWRpdXMgJiYgIWNoYW5nZXMuY2x1c3RlclJhZGl1cy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2x1c3Rlck1heFpvb20gJiYgIWNoYW5nZXMuY2x1c3Rlck1heFpvb20uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuTWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBzb3VyY2Uuc2V0RGF0YSh0aGlzLmRhdGEhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4pIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gPEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4+dGhpcy5kYXRhO1xuICAgIGNvbGxlY3Rpb24uZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQoKTtcbiAgfVxuXG4gIHJlbW92ZUZlYXR1cmUoZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+KSB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IDxHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+PnRoaXMuZGF0YTtcbiAgICBjb25zdCBpbmRleCA9IGNvbGxlY3Rpb24uZmVhdHVyZXMuaW5kZXhPZihmZWF0dXJlKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29sbGVjdGlvbi5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQoKTtcbiAgfVxuXG4gIGdldE5ld0ZlYXR1cmVJZCgpIHtcbiAgICByZXR1cm4gKyt0aGlzLmZlYXR1cmVJZENvdW50ZXI7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtZmVhdHVyZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRmVhdHVyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4ge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZD86IG51bWJlcjsgLy8gRklYTUUgbnVtYmVyIG9ubHkgZm9yIG5vdyBodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC1nbC1qcy9pc3N1ZXMvMjcxNlxuICBASW5wdXQoKSBnZW9tZXRyeTogR2VvSlNPTi5HZW9tZXRyeU9iamVjdDtcbiAgQElucHV0KCkgcHJvcGVydGllczogYW55O1xuICB0eXBlOiAnRmVhdHVyZScgPSAnRmVhdHVyZSc7XG5cbiAgcHJpdmF0ZSBmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEdlb0pTT05Tb3VyY2VDb21wb25lbnQpKSBwcml2YXRlIEdlb0pTT05Tb3VyY2VDb21wb25lbnQ6IEdlb0pTT05Tb3VyY2VDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQuZ2V0TmV3RmVhdHVyZUlkKCk7XG4gICAgfVxuICAgIHRoaXMuZmVhdHVyZSA9IHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmdlb21ldHJ5LFxuICAgICAgcHJvcGVydGllczogdGhpcy5wcm9wZXJ0aWVzID8gdGhpcy5wcm9wZXJ0aWVzIDoge31cbiAgICB9O1xuICAgIHRoaXMuZmVhdHVyZS5pZCA9IHRoaXMuaWQ7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LmFkZEZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5yZW1vdmVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gIH1cblxuICB1cGRhdGVDb29yZGluYXRlcyhjb29yZGluYXRlczogbnVtYmVyW10pIHtcbiAgICAoPEdlb0pTT04uUG9pbnQ+dGhpcy5mZWF0dXJlLmdlb21ldHJ5KS5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcE1vdXNlRXZlbnQgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYXllckNvbXBvbmVudCB9IGZyb20gJy4uL2xheWVyL2xheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4uL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZlYXR1cmVDb21wb25lbnQgfSBmcm9tICcuLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xEcmFnZ2FibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdtZ2xEcmFnZ2FibGUnKSBsYXllcj86IExheWVyQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcblxuICBwcml2YXRlIGRlc3Ryb3llZCQ6IFJlcGxheVN1YmplY3Q8dm9pZD4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBOZ1pvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgRmVhdHVyZUNvbXBvbmVudD86IEZlYXR1cmVDb21wb25lbnQsXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIE1hcmtlckNvbXBvbmVudD86IE1hcmtlckNvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGxldCBlbnRlciQ7XG4gICAgbGV0IGxlYXZlJDtcbiAgICBsZXQgdXBkYXRlQ29vcmRzO1xuICAgIGlmICh0aGlzLk1hcmtlckNvbXBvbmVudCkge1xuICAgICAgbGV0IG1hcmtlckVsZW1lbnQgPSAoPEVsZW1lbnQ+dGhpcy5NYXJrZXJDb21wb25lbnQuY29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIGlmIChtYXJrZXJFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtYXJrZXJFbGVtZW50ID0gbWFya2VyRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIH1cbiAgICAgIGVudGVyJCA9IGZyb21FdmVudChtYXJrZXJFbGVtZW50LCAnbW91c2VlbnRlcicpO1xuICAgICAgbGVhdmUkID0gZnJvbUV2ZW50KG1hcmtlckVsZW1lbnQsICdtb3VzZWxlYXZlJyk7XG4gICAgICB1cGRhdGVDb29yZHMgPSB0aGlzLk1hcmtlckNvbXBvbmVudC51cGRhdGVDb29yZGluYXRlcy5iaW5kKHRoaXMuTWFya2VyQ29tcG9uZW50KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuRmVhdHVyZUNvbXBvbmVudCAmJiB0aGlzLmxheWVyKSB7XG4gICAgICBlbnRlciQgPSB0aGlzLmxheWVyLm1vdXNlRW50ZXI7XG4gICAgICBsZWF2ZSQgPSB0aGlzLmxheWVyLm1vdXNlTGVhdmU7XG4gICAgICB1cGRhdGVDb29yZHMgPSB0aGlzLkZlYXR1cmVDb21wb25lbnQudXBkYXRlQ29vcmRpbmF0ZXMuYmluZCh0aGlzLkZlYXR1cmVDb21wb25lbnQpO1xuICAgICAgaWYgKHRoaXMuRmVhdHVyZUNvbXBvbmVudC5nZW9tZXRyeS50eXBlICE9PSAnUG9pbnQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWdsRHJhZ2dhYmxlIG9ubHkgc3VwcG9ydCBwb2ludCBmZWF0dXJlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWdsRHJhZ2dhYmxlIGNhbiBvbmx5IGJlIHVzZWQgb24gRmVhdHVyZSAod2l0aCBhIGxheWVyIGFzIGlucHV0KSBvciBNYXJrZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZURyYWdnYWJsZShlbnRlciQsIGxlYXZlJCwgdXBkYXRlQ29vcmRzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgdGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZURyYWdnYWJsZShlbnRlciQ6IE9ic2VydmFibGU8YW55PiwgbGVhdmUkOiBPYnNlcnZhYmxlPGFueT4sIHVwZGF0ZUNvb3JkczogKGNvb3JkOiBudW1iZXJbXSkgPT4gdm9pZCkge1xuICAgIGxldCBtb3ZpbmcgPSBmYWxzZTtcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBtb3VzZVVwJCA9IGZyb21FdmVudDxNYXBNb3VzZUV2ZW50Pih0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3VzZXVwJyk7XG4gICAgICBjb25zdCBkcmFnU3RhcnQkID0gZW50ZXIkLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIW1vdmluZyksXG4gICAgICAgIGZpbHRlcigoZXZ0KSA9PiB0aGlzLmZpbHRlckZlYXR1cmUoZXZ0KSksXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgaW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKCdtb3ZlJyk7XG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4oZmFsc2UpO1xuICAgICAgICB9KSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdXNlZG93bicpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwobGVhdmUkKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRyYWdnaW5nJCA9IGRyYWdTdGFydCQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb21FdmVudDxNYXBNb3VzZUV2ZW50Pih0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3VzZW1vdmUnKVxuICAgICAgICAgIC5waXBlKHRha2VVbnRpbChtb3VzZVVwJCkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCBkcmFnRW5kJCA9IGRyYWdTdGFydCQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1vdXNlVXAkLnBpcGUodGFrZSgxKSkpXG4gICAgICApO1xuICAgICAgZHJhZ1N0YXJ0JC5zdWJzY3JpYmUoKGV2dCkgPT4ge1xuICAgICAgICBtb3ZpbmcgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5kcmFnU3RhcnQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuTmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdTdGFydC5lbWl0KGV2dCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRyYWdnaW5nJC5zdWJzY3JpYmUoKGV2dCkgPT4ge1xuICAgICAgICB1cGRhdGVDb29yZHMoW2V2dC5sbmdMYXQubG5nLCBldnQubG5nTGF0LmxhdF0pO1xuICAgICAgICBpZiAodGhpcy5kcmFnLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnLmVtaXQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZHJhZ0VuZCQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgbW92aW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmRyYWdFbmQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuTmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWdFbmQuZW1pdChldnQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWluc2lkZSkgeyAvLyBJdCdzIHBvc3NpYmxlIHRvIGRyYWdFbmQgb3V0c2lkZSB0aGUgdGFyZ2V0IChzbWFsbCBpbnB1dCBsYWcpXG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignJyk7XG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4odHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbGVhdmUkLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpLFxuICAgICAgICB0YXAoKCkgPT4gaW5zaWRlID0gZmFsc2UpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIW1vdmluZylcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignJyk7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZpbHRlckZlYXR1cmUoZXZ0OiBNYXBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuRmVhdHVyZUNvbXBvbmVudCAmJiB0aGlzLmxheWVyKSB7XG4gICAgICBjb25zdCBmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8YW55PiA9IHRoaXMuTWFwU2VydmljZS5xdWVyeVJlbmRlcmVkRmVhdHVyZXMoXG4gICAgICAgIGV2dC5wb2ludCxcbiAgICAgICAge1xuICAgICAgICAgIGxheWVyczogW3RoaXMubGF5ZXIuaWRdLFxuICAgICAgICAgIGZpbHRlcjogW1xuICAgICAgICAgICAgJ2FsbCcsXG4gICAgICAgICAgICBbJz09JywgJyR0eXBlJywgJ1BvaW50J10sXG4gICAgICAgICAgICBbJz09JywgJyRpZCcsIHRoaXMuRmVhdHVyZUNvbXBvbmVudC5pZF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIClbMF07XG4gICAgICBpZiAoIWZlYXR1cmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcEltYWdlRGF0YSwgTWFwSW1hZ2VPcHRpb25zIH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1pbWFnZScsXG4gIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIGRhdGE/OiBNYXBJbWFnZURhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbnM/OiBNYXBJbWFnZU9wdGlvbnM7XG4gIEBJbnB1dCgpIHVybD86IHN0cmluZztcblxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHsgc3RhdHVzOiBudW1iZXIgfT4oKTtcbiAgQE91dHB1dCgpIGxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIGltYWdlQWRkZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGF0YSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkSW1hZ2UoXG4gICAgICAgICAgdGhpcy5pZCxcbiAgICAgICAgICB0aGlzLmRhdGEsXG4gICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW1hZ2VBZGRlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudXJsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5NYXBTZXJ2aWNlLmxvYWRBbmRBZGRJbWFnZShcbiAgICAgICAgICAgIHRoaXMuaWQsXG4gICAgICAgICAgICB0aGlzLnVybCxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5pbWFnZUFkZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkLmVtaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IuZW1pdChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMub3B0aW9ucyAmJiAhY2hhbmdlcy5vcHRpb25zLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy51cmwgJiYgIWNoYW5nZXMudXJsLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmltYWdlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVJbWFnZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFja2dyb3VuZExheW91dCxcbiAgQmFja2dyb3VuZFBhaW50LFxuICBDaXJjbGVMYXlvdXQsXG4gIENpcmNsZVBhaW50LFxuICBGaWxsRXh0cnVzaW9uTGF5b3V0LFxuICBGaWxsRXh0cnVzaW9uUGFpbnQsXG4gIEZpbGxMYXlvdXQsXG4gIEZpbGxQYWludCxcbiAgR2VvSlNPTlNvdXJjZSxcbiAgR2VvSlNPTlNvdXJjZVJhdyxcbiAgSW1hZ2VTb3VyY2UsXG4gIExheWVyLFxuICBMaW5lTGF5b3V0LFxuICBMaW5lUGFpbnQsXG4gIE1hcE1vdXNlRXZlbnQsXG4gIFJhc3RlckxheW91dCxcbiAgUmFzdGVyUGFpbnQsXG4gIFJhc3RlclNvdXJjZSxcbiAgU3ltYm9sTGF5b3V0LFxuICBTeW1ib2xQYWludCxcbiAgVmVjdG9yU291cmNlLFxuICBWaWRlb1NvdXJjZVxufSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1sYXllcicsXG4gIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBMYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIExheWVyIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgc291cmNlPzogc3RyaW5nIHwgVmVjdG9yU291cmNlIHwgUmFzdGVyU291cmNlIHwgR2VvSlNPTlNvdXJjZSB8IEltYWdlU291cmNlIHwgVmlkZW9Tb3VyY2UgfCBHZW9KU09OU291cmNlUmF3O1xuICBASW5wdXQoKSB0eXBlOiAnc3ltYm9sJyB8ICdmaWxsJyB8ICdsaW5lJyB8ICdjaXJjbGUnIHwgJ2ZpbGwtZXh0cnVzaW9uJyB8ICdyYXN0ZXInIHwgJ2JhY2tncm91bmQnO1xuICBASW5wdXQoKSBtZXRhZGF0YT86IGFueTtcbiAgQElucHV0KCkgc291cmNlTGF5ZXI/OiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgZmlsdGVyPzogYW55W107XG4gIEBJbnB1dCgpIGxheW91dD86IEJhY2tncm91bmRMYXlvdXQgfCBGaWxsTGF5b3V0IHwgRmlsbEV4dHJ1c2lvbkxheW91dCB8IExpbmVMYXlvdXQgfCBTeW1ib2xMYXlvdXQgfCBSYXN0ZXJMYXlvdXQgfCBDaXJjbGVMYXlvdXQ7XG4gIEBJbnB1dCgpIHBhaW50PzogQmFja2dyb3VuZFBhaW50IHwgRmlsbFBhaW50IHwgRmlsbEV4dHJ1c2lvblBhaW50IHwgTGluZVBhaW50IHwgU3ltYm9sUGFpbnQgfCBSYXN0ZXJQYWludCB8IENpcmNsZVBhaW50O1xuICBASW5wdXQoKSBiZWZvcmU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbnpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heHpvb20/OiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBsYXllckFkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRMYXllcih7XG4gICAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgIG1ldGFkYXRhOiB0aGlzLm1ldGFkYXRhLFxuICAgICAgICAgICdzb3VyY2UtbGF5ZXInOiB0aGlzLnNvdXJjZUxheWVyLFxuICAgICAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0LFxuICAgICAgICAgIHBhaW50OiB0aGlzLnBhaW50XG4gICAgICAgIH0sXG4gICAgICAgIGxheWVyRXZlbnRzOiB7XG4gICAgICAgICAgY2xpY2s6IHRoaXMuY2xpY2ssXG4gICAgICAgICAgbW91c2VFbnRlcjogdGhpcy5tb3VzZUVudGVyLFxuICAgICAgICAgIG1vdXNlTGVhdmU6IHRoaXMubW91c2VMZWF2ZSxcbiAgICAgICAgICBtb3VzZU1vdmU6IHRoaXMubW91c2VNb3ZlXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMuYmVmb3JlKTtcbiAgICAgIHRoaXMubGF5ZXJBZGRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmxheWVyQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMucGFpbnQgJiYgIWNoYW5nZXMucGFpbnQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0QWxsTGF5ZXJQYWludFByb3BlcnR5KHRoaXMuaWQsIGNoYW5nZXMucGFpbnQuY3VycmVudFZhbHVlISk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmxheW91dCAmJiAhY2hhbmdlcy5sYXlvdXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0QWxsTGF5ZXJMYXlvdXRQcm9wZXJ0eSh0aGlzLmlkLCBjaGFuZ2VzLmxheW91dC5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZmlsdGVyICYmICFjaGFuZ2VzLmZpbHRlci5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllckZpbHRlcih0aGlzLmlkLCBjaGFuZ2VzLmZpbHRlci5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuYmVmb3JlICYmICFjaGFuZ2VzLmJlZm9yZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllckJlZm9yZSh0aGlzLmlkLCBjaGFuZ2VzLmJlZm9yZS5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllclpvb21SYW5nZSh0aGlzLmlkLCB0aGlzLm1pbnpvb20sIHRoaXMubWF4em9vbSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZUxheWVyKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQW5pbWF0aW9uT3B0aW9ucyxcbiAgRXZlbnREYXRhLFxuICBMbmdMYXRCb3VuZHNMaWtlLFxuICBMbmdMYXRMaWtlLFxuICBNYXAsXG4gIE1hcEJveFpvb21FdmVudCxcbiAgTWFwTW91c2VFdmVudCxcbiAgTWFwVG91Y2hFdmVudCxcbiAgUGFkZGluZ09wdGlvbnMsXG4gIFBvaW50TGlrZSxcbiAgU3R5bGVcbiAgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSwgTW92aW5nT3B0aW9ucyB9IGZyb20gJy4vbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwRXZlbnQgfSBmcm9tICcuL21hcC50eXBlcyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIG5hbWVzcGFjZSBtYXBib3hnbCB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBNYXBib3hPcHRpb25zIHtcbiAgICAgIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ/OiBib29sZWFuO1xuICAgICAgdHJhbnNmb3JtUmVxdWVzdD86IEZ1bmN0aW9uO1xuICAgICAgbG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5Pzogc3RyaW5nO1xuICAgICAgcGl0Y2hXaXRoUm90YXRlPzogYm9vbGVhbjtcbiAgICB9XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcCcsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGFpbmVyPjwvZGl2PicsXG4gIHN0eWxlczogW2BcbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIGRpdiB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIGBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBNYXBTZXJ2aWNlXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBNYXBFdmVudCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBASW5wdXQoKSBjdXN0b21NYXBib3hBcGlVcmw/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhhc2g/OiBib29sZWFuO1xuICBASW5wdXQoKSByZWZyZXNoRXhwaXJlZFRpbGVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsYXNzZXM/OiBzdHJpbmdbXTtcbiAgQElucHV0KCkgYmVhcmluZ1NuYXA/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGludGVyYWN0aXZlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcGl0Y2hXaXRoUm90YXRlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXR0cmlidXRpb25Db250cm9sPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbG9nb1Bvc2l0aW9uPzogJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuICBASW5wdXQoKSBtYXhUaWxlQ2FjaGVTaXplPzogbnVtYmVyO1xuICBASW5wdXQoKSBsb2NhbElkZW9ncmFwaEZvbnRGYW1pbHk/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByZXNlcnZlRHJhd2luZ0J1ZmZlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlcldvcmxkQ29waWVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdHJhY2tSZXNpemU/OiBib29sZWFuO1xuICBASW5wdXQoKSB0cmFuc2Zvcm1SZXF1ZXN0PzogRnVuY3Rpb247XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgbWluWm9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4Wm9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgc2Nyb2xsWm9vbT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRyYWdSb3RhdGU/OiBib29sZWFuO1xuICBASW5wdXQoKSB0b3VjaFpvb21Sb3RhdGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBkb3VibGVDbGlja1pvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBrZXlib2FyZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRyYWdQYW4/OiBib29sZWFuO1xuICBASW5wdXQoKSBib3hab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc3R5bGU6IFN0eWxlIHwgc3RyaW5nO1xuICBASW5wdXQoKSBjZW50ZXI/OiBMbmdMYXRMaWtlO1xuICBASW5wdXQoKSBtYXhCb3VuZHM/OiBMbmdMYXRCb3VuZHNMaWtlO1xuICBASW5wdXQoKSB6b29tPzogW251bWJlcl07XG4gIEBJbnB1dCgpIGJlYXJpbmc/OiBbbnVtYmVyXTtcbiAgQElucHV0KCkgcGl0Y2g/OiBbbnVtYmVyXTtcblxuICAvKiBBZGRlZCBieSBuZ3gtbWFwYm94LWdsICovXG4gIEBJbnB1dCgpIG1vdmluZ01ldGhvZDogJ2p1bXBUbycgfCAnZWFzZVRvJyB8ICdmbHlUbycgPSAnZmx5VG8nO1xuICBASW5wdXQoKSBtb3ZpbmdPcHRpb25zPzogTW92aW5nT3B0aW9ucztcbiAgQElucHV0KCkgZml0Qm91bmRzPzogTG5nTGF0Qm91bmRzTGlrZTtcbiAgQElucHV0KCkgZml0Qm91bmRzT3B0aW9ucz86IHtcbiAgICBsaW5lYXI/OiBib29sZWFuLFxuICAgIGVhc2luZz86IEZ1bmN0aW9uLFxuICAgIHBhZGRpbmc/OiBudW1iZXIgfCBQYWRkaW5nT3B0aW9ucyxcbiAgICBvZmZzZXQ/OiBQb2ludExpa2UsXG4gICAgbWF4Wm9vbT86IG51bWJlclxuICB9O1xuICBASW5wdXQoKSBjZW50ZXJXaXRoUGFuVG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBwYW5Ub09wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zO1xuICBASW5wdXQoKSBjdXJzb3JTdHlsZT86IHN0cmluZztcblxuICBAT3V0cHV0KCkgcmVzaXplID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgbW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgY29udGV4dE1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgdG91Y2hFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaE1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHdoZWVsID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIFRPRE8gTWFwV2hlZWxFdmVudFxuICBAT3V0cHV0KCkgbW92ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7IC8vIFRPRE8gQ2hlY2sgdHlwZVxuICBAT3V0cHV0KCkgbW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3ZlRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xuICBAT3V0cHV0KCkgem9vbVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHpvb21FdnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgem9vbUVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGVTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcm90YXRlRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHBpdGNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHBpdGNoRXZ0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBwaXRjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgYm94Wm9vbVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBCb3hab29tRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRMb3N0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgd2ViR2xDb250ZXh0UmVzdG9yZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSByZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpOyAvLyBUT0RPIENoZWNrIHR5cGVcbiAgQE91dHB1dCgpIGRhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHN0eWxlRGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgZGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHN0eWxlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHNvdXJjZURhdGFMb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG5cbiAgZ2V0IG1hcEluc3RhbmNlKCk6IE1hcCB7XG4gICAgcmV0dXJuIHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIG1hcENvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLnNldHVwKHtcbiAgICAgIGFjY2Vzc1Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLFxuICAgICAgY3VzdG9tTWFwYm94QXBpVXJsOiB0aGlzLmN1c3RvbU1hcGJveEFwaVVybCxcbiAgICAgIG1hcE9wdGlvbnM6IHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLm1hcENvbnRhaW5lci5uYXRpdmVFbGVtZW50LFxuICAgICAgICBtaW5ab29tOiB0aGlzLm1pblpvb20sXG4gICAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICAgIGhhc2g6IHRoaXMuaGFzaCxcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRoaXMuaW50ZXJhY3RpdmUsXG4gICAgICAgIGJlYXJpbmdTbmFwOiB0aGlzLmJlYXJpbmdTbmFwLFxuICAgICAgICBwaXRjaFdpdGhSb3RhdGU6IHRoaXMucGl0Y2hXaXRoUm90YXRlLFxuICAgICAgICBjbGFzc2VzOiB0aGlzLmNsYXNzZXMsXG4gICAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogdGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wsXG4gICAgICAgIGxvZ29Qb3NpdGlvbjogdGhpcy5sb2dvUG9zaXRpb24sXG4gICAgICAgIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ6IHRoaXMuZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdCxcbiAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0aGlzLnByZXNlcnZlRHJhd2luZ0J1ZmZlcixcbiAgICAgICAgcmVmcmVzaEV4cGlyZWRUaWxlczogdGhpcy5yZWZyZXNoRXhwaXJlZFRpbGVzLFxuICAgICAgICBtYXhCb3VuZHM6IHRoaXMubWF4Qm91bmRzLFxuICAgICAgICBzY3JvbGxab29tOiB0aGlzLnNjcm9sbFpvb20sXG4gICAgICAgIGJveFpvb206IHRoaXMuYm94Wm9vbSxcbiAgICAgICAgZHJhZ1JvdGF0ZTogdGhpcy5kcmFnUm90YXRlLFxuICAgICAgICBkcmFnUGFuOiB0aGlzLmRyYWdQYW4sXG4gICAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkLFxuICAgICAgICBkb3VibGVDbGlja1pvb206IHRoaXMuZG91YmxlQ2xpY2tab29tLFxuICAgICAgICB0b3VjaFpvb21Sb3RhdGU6IHRoaXMudG91Y2hab29tUm90YXRlLFxuICAgICAgICB0cmFja1Jlc2l6ZTogdGhpcy50cmFja1Jlc2l6ZSxcbiAgICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcbiAgICAgICAgem9vbTogdGhpcy56b29tLFxuICAgICAgICBiZWFyaW5nOiB0aGlzLmJlYXJpbmcsXG4gICAgICAgIHBpdGNoOiB0aGlzLnBpdGNoLFxuICAgICAgICByZW5kZXJXb3JsZENvcGllczogdGhpcy5yZW5kZXJXb3JsZENvcGllcyxcbiAgICAgICAgbWF4VGlsZUNhY2hlU2l6ZTogdGhpcy5tYXhUaWxlQ2FjaGVTaXplLFxuICAgICAgICBsb2NhbElkZW9ncmFwaEZvbnRGYW1pbHk6IHRoaXMubG9jYWxJZGVvZ3JhcGhGb250RmFtaWx5LFxuICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiB0aGlzLnRyYW5zZm9ybVJlcXVlc3RcbiAgICAgIH0sXG4gICAgICBtYXBFdmVudHM6IHRoaXNcbiAgICB9KTtcbiAgICBpZiAodGhpcy5jdXJzb3JTdHlsZSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcih0aGlzLmN1cnNvclN0eWxlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuZGVzdHJveU1hcCgpO1xuICB9XG5cbiAgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGF3YWl0IHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC50b1Byb21pc2UoKTtcbiAgICBpZiAoY2hhbmdlcy5jdXJzb3JTdHlsZSAmJiAhY2hhbmdlcy5jdXJzb3JTdHlsZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoY2hhbmdlcy5jdXJzb3JTdHlsZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5taW5ab29tICYmICFjaGFuZ2VzLm1pblpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlTWluWm9vbShjaGFuZ2VzLm1pblpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubWF4Wm9vbSAmJiAhY2hhbmdlcy5tYXhab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZU1heFpvb20oY2hhbmdlcy5tYXhab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnNjcm9sbFpvb20gJiYgIWNoYW5nZXMuc2Nyb2xsWm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVTY3JvbGxab29tKGNoYW5nZXMuc2Nyb2xsWm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kcmFnUm90YXRlICYmICFjaGFuZ2VzLmRyYWdSb3RhdGUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1JvdGF0ZShjaGFuZ2VzLmRyYWdSb3RhdGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMudG91Y2hab29tUm90YXRlICYmICFjaGFuZ2VzLnRvdWNoWm9vbVJvdGF0ZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVUb3VjaFpvb21Sb3RhdGUoY2hhbmdlcy50b3VjaFpvb21Sb3RhdGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZG91YmxlQ2xpY2tab29tICYmICFjaGFuZ2VzLmRvdWJsZUNsaWNrWm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEb3VibGVDbGlja1pvb20oY2hhbmdlcy5kb3VibGVDbGlja1pvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMua2V5Ym9hcmQgJiYgIWNoYW5nZXMua2V5Ym9hcmQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlS2V5Ym9hcmQoY2hhbmdlcy5rZXlib2FyZC5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kcmFnUGFuICYmICFjaGFuZ2VzLmRyYWdQYW4uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1BhbihjaGFuZ2VzLmRyYWdQYW4uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuYm94Wm9vbSAmJiAhY2hhbmdlcy5ib3hab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZUJveFpvb20oY2hhbmdlcy5ib3hab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnN0eWxlICYmICFjaGFuZ2VzLnN0eWxlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZVN0eWxlKGNoYW5nZXMuc3R5bGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubWF4Qm91bmRzICYmICFjaGFuZ2VzLm1heEJvdW5kcy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVNYXhCb3VuZHMoY2hhbmdlcy5tYXhCb3VuZHMuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZml0Qm91bmRzICYmICFjaGFuZ2VzLmZpdEJvdW5kcy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5maXRCb3VuZHMoY2hhbmdlcy5maXRCb3VuZHMuY3VycmVudFZhbHVlLCB0aGlzLmZpdEJvdW5kc09wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLmNlbnRlcldpdGhQYW5UbyAmJlxuICAgICAgY2hhbmdlcy5jZW50ZXIgJiYgIWNoYW5nZXMuY2VudGVyLmlzRmlyc3RDaGFuZ2UoKSAmJlxuICAgICAgIWNoYW5nZXMuem9vbSAmJiAhY2hhbmdlcy5iZWFyaW5nICYmICFjaGFuZ2VzLnBpdGNoXG4gICAgKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucGFuVG8odGhpcy5jZW50ZXIhLCB0aGlzLnBhblRvT3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGNoYW5nZXMuY2VudGVyICYmICFjaGFuZ2VzLmNlbnRlci5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuem9vbSAmJiAhY2hhbmdlcy56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5iZWFyaW5nICYmICFjaGFuZ2VzLmJlYXJpbmcuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnBpdGNoICYmICFjaGFuZ2VzLnBpdGNoLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLm1vdmUoXG4gICAgICAgIHRoaXMubW92aW5nTWV0aG9kLFxuICAgICAgICB0aGlzLm1vdmluZ09wdGlvbnMsXG4gICAgICAgIGNoYW5nZXMuem9vbSAmJiB0aGlzLnpvb20gPyB0aGlzLnpvb21bMF0gOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXMuY2VudGVyID8gdGhpcy5jZW50ZXIgOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXMuYmVhcmluZyAmJiB0aGlzLmJlYXJpbmcgPyB0aGlzLmJlYXJpbmdbMF0gOiB1bmRlZmluZWQsXG4gICAgICAgIGNoYW5nZXMucGl0Y2ggJiYgdGhpcy5waXRjaCA/IHRoaXMucGl0Y2hbMF0gOiB1bmRlZmluZWRcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHN1cGVyY2x1c3RlciwgeyBDbHVzdGVyLCBPcHRpb25zIGFzIFN1cGVyY2x1c3Rlck9wdGlvbnMsIFN1cGVyY2x1c3RlciB9IGZyb20gJ3N1cGVyY2x1c3Rlcic7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbWdsUG9pbnRdJyB9KVxuZXhwb3J0IGNsYXNzIFBvaW50RGlyZWN0aXZlIHsgfVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttZ2xDbHVzdGVyUG9pbnRdJyB9KVxuZXhwb3J0IGNsYXNzIENsdXN0ZXJQb2ludERpcmVjdGl2ZSB7IH1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlci1jbHVzdGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmZWF0dXJlIG9mIGNsdXN0ZXJQb2ludHNcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3RlcjsgZWxzZSBwb2ludFwiPlxuICAgICAgICA8bWdsLW1hcmtlclxuICAgICAgICAgIFtmZWF0dXJlXT1cImZlYXR1cmVcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNsdXN0ZXJQb2ludFRwbDsgY29udGV4dDoge1xuICAgICAgICAgICAgJGltcGxpY2l0OiBmZWF0dXJlLFxuICAgICAgICAgICAgZ2V0TGVhdmVzRm46IGdldExlYXZlc0ZuKGZlYXR1cmUpLFxuICAgICAgICAgICAgZ2V0Q2hpbGRyZW5GbjogZ2V0Q2hpbGRyZW5GbihmZWF0dXJlKSxcbiAgICAgICAgICAgIGdldENsdXN0ZXJFeHBhbnNpb25ab29tRm46IGdldENsdXN0ZXJFeHBhbnNpb25ab29tRm4oZmVhdHVyZSlcbiAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWdsLW1hcmtlcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLXRlbXBsYXRlICNwb2ludD5cbiAgICAgICAgPG1nbC1tYXJrZXJcbiAgICAgICAgICBbZmVhdHVyZV09XCJmZWF0dXJlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwb2ludFRwbDsgY29udGV4dDogeyAkaW1wbGljaXQ6IGZlYXR1cmUgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21nbC1tYXJrZXI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ2x1c3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBPbkluaXQge1xuICAvKiBJbml0IGlucHV0ICovXG4gIEBJbnB1dCgpIHJhZGl1cz86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4Wm9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWluWm9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgZXh0ZW50PzogbnVtYmVyO1xuICBASW5wdXQoKSBub2RlU2l6ZT86IG51bWJlcjtcbiAgQElucHV0KCkgbG9nPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVkdWNlPzogKGFjY3VtdWxhdGVkOiBhbnksIHByb3BzOiBhbnkpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIGluaXRpYWw/OiAoKSA9PiBhbnk7XG4gIEBJbnB1dCgpIG1hcD86IChwcm9wczogYW55KSA9PiBhbnk7XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBASW5wdXQoKSBkYXRhOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uUG9pbnQ+O1xuXG4gIEBPdXRwdXQoKSBsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxTdXBlcmNsdXN0ZXI+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChQb2ludERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KSBwb2ludFRwbDogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChDbHVzdGVyUG9pbnREaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgY2x1c3RlclBvaW50VHBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNsdXN0ZXJQb2ludHM6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PltdO1xuXG4gIHByaXZhdGUgc3VwZXJjbHVzdGVyOiBTdXBlcmNsdXN0ZXI7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIENoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IG9wdGlvbnM6IFN1cGVyY2x1c3Rlck9wdGlvbnMgPSB7XG4gICAgICByYWRpdXM6IHRoaXMucmFkaXVzLFxuICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgbWluWm9vbTogdGhpcy5taW5ab29tLFxuICAgICAgZXh0ZW50OiB0aGlzLmV4dGVudCxcbiAgICAgIG5vZGVTaXplOiB0aGlzLm5vZGVTaXplLFxuICAgICAgbG9nOiB0aGlzLmxvZyxcbiAgICAgIHJlZHVjZTogdGhpcy5yZWR1Y2UsXG4gICAgICBpbml0aWFsOiB0aGlzLmluaXRpYWwsXG4gICAgICBtYXA6IHRoaXMubWFwXG4gICAgfTtcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgU3VwZXJjbHVzdGVyT3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5zdXBlcmNsdXN0ZXIgPSBzdXBlcmNsdXN0ZXIob3B0aW9ucyk7XG4gICAgdGhpcy5zdXBlcmNsdXN0ZXIubG9hZCh0aGlzLmRhdGEuZmVhdHVyZXMpO1xuICAgIHRoaXMubG9hZC5lbWl0KHRoaXMuc3VwZXJjbHVzdGVyKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnN1cGVyY2x1c3Rlci5sb2FkKHRoaXMuZGF0YS5mZWF0dXJlcyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgbWFwTW92ZSQgPSBtZXJnZShcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3pvb21DaGFuZ2UnKSxcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdmUnKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHN1YiA9IG1hcE1vdmUkLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aDxhbnk+KHVuZGVmaW5lZClcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVDbHVzdGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBnZXRMZWF2ZXNGbiA9IChmZWF0dXJlOiBDbHVzdGVyKSA9PiB7XG4gICAgcmV0dXJuIChsaW1pdD86IG51bWJlciwgb2Zmc2V0PzogbnVtYmVyKSA9PiAoPGFueT50aGlzLnN1cGVyY2x1c3Rlci5nZXRMZWF2ZXMpKGZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyX2lkISwgbGltaXQsIG9mZnNldCk7XG4gIH1cblxuICBnZXRDaGlsZHJlbkZuID0gKGZlYXR1cmU6IENsdXN0ZXIpID0+IHtcbiAgICByZXR1cm4gKCkgPT4gKDxhbnk+dGhpcy5zdXBlcmNsdXN0ZXIuZ2V0Q2hpbGRyZW4pKGZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyX2lkISk7XG4gIH1cblxuICBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbUZuID0gKGZlYXR1cmU6IENsdXN0ZXIpID0+IHtcbiAgICByZXR1cm4gKCkgPT4gKDxhbnk+dGhpcy5zdXBlcmNsdXN0ZXIuZ2V0Q2x1c3RlckV4cGFuc2lvblpvb20pKGZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyX2lkISk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNsdXN0ZXIoKSB7XG4gICAgY29uc3QgYmJveCA9IHRoaXMuTWFwU2VydmljZS5nZXRDdXJyZW50Vmlld3BvcnRCYm94KCk7XG4gICAgY29uc3QgY3VycmVudFpvb20gPSBNYXRoLnJvdW5kKHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRab29tKCkpO1xuICAgIHRoaXMuY2x1c3RlclBvaW50cyA9IHRoaXMuc3VwZXJjbHVzdGVyLmdldENsdXN0ZXJzKGJib3gsIGN1cnJlbnRab29tKTtcbiAgICB0aGlzLkNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvaW50TGlrZSwgUG9wdXAsIExuZ0xhdExpa2UgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1wb3B1cCcsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSBjbG9zZUJ1dHRvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsb3NlT25DbGljaz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuY2hvcj86ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JztcbiAgQElucHV0KCkgb2Zmc2V0PzogbnVtYmVyIHwgUG9pbnRMaWtlIHwgeyBbYW5jaG9yOiBzdHJpbmddOiBbbnVtYmVyLCBudW1iZXJdIH07XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBASW5wdXQoKSBsbmdMYXQ/OiBMbmdMYXRMaWtlO1xuICBASW5wdXQoKSBtYXJrZXI/OiBNYXJrZXJDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBwb3B1cEluc3RhbmNlPzogUG9wdXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubG5nTGF0ICYmIHRoaXMubWFya2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hcmtlciBhbmQgbG5nTGF0IGlucHV0IGFyZSBtdXR1YWxseSBleGNsdXNpdmUnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMubG5nTGF0ICYmICFjaGFuZ2VzLmxuZ0xhdC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlISk7XG4gICAgICBjb25zdCBwb3B1cEluc3RhbmNlVG1wID0gdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXAocG9wdXBJbnN0YW5jZVRtcCwgY2hhbmdlcy5sbmdMYXQuY3VycmVudFZhbHVlKTtcbiAgICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHBvcHVwSW5zdGFuY2VUbXA7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1hcmtlciAmJiAhY2hhbmdlcy5tYXJrZXIuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjb25zdCBwcmV2aW91c01hcmtlcjogTWFya2VyQ29tcG9uZW50ID0gY2hhbmdlcy5tYXJrZXIucHJldmlvdXNWYWx1ZTtcbiAgICAgIGlmIChwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFya2VyKHByZXZpb3VzTWFya2VyLm1hcmtlckluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSAmJiB0aGlzLnBvcHVwSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UsIHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICB0aGlzLmFkZFBvcHVwKHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5wb3B1cEluc3RhbmNlKSB7XG4gICAgICBpZiAodGhpcy5sbmdMYXQpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3B1cEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQb3B1cCgpIHtcbiAgICByZXR1cm4gdGhpcy5NYXBTZXJ2aWNlLmNyZWF0ZVBvcHVwKHtcbiAgICAgIHBvcHVwT3B0aW9uczoge1xuICAgICAgICBjbG9zZUJ1dHRvbjogdGhpcy5jbG9zZUJ1dHRvbixcbiAgICAgICAgY2xvc2VPbkNsaWNrOiB0aGlzLmNsb3NlT25DbGljayxcbiAgICAgICAgYW5jaG9yOiB0aGlzLmFuY2hvcixcbiAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxuICAgICAgfSxcbiAgICAgIHBvcHVwRXZlbnRzOiB7XG4gICAgICAgIG9wZW46IHRoaXMub3BlbixcbiAgICAgICAgY2xvc2U6IHRoaXMuY2xvc2VcbiAgICAgIH1cbiAgICB9LCB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGFkZFBvcHVwKHBvcHVwOiBQb3B1cCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubG5nTGF0KSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKHBvcHVwLCB0aGlzLmxuZ0xhdCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlLCBwb3B1cCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbC1wb3B1cCBuZWVkIGVpdGhlciBsbmdMYXQgb3IgbWFya2VyIHRvIGJlIHNldCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FudmFzU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWNhbnZhcy1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhbnZhc1NvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIENhbnZhc1NvdXJjZU9wdGlvbnMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIGNvb3JkaW5hdGVzOiBudW1iZXJbXVtdO1xuICBASW5wdXQoKSBjYW52YXM6IHN0cmluZztcbiAgQElucHV0KCkgYW5pbWF0ZT86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB7XG4gICAgICAgIHR5cGU6ICdjYW52YXMnLFxuICAgICAgICBjb29yZGluYXRlczogdGhpcy5jb29yZGluYXRlcyxcbiAgICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcbiAgICAgICAgYW5pbWF0ZTogdGhpcy5hbmltYXRlLFxuICAgICAgfTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwgc291cmNlKTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmNvb3JkaW5hdGVzICYmICFjaGFuZ2VzLmNvb3JkaW5hdGVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jYW52YXMgJiYgIWNoYW5nZXMuY2FudmFzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5hbmltYXRlICYmICFjaGFuZ2VzLmFuaW1hdGUuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2VPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtaW1hZ2Utc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZVNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEltYWdlU291cmNlT3B0aW9ucyB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvb3JkaW5hdGVzOiBudW1iZXJbXVtdO1xuXG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCB7XG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgIGNvb3JkaW5hdGVzOiB0aGlzLmNvb3JkaW5hdGVzXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNvb3JkaW5hdGVzICYmICFjaGFuZ2VzLmNvb3JkaW5hdGVzLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJhc3RlclNvdXJjZSB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXJhc3Rlci1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFJhc3RlclNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFJhc3RlclNvdXJjZSB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpbGVzPzogc3RyaW5nW107XG4gIEBJbnB1dCgpIGJvdW5kcz86IG51bWJlcltdO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSB0aWxlU2l6ZT86IG51bWJlcjtcblxuICB0eXBlOiAncmFzdGVyJyA9ICdyYXN0ZXInOyAvLyBKdXN0IHRvIG1ha2UgdHMgaGFwcHlcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHtcbiAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICB0aWxlczogdGhpcy50aWxlcyxcbiAgICAgICAgYm91bmRzOiB0aGlzLmJvdW5kcyxcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICAgIHRpbGVTaXplOiB0aGlzLnRpbGVTaXplXG4gICAgICB9O1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xuICAgICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMudXJsICYmICFjaGFuZ2VzLnVybC5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudGlsZXMgJiYgIWNoYW5nZXMudGlsZXMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmJvdW5kcyAmJiAhY2hhbmdlcy5ib3VuZHMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWF4em9vbSAmJiAhY2hhbmdlcy5tYXh6b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50aWxlU2l6ZSAmJiAhY2hhbmdlcy50aWxlU2l6ZS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZWN0b3JTb3VyY2UgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC12ZWN0b3Itc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBWZWN0b3JTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBWZWN0b3JTb3VyY2Uge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybD86IHN0cmluZztcbiAgQElucHV0KCkgdGlsZXM/OiBzdHJpbmdbXTtcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcblxuICB0eXBlOiAndmVjdG9yJyA9ICd2ZWN0b3InOyAvLyBKdXN0IHRvIG1ha2UgdHMgaGFwcHlcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgIHRpbGVzOiB0aGlzLnRpbGVzLFxuICAgICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20sXG4gICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMudXJsICYmICFjaGFuZ2VzLnVybC5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudGlsZXMgJiYgIWNoYW5nZXMudGlsZXMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWF4em9vbSAmJiAhY2hhbmdlcy5tYXh6b29tLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlU291cmNlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZGVvU291cmNlT3B0aW9ucyB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXZpZGVvLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVmlkZW9Tb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBWaWRlb1NvdXJjZU9wdGlvbnMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybHM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBjb29yZGluYXRlczogbnVtYmVyW11bXTtcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgICB1cmxzOiB0aGlzLnVybHMsXG4gICAgICAgIGNvb3JkaW5hdGVzOiB0aGlzLmNvb3JkaW5hdGVzXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybHMgJiYgIWNoYW5nZXMudXJscy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY29vcmRpbmF0ZXMgJiYgIWNoYW5nZXMuY29vcmRpbmF0ZXMuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9hdHRyaWJ1dGlvbi1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2Z1bGxzY3JlZW4tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLCBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSB9IGZyb20gJy4vY29udHJvbC9nZW9jb2Rlci1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2dlb2xvY2F0ZS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9uYXZpZ2F0aW9uLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjYWxlQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9zY2FsZS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZS9pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuL2xheWVyL2xheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBDb21wb25lbnQgfSBmcm9tICcuL21hcC9tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IE1BUEJPWF9BUElfS0VZIH0gZnJvbSAnLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2x1c3RlclBvaW50RGlyZWN0aXZlLCBNYXJrZXJDbHVzdGVyQ29tcG9uZW50LCBQb2ludERpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2VyLWNsdXN0ZXIvbWFya2VyLWNsdXN0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL3BvcHVwL3BvcHVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW52YXNTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9jYW52YXMtc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFJhc3RlclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3Jhc3Rlci1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZlY3RvclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZlY3Rvci1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZGVvU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvdmlkZW8tc291cmNlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJTb3VyY2VDb21wb25lbnQsXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXG4gICAgQ2FudmFzU291cmNlQ29tcG9uZW50LFxuICAgIEZlYXR1cmVDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFBvcHVwQ29tcG9uZW50LFxuICAgIENvbnRyb2xDb21wb25lbnQsXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2VyQ2x1c3RlckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJTb3VyY2VDb21wb25lbnQsXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXG4gICAgQ2FudmFzU291cmNlQ29tcG9uZW50LFxuICAgIEZlYXR1cmVDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFBvcHVwQ29tcG9uZW50LFxuICAgIENvbnRyb2xDb21wb25lbnQsXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2VyQ2x1c3RlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hcGJveEdMTW9kdWxlIHtcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiB7IGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGdlb2NvZGVyQWNjZXNzVG9rZW4/OiBzdHJpbmcgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWFwYm94R0xNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9BUElfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuYWNjZXNzVG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuZ2VvY29kZXJBY2Nlc3NUb2tlbiB8fCBjb25maWcuYWNjZXNzVG9rZW5cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsiSW5qZWN0aW9uVG9rZW4iLCJBc3luY1N1YmplY3QiLCJTdWJzY3JpcHRpb24iLCJmaXJzdCIsIk1hcGJveEdsLlBvcHVwIiwicG9seWdvbiIsIk5nWm9uZSIsIk1hcGJveEdsLk1hcCIsInRzbGliXzEuX192YWx1ZXMiLCJJbmplY3RhYmxlIiwiT3B0aW9uYWwiLCJJbmplY3QiLCJNYXBTZXJ2aWNlIiwiQ29tcG9uZW50IiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJJbnB1dCIsIlZpZXdDaGlsZCIsIkNvbnRyb2xDb21wb25lbnQiLCJBdHRyaWJ1dGlvbkNvbnRyb2wiLCJEaXJlY3RpdmUiLCJIb3N0IiwiRnVsbHNjcmVlbkNvbnRyb2wiLCJFdmVudEVtaXR0ZXIiLCJPdXRwdXQiLCJHZW9sb2NhdGVDb250cm9sIiwiTmF2aWdhdGlvbkNvbnRyb2wiLCJTY2FsZUNvbnRyb2wiLCJNYXJrZXIiLCJWaWV3RW5jYXBzdWxhdGlvbiIsIlN1YmplY3QiLCJkZWJvdW5jZVRpbWUiLCJHZW9KU09OU291cmNlQ29tcG9uZW50IiwiZm9yd2FyZFJlZiIsIkZlYXR1cmVDb21wb25lbnQiLCJNYXJrZXJDb21wb25lbnQiLCJSZXBsYXlTdWJqZWN0IiwiZnJvbUV2ZW50IiwidGFrZVVudGlsIiwiZmlsdGVyIiwidGFwIiwic3dpdGNoTWFwIiwidGFrZSIsIm1lcmdlIiwic3RhcnRXaXRoIiwiYmJveCIsIkNoYW5nZURldGVjdG9yUmVmIiwiQ29udGVudENoaWxkIiwiVGVtcGxhdGVSZWYiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFlTyxJQUFJLFFBQVEsR0FBRztRQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQztZQUMzQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRjtZQUNELE9BQU8sQ0FBQyxDQUFDO1NBQ1osQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENB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QUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUk7d0JBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzdKLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsS0FBSyxDQUFDLENBQUM7d0JBQUMsS0FBSyxDQUFDOzRCQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsTUFBTTt3QkFDOUIsS0FBSyxDQUFDOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7d0JBQ3hELEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRCxLQUFLLENBQUM7NEJBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FB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QUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUNwSDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUNoSDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUNwSDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUM1RztnQkFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUNsSDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUN0SDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUN0SDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUNwSDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUNsSDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUN4SDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUN0SDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2lCQUNsSDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFB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