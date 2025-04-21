import { Component, signal } from '@angular/core';
import { MapComponent, LayerComponent, ImageComponent } from 'ngx-mapbox-gl';
import { MglMapResizeDirective } from './mgl-map-resize.directive';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [center]="[0, 0]"
      [zoom]="[2]"
    >
      <mgl-image
        id="gradient"
        [data]="{
          width: 64,
          height: 64,
          data: imageData(),
        }"
      />
      <mgl-layer
        id="points"
        type="symbol"
        [source]="{
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0],
                },
              },
            ],
          },
        }"
        [layout]="{ 'icon-image': 'gradient' }"
      />
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    LayerComponent,
    ImageComponent,
  ],
  styleUrls: ['./examples.css'],
})
export class AddImageGeneratedComponent {
  imageData = signal<Uint8Array>(this.generateImage());

  private generateImage() {
    const width = 64; // The image will be 64 pixels square
    const bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
    const data = new Uint8Array(width * width * bytesPerPixel);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {
        const offset = (y * width + x) * bytesPerPixel;
        data[offset + 0] = (y / width) * 255; // red
        data[offset + 1] = (x / width) * 255; // green
        data[offset + 2] = 128; // blue
        data[offset + 3] = 255; // alpha
      }
    }
    return data;
  }
}
