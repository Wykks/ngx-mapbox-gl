import { Component } from '@angular/core';
import { MapMouseEvent, Map } from 'mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v9'"
      [zoom]="[8]"
      [center]="center"
      [cursorStyle]="cursorStyle"
      (load)="map = $event"
    >
      <mgl-geojson-source id="symbols-source">
        <mgl-feature *ngFor="let geometry of geometries" [geometry]="geometry"></mgl-feature>
      </mgl-geojson-source>
      <mgl-layer
        id="symbols"
        type="symbol"
        source="symbols-source"
        [layout]="{
          'icon-image': 'rocket-15'
        }"
        (click)="centerMapTo($event)"
        (mouseEnter)="cursorStyle = 'pointer'"
        (mouseLeave)="cursorStyle = ''"
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
