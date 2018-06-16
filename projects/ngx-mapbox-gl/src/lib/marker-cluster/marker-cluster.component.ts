import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
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
import supercluster, { Cluster, Options as SuperclusterOptions, Supercluster } from 'supercluster';
import { MapService } from '../map/map.service';

@Directive({ selector: 'ng-template[mglPoint]' })
export class PointDirective { }

@Directive({ selector: 'ng-template[mglClusterPoint]' })
export class ClusterPointDirective { }

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
  @Input() initial?: () => any;
  @Input() map?: (props: any) => any;

  /* Dynamic input */
  @Input() data: GeoJSON.FeatureCollection<GeoJSON.Point>;

  @Output() load = new EventEmitter<Supercluster>();

  @ContentChild(PointDirective, { read: TemplateRef }) pointTpl: TemplateRef<any>;
  @ContentChild(ClusterPointDirective, { read: TemplateRef }) clusterPointTpl: TemplateRef<any>;

  clusterPoints: GeoJSON.Feature<GeoJSON.Point>[];

  private supercluster: Supercluster;
  private sub = new Subscription();

  constructor(
    private MapService: MapService,
    private ChangeDetectorRef: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    const options: SuperclusterOptions = {
      radius: this.radius,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      extent: this.extent,
      nodeSize: this.nodeSize,
      log: this.log,
      reduce: this.reduce,
      initial: this.initial,
      map: this.map
    };
    Object.keys(options)
      .forEach((key: string) => {
        const tkey = <keyof SuperclusterOptions>key;
        if (options[tkey] === undefined) {
          delete options[tkey];
        }
      });
    this.supercluster = supercluster(options);
    this.supercluster.load(this.data.features);
    this.load.emit(this.supercluster);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && !changes.data.isFirstChange()) {
      this.supercluster.load(this.data.features);
    }
  }

  ngAfterContentInit() {
    this.MapService.mapCreated$.subscribe(() => {
      const mapMove$ = merge(
        fromEvent(this.MapService.mapInstance, 'zoomChange'),
        fromEvent(this.MapService.mapInstance, 'move')
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

  getLeavesFn = (feature: Cluster) => {
    return (limit?: number, offset?: number) => (<any>this.supercluster.getLeaves)(feature.properties.cluster_id!, limit, offset);
  }

  getChildrenFn = (feature: Cluster) => {
    return () => (<any>this.supercluster.getChildren)(feature.properties.cluster_id!);
  }

  getClusterExpansionZoomFn = (feature: Cluster) => {
    return () => (<any>this.supercluster.getClusterExpansionZoom)(feature.properties.cluster_id!);
  }

  private updateCluster() {
    const bbox = this.MapService.getCurrentViewportBbox();
    const currentZoom = Math.round(this.MapService.mapInstance.getZoom());
    this.clusterPoints = this.supercluster.getClusters(bbox, currentZoom);
    this.ChangeDetectorRef.markForCheck();
  }
}
