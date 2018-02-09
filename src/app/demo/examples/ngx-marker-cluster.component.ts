import { Component } from '@angular/core';

import earthquakes from './earthquakes.geo.json';

@Component({
  template: `
  <mgl-map
    style="mapbox://styles/mapbox/dark-v9"
    [zoom]="[3]"
    [center]="[-103.59179687498357, 40.66995747013945]"
  >
    <mgl-marker-cluster
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
      <ng-template mglClusterPoint let-feature>
        <div
          class="marker-cluster"
        >
          {{ feature.properties['point_count'] }}
        </div>
      </ng-template>
    </mgl-marker-cluster>
  </mgl-map>
  `,
  styleUrls: ['./examples.css', './ngx-marker-cluster.component.css']
})
export class NgxMarkerClusterComponent {
  earthquakes = earthquakes;
}
