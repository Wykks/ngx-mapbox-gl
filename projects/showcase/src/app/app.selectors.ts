import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDemo from './demo/demo.reducer';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './app.module';

const getDemoState = createFeatureSelector<fromDemo.State>('demo');
const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const isDemoSidenavOpen = createSelector(
  getDemoState,
  (state) => state.sidenavOpen
);

export const isDemoEditing = createSelector(
  getRouterState,
  (state) => !!state.state.url.match(/^\/demo\/\edit/)
);

export const isInDemo = createSelector(
  getRouterState,
  (state) => state && state.state.url.startsWith('/demo/')
);

export const getCurrentRouterState = createSelector(
  getRouterState,
  (state) => state.state
);
