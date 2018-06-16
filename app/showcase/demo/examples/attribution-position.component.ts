import { Component } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/light-v9'"
    [center]="[-77.04, 38.907]"
    [zoom]="[11.15]"
    [attributionControl]="false"
  >
    <mgl-control
      mglAttribution
      position="top-left"
    ></mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class AttributionPositionComponent { }
