import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RasterSource } from 'mapbox-gl';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-raster-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RasterSourceComponent implements OnInit, OnDestroy, OnChanges, RasterSource {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url: string;
  @Input() tiles?: string[];
  @Input() bounds?: number[];
  @Input() minzoom?: number;
  @Input() maxzoom?: number;
  @Input() tileSize?: number;

  type: 'raster' = 'raster'; // Just to make ts happy

  private sourceAdded = false;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(() => {
      const source = {
        type: this.type,
        url: this.url,
        tiles: this.tiles,
        bounds: this.bounds,
        minzoom: this.minzoom,
        maxzoom: this.maxzoom,
        tileSize: this.tileSize
      };
      this.MapService.addSource(this.id, source);
      this.sourceAdded = true;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded) {
      return;
    }
    if (
      changes.url && !changes.url.isFirstChange() ||
      changes.tiles && !changes.tiles.isFirstChange() ||
      changes.bounds && !changes.bounds.isFirstChange() ||
      changes.minzoom && !changes.minzoom.isFirstChange() ||
      changes.maxzoom && !changes.maxzoom.isFirstChange() ||
      changes.tileSize && !changes.tileSize.isFirstChange()
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    if (this.sourceAdded) {
      this.MapService.removeSource(this.id);
    }
  }
}
