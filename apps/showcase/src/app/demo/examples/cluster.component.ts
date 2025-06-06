import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/dark-v11'"
      [zoom]="[3]"
      [center]="[-103.59179687498357, 40.66995747013945]"
    >
      @let _earthquakes = earthquakes();
      @if (_earthquakes) {
        <mgl-geojson-source
          id="earthquakes"
          [data]="_earthquakes"
          [cluster]="true"
          [clusterMaxZoom]="14"
          [clusterRadius]="50"
        />
        <mgl-layer
          id="clusters"
          type="circle"
          source="earthquakes"
          [filter]="['has', 'point_count']"
          [paint]="{
            'circle-color': {
              property: 'point_count',
              type: 'interval',
              stops: [
                [0, '#51bbd6'],
                [100, '#f1f075'],
                [750, '#f28cb1'],
              ],
            },
            'circle-radius': {
              property: 'point_count',
              type: 'interval',
              stops: [
                [0, 20],
                [100, 30],
                [750, 40],
              ],
            },
          }"
        />
        <mgl-layer
          id="cluster-count"
          type="symbol"
          source="earthquakes"
          [filter]="['has', 'point_count']"
          [layout]="{
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          }"
        />
        <mgl-layer
          id="unclustered-point"
          type="circle"
          source="earthquakes"
          [filter]="['!has', 'point_count']"
          [paint]="{
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
          }"
        />
      }
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
export class ClusterComponent {
  earthquakes = signal<GeoJSON.FeatureCollection<GeoJSON.Geometry> | null>(
    null,
  );

  constructor() {
    this.loadSource();
  }

  private async loadSource() {
    const earthquakes = (await import(
      './earthquakes.geo.json'
    )) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
    this.earthquakes.set(earthquakes);
  }
}
