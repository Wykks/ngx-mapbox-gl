import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v9'" [zoom]="[9]" [center]="[-74.5, 40]">
      <mgl-control mglNavigation></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class NavigationComponent {}
