import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { RouterModule } from '@angular/router';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { LayoutModule } from '../shared/layout/layout.module';
import { DemoIndexComponent } from './demo-index.component';
import { Display3dBuildingsComponent } from './examples/3d-buildings.component';
import { AddImageGeneratedComponent } from './examples/add-image-generated.component';
import { AddImageMissingGeneratedComponent } from './examples/add-image-missing-generated.component';
import { AddImageComponent } from './examples/add-image.component';
import { AttributionPositionComponent } from './examples/attribution-position.component';
import { CenterOnSymbolComponent } from './examples/center-on-symbol.component';
import {
  ClusterHtmlComponent,
  ClusterPointComponent,
} from './examples/cluster-html.component';
import { ClusterComponent } from './examples/cluster.component';
import { CustomAttributionComponent } from './examples/custom-attribution.component';
import { CustomLocaleComponent } from './examples/custom-locale.component';
import { CustomMarkerIconsComponent } from './examples/custom-marker-icons.component';
import { CustomStyleIdComponent } from './examples/custom-style-id.component';
import { DisplayMapComponent } from './examples/display-map.component';
import { DragAMarkerComponent } from './examples/drag-a-marker.component';
import { FullscreenComponent } from './examples/fullscreen.component';
import { GeoJSONLineComponent } from './examples/geojson-line.component';
import { HeatMapComponent } from './examples/heatmap.component';
import { HoverStylesComponent } from './examples/hover-styles.component';
import { InteractiveFalseComponent } from './examples/interactive-false.component';
import { LanguageSwitchComponent } from './examples/language-switch.component';
import { LiveUpdateFeatureComponent } from './examples/live-update-feature.component';
import { LiveUpdateImageSourceComponent } from './examples/live-update-image-srource.component';
import { LocateUserComponent } from './examples/locate-user.component';
import { MapProjectionComponent } from './examples/map-projection.component';
import { MarkerAlignmentComponent } from './examples/marker-alignment.component';
import { NavigationComponent } from './examples/navigation.component';
import {
  ClusterPopupComponent,
  NgxClusterHtmlComponent,
} from './examples/ngx-cluster-html.component';
import { NgxCustomControlComponent } from './examples/ngx-custom-control.component';
import { NgxCustomMarkerIconsComponent } from './examples/ngx-custom-marker-icons.component';
import { NgxDragAPointComponent } from './examples/ngx-drag-a-point.component';
import { NgxGeoJSONLineComponent } from './examples/ngx-geojson-line.component';
import { NgxScaleControlComponent } from './examples/ngx-scale-control.component';
import { PolygonPopupOnClickComponent } from './examples/polygon-popup-on-click.component';
import { PopupOnClickComponent } from './examples/popup-on-click.component';
import { PopupComponent } from './examples/popup.component';
import { SatelliteMapComponent } from './examples/satellite-map.component';
import { SetPopupComponent } from './examples/set-popup.component';
import { SetStyleComponent } from './examples/set-style.component';
import { ToggleLayersComponent } from './examples/toggle-layers.component';
import { ZoomtoLinestringComponent } from './examples/zoomto-linestring.component';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { StackblitzEditGuard } from './stackblitz-edit/stackblitz-edit-guard.service';
import { StackblitzEditComponent } from './stackblitz-edit/stackblitz-edit.component';

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,

    NgxMapboxGLModule,

    LayoutModule,

    MatRadioModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSlideToggleModule,
  ],
  providers: [StackblitzEditGuard],
  declarations: [
    DemoIndexComponent,
    MglMapResizeDirective,
    StackblitzEditComponent,
    DisplayMapComponent,
    CustomStyleIdComponent,
    SetStyleComponent,
    SatelliteMapComponent,
    AddImageGeneratedComponent,
    AddImageComponent,
    ToggleLayersComponent,
    ClusterComponent,
    HeatMapComponent,
    GeoJSONLineComponent,
    NgxGeoJSONLineComponent,
    CustomMarkerIconsComponent,
    NgxCustomMarkerIconsComponent,
    LiveUpdateFeatureComponent,
    LiveUpdateImageSourceComponent,
    PopupComponent,
    SetPopupComponent,
    FullscreenComponent,
    NavigationComponent,
    LocateUserComponent,
    AttributionPositionComponent,
    NgxScaleControlComponent,
    NgxCustomControlComponent,
    InteractiveFalseComponent,
    LanguageSwitchComponent,
    CenterOnSymbolComponent,
    NgxDragAPointComponent,
    DragAMarkerComponent,
    HoverStylesComponent,
    PopupOnClickComponent,
    ZoomtoLinestringComponent,
    ClusterHtmlComponent,
    ClusterPointComponent,
    Display3dBuildingsComponent,
    PolygonPopupOnClickComponent,
    NgxClusterHtmlComponent,
    ClusterPopupComponent,
    AddImageMissingGeneratedComponent,
    CustomAttributionComponent,
    CustomLocaleComponent,
    MarkerAlignmentComponent,
    MapProjectionComponent,
  ],
  exports: [DemoIndexComponent],
})
export class DemoModule {}
