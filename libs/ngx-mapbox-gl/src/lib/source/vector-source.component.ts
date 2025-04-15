import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
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
export class VectorSourceComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    Omit<VectorSourceSpecification, 'type'>
{
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url?: VectorSourceSpecification['url'];
  @Input() tiles?: VectorSourceSpecification['tiles'];
  @Input() bounds?: VectorSourceSpecification['bounds'];
  @Input() scheme?: VectorSourceSpecification['scheme'];
  @Input() minzoom?: VectorSourceSpecification['minzoom'];
  @Input() maxzoom?: VectorSourceSpecification['maxzoom'];
  @Input() attribution?: VectorSourceSpecification['attribution'];
  @Input() promoteId?: VectorSourceSpecification['promoteId'];
  @Input() volatile?: VectorSourceSpecification['volatile'];

  private sourceAdded = false;
  private sub = new Subscription();

  constructor(private mapService: MapService) {}

  [x: string]: unknown;

  ngOnInit() {
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
      const source = this.mapService.getSource<VectorTileSource>(this.id);
      if (source === undefined) {
        return;
      }
      if (changes['url'] && this.url) {
        source.setUrl(this.url);
      }

      if (changes['tiles'] && this.tiles) {
        source.setTiles(this.tiles);
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id);
      this.sourceAdded = false;
    }
  }

  reload() {
    this.mapService.getSource<VectorTileSource>(this.id)?.reload();
  }

  private init() {
    const source: VectorSourceSpecification = {
      type: 'vector',
      url: this.url,
      tiles: this.tiles,
      bounds: this.bounds,
      scheme: this.scheme,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
      attribution: this.attribution,
      promoteId: this.promoteId,
      volatile: this.volatile,
    };
    this.mapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
