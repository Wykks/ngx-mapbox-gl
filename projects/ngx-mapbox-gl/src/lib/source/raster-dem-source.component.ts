import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RasterDemSource } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-raster-dem-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RasterDemSourceComponent
  implements OnInit, OnDestroy, OnChanges, RasterDemSource {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url?: RasterDemSource['url'];
  @Input() tiles?: RasterDemSource['tiles'];
  @Input() bounds?: RasterDemSource['bounds'];
  @Input() minzoom?: RasterDemSource['minzoom'];
  @Input() maxzoom?: RasterDemSource['maxzoom'];
  @Input() tileSize?: RasterDemSource['tileSize'];
  @Input() attribution?: RasterDemSource['attribution'];
  @Input() encoding?: RasterDemSource['encoding'];

  type: RasterDemSource['type'] = 'raster-dem';

  private sourceAdded = false;
  private sub = new Subscription();

  constructor(private MapService: MapService) {}

  ngOnInit() {
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
      (changes.url && !changes.url.isFirstChange()) ||
      (changes.tiles && !changes.tiles.isFirstChange()) ||
      (changes.bounds && !changes.bounds.isFirstChange()) ||
      (changes.minzoom && !changes.minzoom.isFirstChange()) ||
      (changes.maxzoom && !changes.maxzoom.isFirstChange()) ||
      (changes.tileSize && !changes.tileSize.isFirstChange()) ||
      (changes.attribution && !changes.attribution.isFirstChange()) ||
      (changes.encoding && !changes.encoding.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.MapService.removeSource(this.id);
      this.sourceAdded = false;
    }
  }

  private init() {
    const source: RasterDemSource = {
      type: this.type,
      url: this.url,
      tiles: this.tiles,
      bounds: this.bounds,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
      tileSize: this.tileSize,
      attribution: this.attribution,
      encoding: this.encoding,
    };
    this.MapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
