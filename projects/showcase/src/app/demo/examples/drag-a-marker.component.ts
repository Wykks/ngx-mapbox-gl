import { Component, NgZone } from '@angular/core';
import { Marker } from 'mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v9'" [zoom]="[2]" [center]="[0, 0]">
      <mgl-marker [lngLat]="[0, 0]" [draggable]="true" (dragEnd)="onDragEnd($event)"></mgl-marker>
      <mgl-control *ngIf="coordinates" position="bottom-left">
        <mat-card>
          <div>Longitude:&nbsp;{{ coordinates[0] }}</div>
          <div>Latitude:&nbsp;{{ coordinates[1] }}</div>
        </mat-card>
      </mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class DragAMarkerComponent {
  coordinates: number[];
  color = '#3887be';

  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();
    this.coordinates = marker.getLngLat().toArray();
  }
}
