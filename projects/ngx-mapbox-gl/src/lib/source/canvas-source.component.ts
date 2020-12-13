import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CanvasSource, CanvasSourceOptions, CanvasSourceRaw } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-canvas-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasSourceComponent
  implements OnInit, OnDestroy, OnChanges, CanvasSourceOptions {
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() coordinates: CanvasSourceOptions['coordinates'];
  @Input() canvas: CanvasSourceOptions['canvas'];
  @Input() animate?: CanvasSourceOptions['animate'];

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
    if (
      (changes.canvas && !changes.canvas.isFirstChange()) ||
      (changes.animate && !changes.animate.isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (changes.coordinates && !changes.coordinates.isFirstChange()) {
      const source = this.MapService.getSource<CanvasSource>(this.id);
      source.setCoordinates(this.coordinates);
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
    const source: CanvasSourceRaw = {
      type: 'canvas',
      coordinates: this.coordinates,
      canvas: this.canvas,
      animate: this.animate,
    };
    this.MapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
