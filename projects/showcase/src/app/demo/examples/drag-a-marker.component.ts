import { Component } from '@angular/core';
import { Marker } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[2]"
      [center]="[0, 0]"
    >
      <mgl-marker
        [lngLat]="[0, 0]"
        [draggable]="true"
        (markerDragEnd)="onDragEnd($event)"
      ></mgl-marker>
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
    this.coordinates = marker.getLngLat().toArray();
  }
}
