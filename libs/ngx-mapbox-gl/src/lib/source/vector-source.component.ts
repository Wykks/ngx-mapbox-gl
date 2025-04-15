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
import type { VectorSourceSpecification, VectorTileSource } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-vector-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VectorSourceComponent implements OnInit, OnDestroy, OnChanges {
  private mapService = inject(MapService);

  /* Init inputs */
  id = input.required<string>();

  /* Dynamic inputs */
  url = input<VectorSourceSpecification['url']>();
  tiles = input<VectorSourceSpecification['tiles']>();
  bounds = input<VectorSourceSpecification['bounds']>();
  scheme = input<VectorSourceSpecification['scheme']>();
  minzoom = input<VectorSourceSpecification['minzoom']>();
  maxzoom = input<VectorSourceSpecification['maxzoom']>();
  attribution = input<VectorSourceSpecification['attribution']>();
  promoteId = input<VectorSourceSpecification['promoteId']>();
  volatile = input<VectorSourceSpecification['volatile']>();

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
      (changes['bounds'] && !changes['bounds'].isFirstChange()) ||
      (changes['scheme'] && !changes['scheme'].isFirstChange()) ||
      (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
      (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
      (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
      (changes['promoteId'] && !changes['promoteId'].isFirstChange()) ||
      (changes['volatile'] && !changes['volatile'].isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (
      (changes['url'] && !changes['url'].isFirstChange()) ||
      (changes['tiles'] && !changes['tiles'].isFirstChange())
    ) {
      const source = this.mapService.getSource<VectorTileSource>(this.id());
      if (source === undefined) {
        return;
      }
      if (changes['url'] && this.url()) {
        source.setUrl(this.url()!);
      }

      if (changes['tiles'] && this.tiles()) {
        source.setTiles(this.tiles()!);
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id());
      this.sourceAdded = false;
    }
  }

  reload() {
    this.mapService.getSource<VectorTileSource>(this.id())?.reload();
  }

  private init() {
    const source: VectorSourceSpecification = {
      type: 'vector',
      url: this.url(),
      tiles: this.tiles(),
      bounds: this.bounds(),
      scheme: this.scheme(),
      minzoom: this.minzoom(),
      maxzoom: this.maxzoom(),
      attribution: this.attribution(),
      promoteId: this.promoteId(),
      volatile: this.volatile(),
    };
    this.mapService.addSource(this.id(), source);
    this.sourceAdded = true;
  }
}
