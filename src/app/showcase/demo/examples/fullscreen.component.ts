import { Component } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/outdoors-v9'"
    [zoom]="[13]"
    [center]="[11.255, 43.77]"
  >
    <mgl-control mglFullscreen></mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class FullscreenComponent { }
