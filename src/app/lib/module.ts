import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { LayerComponent } from './layer/layer.component';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';
import { ImageComponent } from './image/image.component';
import { VectorSourceComponent } from './source/vector-source.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapComponent,
    LayerComponent,
    ImageComponent,
    VectorSourceComponent
  ],
  exports: [
    MapComponent,
    LayerComponent,
    ImageComponent,
    VectorSourceComponent
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
