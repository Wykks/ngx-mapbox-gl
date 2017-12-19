import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { startWith } from 'rxjs/operators/startWith';
import { Subscription } from 'rxjs/Subscription';
import supercluster, { Supercluster } from 'supercluster';
import { MapService } from '../map/map.service';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  OnInit,
  ChangeDetectionStrategy,
  Directive,
  TemplateRef,
  ContentChild,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';

@Directive({ selector: 'ng-template[mglPoint]' })
export class PointDirective { }

@Directive({ selector: 'ng-template[mglClusterPoint]' })
export class ClusterPointDirective { }

@Component({
  selector: 'mgl-cluster',
  template: `
    <ng-container *ngFor="let feature of clusterPoints">
      <ng-container *ngIf="feature.properties.cluster; else point">
        <ng-container *ngTemplateOutlet="clusterPointTpl; context: { $implicit: feature }"></ng-container>
      </ng-container>
      <ng-template #point>
        <ng-container *ngTemplateOutlet="pointTpl; context: { $implicit: feature }"></ng-container>
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class ClusterComponent implements OnChanges, OnDestroy, AfterContentInit, OnInit {
  /* Init input */
  @Input() radius: any;
  @Input() maxZoom: any;
  @Input() minZoom: any;
  @Input() extent: any;
  @Input() nodeSize: any;
  @Input() log: any;

  /* Dynamic input */
  @Input() data: GeoJSON.FeatureCollection<GeoJSON.Point>;

  @ContentChild(PointDirective, { read: TemplateRef }) pointTpl: TemplateRef<any>;
  @ContentChild(ClusterPointDirective, { read: TemplateRef }) clusterPointTpl: TemplateRef<any>;

  clusterPoints: GeoJSON.Feature<GeoJSON.Point>[];

  private supercluster: Supercluster;
  private sub = new Subscription();

  constructor(
    private MapService: MapService,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.supercluster = supercluster({
      radius: this.radius,
      maxZoom: this.maxZoom
    });
    this.supercluster.load(this.data.features);
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
      ).subscribe(() => this.updateCluster());
      this.sub.add(sub);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private updateCluster() {
    const bbox = this.MapService.getCurrentViewportBbox();
    const currentZoom = Math.round(this.MapService.mapInstance.getZoom());
    this.clusterPoints = this.supercluster.getClusters(bbox, currentZoom);
    this.ChangeDetectorRef.detectChanges();
  }
}
