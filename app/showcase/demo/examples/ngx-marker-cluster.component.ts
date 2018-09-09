import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { LngLatLike } from 'mapbox-gl';
import { Cluster, Supercluster } from 'supercluster';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-cluster-popup',
  template: `
      <mat-list>
        <mat-list-item
          *ngFor="let leaf of leaves"
        >
          {{ leaf.properties['Primary ID'] }}
        </mat-list-item>
      </mat-list>
      <mat-paginator
        [length]="count"
        [pageSize]="5"
        (page)="changePage($event)"
      ></mat-paginator>
    `
})
export class ClusterPopupComponent implements OnChanges {
  @Input() clusterId: GeoJSON.Feature<GeoJSON.Point>;
  @Input() supercluster: Supercluster;
  @Input() count: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  leaves: GeoJSON.Feature<GeoJSON.Point>[];

  ngOnChanges(changes: SimpleChanges) {
    this.changePage();
    if (changes.count && !changes.count.isFirstChange()) {
      this.paginator.firstPage();
    }
  }

  changePage(pageEvent?: PageEvent) {
    let offset = 0;
    if (pageEvent) {
      offset = pageEvent.pageIndex * 5;
    }
    // Typing issue in supercluster
    this.leaves = (<any>this.supercluster.getLeaves)(this.clusterId, 5, offset);
  }
}

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    style="mapbox://styles/mapbox/dark-v9"
    [zoom]="[3]"
    [center]="[-103.59179687498357, 40.66995747013945]"
  >
    <mgl-marker-cluster
      *ngIf="earthquakes"
      [data]="earthquakes"
      [maxZoom]="14"
      [radius]="50"
      (load)="supercluster = $event"
    >
      <ng-template mglPoint let-feature>
        <div
          class="marker"
          [title]="feature.properties['Secondary ID']"
        >
          {{ feature.properties['Primary ID'] }}
        </div>
      </ng-template>
      <ng-template mglClusterPoint let-feature>
        <div
          class="marker-cluster"
          (click)="selectCluster($event, feature)"
        >
          {{ feature.properties?.point_count }}
        </div>
      </ng-template>
    </mgl-marker-cluster>
    <mgl-popup
      *ngIf="selectedCluster"
      [lngLat]="selectedCluster.lngLat"
    >
      <demo-cluster-popup
        [supercluster]="supercluster"
        [clusterId]="selectedCluster.id"
        [count]="selectedCluster.count"
      ></demo-cluster-popup>
    </mgl-popup>
  </mgl-map>
  `,
  styleUrls: ['./examples.css', './ngx-marker-cluster.component.css']
})
export class NgxMarkerClusterComponent implements OnInit {
  earthquakes: object;
  supercluster: Supercluster;
  selectedCluster: {
    lngLat: LngLatLike;
    count: number;
    id: number;
  };

  async ngOnInit() {
    this.earthquakes = await import('./earthquakes.geo.json');
  }

  selectCluster(event: MouseEvent, feature: Cluster) {
    event.stopPropagation(); // This is needed, otherwise the popup will close immediately
    this.selectedCluster = {
      // Change the ref, to trigger mgl-popup onChanges (when the user click on the same cluster)
      lngLat: [ ...feature.geometry!.coordinates ],
      count: feature.properties.point_count!,
      id: feature.properties.cluster_id!
    };
  }
}
