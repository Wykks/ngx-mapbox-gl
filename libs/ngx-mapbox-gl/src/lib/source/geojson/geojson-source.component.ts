import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  GeoJSONSource,
  GeoJSONSourceSpecification,
} from 'mapbox-gl';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'mgl-geojson-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoJSONSourceComponent
  implements OnInit, OnDestroy, OnChanges, GeoJSONSourceSpecification
{
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() data?: GeoJSONSourceSpecification['data'];
  @Input() maxzoom?: GeoJSONSourceSpecification['maxzoom'];
  @Input() attribution?: GeoJSONSourceSpecification['attribution'];
  @Input() buffer?: GeoJSONSourceSpecification['buffer'];
  @Input() tolerance?: GeoJSONSourceSpecification['tolerance'];
  @Input() cluster?: GeoJSONSourceSpecification['cluster'];
  @Input() clusterRadius?: GeoJSONSourceSpecification['clusterRadius'];
  @Input() clusterMaxZoom?: GeoJSONSourceSpecification['clusterMaxZoom'];
  @Input() clusterMinPoints?: GeoJSONSourceSpecification['clusterMinPoints'];
  @Input() clusterProperties?: GeoJSONSourceSpecification['clusterProperties'];
  @Input() lineMetrics?: GeoJSONSourceSpecification['lineMetrics'];
  @Input() generateId?: GeoJSONSourceSpecification['generateId'];
  @Input() promoteId?: GeoJSONSourceSpecification['promoteId'];
  @Input() filter?: GeoJSONSourceSpecification['filter'];

  type: GeoJSONSourceSpecification['type'] = 'geojson';
  updateFeatureData = new Subject();

  private sub = new Subscription();
  private sourceAdded = false;
  private featureIdCounter = 0;

  constructor(private mapService: MapService, private zone: NgZone) {}

  ngOnInit() {
    if (!this.data) {
      this.data = {
        type: 'FeatureCollection',
        features: [],
      };
    }
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance, 'styledata')
        .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
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
      (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
      (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
      (changes['buffer'] && !changes['buffer'].isFirstChange()) ||
      (changes['tolerance'] && !changes['tolerance'].isFirstChange()) ||
      (changes['cluster'] && !changes['cluster'].isFirstChange()) ||
      (changes['clusterRadius'] && !changes['clusterRadius'].isFirstChange()) ||
      (changes['clusterMaxZoom'] &&
        !changes['clusterMaxZoom'].isFirstChange()) ||
      (changes['clusterMinPoints'] &&
        !changes['clusterMinPoints'].isFirstChange()) ||
      (changes['clusterProperties'] &&
        !changes['clusterProperties'].isFirstChange()) ||
      (changes['lineMetrics'] && !changes['lineMetrics'].isFirstChange()) ||
      (changes['generateId'] && !changes['generateId'].isFirstChange()) ||
      (changes['promoteId'] && !changes['promoteId'].isFirstChange()) ||
      (changes['filter'] && !changes['filter'].isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
    if (changes['data'] && !changes['data'].isFirstChange()) {
      const source = this.mapService.getSource<GeoJSONSource>(this.id);
      if (source === undefined) {
        return;
      }
      source.setData(this.data!);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id);
      this.sourceAdded = false;
    }
  }

  /**
   * For clustered sources, fetches the zoom at which the given cluster expands.
   *
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterExpansionZoom(clusterId: number) {
    const source = this.mapService.getSource<GeoJSONSource>(this.id);
    return this.zone.run(
      async () =>
        new Promise<number>((resolve, reject) => {
          source.getClusterExpansionZoom(clusterId, (error, zoom) => {
            if (error) {
              reject(error);
            } else {
              resolve(zoom ? zoom : 0);
            }
          });
        })
    );
  }

  /**
   * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
   *
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterChildren(clusterId: number) {
    const source = this.mapService.getSource<GeoJSONSource>(this.id);
    return this.zone.run(
      async () =>
        new Promise<GeoJSON.Feature<GeoJSON.Geometry>[]>((resolve, reject) => {
          source.getClusterChildren(clusterId, (error, features) => {
            if (error) {
              reject(error);
            } else {
              resolve(features ? features : []);
            }
          });
        })
    );
  }

  /**
   * For clustered sources, fetches the original points that belong to the cluster (as an array of GeoJSON features).
   *
   * @param clusterId The value of the cluster's cluster_id property.
   * @param limit The maximum number of features to return.
   * @param offset The number of features to skip (e.g. for pagination).
   */
  async getClusterLeaves(clusterId: number, limit: number, offset: number) {
    const source = this.mapService.getSource<GeoJSONSource>(this.id);
    return this.zone.run(
      async () =>
        new Promise<GeoJSON.Feature<GeoJSON.Geometry>[]>((resolve, reject) => {
          source.getClusterLeaves(
            clusterId,
            limit,
            offset,
            (error, features) => {
              if (error) {
                reject(error);
              } else {
                resolve(features ? features : []);
              }
            }
          );
        })
    );
  }

  _addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = this
      .data as GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
    collection.features.push(feature);
    this.updateFeatureData.next(null);
  }

  _removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection = this
      .data as GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
    const index = collection.features.indexOf(feature);
    if (index > -1) {
      collection.features.splice(index, 1);
    }
    this.updateFeatureData.next(null);
  }

  _getNewFeatureId() {
    return ++this.featureIdCounter;
  }

  private init() {
    const source: GeoJSONSourceSpecification = {
      type: 'geojson',
      data: this.data,
      maxzoom: this.maxzoom,
      attribution: this.attribution,
      buffer: this.buffer,
      tolerance: this.tolerance,
      cluster: this.cluster,
      clusterRadius: this.clusterRadius,
      clusterMaxZoom: this.clusterMaxZoom,
      clusterMinPoints: this.clusterMinPoints,
      clusterProperties: this.clusterProperties,
      lineMetrics: this.lineMetrics,
      generateId: this.generateId,
      promoteId: this.promoteId,
      filter: this.filter,
    };
    this.mapService.addSource(this.id, source);
    const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
      const source = this.mapService.getSource<GeoJSONSource>(this.id);
      if (source === undefined) {
        return;
      }
      source.setData(this.data!);
    });
    this.sub.add(sub);
    this.sourceAdded = true;
  }
}
