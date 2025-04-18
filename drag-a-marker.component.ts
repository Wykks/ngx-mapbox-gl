import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Marker } from 'mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { MapComponent, MarkerComponent, ControlComponent } from 'ngx-mapbox-gl';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v9'"
      [zoom]="[2]"
      [center]="[0, 0]"
    >
      <mgl-marker
        [lngLat]="[0, 0]"
        [draggable]="true"
        (markerDragEnd)="onDragEnd($event)"
      />
      <mgl-control *ngIf="coordinates" position="bottom-left">
        <mat-card>
          <div>Longitude:&nbsp;{{ coordinates[0] }}</div>
          <div>Latitude:&nbsp;{{ coordinates[1] }}</div>
        </mat-card>
      </mgl-control>
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    MarkerComponent,
    ControlComponent,
    NgIf,
    MatCardModule,
  ],
  styleUrls: ['./examples.css'],
})
export class DragAMarkerComponent {
  coordinates: number[];
  color = '#3887be';

  onDragEnd(marker: Marker) {
    this.coordinates = marker.getLngLat().toArray();
  }
}
