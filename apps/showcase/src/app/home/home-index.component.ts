import { Component } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { AnimationOptions } from 'mapbox-gl';
import { MatIconModule } from '@angular/material/icon';

@Component({
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v9'"
      [zoom]="[2]"
      [center]="center"
      [centerWithPanTo]="true"
      [panToOptions]="panToOptions"
      [interactive]="false"
      (mapLoad)="moveCenter()"
      (moveEnd)="moveCenter()"
    />
    <div class="main">
      <mat-icon class="logo" svgIcon="ngx-mapbox-gl-red"></mat-icon>
      <h1>Angular binding of mapbox-gl-js</h1>
    </div>
  `,
  styleUrls: ['./home-index.component.scss'],
  imports: [MapComponent, MatIconModule],
})
export class HomeIndexComponent {
  center: [number, number] = [0, 0];
  panToOptions: AnimationOptions = { duration: 10000, easing: (t) => t };

  moveCenter() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const targetY = this.center[0];
    if (targetY === 0) {
      this.center = [90, 0];
    } else if (targetY === 90) {
      this.center = [180, 0];
    } else if (targetY === 180) {
      this.center = [-90, 0];
    } else if (targetY === -90) {
      this.center = [0, 0];
    }
  }
}
