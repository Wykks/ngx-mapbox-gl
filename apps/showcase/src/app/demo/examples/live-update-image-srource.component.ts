import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { MglMapResizeDirective } from '../mgl-map-resize.directive';
import {
  MapComponent,
  ImageSourceComponent,
  LayerComponent,
} from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/satellite-v9'"
      [center]="center"
      [zoom]="[14]"
      movingMethod="jumpTo"
    >
      <mgl-image-source
        id="test_source"
        [url]="url"
        [coordinates]="coordinates"
      />

      <mgl-layer
        id="test_layer"
        source="test_source"
        type="raster"
        [paint]="{ 'raster-fade-duration': 0 }"
      />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    ImageSourceComponent,
    LayerComponent,
  ],
  styleUrls: ['./examples.css'],
})
export class LiveUpdateImageSourceComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private readonly size = 0.001;
  center: [number, number];

  url = 'assets/red.png';
  coordinates: number[][];

  async ngOnInit() {
    const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = (await import(
      './hike.geo.json'
    )) as any;
    const points = data.features[0].geometry?.coordinates;
    const coordinates = points.map((c) => this.makeRectangle(c));

    this.center = points[0] as [number, number];
    this.coordinates = coordinates[0];

    let i = 0;

    this.sub = interval(250).subscribe(() => {
      this.url = Math.random() < 0.5 ? 'assets/red.png' : 'assets/blue.png';
      this.coordinates = coordinates[i];
      i = (i + 1) % coordinates.length;
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  private makeRectangle([long, lat]: number[]): number[][] {
    return [
      [long, lat],
      [long + this.size, lat],
      [long + this.size, lat - this.size],
      [long, lat - this.size],
    ];
  }
}
