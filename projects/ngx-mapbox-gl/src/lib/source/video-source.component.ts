import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { VideoSourceOptions } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  type: 'video' = 'video'; // Just to make ts happy
  private sourceAdded = false;
  private sub = new Subscription();

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(<any>this.MapService.mapInstance, 'styledata').pipe(
        filter(() => !this.MapService.mapInstance.getSource(this.id))
      ).subscribe(() => {
        this.init();
      });
      this.sub.add(sub);
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
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.MapService.removeSource(this.id);
    }
  }

  private init() {
    const source = { 
      type: this.type,
      urls: this.urls,
      coordinates: this.coordinates
    }
    this.MapService.addSource(this.id,source);
    this.sourceAdded = true;
  }
}
