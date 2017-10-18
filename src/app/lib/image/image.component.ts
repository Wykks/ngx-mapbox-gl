import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MapService } from '../map/map.service';
import { MapImageOptions, MapImageData } from '../map/map.types';

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

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.data) {
        this.MapService.addImage(
          this.id,
          this.data,
          this.options
        );
      } else if (this.url) {
        this.MapService.loadAndAddImage(
          this.id,
          this.url,
          this.options
        ).catch((error) => {
          this.error.emit(error);
        });
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
    this.MapService.removeImage(this.id);
  }
}
