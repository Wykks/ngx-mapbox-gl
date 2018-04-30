import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { NgxMapboxGLModule } from '../lib';
import { DEMO_ROUTES, DemoModule } from './demo/demo.module';
import { HOME_ROUTES, HomeModule } from './home/home.module';
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
        children: HOME_ROUTES,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    DemoModule,
    HomeModule,
    NgxMapboxGLModule.forRoot({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    }),
    RouterModule.forChild(demoRoutes)
  ],
  declarations: [
    ShowcaseIndexComponent
  ]
})
export class ShowcaseModule {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('ngx-mapbox-gl', sanitizer.bypassSecurityTrustResourceUrl('/assets/ngx-mapbox-gl.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/assets/github.svg'));
  }
}
