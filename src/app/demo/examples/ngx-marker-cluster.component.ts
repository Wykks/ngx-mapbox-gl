import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cluster-point',
  template: `
    <div class="marker-cluster" (click)="alert()">
      {{ feature.properties['point_count'] }}
    </div>
  `
})
export class ClusterPointComponent {
  @Input() feature: GeoJSON.Feature<GeoJSON.Point>;
  @Input() getLeavesFn: (limit?: number, offset?: number) => GeoJSON.Feature<GeoJSON.Point>[];
  @Input() getClusterExpansionZoomFn: () => number;

  alert() {
    const clusters = this.getLeavesFn();
    let message = 'childs: ';
    message += clusters.map((cluster) => cluster.properties!['Primary ID']).join(', ');
    message += ` getClusterExpansionZoom(): ${this.getClusterExpansionZoomFn()}`;
    alert(message)
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
    >
      <ng-template mglPoint let-feature>
        <div
          class="marker"
          [title]="feature.properties['Secondary ID']"
        >
          {{ feature.properties['Primary ID'] }}
        </div>
      </ng-template>
      <ng-template mglClusterPoint let-feature let-getLeavesFn="getLeavesFn" let-getClusterExpansionZoomFn="getClusterExpansionZoomFn">
        <cluster-point [feature]="feature" [getLeavesFn]="getLeavesFn" [getClusterExpansionZoomFn]="getClusterExpansionZoomFn"></cluster-point>
      </ng-template>
    </mgl-marker-cluster>
  </mgl-map>
  `,
  styleUrls: ['./examples.css', './ngx-marker-cluster.component.css']
})
export class NgxMarkerClusterComponent implements OnInit {
  earthquakes: object;

  async ngOnInit() {
    this.earthquakes = await import('./earthquakes.geo.json');
  }
}
