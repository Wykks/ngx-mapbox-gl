import { Component } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
    <mgl-control>
      <button
        mat-fab
        color="primary"
        class="custom-control"
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
