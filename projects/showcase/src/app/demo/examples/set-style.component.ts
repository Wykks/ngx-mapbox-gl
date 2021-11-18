import { Component, OnInit } from '@angular/core';
import {
  RasterLayerSpecification,
  RasterSourceSpecification,
  StyleSpecification,
} from 'maplibre-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map [style]="style" [zoom]="[13]" [center]="[4.899, 52.372]">
    </mgl-map>
    <mat-radio-group [ngModel]="layerId" (ngModelChange)="changeStyle($event)">
      <mat-radio-button value="streets">streets</mat-radio-button>
      <mat-radio-button value="code">from code</mat-radio-button>
    </mat-radio-group>
  `,
  styleUrls: ['./examples.css', './set-style.component.css'],
})
export class SetStyleComponent implements OnInit {
  layerId = 'basic';
  style: string | StyleSpecification;

  ngOnInit() {
    this.changeStyle(this.layerId);
  }

  changeStyle(layerId: string) {
    if (layerId === 'streets') {
      this.style = `https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL`;
    } else {
      const source = {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        minzoom: 0,
        maxzoom: 15,
        scheme: 'xyz',
        tileSize: 256,
      } as RasterSourceSpecification;
      const layer = {
        id: 'some-raster-layer-id',
        type: 'raster',
        source: 'raster',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'raster-opacity': 1.0,
        },
      } as RasterLayerSpecification;

      this.style = {
        version: 8,
        sources: {
          raster: source,
        },
        layers: [layer],
      };
    }
  }
}
