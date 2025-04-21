import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapComponent } from 'ngx-mapbox-gl';
import { MatRadioModule } from '@angular/material/radio';
import { MglMapResizeDirective } from './mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="style()" [zoom]="[13]" [center]="[-2.81361, 36.77271]" />
    <mat-radio-group [(ngModel)]="layerId">
      <mat-radio-button value="satellite-streets-v12"
        >satellite streets</mat-radio-button
      >
      <mat-radio-button value="light-v11">light</mat-radio-button>
      <mat-radio-button value="dark-v11">dark</mat-radio-button>
      <mat-radio-button value="streets-v12">streets</mat-radio-button>
      <mat-radio-button value="outdoors-v12">outdoors</mat-radio-button>
    </mat-radio-group>
  `,
  imports: [MapComponent, MglMapResizeDirective, MatRadioModule, FormsModule],
  styleUrls: ['./examples.css', './set-style.component.css'],
})
export class SetStyleComponent {
  layerId = signal('satellite-streets-v12');
  style = computed(() => {
    return `mapbox://styles/mapbox/${this.layerId()}`;
  });
}
