import { Component } from '@angular/core';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import {
  MapComponent,
  ControlComponent,
  GeolocateControlDirective,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v9'">
      <mgl-control
        mglGeolocate
        [positionOptions]="{
          enableHighAccuracy: true
        }"
        [trackUserLocation]="true"
        [showUserHeading]="true"
      />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    ControlComponent,
    GeolocateControlDirective,
  ],
  styleUrls: ['./examples.css'],
})
export class LocateUserComponent {}
