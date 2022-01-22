import { Component } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[2.9]"
      [center]="[16.05, 48]"
      (mapLoad)="map = $event"
    >
      <mgl-control>
        <button
          mat-raised-button
          class="lang-button"
          (click)="changeLangTo('fr')"
        >
          French
        </button>
        <button
          mat-raised-button
          class="lang-button"
          (click)="changeLangTo('ru')"
        >
          Russian
        </button>
        <button
          mat-raised-button
          class="lang-button"
          (click)="changeLangTo('de')"
        >
          German
        </button>
        <button
          mat-raised-button
          class="lang-button"
          (click)="changeLangTo('es')"
        >
          Spanish
        </button>
      </mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
  preserveWhitespaces: false,
})
export class LanguageSwitchComponent {
  map: Map;

  changeLangTo(language: string) {
    this.map.setLayoutProperty(
      'country_1',
      'text-field',
      '{name:' + language + '}'
    );
    this.map.setLayoutProperty(
      'country_2',
      'text-field',
      '{name:' + language + '}'
    );
    this.map.setLayoutProperty(
      'country_3',
      'text-field',
      '{name:' + language + '}'
    );
  }
}
