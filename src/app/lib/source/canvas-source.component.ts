import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CanvasSourceOptions } from 'mapbox-gl';
import 'rxjs/add/operator/switchMap';
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
  @Input() contextType: '2d' | 'webgl' | 'experimental-webgl' | 'webgl2';
  @Input() animate?: boolean;

  private sourceAdded = false;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    this.MapService.mapCreated$.switchMap(() => this.MapService.mapEvents.load).first().subscribe(() => {
      const source = {
        type: 'canvas',
        coordinates: this.coordinates,
        canvas: this.canvas,
        animate: this.animate,
        contextType: this.contextType
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
    this.MapService.removeSource(this.id);
  }
}
