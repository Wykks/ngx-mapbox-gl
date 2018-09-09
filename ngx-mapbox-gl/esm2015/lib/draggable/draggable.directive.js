/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Host, Input, NgZone, Optional, Output } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { FeatureComponent } from '../source/geojson/feature.component';
export class DraggableDirective {
    /**
     * @param {?} MapService
     * @param {?} NgZone
     * @param {?=} FeatureComponent
     * @param {?=} MarkerComponent
     */
    constructor(MapService, NgZone, FeatureComponent, MarkerComponent) {
        this.MapService = MapService;
        this.NgZone = NgZone;
        this.FeatureComponent = FeatureComponent;
        this.MarkerComponent = MarkerComponent;
        this.dragStart = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.drag = new EventEmitter();
        this.destroyed$ = new ReplaySubject(1);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let enter$;
        /** @type {?} */
        let leave$;
        /** @type {?} */
        let updateCoords;
        if (this.MarkerComponent) {
            console.warn('mglDraggable on Marker is deprecated, use draggable input instead');
            /** @type {?} */
            let markerElement = (/** @type {?} */ (this.MarkerComponent.content.nativeElement));
            if (markerElement.children.length === 1) {
                markerElement = markerElement.children[0];
            }
            enter$ = fromEvent(markerElement, 'mouseenter');
            leave$ = fromEvent(markerElement, 'mouseleave');
            updateCoords = this.MarkerComponent.updateCoordinates.bind(this.MarkerComponent);
        }
        else if (this.FeatureComponent && this.layer) {
            enter$ = this.layer.mouseEnter;
            leave$ = this.layer.mouseLeave;
            updateCoords = this.FeatureComponent.updateCoordinates.bind(this.FeatureComponent);
            if (this.FeatureComponent.geometry.type !== 'Point') {
                throw new Error('mglDraggable only support point feature');
            }
        }
        else {
            throw new Error('mglDraggable can only be used on Feature (with a layer as input) or Marker');
        }
        this.handleDraggable(enter$, leave$, updateCoords);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed$.next(undefined);
        this.destroyed$.complete();
    }
    /**
     * @param {?} enter$
     * @param {?} leave$
     * @param {?} updateCoords
     * @return {?}
     */
    handleDraggable(enter$, leave$, updateCoords) {
        /** @type {?} */
        let moving = false;
        /** @type {?} */
        let inside = false;
        this.MapService.mapCreated$.subscribe(() => {
            /** @type {?} */
            const mouseUp$ = fromEvent(this.MapService.mapInstance, 'mouseup');
            /** @type {?} */
            const dragStart$ = enter$.pipe(takeUntil(this.destroyed$), filter(() => !moving), filter((evt) => this.filterFeature(evt)), tap(() => {
                inside = true;
                this.MapService.changeCanvasCursor('move');
                this.MapService.updateDragPan(false);
            }), switchMap(() => fromEvent(this.MapService.mapInstance, 'mousedown')
                .pipe(takeUntil(leave$))));
            /** @type {?} */
            const dragging$ = dragStart$.pipe(switchMap(() => fromEvent(this.MapService.mapInstance, 'mousemove')
                .pipe(takeUntil(mouseUp$))));
            /** @type {?} */
            const dragEnd$ = dragStart$.pipe(switchMap(() => mouseUp$.pipe(take(1))));
            dragStart$.subscribe((evt) => {
                moving = true;
                if (this.dragStart.observers.length) {
                    this.NgZone.run(() => this.dragStart.emit(evt));
                }
            });
            dragging$.subscribe((evt) => {
                updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
                if (this.drag.observers.length) {
                    this.NgZone.run(() => this.drag.emit(evt));
                }
            });
            dragEnd$.subscribe((evt) => {
                moving = false;
                if (this.dragEnd.observers.length) {
                    this.NgZone.run(() => this.dragEnd.emit(evt));
                }
                if (!inside) { // It's possible to dragEnd outside the target (small input lag)
                    // It's possible to dragEnd outside the target (small input lag)
                    this.MapService.changeCanvasCursor('');
                    this.MapService.updateDragPan(true);
                }
            });
            leave$.pipe(takeUntil(this.destroyed$), tap(() => inside = false), filter(() => !moving)).subscribe(() => {
                this.MapService.changeCanvasCursor('');
                this.MapService.updateDragPan(true);
            });
        });
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    filterFeature(evt) {
        if (this.FeatureComponent && this.layer) {
            /** @type {?} */
            const feature = this.MapService.queryRenderedFeatures(evt.point, {
                layers: [this.layer.id],
                filter: [
                    'all',
                    ['==', '$type', 'Point'],
                    ['==', '$id', this.FeatureComponent.id]
                ]
            })[0];
            if (!feature) {
                return false;
            }
        }
        return true;
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mglDraggable]'
            },] }
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: MapService },
    { type: NgZone },
    { type: FeatureComponent, decorators: [{ type: Optional }, { type: Host }] },
    { type: MarkerComponent, decorators: [{ type: Optional }, { type: Host }] }
];
DraggableDirective.propDecorators = {
    layer: [{ type: Input, args: ['mglDraggable',] }],
    dragStart: [{ type: Output }],
    dragEnd: [{ type: Output }],
    drag: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DraggableDirective.prototype.layer;
    /** @type {?} */
    DraggableDirective.prototype.dragStart;
    /** @type {?} */
    DraggableDirective.prototype.dragEnd;
    /** @type {?} */
    DraggableDirective.prototype.drag;
    /** @type {?} */
    DraggableDirective.prototype.destroyed$;
    /** @type {?} */
    DraggableDirective.prototype.MapService;
    /** @type {?} */
    DraggableDirective.prototype.NgZone;
    /** @type {?} */
    DraggableDirective.prototype.FeatureComponent;
    /** @type {?} */
    DraggableDirective.prototype.MarkerComponent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvZHJhZ2dhYmxlL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUt2RSxNQUFNOzs7Ozs7O0lBVUosWUFDVSxZQUNBLFFBQ29CLGdCQUFtQyxFQUNuQyxlQUFpQztRQUhyRCxlQUFVLEdBQVYsVUFBVTtRQUNWLFdBQU0sR0FBTixNQUFNO1FBQ2MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQUNuQyxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7eUJBVnpDLElBQUksWUFBWSxFQUFpQjt1QkFDbkMsSUFBSSxZQUFZLEVBQWlCO29CQUNwQyxJQUFJLFlBQVksRUFBaUI7MEJBRVIsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDO0tBT3pEOzs7O0lBRUwsUUFBUTs7UUFDTixJQUFJLE1BQU0sQ0FBQzs7UUFDWCxJQUFJLE1BQU0sQ0FBQzs7UUFDWCxJQUFJLFlBQVks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Q0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztvQkFDeEIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7aUJBQ3hDO2FBQ0YsQ0FDRixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQzs7OztZQWpJZixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7OztZQU5RLFVBQVU7WUFWakIsTUFBTTtZQVlDLGdCQUFnQix1QkFrQnBCLFFBQVEsWUFBSSxJQUFJO1lBbkJaLGVBQWUsdUJBb0JuQixRQUFRLFlBQUksSUFBSTs7O29CQVpsQixLQUFLLFNBQUMsY0FBYzt3QkFFcEIsTUFBTTtzQkFDTixNQUFNO21CQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBNb3VzZUV2ZW50IH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuLi9sYXllci9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi4vc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsRHJhZ2dhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnbWdsRHJhZ2dhYmxlJykgbGF5ZXI/OiBMYXllckNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBkZXN0cm95ZWQkOiBSZXBsYXlTdWJqZWN0PHZvaWQ+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgTmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIEZlYXR1cmVDb21wb25lbnQ/OiBGZWF0dXJlQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBNYXJrZXJDb21wb25lbnQ/OiBNYXJrZXJDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgZW50ZXIkO1xuICAgIGxldCBsZWF2ZSQ7XG4gICAgbGV0IHVwZGF0ZUNvb3JkcztcbiAgICBpZiAodGhpcy5NYXJrZXJDb21wb25lbnQpIHtcbiAgICAgIGNvbnNvbGUud2FybignbWdsRHJhZ2dhYmxlIG9uIE1hcmtlciBpcyBkZXByZWNhdGVkLCB1c2UgZHJhZ2dhYmxlIGlucHV0IGluc3RlYWQnKTtcbiAgICAgIGxldCBtYXJrZXJFbGVtZW50ID0gKDxFbGVtZW50PnRoaXMuTWFya2VyQ29tcG9uZW50LmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICBpZiAobWFya2VyRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWFya2VyRWxlbWVudCA9IG1hcmtlckVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICB9XG4gICAgICBlbnRlciQgPSBmcm9tRXZlbnQobWFya2VyRWxlbWVudCwgJ21vdXNlZW50ZXInKTtcbiAgICAgIGxlYXZlJCA9IGZyb21FdmVudChtYXJrZXJFbGVtZW50LCAnbW91c2VsZWF2ZScpO1xuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5NYXJrZXJDb21wb25lbnQudXBkYXRlQ29vcmRpbmF0ZXMuYmluZCh0aGlzLk1hcmtlckNvbXBvbmVudCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgZW50ZXIkID0gdGhpcy5sYXllci5tb3VzZUVudGVyO1xuICAgICAgbGVhdmUkID0gdGhpcy5sYXllci5tb3VzZUxlYXZlO1xuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5GZWF0dXJlQ29tcG9uZW50LnVwZGF0ZUNvb3JkaW5hdGVzLmJpbmQodGhpcy5GZWF0dXJlQ29tcG9uZW50KTtcbiAgICAgIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQuZ2VvbWV0cnkudHlwZSAhPT0gJ1BvaW50Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbERyYWdnYWJsZSBvbmx5IHN1cHBvcnQgcG9pbnQgZmVhdHVyZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbERyYWdnYWJsZSBjYW4gb25seSBiZSB1c2VkIG9uIEZlYXR1cmUgKHdpdGggYSBsYXllciBhcyBpbnB1dCkgb3IgTWFya2VyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEcmFnZ2FibGUoZW50ZXIkLCBsZWF2ZSQsIHVwZGF0ZUNvb3Jkcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCh1bmRlZmluZWQpO1xuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVEcmFnZ2FibGUoZW50ZXIkOiBPYnNlcnZhYmxlPGFueT4sIGxlYXZlJDogT2JzZXJ2YWJsZTxhbnk+LCB1cGRhdGVDb29yZHM6IChjb29yZDogbnVtYmVyW10pID0+IHZvaWQpIHtcbiAgICBsZXQgbW92aW5nID0gZmFsc2U7XG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgbW91c2VVcCQgPSBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2V1cCcpO1xuICAgICAgY29uc3QgZHJhZ1N0YXJ0JCA9IGVudGVyJC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICFtb3ZpbmcpLFxuICAgICAgICBmaWx0ZXIoKGV2dCkgPT4gdGhpcy5maWx0ZXJGZWF0dXJlKGV2dCkpLFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGluc2lkZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignbW92ZScpO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKGZhbHNlKTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIGZyb21FdmVudDxNYXBNb3VzZUV2ZW50Pih0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3VzZWRvd24nKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGxlYXZlJCkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCBkcmFnZ2luZyQgPSBkcmFnU3RhcnQkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2Vtb3ZlJylcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwobW91c2VVcCQpKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29uc3QgZHJhZ0VuZCQgPSBkcmFnU3RhcnQkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtb3VzZVVwJC5waXBlKHRha2UoMSkpKVxuICAgICAgKTtcbiAgICAgIGRyYWdTdGFydCQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgbW92aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnU3RhcnQuZW1pdChldnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkcmFnZ2luZyQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgdXBkYXRlQ29vcmRzKFtldnQubG5nTGF0LmxuZywgZXZ0LmxuZ0xhdC5sYXRdKTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5OZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZy5lbWl0KGV2dCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRyYWdFbmQkLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgIG1vdmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5kcmFnRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnRW5kLmVtaXQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbnNpZGUpIHsgLy8gSXQncyBwb3NzaWJsZSB0byBkcmFnRW5kIG91dHNpZGUgdGhlIHRhcmdldCAoc21hbGwgaW5wdXQgbGFnKVxuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxlYXZlJC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSxcbiAgICAgICAgdGFwKCgpID0+IGluc2lkZSA9IGZhbHNlKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICFtb3ZpbmcpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1Bhbih0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJGZWF0dXJlKGV2dDogTWFwTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgY29uc3QgZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPGFueT4gPSB0aGlzLk1hcFNlcnZpY2UucXVlcnlSZW5kZXJlZEZlYXR1cmVzKFxuICAgICAgICBldnQucG9pbnQsXG4gICAgICAgIHtcbiAgICAgICAgICBsYXllcnM6IFt0aGlzLmxheWVyLmlkXSxcbiAgICAgICAgICBmaWx0ZXI6IFtcbiAgICAgICAgICAgICdhbGwnLFxuICAgICAgICAgICAgWyc9PScsICckdHlwZScsICdQb2ludCddLFxuICAgICAgICAgICAgWyc9PScsICckaWQnLCB0aGlzLkZlYXR1cmVDb21wb25lbnQuaWRdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICApWzBdO1xuICAgICAgaWYgKCFmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuXG4iXX0=