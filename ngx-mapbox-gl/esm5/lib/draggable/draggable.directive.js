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
            console.warn('mglDraggable on Marker is deprecated, use draggable input instead');
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
                if (!inside) { // It's possible to dragEnd outside the target (small input lag)
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
                },] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvZHJhZ2dhYmxlL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7SUFlckUsNEJBQ1UsWUFDQSxRQUNvQixnQkFBbUMsRUFDbkMsZUFBaUM7UUFIckQsZUFBVSxHQUFWLFVBQVU7UUFDVixXQUFNLEdBQU4sTUFBTTtRQUNjLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7UUFDbkMsb0JBQWUsR0FBZixlQUFlLENBQWtCO3lCQVZ6QyxJQUFJLFlBQVksRUFBaUI7dUJBQ25DLElBQUksWUFBWSxFQUFpQjtvQkFDcEMsSUFBSSxZQUFZLEVBQWlCOzBCQUVSLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztLQU96RDs7OztJQUVMLHFDQUFROzs7SUFBUjs7UUFDRSxJQUFJLE1BQU0sQ0FBQzs7UUFDWCxJQUFJLE1BQU0sQ0FBQzs7UUFDWCxJQUFJLFlBQVksQ0FBQztR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QkFDTixLQUFLO29CQUNMLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7b0JBQ3hCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO2lCQUN4QzthQUNGLENBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7OztnQkFqSWYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7O2dCQU5RLFVBQVU7Z0JBVmpCLE1BQU07Z0JBWUMsZ0JBQWdCLHVCQWtCcEIsUUFBUSxZQUFJLElBQUk7Z0JBbkJaLGVBQWUsdUJBb0JuQixRQUFRLFlBQUksSUFBSTs7O3dCQVpsQixLQUFLLFNBQUMsY0FBYzs0QkFFcEIsTUFBTTswQkFDTixNQUFNO3VCQUNOLE1BQU07OzZCQTVCVDs7U0FzQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwTW91c2VFdmVudCB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwLCB0YWtlLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExheWVyQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5ZXIvbGF5ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbXBvbmVudCB9IGZyb20gJy4uL3NvdXJjZS9nZW9qc29uL2ZlYXR1cmUuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21nbERyYWdnYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ21nbERyYWdnYWJsZScpIGxheWVyPzogTGF5ZXJDb21wb25lbnQ7XG5cbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuXG4gIHByaXZhdGUgZGVzdHJveWVkJDogUmVwbGF5U3ViamVjdDx2b2lkPiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIE5nWm9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBGZWF0dXJlQ29tcG9uZW50PzogRmVhdHVyZUNvbXBvbmVudCxcbiAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgTWFya2VyQ29tcG9uZW50PzogTWFya2VyQ29tcG9uZW50XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IGVudGVyJDtcbiAgICBsZXQgbGVhdmUkO1xuICAgIGxldCB1cGRhdGVDb29yZHM7XG4gICAgaWYgKHRoaXMuTWFya2VyQ29tcG9uZW50KSB7XG4gICAgICBjb25zb2xlLndhcm4oJ21nbERyYWdnYWJsZSBvbiBNYXJrZXIgaXMgZGVwcmVjYXRlZCwgdXNlIGRyYWdnYWJsZSBpbnB1dCBpbnN0ZWFkJyk7XG4gICAgICBsZXQgbWFya2VyRWxlbWVudCA9ICg8RWxlbWVudD50aGlzLk1hcmtlckNvbXBvbmVudC5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgaWYgKG1hcmtlckVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1hcmtlckVsZW1lbnQgPSBtYXJrZXJFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgfVxuICAgICAgZW50ZXIkID0gZnJvbUV2ZW50KG1hcmtlckVsZW1lbnQsICdtb3VzZWVudGVyJyk7XG4gICAgICBsZWF2ZSQgPSBmcm9tRXZlbnQobWFya2VyRWxlbWVudCwgJ21vdXNlbGVhdmUnKTtcbiAgICAgIHVwZGF0ZUNvb3JkcyA9IHRoaXMuTWFya2VyQ29tcG9uZW50LnVwZGF0ZUNvb3JkaW5hdGVzLmJpbmQodGhpcy5NYXJrZXJDb21wb25lbnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5GZWF0dXJlQ29tcG9uZW50ICYmIHRoaXMubGF5ZXIpIHtcbiAgICAgIGVudGVyJCA9IHRoaXMubGF5ZXIubW91c2VFbnRlcjtcbiAgICAgIGxlYXZlJCA9IHRoaXMubGF5ZXIubW91c2VMZWF2ZTtcbiAgICAgIHVwZGF0ZUNvb3JkcyA9IHRoaXMuRmVhdHVyZUNvbXBvbmVudC51cGRhdGVDb29yZGluYXRlcy5iaW5kKHRoaXMuRmVhdHVyZUNvbXBvbmVudCk7XG4gICAgICBpZiAodGhpcy5GZWF0dXJlQ29tcG9uZW50Lmdlb21ldHJ5LnR5cGUgIT09ICdQb2ludCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2xEcmFnZ2FibGUgb25seSBzdXBwb3J0IHBvaW50IGZlYXR1cmUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZ2xEcmFnZ2FibGUgY2FuIG9ubHkgYmUgdXNlZCBvbiBGZWF0dXJlICh3aXRoIGEgbGF5ZXIgYXMgaW5wdXQpIG9yIE1hcmtlcicpO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlRHJhZ2dhYmxlKGVudGVyJCwgbGVhdmUkLCB1cGRhdGVDb29yZHMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQkLm5leHQodW5kZWZpbmVkKTtcbiAgICB0aGlzLmRlc3Ryb3llZCQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRHJhZ2dhYmxlKGVudGVyJDogT2JzZXJ2YWJsZTxhbnk+LCBsZWF2ZSQ6IE9ic2VydmFibGU8YW55PiwgdXBkYXRlQ29vcmRzOiAoY29vcmQ6IG51bWJlcltdKSA9PiB2b2lkKSB7XG4gICAgbGV0IG1vdmluZyA9IGZhbHNlO1xuICAgIGxldCBpbnNpZGUgPSBmYWxzZTtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwQ3JlYXRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IG1vdXNlVXAkID0gZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdXNldXAnKTtcbiAgICAgIGNvbnN0IGRyYWdTdGFydCQgPSBlbnRlciQucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhbW92aW5nKSxcbiAgICAgICAgZmlsdGVyKChldnQpID0+IHRoaXMuZmlsdGVyRmVhdHVyZShldnQpKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuTWFwU2VydmljZS5jaGFuZ2VDYW52YXNDdXJzb3IoJ21vdmUnKTtcbiAgICAgICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1BhbihmYWxzZSk7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICBmcm9tRXZlbnQ8TWFwTW91c2VFdmVudD4odGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLCAnbW91c2Vkb3duJylcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbChsZWF2ZSQpKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29uc3QgZHJhZ2dpbmckID0gZHJhZ1N0YXJ0JC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbUV2ZW50PE1hcE1vdXNlRXZlbnQ+KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ21vdXNlbW92ZScpXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKG1vdXNlVXAkKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRyYWdFbmQkID0gZHJhZ1N0YXJ0JC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbW91c2VVcCQucGlwZSh0YWtlKDEpKSlcbiAgICAgICk7XG4gICAgICBkcmFnU3RhcnQkLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgIG1vdmluZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmRyYWdTdGFydC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5OZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ1N0YXJ0LmVtaXQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZHJhZ2dpbmckLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgIHVwZGF0ZUNvb3JkcyhbZXZ0LmxuZ0xhdC5sbmcsIGV2dC5sbmdMYXQubGF0XSk7XG4gICAgICAgIGlmICh0aGlzLmRyYWcub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuTmdab25lLnJ1bigoKSA9PiB0aGlzLmRyYWcuZW1pdChldnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBkcmFnRW5kJC5zdWJzY3JpYmUoKGV2dCkgPT4ge1xuICAgICAgICBtb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0VuZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5OZ1pvbmUucnVuKCgpID0+IHRoaXMuZHJhZ0VuZC5lbWl0KGV2dCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaW5zaWRlKSB7IC8vIEl0J3MgcG9zc2libGUgdG8gZHJhZ0VuZCBvdXRzaWRlIHRoZSB0YXJnZXQgKHNtYWxsIGlucHV0IGxhZylcbiAgICAgICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKCcnKTtcbiAgICAgICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlRHJhZ1Bhbih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsZWF2ZSQucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCksXG4gICAgICAgIHRhcCgoKSA9PiBpbnNpZGUgPSBmYWxzZSksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhbW92aW5nKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKCcnKTtcbiAgICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURyYWdQYW4odHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyRmVhdHVyZShldnQ6IE1hcE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5GZWF0dXJlQ29tcG9uZW50ICYmIHRoaXMubGF5ZXIpIHtcbiAgICAgIGNvbnN0IGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxhbnk+ID0gdGhpcy5NYXBTZXJ2aWNlLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhcbiAgICAgICAgZXZ0LnBvaW50LFxuICAgICAgICB7XG4gICAgICAgICAgbGF5ZXJzOiBbdGhpcy5sYXllci5pZF0sXG4gICAgICAgICAgZmlsdGVyOiBbXG4gICAgICAgICAgICAnYWxsJyxcbiAgICAgICAgICAgIFsnPT0nLCAnJHR5cGUnLCAnUG9pbnQnXSxcbiAgICAgICAgICAgIFsnPT0nLCAnJGlkJywgdGhpcy5GZWF0dXJlQ29tcG9uZW50LmlkXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgKVswXTtcbiAgICAgIGlmICghZmVhdHVyZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cblxuIl19