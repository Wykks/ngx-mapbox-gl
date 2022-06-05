import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { Subscription } from 'rxjs';
import { MapResizeService } from './map-resize.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mgl-map',
})
export class MglMapResizeDirective implements OnInit, OnDestroy {
  private sub = new Subscription();

  constructor(
    private mapResizeService: MapResizeService,
    private map: MapComponent
  ) {}

  ngOnInit() {
    this.sub.add(
      this.mapResizeService.resize$.subscribe(() => {
        this.map.mapInstance.resize();
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
