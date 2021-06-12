import { Component } from '@angular/core';
import { Position } from 'projects/ngx-maplibre-gl/src/public_api';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
    >
      <mgl-control>
        <button
          mat-fab
          color="primary"
          class="custom-control"
          (click)="alert('Hello')"
        >
          Hello
        </button>
      </mgl-control>

      <mgl-control mglAttribution position="top-right"></mgl-control>
      <mgl-control mglFullscreen position="top-right"></mgl-control>
      <mgl-control
        mglGeolocate
        position="top-right"
        (geolocate)="onGeolocate($event)"
      ></mgl-control>
      <mgl-control mglNavigation position="top-right"></mgl-control>
      <mgl-control mglScale position="top-right"></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class NgxCustomControlComponent {
  alert(message: string) {
    alert(message);
  }
  onGeolocate(position: Position) {
    console.log('geolocate', position);
  }
}
