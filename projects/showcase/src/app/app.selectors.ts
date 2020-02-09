import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDemo from './demo/demo.reducer';
import { State } from './app.module';

const getDemoState = createFeatureSelector<fromDemo.State>('demo');
// TEMP: this line is supposed to be:
//    const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
//  There is an issue with `createFeatureSelector` though, which causes unnecessary warnings, as described here:
//    https://github.com/ngrx/platform/issues/2116
//  This workaround is taken from here:
//    https://stackoverflow.com/questions/58214913/how-to-silence-the-feature-name-router-does-not-exist-in-the-state-ngrx-r
const getRouterState = createSelector(
  (state: State) => state.router,
  (value) => value
);

export const isDemoSidenavOpen = createSelector(getDemoState, (state) => state.sidenavOpen);

export const isDemoEditing = createSelector(getRouterState, (state) => !!state.state.url.match(/^\/demo\/\edit/));

export const isInDemo = createSelector(getRouterState, (state) => state && state.state.url.startsWith('/demo/'));

export const getCurrentRouterState = createSelector(getRouterState, (state) => state.state);
