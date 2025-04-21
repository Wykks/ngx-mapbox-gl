import { Component, signal } from '@angular/core';
import { GeoJsonProperties } from 'geojson';
import { LngLat, type MapMouseEvent } from 'mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { MapComponent, LayerComponent, PopupComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [zoom]="[3]"
      [center]="[-100.04, 38.907]"
      [cursorStyle]="cursorStyle()"
    >
      <mgl-layer
        id="states-layer"
        type="fill"
        [source]="{
          type: 'geojson',
          data: 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson',
        }"
        [paint]="{
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
        }"
        (layerMouseEnter)="cursorStyle.set('pointer')"
        (layerMouseLeave)="cursorStyle.set('')"
        (layerClick)="onClick($event)"
      />
      @let _selectedLngLat = selectedLngLat();
      @let _selectedElement = selectedElement();
      @if (_selectedLngLat && _selectedElement) {
        <mgl-popup [lngLat]="_selectedLngLat">
          <span [innerHTML]="_selectedElement?.['name']"></span>
        </mgl-popup>
      }
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    LayerComponent,
    PopupComponent,
  ],
  styleUrls: ['./examples.css'],
})
export class PolygonPopupOnClickComponent {
  selectedElement = signal<GeoJsonProperties | null>(null);
  selectedLngLat = signal<LngLat | null>(null);
  cursorStyle = signal('');

  onClick(evt: MapMouseEvent) {
    this.selectedLngLat.set(evt.lngLat);
    this.selectedElement.set(evt.features?.[0].properties as GeoJsonProperties);
  }
}
