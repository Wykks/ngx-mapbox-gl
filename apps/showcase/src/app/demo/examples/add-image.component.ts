import { Component, signal } from '@angular/core';
import { MapComponent, LayerComponent, ImageComponent } from 'ngx-mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/dark-v11'"
      [center]="[-77.432, 25.0306]"
      [zoom]="[10]"
    >
      <mgl-image
        id="cat"
        url="https://docs.mapbox.com/mapbox-gl-js/assets/cat.png"
        (imageLoaded)="imageLoaded.set(true)"
      />
      @if (imageLoaded()) {
        <mgl-layer
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
                    coordinates: [-77.4144, 25.0759],
                  },
                },
              ],
            },
          }"
          [layout]="{ 'icon-image': 'cat', 'icon-size': 0.25 }"
        />
      }
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    LayerComponent,
    ImageComponent,
  ],
  styleUrls: ['./examples.css'],
})
export class AddImageComponent {
  imageLoaded = signal(false);
}
