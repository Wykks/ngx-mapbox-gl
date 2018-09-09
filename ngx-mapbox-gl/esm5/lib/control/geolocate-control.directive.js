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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9sL2dlb2xvY2F0ZS1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBb0IsTUFBTSxXQUFXLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQVlyRCxtQ0FDVSxZQUNRLGdCQUFrQztRQUQxQyxlQUFVLEdBQVYsVUFBVTtRQUNGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7S0FDL0M7Ozs7SUFFTCw0Q0FBUTs7O0lBQVI7UUFBQSxpQkFzQkM7UUFyQkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3BDLElBQUksS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO2FBQ3BFOztZQUNELElBQU0sT0FBTyxHQUFHO2dCQUNkLGVBQWUsRUFBRSxLQUFJLENBQUMsZUFBZTtnQkFDckMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGdCQUFnQjtnQkFDdkMsaUJBQWlCLEVBQUUsS0FBSSxDQUFDLGlCQUFpQjtnQkFDekMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGdCQUFnQjthQUN4QyxDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ2pCLE9BQU8sQ0FBQyxVQUFDLEdBQVc7O2dCQUNuQixJQUFNLElBQUkscUJBQXlCLEdBQUcsRUFBQztnQkFDdkMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUMvQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEI7YUFDRixDQUFDLENBQUM7WUFDTCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0YsQ0FBQyxDQUFDO0tBQ0o7O2dCQXJDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0JBTFEsVUFBVTtnQkFDVixnQkFBZ0IsdUJBY3BCLElBQUk7OztrQ0FQTixLQUFLO21DQUNMLEtBQUs7b0NBQ0wsS0FBSzttQ0FDTCxLQUFLOztvQ0FiUjs7U0FRYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb2xvY2F0ZUNvbnRyb2wsIEZpdEJvdW5kc09wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xHZW9sb2NhdGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgcG9zaXRpb25PcHRpb25zPzogUG9zaXRpb25PcHRpb25zO1xuICBASW5wdXQoKSBmaXRCb3VuZHNPcHRpb25zPzogRml0Qm91bmRzT3B0aW9ucztcbiAgQElucHV0KCkgdHJhY2tVc2VyTG9jYXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSBzaG93VXNlckxvY2F0aW9uPzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwb3NpdGlvbk9wdGlvbnM6IHRoaXMucG9zaXRpb25PcHRpb25zLFxuICAgICAgICBmaXRCb3VuZHNPcHRpb25zOiB0aGlzLmZpdEJvdW5kc09wdGlvbnMsXG4gICAgICAgIHRyYWNrVXNlckxvY2F0aW9uOiB0aGlzLnRyYWNrVXNlckxvY2F0aW9uLFxuICAgICAgICBzaG93VXNlckxvY2F0aW9uOiB0aGlzLnNob3dVc2VyTG9jYXRpb25cbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgIC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgdHlwZW9mIG9wdGlvbnM+a2V5O1xuICAgICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBHZW9sb2NhdGVDb250cm9sKG9wdGlvbnMpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==