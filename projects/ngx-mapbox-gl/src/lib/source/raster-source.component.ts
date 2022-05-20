import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RasterSource } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-raster-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RasterSourceComponent
  implements OnInit, OnDestroy, OnChanges, RasterSource {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url?: RasterSource['url'];
  @Input() tiles?: RasterSource['tiles'];
  @Input() bounds?: RasterSource['bounds'];
  @Input() minzoom?: RasterSource['minzoom'];
  @Input() maxzoom?: RasterSource['maxzoom'];
  @Input() tileSize?: RasterSource['tileSize'];
  @Input() scheme?: RasterSource['scheme'];
  @Input() attribution?: RasterSource['attribution'];

  type: RasterSource['type'] = 'raster';

  private sourceAdded = false;
  private sub = new Subscription();

  constructor(private mapService: MapService) {}

  ngOnInit() {
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance as any, 'styledata')
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
      (changes.url && !changes.url.isFirstChange()) ||
      (changes.tiles && !changes.tiles.isFirstChange()) ||
      (changes.bounds && !changes.bounds.isFirstChange()) ||
      (changes.minzoom && !changes.minzoom.isFirstChange()) ||
      (changes.maxzoom && !changes.maxzoom.isFirstChange()) ||
      (changes.tileSize && !changes.tileSize.isFirstChange()) ||
      (changes.scheme && !changes.scheme.isFirstChange()) ||
      (changes.attribution && !changes.attribution.isFirstChange())
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
    const source: RasterSource = {
      type: this.type,
      url: this.url,
      tiles: this.tiles,
      bounds: this.bounds,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
      tileSize: this.tileSize,
      scheme: this.scheme,
      attribution: this.attribution,
    };
    this.mapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
