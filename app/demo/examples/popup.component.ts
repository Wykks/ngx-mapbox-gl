import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v9'" [zoom]="[3]" [center]="[-96, 37.8]">
      <mgl-popup [lngLat]="[-96, 37.8]" [closeOnClick]="false" [className]="'custom-popup-class1 custom-popup-class2'">
        <h1>Hello world !</h1>
      </mgl-popup>
    </mgl-map>
  `,
  styleUrls: ['./examples.css', './popup.component.css'],
})
export class PopupComponent {}
