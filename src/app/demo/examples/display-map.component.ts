import { Component } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="[9]"
    [center]="[-74.50, 40]"
  >
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class DisplayMapComponent {}
