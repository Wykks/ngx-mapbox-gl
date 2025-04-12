import { Component } from '@angular/core';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import {
  MapComponent,
  ControlComponent,
  FullscreenControlDirective,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/outdoors-v9'"
      [zoom]="[13]"
      [center]="[11.255, 43.77]"
    >
      <mgl-control mglFullscreen />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    ControlComponent,
    FullscreenControlDirective,
  ],
  styleUrls: ['./examples.css'],
})
export class FullscreenComponent {}
