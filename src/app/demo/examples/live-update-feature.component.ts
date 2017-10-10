import { Component, OnInit } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

const hike = require('./hike.geo.json');

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/satellite-v9'"
    [zoom]="zoom"
    [center]="center"
    [centerWithPanTo]="true"
    [pitch]="pitch"
    movingMethod="jumpTo"
  >
    <ng-template>
      <mgl-geojson-source
        *ngIf="data"
        id="trace"
        [data]="data"
      >
      </mgl-geojson-source>
      <mgl-layer
        *ngIf="data"
        id="trace"
        type="line"
        source="trace"
        [paint]="{
          'line-color': 'yellow',
          'line-opacity': 0.75,
          'line-width': 5
        }"
      >
      </mgl-layer>
    </ng-template>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class LiveUpdateFeatureComponent implements OnInit {
  data: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  center: LngLatLike;
  zoom = 0;
  pitch: number;

  constructor() { }

  ngOnInit() {
    of(hike)
      .delay(500) // Simulate call
      .subscribe((data) => {
        const coordinates = data.features[0].geometry.coordinates;
        data.features[0].geometry.coordinates = [coordinates[0]];
        this.data = data;
        this.center = coordinates[0];
        this.zoom = 14;
        this.pitch = 30;
        let i = 0;
        const timer = window.setInterval(() => {
          if (i < coordinates.length) {
            this.center = coordinates[i];
            data.features[0].geometry.coordinates.push(coordinates[i]);
            this.data = { ...this.data };
            i++;
          } else {
            window.clearInterval(timer);
          }
        }, 10);
      });
  }
}
