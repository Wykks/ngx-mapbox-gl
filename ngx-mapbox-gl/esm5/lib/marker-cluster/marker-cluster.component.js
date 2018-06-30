/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, EventEmitter, Input, NgZone, Output, TemplateRef } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import supercluster from 'supercluster';
import { MapService } from '../map/map.service';
var PointDirective = /** @class */ (function () {
    function PointDirective() {
    }
    PointDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[mglPoint]' },] },
    ];
    return PointDirective;
}());
export { PointDirective };
var ClusterPointDirective = /** @class */ (function () {
    function ClusterPointDirective() {
    }
    ClusterPointDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[mglClusterPoint]' },] },
    ];
    return ClusterPointDirective;
}());
export { ClusterPointDirective };
var MarkerClusterComponent = /** @class */ (function () {
    function MarkerClusterComponent(MapService, ChangeDetectorRef, zone) {
        var _this = this;
        this.MapService = MapService;
        this.ChangeDetectorRef = ChangeDetectorRef;
        this.zone = zone;
        this.load = new EventEmitter();
        this.sub = new Subscription();
        this.getLeavesFn = function (feature) {
            return function (limit, offset) { return (/** @type {?} */ (_this.supercluster.getLeaves))(/** @type {?} */ ((feature.properties.cluster_id)), limit, offset); };
        };
        this.getChildrenFn = function (feature) {
            return function () { return (/** @type {?} */ (_this.supercluster.getChildren))(/** @type {?} */ ((feature.properties.cluster_id))); };
        };
        this.getClusterExpansionZoomFn = function (feature) {
            return function () { return (/** @type {?} */ (_this.supercluster.getClusterExpansionZoom))(/** @type {?} */ ((feature.properties.cluster_id))); };
        };
    }
    /**
     * @return {?}
     */
    MarkerClusterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var options = {
            radius: this.radius,
            maxZoom: this.maxZoom,
            minZoom: this.minZoom,
            extent: this.extent,
            nodeSize: this.nodeSize,
            log: this.log,
            reduce: this.reduce,
            initial: this.initial,
            map: this.map
        };
        Object.keys(options)
            .forEach(function (key) {
            /** @type {?} */
            var tkey = /** @type {?} */ (key);
            if (options[tkey] === undefined) {
                delete options[tkey];
            }
        });
        this.supercluster = supercluster(options);
        this.supercluster.load(this.data.features);
        this.load.emit(this.supercluster);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MarkerClusterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["data"] && !changes["data"].isFirstChange()) {
            this.supercluster.load(this.data.features);
        }
    };
    /**
     * @return {?}
     */
    MarkerClusterComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapCreated$.subscribe(function () {
            /** @type {?} */
            var mapMove$ = merge(fromEvent(_this.MapService.mapInstance, 'zoomChange'), fromEvent(_this.MapService.mapInstance, 'move'));
            /** @type {?} */
            var sub = mapMove$.pipe(startWith(undefined)).subscribe(function () {
                _this.zone.run(function () {
                    _this.updateCluster();
                });
            });
            _this.sub.add(sub);
        });
    };
    /**
     * @return {?}
     */
    MarkerClusterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.sub.unsubscribe();
    };
    /**
     * @return {?}
     */
    MarkerClusterComponent.prototype.updateCluster = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bbox = this.MapService.getCurrentViewportBbox();
        /** @type {?} */
        var currentZoom = Math.round(this.MapService.mapInstance.getZoom());
        this.clusterPoints = this.supercluster.getClusters(bbox, currentZoom);
        this.ChangeDetectorRef.markForCheck();
    };
    MarkerClusterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-marker-cluster',
                    template: "\n    <ng-container *ngFor=\"let feature of clusterPoints\">\n      <ng-container *ngIf=\"feature.properties.cluster; else point\">\n        <mgl-marker\n          [feature]=\"feature\"\n        >\n          <ng-container *ngTemplateOutlet=\"clusterPointTpl; context: {\n            $implicit: feature,\n            getLeavesFn: getLeavesFn(feature),\n            getChildrenFn: getChildrenFn(feature),\n            getClusterExpansionZoomFn: getClusterExpansionZoomFn(feature)\n          }\"></ng-container>\n        </mgl-marker>\n      </ng-container>\n      <ng-template #point>\n        <mgl-marker\n          [feature]=\"feature\"\n        >\n          <ng-container *ngTemplateOutlet=\"pointTpl; context: { $implicit: feature }\"></ng-container>\n        </mgl-marker>\n      </ng-template>\n    </ng-container>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                },] },
    ];
    /** @nocollapse */
    MarkerClusterComponent.ctorParameters = function () { return [
        { type: MapService },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    MarkerClusterComponent.propDecorators = {
        radius: [{ type: Input }],
        maxZoom: [{ type: Input }],
        minZoom: [{ type: Input }],
        extent: [{ type: Input }],
        nodeSize: [{ type: Input }],
        log: [{ type: Input }],
        reduce: [{ type: Input }],
        initial: [{ type: Input }],
        map: [{ type: Input }],
        data: [{ type: Input }],
        load: [{ type: Output }],
        pointTpl: [{ type: ContentChild, args: [PointDirective, { read: TemplateRef },] }],
        clusterPointTpl: [{ type: ContentChild, args: [ClusterPointDirective, { read: TemplateRef },] }]
    };
    return MarkerClusterComponent;
}());
export { MarkerClusterComponent };
if (false) {
    /** @type {?} */
    MarkerClusterComponent.prototype.radius;
    /** @type {?} */
    MarkerClusterComponent.prototype.maxZoom;
    /** @type {?} */
    MarkerClusterComponent.prototype.minZoom;
    /** @type {?} */
    MarkerClusterComponent.prototype.extent;
    /** @type {?} */
    MarkerClusterComponent.prototype.nodeSize;
    /** @type {?} */
    MarkerClusterComponent.prototype.log;
    /** @type {?} */
    MarkerClusterComponent.prototype.reduce;
    /** @type {?} */
    MarkerClusterComponent.prototype.initial;
    /** @type {?} */
    MarkerClusterComponent.prototype.map;
    /** @type {?} */
    MarkerClusterComponent.prototype.data;
    /** @type {?} */
    MarkerClusterComponent.prototype.load;
    /** @type {?} */
    MarkerClusterComponent.prototype.pointTpl;
    /** @type {?} */
    MarkerClusterComponent.prototype.clusterPointTpl;
    /** @type {?} */
    MarkerClusterComponent.prototype.clusterPoints;
    /** @type {?} */
    MarkerClusterComponent.prototype.supercluster;
    /** @type {?} */
    MarkerClusterComponent.prototype.sub;
    /** @type {?} */
    MarkerClusterComponent.prototype.getLeavesFn;
    /** @type {?} */
    MarkerClusterComponent.prototype.getChildrenFn;
    /** @type {?} */
    MarkerClusterComponent.prototype.getClusterExpansionZoomFn;
    /** @type {?} */
    MarkerClusterComponent.prototype.MapService;
    /** @type {?} */
    MarkerClusterComponent.prototype.ChangeDetectorRef;
    /** @type {?} */
    MarkerClusterComponent.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9tYXJrZXItY2x1c3Rlci9tYXJrZXItY2x1c3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUlOLE1BQU0sRUFFTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLFlBQXVFLE1BQU0sY0FBYyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Z0JBRS9DLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTs7eUJBdEJoRDs7U0F1QmEsY0FBYzs7Ozs7Z0JBRTFCLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSw4QkFBOEIsRUFBRTs7Z0NBekJ2RDs7U0EwQmEscUJBQXFCOztJQXVEaEMsZ0NBQ1UsWUFDQSxtQkFDQTtRQUhWLGlCQUlLO1FBSEssZUFBVSxHQUFWLFVBQVU7UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCO1FBQ2pCLFNBQUksR0FBSixJQUFJO29CQWJHLElBQUksWUFBWSxFQUFnQjttQkFRbkMsSUFBSSxZQUFZLEVBQUU7MkJBMkRsQixVQUFDLE9BQWdCO1lBQzdCLE1BQU0sQ0FBQyxVQUFDLEtBQWMsRUFBRSxNQUFlLElBQUssT0FBQSxtQkFBTSxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyxvQkFBQyxPQUFPLENBQUMsVUFBVSxDQUFD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RSxDQUFDO0tBQ3hCOzs7O0lBY08sOENBQWE7Ozs7O1FBQ25CLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzs7UUFDdEQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7O2dCQTlIekMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSx3ekJBc0JUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxtQkFBbUIsRUFBRSxLQUFLO2lCQUMzQjs7OztnQkFuQ1EsVUFBVTtnQkFqQmpCLGlCQUFpQjtnQkFNakIsTUFBTTs7O3lCQWlETCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzJCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFHTCxLQUFLO3VCQUVMLE1BQU07MkJBRU4sWUFBWSxTQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7a0NBQ2xELFlBQVksU0FBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7O2lDQTFFNUQ7O1NBd0RhLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgc3VwZXJjbHVzdGVyLCB7IENsdXN0ZXIsIE9wdGlvbnMgYXMgU3VwZXJjbHVzdGVyT3B0aW9ucywgU3VwZXJjbHVzdGVyIH0gZnJvbSAnc3VwZXJjbHVzdGVyJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttZ2xQb2ludF0nIH0pXG5leHBvcnQgY2xhc3MgUG9pbnREaXJlY3RpdmUgeyB9XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbENsdXN0ZXJQb2ludF0nIH0pXG5leHBvcnQgY2xhc3MgQ2x1c3RlclBvaW50RGlyZWN0aXZlIHsgfVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFya2VyLWNsdXN0ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZlYXR1cmUgb2YgY2x1c3RlclBvaW50c1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyOyBlbHNlIHBvaW50XCI+XG4gICAgICAgIDxtZ2wtbWFya2VyXG4gICAgICAgICAgW2ZlYXR1cmVdPVwiZmVhdHVyZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2x1c3RlclBvaW50VHBsOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAkaW1wbGljaXQ6IGZlYXR1cmUsXG4gICAgICAgICAgICBnZXRMZWF2ZXNGbjogZ2V0TGVhdmVzRm4oZmVhdHVyZSksXG4gICAgICAgICAgICBnZXRDaGlsZHJlbkZuOiBnZXRDaGlsZHJlbkZuKGZlYXR1cmUpLFxuICAgICAgICAgICAgZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbjogZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbihmZWF0dXJlKVxuICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZ2wtbWFya2VyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI3BvaW50PlxuICAgICAgICA8bWdsLW1hcmtlclxuICAgICAgICAgIFtmZWF0dXJlXT1cImZlYXR1cmVcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBvaW50VHBsOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogZmVhdHVyZSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWdsLW1hcmtlcj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDbHVzdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCB7XG4gIC8qIEluaXQgaW5wdXQgKi9cbiAgQElucHV0KCkgcmFkaXVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXhab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtaW5ab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBleHRlbnQ/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG5vZGVTaXplPzogbnVtYmVyO1xuICBASW5wdXQoKSBsb2c/OiBib29sZWFuO1xuICBASW5wdXQoKSByZWR1Y2U/OiAoYWNjdW11bGF0ZWQ6IGFueSwgcHJvcHM6IGFueSkgPT4gdm9pZDtcbiAgQElucHV0KCkgaW5pdGlhbD86ICgpID0+IGFueTtcbiAgQElucHV0KCkgbWFwPzogKHByb3BzOiBhbnkpID0+IGFueTtcblxuICAvKiBEeW5hbWljIGlucHV0ICovXG4gIEBJbnB1dCgpIGRhdGE6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5Qb2ludD47XG5cbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPFN1cGVyY2x1c3Rlcj4oKTtcblxuICBAQ29udGVudENoaWxkKFBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIHBvaW50VHBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKENsdXN0ZXJQb2ludERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiB9KSBjbHVzdGVyUG9pbnRUcGw6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY2x1c3RlclBvaW50czogR2VvSlNPTi5GZWF0dXJlPEdlb0pTT04uUG9pbnQ+W107XG5cbiAgcHJpdmF0ZSBzdXBlcmNsdXN0ZXI6IFN1cGVyY2x1c3RlcjtcbiAgcHJpdmF0ZSBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgQ2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3Qgb3B0aW9uczogU3VwZXJjbHVzdGVyT3B0aW9ucyA9IHtcbiAgICAgIHJhZGl1czogdGhpcy5yYWRpdXMsXG4gICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXG4gICAgICBtaW5ab29tOiB0aGlzLm1pblpvb20sXG4gICAgICBleHRlbnQ6IHRoaXMuZXh0ZW50LFxuICAgICAgbm9kZVNpemU6IHRoaXMubm9kZVNpemUsXG4gICAgICBsb2c6IHRoaXMubG9nLFxuICAgICAgcmVkdWNlOiB0aGlzLnJlZHVjZSxcbiAgICAgIGluaXRpYWw6IHRoaXMuaW5pdGlhbCxcbiAgICAgIG1hcDogdGhpcy5tYXBcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgdGtleSA9IDxrZXlvZiBTdXBlcmNsdXN0ZXJPcHRpb25zPmtleTtcbiAgICAgICAgaWYgKG9wdGlvbnNbdGtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3RrZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLnN1cGVyY2x1c3RlciA9IHN1cGVyY2x1c3RlcihvcHRpb25zKTtcbiAgICB0aGlzLnN1cGVyY2x1c3Rlci5sb2FkKHRoaXMuZGF0YS5mZWF0dXJlcyk7XG4gICAgdGhpcy5sb2FkLmVtaXQodGhpcy5zdXBlcmNsdXN0ZXIpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuc3VwZXJjbHVzdGVyLmxvYWQodGhpcy5kYXRhLmZlYXR1cmVzKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBtYXBNb3ZlJCA9IG1lcmdlKFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnem9vbUNoYW5nZScpLFxuICAgICAgICBmcm9tRXZlbnQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW92ZScpXG4gICAgICApO1xuICAgICAgY29uc3Qgc3ViID0gbWFwTW92ZSQucGlwZShcbiAgICAgICAgc3RhcnRXaXRoPGFueT4odW5kZWZpbmVkKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNsdXN0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc3ViLmFkZChzdWIpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGdldExlYXZlc0ZuID0gKGZlYXR1cmU6IENsdXN0ZXIpID0+IHtcbiAgICByZXR1cm4gKGxpbWl0PzogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldExlYXZlcykoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhLCBsaW1pdCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGdldENoaWxkcmVuRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAoKSA9PiAoPGFueT50aGlzLnN1cGVyY2x1c3Rlci5nZXRDaGlsZHJlbikoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhKTtcbiAgfVxuXG4gIGdldENsdXN0ZXJFeHBhbnNpb25ab29tRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAoKSA9PiAoPGFueT50aGlzLnN1cGVyY2x1c3Rlci5nZXRDbHVzdGVyRXhwYW5zaW9uWm9vbSkoZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQhKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ2x1c3RlcigpIHtcbiAgICBjb25zdCBiYm94ID0gdGhpcy5NYXBTZXJ2aWNlLmdldEN1cnJlbnRWaWV3cG9ydEJib3goKTtcbiAgICBjb25zdCBjdXJyZW50Wm9vbSA9IE1hdGgucm91bmQodGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldFpvb20oKSk7XG4gICAgdGhpcy5jbHVzdGVyUG9pbnRzID0gdGhpcy5zdXBlcmNsdXN0ZXIuZ2V0Q2x1c3RlcnMoYmJveCwgY3VycmVudFpvb20pO1xuICAgIHRoaXMuQ2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==