import { Component } from '@angular/core';
import { MglMapResizeDirective } from './mgl-map-resize.directive';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v12'"
      [zoom]="[5]"
      [center]="[-65.017, -16.457]"
    >
      <mgl-marker [lngLat]="[-66.324462890625, -16.024695711685304]">
        <div
          (click)="alert('Foo')"
          (keydown.enter)="alert('Foo')"
          tabindex="0"
          class="marker"
          style="background-image: url(https://picsum.photos/id/1011/60/60/); width: 60px; height: 60px"
        ></div>
      </mgl-marker>
      <mgl-marker [lngLat]="[-61.2158203125, -15.97189158092897]">
        <div
          (click)="alert('Bar')"
          (keydown.enter)="alert('Bar')"
          tabindex="0"
          class="marker"
          style="background-image: url(https://picsum.photos/id/870/50/50/); width: 50px; height: 50px"
        ></div>
      </mgl-marker>
      <mgl-marker [lngLat]="[-63.29223632812499, -18.28151823530889]">
        <div
          (click)="alert('Baz')"
          (keydown.enter)="alert('Baz')"
          tabindex="0"
          class="marker"
          style="background-image: url(https://picsum.photos/id/837/40/40/); width: 40px; height: 40px"
        ></div>
      </mgl-marker>
    </mgl-map>
  `,
  imports: [MapComponent, MglMapResizeDirective, MarkerComponent],
  styleUrls: ['./examples.css', './custom-marker-icons.component.css'],
})
export class NgxCustomMarkerIconsComponent {
  alert(message: string) {
    alert(message);
  }
}
