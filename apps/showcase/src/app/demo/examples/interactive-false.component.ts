import { Component } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [zoom]="[9]"
      [center]="[-74.5, 40]"
      [interactive]="false"
    />
  `,
  imports: [MapComponent],
  styleUrls: ['./examples.css'],
})
export class InteractiveFalseComponent {}
