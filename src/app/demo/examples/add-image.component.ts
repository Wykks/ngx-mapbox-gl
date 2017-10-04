import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
    <ng-template>
      <mgl-image
        id="cat"
        url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png"
      >
      </mgl-image>
      <mgl-layer
        id="points"
        type="symbol"
        [source]="{
          'type': 'geojson',
          'data': {
              'type': 'FeatureCollection',
              'features': [{
                  'type': 'Feature',
                  'geometry': {
                      'type': 'Point',
                      'coordinates': [0, 0]
                  }
              }]
          }
        }"
        [layout]="{'icon-image': 'cat', 'icon-size': 0.25}"
      >
      </mgl-layer>
    </ng-template>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class AddImageComponent {}
