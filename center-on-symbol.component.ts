import { Component, signal } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import {
  MapComponent,
  GeoJSONSourceComponent,
  FeatureComponent,
  LayerComponent,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v11'"
      [zoom]="[7.2]"
      [center]="center()"
      [cursorStyle]="cursorStyle()"
    >
      <mgl-geojson-source id="points">
        @for (geometry of geometries; track $index) {
          <mgl-feature [geometry]="geometry" />
        }
      </mgl-geojson-source>
      <mgl-layer
        id="circle"
        type="circle"
        source="points"
        [paint]="{
          'circle-color': '#4264fb',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        }"
        (layerClick)="centerMapTo($event)"
        (layerMouseEnter)="cursorStyle.set('pointer')"
        (layerMouseLeave)="cursorStyle.set('')"
      />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    GeoJSONSourceComponent,
    FeatureComponent,
    LayerComponent,
  ],
  styleUrls: ['./examples.css'],
})
export class CenterOnSymbolComponent {
  cursorStyle = signal('');

  center = signal<[number, number]>([-90.96, -0.47]);

  geometries = [
    {
      type: 'Point' as const,
      coordinates: [-91.3952, -0.9145],
    },
    {
      type: 'Point' as const,
      coordinates: [-90.3295, -0.6344],
    },
    {
      type: 'Point' as const,
      coordinates: [-91.3403, 0.0164],
    },
  ];

  centerMapTo(evt: MapMouseEvent) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.center.set((evt as any).features[0].geometry.coordinates);
  }
}
