import { Component } from '@angular/core';
import { MapMouseEvent } from 'mapbox-gl';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="[2]"
    [center]="[0, 0]"
  >
    <mgl-geojson-source
      id="point"
    >
      <mgl-feature
        [properties]=""
        [geometry]="{
          'type': 'Point',
          'coordinates': [0, 0]
        }"
        [mglDraggable]="targetLayer"
        (dragStart)="onDragStart($event)"
        (dragEnd)="onDragEnd($event)"
        (drag)="onDrag($event)"
      ></mgl-feature>
    </mgl-geojson-source>
    <mgl-layer
      #targetLayer
      id="point"
      type="circle"
      source="point"
      [paint]="layerPaint"
      (mouseEnter)="changeColor('#3bb2d0')"
      (mouseLeave)="changeColor('#3887be')"
    ></mgl-layer>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class NgxDragAPointComponent {
  layerPaint = {
    'circle-radius': 10,
    'circle-color': '#3887be'
  };

  onDragStart(event: MapMouseEvent) {
    console.log('onDragStart', event);
  }

  onDragEnd(event: MapMouseEvent) {
    console.log('onDragEnd', event);
  }

  onDrag(event: MapMouseEvent) {
    console.log('onDrag', event);
  }

  changeColor(color: string) {
    this.layerPaint = { ...this.layerPaint, 'circle-color': color };
  }
}
