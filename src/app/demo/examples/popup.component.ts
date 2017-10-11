import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="3"
    [center]="[-96, 37.8]"
  >
    <ng-template>
      <mgl-popup
        [lngLat]="[-96, 37.8]"
        [closeOnClick]="false"
      >
        <h1>Hello world !</h1>
      </mgl-popup>
    </ng-template>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class PopupComponent { }
