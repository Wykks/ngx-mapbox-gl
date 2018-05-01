import { Component } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="[2]"
    [center]="[0, 0]"
  >
    <mgl-marker
      [lngLat]="[0, 0]"
      mglDraggable
      (dragStart)="onDragStart($event)"
      (dragEnd)="onDragEnd($event)"
      (drag)="onDrag($event)"
    >
      <svg
        (mouseenter)="color = '#3bb2d0'"
        (mouseleave)="color = '#3887be'"
        height="20"
        width="20"
      >
        <circle cx="10" cy="10" r="10" [attr.fill]="color" />
      </svg>
    </mgl-marker>
    <mgl-control position="bottom-left">
      <mat-card>
        <div>Longitude:&nbsp;{{ coordinates[0]}}</div>
        <div>Latitude:&nbsp;{{ coordinates[1]}}</div>
      </mat-card>
    </mgl-control>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class NgxDragAMarkerComponent {
  coordinates = [0, 0];
  color = '#3887be';

  onDragStart(event: MapMouseEvent) {
    console.log('onDragStart', event);
  }

  onDragEnd(event: MapMouseEvent) {
    console.log('onDragEnd', event);
  }

  onDrag(event: MapMouseEvent) {
    console.log('onDrag', event);
    this.coordinates = event.lngLat.toArray();
  }
}
