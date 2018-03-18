import { Component } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
    <mgl-control
      mglGeolocate
      [positionOptions]="{
        enableHighAccuracy: true
      }"
      [trackUserLocation]="true"
    ></mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class LocateUserComponent { }
