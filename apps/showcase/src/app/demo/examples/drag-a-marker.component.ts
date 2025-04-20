import { Component } from '@angular/core';
import { Marker } from 'mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { MapComponent, MarkerComponent, ControlComponent } from 'ngx-mapbox-gl';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [zoom]="[2]"
      [center]="[0, 0]"
    >
      <mgl-marker
        [lngLat]="[0, 0]"
        [draggable]="true"
        (markerDragEnd)="onDragEnd($event)"
      />
      @if (coordinates) {
        <mgl-control position="bottom-left">
          <mat-card style="padding:4px;">
            <div>Longitude:&nbsp;{{ coordinates[0] }}</div>
            <div>Latitude:&nbsp;{{ coordinates[1] }}</div>
          </mat-card>
        </mgl-control>
      }
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    MarkerComponent,
    ControlComponent,
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
