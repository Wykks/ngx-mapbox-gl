import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  NgZone,
  OnDestroy,
  TemplateRef,
  inject,
  input,
} from '@angular/core';
import type { MapSourceDataEvent, GeoJSONFeature } from 'mapbox-gl';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { LayerComponent } from '../layer/layer.component';
import { NgTemplateOutlet } from '@angular/common';

@Directive({
  selector: 'ng-template[mglPoint]',
})
export class PointDirective {}

@Directive({
  selector: 'ng-template[mglClusterPoint]',
})
export class ClusterPointDirective {}

let uniqId = 0;

@Component({
  selector: 'mgl-markers-for-clusters',

  template: `
    <mgl-layer
      [id]="layerId"
      [source]="source()"
      type="circle"
      [paint]="{ 'circle-radius': 0 }"
    />
    @for (feature of clusterPoints; track feature.id) {
      @if (feature.properties!['cluster']) {
        <mgl-marker [feature]="$any(feature)">
          @if (clusterPointTpl) {
            <ng-template
              [ngTemplateOutlet]="clusterPointTpl"
              [ngTemplateOutletContext]="{ $implicit: feature }"
            />
          }
        </mgl-marker>
      } @else {
        <mgl-marker [feature]="$any(feature)">
          @if (pointTpl) {
            <ng-template
              [ngTemplateOutlet]="pointTpl"
              [ngTemplateOutletContext]="{ $implicit: feature }"
            />
          }
        </mgl-marker>
      }
    }
  `,
  imports: [MarkerComponent, LayerComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkersForClustersComponent
  implements OnDestroy, AfterContentInit
{
  private mapService = inject(MapService);
  private ChangeDetectorRef = inject(ChangeDetectorRef);
  private zone = inject(NgZone);

  /* Init input */
  source = input.required<string>();

  @ContentChild(PointDirective, { read: TemplateRef, static: false })
  pointTpl?: TemplateRef<unknown>;
  @ContentChild(ClusterPointDirective, { read: TemplateRef, static: false })
  clusterPointTpl: TemplateRef<unknown>;

  clusterPoints!: GeoJSONFeature[];
  layerId = `mgl-markers-for-clusters-${uniqId++}`;

  private sub = new Subscription();

  ngAfterContentInit() {
    const clusterDataUpdate = () =>
      fromEvent<MapSourceDataEvent>(this.mapService.mapInstance, 'data').pipe(
        filter(
          (e) =>
            e.sourceId === this.source() &&
            e.sourceDataType !== 'metadata' &&
            this.mapService.mapInstance.isSourceLoaded(this.source()),
        ),
      );
    const sub = this.mapService.mapCreated$
      .pipe(
        switchMap(clusterDataUpdate),
        switchMap(() => fromEvent(this.mapService.mapInstance, 'render')),
      )
      .subscribe(() => {
        this.zone.run(() => {
          this.updateCluster();
        });
      });
    this.sub.add(sub);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  trackByClusterPoint(_index: number, clusterPoint: GeoJSONFeature) {
    return clusterPoint.id;
  }

  private updateCluster() {
    // Invalid queryRenderedFeatures typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = { layers: [this.layerId] };
    if (!this.pointTpl) {
      params.filter = ['==', 'cluster', true];
    }
    this.clusterPoints =
      this.mapService.mapInstance.queryRenderedFeatures(params);
    this.ChangeDetectorRef.markForCheck();
  }
}
