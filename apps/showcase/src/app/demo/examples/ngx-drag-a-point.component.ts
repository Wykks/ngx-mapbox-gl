import { Component } from '@angular/core';
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
      [style]="'mapbox://styles/mapbox/streets-v9'"
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
        [paint]="layerPaint"
        (layerMouseEnter)="changeColor('#3bb2d0')"
        (layerMouseLeave)="changeColor('#3887be')"
      />
      <mgl-control position="bottom-left">
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
  layerPaint = {
    'circle-radius': 10,
    'circle-color': '#3887be',
  };

  coordinates = [0, 0];

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

  changeColor(color: string) {
    this.layerPaint = { ...this.layerPaint, 'circle-color': color };
  }
}
