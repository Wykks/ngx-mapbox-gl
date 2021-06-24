import { Component, OnInit } from '@angular/core';
import { AnyLayout } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[3]"
      [center]="[-71.97722138410576, -13.517379300798098]"
    >
      <mgl-vector-source
        id="countries"
        [tiles]="['https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf']"
      >
      </mgl-vector-source>
      <mgl-vector-source
        id="everything"
        url="https://api.maptiler.com/tiles/v3/tiles.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
      >
      </mgl-vector-source>
      <mgl-layer
        id="countries-layer"
        type="line"
        source="countries"
        [layout]="layouts['countries']"
        [paint]="{
          'line-color': 'blue'
        }"
        sourceLayer="countries"
      >
      </mgl-layer>
      <mgl-layer
        id="names"
        type="symbol"
        source="everything"
        [layout]="layouts['names']"
        sourceLayer="place"
      >
      </mgl-layer>
    </mgl-map>
    <div class="menu">
      <mat-button-toggle
        [checked]="true"
        value="names"
        (change)="toggleLayer($event)"
        >countries names</mat-button-toggle
      >
      <mat-button-toggle
        [checked]="true"
        value="countries"
        (change)="toggleLayer($event)"
        >countries border</mat-button-toggle
      >
    </div>
  `,
  styleUrls: ['./examples.css', './toggle-layers.component.css'],
})
export class ToggleLayersComponent implements OnInit {
  layouts: { [key: string]: AnyLayout } = {
    countries: {
      visibility: 'none',
    },
    names: {
      visibility: 'none',
      'text-field': '{name:latin}',
      'text-size': 30,
    },
  };

  ngOnInit() {}

  toggleLayer(evt: { value: string }) {
    this.layouts[evt.value] = {
      ...this.layouts[evt.value],
      visibility:
        this.layouts[evt.value].visibility === 'visible' ? 'none' : 'visible',
    };
  }
}
