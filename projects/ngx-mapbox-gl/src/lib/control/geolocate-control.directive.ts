import {
  AfterContentInit,
  Directive,
  EventEmitter,
  Host,
  Input,
  Output,
} from '@angular/core';
import { FitBoundsOptions, GeolocateControl } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import { Position } from '../map/map.types'

@Directive({
  selector: '[mglGeolocate]',
})
export class GeolocateControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() positionOptions?: PositionOptions;
  @Input() fitBoundsOptions?: FitBoundsOptions;
  @Input() trackUserLocation?: boolean;
  @Input() showUserLocation?: boolean;

  @Output()
  geolocate: EventEmitter<Position> = new EventEmitter<Position>();

  constructor(
    private MapService: MapService,
    @Host() private ControlComponent: ControlComponent<GeolocateControl>
  ) {}

  ngAfterContentInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options = {
        positionOptions: this.positionOptions,
        fitBoundsOptions: this.fitBoundsOptions,
        trackUserLocation: this.trackUserLocation,
        showUserLocation: this.showUserLocation,
      };

      Object.keys(options).forEach((key: string) => {
        const tkey = <keyof typeof options>key;
        if (options[tkey] === undefined) {
          delete options[tkey];
        }
      });
      this.ControlComponent.control = new GeolocateControl(options);
      this.ControlComponent.control.on('geolocate', (data) => {
          this.geolocate.emit(data as Position);
        }
      );
      this.MapService.addControl(
        this.ControlComponent.control,
        this.ControlComponent.position
      );
    });
  }
}
