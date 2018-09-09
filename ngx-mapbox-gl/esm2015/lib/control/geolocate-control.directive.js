/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Host, Input } from '@angular/core';
import { GeolocateControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
export class GeolocateControlDirective {
    /**
     * @param {?} MapService
     * @param {?} ControlComponent
     */
    constructor(MapService, ControlComponent) {
        this.MapService = MapService;
        this.ControlComponent = ControlComponent;
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
                positionOptions: this.positionOptions,
                fitBoundsOptions: this.fitBoundsOptions,
                trackUserLocation: this.trackUserLocation,
                showUserLocation: this.showUserLocation
            };
            Object.keys(options)
                .forEach((key) => {
                /** @type {?} */
                const tkey = /** @type {?} */ (key);
                if (options[tkey] === undefined) {
                    delete options[tkey];
                }
            });
            this.ControlComponent.control = new GeolocateControl(options);
            this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
        });
    }
}
GeolocateControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglGeolocate]'
            },] }
];
/** @nocollapse */
GeolocateControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: ControlComponent, decorators: [{ type: Host }] }
];
GeolocateControlDirective.propDecorators = {
    positionOptions: [{ type: Input }],
    fitBoundsOptions: [{ type: Input }],
    trackUserLocation: [{ type: Input }],
    showUserLocation: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9jb250cm9sL2dlb2xvY2F0ZS1jb250cm9sLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBb0IsTUFBTSxXQUFXLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBS3ZELE1BQU07Ozs7O0lBT0osWUFDVSxZQUNRLGdCQUFrQztRQUQxQyxlQUFVLEdBQVYsVUFBVTtRQUNGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7S0FDL0M7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQzthQUNwRTs7WUFDRCxNQUFNLE9BQU8sR0FBRztnQkFDZCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQ3JDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ3ZDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7Z0JBQ3pDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7YUFDeEMsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUNqQixPQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTs7Z0JBQ3ZCLE1BQU0sSUFBSSxxQkFBeUIsR0FBRyxFQUFDO2dCQUN2QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQy9CLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN0QjthQUNGLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzRixDQUFDLENBQUM7S0FDSjs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzNCOzs7O1lBTFEsVUFBVTtZQUNWLGdCQUFnQix1QkFjcEIsSUFBSTs7OzhCQVBOLEtBQUs7K0JBQ0wsS0FBSztnQ0FDTCxLQUFLOytCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb2xvY2F0ZUNvbnRyb2wsIEZpdEJvdW5kc09wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xHZW9sb2NhdGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgcG9zaXRpb25PcHRpb25zPzogUG9zaXRpb25PcHRpb25zO1xuICBASW5wdXQoKSBmaXRCb3VuZHNPcHRpb25zPzogRml0Qm91bmRzT3B0aW9ucztcbiAgQElucHV0KCkgdHJhY2tVc2VyTG9jYXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSBzaG93VXNlckxvY2F0aW9uPzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBwb3NpdGlvbk9wdGlvbnM6IHRoaXMucG9zaXRpb25PcHRpb25zLFxuICAgICAgICBmaXRCb3VuZHNPcHRpb25zOiB0aGlzLmZpdEJvdW5kc09wdGlvbnMsXG4gICAgICAgIHRyYWNrVXNlckxvY2F0aW9uOiB0aGlzLnRyYWNrVXNlckxvY2F0aW9uLFxuICAgICAgICBzaG93VXNlckxvY2F0aW9uOiB0aGlzLnNob3dVc2VyTG9jYXRpb25cbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgIC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHRrZXkgPSA8a2V5b2YgdHlwZW9mIG9wdGlvbnM+a2V5O1xuICAgICAgICAgIGlmIChvcHRpb25zW3RrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBHZW9sb2NhdGVDb250cm9sKG9wdGlvbnMpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==