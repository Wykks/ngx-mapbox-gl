import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import type { Map } from 'mapbox-gl';

@Component({
  selector: 'mgl-image',
  template: '',
})
export class ImageComponent implements OnInit, OnDestroy, OnChanges {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() data?: Parameters<Map['addImage']>[1];
  @Input() options?: Parameters<Map['addImage']>[2];
  @Input() url?: string;

  @Output() imageError = new EventEmitter<Error>();
  @Output() imageLoaded = new EventEmitter<void>();

  private isAdded = false;
  private isAdding = false;
  private sub: Subscription;

  constructor(
    private mapService: MapService,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    this.sub = this.mapService.mapLoaded$
      .pipe(
        switchMap(() =>
          fromEvent(this.mapService.mapInstance, 'styledata').pipe(
            startWith(undefined),
            filter(
              () =>
                !this.isAdding &&
                !this.mapService.mapInstance.hasImage(this.id),
            ),
          ),
        ),
      )
      .subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['data'] && !changes['data'].isFirstChange()) ||
      (changes['options'] && !changes['options'].isFirstChange()) ||
      (changes['url'] && !changes['url'].isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    if (this.isAdded) {
      this.mapService.removeImage(this.id);
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private async init() {
    this.isAdding = true;
    if (this.data) {
      this.mapService.addImage(this.id, this.data, this.options);
      this.isAdded = true;
      this.isAdding = false;
    } else if (this.url) {
      try {
        await this.mapService.loadAndAddImage(this.id, this.url, this.options);
        this.isAdded = true;
        this.isAdding = false;
        this.zone.run(() => {
          this.imageLoaded.emit();
        });
      } catch (error) {
        this.zone.run(() => {
          this.imageError.emit(error as Error);
        });
      }
    }
  }
}
