import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { GeoJsonProperties } from 'geojson';
import { LngLat, MapLayerMouseEvent } from 'mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { MapComponent, LayerComponent, PopupComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v9'"
      [zoom]="[3]"
      [center]="[-100.04, 38.907]"
      [cursorStyle]="cursorStyle"
    >
      <mgl-layer
        id="states-layer"
        type="fill"
        [source]="{
          type: 'geojson',
          data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson',
        }"
        [paint]="{
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
        }"
        (layerMouseEnter)="cursorStyle = 'pointer'"
        (layerMouseLeave)="cursorStyle = ''"
        (layerClick)="onClick($event)"
      />
      <mgl-popup *ngIf="selectedLngLat" [lngLat]="selectedLngLat">
        <span [innerHTML]="selectedElement?.['name']"></span>
      </mgl-popup>
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    LayerComponent,
    PopupComponent,
    NgIf,
  ],
  styleUrls: ['./examples.css'],
})
export class PolygonPopupOnClickComponent {
  selectedElement: GeoJsonProperties;
  selectedLngLat: LngLat;
  cursorStyle: string;

  onClick(evt: MapLayerMouseEvent) {
    this.selectedLngLat = evt.lngLat;
    this.selectedElement = evt.features?.[0].properties as GeoJsonProperties;
  }
}
