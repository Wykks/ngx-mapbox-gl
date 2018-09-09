/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { MapService } from '../map/map.service';
var ImageComponent = /** @class */ (function () {
    function ImageComponent(MapService, zone) {
        this.MapService = MapService;
        this.zone = zone;
        this.error = new EventEmitter();
        this.loaded = new EventEmitter();
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
        this.MapService.mapLoaded$.subscribe(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data) return [3 /*break*/, 1];
                        this.MapService.addImage(this.id, this.data, this.options);
                        this.imageAdded = true;
                        return [3 /*break*/, 5];
                    case 1:
                        if (!this.url) return [3 /*break*/, 5];
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
        }); });
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
        { type: Component, args: [{
                    selector: 'mgl-image',
                    template: ''
                }] }
    ];
    /** @nocollapse */
    ImageComponent.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone }
    ]; };
    ImageComponent.propDecorators = {
        id: [{ type: Input }],
        data: [{ type: Input }],
        options: [{ type: Input }],
        url: [{ type: Input }],
        error: [{ type: Output }],
        loaded: [{ type: Output }]
    };
    return ImageComponent;
}());
export { ImageComponent };
if (false) {
    /** @type {?} */
    ImageComponent.prototype.id;
    /** @type {?} */
    ImageComponent.prototype.data;
    /** @type {?} */
    ImageComponent.prototype.options;
    /** @type {?} */
    ImageComponent.prototype.url;
    /** @type {?} */
    ImageComponent.prototype.error;
    /** @type {?} */
    ImageComponent.prototype.loaded;
    /** @type {?} */
    ImageComponent.prototype.imageAdded;
    /** @type {?} */
    ImageComponent.prototype.MapService;
    /** @type {?} */
    ImageComponent.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS9pbWFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUlOLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0lBcUI5Qyx3QkFDVSxZQUNBO1FBREEsZUFBVSxHQUFWLFVBQVU7UUFDVixTQUFJLEdBQUosSUFBSTtxQkFQSSxJQUFJLFlBQVksRUFBc0I7c0JBQ3JDLElBQUksWUFBWSxFQUFROzBCQUV0QixLQUFLO0tBS3JCOzs7O0lBRUwsaUNBQVE7OztJQUFSO1FBQUEsaUJBMkJDO1FBMUJDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQzs7Ozs7OzZCQUMvQixJQUFJLENBQUMsSUFBSSxFQUFULHdCQUFTO3dCQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUN0QixJQUFJLENBQUMsRUFBRSxFQUNQLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FDYixDQUFDO3dCQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOzs7NkJBQ2QsSUFBSSxDQUFDLEdBQUcsRUFBUix3QkFBUTs7Ozt3QkFFZixxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FDbkMsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLENBQUMsR0FBRyxFQUNSLElBQUksQ0FBQyxPQUFPLENBQ2IsRUFBQTs7d0JBSkQsU0FJQyxDQUFDO3dCQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO3dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDWixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO3lCQUNwQixDQUFDLENBQUM7Ozs7d0JBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQ1osS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBSyxDQUFDLENBQUM7eUJBQ3hCLENBQUMsQ0FBQzs7Ozs7YUFHUixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxvQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFDRSxPQUFPLFlBQVMsQ0FBQyxPQUFPLFNBQU0sYUFBYSxFQUFFO1lBQzdDLE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUU7WUFDbkQsT0FBTyxXQUFRLENBQUMsT0FBTyxRQUFLLGFBQWEsRUFBRSxFQUMzQztZQUNBLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7OztJQUVELG9DQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7S0FDRjs7Z0JBbkVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7Ozs7Z0JBTlEsVUFBVTtnQkFQakIsTUFBTTs7O3FCQWdCTCxLQUFLO3VCQUdMLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLO3dCQUVMLE1BQU07eUJBQ04sTUFBTTs7eUJBNUJUOztTQWtCYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwSW1hZ2VEYXRhLCBNYXBJbWFnZU9wdGlvbnMgfSBmcm9tICcuLi9tYXAvbWFwLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWltYWdlJyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgZGF0YT86IE1hcEltYWdlRGF0YTtcbiAgQElucHV0KCkgb3B0aW9ucz86IE1hcEltYWdlT3B0aW9ucztcbiAgQElucHV0KCkgdXJsPzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdGF0dXM6IG51bWJlciB9PigpO1xuICBAT3V0cHV0KCkgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgaW1hZ2VBZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRJbWFnZShcbiAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgIHRoaXMuZGF0YSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbWFnZUFkZGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy51cmwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLk1hcFNlcnZpY2UubG9hZEFuZEFkZEltYWdlKFxuICAgICAgICAgICAgdGhpcy5pZCxcbiAgICAgICAgICAgIHRoaXMudXJsLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmltYWdlQWRkZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZUltYWdlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxufVxuIl19