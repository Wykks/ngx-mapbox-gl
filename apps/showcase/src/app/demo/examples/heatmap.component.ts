import { Component, signal } from '@angular/core';
import { Layer } from 'mapbox-gl';
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
      [style]="'mapbox://styles/mapbox/dark-v9'"
      [zoom]="[3]"
      [center]="[-103.59179687498357, 40.66995747013945]"
    >
      @let _earthquakes = earthquakes();
      @if (_earthquakes) {
        <mgl-geojson-source
          id="earthquakes"
          [data]="_earthquakes"
          [cluster]="true"
          [clusterMaxZoom]="15"
          [clusterRadius]="20"
        />
        @for (layer of clusterLayers(); track layer.id) {
          <mgl-layer
            [id]="layer.id"
            [type]="$any(layer.type)"
            source="earthquakes"
            [filter]="layer.filter"
            [paint]="layer.paint"
            before="waterway-label"
          />
        }
        <mgl-layer
          id="unclustered-point"
          type="circle"
          source="earthquakes"
          [filter]="['!=', 'cluster', true]"
          [paint]="{
            'circle-color': 'rgba(0,255,0,0.5)',
            'circle-radius': 20,
            'circle-blur': 1,
          }"
          before="waterway-label"
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
export class HeatMapComponent {
  earthquakes = signal<GeoJSON.FeatureCollection<GeoJSON.Geometry> | null>(
    null,
  );
  clusterLayers = signal<Layer[]>([]);

  constructor() {
    this.loadSource();
    this.buildClusterLayers();
  }

  private async loadSource() {
    const earthquakes = (await import(
      './earthquakes.geo.json'
    )) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
    this.earthquakes.set(earthquakes);
  }

  private buildClusterLayers() {
    const layersData: [number, string][] = [
      [0, 'green'],
      [20, 'orange'],
      [200, 'red'],
    ];
    this.clusterLayers.set(
      layersData.map((data, index) => ({
        type: 'circle',
        id: `cluster-${index}`,
        paint: {
          'circle-color': data[1],
          'circle-radius': 70,
          'circle-blur': 1,
        },
        filter:
          index === layersData.length - 1
            ? ['>=', 'point_count', data[0]]
            : [
                'all',
                ['>=', 'point_count', data[0]],
                ['<', 'point_count', layersData[index + 1][0]],
              ],
      })),
    );
  }
}
