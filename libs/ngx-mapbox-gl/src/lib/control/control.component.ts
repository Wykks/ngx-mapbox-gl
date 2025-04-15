import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { IControl, type ControlPosition } from 'mapbox-gl';
import { MapService } from '../map/map.service';

export class CustomControl implements IControl {
  constructor(private container: HTMLElement) {}

  onAdd() {
    return this.container;
  }

  onRemove() {
    return this.container.parentNode!.removeChild(this.container);
  }

  getDefaultPosition(): ControlPosition {
    return 'top-right';
  }
}

@Component({
  selector: 'mgl-control',
  template: `
    <div class="mapboxgl-ctrl" #content>
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent<T extends IControl>
  implements OnDestroy, AfterContentInit
{
  private mapService = inject(MapService);

  /* Init inputs */
  position = input<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>();

  @ViewChild('content', { static: true }) content: ElementRef;

  control: T | CustomControl;

  private controlAdded = false;

  ngAfterContentInit() {
    if (this.content.nativeElement.childNodes.length) {
      this.control = new CustomControl(this.content.nativeElement);
      this.mapService.mapCreated$.subscribe(() => {
        this.mapService.addControl(this.control!, this.position());
        this.controlAdded = true;
      });
    }
  }

  ngOnDestroy() {
    if (this.controlAdded) {
      this.mapService.removeControl(this.control);
    }
  }
}
