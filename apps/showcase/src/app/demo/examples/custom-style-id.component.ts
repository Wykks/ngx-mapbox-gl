import { Component } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/examples/cke97f49z5rlg19l310b7uu7j'"
      [zoom]="[3]"
      [center]="[41, 21]"
    />
  `,
  imports: [MapComponent],
  styleUrls: ['./examples.css'],
})
export class CustomStyleIdComponent {}
