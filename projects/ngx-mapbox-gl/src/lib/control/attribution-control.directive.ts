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

  constructor(private MapService: MapService, @Host() private ControlComponent: ControlComponent) {}

  ngAfterContentInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: { compact?: boolean; customAttribution?: string | string[] } = {};
      if (this.compact !== undefined) {
        options.compact = this.compact;
      }
      if (this.customAttribution !== undefined) {
        options.customAttribution = this.customAttribution;
      }
      this.ControlComponent.control = new AttributionControl(options);
      this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
    });
  }
}
