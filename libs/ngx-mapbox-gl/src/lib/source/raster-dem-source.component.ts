import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type { RasterDEMSourceSpecification } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

// Typing issue in RasterDEMSourceSpecification
// type RasterDemSourceInputs = {
//   [K in keyof Omit<RasterDEMSourceSpecification, 'type'>]: InputSignal<
//     Omit<RasterDEMSourceSpecification, 'type'>[K]
//   >;
// };

@Component({
  selector: 'mgl-raster-dem-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RasterDemSourceComponent implements OnInit, OnDestroy, OnChanges {
  private mapService = inject(MapService);
  /* Init inputs */
  id = input.required<string>();

  /* Dynamic inputs */
  url = input<RasterDEMSourceSpecification['url']>();
  tiles = input<RasterDEMSourceSpecification['tiles']>();
  bounds = input<RasterDEMSourceSpecification['bounds']>();
  minzoom = input<RasterDEMSourceSpecification['minzoom']>();
  maxzoom = input<RasterDEMSourceSpecification['maxzoom']>();
  tileSize = input<RasterDEMSourceSpecification['tileSize']>();
  attribution = input<RasterDEMSourceSpecification['attribution']>();
  encoding = input<RasterDEMSourceSpecification['encoding']>();
  volatile = input<RasterDEMSourceSpecification['volatile']>();

  private sourceAdded = false;
  private sub = new Subscription();

  ngOnInit() {
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
      (changes['url'] && !changes['url'].isFirstChange()) ||
      (changes['tiles'] && !changes['tiles'].isFirstChange()) ||
      (changes['bounds'] && !changes['bounds'].isFirstChange()) ||
      (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
      (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
      (changes['tileSize'] && !changes['tileSize'].isFirstChange()) ||
      (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
      (changes['encoding'] && !changes['encoding'].isFirstChange()) ||
      (changes['volatile'] && !changes['volatile'].isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id());
      this.sourceAdded = false;
    }
  }

  private init() {
    const source: RasterDEMSourceSpecification = {
      type: 'raster-dem',
      url: this.url(),
      tiles: this.tiles(),
      bounds: this.bounds(),
      minzoom: this.minzoom(),
      maxzoom: this.maxzoom(),
      tileSize: this.tileSize(),
      attribution: this.attribution(),
      encoding: this.encoding(),
      volatile: this.volatile(),
    };
    this.mapService.addSource(this.id(), source);
    this.sourceAdded = true;
  }
}
