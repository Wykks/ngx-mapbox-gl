import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { Layer } from 'mapbox-gl';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
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
      <ng-container *ngIf="earthquakes">
        <mgl-geojson-source
          id="earthquakes"
          [data]="earthquakes"
          [cluster]="true"
          [clusterMaxZoom]="15"
          [clusterRadius]="20"
        />
        <mgl-layer
          *ngFor="let layer of clusterLayers"
          [id]="layer.id"
          [type]="$any(layer.type)"
          source="earthquakes"
          [filter]="layer.filter"
          [paint]="layer.paint"
          before="waterway-label"
        />
        <mgl-layer
          id="unclustered-point"
          type="circle"
          source="earthquakes"
          [filter]="['!=', 'cluster', true]"
          [paint]="{
            'circle-color': 'rgba(0,255,0,0.5)',
            'circle-radius': 20,
            'circle-blur': 1
          }"
          before="waterway-label"
        />
      </ng-container>
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    GeoJSONSourceComponent,
    LayerComponent,
    NgIf,
    NgForOf,
  ],
  styleUrls: ['./examples.css'],
})
export class HeatMapComponent implements OnInit {
  earthquakes: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
  clusterLayers: Layer[];

  async ngOnInit() {
    this.earthquakes = (await import(
      './earthquakes.geo.json'
    )) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
    const layersData: [number, string][] = [
      [0, 'green'],
      [20, 'orange'],
      [200, 'red'],
    ];
    this.clusterLayers = layersData.map((data, index) => ({
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
    }));
  }
}
