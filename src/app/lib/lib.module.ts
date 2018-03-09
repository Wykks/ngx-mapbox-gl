import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AttributionControlDirective } from './control/attribution-control.directive';
import { ControlComponent } from './control/control.component';
import { FullscreenControlDirective } from './control/fullscreen-control.directive';
import { GeocoderControlDirective, MAPBOX_GEOCODER_API_KEY } from './control/geocoder-control.directive';
import { GeolocateControlDirective } from './control/geolocate-control.directive';
import { NavigationControlDirective } from './control/navigation-control.directive';
import { ScaleControlDirective } from './control/scale-control.directive';
import { ImageComponent } from './image/image.component';
import { LayerComponent } from './layer/layer.component';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';
import { MarkerClusterComponent, ClusterPointDirective, PointDirective } from './marker-cluster/marker-cluster.component';
import { MarkerComponent } from './marker/marker.component';
import { PopupComponent } from './popup/popup.component';
import { CanvasSourceComponent } from './source/canvas-source.component';
import { DraggableDirective } from './source/geojson/draggable.directive';
import { FeatureComponent } from './source/geojson/feature.component';
import { GeoJSONSourceComponent } from './source/geojson/geojson-source.component';
import { ImageSourceComponent } from './source/image-source.component';
import { RasterSourceComponent } from './source/raster-source.component';
import { VectorSourceComponent } from './source/vector-source.component';
import { VideoSourceComponent } from './source/video-source.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapComponent,
    LayerComponent,
    DraggableDirective,
    ImageComponent,
    VectorSourceComponent,
    GeoJSONSourceComponent,
    RasterSourceComponent,
    ImageSourceComponent,
    VideoSourceComponent,
    CanvasSourceComponent,
    FeatureComponent,
    MarkerComponent,
    PopupComponent,
    ControlComponent,
    FullscreenControlDirective,
    NavigationControlDirective,
    GeocoderControlDirective,
    GeolocateControlDirective,
    AttributionControlDirective,
    ScaleControlDirective,
    PointDirective,
    ClusterPointDirective,
    MarkerClusterComponent
  ],
  exports: [
    MapComponent,
    LayerComponent,
    DraggableDirective,
    ImageComponent,
    VectorSourceComponent,
    GeoJSONSourceComponent,
    RasterSourceComponent,
    ImageSourceComponent,
    VideoSourceComponent,
    CanvasSourceComponent,
    FeatureComponent,
    MarkerComponent,
    PopupComponent,
    ControlComponent,
    FullscreenControlDirective,
    NavigationControlDirective,
    GeocoderControlDirective,
    GeolocateControlDirective,
    AttributionControlDirective,
    ScaleControlDirective,
    PointDirective,
    ClusterPointDirective,
    MarkerClusterComponent
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
        },
        {
          provide: MAPBOX_GEOCODER_API_KEY,
          useValue: config.accessToken
        }
      ],
    };
  }
}
