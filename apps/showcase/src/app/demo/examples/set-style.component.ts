import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapComponent } from 'ngx-mapbox-gl';
import { MatRadioModule } from '@angular/material/radio';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="style" [zoom]="[13]" [center]="[4.899, 52.372]" />
    <mat-radio-group [ngModel]="layerId" (ngModelChange)="changeStyle($event)">
      <mat-radio-button value="basic">basic</mat-radio-button>
      <mat-radio-button value="streets">streets</mat-radio-button>
      <mat-radio-button value="bright">bright</mat-radio-button>
      <mat-radio-button value="light">light</mat-radio-button>
      <mat-radio-button value="dark">dark</mat-radio-button>
      <mat-radio-button value="satellite">satellite</mat-radio-button>
    </mat-radio-group>
  `,
  imports: [MapComponent, MglMapResizeDirective, MatRadioModule, FormsModule],
  styleUrls: ['./examples.css', './set-style.component.css'],
})
export class SetStyleComponent implements OnInit {
  layerId = 'basic';
  style: string;

  ngOnInit() {
    this.changeStyle(this.layerId);
  }

  changeStyle(layerId: string) {
    this.style = `mapbox://styles/mapbox/${layerId}-v9`;
  }
}
