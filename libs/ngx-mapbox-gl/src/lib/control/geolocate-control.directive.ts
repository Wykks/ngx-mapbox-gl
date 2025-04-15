import {
  AfterContentInit,
  Directive,
  EventEmitter,
  Host,
  Input,
  Output,
} from '@angular/core';
import { GeolocateControl, type MapOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';

@Directive({
  selector: '[mglGeolocate]',
})
export class GeolocateControlDirective implements AfterContentInit {
  /* Init inputs */
  @Input() positionOptions?: PositionOptions;
  @Input() fitBoundsOptions?: MapOptions['fitBoundsOptions'];
  @Input() trackUserLocation?: boolean;
  @Input() showUserLocation?: boolean;
  @Input() showUserHeading?: boolean;

  @Output()
  geolocate: EventEmitter<GeolocationPosition> =
    new EventEmitter<GeolocationPosition>();

  constructor(
    private mapService: MapService,
    @Host() private controlComponent: ControlComponent<GeolocateControl>,
  ) {}

  ngAfterContentInit() {
    this.mapService.mapCreated$.subscribe(() => {
      if (this.controlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options = {
        positionOptions: this.positionOptions,
        fitBoundsOptions: this.fitBoundsOptions,
        trackUserLocation: this.trackUserLocation,
        showUserLocation: this.showUserLocation,
        showUserHeading: this.showUserHeading,
      };

      Object.keys(options).forEach((key: string) => {
        const tkey = key as keyof typeof options;
        if (options[tkey] === undefined) {
          delete options[tkey];
        }
      });
      this.controlComponent.control = new GeolocateControl(options);
      this.controlComponent.control.on('geolocate', (data) => {
        this.geolocate.emit(data);
      });
      this.mapService.addControl(
        this.controlComponent.control,
        this.controlComponent.position,
      );
    });
  }
}
