import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatListModule, MatRadioModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgxMapboxGLModule } from '../lib';
import { Display3dBuildingsComponent } from './examples/3d-buildings.component';
import { AddImageGeneratedComponent } from './examples/add-image-generated.component';
import { AddImageComponent } from './examples/add-image.component';
import { AttachPopupComponent } from './examples/attach-popup.component';
import { AttributionPositionComponent } from './examples/attribution-position.component';
import { CenterOnSymbolComponent } from './examples/center-on-symbol.component';
import { ClusterComponent } from './examples/cluster.component';
import { CustomMarkerIconsComponent } from './examples/custom-marker-icons.component';
import { CustomStyleIdComponent } from './examples/custom-style-id.component';
import { DisplayMapComponent } from './examples/display-map.component';
import { FullscreenComponent } from './examples/fullscreen.component';
import { GeocodeAddressComponent } from './examples/geocode-address.component';
import { GeoJSONLineComponent } from './examples/geojson-line.component';
import { HeatMapComponent } from './examples/heatmap.component';
import { HoverStylesComponent } from './examples/hover-styles.component';
import { InteractiveFalseComponent } from './examples/interactive-false.component';
import { LanguageSwitchComponent } from './examples/language-switch.component';
import { LiveUpdateFeatureComponent } from './examples/live-update-feature.component';
import { LocateUserComponent } from './examples/locate-user.component';
import { NavigationComponent } from './examples/navigation.component';
import { NgxCustomControlComponent } from './examples/ngx-custom-control.component';
import { NgxCustomMarkerIconsComponent } from './examples/ngx-custom-marker-icons.component';
import { NgxDragAPointComponent } from './examples/ngx-drag-a-point.component';
import { NgxGeoJSONLineComponent } from './examples/ngx-geojson-line.component';
import { NgxMarkerClusterComponent } from './examples/ngx-marker-cluster.component';
import { NgxScaleControlComponent } from './examples/ngx-scale-control.component';
import { PopupOnClickComponent } from './examples/popup-on-click.component';
import { PopupComponent } from './examples/popup.component';
import { SatelliteMapComponent } from './examples/satellite-map.component';
import { SetStyleComponent } from './examples/set-style.component';
import { ToggleLayersComponent } from './examples/toggle-layers.component';
import { ZoomtoLinestringComponent } from './examples/zoomto-linestring.component';
import { IndexComponent } from './index.component';
import { LayoutComponent } from './layout/layout.component';
import { StackblitzEditGuard } from './stackblitz-edit/stackblitz-edit-guard.service';
import { StackblitzEditComponent } from './stackblitz-edit/stackblitz-edit.component';

export enum Category {
  STYLES = 'Styles',
  LAYERS = 'Layers',
  SOURCES = 'Sources',
  USER_INTERACTION = 'User interaction',
  CAMERA = 'Camera',
  CONTROLS_AND_OVERLAYS = 'Controls and overlays',
}

