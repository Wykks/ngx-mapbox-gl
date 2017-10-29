import { FeatureComponent } from './feature.component';
import { Directive, Host, Input, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { merge } from 'rxjs/observable/merge';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LayerComponent } from '../../layer/layer.component';
import { MapService } from '../../map/map.service';

@Directive({
  selector: '[mglDraggable]'
})
export class DraggableDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('mglDraggable') source: LayerComponent;

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
      this.source.mouseEnter
        .takeUntil(this.destroyed$)
        .subscribe((evt) => {
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
          this.MapService.mapEvents.mouseDown
            .takeUntil(merge(this.destroyed$, this.source.mouseLeave))
            .subscribe(() => {
              this.MapService.mapEvents.mouseMove
                .takeUntil(merge(this.destroyed$, this.MapService.mapEvents.mouseUp))
                .subscribe((evt) => {
                  this.FeatureComponent.updateCoordinates([evt.lngLat.lng, evt.lngLat.lat]);
                });
            });
        });
      this.source.mouseLeave
        .takeUntil(this.destroyed$)
        .subscribe(() => {
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
