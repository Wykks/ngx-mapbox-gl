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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sRUFFTCxNQUFNLGVBQWUsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRXZELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztBQUU3RCxhQUFhLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEIxRSxNQUFNOzs7Ozs7O0lBMkJKLFlBQ1UsWUFDQSxNQUNRLGdCQUFrQyxFQUNZLHVCQUErQjtRQUhyRixlQUFVLEdBQVYsVUFBVTtRQUNWLFNBQUksR0FBSixJQUFJO1FBQ0kscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNZLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBUTtxQkFaN0UsSUFBSSxZQUFZLEVBQVE7dUJBQ3RCLElBQUksWUFBWSxFQUFxQjt1QkFDckMsSUFBSSxZQUFZLEVBQVc7c0JBQzVCLElBQUksWUFBWSxFQUFzQjtxQkFDdkMsSUFBSSxZQUFZLEVBQU87S0FTcEM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdC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LENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlGO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkc7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RGO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEc7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzRTs7OztZQTlHSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7Ozs7WUEvQlEsVUFBVTtZQVBqQixNQUFNO1lBU0MsZ0JBQWdCLHVCQTREcEIsSUFBSTt5Q0FDSixRQUFRLFlBQUksTUFBTSxTQUFDLHVCQUF1Qjs7O3NCQTdCNUMsS0FBSzswQkFDTCxLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7d0JBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUs7d0JBR0wsS0FBSzswQkFDTCxLQUFLO29CQUVMLE1BQU07c0JBQ04sTUFBTTtzQkFDTixNQUFNO3FCQUNOLE1BQU07b0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xuICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBHZW9jb2RlckV2ZW50IH0gZnJvbSAnLi4vbWFwL21hcC50eXBlcyc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbmNvbnN0IE1hcGJveEdlb2NvZGVyID0gcmVxdWlyZSgnQG1hcGJveC9tYXBib3gtZ2wtZ2VvY29kZXInKTtcblxuZXhwb3J0IGNvbnN0IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZID0gbmV3IEluamVjdGlvblRva2VuKCdNYXBib3hBcGlLZXknKTtcblxuZXhwb3J0IGludGVyZmFjZSBMbmdMYXRMaXRlcmFsIHtcbiAgbGF0aXR1ZGU6IG51bWJlcjtcbiAgbG9uZ2l0dWRlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0cyBleHRlbmRzIEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5Qb2ludD4ge1xuICBhdHRyaWJ1dGlvbjogc3RyaW5nO1xuICBxdWVyeTogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0IGV4dGVuZHMgR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+IHtcbiAgYmJveDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGNlbnRlcjogbnVtYmVyW107XG4gIHBsYWNlX25hbWU6IHN0cmluZztcbiAgcGxhY2VfdHlwZTogc3RyaW5nW107XG4gIHJlbGV2YW5jZTogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29udGV4dDogYW55W107XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xHZW9jb2Rlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBHZW9jb2RlckV2ZW50IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgY291bnRyeT86IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGJib3g/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgQElucHV0KCkgdHlwZXM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZseVRvPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbWluTGVuZ3RoPzogbnVtYmVyO1xuICBASW5wdXQoKSBsaW1pdD86IG51bWJlcjtcbiAgQElucHV0KCkgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBASW5wdXQoKSBmaWx0ZXI/OiAoZmVhdHVyZTogUmVzdWx0KSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBsb2NhbEdlb2NvZGVyPzogKHF1ZXJ5OiBzdHJpbmcpID0+IFJlc3VsdFtdO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHByb3hpbWl0eT86IExuZ0xhdExpdGVyYWw7XG4gIEBJbnB1dCgpIHNlYXJjaElucHV0Pzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBjbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHsgcXVlcnk6IHN0cmluZyB9PigpO1xuICBAT3V0cHV0KCkgcmVzdWx0cyA9IG5ldyBFdmVudEVtaXR0ZXI8UmVzdWx0cz4oKTtcbiAgQE91dHB1dCgpIHJlc3VsdCA9IG5ldyBFdmVudEVtaXR0ZXI8eyByZXN1bHQ6IFJlc3VsdCB9PigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBnZW9jb2RlcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASG9zdCgpIHByaXZhdGUgQ29udHJvbENvbXBvbmVudDogQ29udHJvbENvbXBvbmVudCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZKSBwcml2YXRlIHJlYWRvbmx5IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZOiBzdHJpbmdcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwcm94aW1pdHk6IHRoaXMucHJveGltaXR5LFxuICAgICAgICBjb3VudHJ5OiB0aGlzLmNvdW50cnksXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgIGJib3g6IHRoaXMuYmJveCxcbiAgICAgICAgdHlwZXM6IHRoaXMudHlwZXMsXG4gICAgICAgIGZseVRvOiB0aGlzLmZseVRvLFxuICAgICAgICBtaW5MZW5ndGg6IHRoaXMubWluTGVuZ3RoLFxuICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICAgIGZpbHRlcjogdGhpcy5maWx0ZXIsXG4gICAgICAgIGxvY2FsR2VvY29kZXI6IHRoaXMubG9jYWxHZW9jb2RlcixcbiAgICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4gfHwgdGhpcy5NQVBCT1hfR0VPQ09ERVJfQVBJX0tFWVxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiB0eXBlb2Ygb3B0aW9ucz5rZXk7XG4gICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IE1hcGJveEdlb2NvZGVyKG9wdGlvbnMpO1xuICAgICAgdGhpcy5ob29rRXZlbnRzKHRoaXMpO1xuICAgICAgdGhpcy5hZGRDb250cm9sKCk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuc2VhcmNoSW5wdXQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIucXVlcnkodGhpcy5zZWFyY2hJbnB1dCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmdlb2NvZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnByb3hpbWl0eSAmJiAhY2hhbmdlcy5wcm94aW1pdHkuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLnNldFByb3hpbWl0eShjaGFuZ2VzLnByb3hpbWl0eS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5zZWFyY2hJbnB1dCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5xdWVyeSh0aGlzLnNlYXJjaElucHV0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZENvbnRyb2woKSB7XG4gICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSB0aGlzLmdlb2NvZGVyO1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKFxuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsXG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb25cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBob29rRXZlbnRzKGV2ZW50czogR2VvY29kZXJFdmVudCkge1xuICAgIGlmIChldmVudHMucmVzdWx0cy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb2NvZGVyLm9uKCdyZXN1bHRzJywgKGV2dDogUmVzdWx0cykgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMucmVzdWx0cy5lbWl0KGV2dCkpKTtcbiAgICB9XG4gICAgaWYgKGV2ZW50cy5yZXN1bHQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbigncmVzdWx0JywgKGV2dDogeyByZXN1bHQ6IFJlc3VsdCB9KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5yZXN1bHQuZW1pdChldnQpKSk7XG4gICAgfVxuICAgIGlmIChldmVudHMuZXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignZXJyb3InLCAoZXZ0OiBhbnkpID0+IHRoaXMuem9uZS5ydW4oKCkgPT4gZXZlbnRzLmVycm9yLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmxvYWRpbmcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5vbignbG9hZGluZycsIChldnQ6IHsgcXVlcnk6IHN0cmluZyB9KSA9PiB0aGlzLnpvbmUucnVuKCgpID0+IGV2ZW50cy5sb2FkaW5nLmVtaXQoZXZ0KSkpO1xuICAgIH1cbiAgICBpZiAoZXZlbnRzLmNsZWFyLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZ2VvY29kZXIub24oJ2NsZWFyJywgKCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiBldmVudHMuY2xlYXIuZW1pdCgpKSk7XG4gICAgfVxuXG4gIH1cbn1cbiJdfQ==