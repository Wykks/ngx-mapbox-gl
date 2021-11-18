import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Source, VideoSourceSpecification } from 'maplibre-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-video-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoSourceComponent
  implements OnInit, OnDestroy, OnChanges, VideoSourceSpecification {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() urls: VideoSourceSpecification['urls'];
  @Input() coordinates: VideoSourceSpecification['coordinates'];

  type: VideoSourceSpecification['type'] = 'video';

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

    if (changes.urls && !changes.urls.isFirstChange()) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.MapService.getSource<
        Source & { setCoordinates: Function }
      >(this.id);
      if (source === undefined) {
        return;
      }
      source.setCoordinates(this.coordinates!);
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
    const source: VideoSourceSpecification = {
      type: 'video',
      urls: this.urls,
      coordinates: this.coordinates,
    };
    this.MapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
