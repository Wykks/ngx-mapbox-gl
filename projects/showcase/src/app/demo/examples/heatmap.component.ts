import { Layer } from 'mapbox-gl';
import { Component, OnInit } from '@angular/core';

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
        ></mgl-geojson-source>
        <mgl-layer
          *ngFor="let layer of clusterLayers"
          [id]="layer.id"
          type="circle"
          source="earthquakes"
          [filter]="layer.filter"
          [paint]="layer.paint"
          before="waterway-label"
        ></mgl-layer>
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
        ></mgl-layer>
      </ng-container>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class HeatMapComponent implements OnInit {
  earthquakes: object;
  clusterLayers: Layer[];

  async ngOnInit() {
    this.earthquakes = await import('./earthquakes.geo.json');
    const layersData: [number, string][] = [
      [0, 'green'],
      [20, 'orange'],
      [200, 'red'],
    ];
    this.clusterLayers = layersData.map((data, index) => ({
      id: `cluster-${index}`,
      paint: {
        'circle-color': data[1],
        'circle-radius': 70,
        'circle-blur': 1,
      },
      filter:
        index === layersData.length - 1
          ? ['>=', 'point_count', data[0]]
          : ['all', ['>=', 'point_count', data[0]], ['<', 'point_count', layersData[index + 1][0]]],
    }));
  }
}
