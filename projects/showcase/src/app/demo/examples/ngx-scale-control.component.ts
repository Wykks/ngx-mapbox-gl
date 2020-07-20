import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v9'">
      <mgl-control mglScale unit="imperial" position="top-right"></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class NgxScaleControlComponent {}
