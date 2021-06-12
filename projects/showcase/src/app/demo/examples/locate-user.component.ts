import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
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
  styleUrls: ['./examples.css'],
})
export class LocateUserComponent {}
