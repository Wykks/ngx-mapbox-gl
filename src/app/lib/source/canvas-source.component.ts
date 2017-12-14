import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CanvasSourceOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-canvas-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasSourceComponent implements OnInit, OnDestroy, OnChanges, CanvasSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() coordinates: number[][];
  @Input() canvas: string;
  @Input() animate?: boolean;

  private sourceAdded = false;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapLoaded$.subscribe(() => {
      const source = {
        type: 'canvas',
        coordinates: this.coordinates,
        canvas: this.canvas,
        animate: this.animate,
      };
      this.MapService.addSource(this.id, source);
      this.sourceAdded = true;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceAdded) {
      return;
    }
    if (
      changes.coordinates && !changes.coordinates.isFirstChange() ||
      changes.canvas && !changes.canvas.isFirstChange() ||
      changes.animate && !changes.animate.isFirstChange()
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    if (this.sourceAdded) {
      this.MapService.removeSource(this.id);
    }
  }
}
