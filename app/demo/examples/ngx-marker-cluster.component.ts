import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Cluster } from 'supercluster';

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
        [length]="selectedCluster.properties?.point_count"
        [pageSize]="5"
        (page)="changePage($event)"
      ></mat-paginator>
    `
})
export class ClusterPopupComponent implements OnChanges {
  @Input() selectedCluster: GeoJSON.Feature<GeoJSON.Point>;
  @Input() supercluster: any; // Supercluster;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  leaves: GeoJSON.Feature<GeoJSON.Point>[];

  ngOnChanges(changes: SimpleChanges) {
    this.changePage();
    if (changes.selectedCluster && !changes.selectedCluster.isFirstChange()) {
      this.paginator.firstPage();
    }
  }

  changePage(pageEvent?: PageEvent) {
    let offset = 0;
    if (pageEvent) {
      offset = pageEvent.pageIndex * 5;
    }
    // Typing issue in supercluster
    this.leaves = (<any>this.supercluster.getLeaves)(this.selectedCluster.properties!.cluster_id, 5, offset);
  }
}

@Component({
  selector: 'showcase-demo',
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
      [feature]="selectedCluster"
    >
      <demo-cluster-popup
        [supercluster]="supercluster"
        [selectedCluster]="selectedCluster"
      ></demo-cluster-popup>
    </mgl-popup>
  </mgl-map>
  `,
  styleUrls: ['./examples.css', './ngx-marker-cluster.component.css']
})
export class NgxMarkerClusterComponent implements OnInit {
  earthquakes: object;
  supercluster: any; // Supercluster;
  selectedCluster: GeoJSON.Feature<GeoJSON.Point>;

  async ngOnInit() {
    this.earthquakes = await import('./earthquakes.geo.json');
  }

  selectCluster(event: MouseEvent, feature: Cluster) {
    event.stopPropagation(); // This is needed, otherwise the popup will close immediately
    // Change the ref, to trigger mgl-popup onChanges (when the user click on the same cluster)
    this.selectedCluster = { ...feature };
  }
}
