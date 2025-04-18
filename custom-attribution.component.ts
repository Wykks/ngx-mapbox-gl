import { Component } from '@angular/core';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import {
  MapComponent,
  AttributionControlDirective,
  ControlComponent,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v9'"
      [center]="[-77.04, 38.907]"
      [zoom]="[11.15]"
      [attributionControl]="false"
    >
      <mgl-control
        mglAttribution
        position="bottom-right"
        [customAttribution]="[
          '<a href=&quot;https://github.com/Wykks/ngx-mapbox-gl&quot; target=&quot;_blank&quot;>Maps made awesome in Angular</a>',
          'Hello World',
        ]"
      />
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
export class CustomAttributionComponent {}
