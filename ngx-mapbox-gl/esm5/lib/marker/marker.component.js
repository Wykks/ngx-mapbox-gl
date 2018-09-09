/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, Output, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MapService } from '../map/map.service';
var MarkerComponent = /** @class */ (function () {
    function MarkerComponent(MapService) {
        this.MapService = MapService;
        this.dragStart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.feature && this.lngLat) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MarkerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((this.lngLat)));
        }
        if (changes["feature"] && !changes["feature"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates);
        }
        if (changes["draggable"] && !changes["draggable"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setDraggable(!!this.draggable);
        }
    };
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            _this.markerInstance = _this.MapService.addMarker({
                markersOptions: {
                    offset: _this.offset,
                    anchor: _this.anchor,
                    draggable: !!_this.draggable,
                    element: _this.content.nativeElement,
                    feature: _this.feature,
                    lngLat: _this.lngLat
                },
                markersEvents: {
                    dragStart: _this.dragStart,
                    drag: _this.drag,
                    dragEnd: _this.dragEnd
                }
            });
        });
    };
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.MapService.removeMarker(/** @type {?} */ ((this.markerInstance)));
        this.markerInstance = undefined;
    };
    /**
     * @return {?}
     */
    MarkerComponent.prototype.togglePopup = /**
     * @return {?}
     */
    function () {
        /** @type {?} */ ((this.markerInstance)).togglePopup();
    };
    /**
     * @param {?} coordinates
     * @return {?}
     */
    MarkerComponent.prototype.updateCoordinates = /**
     * @param {?} coordinates
     * @return {?}
     */
    function (coordinates) {
        /** @type {?} */ ((this.markerInstance)).setLngLat(coordinates);
    };
    MarkerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-marker',
                    template: '<div #content><ng-content></ng-content></div>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    .mapboxgl-marker {\n      line-height: 0;\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    MarkerComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    MarkerComponent.propDecorators = {
        offset: [{ type: Input }],
        anchor: [{ type: Input }],
        feature: [{ type: Input }],
        lngLat: [{ type: Input }],
        draggable: [{ type: Input }],
        dragStart: [{ type: Output }],
        drag: [{ type: Output }],
        dragEnd: [{ type: Output }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return MarkerComponent;
}());
export { MarkerComponent };
if (false) {
    /** @type {?} */
    MarkerComponent.prototype.offset;
    /** @type {?} */
    MarkerComponent.prototype.anchor;
    /** @type {?} */
    MarkerComponent.prototype.feature;
    /** @type {?} */
    MarkerComponent.prototype.lngLat;
    /** @type {?} */
    MarkerComponent.prototype.draggable;
    /** @type {?} */
    MarkerComponent.prototype.dragStart;
    /** @type {?} */
    MarkerComponent.prototype.drag;
    /** @type {?} */
    MarkerComponent.prototype.dragEnd;
    /** @type {?} */
    MarkerComponent.prototype.content;
    /** @type {?} */
    MarkerComponent.prototype.markerInstance;
    /** @type {?} */
    MarkerComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBSUwsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUErQjlDLHlCQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7eUJBVEUsSUFBSSxZQUFZLEVBQVU7b0JBQy9CLElBQUksWUFBWSxFQUFVO3VCQUN2QixJQUFJLFlBQVksRUFBVTtLQVF6Qzs7OztJQUVMLGtDQUFROzs7SUFBUjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztTQUNwRTtLQUNGOzs7OztJQUVELHFDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sY0FBVyxDQUFDLE9BQU8sV0FBUSxhQUFhLEVBQUUsRUFBRTsrQkFDckQsSUFBSSxDQUFDLGNBQWMsR0FBRSxTQUFTLG9CQUFDLElBQUksQ0FBQyxNQUFNO1NBQzNDO1FBQ0QsSUFBSSxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFLEVBQUU7K0JBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUUsU0FBUyx1Q0FBQyxJQUFJLENBQUMsT0FBTyxHQUFFLFFBQVEsR0FBRSxXQUFXO1NBQ25FO1FBQ0QsSUFBSSxPQUFPLGlCQUFjLENBQUMsT0FBTyxjQUFXLGFBQWEsRUFBRSxFQUFFOytCQUMzRCxJQUFJLENBQUMsY0FBYyxHQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVM7U0FDbkQ7S0FDRjs7OztJQUVELHlDQUFlOzs7SUFBZjtRQUFBLGlCQWtCQztRQWpCQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDcEMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDOUMsY0FBYyxFQUFFO29CQUNkLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNO29CQUNuQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTO29CQUMzQixPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhO29CQUNuQyxPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU87b0JBQ3JCLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTTtpQkFDcEI7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLFNBQVMsRUFBRSxLQUFJLENBQUMsU0FBUztvQkFDekIsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJO29CQUNmLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTztpQkFDdEI7YUFDRixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7S0FDSjs7OztJQUVELHFDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxvQkFBQyxJQUFJLENBQUMsY0FBYyxHQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7S0FDakM7Ozs7SUFFRCxxQ0FBVzs7O0lBQVg7MkJBQ0UsSUFBSSxDQUFDLGNBQWMsR0FBRSxXQUFXO0tBQ2pDOzs7OztJQUVELDJDQUFpQjs7OztJQUFqQixVQUFrQixXQUFxQjsyQkFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRSxTQUFTLENBQUMsV0FBVztLQUMzQzs7Z0JBbEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLCtDQUErQztvQkFNekQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzZCQU50Qyw0REFJUjtpQkFHRjs7OztnQkFaUSxVQUFVOzs7eUJBZWhCLEtBQUs7eUJBQ0wsS0FBSzswQkFHTCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFFTCxNQUFNO3VCQUNOLE1BQU07MEJBQ04sTUFBTTswQkFFTixTQUFTLFNBQUMsU0FBUzs7MEJBM0N0Qjs7U0E2QmEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExuZ0xhdExpa2UsIE1hcmtlciwgUG9pbnRMaWtlLCBBbmNob3IgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1tYXJrZXInLFxuICB0ZW1wbGF0ZTogJzxkaXYgI2NvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXG4gIHN0eWxlczogW2BcbiAgICAubWFwYm94Z2wtbWFya2VyIHtcbiAgICAgIGxpbmUtaGVpZ2h0OiAwO1xuICAgIH1cbiAgYF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkluaXQge1xuICAvKiBJbml0IGlucHV0ICovXG4gIEBJbnB1dCgpIG9mZnNldD86IFBvaW50TGlrZTtcbiAgQElucHV0KCkgYW5jaG9yPzogQW5jaG9yO1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcbiAgQElucHV0KCkgbG5nTGF0PzogTG5nTGF0TGlrZTtcbiAgQElucHV0KCkgZHJhZ2dhYmxlPzogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXJrZXI+KCk7XG4gIEBPdXRwdXQoKSBkcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXJrZXI+KCk7XG4gIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXJrZXI+KCk7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgbWFya2VySW5zdGFuY2U/OiBNYXJrZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZmVhdHVyZSAmJiB0aGlzLmxuZ0xhdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmZWF0dXJlIGFuZCBsbmdMYXQgaW5wdXQgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZScpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5sbmdMYXQgJiYgIWNoYW5nZXMubG5nTGF0LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KHRoaXMubG5nTGF0ISk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmZlYXR1cmUgJiYgIWNoYW5nZXMuZmVhdHVyZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldExuZ0xhdCh0aGlzLmZlYXR1cmUhLmdlb21ldHJ5IS5jb29yZGluYXRlcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRyYWdnYWJsZSAmJiAhY2hhbmdlcy5kcmFnZ2FibGUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXREcmFnZ2FibGUoISF0aGlzLmRyYWdnYWJsZSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSA9IHRoaXMuTWFwU2VydmljZS5hZGRNYXJrZXIoe1xuICAgICAgICBtYXJrZXJzT3B0aW9uczoge1xuICAgICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQsXG4gICAgICAgICAgYW5jaG9yOiB0aGlzLmFuY2hvcixcbiAgICAgICAgICBkcmFnZ2FibGU6ICEhdGhpcy5kcmFnZ2FibGUsXG4gICAgICAgICAgZWxlbWVudDogdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5mZWF0dXJlLFxuICAgICAgICAgIGxuZ0xhdDogdGhpcy5sbmdMYXRcbiAgICAgICAgfSxcbiAgICAgICAgbWFya2Vyc0V2ZW50czoge1xuICAgICAgICAgIGRyYWdTdGFydDogdGhpcy5kcmFnU3RhcnQsXG4gICAgICAgICAgZHJhZzogdGhpcy5kcmFnLFxuICAgICAgICAgIGRyYWdFbmQ6IHRoaXMuZHJhZ0VuZFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVNYXJrZXIodGhpcy5tYXJrZXJJbnN0YW5jZSEpO1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB0b2dnbGVQb3B1cCgpIHtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlIS50b2dnbGVQb3B1cCgpO1xuICB9XG5cbiAgdXBkYXRlQ29vcmRpbmF0ZXMoY29vcmRpbmF0ZXM6IG51bWJlcltdKSB7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KGNvb3JkaW5hdGVzKTtcbiAgfVxufVxuIl19