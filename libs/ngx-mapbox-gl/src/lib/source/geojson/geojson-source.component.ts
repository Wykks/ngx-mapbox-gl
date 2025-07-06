import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  model,
  type InputSignal,
} from '@angular/core';
import type { GeoJSONSource, GeoJSONSourceSpecification } from 'mapbox-gl';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { MapService } from '../../map/map.service';
import type { Feature, GeometryObject, GeoJSON } from 'geojson';

type GeoJSONSourceInputs = {
  [K in keyof Omit<GeoJSONSourceSpecification, 'type'>]: InputSignal<
    Omit<GeoJSONSourceSpecification, 'type'>[K]
  >;
};

@Component({
  selector: 'mgl-geojson-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoJSONSourceComponent
  implements OnInit, OnDestroy, OnChanges, GeoJSONSourceInputs
{
  private mapService = inject(MapService);
  private zone = inject(NgZone);
  /* Init inputs */
  id = input.required<string>();

  /* Dynamic inputs */
  data = model<GeoJSON | string>();
  minzoom = input<GeoJSONSourceSpecification['minzoom']>();
  maxzoom = input<GeoJSONSourceSpecification['maxzoom']>();
  attribution = input<GeoJSONSourceSpecification['attribution']>();
  buffer = input<GeoJSONSourceSpecification['buffer']>();
  tolerance = input<GeoJSONSourceSpecification['tolerance']>();
  cluster = input<GeoJSONSourceSpecification['cluster']>();
  clusterRadius = input<GeoJSONSourceSpecification['clusterRadius']>();
  clusterMaxZoom = input<GeoJSONSourceSpecification['clusterMaxZoom']>();
  clusterMinPoints = input<GeoJSONSourceSpecification['clusterMinPoints']>();
  clusterProperties = input<GeoJSONSourceSpecification['clusterProperties']>();
  lineMetrics = input<GeoJSONSourceSpecification['lineMetrics']>();
  generateId = input<GeoJSONSourceSpecification['generateId']>();
  promoteId = input<GeoJSONSourceSpecification['promoteId']>();
  filter = input<GeoJSONSourceSpecification['filter']>();
  dynamic = input<GeoJSONSourceSpecification['dynamic']>();

  updateFeatureData = new Subject();

  private sub = new Subscription();
  private sourceAdded = false;
  private featureIdCounter = 0;

  ngOnInit() {
    if (!this.data()) {
      this.data.set({
        type: 'FeatureCollection',
        features: [],
      });
    }
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance, 'styledata')
        .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
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
      (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
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
      (changes['filter'] && !changes['filter'].isFirstChange()) ||
      (changes['dynamic'] && !changes['dynamic'].isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
    if (changes['data'] && !changes['data'].isFirstChange()) {
      const source = this.mapService.getSource<GeoJSONSource>(this.id());
      if (source === undefined) {
        return;
      }
      source.setData(this.data()!);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id());
      this.sourceAdded = false;
    }
  }

  /**
   * For clustered sources, fetches the zoom at which the given cluster expands.
   *
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterExpansionZoom(clusterId: number) {
    const source = this.mapService.getSource<GeoJSONSource>(this.id())!;
    return this.zone.run(
      async () =>
        new Promise<number | null | undefined>((resolve, reject) => {
          source.getClusterExpansionZoom(clusterId, (error, zoom) => {
            if (error) {
              reject(error);
            } else {
              resolve(zoom);
            }
          });
        }),
    );
  }

  /**
   * For clustered sources, fetches the children of the given cluster on the next zoom level (as an array of GeoJSON features).
   *
   * @param clusterId The value of the cluster's cluster_id property.
   */
  async getClusterChildren(clusterId: number) {
    const source = this.mapService.getSource<GeoJSONSource>(this.id())!;
    return this.zone.run(
      async () =>
        new Promise<Feature<GeometryObject>[] | null | undefined>(
          (resolve, reject) => {
            source.getClusterChildren(clusterId, (error, features) => {
              if (error) {
                reject(error);
              } else {
                resolve(features);
              }
            });
          },
        ),
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
    const source = this.mapService.getSource<GeoJSONSource>(this.id())!;
    return this.zone.run(
      async () =>
        new Promise<Feature<GeometryObject>[]>((resolve, reject) => {
          source.getClusterLeaves(
            clusterId,
            limit,
            offset,
            (error, features) => {
              if (error) {
                reject(error);
              } else {
                resolve(features || []);
              }
            },
          );
        }),
    );
  }

  _addFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection =
      this.data() as GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
    collection.features.push(feature);
    this.updateFeatureData.next(null);
  }

  _removeFeature(feature: GeoJSON.Feature<GeoJSON.GeometryObject>) {
    const collection =
      this.data() as GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
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
      data: this.data(),
      minzoom: this.minzoom(),
      maxzoom: this.maxzoom(),
      attribution: this.attribution(),
      buffer: this.buffer(),
      tolerance: this.tolerance(),
      cluster: this.cluster(),
      clusterRadius: this.clusterRadius(),
      clusterMaxZoom: this.clusterMaxZoom(),
      clusterMinPoints: this.clusterMinPoints(),
      clusterProperties: this.clusterProperties(),
      lineMetrics: this.lineMetrics(),
      generateId: this.generateId(),
      promoteId: this.promoteId(),
      filter: this.filter(),
      dynamic: this.dynamic(),
    };
    this.mapService.addSource(this.id(), source);
    const sub = this.updateFeatureData.pipe(debounceTime(0)).subscribe(() => {
      const source = this.mapService.getSource<GeoJSONSource>(this.id());
      if (source === undefined) {
        return;
      }
      source.setData(this.data()!);
    });
    this.sub.add(sub);
    this.sourceAdded = true;
  }
}
