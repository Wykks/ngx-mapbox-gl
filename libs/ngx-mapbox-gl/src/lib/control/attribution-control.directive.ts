import { AfterContentInit, Directive, Host, Input } from '@angular/core';
import { AttributionControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglAttribution]',
})
export class AttributionControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() compact?: boolean;
  @Input() customAttribution?: string | string[];

  constructor(
    private mapService: MapService,
    @Host() private controlComponent: ControlComponent<AttributionControl>
  ) {}

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: {
        compact?: boolean;
        customAttribution?: string | string[];
      } = {};
      if (this.compact !== undefined) {
        options.compact = this.compact;
      }
      if (this.customAttribution !== undefined) {
        options.customAttribution = this.customAttribution;
      }
      this.controlComponent.control = new AttributionControl(options);
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position
      );
    });
  }
}
