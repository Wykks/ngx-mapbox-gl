import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ImageComponent } from './image/image.component';
import { LayerComponent } from './layer/layer.component';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';
import { CanvasSourceComponent } from './source/canvas-source.component';
import { GeoJSONSourceComponent } from './source/geojson/geojson-source.component';
import { ImageSourceComponent } from './source/image-source.component';
import { RasterSourceComponent } from './source/raster-source.component';
import { VectorSourceComponent } from './source/vector-source.component';
import { VideoSourceComponent } from './source/video-source.component';
import { FeatureComponent } from './source/geojson/feature.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapComponent,
    LayerComponent,
    ImageComponent,
    VectorSourceComponent,
    GeoJSONSourceComponent,
    RasterSourceComponent,
    ImageSourceComponent,
    VideoSourceComponent,
    CanvasSourceComponent,
    FeatureComponent
  ],
  exports: [
    MapComponent,
    LayerComponent,
    ImageComponent,
    VectorSourceComponent,
    GeoJSONSourceComponent,
    RasterSourceComponent,
    ImageSourceComponent,
    VideoSourceComponent,
    CanvasSourceComponent,
    FeatureComponent
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
