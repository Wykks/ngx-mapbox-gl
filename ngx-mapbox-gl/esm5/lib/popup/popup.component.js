/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
var PopupComponent = /** @class */ (function () {
    function PopupComponent(MapService) {
        this.MapService = MapService;
        this.close = new EventEmitter();
        this.open = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PopupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.lngLat && this.marker) {
            throw new Error('marker and lngLat input are mutually exclusive');
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PopupComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange()) {
            this.MapService.removePopupFromMap(/** @type {?} */ ((this.popupInstance)));
            /** @type {?} */
            var popupInstanceTmp = this.createPopup();
            this.MapService.addPopupToMap(popupInstanceTmp, changes["lngLat"].currentValue);
            this.popupInstance = popupInstanceTmp;
        }
        if (changes["marker"] && !changes["marker"].isFirstChange()) {
            /** @type {?} */
            var previousMarker = changes["marker"].previousValue;
            if (previousMarker.markerInstance) {
                this.MapService.removePopupFromMarker(previousMarker.markerInstance);
            }
            if (this.marker && this.marker.markerInstance && this.popupInstance) {
                this.MapService.addPopupToMarker(this.marker.markerInstance, this.popupInstance);
            }
        }
    };
    /**
     * @return {?}
     */
    PopupComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.popupInstance = this.createPopup();
        this.addPopup(this.popupInstance);
    };
    /**
     * @return {?}
     */
    PopupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.popupInstance) {
            if (this.lngLat) {
                this.MapService.removePopupFromMap(this.popupInstance);
            }
            else if (this.marker && this.marker.markerInstance) {
                this.MapService.removePopupFromMarker(this.marker.markerInstance);
            }
        }
        this.popupInstance = undefined;
    };
    /**
     * @return {?}
     */
    PopupComponent.prototype.createPopup = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} popup
     * @return {?}
     */
    PopupComponent.prototype.addPopup = /**
     * @param {?} popup
     * @return {?}
     */
    function (popup) {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            if (_this.lngLat) {
                _this.MapService.addPopupToMap(popup, _this.lngLat);
            }
            else if (_this.marker && _this.marker.markerInstance) {
                _this.MapService.addPopupToMarker(_this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat or marker to be set');
            }
        });
    };
    PopupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-popup',
                    template: '<div #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
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
    return PopupComponent;
}());
export { PopupComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9wb3B1cC9wb3B1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBS0wsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUF5QjNELHdCQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7cUJBUkYsSUFBSSxZQUFZLEVBQVE7b0JBQ3pCLElBQUksWUFBWSxFQUFRO0tBUXBDOzs7O0lBRUwsaUNBQVE7OztJQUFSO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7U0FDbkU7S0FDRjs7Ozs7SUFFRCxvQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixvQkFBQyxJQUFJLENBQUMsYUFBYSxHQUFFLENBQUM7O1lBQ3hELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sV0FBUSxZQUFZLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDO1NBQ3ZDO1FB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UyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBUFEsVUFBVTs7OzhCQVVoQixLQUFLOytCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUdMLEtBQUs7eUJBQ0wsS0FBSzt3QkFFTCxNQUFNO3VCQUNOLE1BQU07MEJBRU4sU0FBUyxTQUFDLFNBQVM7O3lCQXJDdEI7O1NBdUJhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvaW50TGlrZSwgUG9wdXAsIExuZ0xhdExpa2UgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1wb3B1cCcsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSBjbG9zZUJ1dHRvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsb3NlT25DbGljaz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuY2hvcj86ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JztcbiAgQElucHV0KCkgb2Zmc2V0PzogbnVtYmVyIHwgUG9pbnRMaWtlIHwgeyBbYW5jaG9yOiBzdHJpbmddOiBbbnVtYmVyLCBudW1iZXJdIH07XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBASW5wdXQoKSBsbmdMYXQ/OiBMbmdMYXRMaWtlO1xuICBASW5wdXQoKSBtYXJrZXI/OiBNYXJrZXJDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBwb3B1cEluc3RhbmNlPzogUG9wdXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubG5nTGF0ICYmIHRoaXMubWFya2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hcmtlciBhbmQgbG5nTGF0IGlucHV0IGFyZSBtdXR1YWxseSBleGNsdXNpdmUnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMubG5nTGF0ICYmICFjaGFuZ2VzLmxuZ0xhdC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXAodGhpcy5wb3B1cEluc3RhbmNlISk7XG4gICAgICBjb25zdCBwb3B1cEluc3RhbmNlVG1wID0gdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXAocG9wdXBJbnN0YW5jZVRtcCwgY2hhbmdlcy5sbmdMYXQuY3VycmVudFZhbHVlKTtcbiAgICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHBvcHVwSW5zdGFuY2VUbXA7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1hcmtlciAmJiAhY2hhbmdlcy5tYXJrZXIuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjb25zdCBwcmV2aW91c01hcmtlcjogTWFya2VyQ29tcG9uZW50ID0gY2hhbmdlcy5tYXJrZXIucHJldmlvdXNWYWx1ZTtcbiAgICAgIGlmIChwcmV2aW91c01hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFya2VyKHByZXZpb3VzTWFya2VyLm1hcmtlckluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSAmJiB0aGlzLnBvcHVwSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UsIHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMucG9wdXBJbnN0YW5jZSA9IHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICB0aGlzLmFkZFBvcHVwKHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5wb3B1cEluc3RhbmNlKSB7XG4gICAgICBpZiAodGhpcy5sbmdMYXQpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcCh0aGlzLnBvcHVwSW5zdGFuY2UpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcmtlciAmJiB0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wb3B1cEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQb3B1cCgpIHtcbiAgICByZXR1cm4gdGhpcy5NYXBTZXJ2aWNlLmNyZWF0ZVBvcHVwKHtcbiAgICAgIHBvcHVwT3B0aW9uczoge1xuICAgICAgICBjbG9zZUJ1dHRvbjogdGhpcy5jbG9zZUJ1dHRvbixcbiAgICAgICAgY2xvc2VPbkNsaWNrOiB0aGlzLmNsb3NlT25DbGljayxcbiAgICAgICAgYW5jaG9yOiB0aGlzLmFuY2hvcixcbiAgICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldFxuICAgICAgfSxcbiAgICAgIHBvcHVwRXZlbnRzOiB7XG4gICAgICAgIG9wZW46IHRoaXMub3BlbixcbiAgICAgICAgY2xvc2U6IHRoaXMuY2xvc2VcbiAgICAgIH1cbiAgICB9LCB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGFkZFBvcHVwKHBvcHVwOiBQb3B1cCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubG5nTGF0KSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKHBvcHVwLCB0aGlzLmxuZ0xhdCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFya2VyKHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlLCBwb3B1cCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbC1wb3B1cCBuZWVkIGVpdGhlciBsbmdMYXQgb3IgbWFya2VyIHRvIGJlIHNldCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=