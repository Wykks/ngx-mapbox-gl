import { Component } from '@angular/core';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from 'ngx-mapbox-gl';
import type { Map, MapMouseEvent } from 'mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [zoom]="[2]"
      [center]="[-100.486052, 37.830348]"
      (mapCreate)="map = $event"
    >
      <mgl-geojson-source
        id="states"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson"
      />
      <mgl-layer
        id="state-fills"
        type="fill"
        source="states"
        [paint]="{
          'fill-color': '#627BC1',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5,
          ],
        }"
        (layerMouseMove)="stateHover($event)"
        (layerMouseLeave)="stateLeave()"
      />
      <mgl-layer
        id="state-borders"
        type="line"
        source="states"
        [paint]="{
          'line-color': '#627BC1',
          'line-width': 2,
        }"
      />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    GeoJSONSourceComponent,
    LayerComponent,
  ],
  styleUrls: ['./examples.css'],
})
export class HoverStylesComponent {
  map: Map;

  private hoveredPolygonId?: number;

  stateHover(evt: MapMouseEvent) {
    if (evt.features && evt.features.length > 0) {
      this.stateLeave();
      this.hoveredPolygonId = evt.features[0].id as number;
      this.map.setFeatureState(
        { source: 'states', id: this.hoveredPolygonId },
        { hover: true },
      );
    }
  }

  stateLeave() {
    if (this.hoveredPolygonId !== undefined) {
      this.map.setFeatureState(
        { source: 'states', id: this.hoveredPolygonId },
        { hover: false },
      );
    }
    this.hoveredPolygonId = undefined;
  }
}
