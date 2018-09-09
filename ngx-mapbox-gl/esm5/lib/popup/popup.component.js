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
        if (this.lngLat && this.marker || this.feature && this.lngLat || this.feature && this.marker) {
            throw new Error('marker, lngLat, feature input are mutually exclusive');
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
        if (changes["lngLat"] && !changes["lngLat"].isFirstChange() ||
            changes["feature"] && !changes["feature"].isFirstChange()) {
            /** @type {?} */
            var newlngLat = changes["lngLat"] ? /** @type {?} */ ((this.lngLat)) : /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((this.feature)).geometry)).coordinates));
            this.MapService.removePopupFromMap(/** @type {?} */ ((this.popupInstance)), true);
            /** @type {?} */
            var popupInstanceTmp = this.createPopup();
            this.MapService.addPopupToMap(popupInstanceTmp, newlngLat, /** @type {?} */ ((this.popupInstance)).isOpen());
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
            if (_this.lngLat || _this.feature) {
                _this.MapService.addPopupToMap(popup, _this.lngLat ? _this.lngLat : /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((_this.feature)).geometry)).coordinates)));
            }
            else if (_this.marker && _this.marker.markerInstance) {
                _this.MapService.addPopupToMarker(_this.marker.markerInstance, popup);
            }
            else {
                throw new Error('mgl-popup need either lngLat/marker/feature to be set');
            }
        });
    };
    PopupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-popup',
                    template: '<div #content><ng-content></ng-content></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
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
        feature: [{ type: Input }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9wb3B1cC9wb3B1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBS0wsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUEwQjNELHdCQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7cUJBUkYsSUFBSSxZQUFZLEVBQVE7b0JBQ3pCLElBQUksWUFBWSxFQUFRO0tBUXBDOzs7O0lBRUwsaUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM1RixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDekU7S0FDRjs7Ozs7SUFFRCxvQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFDRSxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsYUFBYSxFQUFFO1lBQ2pELE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUUsRUFDbkQ7O1lBQ0EsSUFBTSxTQUFTLEdBQUcsT0FBTyxXQUFRLENBQUMsb0JBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRSxDQUFDLDBEQUFDLElBQUksQ0FBQyxPQUFPLEdBQUUsUUFBUSxHQUFFLFdBQVcsRUFBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtC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LENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDckU7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO2FBQzFFO1NBQ0YsQ0FBQyxDQUFDOzs7Z0JBaEdOLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLCtDQUErQztvQkFDekQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQVBRLFVBQVU7Ozs4QkFVaEIsS0FBSzsrQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFHTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFFTCxNQUFNO3VCQUNOLE1BQU07MEJBRU4sU0FBUyxTQUFDLFNBQVM7O3lCQXRDdEI7O1NBdUJhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvaW50TGlrZSwgUG9wdXAsIExuZ0xhdExpa2UgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1wb3B1cCcsXG4gIHRlbXBsYXRlOiAnPGRpdiAjY29udGVudD48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSBjbG9zZUJ1dHRvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsb3NlT25DbGljaz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuY2hvcj86ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JztcbiAgQElucHV0KCkgb2Zmc2V0PzogbnVtYmVyIHwgUG9pbnRMaWtlIHwgeyBbYW5jaG9yOiBzdHJpbmddOiBbbnVtYmVyLCBudW1iZXJdIH07XG5cbiAgLyogRHluYW1pYyBpbnB1dCAqL1xuICBASW5wdXQoKSBmZWF0dXJlPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+O1xuICBASW5wdXQoKSBsbmdMYXQ/OiBMbmdMYXRMaWtlO1xuICBASW5wdXQoKSBtYXJrZXI/OiBNYXJrZXJDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcblxuICBwb3B1cEluc3RhbmNlPzogUG9wdXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubG5nTGF0ICYmIHRoaXMubWFya2VyIHx8IHRoaXMuZmVhdHVyZSAmJiB0aGlzLmxuZ0xhdCB8fCB0aGlzLmZlYXR1cmUgJiYgdGhpcy5tYXJrZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWFya2VyLCBsbmdMYXQsIGZlYXR1cmUgaW5wdXQgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZScpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLmxuZ0xhdCAmJiAhY2hhbmdlcy5sbmdMYXQuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmZlYXR1cmUgJiYgIWNoYW5nZXMuZmVhdHVyZS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIGNvbnN0IG5ld2xuZ0xhdCA9IGNoYW5nZXMubG5nTGF0ID8gdGhpcy5sbmdMYXQhIDogdGhpcy5mZWF0dXJlIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMhO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVBvcHVwRnJvbU1hcCh0aGlzLnBvcHVwSW5zdGFuY2UhLCB0cnVlKTtcbiAgICAgIGNvbnN0IHBvcHVwSW5zdGFuY2VUbXAgPSB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcChwb3B1cEluc3RhbmNlVG1wLCBuZXdsbmdMYXQsIHRoaXMucG9wdXBJbnN0YW5jZSEuaXNPcGVuKCkpO1xuICAgICAgdGhpcy5wb3B1cEluc3RhbmNlID0gcG9wdXBJbnN0YW5jZVRtcDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubWFya2VyICYmICFjaGFuZ2VzLm1hcmtlci5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzTWFya2VyOiBNYXJrZXJDb21wb25lbnQgPSBjaGFuZ2VzLm1hcmtlci5wcmV2aW91c1ZhbHVlO1xuICAgICAgaWYgKHByZXZpb3VzTWFya2VyLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXJrZXIocHJldmlvdXNNYXJrZXIubWFya2VySW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlICYmIHRoaXMucG9wdXBJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkUG9wdXBUb01hcmtlcih0aGlzLm1hcmtlci5tYXJrZXJJbnN0YW5jZSwgdGhpcy5wb3B1cEluc3RhbmNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5wb3B1cEluc3RhbmNlID0gdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgIHRoaXMuYWRkUG9wdXAodGhpcy5wb3B1cEluc3RhbmNlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnBvcHVwSW5zdGFuY2UpIHtcbiAgICAgIGlmICh0aGlzLmxuZ0xhdCkge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlUG9wdXBGcm9tTWFwKHRoaXMucG9wdXBJbnN0YW5jZSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubWFya2VyICYmIHRoaXMubWFya2VyLm1hcmtlckluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVQb3B1cEZyb21NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBvcHVwSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVBvcHVwKCkge1xuICAgIHJldHVybiB0aGlzLk1hcFNlcnZpY2UuY3JlYXRlUG9wdXAoe1xuICAgICAgcG9wdXBPcHRpb25zOiB7XG4gICAgICAgIGNsb3NlQnV0dG9uOiB0aGlzLmNsb3NlQnV0dG9uLFxuICAgICAgICBjbG9zZU9uQ2xpY2s6IHRoaXMuY2xvc2VPbkNsaWNrLFxuICAgICAgICBhbmNob3I6IHRoaXMuYW5jaG9yLFxuICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0XG4gICAgICB9LFxuICAgICAgcG9wdXBFdmVudHM6IHtcbiAgICAgICAgb3BlbjogdGhpcy5vcGVuLFxuICAgICAgICBjbG9zZTogdGhpcy5jbG9zZVxuICAgICAgfVxuICAgIH0sIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUG9wdXAocG9wdXA6IFBvcHVwKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5sbmdMYXQgfHwgdGhpcy5mZWF0dXJlKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRQb3B1cFRvTWFwKHBvcHVwLCB0aGlzLmxuZ0xhdCA/IHRoaXMubG5nTGF0IDogdGhpcy5mZWF0dXJlIS5nZW9tZXRyeSEuY29vcmRpbmF0ZXMhKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXJrZXIgJiYgdGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFBvcHVwVG9NYXJrZXIodGhpcy5tYXJrZXIubWFya2VySW5zdGFuY2UsIHBvcHVwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWdsLXBvcHVwIG5lZWQgZWl0aGVyIGxuZ0xhdC9tYXJrZXIvZmVhdHVyZSB0byBiZSBzZXQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19