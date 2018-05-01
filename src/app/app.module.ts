import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Params, RouterModule, RouterStateSnapshot } from '@angular/router';
import { routerReducer, RouterReducerState, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ShowcaseModule } from './showcase/showcase.module';
import { EffectsModule } from '@ngrx/effects';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface RootState {
  router: RouterReducerState<RouterStateUrl>;
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShowcaseModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({
      router: <any>routerReducer
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: SimpleSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
