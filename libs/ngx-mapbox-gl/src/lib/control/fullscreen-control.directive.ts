import {
  AfterContentInit,
  Directive,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglFullscreen]',
})
export class FullscreenControlDirective implements AfterContentInit {
  private mapService = inject(MapService);
  private controlComponent = inject<ControlComponent<FullscreenControl>>(
    ControlComponent<FullscreenControl>,
    { host: true },
  );

  /* Init inputs */
  container = input<HTMLElement>();

  @HostListener('window:webkitfullscreenchange', ['$event.target'])
  onFullscreen(target: EventTarget | null) {
    if (target) {
      this.mapService.mapInstance.resize();
    }
  }

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      this.controlComponent.control = new FullscreenControl({
        container: this.container(),
      });
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position(),
      );
    });
  }
}
