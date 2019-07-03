import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import Supercluster, { ClusterFeature, Options } from 'supercluster';
import { MapService } from '../map/map.service';
import { ClusterPointDirective, PointDirective } from '../markers-for-clusters/markers-for-clusters.component';

@Component({
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
})
export class MarkerClusterComponent implements OnChanges, OnDestroy, AfterContentInit, OnInit {
  /* Init input */
  @Input() radius?: number;
  @Input() maxZoom?: number;
  @Input() minZoom?: number;
  @Input() extent?: number;
  @Input() nodeSize?: number;
  @Input() log?: boolean;
  @Input() reduce?: (accumulated: any, props: any) => void;
  @Input() map?: (props: any) => any;

  /* Dynamic input */
  @Input() data: GeoJSON.FeatureCollection<GeoJSON.Point>;

  @Output() load = new EventEmitter<Supercluster<GeoJSON.GeoJsonProperties, GeoJSON.GeoJsonProperties>>();

  @ContentChild(PointDirective, { read: TemplateRef, static: false }) pointTpl: TemplateRef<any>;
  @ContentChild(ClusterPointDirective, { read: TemplateRef, static: false }) clusterPointTpl: TemplateRef<any>;

  clusterPoints: GeoJSON.Feature<GeoJSON.Point>[];

  private supercluster: Supercluster<GeoJSON.GeoJsonProperties, GeoJSON.GeoJsonProperties>;
  private sub = new Subscription();

  constructor(
    private MapService: MapService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    console.warn('[ngx-mapbox-gl] mgl-marker-cluster is deprecated, use mgl-markers-for-clusters instead');
    const options: Options<GeoJSON.GeoJsonProperties, GeoJSON.GeoJsonProperties> = {
      radius: this.radius,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      extent: this.extent,
      nodeSize: this.nodeSize,
      log: this.log,
      reduce: this.reduce,
      map: this.map
    };
    Object.keys(options)
      .forEach((key: string) => {
        const tkey = <keyof Options<GeoJSON.GeoJsonProperties, GeoJSON.GeoJsonProperties>>key;
        if (options[tkey] === undefined) {
          delete options[tkey];
        }
      });
    this.supercluster = new Supercluster<GeoJSON.GeoJsonProperties, GeoJSON.GeoJsonProperties>(options);
    this.supercluster.load(this.data.features);
    this.load.emit(this.supercluster);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && !changes.data.isFirstChange()) {
      this.supercluster.load(this.data.features);
      this.updateCluster();
    }
  }

  ngAfterContentInit() {
    this.MapService.mapCreated$.subscribe(() => {
      const mapMove$ = merge(
        fromEvent(<any>this.MapService.mapInstance, 'zoomChange'),
        fromEvent(<any>this.MapService.mapInstance, 'move')
      );
      const sub = mapMove$.pipe(
        startWith<any>(undefined)
      ).subscribe(() => {
        this.zone.run(() => {
          this.updateCluster();
        });
      });
      this.sub.add(sub);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getLeavesFn = (feature: ClusterFeature<GeoJSON.GeoJsonProperties>) => {
    return (limit?: number, offset?: number) => (<any>this.supercluster.getLeaves)(feature.properties.cluster_id!, limit, offset);
  }

  getChildrenFn = (feature: ClusterFeature<GeoJSON.GeoJsonProperties>) => {
    return () => (<any>this.supercluster.getChildren)(feature.properties.cluster_id!);
  }

  getClusterExpansionZoomFn = (feature: ClusterFeature<GeoJSON.GeoJsonProperties>) => {
    return () => (<any>this.supercluster.getClusterExpansionZoom)(feature.properties.cluster_id!);
  }

  private updateCluster() {
    const bbox = this.MapService.getCurrentViewportBbox();
    const currentZoom = Math.round(this.MapService.mapInstance.getZoom());
    this.clusterPoints = this.supercluster.getClusters(bbox, currentZoom);
    this.ChangeDetectorRef.markForCheck();
  }
}
