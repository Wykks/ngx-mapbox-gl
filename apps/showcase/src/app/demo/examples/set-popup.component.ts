import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { MapComponent, MarkerComponent, PopupComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v9'"
      [zoom]="[15]"
      [center]="[-77.0353, 38.8895]"
    >
      <mgl-marker #myMarker [lngLat]="[-77.0353, 38.8895]">
        <div
          [ngStyle]="{
            'background-image':
              'url(https://www.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg)',
            'background-size': 'cover',
            width: '50px',
            height: '50px',
            'border-radius': '50%',
            cursor: 'pointer'
          }"
        ></div>
      </mgl-marker>
      <mgl-popup [marker]="myMarker">
        Construction on the Washington Monument began in 1848.
      </mgl-popup>
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    MarkerComponent,
    PopupComponent,
    NgStyle,
  ],
  styleUrls: ['./examples.css'],
})
export class SetPopupComponent {}
