/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MapService } from '../../map/map.service';
var GeoJSONSourceComponent = /** @class */ (function () {
    function GeoJSONSourceComponent(MapService) {
        this.MapService = MapService;
        this.updateFeatureData = new Subject();
        this.sourceAdded = false;
        this.featureIdCounter = 0;
    }
    /**
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.data) {
            this.data = {
                type: 'FeatureCollection',
                features: []
            };
        }
        this.MapService.mapLoaded$.subscribe(function () {
            _this.MapService.addSource(_this.id, {
                type: 'geojson',
                data: _this.data,
                maxzoom: _this.maxzoom,
                minzoom: _this.minzoom,
                buffer: _this.buffer,
                tolerance: _this.tolerance,
                cluster: _this.cluster,
                clusterRadius: _this.clusterRadius,
                clusterMaxZoom: _this.clusterMaxZoom,
            });
            _this.sub = _this.updateFeatureData.pipe(debounceTime(0)).subscribe(function () {
                /** @type {?} */
                var source = _this.MapService.getSource(_this.id);
                source.setData(/** @type {?} */ ((_this.data)));
            });
            _this.sourceAdded = true;
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
            var source = this.MapService.getSource(this.id);
            source.setData(/** @type {?} */ ((this.data)));
        }
    };
    /**
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.sourceAdded) {
            this.sub.unsubscribe();
            this.MapService.removeSource(this.id);
        }
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.addFeature = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /** @type {?} */
        var collection = /** @type {?} */ (this.data);
        collection.features.push(feature);
        this.updateFeatureData.next();
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.removeFeature = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /** @type {?} */
        var collection = /** @type {?} */ (this.data);
        /** @type {?} */
        var index = collection.features.indexOf(feature);
        if (index > -1) {
            collection.features.splice(index, 1);
        }
        this.updateFeatureData.next();
    };
    /**
     * @return {?}
     */
    GeoJSONSourceComponent.prototype.getNewFeatureId = /**
     * @return {?}
     */
    function () {
        return ++this.featureIdCounter;
    };
    GeoJSONSourceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-geojson-source',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    GeoJSONSourceComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
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
    return GeoJSONSourceComponent;
}());
export { GeoJSONSourceComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUV2SCxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQTJCakQsZ0NBQ1U7UUFBQSxlQUFVLEdBQVYsVUFBVTtpQ0FQQSxJQUFJLE9BQU8sRUFBRTsyQkFHWCxLQUFLO2dDQUNBLENBQUM7S0FJdkI7Ozs7SUFFTCx5Q0FBUTs7O0lBQVI7UUFBQSxpQkEyQkM7UUExQkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDbkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJO2dCQUNmLE9BQU8sRUFBRSxLQUFJLENBQUMsT0FBTztnQkFDckIsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO2dCQUNyQixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU07Z0JBQ25CLFNBQVMsRUFBRSxLQUFJLENBQUMsU0FBUztnQkFDekIsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO2dCQUNyQixhQUFhLEVBQUUsS0FBSSxDQUFDLGFBQWE7Z0JBQ2pDLGNBQWMsRUFBRSxLQUFJLENBQUMsY0FBYzthQUNwQyxDQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQ3BDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FDaEIsQ0FBQyxTQUFTLENBQUM7O2dCQUNWLElBQU0sTUFBTSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFnQixLQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxPQUFPLG9CQUFDLEtBQUksQ0FBQyxJQUFJLEdBQUUsQ0FBQzthQUM1QixDQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6QixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCw0Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUM7U0FDUjtRQUNELEVBQUUsQ0FBQyxDQUNELE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUU7WUFDbkQsT0FBTyxlQUFZLENBQUMsT0FBTyxZQUFTLGFBQWEsRUFBRTtZQUNuRCxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsYUFBYSxFQUFFO1lBQ2pELE9BQU8saUJBQWMsQ0FBQyxPQUFPLGNBQVcsYUFBYSxFQUFFO1lBQ3ZELE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQUU7WUFDbkQsT0FBTyxxQkFBa0IsQ0FBQyxPQUFPLGtCQUFlLGFBQWEsRUFBRTtZQUMvRCxPQUFPLHNCQUFtQixDQUFDLE9BQU8sbUJBQWdCLGFBQWEsRUFDakUsQ0FBQyxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFTLENBQUMsT0FBTyxTQUFNLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFDbEQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQWdCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsT0FBTyxvQkFBQyxJQUFJLENBQUMsSUFBSSxHQUFFLENBQUM7U0FDNUI7S0FDRjs7OztJQUVELDRDQUFXOzs7SUFBWDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7Ozs7O0lBRUQsMkNBQVU7Ozs7SUFBVixVQUFXLE9BQWdEOztRQUN6RCxJQUFNLFVBQVUscUJBQXNELElBQUksQ0FBQyxJQUFJLEVBQUM7UUFDaEYsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELDhDQUFhOzs7O0lBQWIsVUFBYyxPQUFnRDs7UUFDNUQsSUFBTSxVQUFVLHFCQUFzRCxJQUFJLENBQUMsSUFBSSxFQUFDOztRQUNoRixJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO0tBQy9COzs7O0lBRUQsZ0RBQWU7OztJQUFmO1FBQ0UsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ2hDOztnQkF4R0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFOUSxVQUFVOzs7cUJBU2hCLEtBQUs7dUJBR0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7Z0NBQ0wsS0FBSztpQ0FDTCxLQUFLOztpQ0F2QlI7O1NBV2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb0pTT05HZW9tZXRyeSwgR2VvSlNPTlNvdXJjZSwgR2VvSlNPTlNvdXJjZU9wdGlvbnMgfSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWdlb2pzb24tc291cmNlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHZW9KU09OU291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgR2VvSlNPTlNvdXJjZU9wdGlvbnMge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIGRhdGE/OiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTkdlb21ldHJ5PiB8IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTkdlb21ldHJ5PiB8IHN0cmluZztcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgYnVmZmVyPzogbnVtYmVyO1xuICBASW5wdXQoKSB0b2xlcmFuY2U/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNsdXN0ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBjbHVzdGVyUmFkaXVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBjbHVzdGVyTWF4Wm9vbT86IG51bWJlcjtcblxuICB1cGRhdGVGZWF0dXJlRGF0YSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzb3VyY2VBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGZlYXR1cmVJZENvdW50ZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5kYXRhKSB7XG4gICAgICB0aGlzLmRhdGEgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgIGZlYXR1cmVzOiBbXVxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRTb3VyY2UodGhpcy5pZCwge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20sXG4gICAgICAgIGJ1ZmZlcjogdGhpcy5idWZmZXIsXG4gICAgICAgIHRvbGVyYW5jZTogdGhpcy50b2xlcmFuY2UsXG4gICAgICAgIGNsdXN0ZXI6IHRoaXMuY2x1c3RlcixcbiAgICAgICAgY2x1c3RlclJhZGl1czogdGhpcy5jbHVzdGVyUmFkaXVzLFxuICAgICAgICBjbHVzdGVyTWF4Wm9vbTogdGhpcy5jbHVzdGVyTWF4Wm9vbSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIgPSB0aGlzLnVwZGF0ZUZlYXR1cmVEYXRhLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgwKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLk1hcFNlcnZpY2UuZ2V0U291cmNlPEdlb0pTT05Tb3VyY2U+KHRoaXMuaWQpO1xuICAgICAgICBzb3VyY2Uuc2V0RGF0YSh0aGlzLmRhdGEhKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zb3VyY2VBZGRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMubWF4em9vbSAmJiAhY2hhbmdlcy5tYXh6b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmJ1ZmZlciAmJiAhY2hhbmdlcy5idWZmZXIuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnRvbGVyYW5jZSAmJiAhY2hhbmdlcy50b2xlcmFuY2UuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmNsdXN0ZXIgJiYgIWNoYW5nZXMuY2x1c3Rlci5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMuY2x1c3RlclJhZGl1cyAmJiAhY2hhbmdlcy5jbHVzdGVyUmFkaXVzLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5jbHVzdGVyTWF4Wm9vbSAmJiAhY2hhbmdlcy5jbHVzdGVyTWF4Wm9vbS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5NYXBTZXJ2aWNlLmdldFNvdXJjZTxHZW9KU09OU291cmNlPih0aGlzLmlkKTtcbiAgICAgIHNvdXJjZS5zZXREYXRhKHRoaXMuZGF0YSEpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNvdXJjZUFkZGVkKSB7XG4gICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZVNvdXJjZSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICBhZGRGZWF0dXJlKGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pikge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSA8R2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pj50aGlzLmRhdGE7XG4gICAgY29sbGVjdGlvbi5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgIHRoaXMudXBkYXRlRmVhdHVyZURhdGEubmV4dCgpO1xuICB9XG5cbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4pIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gPEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4+dGhpcy5kYXRhO1xuICAgIGNvbnN0IGluZGV4ID0gY29sbGVjdGlvbi5mZWF0dXJlcy5pbmRleE9mKGZlYXR1cmUpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjb2xsZWN0aW9uLmZlYXR1cmVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlRmVhdHVyZURhdGEubmV4dCgpO1xuICB9XG5cbiAgZ2V0TmV3RmVhdHVyZUlkKCkge1xuICAgIHJldHVybiArK3RoaXMuZmVhdHVyZUlkQ291bnRlcjtcbiAgfVxufVxuIl19