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
  }
);

@Directive({
  selector: 'mgl-map',
})
export class MglMapResizeDirective {
  private readonly mapComponent = inject(MapComponent);
  private readonly mapResizeSignal = inject(MapResizeSignal);

  constructor() {
    effect(() => {
      this.mapResizeSignal();
      this.mapComponent.mapInstance.resize();
    });
  }
}
