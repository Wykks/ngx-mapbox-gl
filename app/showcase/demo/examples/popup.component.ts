import { Component } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="[3]"
    [center]="[-96, 37.8]"
  >
    <mgl-popup
      [lngLat]="[-96, 37.8]"
      [closeOnClick]="false"
    >
      <h1>Hello world !</h1>
    </mgl-popup>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class PopupComponent { }
