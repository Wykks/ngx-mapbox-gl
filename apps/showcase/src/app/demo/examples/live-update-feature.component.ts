import { Component, OnDestroy, OnInit } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';
import { scan, Subscription, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/satellite-v9'"
      [zoom]="zoom"
      [center]="center"
      [centerWithPanTo]="true"
      [pitch]="[pitch]"
      (mapLoad)="animate()"
      movingMethod="jumpTo"
    >
      <mgl-geojson-source *ngIf="data" id="trace" [data]="data">
      </mgl-geojson-source>
      <mgl-layer
        *ngIf="data"
        id="trace"
        type="line"
        source="trace"
        [paint]="{
          'line-color': 'yellow',
          'line-opacity': 0.75,
          'line-width': 5
        }"
      >
      </mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class LiveUpdateFeatureComponent implements OnInit, OnDestroy {
  data: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  center: LngLatLike;
  zoom: [number] = [0];
  pitch: number;

  private sub?: Subscription;
  private originalCoordinates: GeoJSON.Position[] = [];

  async ngOnInit() {
    const data: GeoJSON.FeatureCollection<GeoJSON.LineString> = (await import(
      './hike.geo.json'
    )) as any;
    this.originalCoordinates = data.features[0].geometry.coordinates.slice();
    data.features[0].geometry.coordinates = [this.originalCoordinates[0]];
    this.data = data;
    this.center = this.originalCoordinates[0] as [number, number];
    this.zoom = [14];
    this.pitch = 30;
  }

  animate() {
    this.sub = timer(0, 10)
      .pipe(
        scan((idx) => idx + 1, 0),
        takeWhile((idx) => idx < this.originalCoordinates.length)
      )
      .subscribe((idx) => {
        // Note: For animations, it's probably better to use mapboxgl api directly instead of updating inputs
        // Also you will be able to make use of the preloadOnly option of mapbox-gl moving methods to have better results
        this.center = this.originalCoordinates[idx] as [number, number];
        this.data.features[0].geometry.coordinates.push(
          this.originalCoordinates[idx]
        );
        this.data = { ...this.data };
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
