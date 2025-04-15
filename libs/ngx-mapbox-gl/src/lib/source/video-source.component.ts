import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  type InputSignal,
} from '@angular/core';
import type { VideoSource, VideoSourceSpecification } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

type VideoSourceInputs = {
  [K in keyof Omit<VideoSourceSpecification, 'type'>]: InputSignal<
    Omit<VideoSourceSpecification, 'type'>[K]
  >;
};

@Component({
  selector: 'mgl-video-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoSourceComponent
  implements OnInit, OnDestroy, OnChanges, VideoSourceInputs
{
  private mapService = inject(MapService);

  /* Init inputs */
  id = input.required<string>();

  /* Dynamic inputs */
  urls = input.required<VideoSourceSpecification['urls']>();
  coordinates = input.required<VideoSourceSpecification['coordinates']>();

  private sourceAdded = false;
  private sub = new Subscription();

  ngOnInit() {
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance, 'styledata')
        .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id())))
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

    if (changes['urls'] && !changes['urls'].isFirstChange()) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (
      changes['coordinates'] &&
      !changes['coordinates'].isFirstChange()
    ) {
      const source = this.mapService.getSource<VideoSource>(this.id());
      if (source === undefined) {
        return;
      }
      source.setCoordinates(this.coordinates()!);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id());
      this.sourceAdded = false;
    }
  }

  pause() {
    this.mapService.getSource<VideoSource>(this.id())?.pause();
  }

  play() {
    this.mapService.getSource<VideoSource>(this.id())?.play();
  }

  getVideo() {
    return this.mapService.getSource<VideoSource>(this.id())?.getVideo();
  }

  private init() {
    const source: VideoSourceSpecification = {
      type: 'video',
      urls: this.urls(),
      coordinates: this.coordinates(),
    };
    this.mapService.addSource(this.id(), source);
    this.sourceAdded = true;
  }
}
