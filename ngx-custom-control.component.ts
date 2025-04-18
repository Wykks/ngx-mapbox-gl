import { Component } from '@angular/core';
import {
  MapComponent,
  ControlComponent,
  AttributionControlDirective,
  FullscreenControlDirective,
  GeolocateControlDirective,
  NavigationControlDirective,
  ScaleControlDirective,
} from 'ngx-mapbox-gl';
import { MatButtonModule } from '@angular/material/button';
import { MglMapResizeDirective } from './mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v9'">
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

      <mgl-control mglAttribution position="top-right" />
      <mgl-control mglFullscreen position="top-right" />
      <mgl-control
        mglGeolocate
        position="top-right"
        (geolocate)="onGeolocate($event)"
      />
      <mgl-control mglNavigation position="top-right" />
      <mgl-control mglScale position="top-right" />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    ControlComponent,
    AttributionControlDirective,
    FullscreenControlDirective,
    GeolocateControlDirective,
    NavigationControlDirective,
    ScaleControlDirective,
    MatButtonModule,
  ],
  styleUrls: ['./examples.css'],
})
export class NgxCustomControlComponent {
  alert(message: string) {
    alert(message);
  }
  onGeolocate(position: GeolocationPosition) {
    console.log('geolocate', position);
  }
}
