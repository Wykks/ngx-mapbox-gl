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

  constructor(
    private mapService: MapService,
    @Host() private controlComponent: ControlComponent<NavigationControl>
  ) {}

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: { showCompass?: boolean; showZoom?: boolean } = {};
      if (this.showCompass !== undefined) {
        options.showCompass = this.showCompass;
      }
      if (this.showZoom !== undefined) {
        options.showZoom = this.showZoom;
      }
      this.controlComponent.control = new NavigationControl(options);
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position
      );
    });
  }
}
