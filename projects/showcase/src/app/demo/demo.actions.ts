import { Action } from '@ngrx/store';

export enum DemoActionTypes {
  TOGGLE_SIDENAV = '[Demo] Toggle sidenav',
  TOGGLE_SIDENAV_END = '[Demo] Toggle sidenav end',
}

export class ToggleSidenav implements Action {
  readonly type = DemoActionTypes.TOGGLE_SIDENAV;
}

export class ToggleSidenavEnd implements Action {
  readonly type = DemoActionTypes.TOGGLE_SIDENAV_END;
}

export type DemoActions = ToggleSidenav | ToggleSidenavEnd;
