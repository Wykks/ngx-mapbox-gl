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
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(MapService, NgZone, FeatureComponent, MarkerComponent) {
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
    DraggableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var enter$;
        /** @type {?} */
        var leave$;
        /** @type {?} */
        var updateCoords;
        if (this.MarkerComponent) {
            /** @type {?} */
            var markerElement = (/** @type {?} */ (this.MarkerComponent.content.nativeElement));
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
    };
    /**
     * @return {?}
     */
    DraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed$.next(undefined);
        this.destroyed$.complete();
    };
    /**
     * @param {?} enter$
     * @param {?} leave$
     * @param {?} updateCoords
     * @return {?}
     */
    DraggableDirective.prototype.handleDraggable = /**
     * @param {?} enter$
     * @param {?} leave$
     * @param {?} updateCoords
     * @return {?}
     */
    function (enter$, leave$, updateCoords) {
        var _this = this;
        /** @type {?} */
        var moving = false;
        /** @type {?} */
        var inside = false;
        this.MapService.mapCreated$.subscribe(function () {
            /** @type {?} */
            var mouseUp$ = fromEvent(_this.MapService.mapInstance, 'mouseup');
            /** @type {?} */
            var dragStart$ = enter$.pipe(takeUntil(_this.destroyed$), filter(function () { return !moving; }), filter(function (evt) { return _this.filterFeature(evt); }), tap(function () {
                inside = true;
                _this.MapService.changeCanvasCursor('move');
                _this.MapService.updateDragPan(false);
            }), switchMap(function () {
                return fromEvent(_this.MapService.mapInstance, 'mousedown')
                    .pipe(takeUntil(leave$));
            }));
            /** @type {?} */
            var dragging$ = dragStart$.pipe(switchMap(function () { return fromEvent(_this.MapService.mapInstance, 'mousemove')
                .pipe(takeUntil(mouseUp$)); }));
            /** @type {?} */
            var dragEnd$ = dragStart$.pipe(switchMap(function () { return mouseUp$.pipe(take(1)); }));
            dragStart$.subscribe(function (evt) {
                moving = true;
                if (_this.dragStart.observers.length) {
                    _this.NgZone.run(function () { return _this.dragStart.emit(evt); });
                }
            });
            dragging$.subscribe(function (evt) {
                updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
                if (_this.drag.observers.length) {
                    _this.NgZone.run(function () { return _this.drag.emit(evt); });
                }
            });
            dragEnd$.subscribe(function (evt) {
                moving = false;
                if (_this.dragEnd.observers.length) {
                    _this.NgZone.run(function () { return _this.dragEnd.emit(evt); });
                }
                if (!inside) {
                    // It's possible to dragEnd outside the target (small input lag)
                    _this.MapService.changeCanvasCursor('');
                    _this.MapService.updateDragPan(true);
                }
            });
            leave$.pipe(takeUntil(_this.destroyed$), tap(function () { return inside = false; }), filter(function () { return !moving; })).subscribe(function () {
                _this.MapService.changeCanvasCursor('');
                _this.MapService.updateDragPan(true);
            });
        });
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DraggableDirective.prototype.filterFeature = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        if (this.FeatureComponent && this.layer) {
            /** @type {?} */
            var feature = this.MapService.queryRenderedFeatures(evt.point, {
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
    };
    DraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mglDraggable]'
                },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: MapService },
        { type: NgZone },
        { type: FeatureComponent, decorators: [{ type: Optional }, { type: Host }] },
        { type: MarkerComponent, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    DraggableDirective.propDecorators = {
        layer: [{ type: Input, args: ['mglDraggable',] }],
        dragStart: [{ type: Output }],
        dragEnd: [{ type: Output }],
        drag: [{ type: Output }]
    };
    return DraggableDirective;
}());
export { DraggableDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvZHJhZ2dhYmxlL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7SUFlckUsNEJBQ1UsWUFDQSxRQUNvQixnQkFBbUMsRUFDbkMsZUFBaUM7UUFIckQsZUFBVSxHQUFWLFVBQVU7UUFDVixXQUFNLEdBQU4sTUFBTTtRQUNjLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7UUFDbkMsb0JBQWUsR0FBZixlQUFlLENBQWtCO3lCQVZ6QyxJQUFJLFlBQVksRUFBaUI7dUJBQ25DLElBQUksWUFBWSxFQUFpQjtvQkFDcEMsSUFBSSxZQUFZLEVBQWlCOzBCQUVSLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztLQU96RDs7OztJQUVMLHFDQUFROzs7SUFBUjs7UUFDRSxJQUFJLE1BQU0sQ0FBQzs7UUFDWCxJQUFJLE1BQU0sQ0FBQzs7UUFDWCxJQUFJLFlBQVksQ0FBQztR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QUFDOztZQUN4QyxJQUFNLE9BQU8sR0FBeUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FDekUsR0FBRyxDQUFDLEtBQUssRUFDVDtnQkFDRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxFQUFFO29CQUNOLEtBQUs7b0JBQ0wsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztvQkFDeEIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7aUJBQ3hDO2FBQ0YsQ0FDRixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQzs7O2dCQWhJZixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0JBTlEsVUFBVTtnQkFWakIsTUFBTTtnQkFZQyxnQkFBZ0IsdUJBa0JwQixRQUFRLFlBQUksSUFBSTtnQkFuQlosZUFBZSx1QkFvQm5CLFFBQVEsWUFBSSxJQUFJOzs7d0JBWmxCLEtBQUssU0FBQyxjQUFjOzRCQUVwQixNQUFNOzBCQUNOLE1BQU07dUJBQ04sTUFBTTs7NkJBNUJUOztTQXNCYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBNb3VzZUV2ZW50IH0gZnJvbSAnbWFwYm94LWdsJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuLi9sYXllci9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi4vc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWdsRHJhZ2dhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnbWdsRHJhZ2dhYmxlJykgbGF5ZXI/OiBMYXllckNvbXBvbmVudDtcblxuICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBkZXN0cm95ZWQkOiBSZXBsYXlTdWJqZWN0PHZvaWQ+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxuICAgIHByaXZhdGUgTmdab25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIEZlYXR1cmVDb21wb25lbnQ/OiBGZWF0dXJlQ29tcG9uZW50LFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBNYXJrZXJDb21wb25lbnQ/OiBNYXJrZXJDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgZW50ZXIkO1xuICAgIGxldCBsZWF2ZSQ7XG4gICAgbGV0IHVwZGF0ZUNvb3JkcztcbiAgICBpZiAodGhpcy5NYXJrZXJDb21wb25lbnQpIHtcbiAgICAgIGxldCBtYXJrZXJFbGVtZW50ID0gKDxFbGVtZW50PnRoaXMuTWFya2VyQ29tcG9uZW50LmNvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICBpZiAobWFya2VyRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWFya2VyRWxlbWVudCA9IG1hcmtlckVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICB9XG4gICAgICBlbnRlciQgPSBmcm9tRXZlbnQobWFya2VyRWxlbWVudCwgJ21vdXNlZW50ZXInKTtcbiAgICAgIGxlYXZlJCA9IGZyb21FdmVudChtYXJrZXJFbGVtZW50LCAnbW91c2VsZWF2ZScpO1xuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5NYXJrZXJDb21wb25lbnQudXBkYXRlQ29vcmRpbmF0ZXMuYmluZCh0aGlzLk1hcmtlckNvbXBvbmVudCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgZW50ZXIkID0gdGhpcy5sYXllci5tb3VzZUVudGVyO1xuICAgICAgbGVhdmUkID0gdGhpcy5sYXllci5tb3VzZUxlYXZlO1xuICAgICAgdXBkYXRlQ29vcmRzID0gdGhpcy5GZWF0dXJlQ29tcG9uZW50LnVwZGF0ZUNvb3JkaW5hdGVzLmJpbmQodGhpcy5GZWF0dXJlQ29tcG9uZW50KTtcbiAgICAgIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQuZ2VvbWV0cnkudHlwZSAhPT0gJ1BvaW50Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbERyYWdnYWJsZSBvbmx5IHN1cHBvcnQgcG9pbnQgZmVhdHVyZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21nbERyYWdnYWJsZSBjYW4gb25seSBiZSB1c2VkIG9uIEZlYXR1cmUgKHdpdGggYSBsYXllciBhcyBpbnB1dCkgb3IgTWFya2VyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVEcmFnZ2FibGUoZW50ZXIkLCBsZWF2ZSQsIHVwZGF0ZUNvb3Jkcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCh1bmRlZmluZWQpO1xuICAgIHRoaXMuZGVzdHJveWVkJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVEcmFnZ2FibGUoZW50ZXIkOiBPYnNlcnZhYmxlPGFueT4sIGxlYXZlJDogT2JzZXJ2YWJsZTxhbnk+LCB1cGRhdGVDb29yZHM6IChjb29yZDogbnVtYmVyW10pID0+IHZvaWQpIHtcbiAgICBsZXQgbW92aW5nID0gZmFsc2U7XG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBDcmVhdGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgbW91c2VVcCQgPSBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2V1cCcpO1xuICAgICAgY29uc3QgZHJhZ1N0YXJ0JCA9IGVudGVyJC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICFtb3ZpbmcpLFxuICAgICAgICBmaWx0ZXIoKGV2dCkgPT4gdGhpcy5maWx0ZXJGZWF0dXJlKGV2dCkpLFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGluc2lkZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcignbW92ZScpO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKGZhbHNlKTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIGZyb21FdmVudDxNYXBNb3VzZUV2ZW50Pih0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdtb3VzZWRvd24nKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKGxlYXZlJCkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjb25zdCBkcmFnZ2luZyQgPSBkcmFnU3RhcnQkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2Vtb3ZlJylcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwobW91c2VVcCQpKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29uc3QgZHJhZ0VuZCQgPSBkcmFnU3RhcnQkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtb3VzZVVwJC5waXBlKHRha2UoMSkpKVxuICAgICAgKTtcbiAgICAgIGRyYWdTdGFydCQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgbW92aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0Lm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnU3RhcnQuZW1pdChldnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkcmFnZ2luZyQuc3Vic2NyaWJlKChldnQpID0+IHtcbiAgICAgICAgdXBkYXRlQ29vcmRzKFtldnQubG5nTGF0LmxuZywgZXZ0LmxuZ0xhdC5sYXRdKTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZy5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5OZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZy5lbWl0KGV2dCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRyYWdFbmQkLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgIG1vdmluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5kcmFnRW5kLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLk5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kcmFnRW5kLmVtaXQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpbnNpZGUpIHsgLy8gSXQncyBwb3NzaWJsZSB0byBkcmFnRW5kIG91dHNpZGUgdGhlIHRhcmdldCAoc21hbGwgaW5wdXQgbGFnKVxuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxlYXZlJC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSxcbiAgICAgICAgdGFwKCgpID0+IGluc2lkZSA9IGZhbHNlKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICFtb3ZpbmcpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJycpO1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1Bhbih0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWx0ZXJGZWF0dXJlKGV2dDogTWFwTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLkZlYXR1cmVDb21wb25lbnQgJiYgdGhpcy5sYXllcikge1xuICAgICAgY29uc3QgZmVhdHVyZTogR2VvSlNPTi5GZWF0dXJlPGFueT4gPSB0aGlzLk1hcFNlcnZpY2UucXVlcnlSZW5kZXJlZEZlYXR1cmVzKFxuICAgICAgICBldnQucG9pbnQsXG4gICAgICAgIHtcbiAgICAgICAgICBsYXllcnM6IFt0aGlzLmxheWVyLmlkXSxcbiAgICAgICAgICBmaWx0ZXI6IFtcbiAgICAgICAgICAgICdhbGwnLFxuICAgICAgICAgICAgWyc9PScsICckdHlwZScsICdQb2ludCddLFxuICAgICAgICAgICAgWyc9PScsICckaWQnLCB0aGlzLkZlYXR1cmVDb21wb25lbnQuaWRdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICApWzBdO1xuICAgICAgaWYgKCFmZWF0dXJlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuXG4iXX0=