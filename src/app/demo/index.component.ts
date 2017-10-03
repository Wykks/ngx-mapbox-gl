import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-index',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
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
  `
})
export class IndexComponent implements OnInit {
  paint = {'background-color': 'green'};

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.paint = {'background-color': 'blue'};
    }, 2000);
  }
}
