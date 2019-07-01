import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ImageSourceOptions, ImageSource } from 'mapbox-gl';
import { Subscription } from 'rxjs';
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

  private sub: Subscription;
  private sourceId?: string;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.sub = this.MapService.mapLoaded$
      .subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sourceId === undefined) {
      return;
    }

    const source = this.MapService.getSource<ImageSource>(this.sourceId);
    // TODO: we need this cast until mapbox typings are fixed (https://github.com/DefinitelyTyped/DefinitelyTyped/pull/36589).
    (source as any).updateImage({
      url: changes.url === undefined ? undefined : this.url,
      coordinates: changes.coordinates === undefined ? undefined : this.coordinates
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
    this.MapService.addSource(this.id, {
      type: 'image',
      url: this.url,
      coordinates: this.coordinates
    });
    this.sourceId = this.id;
  }
}
