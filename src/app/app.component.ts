import { Component, HostBinding } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
  :host {
    display: flex;
    min-height: 100vh;
  }
  `]
})
export class AppComponent {
  @HostBinding('class.mat-typography') class = true;
}
