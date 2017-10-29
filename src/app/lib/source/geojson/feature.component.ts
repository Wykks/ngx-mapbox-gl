import { Component, forwardRef, Inject, Input, OnChanges, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';

@Component({
  selector: 'mgl-feature',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit, OnDestroy, OnChanges, GeoJSON.Feature<GeoJSON.GeometryObject> {
  /* Init inputs */
  @Input() id?: number; // FIXME number only for now https://github.com/mapbox/mapbox-gl-js/issues/2716
  @Input() geometry: GeoJSON.GeometryObject;
  @Input() properties: any;
  type: 'Feature' = 'Feature';

  private feature: GeoJSON.Feature<GeoJSON.GeometryObject>;

  constructor(
    @Inject(forwardRef(() => GeoJSONSourceComponent)) private GeoJSONSourceComponent: GeoJSONSourceComponent
  ) { }

  ngOnInit() {
    this.feature = {
      type: this.type,
      geometry: this.geometry,
      properties: this.properties ? this.properties : {}
    };
    this.feature.id = this.id;
    this.GeoJSONSourceComponent.addFeature(this.feature);
  }

  ngOnChanges() {
    if (!this.id) {
      this.id = this.GeoJSONSourceComponent.getNewFeatureId();
    }
  }

  ngOnDestroy() {
    this.GeoJSONSourceComponent.removeFeature(this.feature);
  }

  updateCoordinates(coordinates: number[]) {
    (<GeoJSON.DirectGeometryObject>this.feature.geometry).coordinates = coordinates;
    this.GeoJSONSourceComponent.updateFeatureData.next();
  }
}
