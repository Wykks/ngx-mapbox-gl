/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Host, Input } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
export class NavigationControlDirective {
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
            let options = {};
            if (this.showCompass !== undefined) {
                options.showCompass = this.showCompass;
            }
            if (this.showZoom !== undefined) {
                options.showZoom = this.showZoom;
            }
            this.ControlComponent.control = new NavigationControl(options);
            this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
        });
    }
}
NavigationControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglNavigation]'
            },] }
];
/** @nocollapse */
NavigationControlDirective.ctorParameters = () => [
    { type: MapService },
    { type: ControlComponent, decorators: [{ type: Host }] }
];
NavigationControlDirective.propDecorators = {
    showCompass: [{ type: Input }],
    showZoom: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NavigationControlDirective.prototype.showCompass;
    /** @type {?} */
    NavigationControlDirective.prototype.showZoom;
    /** @type {?} */
    NavigationControlDirective.prototype.MapService;
    /** @type {?} */
    NavigationControlDirective.prototype.ControlComponent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvY29udHJvbC9uYXZpZ2F0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUt2RCxNQUFNOzs7OztJQUtKLFlBQ1UsWUFDUSxnQkFBa0M7UUFEMUMsZUFBVSxHQUFWLFVBQVU7UUFDRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0tBQy9DOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7YUFDcEU7O1lBQ0QsSUFBSSxPQUFPLEdBQWtELEVBQUUsQ0FBQztZQUNoRSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDeEM7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUMvQixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDbEM7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0YsQ0FBQyxDQUFDO0tBQ0o7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjthQUM1Qjs7OztZQUxRLFVBQVU7WUFDVixnQkFBZ0IsdUJBWXBCLElBQUk7OzswQkFMTixLQUFLO3VCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25Db250cm9sIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsTmF2aWdhdGlvbl0nXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgc2hvd0NvbXBhc3M/OiBib29sZWFuO1xuICBASW5wdXQoKSBzaG93Wm9vbT86IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbm90aGVyIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgZm9yIHRoaXMgY29udHJvbCcpO1xuICAgICAgfVxuICAgICAgbGV0IG9wdGlvbnM6IHsgc2hvd0NvbXBhc3M/OiBib29sZWFuLCBzaG93Wm9vbT86IGJvb2xlYW4gfSA9IHt9O1xuICAgICAgaWYgKHRoaXMuc2hvd0NvbXBhc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLnNob3dDb21wYXNzID0gdGhpcy5zaG93Q29tcGFzcztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNob3dab29tICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9ucy5zaG93Wm9vbSA9IHRoaXMuc2hvd1pvb207XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBOYXZpZ2F0aW9uQ29udHJvbChvcHRpb25zKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sLCB0aGlzLkNvbnRyb2xDb21wb25lbnQucG9zaXRpb24pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=