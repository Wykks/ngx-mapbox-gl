import { Directive, Host, Input, OnInit } from '@angular/core';
import { ScaleControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglScale]'
})
export class ScaleControlDirective implements OnInit {
  /* Init inputs */
  @Input() maxWidth?: number;
  @Input() unit?: 'imperial' | 'metric' | 'nautical';

  constructor(
    private MapService: MapService,
    @Host() private ControlComponent: ControlComponent
  ) { }

  ngOnInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: { maxWidth?: number, unit?: string } = {};
      if (this.maxWidth !== undefined) {
        options.maxWidth = this.maxWidth;
      }
      if (this.unit !== undefined) {
        options.unit = this.unit;
      }
      this.ControlComponent.control = new ScaleControl(options);
      this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
    });
  }
}
