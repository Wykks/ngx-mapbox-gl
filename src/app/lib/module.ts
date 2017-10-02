import { MapComponent } from './map/map.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAPBOX_API_KEY } from './map/map.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ]
})
export class NgxMapboxGLModule {
  static forRoot(config: { accessToken: string }): ModuleWithProviders {
    return {
        ngModule: NgxMapboxGLModule,
        providers: [
            {
              provide: MAPBOX_API_KEY,
              useValue: config.accessToken
            }
        ],
    };
}
}
