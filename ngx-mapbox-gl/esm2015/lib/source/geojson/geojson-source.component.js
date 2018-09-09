/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';
export class GeoJSONSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService) {
        this.MapService = MapService;
        this.updateFeatureData = new Subject();
        this.sub = new Subscription();
        this.sourceAdded = false;
        this.featureIdCounter = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.data) {
            this.data = {
                type: 'FeatureCollection',
                features: []
            };
        }
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
        if (changes["maxzoom"] && !changes["maxzoom"].isFirstChange() ||
            changes["minzoom"] && !changes["minzoom"].isFirstChange() ||
            changes["buffer"] && !changes["buffer"].isFirstChange() ||
            changes["tolerance"] && !changes["tolerance"].isFirstChange() ||
            changes["cluster"] && !changes["cluster"].isFirstChange() ||
            changes["clusterRadius"] && !changes["clusterRadius"].isFirstChange() ||
            changes["clusterMaxZoom"] && !changes["clusterMaxZoom"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
        if (changes["data"] && !changes["data"].isFirstChange()) {
            /** @type {?} */
            const source = this.MapService.getSource(this.id);
            source.setData(/** @type {?} */ ((this.data)));
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
     * @param {?} feature
     * @return {?}
     */
    addFeature(feature) {
        /** @type {?} */
        const collection = /** @type {?} */ (this.data);
        collection.features.push(feature);
        this.updateFeatureData.next();
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    removeFeature(feature) {
        /** @type {?} */
        const collection = /** @type {?} */ (this.data);
        /** @type {?} */
        const index = collection.features.indexOf(feature);
        if (index > -1) {
            collection.features.splice(index, 1);
        }
        this.updateFeatureData.next();
    }
    /**
     * @return {?}
     */
    getNewFeatureId() {
        return ++this.featureIdCounter;
    }
    /**
     * @return {?}
     */
    init() {
        this.MapService.addSource(this.id, {
            type: 'geojson',
            data: this.data,
            maxzoom: this.maxzoom,
            minzoom: this.minzoom,
            buffer: this.buffer,
            tolerance: this.tolerance,
            cluster: this.cluster,
            clusterRadius: this.clusterRadius,
            clusterMaxZoom: this.clusterMaxZoom,
        });
        /** @type {?} */
        const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
            /** @type {?} */
            const source = this.MapService.getSource(this.id);
            source.setData(/** @type {?} */ ((this.data)));
        });
        this.sub.add(sub);
        this.sourceAdded = true;
    }
}
GeoJSONSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-geojson-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
GeoJSONSourceComponent.ctorParameters = () => [
    { type: MapService }
];
GeoJSONSourceComponent.propDecorators = {
    id: [{ type: Input }],
    data: [{ type: Input }],
    minzoom: [{ type: Input }],
    maxzoom: [{ type: Input }],
    buffer: [{ type: Input }],
    tolerance: [{ type: Input }],
    cluster: [{ type: Input }],
    clusterRadius: [{ type: Input }],
    clusterMaxZoom: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    GeoJSONSourceComponent.prototype.id;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.data;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.minzoom;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.maxzoom;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.buffer;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.tolerance;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.cluster;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.clusterRadius;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.clusterMaxZoom;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.updateFeatureData;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.sub;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.sourceAdded;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.featureIdCounter;
    /** @type {?} */
    GeoJSONSourceComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUV2SCxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFPbkQsTUFBTTs7OztJQW9CSixZQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7aUNBUEEsSUFBSSxPQUFPLEVBQUU7bUJBRW5CLElBQUksWUFBWSxFQUFFOzJCQUNWLEtBQUs7Z0NBQ0EsQ0FBQztLQUl2Qjs7OztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7WUFDWixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNsRSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUs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U0FDcEMsQ0FBQyxDQUFDOztRQUNILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTs7WUFDdEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsT0FBTyxvQkFBQyxJQUFJLENBQUMsSUFBSSxHQUFFLENBQUM7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Ozs7WUFoSDNCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUUsRUFBRTtnQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQU5RLFVBQVU7OztpQkFTaEIsS0FBSzttQkFHTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztxQkFDTCxLQUFLO3dCQUNMLEtBQUs7c0JBQ0wsS0FBSzs0QkFDTCxLQUFLOzZCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2VvSlNPTlNvdXJjZSwgR2VvSlNPTlNvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1nZW9qc29uLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEdlb0pTT05Tb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBkYXRhPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnk+IHwgR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5PiB8IHN0cmluZztcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgYnVmZmVyPzogbnVtYmVyO1xuICBASW5wdXQoKSB0b2xlcmFuY2U/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNsdXN0ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBjbHVzdGVyUmFkaXVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBjbHVzdGVyTWF4Wm9vbT86IG51bWJlcjtcblxuICB1cGRhdGVGZWF0dXJlRGF0YSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBmZWF0dXJlSWRDb3VudGVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICBmZWF0dXJlczogW11cbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIGNvbnN0IHN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRTb3VyY2UodGhpcy5pZCkpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5tYXh6b29tICYmICFjaGFuZ2VzLm1heHpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuYnVmZmVyICYmICFjaGFuZ2VzLmJ1ZmZlci5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMudG9sZXJhbmNlICYmICFjaGFuZ2VzLnRvbGVyYW5jZS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2x1c3RlciAmJiAhY2hhbmdlcy5jbHVzdGVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jbHVzdGVyUmFkaXVzICYmICFjaGFuZ2VzLmNsdXN0ZXJSYWRpdXMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNsdXN0ZXJNYXhab29tICYmICFjaGFuZ2VzLmNsdXN0ZXJNYXhab29tLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLk1hcFNlcnZpY2UuZ2V0U291cmNlPEdlb0pTT05Tb3VyY2U+KHRoaXMuaWQpO1xuICAgICAgc291cmNlLnNldERhdGEodGhpcy5kYXRhISk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICBhZGRGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSA8R2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pj50aGlzLmRhdGE7XG4gICAgY29sbGVjdGlvbi5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgIHRoaXMudXBkYXRlRmVhdHVyZURhdGEubmV4dCgpO1xuICB9XG5cbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4pIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gPEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4+dGhpcy5kYXRhO1xuICAgIGNvbnN0IGluZGV4ID0gY29sbGVjdGlvbi5mZWF0dXJlcy5pbmRleE9mKGZlYXR1cmUpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjb2xsZWN0aW9uLmZlYXR1cmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlRmVhdHVyZURhdGEubmV4dCgpO1xuICB9XG5cbiAgZ2V0TmV3RmVhdHVyZUlkKCkge1xuICAgIHJldHVybiArK3RoaXMuZmVhdHVyZUlkQ291bnRlcjtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgIGJ1ZmZlcjogdGhpcy5idWZmZXIsXG4gICAgICB0b2xlcmFuY2U6IHRoaXMudG9sZXJhbmNlLFxuICAgICAgY2x1c3RlcjogdGhpcy5jbHVzdGVyLFxuICAgICAgY2x1c3RlclJhZGl1czogdGhpcy5jbHVzdGVyUmFkaXVzLFxuICAgICAgY2x1c3Rlck1heFpvb206IHRoaXMuY2x1c3Rlck1heFpvb20sXG4gICAgfSk7XG4gICAgY29uc3Qgc3ViID0gdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5waXBlKGRlYm91bmNlVGltZSgwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuTWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBzb3VyY2Uuc2V0RGF0YSh0aGlzLmRhdGEhKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1Yi5hZGQoc3ViKTtcbiAgICB0aGlzLnNvdXJjZUFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIl19