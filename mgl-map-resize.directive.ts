import {
  Directive,
  effect,
  inject,
  InjectionToken,
  signal,
  type WritableSignal,
} from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';

export const MapResizeSignal = new InjectionToken<WritableSignal<void>>(
  'Map Resize Signal',
  {
    providedIn: 'root',
    factory: () =>
      signal(undefined, {
        equal: () => false,
      }),
  },
);

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mgl-map',
})
export class MglMapResizeDirective {
  private readonly mapComponent = inject(MapComponent);
  private readonly mapResizeSignal = inject(MapResizeSignal);

  constructor() {
    let skipFirst = true;
    effect(() => {
      this.mapResizeSignal();
      if (skipFirst) {
        skipFirst = false;
        return;
      }
      this.mapComponent.mapInstance.resize();
    });
  }
}
