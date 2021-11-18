import { Component } from '@angular/core';
import { Map, SymbolLayerSpecification } from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="15.5"
      [center]="[-74.0066, 40.7135]"
      [pitch]="45"
      [bearing]="-17.6"
      (mapLoad)="onLoad($event)"
    >
      <mgl-layer
        id="3d-buildings"
        source="openmaptiles"
        sourceLayer="building"
        [filter]="['==', 'extrude', 'true']"
        type="fill-extrusion"
        [minzoom]="15"
        [paint]="{
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }"
        [before]="labelLayerId"
      ></mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class Display3dBuildingsComponent {
  labelLayerId: string;

  onLoad(mapInstance: Map) {
    const layers = mapInstance.getStyle().layers!;

    for (let i = 0; i < layers.length; i++) {
      if (
        layers[i].type === 'symbol' &&
        (<SymbolLayerSpecification>layers[i]).layout!['text-field']
      ) {
        this.labelLayerId = layers[i].id;
        break;
      }
    }
  }
}
