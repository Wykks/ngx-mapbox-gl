import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
    <mgl-control mglGeolocate></mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class NgxGeolocateComponent { }
