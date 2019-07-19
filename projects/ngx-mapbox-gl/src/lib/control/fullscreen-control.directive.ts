import { AfterContentInit, Directive, Host, Input } from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglFullscreen]'
})
export class FullscreenControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() container?: HTMLElement;

  constructor(
    private MapService: MapService,
    @Host() private ControlComponent: ControlComponent
  ) { }

  ngAfterContentInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: { container?: HTMLElement } = {};
      if (this.container !== undefined) {
        options.container = this.container;
      }
      // @ts-ignore
      this.ControlComponent.control = new FullscreenControl(options); // @types/mapbox-gl update needed
      this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
    });
  }
}
