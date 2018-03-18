import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    style="mapbox://styles/mapbox/streets-v9"
    [zoom]="[15]"
    [center]="[-71.97722138410576, -13.517379300798098]"
  >
    <mgl-vector-source
      id="museums"
      url="mapbox://mapbox.2opop9hr"
    >
    </mgl-vector-source>
    <mgl-vector-source
      id="contours"
      url="mapbox://mapbox.mapbox-terrain-v2"
    >
    </mgl-vector-source>
    <mgl-layer
      id="museums"
      type="circle"
      source="museums"
      [layout]="layouts.museums"
      [paint]="{
        'circle-radius': 8,
        'circle-color': 'rgba(55,148,179,1)'
      }"
      sourceLayer="museum-cusco"
    >
    </mgl-layer>
    <mgl-layer
      id="contours"
      type="line"
      source="contours"
      [layout]="layouts.contours"
      [paint]="{
        'line-color': '#877b59',
        'line-width': 1
      }"
      sourceLayer="contour"
    >
    </mgl-layer>
  </mgl-map>
  <div class="menu">
    <mat-button-toggle [checked]="true" value="contours" (change)="toggleLayer($event)">contours</mat-button-toggle>
    <mat-button-toggle [checked]="true" value="museums" (change)="toggleLayer($event)">museums</mat-button-toggle>
  </div>
  `,
  styleUrls: ['./examples.css', './toggle-layers.component.css']
})
export class ToggleLayersComponent implements OnInit {
  layouts = {
    contours: {
      'visibility': 'visible',
      'line-join': 'round',
      'line-cap': 'round'
    },
    museums: {
      'visibility': 'visible'
    }
  };

  ngOnInit() {
  }

  toggleLayer(evt: { value: 'contours' | 'museums' }) {
    this.layouts[evt.value] = {
      ...this.layouts[evt.value],
      visibility: this.layouts[evt.value].visibility === 'visible' ? 'none' : 'visible'
    };
  }
}
