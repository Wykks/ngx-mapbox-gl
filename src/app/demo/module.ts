import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule, MatButtonToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgxMapboxGLModule } from '../lib/module';
import { CustomStyleIdComponent } from './examples/custom-style-id.component';
import { DisplayMapComponent } from './examples/display-map.component';
import { SetStyleComponent } from './examples/set-style.component';
import { IndexComponent } from './index.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { SatelliteMapComponent } from './examples/satellite-map.component';
import { AddImageGeneratedComponent } from './examples/add-image-generated.component';
import { AddImageComponent } from './examples/add-image.component';
import { ToggleLayersComponent } from './examples/toggle-layers.component';

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
      { path: 'toggle-layers', component: ToggleLayersComponent }
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
    ToggleLayersComponent
  ]
})
export class DemoModule { }
