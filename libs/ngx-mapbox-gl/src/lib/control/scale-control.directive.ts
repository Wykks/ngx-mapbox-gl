import {
  AfterContentInit,
  Directive,
  OnChanges,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import { ScaleControl, type ScaleControlOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglScale]',
})
export class ScaleControlDirective implements AfterContentInit, OnChanges {
  private mapService = inject(MapService);
  private controlComponent = inject<ControlComponent<ScaleControl>>(
    ControlComponent<ScaleControl>,
    { host: true },
  );

  /* Init inputs */
  maxWidth = input<number>();

  /* Dynamic inputs */
  unit = input<'imperial' | 'metric' | 'nautical'>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['unit'] && !changes['unit'].isFirstChange()) {
      (this.controlComponent.control as ScaleControl).setUnit(
        changes['unit'].currentValue,
      );
    }
  }

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: ScaleControlOptions = {};
      const maxWidth = this.maxWidth();
      const unit = this.unit();
      if (maxWidth !== undefined) {
        options.maxWidth = maxWidth;
      }
      if (unit !== undefined) {
        options.unit = unit;
      }
      this.controlComponent.control = new ScaleControl(options);
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position(),
      );
    });
  }
}
