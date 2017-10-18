import { Directive, Host, Input, OnInit } from '@angular/core';
import { AttributionControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglAttribution]'
})
export class AttributionControlDirective implements OnInit {
  /* Init inputs */
  @Input() compact?: boolean;

  constructor(
    private MapService: MapService,
    @Host() private ControlComponent: ControlComponent
  ) { }

  ngOnInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: { compact?: boolean } = {};
      if (this.compact !== undefined) {
        options.compact = this.compact;
      }
      this.ControlComponent.control = new AttributionControl(options);
      this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
    });
  }
}
