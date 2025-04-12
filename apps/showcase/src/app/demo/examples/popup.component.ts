import { Component } from '@angular/core';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import {
  MapComponent,
  PopupComponent as MapboxPopupComponent,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v9'"
      [zoom]="[3]"
      [center]="[-96, 37.8]"
    >
      <mgl-popup
        [lngLat]="[-96, 37.8]"
        [closeOnClick]="false"
        [className]="'custom-popup-class1 custom-popup-class2'"
      >
        <h1>Hello world !</h1>
      </mgl-popup>
    </mgl-map>
  `,
  imports: [MapComponent, MglMapResizeDirective, MapboxPopupComponent],
  styleUrls: ['./examples.css', './popup.component.css'],
})
export class PopupComponent {}
