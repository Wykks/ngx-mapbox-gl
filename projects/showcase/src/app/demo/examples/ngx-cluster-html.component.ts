import { Component, Input, OnInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GeoJSONSourceComponent } from 'ngx-mapbox-gl';

/**
 * Remember: mgl-layer are way faster than html markers
 * Html markers are fine if you don't have lots of points
 * Try to draw your point with a mgl-layer before using html markers
 * For a compromise, look at cluster-html example, which use only html markers for cluster points
 */

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/dark-v9'"
      [zoom]="[3]"
      [center]="[-103.59179687498357, 40.66995747013945]"
    >
      <ng-container *ngIf="earthquakes">
        <mgl-geojson-source
          #clusterComponent
          id="earthquakes"
          [data]="earthquakes"
          [cluster]="true"
          [clusterRadius]="50"
          [clusterMaxZoom]="14"
        ></mgl-geojson-source>
        <mgl-markers-for-clusters source="earthquakes">
          <ng-template mglPoint let-feature>
            <div class="marker" [title]="feature.properties['Secondary ID']">
              {{ feature.properties['Primary ID'] }}
            </div>
          </ng-template>
          <ng-template mglClusterPoint let-feature>
            <div class="marker-cluster" (click)="selectCluster($event, feature)">
              {{ feature.properties?.point_count }}
            </div>
          </ng-template>
        </mgl-markers-for-clusters>
        <mgl-popup *ngIf="selectedCluster" [feature]="selectedCluster">
          <showcase-cluster-popup
            [clusterComponent]="clusterComponent"
            [selectedCluster]="selectedCluster"
          ></showcase-cluster-popup>
        </mgl-popup>
      </ng-container>
    </mgl-map>
  `,
  styleUrls: ['./examples.css', './ngx-cluster-html.component.css'],
})
export class NgxClusterHtmlComponent implements OnInit {
  earthquakes: GeoJSON.FeatureCollection;
  selectedCluster: { geometry: GeoJSON.Point; properties: any };

  async ngOnInit() {
    const earthquakes: GeoJSON.FeatureCollection = <any>await import('./earthquakes.geo.json');
    setInterval(() => {
      if (earthquakes.features.length) {
        earthquakes.features.pop();
      }
      this.earthquakes = { ...earthquakes };
    }, 500);
  }

  selectCluster(event: MouseEvent, feature: any) {
    event.stopPropagation(); // This is needed, otherwise the popup will close immediately
    // Change the ref, to trigger mgl-popup onChanges (when the user click on the same cluster)
    this.selectedCluster = { geometry: feature.geometry, properties: feature.properties };
  }
}

@Component({
  selector: 'showcase-cluster-popup',
  template: `
    <mat-list>
      <mat-list-item *ngFor="let leaf of leaves">
        {{ leaf.properties['Primary ID'] }}
      </mat-list-item>
    </mat-list>
    <mat-paginator
      [length]="selectedCluster.properties?.point_count"
      [pageSize]="5"
      (page)="changePage($event)"
    ></mat-paginator>
  `,
})
export class ClusterPopupComponent implements OnChanges {
  @Input() selectedCluster: { geometry: GeoJSON.Point; properties: any };
  @Input() clusterComponent: GeoJSONSourceComponent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  leaves: GeoJSON.Feature<GeoJSON.Geometry>[];

  ngOnChanges(changes: SimpleChanges) {
    this.changePage();
    if (changes.selectedCluster && !changes.selectedCluster.isFirstChange()) {
      this.paginator.firstPage();
    }
  }

  async changePage(pageEvent?: PageEvent) {
    let offset = 0;
    if (pageEvent) {
      offset = pageEvent.pageIndex * 5;
    }
    this.leaves = await this.clusterComponent.getClusterLeaves(this.selectedCluster.properties!.cluster_id, 5, offset);
  }
}
