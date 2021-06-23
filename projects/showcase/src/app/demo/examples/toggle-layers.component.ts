import { Component, OnInit } from '@angular/core';
import { AnyLayout } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[15]"
      [center]="[-71.97722138410576, -13.517379300798098]"
    >
      <mgl-vector-source
        id="museums"
        url="https://api.maptiler.com/tiles/v3/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
      >
      </mgl-vector-source>
      <mgl-vector-source
        id="contours"
        url="https://api.maptiler.com/tiles/v3/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
      >
      </mgl-vector-source>
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
      >
      </mgl-layer>
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
      >
      </mgl-layer>
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
  styleUrls: ['./examples.css', './toggle-layers.component.css'],
})
export class ToggleLayersComponent implements OnInit {
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

  ngOnInit() {}

  toggleLayer(evt: { value: string }) {
    this.layouts[evt.value] = {
      ...this.layouts[evt.value],
      visibility:
        this.layouts[evt.value].visibility === 'visible' ? 'none' : 'visible',
    };
    // HM TODO: this needs a fix...
  }
}
