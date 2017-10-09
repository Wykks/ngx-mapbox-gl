import { GeoJSONSourceOptions } from 'mapbox-gl';
import { Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'mgl-geojson-source',
  template: ''
})
export class GeoJSONSourceComponent implements OnInit, OnDestroy, OnChanges, GeoJSONSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() data?: GeoJSON.Feature<GeoJSON.GeometryObject> | GeoJSON.FeatureCollection<GeoJSON.GeometryObject> | string;
  @Input() maxzoom?: number;
  @Input() buffer?: number;
  @Input() tolerance?: number;
  @Input() cluster?: number | boolean;
  @Input() clusterRadius?: number;
  @Input() clusterMaxZoom?: number;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.addSource(this.id, {
      type: 'geojson',
      data: this.data,
      maxzoom: this.maxzoom,
      buffer: this.buffer,
      tolerance: this.tolerance,
      cluster: this.cluster,
      clusterRadius: this.clusterRadius,
      clusterMaxZoom: this.clusterMaxZoom,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data && !changes.data.isFirstChange() ||
      changes.maxzoom && !changes.maxzoom.isFirstChange() ||
      changes.buffer && !changes.buffer.isFirstChange() ||
      changes.tolerance && !changes.tolerance.isFirstChange() ||
      changes.cluster && !changes.cluster.isFirstChange() ||
      changes.clusterRadius && !changes.clusterRadius.isFirstChange() ||
      changes.clusterMaxZoom && !changes.clusterMaxZoom.isFirstChange()
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.MapService.removeSource(this.id);
  }
}
