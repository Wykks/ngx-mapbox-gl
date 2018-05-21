import { Component } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [center]="[-79.4512, 43.6568]"
    [zoom]="[13]"
  >
    <mgl-control
      mglGeocoder
      [searchInput]="'Paris'"
    ></mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class MapboxGlGeocoderComponent {
  constructor() {}
}
