import { Component } from '@angular/core';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import {
  MapComponent,
  ControlComponent,
  ScaleControlDirective,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v9'">
      <mgl-control mglScale unit="imperial" position="top-right" />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    ControlComponent,
    ScaleControlDirective,
  ],
  styleUrls: ['./examples.css'],
})
export class NgxScaleControlComponent {}
