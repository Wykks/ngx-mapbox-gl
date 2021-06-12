import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [center]="center"
      [zoom]="[14]"
      movingMethod="jumpTo"
    >
      <mgl-image-source
        id="test_source"
        [url]="url"
        [coordinates]="coordinates"
      >
      </mgl-image-source>

      <mgl-layer
        id="test_layer"
        source="test_source"
        type="raster"
        [paint]="{ 'raster-fade-duration': 0 }"
      >
      </mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class LiveUpdateImageSourceComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private readonly size = 0.001;
  center: number[];

  url = 'assets/red.png';
  coordinates: number[][];

  async ngOnInit() {
    const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = <any>(
      await import('./hike.geo.json')
    );
    const points = data.features[0].geometry!.coordinates;
    const coordinates = points.map((c) => this.makeRectangle(c));

    this.center = points[0];
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
