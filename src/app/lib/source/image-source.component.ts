import { ImageSourceOptions } from 'mapbox-gl';
import { Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.addSource(this.id, {
      type: 'image',
      url: this.url,
      coordinates: this.coordinates
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.url && !changes.url.isFirstChange() ||
      changes.coordinates && !changes.coordinates.isFirstChange()
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.MapService.removeSource(this.id);
  }
}
