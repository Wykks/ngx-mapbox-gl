/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Host, Input } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
var NavigationControlDirective = /** @class */ (function () {
    function NavigationControlDirective(MapService, ControlComponent) {
        this.MapService = MapService;
        this.ControlComponent = ControlComponent;
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
export { NavigationControlDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvY29udHJvbC9uYXZpZ2F0aW9uLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFVckQsb0NBQ1UsWUFDUSxnQkFBa0M7UUFEMUMsZUFBVSxHQUFWLFVBQVU7UUFDRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0tBQy9DOzs7O0lBRUwsNkNBQVE7OztJQUFSO1FBQUEsaUJBZUM7UUFkQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDcEMsSUFBSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7YUFDcEU7O1lBQ0QsSUFBSSxPQUFPLEdBQWtELEVBQUUsQ0FBQztZQUNoRSxJQUFJLEtBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUM7YUFDeEM7WUFDRCxJQUFJLEtBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUMvQixPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUM7YUFDbEM7WUFDRCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0YsQ0FBQyxDQUFDO0tBQ0o7O2dCQTVCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7Ozs7Z0JBTFEsVUFBVTtnQkFDVixnQkFBZ0IsdUJBWXBCLElBQUk7Ozs4QkFMTixLQUFLOzJCQUNMLEtBQUs7O3FDQVhSOztTQVFhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xOYXZpZ2F0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBzaG93Q29tcGFzcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dab29tPzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgQEhvc3QoKSBwcml2YXRlIENvbnRyb2xDb21wb25lbnQ6IENvbnRyb2xDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fub3RoZXIgY29udHJvbCBpcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBjb250cm9sJyk7XG4gICAgICB9XG4gICAgICBsZXQgb3B0aW9uczogeyBzaG93Q29tcGFzcz86IGJvb2xlYW4sIHNob3dab29tPzogYm9vbGVhbiB9ID0ge307XG4gICAgICBpZiAodGhpcy5zaG93Q29tcGFzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9wdGlvbnMuc2hvd0NvbXBhc3MgPSB0aGlzLnNob3dDb21wYXNzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2hvd1pvb20gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLnNob3dab29tID0gdGhpcy5zaG93Wm9vbTtcbiAgICAgIH1cbiAgICAgIHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sID0gbmV3IE5hdmlnYXRpb25Db250cm9sKG9wdGlvbnMpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5Db250cm9sQ29tcG9uZW50LmNvbnRyb2wsIHRoaXMuQ29udHJvbENvbXBvbmVudC5wb3NpdGlvbik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==