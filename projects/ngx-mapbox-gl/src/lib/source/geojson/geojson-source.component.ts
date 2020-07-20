import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { GeoJSONSource, GeoJSONSourceOptions } from 'mapbox-gl';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'mgl-geojson-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoJSONSourceComponent implements OnInit, OnDestroy, OnChanges, GeoJSONSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() data?: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string;
  @Input() minzoom?: number;
  @Input() maxzoom?: number;
  @Input() buffer?: number;
  @Input() tolerance?: number;
  @Input() generateId?: boolean;
  @Input() cluster?: boolean;
  @Input() clusterRadius?: number;
  @Input() clusterMaxZoom?: number;
  @Input() clusterProperties?: any;

  updateFeatureData = new Subject();

  private sub = new Subscription();
  private sourceAdded = false;
  private featureIdCounter = 0;

  constructor(private MapService: MapService, private zone: NgZone) {}

  ngOnInit() {
    if (!this.data) {
      this.data = {
        type: 'FeatureCollection',
        features: [],
      };
    }
    const sub1 = this.MapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(<any>this.MapService.mapInstance, 'styledata')
        .pipe(filter(() => !this.MapService.mapInstance.getSource(this.id)))
        .subscribe(() => {
          this.init();
        });
      this.sub.add(sub);
    });
    this.sub.add(sub1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded) {
      return;
    }
    if (
      (changes.maxzoom && !changes.maxzoom.isFirstChange()) ||
      (changes.minzoom && !changes.minzoom.isFirstChange()) ||
      (changes.buffer && !changes.buffer.isFirstChange()) ||
      (changes.tolerance && !changes.tolerance.isFirstChange()) ||
      (changes.generateId && !changes.generateId.isFirstChange()) ||
      (changes.cluster && !changes.cluster.isFirstChange()) ||
      (changes.clusterRadius && !changes.clusterRadius.isFirstChange()) ||
      (changes.clusterMaxZoom && !changes.clusterMaxZoom.isFirstChange()) ||
      (changes.clusterProperties && !changes.clusterProperties.isFirstChange())
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
    if (this.sourceAdded) {
      this.MapService.removeSource(this.id);
    }
  }

  /**
   * For clustered sources, fetches the zoom at which the given cluster expands.
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterExpansionZoom(clusterId: number) {
    const source = this.MapService.getSource<GeoJSONSource>(this.id);
    return this.zone.run(async () => {
      return new Promise<number>((resolve, reject) => {
        source.getClusterExpansionZoom(clusterId, (error, zoom) => {
          if (error) {
            reject(error);
          } else {
            resolve(zoom);
          }
        });
      });
    });
  }

  /**
   * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterChildren(clusterId: number) {
    const source = this.MapService.getSource<GeoJSONSource>(this.id);
    return this.zone.run(async () => {
      return new Promise<GeoJSON.Feature<GeoJSON.Geometry>[]>((resolve, reject) => {
        source.getClusterChildren(clusterId, (error, features) => {
          if (error) {
            reject(error);
          } else {
            resolve(features);
          }
        });
      });
    });
  }

  /**
   * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
   * @param clusterId The value of the cluster's cluster_id property.
   * @param limit The maximum number of features to return.
   * @param offset The number of features to skip (e.g. for pagination).
   */
  async getClusterLeaves(clusterId: number, limit: number, offset: number) {
    const source = this.MapService.getSource<GeoJSONSource>(this.id);
    return this.zone.run(async () => {
      return new Promise<GeoJSON.Feature<GeoJSON.Geometry>[]>((resolve, reject) => {
        source.getClusterLeaves(clusterId, limit, offset, (error, features) => {
          if (error) {
            reject(error);
          } else {
            resolve(features);
          }
        });
      });
    });
  }

  _addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = <GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>this.data;
    collection.features.push(feature);
    this.updateFeatureData.next();
  }

  _removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = <GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>this.data;
    const index = collection.features.indexOf(feature);
    if (index > -1) {
      collection.features.splice(index, 1);
    }
    this.updateFeatureData.next();
  }

  _getNewFeatureId() {
    return ++this.featureIdCounter;
  }

  private init() {
    this.MapService.addSource(this.id, <any>{
      // clusterProperties missing in typings
      type: 'geojson',
      data: this.data,
      maxzoom: this.maxzoom,
      minzoom: this.minzoom,
      buffer: this.buffer,
      tolerance: this.tolerance,
      generateId: this.generateId,
      cluster: this.cluster,
      clusterRadius: this.clusterRadius,
      clusterMaxZoom: this.clusterMaxZoom,
      clusterProperties: this.clusterProperties,
    });
    const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
      const source = this.MapService.getSource<GeoJSONSource>(this.id);
      source.setData(this.data!);
    });
    this.sub.add(sub);
    this.sourceAdded = true;
  }
}
