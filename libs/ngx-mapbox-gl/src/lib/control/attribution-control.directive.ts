import { AfterContentInit, Directive, inject, input } from '@angular/core';
import { AttributionControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglAttribution]',
})
export class AttributionControlDirective implements AfterContentInit {
  private mapService = inject(MapService);
  private controlComponent = inject<ControlComponent<AttributionControl>>(
    ControlComponent<AttributionControl>,
    { host: true },
  );

  /* Init inputs */
  compact = input<boolean>();
  customAttribution = input<string | string[]>();

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: {
        compact?: boolean;
        customAttribution?: string | string[];
      } = {};
      const compact = this.compact();
      const customAttribution = this.customAttribution();
      if (compact !== undefined) {
        options.compact = compact;
      }
      if (customAttribution !== undefined) {
        options.customAttribution = customAttribution;
      }
      this.controlComponent.control = new AttributionControl(options);
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position(),
      );
    });
  }
}
