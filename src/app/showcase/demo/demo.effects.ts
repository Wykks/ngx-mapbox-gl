import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { MglResizeEventEmitter } from '../../lib';
import { DemoActionTypes } from './demo.actions';

@Injectable()
export class DemoEffects extends MglResizeEventEmitter {
  private sidenavAnimEnd = new Subject<void>();
  resizeEvent: Observable<void>;

  @Effect({ dispatch: false })
  loadCollection$: Observable<void> = this.actions$.pipe(
    ofType(DemoActionTypes.TOGGLE_SIDENAV_END),
    map(() => this.sidenavAnimEnd.next(undefined))
  );

  constructor(private actions$: Actions) {
    super();
    this.resizeEvent = this.sidenavAnimEnd.asObservable();
  }
}
