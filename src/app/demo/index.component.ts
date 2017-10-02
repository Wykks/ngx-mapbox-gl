import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-index',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
  </mgl-map>
  `
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
