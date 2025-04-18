import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
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
      [style]="'mapbox://styles/mapbox/light-v9'"
      [zoom]="[8]"
      [center]="center"
      [cursorStyle]="cursorStyle"
    >
      <mgl-geojson-source id="symbols-source">
        <mgl-feature
          *ngFor="let geometry of geometries"
          [geometry]="geometry"
        />
      </mgl-geojson-source>
      <mgl-layer
        id="symbols"
        type="symbol"
        source="symbols-source"
        [layout]="{
          'icon-image': 'rocket-15',
        }"
        (layerClick)="centerMapTo($event)"
        (layerMouseEnter)="cursorStyle = 'pointer'"
        (layerMouseLeave)="cursorStyle = ''"
      />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    GeoJSONSourceComponent,
    FeatureComponent,
    LayerComponent,
    NgForOf,
  ],
  styleUrls: ['./examples.css'],
})
export class CenterOnSymbolComponent {
  cursorStyle: string;

  center: [number, number] = [-90.96, -0.47];

  geometries = [
    {
      type: 'Point' as const,
      coordinates: [-91.395263671875, -0.9145729757782163],
    },
    {
      type: 'Point' as const,
      coordinates: [-90.32958984375, -0.6344474832838974],
    },
    {
      type: 'Point' as const,
      coordinates: [-91.34033203125, 0.01647949196029245],
    },
  ];

  centerMapTo(evt: MapMouseEvent) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.center = (evt as any).features[0].geometry.coordinates;
  }
}
