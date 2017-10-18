import { MapComponent } from '../../lib';
import { Component, ViewChild } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/light-v9'"
    [zoom]="8"
    [center]="center"
    #map
  >
    <mgl-geojson-source
      id="symbols-source"
    >
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
        'icon-image': 'rocket-15'
      }"
      (click)="centerMapTo($event)"
      (mouseEnter)="changeCursorToPointer()"
      (mouseLeave)="changeCursorToDefault()"
    >
    </mgl-layer>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class CenterOnSymbolComponent {
  @ViewChild('map') map: MapComponent;

  center = [-90.96, -0.47];

  geometries = [
    {
      'type': 'Point',
      'coordinates': [
        -91.395263671875,
        -0.9145729757782163

      ]
    },
    {
      'type': 'Point',
      'coordinates': [
        -90.32958984375,
        -0.6344474832838974
      ]
    },
    {
      'type': 'Point',
      'coordinates': [
        -91.34033203125,
        0.01647949196029245
      ]
    }
  ];

  centerMapTo(evt: MapMouseEvent) {
    this.center = (<any>evt).features[0].geometry.coordinates;
  }

  changeCursorToPointer() {
    this.map.mapInstance.getCanvas().style.cursor = 'pointer';
  }

  changeCursorToDefault() {
    this.map.mapInstance.getCanvas().style.cursor = '';
  }
}
