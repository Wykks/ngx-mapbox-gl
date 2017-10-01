import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-index',
  template: `
  <mgl-map
    [style]="'mapbox://styles/wykkss/cj256kx9l009a2sqromfn9bwf'"
    [center]="[1.433333, 43.6]"
    [zoom]="8"
  >
  </mgl-map>
  `
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
