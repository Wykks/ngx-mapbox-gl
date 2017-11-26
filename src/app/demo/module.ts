import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatRadioModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgxMapboxGLModule } from '../lib';
import { AddImageGeneratedComponent } from './examples/add-image-generated.component';
import { AddImageComponent } from './examples/add-image.component';
import { AttachPopupComponent } from './examples/attach-popup.component';
import { CenterOnSymbolComponent } from './examples/center-on-symbol.component';
import { ClusterComponent } from './examples/cluster.component';
import { CustomMarkerIconsComponent } from './examples/custom-marker-icons.component';
import { CustomStyleIdComponent } from './examples/custom-style-id.component';
import { DisplayMapComponent } from './examples/display-map.component';
import { FullscreenComponent } from './examples/fullscreen.component';
import { GeoJSONLineComponent } from './examples/geojson-line.component';
import { HeatMapComponent } from './examples/heatmap.component';
import { HoverStylesComponent } from './examples/hover-styles.component';
import { InteractiveFalseComponent } from './examples/interactive-false.component';
import { LanguageSwitchComponent } from './examples/language-switch.component';
import { LiveUpdateFeatureComponent } from './examples/live-update-feature.component';
import { LocateUserComponent } from './examples/locate-user.component';
import { NavigationComponent } from './examples/navigation.component';
import { NgxAttributionComponent } from './examples/ngx-attribution.component';
import { NgxCustomControlComponent } from './examples/ngx-custom-control.component';
import { NgxCustomMarkerIconsComponent } from './examples/ngx-custom-marker-icons.component';
import { NgxDragAPointComponent } from './examples/ngx-drag-a-point.component';
import { NgxGeoJSONLineComponent } from './examples/ngx-geojson-line.component';
import { PopupOnClickComponent } from './examples/popup-on-click.component';
import { NgxScaleControlComponent } from './examples/ngx-scale-control.component';
import { PopupComponent } from './examples/popup.component';
import { SatelliteMapComponent } from './examples/satellite-map.component';
import { SetStyleComponent } from './examples/set-style.component';
import { ToggleLayersComponent } from './examples/toggle-layers.component';
import { IndexComponent } from './index.component';
import { LayoutComponent } from './layout/layout.component';

export const demoRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'display-map', component: DisplayMapComponent },
  { path: 'custom-style-id', component: CustomStyleIdComponent },
  { path: 'set-style', component: SetStyleComponent },
  { path: 'satellite-map', component: SatelliteMapComponent },
  { path: 'add-image-generated', component: AddImageGeneratedComponent },
  { path: 'add-image', component: AddImageComponent },
  { path: 'toggle-layers', component: ToggleLayersComponent },
  { path: 'cluster', component: ClusterComponent },
  { path: 'heatmap', component: HeatMapComponent },
  { path: 'geojson-line', component: GeoJSONLineComponent },
  { path: 'ngx-geojson-line', component: NgxGeoJSONLineComponent },
  { path: 'custom-marker-icons', component: CustomMarkerIconsComponent },
  { path: 'ngx-custom-marker-icons', component: NgxCustomMarkerIconsComponent },
  { path: 'live-update-feature', component: LiveUpdateFeatureComponent },
  { path: 'popup', component: PopupComponent },
  { path: 'set-popup', component: AttachPopupComponent },
  { path: 'fullscreen', component: FullscreenComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'locate-user', component: LocateUserComponent },
  { path: 'ngx-attribution', component: NgxAttributionComponent },
  { path: 'ngx-scale-control', component: NgxScaleControlComponent },
  { path: 'ngx-custom-control', component: NgxCustomControlComponent },
  { path: 'interactive-false', component: InteractiveFalseComponent },
  { path: 'language-switch', component: LanguageSwitchComponent },
  { path: 'center-on-symbol', component: CenterOnSymbolComponent },
  { path: 'ngx-drag-a-point', component: NgxDragAPointComponent },
  { path: 'hover-styles', component: HoverStylesComponent },
  { path: 'popup-on-click', component: PopupOnClickComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatButtonModule,
    FormsModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    }),
    RouterModule.forChild(demoRoutes)
  ],
  declarations: [
    LayoutComponent,
    IndexComponent,
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
    PopupComponent,
    AttachPopupComponent,
    FullscreenComponent,
    NavigationComponent,
    LocateUserComponent,
    NgxAttributionComponent,
    NgxScaleControlComponent,
    NgxCustomControlComponent,
    InteractiveFalseComponent,
    LanguageSwitchComponent,
    CenterOnSymbolComponent,
    NgxDragAPointComponent,
    HoverStylesComponent,
    PopupOnClickComponent
  ]
})
export class DemoModule { }
