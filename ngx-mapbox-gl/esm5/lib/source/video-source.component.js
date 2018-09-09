/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
var VideoSourceComponent = /** @class */ (function () {
    function VideoSourceComponent(MapService) {
        this.MapService = MapService;
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    VideoSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init();
            /** @type {?} */
            var sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getSource(_this.id); })).subscribe(function () {
                _this.init();
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    VideoSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["urls"] && !changes["urls"].isFirstChange() ||
            changes["coordinates"] && !changes["coordinates"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    };
    /**
     * @return {?}
     */
    VideoSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    };
    /**
     * @return {?}
     */
    VideoSourceComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.MapService.addSource(this.id, {
            type: 'video',
            urls: this.urls,
            coordinates: this.coordinates
        });
        this.sourceAdded = true;
    };
    VideoSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-video-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    VideoSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    VideoSourceComponent.propDecorators = {
        id: [{ type: Input }],
        urls: [{ type: Input }],
        coordinates: [{ type: Input }]
    };
    return VideoSourceComponent;
}());
export { VideoSourceComponent };
if (false) {
    /** @type {?} */
    VideoSourceComponent.prototype.id;
    /** @type {?} */
    VideoSourceComponent.prototype.urls;
    /** @type {?} */
    VideoSourceComponent.prototype.coordinates;
    /** @type {?} */
    VideoSourceComponent.prototype.sourceAdded;
    /** @type {?} */
    VideoSourceComponent.prototype.sub;
    /** @type {?} */
    VideoSourceComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tc291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvc291cmNlL3ZpZGVvLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUV2SCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztJQWtCOUMsOEJBQ1U7UUFBQSxlQUFVLEdBQVYsVUFBVTsyQkFKRSxLQUFLO21CQUNiLElBQUksWUFBWSxFQUFFO0tBSTNCOzs7O0lBRUwsdUNBQVE7OztJQUFSO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDbkMsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDOztZQUNaLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ2xFLE1BQU0sQ0FBQyxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxFQUEvQyxDQUErQyxDQUFDLENBQzlELENBQUMsU0FBUyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELDBDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixPQUFPO1NBQ1I7UUFDRCxJQUNFLE9BQU8sWUFBUyxDQUFDLE9BQU8sU0FBTSxhQUFhLEVBQUU7WUFDN0MsT0FBTyxtQkFBZ0IsQ0FBQyxPQUFPLGdCQUFhLGFBQWEsRUFBRSxFQUMzRDtZQUNBLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7OztJQUVELDBDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2QztLQUNGOzs7O0lBRU8sbUNBQUk7Ozs7UUFDVixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzlCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzs7Z0JBMUQzQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQU5RLFVBQVU7OztxQkFTaEIsS0FBSzt1QkFHTCxLQUFLOzhCQUNMLEtBQUs7OytCQWpCUjs7U0FXYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlkZW9Tb3VyY2VPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXZpZGVvLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVmlkZW9Tb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBWaWRlb1NvdXJjZU9wdGlvbnMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybHM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBjb29yZGluYXRlczogbnVtYmVyW11bXTtcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy51cmxzICYmICFjaGFuZ2VzLnVybHMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNvb3JkaW5hdGVzICYmICFjaGFuZ2VzLmNvb3JkaW5hdGVzLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgIHVybHM6IHRoaXMudXJscyxcbiAgICAgIGNvb3JkaW5hdGVzOiB0aGlzLmNvb3JkaW5hdGVzXG4gICAgfSk7XG4gICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==