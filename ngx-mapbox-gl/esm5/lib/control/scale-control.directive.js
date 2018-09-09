/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Host, Input } from '@angular/core';
import { ScaleControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
var ScaleControlDirective = /** @class */ (function () {
    function ScaleControlDirective(MapService, ControlComponent) {
        this.MapService = MapService;
        this.ControlComponent = ControlComponent;
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
            (/** @type {?} */ (this.ControlComponent.control)).setUnit(changes["unit"].currentValue);
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
            _this.ControlComponent.control = new ScaleControl(options);
            _this.MapService.addControl(_this.ControlComponent.control, _this.ControlComponent.position);
        });
    };
    ScaleControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglScale]'
                },] }
    ];
    /** @nocollapse */
    ScaleControlDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: ControlComponent, decorators: [{ type: Host }] }
    ]; };
    ScaleControlDirective.propDecorators = {
        maxWidth: [{ type: Input }],
        unit: [{ type: Input }]
    };
    return ScaleControlDirective;
}());
export { ScaleControlDirective };
if (false) {
    /** @type {?} */
    ScaleControlDirective.prototype.maxWidth;
    /** @type {?} */
    ScaleControlDirective.prototype.unit;
    /** @type {?} */
    ScaleControlDirective.prototype.MapService;
    /** @type {?} */
    ScaleControlDirective.prototype.ControlComponent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtY29udHJvbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvc2NhbGUtY29udHJvbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBWXJELCtCQUNVLFlBQ1EsZ0JBQWtDO1FBRDFDLGVBQVUsR0FBVixVQUFVO1FBQ0YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtLQUMvQzs7Ozs7SUFFTCwyQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLFlBQVMsQ0FBQyxPQUFPLFNBQU0sYUFBYSxFQUFFLEVBQUU7WUFDakQsbUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFNBQU0sWUFBWSxDQUFDLENBQUM7U0FDekU7S0FDRjs7OztJQUVELHdDQUFROzs7SUFBUjtRQUFBLGlCQWVDO1FBZEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3BDLElBQUksS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtnQkFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO2FBQ3BFOztZQUNELElBQU0sT0FBTyxHQUF5QyxFQUFFLENBQUM7WUFDekQsSUFBSSxLQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2xDO1lBQ0QsSUFBSSxLQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO2FBQzFCO1lBQ0QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzRixDQUFDLENBQUM7S0FDSjs7Z0JBcENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7Ozs7Z0JBTFEsVUFBVTtnQkFDVixnQkFBZ0IsdUJBY3BCLElBQUk7OzsyQkFQTixLQUFLO3VCQUdMLEtBQUs7O2dDQWJSOztTQVFhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY2FsZUNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZ2xTY2FsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjYWxlQ29udHJvbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgbWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdW5pdD86ICdpbXBlcmlhbCcgfCAnbWV0cmljJyB8ICduYXV0aWNhbCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBDb250cm9sQ29tcG9uZW50OiBDb250cm9sQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnVuaXQgJiYgIWNoYW5nZXMudW5pdC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICg8YW55PnRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKS5zZXRVbml0KGNoYW5nZXMudW5pdC5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuQ29udHJvbENvbXBvbmVudC5jb250cm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5vdGhlciBjb250cm9sIGlzIGFscmVhZHkgc2V0IGZvciB0aGlzIGNvbnRyb2wnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnM6IHsgbWF4V2lkdGg/OiBudW1iZXIsIHVuaXQ/OiBzdHJpbmcgfSA9IHt9O1xuICAgICAgaWYgKHRoaXMubWF4V2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLm1heFdpZHRoID0gdGhpcy5tYXhXaWR0aDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnVuaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRpb25zLnVuaXQgPSB0aGlzLnVuaXQ7XG4gICAgICB9XG4gICAgICB0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCA9IG5ldyBTY2FsZUNvbnRyb2wob3B0aW9ucyk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkQ29udHJvbCh0aGlzLkNvbnRyb2xDb21wb25lbnQuY29udHJvbCwgdGhpcy5Db250cm9sQ29tcG9uZW50LnBvc2l0aW9uKTtcbiAgICB9KTtcbiAgfVxufVxuIl19