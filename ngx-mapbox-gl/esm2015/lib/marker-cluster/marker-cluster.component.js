/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, EventEmitter, Input, NgZone, Output, TemplateRef } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import supercluster from 'supercluster';
import { MapService } from '../map/map.service';
export class PointDirective {
}
PointDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[mglPoint]' },] }
];
export class ClusterPointDirective {
}
ClusterPointDirective.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[mglClusterPoint]' },] }
];
export class MarkerClusterComponent {
    /**
     * @param {?} MapService
     * @param {?} ChangeDetectorRef
     * @param {?} zone
     */
    constructor(MapService, ChangeDetectorRef, zone) {
        this.MapService = MapService;
        this.ChangeDetectorRef = ChangeDetectorRef;
        this.zone = zone;
        this.load = new EventEmitter();
        this.sub = new Subscription();
        this.getLeavesFn = (feature) => {
            return (limit, offset) => (/** @type {?} */ (this.supercluster.getLeaves))(/** @type {?} */ ((feature.properties.cluster_id)), limit, offset);
        };
        this.getChildrenFn = (feature) => {
            return () => (/** @type {?} */ (this.supercluster.getChildren))(/** @type {?} */ ((feature.properties.cluster_id)));
        };
        this.getClusterExpansionZoomFn = (feature) => {
            return () => (/** @type {?} */ (this.supercluster.getClusterExpansionZoom))(/** @type {?} */ ((feature.properties.cluster_id)));
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const options = {
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
            .forEach((key) => {
            /** @type {?} */
            const tkey = /** @type {?} */ (key);
            if (options[tkey] === undefined) {
                delete options[tkey];
            }
        });
        this.supercluster = supercluster(options);
        this.supercluster.load(this.data.features);
        this.load.emit(this.supercluster);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["data"] && !changes["data"].isFirstChange()) {
            this.supercluster.load(this.data.features);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.MapService.mapCreated$.subscribe(() => {
            /** @type {?} */
            const mapMove$ = merge(fromEvent(this.MapService.mapInstance, 'zoomChange'), fromEvent(this.MapService.mapInstance, 'move'));
            /** @type {?} */
            const sub = mapMove$.pipe(startWith(undefined)).subscribe(() => {
                this.zone.run(() => {
                    this.updateCluster();
                });
            });
            this.sub.add(sub);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    /**
     * @return {?}
     */
    updateCluster() {
        /** @type {?} */
        const bbox = this.MapService.getCurrentViewportBbox();
        /** @type {?} */
        const currentZoom = Math.round(this.MapService.mapInstance.getZoom());
        this.clusterPoints = this.supercluster.getClusters(bbox, currentZoom);
        this.ChangeDetectorRef.markForCheck();
    }
}
MarkerClusterComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-marker-cluster',
                template: `
    <ng-container *ngFor="let feature of clusterPoints">
      <ng-container *ngIf="feature.properties.cluster; else point">
        <mgl-marker
          [feature]="feature"
        >
          <ng-container *ngTemplateOutlet="clusterPointTpl; context: {
            $implicit: feature,
            getLeavesFn: getLeavesFn(feature),
            getChildrenFn: getChildrenFn(feature),
            getClusterExpansionZoomFn: getClusterExpansionZoomFn(feature)
          }"></ng-container>
        </mgl-marker>
      </ng-container>
      <ng-template #point>
        <mgl-marker
          [feature]="feature"
        >
          <ng-container *ngTemplateOutlet="pointTpl; context: { $implicit: feature }"></ng-container>
        </mgl-marker>
      </ng-template>
    </ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MarkerClusterComponent.ctorParameters = () => [
    { type: MapService },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9tYXJrZXItY2x1c3Rlci9tYXJrZXItY2x1c3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUlOLE1BQU0sRUFFTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLFlBQXVFLE1BQU0sY0FBYyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdoRCxNQUFNOzs7WUFETCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUU7O0FBSWhELE1BQU07OztZQURMLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSw4QkFBOEIsRUFBRTs7QUErQnZELE1BQU07Ozs7OztJQXlCSixZQUNVLFlBQ0EsbUJBQ0E7UUFGQSxlQUFVLEdBQVYsVUFBVTtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsU0FBSSxHQUFKLElBQUk7b0JBYkcsSUFBSSxZQUFZLEVBQWdCO21CQVFuQyxJQUFJLFlBQVksRUFBRTsyQkEyRGxCLENBQUMsT0FBZ0IsRUFBRSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxLQUFjLEVBQUUsTUFBZSxFQUFFLEVBQUUsQ0FBQyxtQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyxvQkFBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBRyxLQUFL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QixFQUFFLENBQUM7O1FBQ3RELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7WUE5SHpDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7YUFDM0I7Ozs7WUFuQ1EsVUFBVTtZQWpCakIsaUJBQWlCO1lBTWpCLE1BQU07OztxQkFpREwsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLO2tCQUNMLEtBQUs7cUJBQ0wsS0FBSztzQkFDTCxLQUFLO2tCQUNMLEtBQUs7bUJBR0wsS0FBSzttQkFFTCxNQUFNO3VCQUVOLFlBQVksU0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzhCQUNsRCxZQUFZLFNBQUMscUJBQXFCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBzdXBlcmNsdXN0ZXIsIHsgQ2x1c3RlciwgT3B0aW9ucyBhcyBTdXBlcmNsdXN0ZXJPcHRpb25zLCBTdXBlcmNsdXN0ZXIgfSBmcm9tICdzdXBlcmNsdXN0ZXInO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW21nbFBvaW50XScgfSlcbmV4cG9ydCBjbGFzcyBQb2ludERpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbWdsQ2x1c3RlclBvaW50XScgfSlcbmV4cG9ydCBjbGFzcyBDbHVzdGVyUG9pbnREaXJlY3RpdmUgeyB9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1tYXJrZXItY2x1c3RlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmVhdHVyZSBvZiBjbHVzdGVyUG9pbnRzXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXI7IGVsc2UgcG9pbnRcIj5cbiAgICAgICAgPG1nbC1tYXJrZXJcbiAgICAgICAgICBbZmVhdHVyZV09XCJmZWF0dXJlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbHVzdGVyUG9pbnRUcGw7IGNvbnRleHQ6IHtcbiAgICAgICAgICAgICRpbXBsaWNpdDogZmVhdHVyZSxcbiAgICAgICAgICAgIGdldExlYXZlc0ZuOiBnZXRMZWF2ZXNGbihmZWF0dXJlKSxcbiAgICAgICAgICAgIGdldENoaWxkcmVuRm46IGdldENoaWxkcmVuRm4oZmVhdHVyZSksXG4gICAgICAgICAgICBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbUZuOiBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbUZuKGZlYXR1cmUpXG4gICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21nbC1tYXJrZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjcG9pbnQ+XG4gICAgICAgIDxtZ2wtbWFya2VyXG4gICAgICAgICAgW2ZlYXR1cmVdPVwiZmVhdHVyZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicG9pbnRUcGw7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBmZWF0dXJlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tZ2wtbWFya2VyPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNsdXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0IHtcbiAgLyogSW5pdCBpbnB1dCAqL1xuICBASW5wdXQoKSByYWRpdXM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heFpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1pblpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGV4dGVudD86IG51bWJlcjtcbiAgQElucHV0KCkgbm9kZVNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxvZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlZHVjZT86IChhY2N1bXVsYXRlZDogYW55LCBwcm9wczogYW55KSA9PiB2b2lkO1xuICBASW5wdXQoKSBpbml0aWFsPzogKCkgPT4gYW55O1xuICBASW5wdXQoKSBtYXA/OiAocHJvcHM6IGFueSkgPT4gYW55O1xuXG4gIC8qIER5bmFtaWMgaW5wdXQgKi9cbiAgQElucHV0KCkgZGF0YTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLlBvaW50PjtcblxuICBAT3V0cHV0KCkgbG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8U3VwZXJjbHVzdGVyPigpO1xuXG4gIEBDb250ZW50Q2hpbGQoUG9pbnREaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgcG9pbnRUcGw6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoQ2x1c3RlclBvaW50RGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGNsdXN0ZXJQb2ludFRwbDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjbHVzdGVyUG9pbnRzOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5Qb2ludD5bXTtcblxuICBwcml2YXRlIHN1cGVyY2x1c3RlcjogU3VwZXJjbHVzdGVyO1xuICBwcml2YXRlIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBDaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBvcHRpb25zOiBTdXBlcmNsdXN0ZXJPcHRpb25zID0ge1xuICAgICAgcmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgIGV4dGVudDogdGhpcy5leHRlbnQsXG4gICAgICBub2RlU2l6ZTogdGhpcy5ub2RlU2l6ZSxcbiAgICAgIGxvZzogdGhpcy5sb2csXG4gICAgICByZWR1Y2U6IHRoaXMucmVkdWNlLFxuICAgICAgaW5pdGlhbDogdGhpcy5pbml0aWFsLFxuICAgICAgbWFwOiB0aGlzLm1hcFxuICAgIH07XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgIC5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0a2V5ID0gPGtleW9mIFN1cGVyY2x1c3Rlck9wdGlvbnM+a2V5O1xuICAgICAgICBpZiAob3B0aW9uc1t0a2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIG9wdGlvbnNbdGtleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuc3VwZXJjbHVzdGVyID0gc3VwZXJjbHVzdGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuc3VwZXJjbHVzdGVyLmxvYWQodGhpcy5kYXRhLmZlYXR1cmVzKTtcbiAgICB0aGlzLmxvYWQuZW1pdCh0aGlzLnN1cGVyY2x1c3Rlcik7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5zdXBlcmNsdXN0ZXIubG9hZCh0aGlzLmRhdGEuZmVhdHVyZXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IG1hcE1vdmUkID0gbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICd6b29tQ2hhbmdlJyksXG4gICAgICAgIGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3ZlJylcbiAgICAgICk7XG4gICAgICBjb25zdCBzdWIgPSBtYXBNb3ZlJC5waXBlKFxuICAgICAgICBzdGFydFdpdGg8YW55Pih1bmRlZmluZWQpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlQ2x1c3RlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zdWIuYWRkKHN1Yik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgZ2V0TGVhdmVzRm4gPSAoZmVhdHVyZTogQ2x1c3RlcikgPT4ge1xuICAgIHJldHVybiAobGltaXQ/OiBudW1iZXIsIG9mZnNldD86IG51bWJlcikgPT4gKDxhbnk+dGhpcy5zdXBlcmNsdXN0ZXIuZ2V0TGVhdmVzKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEsIGxpbWl0LCBvZmZzZXQpO1xuICB9XG5cbiAgZ2V0Q2hpbGRyZW5GbiA9IChmZWF0dXJlOiBDbHVzdGVyKSA9PiB7XG4gICAgcmV0dXJuICgpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldENoaWxkcmVuKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEpO1xuICB9XG5cbiAgZ2V0Q2x1c3RlckV4cGFuc2lvblpvb21GbiA9IChmZWF0dXJlOiBDbHVzdGVyKSA9PiB7XG4gICAgcmV0dXJuICgpID0+ICg8YW55PnRoaXMuc3VwZXJjbHVzdGVyLmdldENsdXN0ZXJFeHBhbnNpb25ab29tKShmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCEpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDbHVzdGVyKCkge1xuICAgIGNvbnN0IGJib3ggPSB0aGlzLk1hcFNlcnZpY2UuZ2V0Q3VycmVudFZpZXdwb3J0QmJveCgpO1xuICAgIGNvbnN0IGN1cnJlbnRab29tID0gTWF0aC5yb3VuZCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UuZ2V0Wm9vbSgpKTtcbiAgICB0aGlzLmNsdXN0ZXJQb2ludHMgPSB0aGlzLnN1cGVyY2x1c3Rlci5nZXRDbHVzdGVycyhiYm94LCBjdXJyZW50Wm9vbSk7XG4gICAgdGhpcy5DaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19