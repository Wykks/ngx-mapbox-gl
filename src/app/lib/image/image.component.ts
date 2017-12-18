import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { MapService } from '../map/map.service';
import { MapImageData, MapImageOptions } from '../map/map.types';

@Component({
  selector: 'mgl-image',
  template: ''
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

  private imageAdded = false;

  constructor(
    private MapService: MapService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(async () => {
      if (this.data) {
        this.MapService.addImage(
          this.id,
          this.data,
          this.options
        );
        this.imageAdded = true;
      } else if (this.url) {
        try {
          await this.MapService.loadAndAddImage(
            this.id,
            this.url,
            this.options
          );
          this.imageAdded = true;
          this.zone.run(() => {
            this.loaded.emit();
          });
        } catch (error) {
          this.zone.run(() => {
            this.error.emit(error);
          });
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data && !changes.data.isFirstChange() ||
      changes.options && !changes.options.isFirstChange() ||
      changes.url && !changes.url.isFirstChange()
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    if (this.imageAdded) {
      this.MapService.removeImage(this.id);
    }
  }
}
