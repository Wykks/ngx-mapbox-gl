import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [attributionControl]="false"
  >
    <mgl-control mglAttribution [compact]="true">
    </mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class NgxAttributionComponent { }
