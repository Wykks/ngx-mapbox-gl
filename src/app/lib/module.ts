import { MapComponent, MAPBOX_API_KEY } from './map/map.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

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
