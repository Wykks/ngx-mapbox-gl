import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '../../lib';

@Component({
  template: `
  <mgl-map
    style="mapbox://styles/mapbox/light-v9"
    [zoom]="2.9"
    [center]="[16.05, 48]"
    #map
  >
    <mgl-control>
      <button
        mat-raised-button
        (click)="changeLangTo('fr')"
      >French</button>
      <button
        mat-raised-button
        (click)="changeLangTo('ru')"
      >Russian</button>
      <button
        mat-raised-button
        (click)="changeLangTo('de')"
      >German</button>
      <button
        mat-raised-button
        (click)="changeLangTo('es')"
      >Spanish</button>
    </mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css', './toggle-layers.component.css']
})
export class LanguageSwitchComponent {
  @ViewChild('map') map: MapComponent;

  changeLangTo(language: string) {
    this.map.mapInstance.setLayoutProperty('country-label-lg', 'text-field', '{name_' + language + '}');
  }
}
