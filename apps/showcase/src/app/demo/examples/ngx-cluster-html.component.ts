import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import {
  MatPaginator,
  PageEvent,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import {
  GeoJSONSourceComponent,
  MapComponent,
  MarkersForClustersComponent,
  ClusterPointDirective,
  PointDirective,
  PopupComponent,
} from 'ngx-mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';

/**
 * Remember: mgl-layer are way faster than html markers
 * Html markers are fine if you don't have lots of points
 * Try to draw your point with a mgl-layer before using html markers
 * For a compromise, look at cluster-html example, which use only html markers for cluster points
 */

@Component({
  selector: 'showcase-cluster-popup',
  template: `
    <mat-list>
      <mat-list-item *ngFor="let leaf of leaves">
        {{ leaf.properties?.['Primary ID'] }}
      </mat-list-item>
    </mat-list>
    <mat-paginator
      [length]="selectedCluster.properties?.['point_count']"
      [pageSize]="5"
      (page)="changePage($event)"
    />
  `,
  imports: [MatListModule, MatPaginatorModule, NgForOf],
})
export class ClusterPopupComponent implements OnChanges {
  @Input() selectedCluster: GeoJSON.Feature<GeoJSON.Point>;
  @Input() clusterComponent: GeoJSONSourceComponent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  leaves: GeoJSON.Feature<GeoJSON.Geometry>[];

  ngOnChanges(changes: SimpleChanges) {
    this.changePage();
    if (
      changes['selectedCluster'] &&
      !changes['selectedCluster'].isFirstChange()
    ) {
      this.paginator.firstPage();
    }
  }

  async changePage(pageEvent?: PageEvent) {
    let offset = 0;
    if (pageEvent) {
      offset = pageEvent.pageIndex * 5;
    }
    this.leaves = await this.clusterComponent.getClusterLeaves(
      this.selectedCluster.properties?.['cluster_id'] ?? 0,
      5,
      offset,
    );
  }
}

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
        />
        <mgl-markers-for-clusters source="earthquakes">
          <ng-template mglPoint let-feature>
            <div class="marker" [title]="feature.properties['Secondary ID']">
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
        </mgl-markers-for-clusters>
        <mgl-popup *ngIf="selectedCluster" [feature]="selectedCluster">
          <showcase-cluster-popup
            [clusterComponent]="clusterComponent"
            [selectedCluster]="selectedCluster"
          />
        </mgl-popup>
      </ng-container>
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    GeoJSONSourceComponent,
    MarkersForClustersComponent,
    ClusterPointDirective,
    PointDirective,
    PopupComponent,
    ClusterPopupComponent,
    NgIf,
  ],
  styleUrls: ['./examples.css', './ngx-cluster-html.component.css'],
})
export class NgxClusterHtmlComponent implements OnInit {
  earthquakes: GeoJSON.FeatureCollection;
  selectedCluster: GeoJSON.Feature<GeoJSON.Point>;

  async ngOnInit() {
    const earthquakes: GeoJSON.FeatureCollection = (await import(
      './earthquakes.geo.json'
    )) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
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
    this.selectedCluster = feature;
  }
}
