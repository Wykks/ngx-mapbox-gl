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
        { type: Directive, args: [{ selector: 'ng-template[mglPoint]' },] }
    ];
    return PointDirective;
}());
export { PointDirective };
var ClusterPointDirective = /** @class */ (function () {
    function ClusterPointDirective() {
    }
    ClusterPointDirective.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[mglClusterPoint]' },] }
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
                }] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9tYXJrZXItY2x1c3Rlci9tYXJrZXItY2x1c3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUlOLE1BQU0sRUFFTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLFlBQXVFLE1BQU0sY0FBYyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Z0JBRS9DLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTs7eUJBdEJoRDs7U0F1QmEsY0FBYzs7Ozs7Z0JBRTFCLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSw4QkFBOEIsRUFBRTs7Z0NBekJ2RDs7U0EwQmEscUJBQXFCOztJQXVEaEMsZ0NBQ1UsWUFDQSxtQkFDQTtRQUhWLGlCQUlLO1FBSEssZUFBVSxHQUFWLFVBQVU7UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCO1FBQ2pCLFNBQUksR0FBSixJQUFJO29CQWJHLElBQUksWUFBWSxFQUFnQjttQkFRbkMsSUFBSSxZQUFZLEVBQUU7MkJBMkRsQixVQUFDLE9BQWdCO1lBQzdCLE9BQU8sVUFBQyxLQUFjLEVBQUUsTUFBZSxJQUFLLE9BQUEsbUJBQU0sS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsb0JBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFV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SSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDOztRQUN0RCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDOzs7Z0JBOUh6QyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLHd6QkFzQlQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7aUJBQzNCOzs7O2dCQW5DUSxVQUFVO2dCQWpCakIsaUJBQWlCO2dCQU1qQixNQUFNOzs7eUJBaURMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO3lCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUdMLEtBQUs7dUJBRUwsTUFBTTsyQkFFTixZQUFZLFNBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtrQ0FDbEQsWUFBWSxTQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs7aUNBMUU1RDs7U0F3RGEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBzdXBlcmNsdXN0ZXIsIHsgQ2x1c3RlciwgT3B0aW9ucyBhcyBTdXBlcmNsdXN0ZXJPcHRpb25zLCBTdXBlcmNsdXN0ZXIgfSBmcm9tICdzdXBlcmNsdXN0ZXInO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbFBvaW50XScgfSlcbmV4cG9ydCBjbGFzcyBQb2ludERpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbWdsQ2x1c3RlclBvaW50XScgfSlcbmV4cG9ydCBjbGFzcyBDbHVzdGVyUG9pbnREaXJlY3RpdmUgeyB9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1tYXJrZXItY2x1c3RlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmVhdHVyZSBvZiBjbHVzdGVyUG9pbnRzXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXI7IGVsc2UgcG9pbnRcIj5cbiAgICAgICAgPG1nbC1tYXJrZXJcbiAgICAgICAgICBbZmVhdHVyZV09XCJmZWF0dXJlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbHVzdGVyUG9pbnRUcGw7IGNvbnRleHQ6IHtcbiAgICAgICAgICAgICRpbXBsaWNpdDogZmVhdHVyZSxcbiAgICAgICAgICAgIGdldExlYXZlc0ZuOiBnZXRMZWF2ZXNGbihmZWF0dXJlKSxcbiAgICAgICAgICAgIGdldENoaWxkcmVuRm46IGdldENoaWxkcmVuRm4oZmVhdHVyZSksXG4gICAgICAgICAgICBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbUZuOiBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbUZuKGZlYXR1cmUpXG4gICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21nbC1tYXJrZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjcG9pbnQ+XG4gICAgICAgIDxtZ2wtbWFya2VyXG4gICAgICAgICAgW2ZlYXR1cmVdPVwiZmVhdHVyZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicG9pbnRUcGw7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBmZWF0dXJlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZ2wtbWFya2VyPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNsdXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSByYWRpdXM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heFpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1pblpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGV4dGVudD86IG51bWJlcjtcbiAgQElucHV0KCkgbm9kZVNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxvZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlZHVjZT86IChhY2N1bXVsYXRlZDogYW55LCBwcm9wczogYW55KSA9PiB2b2lkO1xuICBASW5wdXQoKSBpbml0aWFsPzogKCkgPT4gYW55O1xuICBASW5wdXQoKSBtYXA/OiAocHJvcHM6IGFueSkgPT4gYW55O1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgZGF0YTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLlBvaW50PjtcblxuICBAT3V0cHV0KCkgbG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8U3VwZXJjbHVzdGVyPigpO1xuXG4gIEBDb250ZW50Q2hpbGQoUG9pbnREaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgcG9pbnRUcGw6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoQ2x1c3RlclBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGNsdXN0ZXJQb2ludFRwbDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjbHVzdGVyUG9pbnRzOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD5bXTtcblxuICBwcml2YXRlIHN1cGVyY2x1c3RlcjogU3VwZXJjbHVzdGVyO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBDaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBvcHRpb25zOiBTdXBlcmNsdXN0ZXJPcHRpb25zID0ge1xuICAgICAgcmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgIGV4dGVudDogdGhpcy5leHRlbnQsXG4gICAgICBub2RlU2l6ZTogdGhpcy5ub2RlU2l6ZSxcbiAgICAgIGxvZzogdGhpcy5sb2csXG4gICAgICByZWR1Y2U6IHRoaXMucmVkdWNlLFxuICAgICAgaW5pdGlhbDogdGhpcy5pbml0aWFsLFxuICAgICAgbWFwOiB0aGlzLm1hcFxuICAgIH07XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgIC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIFN1cGVyY2x1c3Rlck9wdGlvbnM+a2V5O1xuICAgICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuc3VwZXJjbHVzdGVyID0gc3VwZXJjbHVzdGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuc3VwZXJjbHVzdGVyLmxvYWQodGhpcy5kYXRhLmZlYXR1cmVzKTtcbiAgICB0aGlzLmxvYWQuZW1pdCh0aGlzLnN1cGVyY2x1c3Rlcik7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5zdXBlcmNsdXN0ZXIubG9hZCh0aGlzLmRhdGEuZmVhdHVyZXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IG1hcE1vdmUkID0gbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICd6b29tQ2hhbmdlJyksXG4gICAgICAgIGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3ZlJylcbiAgICAgICk7XG4gICAgICBjb25zdCBzdWIgPSBtYXBNb3ZlJC5waXBlKFxuICAgICAgICBzdGFydFdpdGg8YW55Pih1bmRlZmluZWQpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlQ2x1c3RlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZ2V0TGVhdmVzRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAobGltaXQ/OiBudW1iZXIsIG9mZnNldD86IG51bWJlcikgPT4gKDxhbnk+dGhpcy5zdXBlcmNsdXN0ZXIuZ2V0TGVhdmVzKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEsIGxpbWl0LCBvZmZzZXQpO1xuICB9XG5cbiAgZ2V0Q2hpbGRyZW5GbiA9IChmZWF0dXJlOiBDbHVzdGVyKSA9PiB7XG4gICAgcmV0dXJuICgpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldENoaWxkcmVuKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEpO1xuICB9XG5cbiAgZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbiA9IChmZWF0dXJlOiBDbHVzdGVyKSA9PiB7XG4gICAgcmV0dXJuICgpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldENsdXN0ZXJFeHBhbnNpb25ab29tKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDbHVzdGVyKCkge1xuICAgIGNvbnN0IGJib3ggPSB0aGlzLk1hcFNlcnZpY2UuZ2V0Q3VycmVudFZpZXdwb3J0QmJveCgpO1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gTWF0aC5yb3VuZCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpKTtcbiAgICB0aGlzLmNsdXN0ZXJQb2ludHMgPSB0aGlzLnN1cGVyY2x1c3Rlci5nZXRDbHVzdGVycyhiYm94LCBjdXJyZW50Wm9vbSk7XG4gICAgdGhpcy5DaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19