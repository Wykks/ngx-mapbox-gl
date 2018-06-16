import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { VectorSource } from 'mapbox-gl';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-vector-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VectorSourceComponent implements OnInit, OnDestroy, OnChanges, VectorSource {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url?: string;
  @Input() tiles?: string[];
  @Input() minzoom?: number;
  @Input() maxzoom?: number;

  type: 'vector' = 'vector'; // Just to make ts happy

  private sourceAdded = false;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(() => {
      this.MapService.addSource(this.id, {
        type: this.type,
        url: this.url,
        tiles: this.tiles,
        minzoom: this.minzoom,
        maxzoom: this.maxzoom,
      });
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
      changes.minzoom && !changes.minzoom.isFirstChange() ||
      changes.maxzoom && !changes.maxzoom.isFirstChange()
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
