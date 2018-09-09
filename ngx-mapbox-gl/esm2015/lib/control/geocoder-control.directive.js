/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Host, Inject, InjectionToken, Input, NgZone, Optional, Output } from '@angular/core';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
/** @type {?} */
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
/** @type {?} */
export const MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');
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
export class GeocoderControlDirective {
    /**
     * @param {?} MapService
     * @param {?} zone
     * @param {?} ControlComponent
     * @param {?} MAPBOX_GEOCODER_API_KEY
     */
    constructor(MapService, zone, ControlComponent, MAPBOX_GEOCODER_API_KEY) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sRUFFTCxNQUFNLGVBQWUsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRXZELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztBQUU3RCxhQUFhLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEIxRSxNQUFNOzs7Ozs7O0lBMkJKLFlBQ1UsWUFDQSxNQUNRLGdCQUFrQyxFQUNZLHVCQUErQjtRQUhyRixlQUFVLEdBQVYsVUFBVTtRQUNWLFNBQUksR0FBSixJQUFJO1FBQ0kscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNZLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBUTtxQkFaN0UsSUFBSSxZQUFZLEVBQVE7dUJBQ3RCLElBQUksWUFBWSxFQUFxQjt1QkFDckMsSUFBSSxZQUFZLEVBQVc7c0JBQzVCLElBQUksWUFBWSxFQUFzQjtxQkFDdkMsSUFBSSxZQUFZLEVBQU87S0FTcEM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFP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ZTthQUMxQjs7OztZQS9CUSxVQUFVO1lBUGpCLE1BQU07WUFTQyxnQkFBZ0IsdUJBNERwQixJQUFJO3lDQUNKLFFBQVEsWUFBSSxNQUFNLFNBQUMsdUJBQXVCOzs7c0JBN0I1QyxLQUFLOzBCQUNMLEtBQUs7bUJBQ0wsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLO3FCQUNMLEtBQUs7NEJBQ0wsS0FBSzt3QkFHTCxLQUFLOzBCQUNMLEtBQUs7b0JBRUwsTUFBTTtzQkFDTixNQUFNO3NCQUNOLE1BQU07cUJBQ04sTUFBTTtvQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG4gIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IEdlb2NvZGVyRXZlbnQgfSBmcm9tICcuLi9tYXAvbWFwLnR5cGVzJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wuY29tcG9uZW50JztcblxuY29uc3QgTWFwYm94R2VvY29kZXIgPSByZXF1aXJlKCdAbWFwYm94L21hcGJveC1nbC1nZW9jb2RlcicpO1xuXG5leHBvcnQgY29uc3QgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01hcGJveEFwaUtleScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIExuZ0xhdExpdGVyYWwge1xuICBsYXRpdHVkZTogbnVtYmVyO1xuICBsb25naXR1ZGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHRzIGV4dGVuZHMgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLlBvaW50PiB7XG4gIGF0dHJpYnV0aW9uOiBzdHJpbmc7XG4gIHF1ZXJ5OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bHQgZXh0ZW5kcyBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD4ge1xuICBiYm94OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgY2VudGVyOiBudW1iZXJbXTtcbiAgcGxhY2VfbmFtZTogc3RyaW5nO1xuICBwbGFjZV90eXBlOiBzdHJpbmdbXTtcbiAgcmVsZXZhbmNlOiBudW1iZXI7XG4gIHRleHQ6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb250ZXh0OiBhbnlbXTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbEdlb2NvZGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEdlb2NvZGVyRXZlbnQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBjb3VudHJ5Pzogc3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgQElucHV0KCkgem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgYmJveD86IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICBASW5wdXQoKSB0eXBlcz86IHN0cmluZztcbiAgQElucHV0KCkgZmx5VG8/OiBib29sZWFuO1xuICBASW5wdXQoKSBtaW5MZW5ndGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbWl0PzogbnVtYmVyO1xuICBASW5wdXQoKSBsYW5ndWFnZT86IHN0cmluZztcbiAgQElucHV0KCkgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZpbHRlcj86IChmZWF0dXJlOiBSZXN1bHQpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxvY2FsR2VvY29kZXI/OiAocXVlcnk6IHN0cmluZykgPT4gUmVzdWx0W107XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgcHJveGltaXR5PzogTG5nTGF0TGl0ZXJhbDtcbiAgQElucHV0KCkgc2VhcmNoSW5wdXQ/OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGNsZWFyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgbG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8eyBxdWVyeTogc3RyaW5nIH0+KCk7XG4gIEBPdXRwdXQoKSByZXN1bHRzID0gbmV3IEV2ZW50RW1pdHRlcjxSZXN1bHRzPigpO1xuICBAT3V0cHV0KCkgcmVzdWx0ID0gbmV3IEV2ZW50RW1pdHRlcjx7IHJlc3VsdDogUmVzdWx0IH0+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdlb2NvZGVyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkpIHByaXZhdGUgcmVhZG9ubHkgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVk6IHN0cmluZ1xuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHByb3hpbWl0eTogdGhpcy5wcm94aW1pdHksXG4gICAgICAgIGNvdW50cnk6IHRoaXMuY291bnRyeSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgICAgYmJveDogdGhpcy5iYm94LFxuICAgICAgICB0eXBlczogdGhpcy50eXBlcyxcbiAgICAgICAgZmx5VG86IHRoaXMuZmx5VG8sXG4gICAgICAgIG1pbkxlbmd0aDogdGhpcy5taW5MZW5ndGgsXG4gICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgbG9jYWxHZW9jb2RlcjogdGhpcy5sb2NhbEdlb2NvZGVyLFxuICAgICAgICBhY2Nlc3NUb2tlbjogdGhpcy5hY2Nlc3NUb2tlbiB8fCB0aGlzLk1BUEJPWF9HRU9DT0RFUl9BUElfS0VZXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIHR5cGVvZiBvcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2VvY29kZXIgPSBuZXcgTWFwYm94R2VvY29kZXIob3B0aW9ucyk7XG4gICAgICB0aGlzLmhvb2tFdmVudHModGhpcyk7XG4gICAgICB0aGlzLmFkZENvbnRyb2woKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5zZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZW9jb2Rlci5xdWVyeSh0aGlzLnNlYXJjaElucHV0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuZ2VvY29kZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMucHJveGltaXR5ICYmICFjaGFuZ2VzLnByb3hpbWl0eS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIuc2V0UHJveGltaXR5KGNoYW5nZXMucHJveGltaXR5LmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnNlYXJjaElucHV0KSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLnF1ZXJ5KHRoaXMuc2VhcmNoSW5wdXQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29udHJvbCgpIHtcbiAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IHRoaXMuZ2VvY29kZXI7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2woXG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCxcbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvblxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhvb2tFdmVudHMoZXZlbnRzOiBHZW9jb2RlckV2ZW50KSB7XG4gICAgaWYgKGV2ZW50cy5yZXN1bHRzLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ3Jlc3VsdHMnLCAoZXZ0OiBSZXN1bHRzKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZXN1bHRzLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLnJlc3VsdC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdyZXN1bHQnLCAoZXZ0OiB7IHJlc3VsdDogUmVzdWx0IH0pID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLnJlc3VsdC5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5lcnJvci5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdlcnJvcicsIChldnQ6IGFueSkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuZXJyb3IuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMubG9hZGluZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdsb2FkaW5nJywgKGV2dDogeyBxdWVyeTogc3RyaW5nIH0pID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmxvYWRpbmcuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuY2xlYXIub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignY2xlYXInLCAoKSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5jbGVhci5lbWl0KCkpKTtcbiAgICB9XG5cbiAgfVxufVxuIl19