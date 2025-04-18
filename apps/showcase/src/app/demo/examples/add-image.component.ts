import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MapComponent, LayerComponent, ImageComponent } from 'ngx-mapbox-gl';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v9'">
      <mgl-image
        id="cat"
        url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png"
        (imageLoaded)="imageLoaded = true"
      />
      <mgl-layer
        *ngIf="imageLoaded"
        id="points"
        type="symbol"
        [source]="{
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                }
              }
            ]
          }
        }"
        [layout]="{ 'icon-image': 'cat', 'icon-size': 0.25 }"
      />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    LayerComponent,
    ImageComponent,
    NgIf,
  ],
  styleUrls: ['./examples.css'],
})
export class AddImageComponent {
  imageLoaded = false;
}
