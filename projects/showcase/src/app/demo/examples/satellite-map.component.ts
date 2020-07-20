import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/satellite-v9'"
      [zoom]="[9]"
      [center]="[137.9150899566626, 36.25956997955441]"
    >
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class SatelliteMapComponent {}
