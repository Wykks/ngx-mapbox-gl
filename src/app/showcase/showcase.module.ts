import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { RootState } from '../app.module';
import { NgxMapboxGLModule } from '../lib';
import { DEMO_ROUTES, DemoModule } from './demo/demo.module';
import * as fromDemo from './demo/demo.reducer';
import { HomeIndexComponent } from './home/home-index.component';
import { SharedModule } from './shared.module';
import { ShowcaseIndexComponent } from './showcase-index.component';

export const demoRoutes: Routes = [
  {
    path: '',
    component: ShowcaseIndexComponent,
    children: [
      {
        path: 'demo',
        children: DEMO_ROUTES
      },
      {
        path: '',
        children: [{
          path: '',
          component: HomeIndexComponent
        }],
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

export interface State extends RootState {
  demo: fromDemo.State;
}

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    DemoModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    }),
    RouterModule.forChild(demoRoutes)
  ],
  declarations: [
    ShowcaseIndexComponent,
    HomeIndexComponent
  ]
})
export class ShowcaseModule {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('ngx-mapbox-gl', sanitizer.bypassSecurityTrustResourceUrl('/assets/ngx-mapbox-gl.svg'));
    iconRegistry.addSvgIcon('ngx-mapbox-gl-red', sanitizer.bypassSecurityTrustResourceUrl('/assets/ngx-mapbox-gl-red.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/assets/github.svg'));
  }
}
