/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, Output, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MapService } from '../map/map.service';
export class MarkerComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService) {
        this.MapService = MapService;
        this.dragStart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.feature && this.lngLat) {
            throw new Error('feature and lngLat input are mutually exclusive');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((this.lngLat)));
        }
        if (changes["feature"] && !changes["feature"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setLngLat(/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates);
        }
        if (changes["draggable"] && !changes["draggable"].isFirstChange()) {
            /** @type {?} */ ((this.markerInstance)).setDraggable(!!this.draggable);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.MapService.mapCreated$.subscribe(() => {
            this.markerInstance = this.MapService.addMarker({
                markersOptions: {
                    offset: this.offset,
                    anchor: this.anchor,
                    draggable: !!this.draggable,
                    element: this.content.nativeElement,
                    feature: this.feature,
                    lngLat: this.lngLat
                },
                markersEvents: {
                    dragStart: this.dragStart,
                    drag: this.drag,
                    dragEnd: this.dragEnd
                }
            });
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.MapService.removeMarker(/** @type {?} */ ((this.markerInstance)));
        this.markerInstance = undefined;
    }
    /**
     * @return {?}
     */
    togglePopup() {
        /** @type {?} */ ((this.markerInstance)).togglePopup();
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    updateCoordinates(coordinates) {
        /** @type {?} */ ((this.markerInstance)).setLngLat(coordinates);
    }
}
MarkerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-marker',
                template: '<div #content><ng-content></ng-content></div>',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
    .mapboxgl-marker {
      line-height: 0;
    }
  `]
            }] }
];
/** @nocollapse */
MarkerComponent.ctorParameters = () => [
    { type: MapService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBSUwsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWFoRCxNQUFNOzs7O0lBa0JKLFlBQ1U7UUFBQSxlQUFVLEdBQVYsVUFBVTt5QkFURSxJQUFJLFlBQVksRUFBVTtvQkFDL0IsSUFBSSxZQUFZLEVBQVU7dUJBQ3ZCLElBQUksWUFBWSxFQUFVO0tBUXpDOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztTQUNwRTtLQUNGOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sY0FBVyxDQUFDLE9BQU8sV0FBUSxhQUFhLEVBQUUsRUFBRTsrQkFDckQsSUFBSSxDQUFDLGNBQWMsR0FBRSxTQUFTLG9CQUFDLElBQUksQ0FBQyxNQUFNO1NBQzNDO1FBQ0QsSUFBSSxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFLEVBQUU7K0JBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUUsU0FBUyx1Q0FBQyxJQUFJLENBQUMsT0FBTyxHQUFFLFFBQVEsR0FBRSxXQUFXO1NBQ25FO1FBQ0QsSUFBSSxPQUFPLGlCQUFjLENBQUMsT0FBTyxjQUFXLGFBQWEsRUFBRSxFQUFFOytCQUMzRCxJQUFJLENBQUMsY0FBYyxHQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVM7U0FDbkQ7S0FDRjs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzlDLGNBQWMsRUFBRTtvQkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUztvQkFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtvQkFDbkMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07aUJBQ3BCO2dCQUNELGFBQWEsRUFBRTtvQkFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87aUJBQ3RCO2FBQ0YsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLG9CQUFDLElBQUksQ0FBQyxjQUFjLEdBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztLQUNqQzs7OztJQUVELFdBQVc7MkJBQ1QsSUFBSSxDQUFDLGNBQWMsR0FBRSxXQUFXO0tBQ2pDOzs7OztJQUVELGlCQUFpQixDQUFDLFdBQXFCOzJCQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFFLFNBQVMsQ0FBQyxXQUFXO0tBQzNDOzs7WUFsRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsK0NBQStDO2dCQU16RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07eUJBTnRDOzs7O0dBSVI7YUFHRjs7OztZQVpRLFVBQVU7OztxQkFlaEIsS0FBSztxQkFDTCxLQUFLO3NCQUdMLEtBQUs7cUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUVMLE1BQU07bUJBQ04sTUFBTTtzQkFDTixNQUFNO3NCQUVOLFNBQVMsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG5nTGF0TGlrZSwgTWFya2VyLCBQb2ludExpa2UsIEFuY2hvciB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLW1hcmtlcicsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICAgIC5tYXBib3hnbC1tYXJrZXIge1xuICAgICAgbGluZS1oZWlnaHQ6IDA7XG4gICAgfVxuICBgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgb2Zmc2V0PzogUG9pbnRMaWtlO1xuICBASW5wdXQoKSBhbmNob3I/OiBBbmNob3I7XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBASW5wdXQoKSBmZWF0dXJlPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+O1xuICBASW5wdXQoKSBsbmdMYXQ/OiBMbmdMYXRMaWtlO1xuICBASW5wdXQoKSBkcmFnZ2FibGU/OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcmtlcj4oKTtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBtYXJrZXJJbnN0YW5jZT86IE1hcmtlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5mZWF0dXJlICYmIHRoaXMubG5nTGF0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZlYXR1cmUgYW5kIGxuZ0xhdCBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmxuZ0xhdCAmJiAhY2hhbmdlcy5sbmdMYXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQodGhpcy5sbmdMYXQhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZmVhdHVyZSAmJiAhY2hhbmdlcy5mZWF0dXJlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5tYXJrZXJJbnN0YW5jZSEuc2V0TG5nTGF0KHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZHJhZ2dhYmxlICYmICFjaGFuZ2VzLmRyYWdnYWJsZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnNldERyYWdnYWJsZSghIXRoaXMuZHJhZ2dhYmxlKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm1hcmtlckluc3RhbmNlID0gdGhpcy5NYXBTZXJ2aWNlLmFkZE1hcmtlcih7XG4gICAgICAgIG1hcmtlcnNPcHRpb25zOiB7XG4gICAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCxcbiAgICAgICAgICBhbmNob3I6IHRoaXMuYW5jaG9yLFxuICAgICAgICAgIGRyYWdnYWJsZTogISF0aGlzLmRyYWdnYWJsZSxcbiAgICAgICAgICBlbGVtZW50OiB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLmZlYXR1cmUsXG4gICAgICAgICAgbG5nTGF0OiB0aGlzLmxuZ0xhdFxuICAgICAgICB9LFxuICAgICAgICBtYXJrZXJzRXZlbnRzOiB7XG4gICAgICAgICAgZHJhZ1N0YXJ0OiB0aGlzLmRyYWdTdGFydCxcbiAgICAgICAgICBkcmFnOiB0aGlzLmRyYWcsXG4gICAgICAgICAgZHJhZ0VuZDogdGhpcy5kcmFnRW5kXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZU1hcmtlcih0aGlzLm1hcmtlckluc3RhbmNlISk7XG4gICAgdGhpcy5tYXJrZXJJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRvZ2dsZVBvcHVwKCkge1xuICAgIHRoaXMubWFya2VySW5zdGFuY2UhLnRvZ2dsZVBvcHVwKCk7XG4gIH1cblxuICB1cGRhdGVDb29yZGluYXRlcyhjb29yZGluYXRlczogbnVtYmVyW10pIHtcbiAgICB0aGlzLm1hcmtlckluc3RhbmNlIS5zZXRMbmdMYXQoY29vcmRpbmF0ZXMpO1xuICB9XG59XG4iXX0=