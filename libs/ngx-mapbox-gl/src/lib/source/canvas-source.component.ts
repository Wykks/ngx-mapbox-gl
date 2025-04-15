import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
import type { CanvasSource } from 'mapbox-gl';

type CanvasSourceSpecification = CanvasSource['options'];

@Component({
  selector: 'mgl-canvas-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasSourceComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    Omit<CanvasSourceSpecification, 'type'>
{
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() coordinates: CanvasSource['options']['coordinates'];
  @Input() canvas: CanvasSource['options']['canvas'];
  @Input() animate?: CanvasSource['options']['animate'];

  private sourceAdded = false;
  private sub = new Subscription();

  constructor(private mapService: MapService) {}

  ngOnInit() {
    const sub1 = this.mapService.mapLoaded$.subscribe(() => {
      this.init();
      const sub = fromEvent(this.mapService.mapInstance, 'styledata')
        .pipe(filter(() => !this.mapService.mapInstance.getSource(this.id)))
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
      (changes['canvas'] && !changes['canvas'].isFirstChange()) ||
      (changes['animate'] && !changes['animate'].isFirstChange())
    ) {
      this.ngOnDestroy();
      this.ngOnInit();
    } else if (
      changes['coordinates'] &&
      !changes['coordinates'].isFirstChange()
    ) {
      const source = this.mapService.getSource<CanvasSource>(this.id);
      if (source === undefined) {
        return;
      }
      source.setCoordinates(this.coordinates);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.sourceAdded) {
      this.mapService.removeSource(this.id);
      this.sourceAdded = false;
    }
  }

  private init() {
    const source: CanvasSource['options'] = {
      type: 'canvas',
      coordinates: this.coordinates,
      canvas: this.canvas,
      animate: this.animate,
    };
    this.mapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
