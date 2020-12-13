import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { IControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';

export class CustomControl implements IControl {
  constructor(private container: HTMLElement) {}

  onAdd() {
    return this.container;
  }

  onRemove() {
    return this.container.parentNode!.removeChild(this.container);
  }

  getDefaultPosition() {
    return 'top-right';
  }
}

@Component({
  selector: 'mgl-control',
  template:
    '<div class="mapboxgl-ctrl" #content><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent<T extends IControl>
  implements OnDestroy, AfterContentInit {
  private controlAdded = false;

  /* Init inputs */
  @Input() position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  @ViewChild('content', { static: true }) content: ElementRef;

  control: T | CustomControl;

  constructor(private MapService: MapService) {}

  ngAfterContentInit() {
    if (this.content.nativeElement.childNodes.length) {
      this.control = new CustomControl(this.content.nativeElement);
      this.MapService.mapCreated$.subscribe(() => {
        this.MapService.addControl(this.control!, this.position);
        this.controlAdded = true;
      });
    }
  }

  ngOnDestroy() {
    if (this.controlAdded) {
      this.MapService.removeControl(this.control);
    }
  }
}
