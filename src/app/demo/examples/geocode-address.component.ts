import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
    <mgl-control
      mglGeocoder
      [position]="'top-left'"
      [country]="'us'"
      [zoom]="15"
    ></mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class GeocodeAddressComponent {}