export const demoRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'edit/:demoUrl', component: StackblitzEditComponent, canActivate: [StackblitzEditGuard]},
      { path: 'display-map', component: DisplayMapComponent, data: { label: 'Display a map', cat: Category.STYLES } },
      { path: 'custom-style-id', component: CustomStyleIdComponent, data: { label: 'Display a map with a custom style', cat: Category.STYLES } },
      { path: 'set-style', component: SetStyleComponent, data: { label: 'Change a map\'s style', cat: Category.STYLES } },
      { path: 'satellite-map', component: SatelliteMapComponent, data: { label: 'Display a satellite map', cat: Category.STYLES } },
      { path: 'add-image-generated', component: AddImageGeneratedComponent, data: { label: 'Add a generated icon to the map', cat: Category.LAYERS } },
      { path: 'add-image', component: AddImageComponent, data: { label: 'Add an icon to the map', cat: Category.LAYERS } },
      { path: 'toggle-layers', component: ToggleLayersComponent, data: { label: 'Show and hide layers', cat: Category.LAYERS } },
      { path: '3d-buildings', component: Display3dBuildingsComponent, data: { label: 'Display 3d buildings', cat: Category.LAYERS } },
      { path: 'cluster', component: ClusterComponent, data: { label: 'Create and style clusters', cat: Category.LAYERS } },
      { path: 'heatmap', component: HeatMapComponent, data: { label: 'Create a heatmap layer', cat: Category.LAYERS } },
      { path: 'geojson-line', component: GeoJSONLineComponent, data: { label: 'Add a GeoJSON line', cat: Category.LAYERS } },
      { path: 'ngx-geojson-line', component: NgxGeoJSONLineComponent, data: { label: '[NGX] Add a GeoJSON line', cat: Category.LAYERS } },
      { path: 'custom-marker-icons', component: CustomMarkerIconsComponent, data: { label: 'Add custom icons with Markers', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'ngx-custom-marker-icons', component: NgxCustomMarkerIconsComponent, data: { label: '[NGX] Add custom icons with Markers', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'live-update-feature', component: LiveUpdateFeatureComponent, data: { label: 'Update a feature in realtime', cat: Category.SOURCES } },
      { path: 'popup', component: PopupComponent, data: { label: 'Display a popup', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'set-popup', component: AttachPopupComponent, data: { label: 'Attach a popup to a marker instance', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'fullscreen', component: FullscreenComponent, data: { label: 'View a fullscreen map', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'navigation', component: NavigationComponent, data: { label: 'Display map navigation controls', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'locate-user', component: LocateUserComponent, data: { label: 'Locate the user', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'attribution-position', component: AttributionPositionComponent, data: { label: 'Change the default position for attribution', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'ngx-scale-control', component: NgxScaleControlComponent, data: { label: '[NGX] Show scale information', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'ngx-custom-control', component: NgxCustomControlComponent, data: { label: '[NGX] Add a custom control', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'interactive-false', component: InteractiveFalseComponent, data: { label: 'Display a non-interactive map', cat: Category.USER_INTERACTION } },
      { path: 'language-switch', component: LanguageSwitchComponent, data: { label: 'Change a map\'s language', cat: Category.USER_INTERACTION } },
      { path: 'center-on-symbol', component: CenterOnSymbolComponent, data: { label: 'Center the map on a clicked symbol', cat: Category.USER_INTERACTION } },
      { path: 'ngx-drag-a-point', component: NgxDragAPointComponent, data: { label: '[NGX] Create a draggable point', cat: Category.USER_INTERACTION } },
      { path: 'hover-styles', component: HoverStylesComponent, data: { label: 'Create a hover effect', cat: Category.USER_INTERACTION } },
      { path: 'popup-on-click', component: PopupOnClickComponent, data: { label: 'Display a popup on click', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'zoomto-linestring', component: ZoomtoLinestringComponent, data: { label: 'Fit to the bounds of a LineString', cat: Category.USER_INTERACTION } },
      { path: 'ngx-marker-cluster', component: NgxMarkerClusterComponent, data: { label: '[NGX] Create a clusters of html markers', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: 'mapbox-gl-geocoder', component: GeocodeAddressComponent, data: { label: 'Add a geocoder', cat: Category.CONTROLS_AND_OVERLAYS } },
      { path: '**', redirectTo: '/display-map', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    }),
    RouterModule.forChild(demoRoutes)
  ],
  providers: [
    StackblitzEditGuard
  ],
  declarations: [
    LayoutComponent,
    IndexComponent,
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
    PopupComponent,
    AttachPopupComponent,
    FullscreenComponent,
    NavigationComponent,
    LocateUserComponent,
    GeocodeAddressComponent,
    AttributionPositionComponent,
    NgxScaleControlComponent,
    NgxCustomControlComponent,
    InteractiveFalseComponent,
    LanguageSwitchComponent,
    CenterOnSymbolComponent,
    NgxDragAPointComponent,
    HoverStylesComponent,
    PopupOnClickComponent,
    ZoomtoLinestringComponent,
    NgxMarkerClusterComponent,
    Display3dBuildingsComponent
  ]
})
export class DemoModule { }
