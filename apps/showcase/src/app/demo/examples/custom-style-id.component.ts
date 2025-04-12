import { Component } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/dark-v9'"
      [zoom]="[3]"
      [center]="[-77.38, 39]"
    />
  `,
  imports: [MapComponent],
  styleUrls: ['./examples.css'],
})
export class CustomStyleIdComponent {}
