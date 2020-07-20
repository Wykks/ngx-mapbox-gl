import { NgModule, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Params, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer,
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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

@Injectable()
export class SimpleSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;
    return { url, params, queryParams };
  }
}

export const showcaseRoutes: Routes = [
  {
    path: 'demo',
    children: DEMO_ROUTES,
  },
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeIndexComponent,
      },
    ],
    pathMatch: 'full',
  },
  {
    path: 'doc',
    loadChildren: () => import('./doc/doc.module').then((m) => m.DocModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [IndexComponent, HomeIndexComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    DemoModule,
    StoreModule.forRoot(
      {
        router: <any>routerReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    RouterModule.forRoot(showcaseRoutes),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer, stateKey: 'router' }),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA',
    }),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: SimpleSerializer }],
  bootstrap: [IndexComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('ngx-mapbox-gl', sanitizer.bypassSecurityTrustResourceUrl('assets/ngx-mapbox-gl.svg'));
    iconRegistry.addSvgIcon(
      'ngx-mapbox-gl-red',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ngx-mapbox-gl-red.svg')
    );
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg'));
  }
}
