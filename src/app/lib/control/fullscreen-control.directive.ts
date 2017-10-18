import { Directive, OnInit, Host } from '@angular/core';
import { FullscreenControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglFullscreen]'
})
export class FullscreenControlDirective implements OnInit {

  constructor(
    private MapService: MapService,
    @Host() private ControlComponent: ControlComponent
  ) { }

  ngOnInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      this.ControlComponent.control = new FullscreenControl();
      this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
    });
  }
}
