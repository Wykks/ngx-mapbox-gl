import { Component } from '@angular/core';
import { MapImageData } from 'projects/ngx-maplibre-gl/src/public_api';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      (styleImageMissing)="generateImage($event)"
    >
      <mgl-image
        *ngFor="let imageData of imagesData; trackBy: trackByImage"
        [id]="imageData.id"
        [data]="imageData"
      ></mgl-image>
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
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                },
                properties: {
                  color: '255,0,0'
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [50, 0]
                },
                properties: {
                  color: '255,209,28'
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-50, 0]
                },
                properties: {
                  color: '242,127,32'
                }
              }
            ]
          }
        }"
        [layout]="{
          'icon-image': ['concat', 'square-rgb-', ['get', 'color']]
        }"
      >
      </mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class AddImageMissingGeneratedComponent {
  imagesData: (MapImageData & { id: string })[] = [];

  generateImage({ id }: { id: string }) {
    // check if this missing icon is one this function can generate
    const prefix = 'square-rgb-';
    if (id.indexOf(prefix) !== 0) {
      return;
    }

    // extract the color from the id
    const rgb = id.replace(prefix, '').split(',').map(Number);

    const width = 64; // The image will be 64 pixels square
    const bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
    const data = new Uint8Array(width * width * bytesPerPixel);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {
        const offset = (y * width + x) * bytesPerPixel;
        data[offset + 0] = rgb[0]; // red
        data[offset + 1] = rgb[1]; // green
        data[offset + 2] = rgb[2]; // blue
        data[offset + 3] = 255; // alpha
      }
    }
    const imageData = {
      id,
      width,
      height: width,
      data,
    };
    this.imagesData = [...this.imagesData, imageData];
  }

  trackByImage(_idx: number, image: { id: string }) {
    return image.id;
  }
}
