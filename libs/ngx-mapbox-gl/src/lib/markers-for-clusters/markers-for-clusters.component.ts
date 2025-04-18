import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  NgZone,
  OnDestroy,
  TemplateRef,
  inject,
  input,
  signal,
} from '@angular/core';
import type {
  MapSourceDataEvent,
  GeoJSONFeature,
  FilterSpecification,
} from 'mapbox-gl';
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
    @for (feature of clusterPoints(); track trackByFeature(feature)) {
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
  private zone = inject(NgZone);

  /* Init input */
  source = input.required<string>();

  /* Dynamic input */
  /**
   * Track unique points by feature.id, but fallback to provided key if id is not available
   */
  failbackPointIdKey = input<string>();

  @ContentChild(PointDirective, { read: TemplateRef, static: false })
  pointTpl?: TemplateRef<unknown>;
  @ContentChild(ClusterPointDirective, { read: TemplateRef, static: false })
  clusterPointTpl: TemplateRef<unknown>;

  clusterPoints = signal<GeoJSONFeature[]>([]);
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
        switchMap(() =>
          merge(
            fromEvent(this.mapService.mapInstance, 'move'),
            fromEvent(this.mapService.mapInstance, 'moveend'),
          ).pipe(startWith(undefined)),
        ),
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

  trackByFeature(feature: GeoJSONFeature) {
    if (feature.id) {
      return feature.id;
    }
    const fallbackKey = this.failbackPointIdKey();
    if (!fallbackKey) {
      console.warn(
        '[mgl-markers-for-clusters] feature.id is falsy, please provide a fallback key',
      );
      return '';
    }
    const id = feature.properties?.[fallbackKey];
    if (!id) {
      console.warn(
        `[mgl-markers-for-clusters] Fallback key [${fallbackKey}], resolve to falsy for`,
        feature,
      );
      return '';
    }
    return id;
  }

  private updateCluster() {
    const params: { layers?: string[]; filter?: FilterSpecification } = {
      layers: [this.layerId],
    };
    if (!this.pointTpl) {
      params.filter = ['==', 'cluster', true];
    }
    const clusterPoints =
      this.mapService.mapInstance.queryRenderedFeatures(params);
    // Remove duplicates, because it seems that queryRenderedFeatures can return duplicates
    const seen = new Set();
    const unique = [];
    for (const feature of clusterPoints) {
      const id = this.trackByFeature(feature);
      if (!seen.has(id)) {
        seen.add(id);
        unique.push(feature);
      }
    }
    this.clusterPoints.set(unique);
  }
}
