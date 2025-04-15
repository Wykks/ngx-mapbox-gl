import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import type { RasterDEMSourceSpecification } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-raster-dem-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RasterDemSourceComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    Omit<RasterDEMSourceSpecification, 'type'>
{
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url?: RasterDEMSourceSpecification['url'];
  @Input() tiles?: RasterDEMSourceSpecification['tiles'];
  @Input() bounds?: RasterDEMSourceSpecification['bounds'];
  @Input() minzoom?: RasterDEMSourceSpecification['minzoom'];
  @Input() maxzoom?: RasterDEMSourceSpecification['maxzoom'];
  @Input() tileSize?: RasterDEMSourceSpecification['tileSize'];
  @Input() attribution?: RasterDEMSourceSpecification['attribution'];
  @Input() encoding?: RasterDEMSourceSpecification['encoding'];
  @Input() volatile?: RasterDEMSourceSpecification['volatile'];

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
      volatile: this.volatile,
    };
    this.mapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
