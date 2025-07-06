import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  forwardRef,
  inject,
  input,
  model,
} from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
import { Feature, GeometryObject, GeoJsonProperties, Point } from 'geojson';

@Component({
  selector: 'mgl-feature',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent implements OnInit, OnDestroy {
  private GeoJSONSourceComponent = inject<GeoJSONSourceComponent>(
    forwardRef(() => GeoJSONSourceComponent),
  );

  /* Init inputs */
  id = model<number>(); // FIXME number only for now https://github.com/mapbox/mapbox-gl-js/issues/2716
  geometry = input.required<GeometryObject>();
  properties = input<GeoJsonProperties>();
  type = 'Feature' as const;

  private feature: Feature<GeometryObject>;

  ngOnInit() {
    if (!this.id()) {
      this.id.set(this.GeoJSONSourceComponent._getNewFeatureId());
    }
    this.feature = {
      type: this.type,
      geometry: this.geometry(),
      properties: this.properties() ? this.properties()! : {},
    };
    this.feature.id = this.id();
    this.GeoJSONSourceComponent._addFeature(this.feature);
  }

  ngOnDestroy() {
    this.GeoJSONSourceComponent._removeFeature(this.feature);
  }

  updateCoordinates(coordinates: number[]) {
    (this.feature.geometry as Point).coordinates = coordinates;
    this.GeoJSONSourceComponent.updateFeatureData.next(null);
  }
}
