import { Directive, EventEmitter, Host, Input, NgZone, OnDestroy, OnInit, Optional, Output } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { FeatureComponent } from '../source/geojson/feature.component';

@Directive({
  selector: '[mglDraggable]',
})
export class DraggableDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('mglDraggable') layer?: LayerComponent;

  @Output() dragStart = new EventEmitter<MapMouseEvent>();
  @Output() dragEnd = new EventEmitter<MapMouseEvent>();
  @Output() drag = new EventEmitter<MapMouseEvent>();

  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  constructor(
    private MapService: MapService,
    private NgZone: NgZone,
    @Optional() @Host() private FeatureComponent?: FeatureComponent,
    @Optional() @Host() private MarkerComponent?: MarkerComponent
  ) {}

  ngOnInit() {
    let enter$;
    let leave$;
    let updateCoords;
    if (this.MarkerComponent) {
      console.warn('[ngx-mapbox-gl] mglDraggable on Marker is deprecated, use draggable input instead');
      let markerElement = <Element>this.MarkerComponent.content.nativeElement;
      if (markerElement.children.length === 1) {
        markerElement = markerElement.children[0];
      }
      enter$ = fromEvent(markerElement, 'mouseenter');
      leave$ = fromEvent(markerElement, 'mouseleave');
      updateCoords = this.MarkerComponent.updateCoordinates.bind(this.MarkerComponent);
    } else if (this.FeatureComponent && this.layer) {
      enter$ = this.layer.mouseEnter;
      leave$ = this.layer.mouseLeave;
      updateCoords = this.FeatureComponent.updateCoordinates.bind(this.FeatureComponent);
      if (this.FeatureComponent.geometry.type !== 'Point') {
        throw new Error('mglDraggable only support point feature');
      }
    } else {
      throw new Error('mglDraggable can only be used on Feature (with a layer as input) or Marker');
    }

    this.handleDraggable(enter$, leave$, updateCoords);
  }

  ngOnDestroy() {
    this.destroyed$.next(undefined);
    this.destroyed$.complete();
  }

  private handleDraggable(enter$: Observable<any>, leave$: Observable<any>, updateCoords: (coord: number[]) => void) {
    let moving = false;
    let inside = false;
    this.MapService.mapCreated$.subscribe(() => {
      const mouseUp$ = fromEvent<MapMouseEvent>(<any>this.MapService.mapInstance, 'mouseup');
      const dragStart$ = enter$.pipe(
        takeUntil(this.destroyed$),
        filter(() => !moving),
        filter((evt) => this.filterFeature(evt)),
        tap(() => {
          inside = true;
          this.MapService.changeCanvasCursor('move');
          this.MapService.updateDragPan(false);
        }),
        switchMap(() => fromEvent<MapMouseEvent>(<any>this.MapService.mapInstance, 'mousedown').pipe(takeUntil(leave$)))
      );
      const dragging$ = dragStart$.pipe(
        switchMap(() =>
          fromEvent<MapMouseEvent>(<any>this.MapService.mapInstance, 'mousemove').pipe(takeUntil(mouseUp$))
        )
      );
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
        if (!inside) {
          // It's possible to dragEnd outside the target (small input lag)
          this.MapService.changeCanvasCursor('');
          this.MapService.updateDragPan(true);
        }
      });
      leave$
        .pipe(
          takeUntil(this.destroyed$),
          tap(() => (inside = false)),
          filter(() => !moving)
        )
        .subscribe(() => {
          this.MapService.changeCanvasCursor('');
          this.MapService.updateDragPan(true);
        });
    });
  }

  private filterFeature(evt: MapMouseEvent) {
    if (this.FeatureComponent && this.layer) {
      const feature: GeoJSON.Feature<any> = this.MapService.queryRenderedFeatures(evt.point, {
        layers: [this.layer.id],
        filter: ['all', ['==', '$type', 'Point'], ['==', '$id', this.FeatureComponent.id]],
      })[0];
      if (!feature) {
        return false;
      }
    }
    return true;
  }
}
