import { Component } from '@angular/core';

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
      ></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class LocateUserComponent {}
