import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import { RasterDEMSource, RasterDEMSourceOptions } from '../map/map.types';
import { RasterDEMSourceSpecification } from 'mapbox-gl';

@Component({
  selector: 'mgl-raster-dem-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RasterDemSourceComponent
  implements OnInit, OnDestroy, OnChanges, RasterDEMSource {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url?: RasterDEMSourceOptions['url'];
  @Input() tiles?: RasterDEMSourceOptions['tiles'];
  @Input() bounds?: RasterDEMSourceOptions['bounds'];
  @Input() minzoom?: RasterDEMSourceOptions['minzoom'];
  @Input() maxzoom?: RasterDEMSourceOptions['maxzoom'];
  @Input() tileSize?: RasterDEMSourceOptions['tileSize'];
  @Input() attribution?: RasterDEMSourceOptions['attribution'];
  @Input() encoding?: RasterDEMSourceOptions['encoding'];

  readonly type: RasterDEMSource['type'] = 'raster-dem';

  private sourceAdded = false;
  private sub = new Subscription();

  constructor(private mapService: MapService) { }

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
      (changes['url'] && !changes['url'].isFirstChange()) ||
      (changes['tiles'] && !changes['tiles'].isFirstChange()) ||
      (changes['bounds'] && !changes['bounds'].isFirstChange()) ||
      (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
      (changes['maxzoom'] && !changes['maxzoom'].isFirstChange()) ||
      (changes['tileSize'] && !changes['tileSize'].isFirstChange()) ||
      (changes['attribution'] && !changes['attribution'].isFirstChange()) ||
      (changes['encoding'] && !changes['encoding'].isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();

    if (this.sourceAdded) {
      this.mapService.removeSource(this.id);
      this.sourceAdded = false;
    }
  }

  private init() {
    const source: RasterDEMSourceSpecification = {
      type: 'raster-dem',
      url: this.url,
      tiles: this.tiles,
      bounds: this.bounds,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
      tileSize: this.tileSize,
      attribution: this.attribution,
      encoding: this.encoding,
    };

    this.mapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
