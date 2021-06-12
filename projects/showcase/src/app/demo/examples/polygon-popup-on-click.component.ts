import { Component } from '@angular/core';
import { LngLat, MapLayerMouseEvent } from 'maplibre-gl';
import { GeoJsonProperties } from 'geojson';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[3]"
      [center]="[-100.04, 38.907]"
      [cursorStyle]="cursorStyle"
    >
      <mgl-layer
        id="states-layer"
        type="fill"
        [source]="{
          type: 'geojson',
          data:
            'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
        }"
        [paint]="{
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }"
        (layerMouseEnter)="cursorStyle = 'pointer'"
        (layerMouseLeave)="cursorStyle = ''"
        (layerClick)="onClick($event)"
      ></mgl-layer>
      <mgl-popup *ngIf="selectedLngLat" [lngLat]="selectedLngLat">
        <span [innerHTML]="selectedElement?.name"></span>
      </mgl-popup>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class PolygonPopupOnClickComponent {
  selectedElement: GeoJsonProperties;
  selectedLngLat: LngLat;
  cursorStyle: string;

  onClick(evt: MapLayerMouseEvent) {
    this.selectedLngLat = evt.lngLat;
    this.selectedElement = evt.features![0].properties;
  }
}
