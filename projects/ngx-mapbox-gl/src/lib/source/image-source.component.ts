import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ImageSource, ImageSourceOptions, ImageSourceRaw } from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-image-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSourceComponent implements OnInit, OnDestroy, OnChanges, ImageSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() url: string;
  @Input() coordinates: number[][];

  private sub: Subscription;
  private sourceId?: string;

  constructor(private MapService: MapService) {}

  ngOnInit() {
    this.sub = this.MapService.mapLoaded$.subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sourceId === undefined) {
      return;
    }

    const source = this.MapService.getSource<ImageSource>(this.sourceId);
    source.updateImage({
      url: changes.url === undefined ? undefined : this.url,
      coordinates: changes.coordinates === undefined ? undefined : this.coordinates,
    });
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }

    if (this.sourceId !== undefined) {
      this.MapService.removeSource(this.sourceId);
    }
  }

  private init() {
    const imageSource: ImageSourceRaw = {
      type: 'image',
      url: this.url,
      coordinates: this.coordinates,
    };
    this.MapService.addSource(this.id, imageSource);
    this.sourceId = this.id;
  }
}
