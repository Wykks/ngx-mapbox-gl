import { Component } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v11'"
      [zoom]="[0.6]"
      [center]="[0, 0]"
      [projection]="{ name: 'naturalEarth' }"
    />
  `,
  imports: [MapComponent],
  styleUrls: ['./examples.css'],
})
export class MapProjectionComponent {}
