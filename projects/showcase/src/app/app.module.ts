import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Params, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../environments/environment';
import { DEMO_ROUTES, DemoModule } from './demo/demo.module';
import * as fromDemo from './demo/demo.reducer';
import { HomeIndexComponent } from './home/home-index.component';
import { IndexComponent } from './index.component';
import { SharedModule } from './shared.module';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  demo: fromDemo.State;
}

export class SimpleSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { url, root: { queryParams } } = routerState;
    const { params } = route;
    return { url, params, queryParams };
  }
}

export const showcaseRoutes: Routes = [
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
  },
  {
    path: 'doc',
    loadChildren: './doc/doc.module#DocModule'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    IndexComponent,
    HomeIndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    DemoModule,
    StoreModule.forRoot({
      router: <any>routerReducer
    }),
    RouterModule.forRoot(showcaseRoutes),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w'
    })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: SimpleSerializer }
  ],
  bootstrap: [IndexComponent]
})
export class AppModule {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('ngx-mapbox-gl', sanitizer.bypassSecurityTrustResourceUrl('assets/ngx-mapbox-gl.svg'));
    iconRegistry.addSvgIcon('ngx-mapbox-gl-red', sanitizer.bypassSecurityTrustResourceUrl('assets/ngx-mapbox-gl-red.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg'));
  }
}
