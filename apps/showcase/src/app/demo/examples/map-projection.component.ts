import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v11'"
      [zoom]="[0.6]"
      [center]="[0, 0]"
      [projection]="{ name: 'naturalEarth' }"
    ></mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class MapProjectionComponent {}
