import { Component } from '@angular/core';
import { LngLatBounds } from 'mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { MapComponent, LayerComponent, ControlComponent } from 'ngx-mapbox-gl';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v11'"
      [zoom]="[12]"
      [center]="[-77.0214, 38.897]"
      [fitBounds]="bounds"
      [fitBoundsOptions]="{
        padding: 20,
      }"
    >
      <mgl-control>
        <button mat-raised-button class="zoom-button" (click)="zoomToBounds()">
          Zoom to bounds
        </button>
      </mgl-control>
      <mgl-layer
        id="LineString"
        type="line"
        [source]="source"
        [paint]="{
          'line-color': '#BF93E4',
          'line-width': 5,
        }"
        [layout]="{
          'line-join': 'round',
          'line-cap': 'round',
        }"
      />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    LayerComponent,
    ControlComponent,
    MatButtonModule,
  ],
  styleUrls: ['./examples.css'],
})
export class ZoomtoLinestringComponent {
  bounds: LngLatBounds;

  source = {
    type: 'geojson' as const,
    data: {
      type: 'FeatureCollection' as const,
      features: [
        {
          type: 'Feature' as const,
          properties: {},
          geometry: {
            type: 'LineString' as const,
            properties: {},
            coordinates: [
              [-77.0366048812866, 38.89873175227713],
              [-77.03364372253417, 38.89876515143842],
              [-77.03364372253417, 38.89549195896866],
              [-77.02982425689697, 38.89549195896866],
              [-77.02400922775269, 38.89387200688839],
              [-77.01519012451172, 38.891416957534204],
              [-77.01521158218382, 38.892068305429156],
              [-77.00813055038452, 38.892051604275686],
              [-77.00832366943358, 38.89143365883688],
              [-77.00818419456482, 38.89082405874451],
              [-77.00815200805664, 38.88989712255097],
            ] as [number, number][],
          },
        },
      ],
    },
  };

  zoomToBounds() {
    const coordinates = this.source.data.features[0].geometry.coordinates;

    this.bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LngLatBounds(coordinates[0], coordinates[0]),
    );
  }
}
