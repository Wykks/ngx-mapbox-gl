import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
    <mgl-control
      mglGeocoder
      [position]="'top-left'"
      [country]="'us'"
      [zoom]="15"
      (results)="onResults($event)"
      (error)="onError($event)"
      (result)="onResult($event)"
      (loading)="onLoading($event)"
      (clear)="onClear()"
    ></mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class GeocodeAddressComponent {
  constructor() {}

  onResults(results: any) {
    console.log('results', results);
  }
  onResult(result: any) {
    console.log('result', result);
  }
  onLoading(loading: any) {
    console.log('loading', loading);
  }
  onError(error: any) {
    console.log('error emitted', error);
  }
  onClear() {
    console.log('clear emitted');
  }
}
