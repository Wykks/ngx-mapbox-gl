import { VideoSourceOptions } from 'mapbox-gl';
import { Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-video-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoSourceComponent implements OnInit, OnDestroy, OnChanges, VideoSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() urls: string[];
  @Input() coordinates: number[][];

  private sourceAdded = false;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(() => {
      this.MapService.addSource(this.id, {
        type: 'video',
        urls: this.urls,
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
      changes.urls && !changes.urls.isFirstChange() ||
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
