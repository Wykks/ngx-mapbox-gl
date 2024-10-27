import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CanvasSource } from 'mapbox-gl';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';

// TODO: Remove Add CanvasSourceSpecification from mapbox-gl after release 3.8
type CanvasSourceSpecification = {
  ["type"]: "canvas";
  ["coordinates"]: [
    [
      number,
      number
    ],
    [
      number,
      number
    ],
    [
      number,
      number
    ],
    [
      number,
      number
    ]
  ];
  ["animate"]?: boolean;
  ["canvas"]: string | HTMLCanvasElement;
}

@Component({
  selector: 'mgl-canvas-source',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasSourceComponent
  implements OnInit, OnDestroy, OnChanges, CanvasSourceSpecification
{
  /* Init inputs */
  @Input() id: string;

  /* Dynamic inputs */
  @Input() coordinates: CanvasSourceSpecification['coordinates'];
  @Input() canvas: CanvasSourceSpecification['canvas'];
  @Input() animate?: CanvasSourceSpecification['animate'];

  type: CanvasSourceSpecification['type'] = 'canvas';

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
    const source: CanvasSourceSpecification = {
      type: 'canvas',
      coordinates: this.coordinates,
      canvas: this.canvas,
      animate: this.animate,
    };
    // @ts-ignore TODO: Remove after release 3.8
    this.mapService.addSource(this.id, source);
    this.sourceAdded = true;
  }
}
