import { Component } from '@angular/core';
import { Map, MapMouseEvent } from 'mapbox-gl';
import { randomPoint } from '@turf/random';
import { BBox } from '@turf/helpers';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="3"
    [center]="[-96, 37.8]"
    [cursorStyle]="cursorStyle"
    (load)="onLoad($event)"
  >
    <mgl-geojson-source
      id="points"
      [data]="points"
    ></mgl-geojson-source>
    <mgl-layer
      id="points"
      source="points"
      type="symbol"
      [layout]="{ 'icon-image': 'rocket-15' }"
      (click)="onClick($event)"
      (mouseEnter)="cursorStyle = 'pointer'"
      (mouseLeave)="cursorStyle = ''"
    ></mgl-layer>
    <mgl-popup
      *ngIf="selectedPoint"
      [lngLat]="selectedPoint.geometry.coordinates"
      (close)="selectedPoint = null"
    >
      <pre>{{ selectedPoint | json }}</pre>
    </mgl-popup>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class NgxPopupForLayerComponent {
  points: GeoJSON.FeatureCollection<GeoJSON.Point>;
  selectedPoint: GeoJSON.Feature<GeoJSON.Point>;
  cursorStyle: string;

  onLoad(map: Map) {
    const bounds = map.getBounds();
    const bbox: BBox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
    this.points = randomPoint(50, { bbox });
  }

  onClick(evt: MapMouseEvent) {
    this.selectedPoint = (<any>evt).features[0];
  }
}
