import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { GeocoderControlDirective } from './geocoder-control.directive';

@NgModule({
  declarations: [GeocoderControlDirective],
  imports: [NgxMapboxGLModule],
  exports: [GeocoderControlDirective],
})
export class NgxMapboxGlGeocoderControlModule {}
