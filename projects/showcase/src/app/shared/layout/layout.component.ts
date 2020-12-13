import { Component } from '@angular/core';

@Component({
  template: `
    <mat-toolbar color="primary">
      <div>
        <div id="layout-left-custom-items"></div>
        <a mat-button routerLink="/">
          <mat-icon svgIcon="ngx-mapbox-gl"></mat-icon>
          ngx-mapbox-gl
        </a>
        <a mat-button routerLink="/demo"> Demo </a>
        <a mat-button routerLink="/doc"> Documentation </a>
      </div>
      <div>
        <div id="layout-right-custom-items"></div>
        <a mat-button href="https://github.com/Wykks/ngx-mapbox-gl">
          <mat-icon svgIcon="github"></mat-icon>
          GitHub
        </a>
      </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100vh;
      }

      mat-toolbar {
        display: flex;
        justify-content: space-between;
        padding: 0 16px 0 0;
      }

      div {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .menu-button {
        height: 100%;
      }
    `,
  ],
})
export class LayoutComponent {}
