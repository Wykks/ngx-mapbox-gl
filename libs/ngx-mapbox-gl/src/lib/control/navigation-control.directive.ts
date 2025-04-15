import { AfterContentInit, Directive, inject, input } from '@angular/core';
import { NavigationControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglNavigation]',
})
export class NavigationControlDirective implements AfterContentInit {
  private mapService = inject(MapService);
  private controlComponent = inject<ControlComponent<NavigationControl>>(
    ControlComponent<NavigationControl>,
    { host: true },
  );

  /* Init inputs */
  showCompass = input<boolean>();
  showZoom = input<boolean>();

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: { showCompass?: boolean; showZoom?: boolean } = {};
      const showCompass = this.showCompass();
      const showZoom = this.showZoom();
      if (showCompass !== undefined) {
        options.showCompass = showCompass;
      }
      if (showZoom !== undefined) {
        options.showZoom = showZoom;
      }
      this.controlComponent.control = new NavigationControl(options);
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position(),
      );
    });
  }
}
