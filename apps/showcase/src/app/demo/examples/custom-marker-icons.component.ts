import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [zoom]="[5]"
      [center]="[-65.017, -16.457]"
    >
      @for (feature of geojson.features; track $index) {
        <mgl-marker [feature]="feature">
          <div
            (click)="alert(feature.properties.message)"
            (keydown.enter)="alert(feature.properties.message)"
            tabindex="0"
            class="marker"
            [ngStyle]="{
              'background-image':
                'url(https://picsum.photos/id/' +
                feature.properties.imageId +
                '/' +
                feature.properties.iconSize.join('/') +
                ')',
              width: feature.properties.iconSize[0] + 'px',
              height: feature.properties.iconSize[1] + 'px',
            }"
          ></div>
        </mgl-marker>
      }
    </mgl-map>
  `,
  imports: [MapComponent, MglMapResizeDirective, MarkerComponent, NgStyle],
  styleUrls: ['./examples.css', './custom-marker-icons.component.css'],
})
export class CustomMarkerIconsComponent {
  geojson = {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        properties: {
          message: 'Foo',
          imageId: 1011,
          iconSize: [60, 60],
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [-66.324462890625, -16.024695711685304],
        },
      },
      {
        type: 'Feature' as const,
        properties: {
          message: 'Bar',
          imageId: 870,
          iconSize: [50, 50],
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [-61.2158203125, -15.97189158092897],
        },
      },
      {
        type: 'Feature' as const,
        properties: {
          message: 'Baz',
          imageId: 837,
          iconSize: [40, 40],
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [-63.29223632812499, -18.28151823530889],
        },
      },
    ],
  };

  alert(message: string) {
    alert(message);
  }
}
