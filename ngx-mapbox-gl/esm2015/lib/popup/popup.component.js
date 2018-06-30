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
        if (this.lngLat && this.marker) {
            throw new Error('marker and lngLat input are mutually exclusive');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange()) {
            this.MapService.removePopupFromMap(/** @type {?} */ ((this.popupInstance)));
            /** @type {?} */
            const popupInstanceTmp = this.createPopup();
            this.MapService.addPopupToMap(popupInstanceTmp, changes["lngLat"].currentValue);
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
            if (this.lngLat) {
                this.MapService.addPopupToMap(popup, this.lngLat);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.MapService.addPopupToMarker(this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat or marker to be set');
            }
        });
    }
}
PopupComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-popup',
                template: '<div #content><ng-content></ng-content></div>',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9wb3B1cC9wb3B1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBS0wsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU83RCxNQUFNOzs7O0lBa0JKLFlBQ1U7UUFBQSxlQUFVLEdBQVYsVUFBVTtxQkFSRixJQUFJLFlBQVksRUFBUTtvQkFDekIsSUFBSSxZQUFZLEVBQVE7S0FRcEM7Ozs7SUFFTCxRQUFRO1FBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7U0FDbkU7S0FDRjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixvQkFBQyxJQUFJLENBQUMsYUFBYSxHQUFFLENBQUM7O1lBQ3hELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sV0FBUSxZQUFZLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDO1NBQ3ZDO1FBQ0QsRUFB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RSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsK0NBQStDO2dCQUN6RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQVBRLFVBQVU7OzswQkFVaEIsS0FBSzsyQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSztxQkFHTCxLQUFLO3FCQUNMLEtBQUs7b0JBRUwsTUFBTTttQkFDTixNQUFNO3NCQUVOLFNBQVMsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2ludExpa2UsIFBvcHVwLCBMbmdMYXRMaWtlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtcG9wdXAnLFxuICB0ZW1wbGF0ZTogJzxkaXYgI2NvbnRlbnQ+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBvcHVwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgY2xvc2VCdXR0b24/OiBib29sZWFuO1xuICBASW5wdXQoKSBjbG9zZU9uQ2xpY2s/OiBib29sZWFuO1xuICBASW5wdXQoKSBhbmNob3I/OiAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCc7XG4gIEBJbnB1dCgpIG9mZnNldD86IG51bWJlciB8IFBvaW50TGlrZSB8IHsgW2FuY2hvcjogc3RyaW5nXTogW251bWJlciwgbnVtYmVyXSB9O1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgbG5nTGF0PzogTG5nTGF0TGlrZTtcbiAgQElucHV0KCkgbWFya2VyPzogTWFya2VyQ29tcG9uZW50O1xuXG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcG9wdXBJbnN0YW5jZT86IFBvcHVwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmxuZ0xhdCAmJiB0aGlzLm1hcmtlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXJrZXIgYW5kIGxuZ0xhdCBpbnB1dCBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmxuZ0xhdCAmJiAhY2hhbmdlcy5sbmdMYXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFwKHRoaXMucG9wdXBJbnN0YW5jZSEpO1xuICAgICAgY29uc3QgcG9wdXBJbnN0YW5jZVRtcCA9IHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKHBvcHVwSW5zdGFuY2VUbXAsIGNoYW5nZXMubG5nTGF0LmN1cnJlbnRWYWx1ZSk7XG4gICAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSBwb3B1cEluc3RhbmNlVG1wO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXJrZXIgJiYgIWNoYW5nZXMubWFya2VyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgY29uc3QgcHJldmlvdXNNYXJrZXI6IE1hcmtlckNvbXBvbmVudCA9IGNoYW5nZXMubWFya2VyLnByZXZpb3VzVmFsdWU7XG4gICAgICBpZiAocHJldmlvdXNNYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcihwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UgJiYgdGhpcy5wb3B1cEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlLCB0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgdGhpcy5hZGRQb3B1cCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucG9wdXBJbnN0YW5jZSkge1xuICAgICAgaWYgKHRoaXMubG5nTGF0KSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUG9wdXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuTWFwU2VydmljZS5jcmVhdGVQb3B1cCh7XG4gICAgICBwb3B1cE9wdGlvbnM6IHtcbiAgICAgICAgY2xvc2VCdXR0b246IHRoaXMuY2xvc2VCdXR0b24sXG4gICAgICAgIGNsb3NlT25DbGljazogdGhpcy5jbG9zZU9uQ2xpY2ssXG4gICAgICAgIGFuY2hvcjogdGhpcy5hbmNob3IsXG4gICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXRcbiAgICAgIH0sXG4gICAgICBwb3B1cEV2ZW50czoge1xuICAgICAgICBvcGVuOiB0aGlzLm9wZW4sXG4gICAgICAgIGNsb3NlOiB0aGlzLmNsb3NlXG4gICAgICB9XG4gICAgfSwgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQb3B1cChwb3B1cDogUG9wdXApIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmxuZ0xhdCkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcChwb3B1cCwgdGhpcy5sbmdMYXQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSwgcG9wdXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2wtcG9wdXAgbmVlZCBlaXRoZXIgbG5nTGF0IG9yIG1hcmtlciB0byBiZSBzZXQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19