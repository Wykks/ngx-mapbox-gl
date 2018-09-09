/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
export class PopupComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService) {
        this.MapService = MapService;
        this.close = new EventEmitter();
        this.open = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.lngLat && this.marker || this.feature && this.lngLat || this.feature && this.marker) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange() ||
            changes["feature"] && !changes["feature"].isFirstChange()) {
            /** @type {?} */
            const newlngLat = changes["lngLat"] ? /** @type {?} */ ((this.lngLat)) : /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates));
            this.MapService.removePopupFromMap(/** @type {?} */ ((this.popupInstance)), true);
            /** @type {?} */
            const popupInstanceTmp = this.createPopup();
            this.MapService.addPopupToMap(popupInstanceTmp, newlngLat, /** @type {?} */ ((this.popupInstance)).isOpen());
            this.popupInstance = popupInstanceTmp;
        }
        if (changes["marker"] && !changes["marker"].isFirstChange()) {
            /** @type {?} */
            const previousMarker = changes["marker"].previousValue;
            if (previousMarker.markerInstance) {
                this.MapService.removePopupFromMarker(previousMarker.markerInstance);
            }
            if (this.marker && this.marker.markerInstance && this.popupInstance) {
                this.MapService.addPopupToMarker(this.marker.markerInstance, this.popupInstance);
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.popupInstance) {
            if (this.lngLat) {
                this.MapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.MapService.removePopupFromMarker(this.marker.markerInstance);
            }
        }
        this.popupInstance = undefined;
    }
    /**
     * @return {?}
     */
    createPopup() {
        return this.MapService.createPopup({
            popupOptions: {
                closeButton: this.closeButton,
                closeOnClick: this.closeOnClick,
                anchor: this.anchor,
                offset: this.offset
            },
            popupEvents: {
                open: this.open,
                close: this.close
            }
        }, this.content.nativeElement);
    }
    /**
     * @param {?} popup
     * @return {?}
     */
    addPopup(popup) {
        this.MapService.mapCreated$.subscribe(() => {
            if (this.lngLat || this.feature) {
                this.MapService.addPopupToMap(popup, this.lngLat ? this.lngLat : /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates)));
            }
            else if (this.marker && this.marker.markerInstance) {
                this.MapService.addPopupToMarker(this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    }
}
PopupComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-popup',
                template: '<div #content><ng-content></ng-content></div>',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
PopupComponent.ctorParameters = () => [
    { type: MapService }
];
PopupComponent.propDecorators = {
    closeButton: [{ type: Input }],
    closeOnClick: [{ type: Input }],
    anchor: [{ type: Input }],
    offset: [{ type: Input }],
    feature: [{ type: Input }],
    lngLat: [{ type: Input }],
    marker: [{ type: Input }],
    close: [{ type: Output }],
    open: [{ type: Output }],
    content: [{ type: ViewChild, args: ['content',] }]
};
if (false) {
    /** @type {?} */
    PopupComponent.prototype.closeButton;
    /** @type {?} */
    PopupComponent.prototype.closeOnClick;
    /** @type {?} */
    PopupComponent.prototype.anchor;
    /** @type {?} */
    PopupComponent.prototype.offset;
    /** @type {?} */
    PopupComponent.prototype.feature;
    /** @type {?} */
    PopupComponent.prototype.lngLat;
    /** @type {?} */
    PopupComponent.prototype.marker;
    /** @type {?} */
    PopupComponent.prototype.close;
    /** @type {?} */
    PopupComponent.prototype.open;
    /** @type {?} */
    PopupComponent.prototype.content;
    /** @type {?} */
    PopupComponent.prototype.popupInstance;
    /** @type {?} */
    PopupComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9wb3B1cC9wb3B1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBS0wsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU83RCxNQUFNOzs7O0lBbUJKLFlBQ1U7UUFBQSxlQUFVLEdBQVYsVUFBVTtxQkFSRixJQUFJLFlBQVksRUFBUTtvQkFDekIsSUFBSSxZQUFZLEVBQVE7S0FRcEM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM1RixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDekU7S0FDRjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFDRSxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsYUFBYSxFQUFFO1lBQ2pELE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUUsRUFDbkQ7O1lBQ0EsTUFBTSxTQUFTLEdBQUcsT0FBTyxXQUFRLENBQUMsb0JBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRSxDQUFDLDBEQUFDLElBQUksQ0FBQyxPQUFPLEdBQUUsUUFBUSxHQUFFLFdBQVcsRUFBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLG9CQUFD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Q0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDckU7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO2FBQzFFO1NBQ0YsQ0FBQyxDQUFDOzs7O1lBaEdOLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLCtDQUErQztnQkFDekQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFQUSxVQUFVOzs7MEJBVWhCLEtBQUs7MkJBQ0wsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBR0wsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBRUwsTUFBTTttQkFDTixNQUFNO3NCQUVOLFNBQVMsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2ludExpa2UsIFBvcHVwLCBMbmdMYXRMaWtlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtcG9wdXAnLFxuICB0ZW1wbGF0ZTogJzxkaXYgI2NvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBvcHVwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgY2xvc2VCdXR0b24/OiBib29sZWFuO1xuICBASW5wdXQoKSBjbG9zZU9uQ2xpY2s/OiBib29sZWFuO1xuICBASW5wdXQoKSBhbmNob3I/OiAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCc7XG4gIEBJbnB1dCgpIG9mZnNldD86IG51bWJlciB8IFBvaW50TGlrZSB8IHsgW2FuY2hvcjogc3RyaW5nXTogW251bWJlciwgbnVtYmVyXSB9O1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgZmVhdHVyZT86IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLlBvaW50PjtcbiAgQElucHV0KCkgbG5nTGF0PzogTG5nTGF0TGlrZTtcbiAgQElucHV0KCkgbWFya2VyPzogTWFya2VyQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcG9wdXBJbnN0YW5jZT86IFBvcHVwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmxuZ0xhdCAmJiB0aGlzLm1hcmtlciB8fCB0aGlzLmZlYXR1cmUgJiYgdGhpcy5sbmdMYXQgfHwgdGhpcy5mZWF0dXJlICYmIHRoaXMubWFya2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hcmtlciwgbG5nTGF0LCBmZWF0dXJlIGlucHV0IGFyZSBtdXR1YWxseSBleGNsdXNpdmUnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5sbmdMYXQgJiYgIWNoYW5nZXMubG5nTGF0LmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5mZWF0dXJlICYmICFjaGFuZ2VzLmZlYXR1cmUuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICBjb25zdCBuZXdsbmdMYXQgPSBjaGFuZ2VzLmxuZ0xhdCA/IHRoaXMubG5nTGF0ISA6IHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzITtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlISwgdHJ1ZSk7XG4gICAgICBjb25zdCBwb3B1cEluc3RhbmNlVG1wID0gdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXAocG9wdXBJbnN0YW5jZVRtcCwgbmV3bG5nTGF0LCB0aGlzLnBvcHVwSW5zdGFuY2UhLmlzT3BlbigpKTtcbiAgICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHBvcHVwSW5zdGFuY2VUbXA7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1hcmtlciAmJiAhY2hhbmdlcy5tYXJrZXIuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjb25zdCBwcmV2aW91c01hcmtlcjogTWFya2VyQ29tcG9uZW50ID0gY2hhbmdlcy5tYXJrZXIucHJldmlvdXNWYWx1ZTtcbiAgICAgIGlmIChwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFya2VyKHByZXZpb3VzTWFya2VyLm1hcmtlckluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSAmJiB0aGlzLnBvcHVwSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UsIHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICB0aGlzLmFkZFBvcHVwKHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5wb3B1cEluc3RhbmNlKSB7XG4gICAgICBpZiAodGhpcy5sbmdMYXQpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3B1cEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQb3B1cCgpIHtcbiAgICByZXR1cm4gdGhpcy5NYXBTZXJ2aWNlLmNyZWF0ZVBvcHVwKHtcbiAgICAgIHBvcHVwT3B0aW9uczoge1xuICAgICAgICBjbG9zZUJ1dHRvbjogdGhpcy5jbG9zZUJ1dHRvbixcbiAgICAgICAgY2xvc2VPbkNsaWNrOiB0aGlzLmNsb3NlT25DbGljayxcbiAgICAgICAgYW5jaG9yOiB0aGlzLmFuY2hvcixcbiAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxuICAgICAgfSxcbiAgICAgIHBvcHVwRXZlbnRzOiB7XG4gICAgICAgIG9wZW46IHRoaXMub3BlbixcbiAgICAgICAgY2xvc2U6IHRoaXMuY2xvc2VcbiAgICAgIH1cbiAgICB9LCB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGFkZFBvcHVwKHBvcHVwOiBQb3B1cCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubG5nTGF0IHx8IHRoaXMuZmVhdHVyZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcChwb3B1cCwgdGhpcy5sbmdMYXQgPyB0aGlzLmxuZ0xhdCA6IHRoaXMuZmVhdHVyZSEuZ2VvbWV0cnkhLmNvb3JkaW5hdGVzISk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlLCBwb3B1cCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbC1wb3B1cCBuZWVkIGVpdGhlciBsbmdMYXQvbWFya2VyL2ZlYXR1cmUgdG8gYmUgc2V0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==