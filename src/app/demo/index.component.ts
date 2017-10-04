import { Component, OnInit } from '@angular/core';
import random from 'lodash-es/random';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-index',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="zoom"
  >
    <ng-template>
      <mgl-layer
        id="back"
        type="background"
        [paint]="paint"
      >
      </mgl-layer>
    </ng-template>
  </mgl-map>
  `,
  styleUrls: ['examples/examples.css']
})
export class IndexComponent implements OnInit {
  paint = { 'background-color': 'green', 'background-opacity': 0.1 };
  zoom = 0;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.zoom = random(0, 10);
    }, 2000);
  }
}
