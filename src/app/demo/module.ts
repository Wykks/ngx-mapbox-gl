import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule, MatRadioModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgxMapboxGLModule } from '../lib/module';
import { AddImageGeneratedComponent } from './examples/add-image-generated.component';
import { AddImageComponent } from './examples/add-image.component';
import { ClusterComponent } from './examples/cluster';
import { CustomStyleIdComponent } from './examples/custom-style-id.component';
import { DisplayMapComponent } from './examples/display-map.component';
import { SatelliteMapComponent } from './examples/satellite-map.component';
import { SetStyleComponent } from './examples/set-style.component';
import { ToggleLayersComponent } from './examples/toggle-layers.component';
import { IndexComponent } from './index.component';
import { LayoutComponent } from './layout/layout.component';
import { HeatMapComponent } from './examples/heatmap.component';
import { GeoJSONLineComponent } from './examples/geojson-line';
import { NgxGeoJSONLineComponent } from './examples/ngx-geojson-line';

const demoRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
      { path: 'ngx-geojson-line', component: NgxGeoJSONLineComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonToggleModule,
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
    NgxGeoJSONLineComponent
  ]
})
export class DemoModule { }
