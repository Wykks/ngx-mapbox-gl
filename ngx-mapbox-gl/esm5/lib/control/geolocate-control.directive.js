/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Host, Input } from '@angular/core';
import { GeolocateControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
var GeolocateControlDirective = /** @class */ (function () {
    function GeolocateControlDirective(MapService, ControlComponent) {
        this.MapService = MapService;
        this.ControlComponent = ControlComponent;
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
                },] },
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
export { GeolocateControlDirective };
if (false) {
    /** @type {?} */
    GeolocateControlDirective.prototype.positionOptions;
    /** @type {?} */
    GeolocateControlDirective.prototype.fitBoundsOptions;
    /** @type {?} */
    GeolocateControlDirective.prototype.trackUserLocation;
    /** @type {?} */
    GeolocateControlDirective.prototype.showUserLocation;
    /** @type {?} */
    GeolocateControlDirective.prototype.MapService;
    /** @type {?} */
    GeolocateControlDirective.prototype.ControlComponent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9sL2dlb2xvY2F0ZS1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBb0IsTUFBTSxXQUFXLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQVlyRCxtQ0FDVSxZQUNRLGdCQUFrQztRQUQxQyxlQUFVLEdBQVYsVUFBVTtRQUNGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7S0FDL0M7Ozs7SUFFTCw0Q0FBUTs7O0lBQVI7UUFBQSxpQkFzQkM7UUFyQkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7YUFDcEU7O1lBQ0QsSUFBTSxPQUFPLEdBQUc7Z0JBQ2QsZUFBZSxFQUFFLEtBQUksQ0FBQyxlQUFlO2dCQUNyQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsZ0JBQWdCO2dCQUN2QyxpQkFBaUIsRUFBRSxLQUFJLENBQUMsaUJBQWlCO2dCQUN6QyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsZ0JBQWdCO2FBQ3hDLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDakIsT0FBTyxDQUFDLFVBQUMsR0FBVzs7Z0JBQ25CLElBQU0sSUFBSSxxQkFBeUIsR0FBRyxFQUFDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0wsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNGLENBQUMsQ0FBQztLQUNKOztnQkFyQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7O2dCQUxRLFVBQVU7Z0JBQ1YsZ0JBQWdCLHVCQWNwQixJQUFJOzs7a0NBUE4sS0FBSzttQ0FDTCxLQUFLO29DQUNMLEtBQUs7bUNBQ0wsS0FBSzs7b0NBYlI7O1NBUWEseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9sb2NhdGVDb250cm9sLCBGaXRCb3VuZHNPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsR2VvbG9jYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uT3B0aW9ucz86IFBvc2l0aW9uT3B0aW9ucztcbiAgQElucHV0KCkgZml0Qm91bmRzT3B0aW9ucz86IEZpdEJvdW5kc09wdGlvbnM7XG4gIEBJbnB1dCgpIHRyYWNrVXNlckxvY2F0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd1VzZXJMb2NhdGlvbj86IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgcG9zaXRpb25PcHRpb25zOiB0aGlzLnBvc2l0aW9uT3B0aW9ucyxcbiAgICAgICAgZml0Qm91bmRzT3B0aW9uczogdGhpcy5maXRCb3VuZHNPcHRpb25zLFxuICAgICAgICB0cmFja1VzZXJMb2NhdGlvbjogdGhpcy50cmFja1VzZXJMb2NhdGlvbixcbiAgICAgICAgc2hvd1VzZXJMb2NhdGlvbjogdGhpcy5zaG93VXNlckxvY2F0aW9uXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIHR5cGVvZiBvcHRpb25zPmtleTtcbiAgICAgICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9uc1t0a2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wgPSBuZXcgR2VvbG9jYXRlQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLCB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=