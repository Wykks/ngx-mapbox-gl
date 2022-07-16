import {
  AfterContentInit,
  Directive,
  Host,
  HostListener,
  Input,
} from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglFullscreen]',
})
export class FullscreenControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() container?: HTMLElement;

  constructor(
    private mapService: MapService,
    @Host() private controlComponent: ControlComponent<FullscreenControl>
  ) {}

  @HostListener('window:webkitfullscreenchange', ['$event.target'])
  onFullscreen() {
    this.mapService.mapInstance.resize();
  }

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      this.controlComponent.control = new FullscreenControl({
        container: this.container,
      });
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position
      );
    });
  }
}
