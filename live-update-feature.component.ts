import { Component, DestroyRef, inject } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { scan, takeWhile, timer } from 'rxjs';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import {
  MapComponent,
  GeoJSONSourceComponent,
  LayerComponent,
} from 'ngx-mapbox-gl';
import { signal, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/satellite-v9'"
      [zoom]="zoom()"
      [center]="center()"
      [centerWithPanTo]="true"
      [pitch]="pitch()"
      (mapLoad)="mapLoaded.set(true)"
      movingMethod="jumpTo"
    >
      @let _animatedGeometry = animatedGeometry();
      @if (_animatedGeometry) {
        <mgl-geojson-source id="trace" [data]="_animatedGeometry" />
        <mgl-layer
          id="trace"
          type="line"
          source="trace"
          [paint]="{
            'line-color': 'yellow',
            'line-opacity': 0.75,
            'line-width': 5,
          }"
        />
      }
    </mgl-map>
  `,
  imports: [
    MapComponent,
    MglMapResizeDirective,
    GeoJSONSourceComponent,
    LayerComponent,
  ],
  styleUrls: ['./examples.css'],
})
export class LiveUpdateFeatureComponent {
  private readonly destroyRef = inject(DestroyRef);

  animatedGeometry = signal<GeoJSON.LineString | undefined>(undefined);
  center = signal<LngLatLike | undefined>(undefined);
  zoom = signal<[number]>([0]);
  pitch = signal<[number]>([0]);
  mapLoaded = signal(false);

  private originalCoordinates = signal<GeoJSON.Position[] | undefined>(
    undefined,
  );

  constructor() {
    this.loadSource();
    const ref = effect(() => {
      const originalCoordinates = this.originalCoordinates();
      const mapLoaded = this.mapLoaded();
      if (!mapLoaded || !originalCoordinates) {
        return;
      }
      ref.destroy();
      this.animate(originalCoordinates);
    });
  }

  private async loadSource() {
    const data = (await import(
      './hike.geo.json'
    )) as unknown as GeoJSON.FeatureCollection<GeoJSON.LineString>;
    const coordinates = data.features[0].geometry.coordinates;
    this.center.set(coordinates[0] as [number, number]);
    this.zoom.set([14]);
    this.pitch.set([30]);
    this.originalCoordinates.set(coordinates);
  }

  animate(originalCoordinates: GeoJSON.Position[]) {
    timer(0, 10)
      .pipe(
        scan((idx) => idx + 1, 0),
        takeWhile((idx) => idx < originalCoordinates.length),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((idx) => {
        this.center.set(originalCoordinates[idx] as [number, number]);
        const animatedGeometry = this.animatedGeometry();
        if (animatedGeometry) {
          animatedGeometry.coordinates.push(originalCoordinates[idx]);
          this.animatedGeometry.set({
            ...animatedGeometry,
          });
        } else {
          this.animatedGeometry.set({
            type: 'LineString',
            coordinates: [originalCoordinates[0]],
          });
        }
      });
  }
}
