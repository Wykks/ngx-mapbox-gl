import { Component } from '@angular/core';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import {
  MapComponent,
  ControlComponent,
  NavigationControlDirective,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [zoom]="[9]"
      [center]="[-74.5, 40]"
    >
      <mgl-control mglNavigation />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    ControlComponent,
    NavigationControlDirective,
  ],
  styleUrls: ['./examples.css'],
})
export class NavigationComponent {}
