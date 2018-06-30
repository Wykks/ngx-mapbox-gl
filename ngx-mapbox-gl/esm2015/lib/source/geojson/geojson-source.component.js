/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MapService } from '../../map/map.service';
export class GeoJSONSourceComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService) {
        this.MapService = MapService;
        this.updateFeatureData = new Subject();
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
            this.sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
                /** @type {?} */
                const source = this.MapService.getSource(this.id);
                source.setData(/** @type {?} */ ((this.data)));
            });
            this.sourceAdded = true;
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
        if (this.sourceAdded) {
            this.sub.unsubscribe();
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
}
GeoJSONSourceComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-geojson-source',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUV2SCxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBT25ELE1BQU07Ozs7SUFvQkosWUFDVTtRQUFBLGVBQVUsR0FBVixVQUFVO2lDQVBBLElBQUksT0FBTyxFQUFFOzJCQUdYLEtBQUs7Z0NBQ0EsQ0FBQztLQUl2Qjs7OztJQUVMLFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRztnQkFDVixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixRQUFRLEVBQUUsRUFBRTthQUNiLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FB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TUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ2hDOzs7WUF4R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBTlEsVUFBVTs7O2lCQVNoQixLQUFLO21CQUdMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLOzRCQUNMLEtBQUs7NkJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9KU09OR2VvbWV0cnksIEdlb0pTT05Tb3VyY2UsIEdlb0pTT05Tb3VyY2VPcHRpb25zIH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1nZW9qc29uLXNvdXJjZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEdlb0pTT05Tb3VyY2VPcHRpb25zIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBkYXRhPzogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT05HZW9tZXRyeT4gfCBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT05HZW9tZXRyeT4gfCBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbnpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heHpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGJ1ZmZlcj86IG51bWJlcjtcbiAgQElucHV0KCkgdG9sZXJhbmNlPzogbnVtYmVyO1xuICBASW5wdXQoKSBjbHVzdGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2x1c3RlclJhZGl1cz86IG51bWJlcjtcbiAgQElucHV0KCkgY2x1c3Rlck1heFpvb20/OiBudW1iZXI7XG5cbiAgdXBkYXRlRmVhdHVyZURhdGEgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc291cmNlQWRkZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBmZWF0dXJlSWRDb3VudGVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICBmZWF0dXJlczogW11cbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuYWRkU291cmNlKHRoaXMuaWQsIHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICBidWZmZXI6IHRoaXMuYnVmZmVyLFxuICAgICAgICB0b2xlcmFuY2U6IHRoaXMudG9sZXJhbmNlLFxuICAgICAgICBjbHVzdGVyOiB0aGlzLmNsdXN0ZXIsXG4gICAgICAgIGNsdXN0ZXJSYWRpdXM6IHRoaXMuY2x1c3RlclJhZGl1cyxcbiAgICAgICAgY2x1c3Rlck1heFpvb206IHRoaXMuY2x1c3Rlck1heFpvb20sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViID0gdGhpcy51cGRhdGVGZWF0dXJlRGF0YS5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMClcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5NYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICAgICAgc291cmNlLnNldERhdGEodGhpcy5kYXRhISk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc291cmNlQWRkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5idWZmZXIgJiYgIWNoYW5nZXMuYnVmZmVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy50b2xlcmFuY2UgJiYgIWNoYW5nZXMudG9sZXJhbmNlLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jbHVzdGVyICYmICFjaGFuZ2VzLmNsdXN0ZXIuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNsdXN0ZXJSYWRpdXMgJiYgIWNoYW5nZXMuY2x1c3RlclJhZGl1cy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2x1c3Rlck1heFpvb20gJiYgIWNoYW5nZXMuY2x1c3Rlck1heFpvb20uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuTWFwU2VydmljZS5nZXRTb3VyY2U8R2VvSlNPTlNvdXJjZT4odGhpcy5pZCk7XG4gICAgICBzb3VyY2Uuc2V0RGF0YSh0aGlzLmRhdGEhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zb3VyY2VBZGRlZCkge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVTb3VyY2UodGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4pIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gPEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4+dGhpcy5kYXRhO1xuICAgIGNvbGxlY3Rpb24uZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQoKTtcbiAgfVxuXG4gIHJlbW92ZUZlYXR1cmUoZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+KSB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IDxHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uPEdlb0pTT04uR2VvbWV0cnlPYmplY3Q+PnRoaXMuZGF0YTtcbiAgICBjb25zdCBpbmRleCA9IGNvbGxlY3Rpb24uZmVhdHVyZXMuaW5kZXhPZihmZWF0dXJlKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgY29sbGVjdGlvbi5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQoKTtcbiAgfVxuXG4gIGdldE5ld0ZlYXR1cmVJZCgpIHtcbiAgICByZXR1cm4gKyt0aGlzLmZlYXR1cmVJZENvdW50ZXI7XG4gIH1cbn1cbiJdfQ==