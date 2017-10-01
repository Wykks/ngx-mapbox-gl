import { NgxMapboxGLModule } from '../lib/module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { MAPBOX_API_KEY } from '../lib/map/map.component';

const demoRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxMapboxGLModule,
    RouterModule.forChild(demoRoutes)
  ],
  declarations: [
    LayoutComponent,
    IndexComponent
  ],
  providers: [
    {
      provide: MAPBOX_API_KEY,
      useValue: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    }
  ]
})
export class DemoModule { }
