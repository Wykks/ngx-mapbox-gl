import { VideoSourceOptions } from 'mapbox-gl';
import { Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-video-source',
  template: ''
})
export class VideoSourceComponent implements OnInit, OnDestroy, OnChanges, VideoSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() urls: string[];
  @Input() coordinates: number[][];

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.addSource(this.id, {
      type: 'video',
      urls: this.urls,
      coordinates: this.coordinates
    });
  }

  ngOnChanges(changes: SimpleChanges) {
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
