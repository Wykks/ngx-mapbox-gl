import {
  Directive,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  inject,
  input,
} from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { LayerComponent } from '../layer/layer.component';
import { MapService } from '../map/map.service';
import { FeatureComponent } from '../source/geojson/feature.component';

@Directive({
  selector: '[mglDraggable]',
})
export class DraggableDirective implements OnInit, OnDestroy {
  private mapService = inject(MapService);
  private ngZone = inject(NgZone);
  private featureComponent = inject(FeatureComponent, {
    optional: true,
    host: true,
  });

  layer = input<LayerComponent>(undefined, { alias: 'mglDraggable' });

  @Output() featureDragStart = new EventEmitter<MapMouseEvent>();
  @Output() featureDragEnd = new EventEmitter<MapMouseEvent>();
  @Output() featureDrag = new EventEmitter<MapMouseEvent>();

  private sub = new Subscription();

  ngOnInit() {
    let enter$;
    let leave$;
    let updateCoords;
    const layer = this.layer();
    if (this.featureComponent && layer) {
      enter$ = layer.layerMouseEnter;
      leave$ = layer.layerMouseLeave;
      updateCoords = this.featureComponent.updateCoordinates.bind(
        this.featureComponent,
      );
      if (this.featureComponent.geometry().type !== 'Point') {
        throw new Error('mglDraggable only support point feature');
      }
    } else {
      throw new Error(
        'mglDraggable can only be used on Feature (with a layer as input) or Marker',
      );
    }

    this.handleDraggable(enter$, leave$, updateCoords);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private handleDraggable(
    enter$: Observable<MapMouseEvent>,
    leave$: Observable<MapMouseEvent>,
    updateCoords: (coord: number[]) => void,
  ) {
    let moving = false;
    let inside = false;
    this.mapService.mapCreated$.subscribe(() => {
      const mouseUp$ = fromEvent<MapMouseEvent>(
        this.mapService.mapInstance,
        'mouseup',
      );
      const dragStart$ = enter$.pipe(
        filter(() => !moving),
        filter((evt) => this.filterFeature(evt)),
        tap(() => {
          inside = true;
          this.mapService.changeCanvasCursor('move');
          this.mapService.updateDragPan(false);
        }),
        switchMap(() =>
          fromEvent<MapMouseEvent>(
            this.mapService.mapInstance,
            'mousedown',
          ).pipe(takeUntil(leave$)),
        ),
      );
      const dragging$ = dragStart$.pipe(
        switchMap(() =>
          fromEvent<MapMouseEvent>(
            this.mapService.mapInstance,
            'mousemove',
          ).pipe(takeUntil(mouseUp$)),
        ),
      );
      const dragEnd$ = dragStart$.pipe(switchMap(() => mouseUp$.pipe(take(1))));
      this.sub.add(
        dragStart$.subscribe((evt) => {
          moving = true;
          if (this.featureDragStart.observed) {
            this.ngZone.run(() => {
              this.featureDragStart.emit(evt);
            });
          }
        }),
      );
      this.sub.add(
        dragging$.subscribe((evt) => {
          updateCoords([evt.lngLat.lng, evt.lngLat.lat]);
          if (this.featureDrag.observed) {
            this.ngZone.run(() => {
              this.featureDrag.emit(evt);
            });
          }
        }),
      );
      this.sub.add(
        dragEnd$.subscribe((evt) => {
          moving = false;
          if (this.featureDragEnd.observed) {
            this.ngZone.run(() => {
              this.featureDragEnd.emit(evt);
            });
          }
          if (!inside) {
            // It's possible to dragEnd outside the target (small input lag)
            this.mapService.changeCanvasCursor('');
            this.mapService.updateDragPan(true);
          }
        }),
      );
      this.sub.add(
        leave$
          .pipe(
            tap(() => (inside = false)),
            filter(() => !moving),
          )
          .subscribe(() => {
            this.mapService.changeCanvasCursor('');
            this.mapService.updateDragPan(true);
          }),
      );
    });
  }

  private filterFeature(evt: MapMouseEvent) {
    const layer = this.layer();
    if (this.featureComponent && layer) {
      const feature: GeoJSON.Feature<GeoJSON.GeometryObject> =
        this.mapService.queryRenderedFeatures(evt.point, {
          layers: [layer.id()],
          filter: [
            'all',
            ['==', '$type', 'Point'],
            ['==', '$id', this.featureComponent.id()],
          ],
        })[0];
      if (!feature) {
        return false;
      }
    }
    return true;
  }
}
