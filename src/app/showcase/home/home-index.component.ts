import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})

export class HomeIndexComponent implements OnInit, OnDestroy {
  center = [0, 0];

  private sub: Subscription;

  constructor() { }

  ngOnInit() {
    this.sub = interval(100, animationFrame).subscribe(() => {
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
