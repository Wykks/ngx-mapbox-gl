import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import type { ImageSource, ImageSourceSpecification } from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { MapService } from '../map/map.service';
import type { InputSignal } from '@angular/core';

type ImageSourceInputs = {
  [K in keyof Omit<ImageSourceSpecification, 'type'>]: InputSignal<
    Omit<ImageSourceSpecification, 'type'>[K]
  >;
};

@Component({
  selector: 'mgl-image-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSourceComponent
  implements OnInit, OnDestroy, OnChanges, ImageSourceInputs
{
  private mapService = inject(MapService);
  /* Init inputs */
  id = input.required<string>();

  /* Dynamic inputs */
  url = input<string>();
  coordinates = input.required<ImageSourceSpecification['coordinates']>();

  private sub: Subscription;
  private sourceId?: string;

  ngOnInit() {
    this.sub = this.mapService.mapLoaded$.subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sourceId === undefined) {
      return;
    }
    const source = this.mapService.getSource<ImageSource>(this.sourceId);
    if (source === undefined) {
      return;
    }
    source.updateImage({
      url: this.url()!,
      coordinates:
        changes['coordinates'] === undefined ? undefined : this.coordinates(),
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }

    if (this.sourceId !== undefined) {
      this.mapService.removeSource(this.sourceId);
      this.sourceId = undefined;
    }
  }

  private init() {
    const imageSource: ImageSourceSpecification = {
      type: 'image',
      url: this.url(),
      coordinates: this.coordinates(),
    };
    this.mapService.addSource(this.id(), imageSource);
    this.sourceId = this.id();
  }
}
