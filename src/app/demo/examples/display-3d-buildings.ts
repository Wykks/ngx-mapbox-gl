import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/light-v9'"
    [zoom]="15.5"
    [center]="[-74.0066, 40.7135]"
    [pitch]="45"
    [bearing]="-17.6"
  >
    <mgl-layer
      id="3d-buildings"
      source="composite"
      sourceLayer="building"
      [filter]="['==', 'extrude', 'true']"
      type="fill-extrusion"
      [minzoom]="15"
      [paint]="{
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 1
      }"
    ></mgl-layer>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class Display3dBuildingsComponent { }
