import { Component, forwardRef, Inject, Input, OnChanges, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';

@Component({
  selector: 'mgl-feature',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit, OnDestroy, OnChanges, GeoJSON.Feature<GeoJSON.GeometryObject> {
  /* Init inputs */
  @Input() id?: string;
  @Input() geometry: GeoJSON.GeometryObject;
  @Input() properties: any;
  type: 'Feature' = 'Feature';

  private feature: GeoJSON.Feature<GeoJSON.GeometryObject>;

  constructor(
    @Inject(forwardRef(() => GeoJSONSourceComponent)) private GeoJSONSourceComponent: GeoJSONSourceComponent
  ) {}

  ngOnInit() {
    this.feature = {
      type: this.type,
      geometry: this.geometry,
      properties: this.properties ? this.properties : {}
    };
    if (this.id) {
      this.feature.id = this.id;
    }
    this.GeoJSONSourceComponent.addFeature(this.feature);
  }

  ngOnChanges() {

  }

  ngOnDestroy() {
    this.GeoJSONSourceComponent.removeFeature(this.feature);
  }
}
