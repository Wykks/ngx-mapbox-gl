import {
  Component,
  ViewChild,
  computed,
  effect,
  input,
  resource,
  signal,
} from '@angular/core';
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
      @if (leaves.hasValue()) {
        @for (leaf of leaves.value(); track $index) {
          <mat-list-item>
            {{ leaf.properties?.['Primary ID'] }}
          </mat-list-item>
        }
      } @else {
        @for (i of placeholders(); track $index) {
          <mat-list-item />
        }
      }
    </mat-list>
    <mat-paginator
      [length]="pointCount()"
      [pageSize]="5"
      [hidePageSize]="true"
      (page)="changePage($event)"
    />
  `,
  imports: [MatListModule, MatPaginatorModule],
})
export class ClusterPopupComponent {
  selectedCluster = input.required<GeoJSON.Feature<GeoJSON.Point>>();
  clusterComponent = input.required<GeoJSONSourceComponent>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  offset = signal(0);
  pointCount = computed(
    () => this.selectedCluster().properties?.['point_count'] ?? 0,
  );
  placeholders = computed(() =>
    Array.from({ length: Math.min(this.pointCount(), 5) }),
  );

  leaves = resource({
    request: () => ({
      offset: this.offset(),
      selectedCluster: this.selectedCluster(),
    }),
    loader: () =>
      this.clusterComponent().getClusterLeaves(
        this.selectedCluster().properties?.['cluster_id'] ?? 0,
        5,
        this.offset(),
      ),
  });

  constructor() {
    effect(() => {
      this.selectedCluster();
      this.paginator.firstPage();
    });
  }

  changePage(pageEvent: PageEvent) {
    this.offset.set(pageEvent.pageIndex * 5);
  }
}

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/dark-v11'"
      [zoom]="[3]"
      [center]="[-103.59179687498357, 40.66995747013945]"
    >
      @let _earthquakes = earthquakes();
      @if (_earthquakes) {
        <mgl-geojson-source
          #clusterComponent
          id="earthquakes"
          [data]="_earthquakes"
          [cluster]="true"
          [clusterRadius]="50"
          [clusterMaxZoom]="14"
        />
        <mgl-markers-for-clusters
          source="earthquakes"
          failbackPointIdKey="Primary ID"
        >
          <ng-template mglPoint let-feature>
            <div class="marker" [title]="feature.properties['Secondary ID']">
              {{ feature.properties['Primary ID'] }}
            </div>
          </ng-template>
          <ng-template mglClusterPoint let-feature>
            <div
              class="marker-cluster"
              (click)="selectCluster(feature)"
              (keydown.enter)="selectCluster(feature)"
              tabindex="0"
            >
              {{ feature.properties?.point_count }}
            </div>
          </ng-template>
        </mgl-markers-for-clusters>
        @let _selectedCluster = selectedCluster();
        @if (_selectedCluster) {
          <mgl-popup
            [feature]="_selectedCluster"
            maxWidth="300px"
            (popupClose)="selectedCluster.set(null)"
          >
            <showcase-cluster-popup
              [clusterComponent]="clusterComponent"
              [selectedCluster]="_selectedCluster"
            />
          </mgl-popup>
        }
      }
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
  ],
  styleUrls: ['./examples.css', './ngx-cluster-html.component.css'],
})
export class NgxClusterHtmlComponent {
  selectedCluster = signal<GeoJSON.Feature<GeoJSON.Point> | null>(null);
  earthquakes = signal<GeoJSON.FeatureCollection<GeoJSON.Geometry> | null>(
    null,
  );

  constructor() {
    this.loadSource();
  }

  selectCluster(feature: GeoJSON.Feature<GeoJSON.Point>) {
    this.selectedCluster.set(feature);
  }

  private async loadSource() {
    const earthquakes = (await import(
      './earthquakes.geo.json'
    )) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
    this.earthquakes.set(earthquakes);
  }
}
