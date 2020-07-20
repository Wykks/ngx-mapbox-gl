import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { animationFrameScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

@Component({
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
})
export class HomeIndexComponent implements OnInit, OnDestroy {
  center = [0, 0];

  private sub: Subscription;

  constructor() {}

  ngOnInit() {
    this.sub = interval(100)
      .pipe(observeOn(animationFrameScheduler))
      .subscribe(() => {
        if (this.center[0] >= 180) {
          this.center = [-this.center[0], 0];
        } else {
          this.center = [this.center[0] + 1, 0];
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
