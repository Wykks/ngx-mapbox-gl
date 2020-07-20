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
import { MapImageData, MapImageOptions } from '../map/map.types';

@Component({
  selector: 'mgl-image',
  template: '',
})
export class ImageComponent implements OnInit, OnDestroy, OnChanges {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() data?: MapImageData;
  @Input() options?: MapImageOptions;
  @Input() url?: string;

  @Output() error = new EventEmitter<{ status: number }>();
  @Output() loaded = new EventEmitter<void>();

  private isAdded = false;
  private isAdding = false;
  private sub: Subscription;

  constructor(private MapService: MapService, private zone: NgZone) {}

  ngOnInit() {
    this.sub = this.MapService.mapLoaded$
      .pipe(
        switchMap(() =>
          fromEvent(<any>this.MapService.mapInstance, 'styledata').pipe(
            startWith(undefined),
            filter(() => !this.isAdding && !this.MapService.mapInstance.hasImage(this.id))
          )
        )
      )
      .subscribe(() => this.init());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.data && !changes.data.isFirstChange()) ||
      (changes.options && !changes.options.isFirstChange()) ||
      (changes.url && !changes.url.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    if (this.isAdded) {
      this.MapService.removeImage(this.id);
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private async init() {
    this.isAdding = true;
    if (this.data) {
      this.MapService.addImage(this.id, this.data, this.options);
      this.isAdded = true;
      this.isAdding = false;
    } else if (this.url) {
      try {
        await this.MapService.loadAndAddImage(this.id, this.url, this.options);
        this.isAdded = true;
        this.isAdding = false;
        this.zone.run(() => {
          this.loaded.emit();
        });
      } catch (error) {
        this.zone.run(() => {
          this.error.emit(error);
        });
      }
    }
  }
}
