import { Component } from '@angular/core';
import {
  MapComponent,
  AttributionControlDirective,
  ControlComponent,
} from 'ngx-mapbox-gl';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v9'"
      [center]="[-77.04, 38.907]"
      [zoom]="[11.15]"
      [attributionControl]="false"
    >
      <mgl-control mglAttribution position="top-left" />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    AttributionControlDirective,
    ControlComponent,
  ],
  styleUrls: ['./examples.css'],
})
export class AttributionPositionComponent {}
