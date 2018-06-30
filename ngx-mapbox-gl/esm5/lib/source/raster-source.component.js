/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MapService } from '../map/map.service';
var RasterSourceComponent = /** @class */ (function () {
    function RasterSourceComponent(MapService) {
        this.MapService = MapService;
        this.type = 'raster';
        this.sourceAdded = false;
    }
    /**
     * @return {?}
     */
    RasterSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            /** @type {?} */
            var source = {
                type: _this.type,
                url: _this.url,
                tiles: _this.tiles,
                bounds: _this.bounds,
                minzoom: _this.minzoom,
                maxzoom: _this.maxzoom,
                tileSize: _this.tileSize
            };
            _this.MapService.addSource(_this.id, source);
            _this.sourceAdded = true;
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    RasterSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.sourceAdded) {
            return;
        }
        if (changes["url"] && !changes["url"].isFirstChange() ||
            changes["tiles"] && !changes["tiles"].isFirstChange() ||
            changes["bounds"] && !changes["bounds"].isFirstChange() ||
            changes["minzoom"] && !changes["minzoom"].isFirstChange() ||
            changes["maxzoom"] && !changes["maxzoom"].isFirstChange() ||
            changes["tileSize"] && !changes["tileSize"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    };
    /**
     * @return {?}
     */
    RasterSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    };
    RasterSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-raster-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    RasterSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    RasterSourceComponent.propDecorators = {
        id: [{ type: Input }],
        url: [{ type: Input }],
        tiles: [{ type: Input }],
        bounds: [{ type: Input }],
        minzoom: [{ type: Input }],
        maxzoom: [{ type: Input }],
        tileSize: [{ type: Input }]
    };
    return RasterSourceComponent;
}());
export { RasterSourceComponent };
if (false) {
    /** @type {?} */
    RasterSourceComponent.prototype.id;
    /** @type {?} */
    RasterSourceComponent.prototype.url;
    /** @type {?} */
    RasterSourceComponent.prototype.tiles;
    /** @type {?} */
    RasterSourceComponent.prototype.bounds;
    /** @type {?} */
    RasterSourceComponent.prototype.minzoom;
    /** @type {?} */
    RasterSourceComponent.prototype.maxzoom;
    /** @type {?} */
    RasterSourceComponent.prototype.tileSize;
    /** @type {?} */
    RasterSourceComponent.prototype.type;
    /** @type {?} */
    RasterSourceComponent.prototype.sourceAdded;
    /** @type {?} */
    RasterSourceComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFzdGVyLXNvdXJjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZS9yYXN0ZXItc291cmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQStDLE1BQU0sZUFBZSxDQUFDO0FBRXZILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUF1QjlDLCtCQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7b0JBTEgsUUFBUTsyQkFFSCxLQUFLO0tBSXRCOzs7O0lBRUwsd0NBQVE7OztJQUFSO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7O1lBQ25DLElBQU0sTUFBTSxHQUFHO2dCQUNiLElBQUksRUFBRSxLQUFJLENBQUMsSUFBSTtnQkFDZixHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUc7Z0JBQ2IsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTztnQkFDckIsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO2dCQUNyQixRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztZQUNGLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDekIsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsMkNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDO1NBQ1I7UUFDRCxFQUFFLENBQUMsQ0FDRCxPQUFPLFdBQVEsQ0FBQyxPQUFPLFFBQUssYUFBYSxFQUFFO1lBQzNDLE9BQU8sYUFBVSxDQUFDLE9BQU8sVUFBTyxhQUFhLEVBQUU7WUFDL0MsT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRTtZQUNqRCxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFO1lBQ25ELE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUU7WUFDbkQsT0FBTyxnQkFBYSxDQUFDLE9BQU8sYUFBVSxhQUFhLEVBQ3JELENBQUMsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtLQUNGOzs7O0lBRUQsMkNBQVc7OztJQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7O2dCQTlERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQU5RLFVBQVU7OztxQkFTaEIsS0FBSztzQkFHTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs7Z0NBbkJSOztTQVNhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSYXN0ZXJTb3VyY2UgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1yYXN0ZXItc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBSYXN0ZXJTb3VyY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBSYXN0ZXJTb3VyY2Uge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICBASW5wdXQoKSB0aWxlcz86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBib3VuZHM/OiBudW1iZXJbXTtcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgdGlsZVNpemU/OiBudW1iZXI7XG5cbiAgdHlwZTogJ3Jhc3RlcicgPSAncmFzdGVyJzsgLy8gSnVzdCB0byBtYWtlIHRzIGhhcHB5XG5cbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB7XG4gICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgdGlsZXM6IHRoaXMudGlsZXMsXG4gICAgICAgIGJvdW5kczogdGhpcy5ib3VuZHMsXG4gICAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgICB0aWxlU2l6ZTogdGhpcy50aWxlU2l6ZVxuICAgICAgfTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwgc291cmNlKTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRpbGVzICYmICFjaGFuZ2VzLnRpbGVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5ib3VuZHMgJiYgIWNoYW5nZXMuYm91bmRzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudGlsZVNpemUgJiYgIWNoYW5nZXMudGlsZVNpemUuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG59XG4iXX0=