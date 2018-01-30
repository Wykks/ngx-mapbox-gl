import { Directive, Host, Input, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LayerComponent } from '../../layer/layer.component';
import { MapService } from '../../map/map.service';
import { FeatureComponent } from './feature.component';

@Directive({
  selector: '[mglDraggable]'
})
export class DraggableDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('mglDraggable') source: LayerComponent;

  @Output() dragStart = new EventEmitter<MapMouseEvent>();
  @Output() dragEnd = new EventEmitter<MapMouseEvent>();
  @Output() drag = new EventEmitter<MapMouseEvent>();

  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  constructor(
    private MapService: MapService,
    @Host() private FeatureComponent: FeatureComponent
  ) { }

  ngOnInit() {
    if (this.FeatureComponent.geometry.type !== 'Point') {
      throw new Error('mglDraggable only support point feature');
    }
    this.MapService.mapCreated$.subscribe(() => {
      this.source.mouseEnter.pipe(
        takeUntil(this.destroyed$)
      ).subscribe((evt) => {
        const feature: GeoJSON.Feature<any> = this.MapService.queryRenderedFeatures(
          evt.point,
          {
            layers: [this.source.id],
            filter: [
              'all',
              ['==', '$type', 'Point'],
              ['==', '$id', this.FeatureComponent.id]
            ]
          }
        )[0];
        if (!feature) {
          return;
        }
        this.MapService.changeCanvasCursor('move');
        this.MapService.updateDragPan(false);

        fromEvent(this.MapService.mapInstance, 'mousedown').pipe(
          takeUntil(merge(this.destroyed$, this.source.mouseLeave))
        ).subscribe(() => {
          this.dragStart.emit(evt);
          fromEvent<MapMouseEvent>(this.MapService.mapInstance, 'mousemove').pipe(
            takeUntil(merge(this.destroyed$, fromEvent(this.MapService.mapInstance, 'mouseup')))
          ).subscribe(
            evt => {
              this.drag.emit(evt);
              this.FeatureComponent.updateCoordinates([evt.lngLat.lng, evt.lngLat.lat]);
            },
            err => err,
            () => this.dragEnd.emit(evt)
          );
        });
      });
      this.source.mouseLeave.pipe(
        takeUntil(this.destroyed$)
      ).subscribe(() => {
        this.MapService.changeCanvasCursor('');
        this.MapService.updateDragPan(true);
      });
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(undefined);
    this.destroyed$.complete();
  }
}
