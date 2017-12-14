import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ImageSourceOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-image-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSourceComponent implements OnInit, OnDestroy, OnChanges, ImageSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url: string;
  @Input() coordinates: number[][];

  private sourceAdded = false;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(() => {
      this.MapService.addSource(this.id, {
        type: 'image',
        url: this.url,
        coordinates: this.coordinates
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
      changes.coordinates && !changes.coordinates.isFirstChange()
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
