import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AttributionControlDirective } from './control/attribution-control.directive';
import { ControlComponent } from './control/control.component';
import { FullscreenControlDirective } from './control/fullscreen-control.directive';
import { GeocoderControlDirective, MAPBOX_GEOCODER_API_KEY } from './control/geocoder-control.directive';
import { GeolocateControlDirective } from './control/geolocate-control.directive';
import { NavigationControlDirective } from './control/navigation-control.directive';
import { ScaleControlDirective } from './control/scale-control.directive';
import { DraggableDirective } from './draggable/draggable.directive';
import { ImageComponent } from './image/image.component';
import { LayerComponent } from './layer/layer.component';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';
import { MarkerComponent } from './marker/marker.component';
import {
  ClusterPointDirective,
  PointDirective,
  MarkersForClustersComponent,
} from './markers-for-clusters/markers-for-clusters.component';
import { PopupComponent } from './popup/popup.component';
import { CanvasSourceComponent } from './source/canvas-source.component';
import { FeatureComponent } from './source/geojson/feature.component';
import { GeoJSONSourceComponent } from './source/geojson/geojson-source.component';
import { ImageSourceComponent } from './source/image-source.component';
import { RasterSourceComponent } from './source/raster-source.component';
import { VectorSourceComponent } from './source/vector-source.component';
import { VideoSourceComponent } from './source/video-source.component';

@NgModule({
  imports: [CommonModule],
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
    MarkersForClustersComponent,
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
    MarkersForClustersComponent,
  ],
})
export class NgxMapboxGLModule {
  static withConfig(config: {
    accessToken: string;
    geocoderAccessToken?: string;
  }): ModuleWithProviders<NgxMapboxGLModule> {
    return {
      ngModule: NgxMapboxGLModule,
      providers: [
        {
          provide: MAPBOX_API_KEY,
          useValue: config.accessToken,
        },
        {
          provide: MAPBOX_GEOCODER_API_KEY,
          useValue: config.geocoderAccessToken || config.accessToken,
        },
      ],
    };
  }
}
