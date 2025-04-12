import { Component } from '@angular/core';
import { Map } from 'mapbox-gl';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import { MapComponent, ControlComponent } from 'ngx-mapbox-gl';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v9'"
      [zoom]="[2.9]"
      [center]="[16.05, 48]"
      (mapCreate)="map = $event"
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
  imports: [
    MapComponent,
    MglMapResizeDirective,
    ControlComponent,
    MatButtonModule,
  ],
  styleUrls: ['./examples.css'],
  preserveWhitespaces: false,
})
export class LanguageSwitchComponent {
  map: Map;

  changeLangTo(language: string) {
    this.map.setLayoutProperty(
      'country-label-lg',
      'text-field',
      '{name_' + language + '}'
    );
  }
}
