import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
    <mgl-control>
      <button
        mat-fab
        color="primary"
        (click)="alert('Hello')"
      >
        Hello
      </button>
    </mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class NgxCustomControlComponent {
  alert(message: string) {
    alert(message);
  }
}
