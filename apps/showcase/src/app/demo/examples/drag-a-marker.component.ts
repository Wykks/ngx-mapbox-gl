import { Component, signal } from '@angular/core';
import { Marker, type LngLat } from 'mapbox-gl';
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
      @let _coordinates = coordinates();
      @if (_coordinates) {
        <mgl-control position="bottom-left">
          <mat-card style="padding:4px;">
            <div>Longitude:&nbsp;{{ _coordinates.lng }}</div>
            <div>Latitude:&nbsp;{{ _coordinates.lat }}</div>
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
  coordinates = signal<LngLat | null>(null);

  onDragEnd(marker: Marker) {
    this.coordinates.set(marker.getLngLat());
  }
}
