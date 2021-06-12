import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[5]"
      [center]="[-65.017, -16.457]"
    >
      <mgl-marker [lngLat]="[-66.324462890625, -16.024695711685304]">
        <div
          (click)="alert('Foo')"
          class="marker"
          style="background-image: url(https://placekitten.com/g/60/60/); width: 60px; height: 60px"
        ></div>
      </mgl-marker>
      <mgl-marker [lngLat]="[-61.2158203125, -15.97189158092897]">
        <div
          (click)="alert('Bar')"
          class="marker"
          style="background-image: url(https://placekitten.com/g/50/50/); width: 50px; height: 50px"
        ></div>
      </mgl-marker>
      <mgl-marker [lngLat]="[-63.29223632812499, -18.28151823530889]">
        <div
          (click)="alert('Baz')"
          class="marker"
          style="background-image: url(https://placekitten.com/g/40/40/); width: 40px; height: 40px"
        ></div>
      </mgl-marker>
    </mgl-map>
  `,
  styleUrls: ['./examples.css', './custom-marker-icons.component.css'],
})
export class NgxCustomMarkerIconsComponent {
  alert(message: string) {
    alert(message);
  }
}
