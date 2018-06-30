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
                },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL2NvbnRyb2wvY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixJQUFBO0lBQ0UsdUJBQ1U7UUFBQSxjQUFTLEdBQVQsU0FBUztLQUVsQjs7OztJQUVELDZCQUFLOzs7SUFBTDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3ZCOzs7O0lBRUQsZ0NBQVE7OztJQUFSO1FBQ0UsTUFBTSxvQkFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtLQUMvRDs7OztJQUVELDBDQUFrQjs7O0lBQWxCO1FBQ0UsTUFBTSxDQUFDLFdBQVcsQ0FBQztLQUNwQjt3QkE1Qkg7SUE2QkMsQ0FBQTtBQWpCRCx5QkFpQkM7Ozs7OztJQWVDLDBCQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7S0FDZjs7OztJQUVMLDZDQUFrQjs7O0lBQWxCO1FBQUEsaUJBT0M7UUFOQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsb0JBQUMsS0FBSSxDQUFDLE9BQU8sSUFBRyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDMUQsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVELHNDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3Qzs7Z0JBNUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLHFFQUFxRTtvQkFDL0UsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQWxDUSxVQUFVOzs7MkJBcUNoQixLQUFLOzBCQUVMLFNBQVMsU0FBQyxTQUFTOzsyQkF4Q3RCOztTQW9DYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sLCBJQ29udHJvbCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21Db250cm9sIGltcGxlbWVudHMgSUNvbnRyb2wge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgKSB7XG4gIH1cblxuICBvbkFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG4gIH1cblxuICBvblJlbW92ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgZ2V0RGVmYXVsdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiAndG9wLXJpZ2h0JztcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtY29udHJvbCcsXG4gIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cIm1hcGJveGdsLWN0cmxcIiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uPzogJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnRyb2w6IENvbnRyb2wgfCBJQ29udHJvbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNvbnRyb2wgPSBuZXcgQ3VzdG9tQ29udHJvbCh0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZENvbnRyb2wodGhpcy5jb250cm9sISwgdGhpcy5wb3NpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlQ29udHJvbCh0aGlzLmNvbnRyb2wpO1xuICB9XG59XG4iXX0=