import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
  >
    <mgl-control
      *ngIf="showControl"
    >
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
export class NgxCustomControlComponent implements OnInit {
  showControl = true;

  ngOnInit() {
    setInterval(() => {
      this.showControl = !this.showControl;
    }, 1000);
  }
  alert(message: string) {
    alert(message);
  }
}
