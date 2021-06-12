import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[13]"
      [center]="[11.255, 43.77]"
    >
      <mgl-control mglFullscreen></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class FullscreenComponent {}
