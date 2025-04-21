import { Component, signal } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import {
  MapComponent,
  GeoJSONSourceComponent,
  FeatureComponent,
  LayerComponent,
  ControlComponent,
  DraggableDirective,
} from 'ngx-mapbox-gl';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [zoom]="[2]"
      [center]="[0, 0]"
    >
      <mgl-geojson-source id="point">
        <mgl-feature
          [properties]=""
          [geometry]="{
            type: 'Point',
            coordinates: [0, 0],
          }"
          [mglDraggable]="targetLayer"
          (featureDragStart)="onDragStart($event)"
          (featureDragEnd)="onDragEnd($event)"
          (featureDrag)="onDrag($event)"
        />
      </mgl-geojson-source>
      <mgl-layer
        #targetLayer
        id="point"
        type="circle"
        source="point"
        [paint]="layerPaint()"
        (layerMouseEnter)="changeColor('#3bb2d0')"
        (layerMouseLeave)="changeColor('#3887be')"
      />
      <mgl-control position="bottom-left">
        <mat-card style="padding:4px;">
          <div>Longitude:&nbsp;{{ coordinates()[0] }}</div>
          <div>Latitude:&nbsp;{{ coordinates()[1] }}</div>
        </mat-card>
      </mgl-control>
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    GeoJSONSourceComponent,
    FeatureComponent,
    LayerComponent,
    ControlComponent,
    DraggableDirective,
    MatCardModule,
  ],
  styleUrls: ['./examples.css'],
})
export class NgxDragAPointComponent {
  coordinates = signal<[number, number]>([0, 0]);
  layerPaint = signal({
    'circle-radius': 10,
    'circle-color': '#3887be',
  });

  onDragStart(event: MapMouseEvent) {
    console.log('onDragStart', event);
  }

  onDragEnd(event: MapMouseEvent) {
    console.log('onDragEnd', event);
  }

  onDrag(event: MapMouseEvent) {
    console.log('onDrag', event);
    this.coordinates.set(event.lngLat.toArray());
  }

  changeColor(color: string) {
    this.layerPaint.set({ ...this.layerPaint(), 'circle-color': color });
  }
}
