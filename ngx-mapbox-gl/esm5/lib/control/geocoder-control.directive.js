/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Host, Inject, InjectionToken, Input, NgZone, Optional, Output } from '@angular/core';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
/** @type {?} */
var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
/** @type {?} */
export var MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');
/**
 * @record
 */
export function LngLatLiteral() { }
/** @type {?} */
LngLatLiteral.prototype.latitude;
/** @type {?} */
LngLatLiteral.prototype.longitude;
/**
 * @record
 */
export function Results() { }
/** @type {?} */
Results.prototype.attribution;
/** @type {?} */
Results.prototype.query;
/**
 * @record
 */
export function Result() { }
/** @type {?} */
Result.prototype.bbox;
/** @type {?} */
Result.prototype.center;
/** @type {?} */
Result.prototype.place_name;
/** @type {?} */
Result.prototype.place_type;
/** @type {?} */
Result.prototype.relevance;
/** @type {?} */
Result.prototype.text;
/** @type {?} */
Result.prototype.address;
/** @type {?} */
Result.prototype.context;
var GeocoderControlDirective = /** @class */ (function () {
    function GeocoderControlDirective(MapService, zone, ControlComponent, MAPBOX_GEOCODER_API_KEY) {
        this.MapService = MapService;
        this.zone = zone;
        this.ControlComponent = ControlComponent;
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
export { GeocoderControlDirective };
if (false) {
    /** @type {?} */
    GeocoderControlDirective.prototype.country;
    /** @type {?} */
    GeocoderControlDirective.prototype.placeholder;
    /** @type {?} */
    GeocoderControlDirective.prototype.zoom;
    /** @type {?} */
    GeocoderControlDirective.prototype.bbox;
    /** @type {?} */
    GeocoderControlDirective.prototype.types;
    /** @type {?} */
    GeocoderControlDirective.prototype.flyTo;
    /** @type {?} */
    GeocoderControlDirective.prototype.minLength;
    /** @type {?} */
    GeocoderControlDirective.prototype.limit;
    /** @type {?} */
    GeocoderControlDirective.prototype.language;
    /** @type {?} */
    GeocoderControlDirective.prototype.accessToken;
    /** @type {?} */
    GeocoderControlDirective.prototype.filter;
    /** @type {?} */
    GeocoderControlDirective.prototype.localGeocoder;
    /** @type {?} */
    GeocoderControlDirective.prototype.proximity;
    /** @type {?} */
    GeocoderControlDirective.prototype.searchInput;
    /** @type {?} */
    GeocoderControlDirective.prototype.clear;
    /** @type {?} */
    GeocoderControlDirective.prototype.loading;
    /** @type {?} */
    GeocoderControlDirective.prototype.results;
    /** @type {?} */
    GeocoderControlDirective.prototype.result;
    /** @type {?} */
    GeocoderControlDirective.prototype.error;
    /** @type {?} */
    GeocoderControlDirective.prototype.geocoder;
    /** @type {?} */
    GeocoderControlDirective.prototype.MapService;
    /** @type {?} */
    GeocoderControlDirective.prototype.zone;
    /** @type {?} */
    GeocoderControlDirective.prototype.ControlComponent;
    /** @type {?} */
    GeocoderControlDirective.prototype.MAPBOX_GEOCODER_API_KEY;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sRUFFTCxNQUFNLGVBQWUsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRXZELElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztBQUU3RCxXQUFhLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFEeEUsa0NBQ1UsWUFDQSxNQUNRLGdCQUFrQyxFQUNZLHVCQUErQjtRQUhyRixlQUFVLEdBQVYsVUFBVTtRQUNWLFNBQUksR0FBSixJQUFJO1FBQ0kscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNZLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBUTtxQkFaN0UsSUFBSSxZQUFZLEVBQVE7dUJBQ3RCLElBQUksWUFBWSxFQUFxQjt1QkFDckMsSUFBSSxZQUFZLEVBQVc7c0JBQzVCLElBQUksWUFBWSxFQUFzQjtxQkFDdkMsSUFBSSxZQUFZLEVBQU87S0FTcEM7Ozs7SUFFTCwyQ0FBUTs7O0lBQVI7UUFBQSxpQkFvQ0M7UUFuQ0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3BDLElBQUksS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFB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QXhDLENBQXdDLENBQUMsQ0FBQztTQUMzRTs7O2dCQTlHSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzs7O2dCQS9CUSxVQUFVO2dCQVBqQixNQUFNO2dCQVNDLGdCQUFnQix1QkE0RHBCLElBQUk7NkNBQ0osUUFBUSxZQUFJLE1BQU0sU0FBQyx1QkFBdUI7OzswQkE3QjVDLEtBQUs7OEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7eUJBQ0wsS0FBSztnQ0FDTCxLQUFLOzRCQUdMLEtBQUs7OEJBQ0wsS0FBSzt3QkFFTCxNQUFNOzBCQUNOLE1BQU07MEJBQ04sTUFBTTt5QkFDTixNQUFNO3dCQUNOLE1BQU07O21DQXJFVDs7U0E4Q2Esd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG4gIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEdlb2NvZGVyRXZlbnQgfSBmcm9tICcuLi9tYXAvbWFwLnR5cGVzJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuY29uc3QgTWFwYm94R2VvY29kZXIgPSByZXF1aXJlKCdAbWFwYm94L21hcGJveC1nbC1nZW9jb2RlcicpO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIExuZ0xhdExpdGVyYWwge1xuICBsYXRpdHVkZTogbnVtYmVyO1xuICBsb25naXR1ZGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRzIGV4dGVuZHMgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLlBvaW50PiB7XG4gIGF0dHJpYnV0aW9uOiBzdHJpbmc7XG4gIHF1ZXJ5OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHQgZXh0ZW5kcyBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD4ge1xuICBiYm94OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgY2VudGVyOiBudW1iZXJbXTtcbiAgcGxhY2VfbmFtZTogc3RyaW5nO1xuICBwbGFjZV90eXBlOiBzdHJpbmdbXTtcbiAgcmVsZXZhbmNlOiBudW1iZXI7XG4gIHRleHQ6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb250ZXh0OiBhbnlbXTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbEdlb2NvZGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEdlb2NvZGVyRXZlbnQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBjb3VudHJ5Pzogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgQElucHV0KCkgem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgYmJveD86IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICBASW5wdXQoKSB0eXBlcz86IHN0cmluZztcbiAgQElucHV0KCkgZmx5VG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBtaW5MZW5ndGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbWl0PzogbnVtYmVyO1xuICBASW5wdXQoKSBsYW5ndWFnZT86IHN0cmluZztcbiAgQElucHV0KCkgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZpbHRlcj86IChmZWF0dXJlOiBSZXN1bHQpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxvY2FsR2VvY29kZXI/OiAocXVlcnk6IHN0cmluZykgPT4gUmVzdWx0W107XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgcHJveGltaXR5PzogTG5nTGF0TGl0ZXJhbDtcbiAgQElucHV0KCkgc2VhcmNoSW5wdXQ/OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGNsZWFyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgbG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8eyBxdWVyeTogc3RyaW5nIH0+KCk7XG4gIEBPdXRwdXQoKSByZXN1bHRzID0gbmV3IEV2ZW50RW1pdHRlcjxSZXN1bHRzPigpO1xuICBAT3V0cHV0KCkgcmVzdWx0ID0gbmV3IEV2ZW50RW1pdHRlcjx7IHJlc3VsdDogUmVzdWx0IH0+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdlb2NvZGVyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkpIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVk6IHN0cmluZ1xuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHByb3hpbWl0eTogdGhpcy5wcm94aW1pdHksXG4gICAgICAgIGNvdW50cnk6IHRoaXMuY291bnRyeSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgICAgYmJveDogdGhpcy5iYm94LFxuICAgICAgICB0eXBlczogdGhpcy50eXBlcyxcbiAgICAgICAgZmx5VG86IHRoaXMuZmx5VG8sXG4gICAgICAgIG1pbkxlbmd0aDogdGhpcy5taW5MZW5ndGgsXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgbG9jYWxHZW9jb2RlcjogdGhpcy5sb2NhbEdlb2NvZGVyLFxuICAgICAgICBhY2Nlc3NUb2tlbjogdGhpcy5hY2Nlc3NUb2tlbiB8fCB0aGlzLk1BUEJPWF9HRU9DT0RFUl9BUElfS0VZXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIHR5cGVvZiBvcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2VvY29kZXIgPSBuZXcgTWFwYm94R2VvY29kZXIob3B0aW9ucyk7XG4gICAgICB0aGlzLmhvb2tFdmVudHModGhpcyk7XG4gICAgICB0aGlzLmFkZENvbnRyb2woKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZW9jb2Rlci5xdWVyeSh0aGlzLnNlYXJjaElucHV0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuZ2VvY29kZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMucHJveGltaXR5ICYmICFjaGFuZ2VzLnByb3hpbWl0eS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIuc2V0UHJveGltaXR5KGNoYW5nZXMucHJveGltaXR5LmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnNlYXJjaElucHV0KSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLnF1ZXJ5KHRoaXMuc2VhcmNoSW5wdXQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29udHJvbCgpIHtcbiAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IHRoaXMuZ2VvY29kZXI7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2woXG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCxcbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvblxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhvb2tFdmVudHMoZXZlbnRzOiBHZW9jb2RlckV2ZW50KSB7XG4gICAgaWYgKGV2ZW50cy5yZXN1bHRzLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ3Jlc3VsdHMnLCAoZXZ0OiBSZXN1bHRzKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZXN1bHRzLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlc3VsdC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdyZXN1bHQnLCAoZXZ0OiB7IHJlc3VsdDogUmVzdWx0IH0pID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlc3VsdC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5lcnJvci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdlcnJvcicsIChldnQ6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZXJyb3IuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdsb2FkaW5nJywgKGV2dDogeyBxdWVyeTogc3RyaW5nIH0pID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY2xlYXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignY2xlYXInLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jbGVhci5lbWl0KCkpKTtcbiAgICB9XG5cbiAgfVxufVxuIl19