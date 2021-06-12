import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[9]"
      [center]="[137.9150899566626, 36.25956997955441]"
    >
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class SatelliteMapComponent {}
