/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { MapService } from '../map/map.service';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, } from '@angular/core';
var CustomControl = /** @class */ (function () {
    function CustomControl(container) {
        this.container = container;
    }
    /**
     * @return {?}
     */
    CustomControl.prototype.onAdd = /**
     * @return {?}
     */
    function () {
        return this.container;
    };
    /**
     * @return {?}
     */
    CustomControl.prototype.onRemove = /**
     * @return {?}
     */
    function () {
        return /** @type {?} */ ((this.container.parentNode)).removeChild(this.container);
    };
    /**
     * @return {?}
     */
    CustomControl.prototype.getDefaultPosition = /**
     * @return {?}
     */
    function () {
        return 'top-right';
    };
    return CustomControl;
}());
export { CustomControl };
if (false) {
    /** @type {?} */
    CustomControl.prototype.container;
}
var ControlComponent = /** @class */ (function () {
    function ControlComponent(MapService) {
        this.MapService = MapService;
    }
    /**
     * @return {?}
     */
    ControlComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.content.nativeElement.childNodes.length) {
            this.control = new CustomControl(this.content.nativeElement);
            this.MapService.mapCreated$.subscribe(function () {
                _this.MapService.addControl(/** @type {?} */ ((_this.control)), _this.position);
            });
        }
    };
    /**
     * @return {?}
     */
    ControlComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.MapService.removeControl(this.control);
    };
    ControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-control',
                    template: '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    ControlComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    ControlComponent.propDecorators = {
        position: [{ type: Input }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return ControlComponent;
}());
export { ControlComponent };
if (false) {
    /** @type {?} */
    ControlComponent.prototype.position;
    /** @type {?} */
    ControlComponent.prototype.content;
    /** @type {?} */
    ControlComponent.prototype.control;
    /** @type {?} */
    ControlComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixJQUFBO0lBQ0UsdUJBQ1U7UUFBQSxjQUFTLEdBQVQsU0FBUztLQUVsQjs7OztJQUVELDZCQUFLOzs7SUFBTDtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2Qjs7OztJQUVELGdDQUFROzs7SUFBUjtRQUNFLDBCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO0tBQy9EOzs7O0lBRUQsMENBQWtCOzs7SUFBbEI7UUFDRSxPQUFPLFdBQVcsQ0FBQztLQUNwQjt3QkE1Qkg7SUE2QkMsQ0FBQTtBQWpCRCx5QkFpQkM7Ozs7OztJQWVDLDBCQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7S0FDZjs7OztJQUVMLDZDQUFrQjs7O0lBQWxCO1FBQUEsaUJBT0M7UUFOQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLG9CQUFDLEtBQUksQ0FBQyxPQUFPLElBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFELENBQUMsQ0FBQztTQUNKO0tBQ0Y7Ozs7SUFFRCxzQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDN0M7O2dCQTVCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxxRUFBcUU7b0JBQy9FLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFsQ1EsVUFBVTs7OzJCQXFDaEIsS0FBSzswQkFFTCxTQUFTLFNBQUMsU0FBUzs7MkJBeEN0Qjs7U0FvQ2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbCwgSUNvbnRyb2wgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tQ29udHJvbCBpbXBsZW1lbnRzIElDb250cm9sIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50XG4gICkge1xuICB9XG5cbiAgb25BZGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyO1xuICB9XG5cbiAgb25SZW1vdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUhLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIGdldERlZmF1bHRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gJ3RvcC1yaWdodCc7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWNvbnRyb2wnLFxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJtYXBib3hnbC1jdHJsXCIgI2NvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBwb3NpdGlvbj86ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcgfCAnYm90dG9tLXJpZ2h0JztcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBjb250cm9sOiBDb250cm9sIHwgSUNvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICh0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jb250cm9sID0gbmV3IEN1c3RvbUNvbnRyb2wodGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRDb250cm9sKHRoaXMuY29udHJvbCEsIHRoaXMucG9zaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZUNvbnRyb2wodGhpcy5jb250cm9sKTtcbiAgfVxufVxuIl19