import { Component } from '@angular/core';
import { MapMouseEvent, Map } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[8]"
      [center]="center"
      [cursorStyle]="cursorStyle"
      (mapLoad)="map = $event"
    >
      <mgl-geojson-source id="symbols-source">
        <mgl-feature
          *ngFor="let geometry of geometries"
          [geometry]="geometry"
        ></mgl-feature>
      </mgl-geojson-source>
      <mgl-layer
        id="symbols"
        type="symbol"
        source="symbols-source"
        [layout]="{
          'icon-image': 'oneway'
        }"
        (layerClick)="centerMapTo($event)"
        (layerMouseEnter)="cursorStyle = 'pointer'"
        (layerMouseLeave)="cursorStyle = ''"
      >
      </mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class CenterOnSymbolComponent {
  map: Map;
  cursorStyle: string;

  center = [-90.96, -0.47];

  geometries = [
    {
      type: 'Point',
      coordinates: [-91.395263671875, -0.9145729757782163],
    },
    {
      type: 'Point',
      coordinates: [-90.32958984375, -0.6344474832838974],
    },
    {
      type: 'Point',
      coordinates: [-91.34033203125, 0.01647949196029245],
    },
  ];

  centerMapTo(evt: MapMouseEvent) {
    this.center = (<any>evt).features[0].geometry.coordinates;
  }
}
