import { NgxMapboxGLModule } from '../lib/module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';

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
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    }),
    RouterModule.forChild(demoRoutes)
  ],
  declarations: [
    LayoutComponent,
    IndexComponent
  ]
})
export class DemoModule { }
