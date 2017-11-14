import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GeoJSONSource, GeoJSONSourceOptions } from 'mapbox-gl';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'mgl-geojson-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoJSONSourceComponent implements OnInit, OnDestroy, OnChanges, GeoJSONSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() data?: GeoJSON.Feature<GeoJSON.GeometryObject> | GeoJSON.FeatureCollection<GeoJSON.GeometryObject> | string;
  @Input() maxzoom?: number;
  @Input() buffer?: number;
  @Input() tolerance?: number;
  @Input() cluster?: boolean;
  @Input() clusterRadius?: number;
  @Input() clusterMaxZoom?: number;

  updateFeatureData = new Subject();

  private sub: Subscription;
  private sourceAdded = false;
  private featureIdCounter = 0;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(() => {
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
      this.sub = this.updateFeatureData.debounceTime(0).subscribe(() => {
        const source = this.MapService.getSource<GeoJSONSource>(this.id);
        source.setData(this.data!);
      });
      this.sourceAdded = true;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded) {
      return;
    }
    if (
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
    if (changes.data && !changes.data.isFirstChange()) {
      const source = this.MapService.getSource<GeoJSONSource>(this.id);
      source.setData(this.data!);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.MapService.removeSource(this.id);
  }

  addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    if (!this.data) {
      this.data = {
        type: 'FeatureCollection',
        features: []
      };
    }
    const collection = <GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>this.data;
    collection.features.push(feature);
    this.updateFeatureData.next();
  }

  removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = <GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>this.data;
    const index = collection.features.indexOf(feature);
    if (index > -1) {
      collection.features.splice(index, 1);
    }
    this.updateFeatureData.next();
  }

  getNewFeatureId() {
    return ++this.featureIdCounter;
  }
}
