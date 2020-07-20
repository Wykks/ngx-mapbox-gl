import { AfterContentInit, Directive, Host, Input } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglNavigation]',
})
export class NavigationControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() showCompass?: boolean;
  @Input() showZoom?: boolean;

  constructor(private MapService: MapService, @Host() private ControlComponent: ControlComponent) {}

  ngAfterContentInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: { showCompass?: boolean; showZoom?: boolean } = {};
      if (this.showCompass !== undefined) {
        options.showCompass = this.showCompass;
      }
      if (this.showZoom !== undefined) {
        options.showZoom = this.showZoom;
      }
      this.ControlComponent.control = new NavigationControl(options);
      this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
    });
  }
}
