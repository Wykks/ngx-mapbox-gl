import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { first, withLatestFrom } from 'rxjs/operators';
import { State } from './app.module';
import * as fromApp from './app.selectors';
import * as demo from './demo/demo.actions';

@Component({
  selector: 'showcase-root',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  @HostBinding('class.mat-typography') class = true;

  isDemoEditing$ = this.store.pipe(select(fromApp.isDemoEditing));
  isInDemo$ = this.store.pipe(select(fromApp.isInDemo));

  private currentRouterState$ = this.store.pipe(select(fromApp.getCurrentRouterState));

  constructor(private store: Store<State>, private router: Router) {}

  toggleSidenav() {
    this.store.dispatch(new demo.ToggleSidenav());
  }

  toggleEdit() {
    this.isDemoEditing$
      .pipe(first(), withLatestFrom(this.currentRouterState$))
      .subscribe(([isDemoEditing, currentRouterState]) => {
        if (isDemoEditing) {
          this.router.navigate(['demo', currentRouterState.params.demoUrl]);
        } else {
          this.router.navigate(['demo', 'edit', currentRouterState.url.split('/').pop()]);
        }
      });
  }
}
