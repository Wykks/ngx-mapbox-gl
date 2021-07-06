import {
  AfterContentInit,
  Directive,
  Host,
  HostListener,
  Input,
} from '@angular/core';
import { FullscreenControl } from 'maplibre-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglFullscreen]',
})
export class FullscreenControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() container?: HTMLElement;
  @HostListener('window:webkitfullscreenchange', ['$event.target'])
  onFullscreen() {
    this.MapService.mapInstance.resize();
  }

  constructor(
    private MapService: MapService,
    @Host() private ControlComponent: ControlComponent<FullscreenControl>
  ) {}

  ngAfterContentInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      this.ControlComponent.control = new FullscreenControl({
        container: this.container,
      });
      this.MapService.addControl(
        this.ControlComponent.control,
        this.ControlComponent.position
      );
    });
  }
}
