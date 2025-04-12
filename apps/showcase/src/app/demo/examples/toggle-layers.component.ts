import { Component } from '@angular/core';
import { AnyLayout } from 'mapbox-gl';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import {
  MapComponent,
  VectorSourceComponent,
  LayerComponent,
} from 'ngx-mapbox-gl';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v9'"
      [zoom]="[15]"
      [center]="[-71.97722138410576, -13.517379300798098]"
    >
      <mgl-vector-source id="museums" url="mapbox://mapbox.2opop9hr" />
      <mgl-vector-source id="contours" url="mapbox://mapbox.mapbox-terrain-v2" />
      <mgl-layer
        id="museums"
        type="circle"
        source="museums"
        [layout]="layouts['museums']"
        [paint]="{
          'circle-radius': 8,
          'circle-color': 'rgba(55,148,179,1)'
        }"
        sourceLayer="museum-cusco"
      />
      <mgl-layer
        id="contours"
        type="line"
        source="contours"
        [layout]="layouts['contours']"
        [paint]="{
          'line-color': '#877b59',
          'line-width': 1
        }"
        sourceLayer="contour"
      />
    </mgl-map>
    <div class="menu">
      <mat-button-toggle
        [checked]="true"
        value="contours"
        (change)="toggleLayer($event)"
        >contours</mat-button-toggle
      >
      <mat-button-toggle
        [checked]="true"
        value="museums"
        (change)="toggleLayer($event)"
        >museums</mat-button-toggle
      >
    </div>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    VectorSourceComponent,
    LayerComponent,
    MatButtonToggleModule,
  ],
  styleUrls: ['./examples.css', './toggle-layers.component.css'],
})
export class ToggleLayersComponent {
  layouts: { [key: string]: AnyLayout } = {
    contours: {
      visibility: 'visible',
      'line-join': 'round',
      'line-cap': 'round',
    },
    museums: {
      visibility: 'visible',
    },
  };

  toggleLayer(evt: { value: string }) {
    this.layouts[evt.value] = {
      ...this.layouts[evt.value],
      visibility:
        this.layouts[evt.value].visibility === 'visible' ? 'none' : 'visible',
    };
  }
}
