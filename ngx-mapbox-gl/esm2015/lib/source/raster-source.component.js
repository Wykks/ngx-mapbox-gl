/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
export class RasterSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService) {
        this.MapService = MapService;
        this.type = 'raster';
        this.sourceAdded = false;
        this.sub = new Subscription();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.init();
            /** @type {?} */
            const sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getSource(this.id))).subscribe(() => {
                this.init();
            });
            this.sub.add(sub);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
        if (this.sourceAdded) {
            this.MapService.removeSource(this.id);
        }
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        const source = {
            type: this.type,
            url: this.url,
            tiles: this.tiles,
            bounds: this.bounds,
            minzoom: this.minzoom,
            maxzoom: this.maxzoom,
            tileSize: this.tileSize
        };
        this.MapService.addSource(this.id, source);
        this.sourceAdded = true;
    }
}
RasterSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-raster-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
RasterSourceComponent.ctorParameters = () => [
    { type: MapService }
];
RasterSourceComponent.propDecorators = {
    id: [{ type: Input }],
    url: [{ type: Input }],
    tiles: [{ type: Input }],
    bounds: [{ type: Input }],
    minzoom: [{ type: Input }],
    maxzoom: [{ type: Input }],
    tileSize: [{ type: Input }]
};
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
    RasterSourceComponent.prototype.sub;
    /** @type {?} */
    RasterSourceComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFzdGVyLXNvdXJjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZS9yYXN0ZXItc291cmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQStDLE1BQU0sZUFBZSxDQUFDO0FBRXZILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFPaEQsTUFBTTs7OztJQWlCSixZQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7b0JBTkgsUUFBUTsyQkFFSCxLQUFLO21CQUNiLElBQUksWUFBWSxFQUFFO0tBSTNCOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDeEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOztZQUNaLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ2xFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDOUQsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixPQUFPO1NBQ1I7UUFDRCxJQUNFLE9BQU8sV0FBUSxDQUFDLE9BQU8sUUFBSyxhQUFhLEVBQUU7WUFDM0MsT0FBTyxhQUFVLENBQUMsT0FBTyxVQUFPLGFBQWEsRUFBRTtZQUMvQyxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsYUFBYSxFQUFFO1lBQ2pELE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUU7WUFDbkQsT0FBTyxlQUFZLENBQUMsT0FBTyxZQUFTLGFBQWEsRUFBRTtZQUNuRCxPQUFPLGdCQUFhLENBQUMsT0FBTyxhQUFVLGFBQWEsRUFBRSxFQUNyRDtZQUNBLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDRjs7OztJQUVPLElBQUk7O1FBQ1YsTUFBTSxNQUFNLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzs7O1lBekUzQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFOUSxVQUFVOzs7aUJBU2hCLEtBQUs7a0JBR0wsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFzdGVyU291cmNlIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXJhc3Rlci1zb3VyY2UnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFJhc3RlclNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFJhc3RlclNvdXJjZSB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpbGVzPzogc3RyaW5nW107XG4gIEBJbnB1dCgpIGJvdW5kcz86IG51bWJlcltdO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSB0aWxlU2l6ZT86IG51bWJlcjtcblxuICB0eXBlOiAncmFzdGVyJyA9ICdyYXN0ZXInOyAvLyBKdXN0IHRvIG1ha2UgdHMgaGFwcHlcblxuICBwcml2YXRlIHNvdXJjZUFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy51cmwgJiYgIWNoYW5nZXMudXJsLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50aWxlcyAmJiAhY2hhbmdlcy50aWxlcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuYm91bmRzICYmICFjaGFuZ2VzLmJvdW5kcy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5tYXh6b29tICYmICFjaGFuZ2VzLm1heHpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRpbGVTaXplICYmICFjaGFuZ2VzLnRpbGVTaXplLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICB0aWxlczogdGhpcy50aWxlcyxcbiAgICAgIGJvdW5kczogdGhpcy5ib3VuZHMsXG4gICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20sXG4gICAgICBtYXh6b29tOiB0aGlzLm1heHpvb20sXG4gICAgICB0aWxlU2l6ZTogdGhpcy50aWxlU2l6ZVxuICAgIH07XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZFNvdXJjZSh0aGlzLmlkLCBzb3VyY2UpO1xuICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=