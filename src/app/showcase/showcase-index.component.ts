import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators/first';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import * as demo from './demo/demo.actions';
import { State } from './showcase.module';
import * as fromShowcase from './showcase.selectors';

@Component({
  templateUrl: './showcase-index.component.html',
  styleUrls: ['./showcase-index.component.scss']
})
export class ShowcaseIndexComponent {

  isDemoEditing$ = this.store.pipe(select(fromShowcase.isDemoEditing));
  isInDemo$ = this.store.pipe(select(fromShowcase.isInDemo));

  private currentRouterState$ = this.store.pipe(select(fromShowcase.getCurrentRouterState));

  constructor(
    private store: Store<State>,
    private router: Router
  ) { }

  toggleSidenav() {
    this.store.dispatch(new demo.ToggleSidenav());
  }

  toggleEdit() {
    this.isDemoEditing$.pipe(
      first(),
      withLatestFrom(this.currentRouterState$)
    ).subscribe(([isDemoEditing, currentRouterState]) => {
      if (isDemoEditing) {
        this.router.navigate(['demo', currentRouterState.params.demoUrl]);
      } else {
        this.router.navigate(['demo', 'edit', currentRouterState.url.split('/').pop()]);
      }
    });
  }
}
