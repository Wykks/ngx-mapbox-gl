import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  template: `
    <mat-toolbar color="primary">
      <div>
        <div id="layout-left-custom-items"></div>
        <a mat-button routerLink="/">
          <mat-icon svgIcon="ngx-mapbox-gl"/>
          ngx-mapbox-gl
        </a>
        <a mat-button routerLink="/demo"> Demo </a>
        <a mat-button routerLink="/doc"> Documentation </a>
      </div>
      <div>
        <div id="layout-right-custom-items"></div>
        <a mat-button href="https://github.com/Wykks/ngx-mapbox-gl">
          <mat-icon svgIcon="github"/>
          GitHub
        </a>
      </div>
    </mat-toolbar>
    <router-outlet />
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
        gap: 6px;
      }

      .menu-button {
        height: 100%;
      }
    `,
  ],
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class LayoutComponent {}
