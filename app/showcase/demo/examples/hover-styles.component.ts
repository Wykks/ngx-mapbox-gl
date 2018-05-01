import { Component } from '@angular/core';

@Component({
  selector: 'mgl-demo',
  template: `
  <mgl-map
    style="mapbox://styles/mapbox/streets-v9"
    [zoom]="[2]"
    [center]="[-100.486052, 37.830348]"
  >
    <mgl-geojson-source
      id="states"
      data="https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson"
    >
    </mgl-geojson-source>
    <mgl-layer
      id="state-fills"
      type="fill"
      source="states"
      [paint]="{
        'fill-color': '#627BC1',
        'fill-opacity': 0.5
      }"
      (mouseMove)="activateHoverOn($event)"
      (mouseLeave)="disableHover()"
    >
    </mgl-layer>
    <mgl-layer
      id="state-borders"
      type="line"
      source="states"
      [paint]="{
        'line-color': '#627BC1',
        'line-width': 2
      }"
    >
    </mgl-layer>
    <mgl-layer
      id="state-fills-hover"
      type="fill"
      source="states"
      [paint]="{
        'fill-color': '#627BC1',
        'fill-opacity': 1
      }"
      [filter]="hoverFilter"
    >
    </mgl-layer>
  </mgl-map>
  `,
  styleUrls: ['./examples.css']
})
export class HoverStylesComponent {
  hoverFilter = ['==', 'name', ''];

  activateHoverOn(evt: any) {
    this.hoverFilter = ['==', 'name', evt.features[0].properties.name];
  }

  disableHover() {
    this.hoverFilter = ['==', 'name', ''];
  }
}
