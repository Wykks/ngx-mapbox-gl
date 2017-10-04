import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="style"
    [zoom]="13"
    [center]="[4.899, 52.372]"
  >
  </mgl-map>
  <md-radio-group [ngModel]="layerId" (ngModelChange)="changeStyle($event)">
    <md-radio-button value="basic">basic</md-radio-button>
    <md-radio-button value="streets">streets</md-radio-button>
    <md-radio-button value="bright">bright</md-radio-button>
    <md-radio-button value="light">light</md-radio-button>
    <md-radio-button value="dark">dark</md-radio-button>
    <md-radio-button value="satellite">satellite</md-radio-button>
  </md-radio-group>
  `,
  styleUrls: ['./examples.css', './set-style.component.css']
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
