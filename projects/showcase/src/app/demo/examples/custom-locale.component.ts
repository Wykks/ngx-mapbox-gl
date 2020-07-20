import { Component } from '@angular/core';

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/light-v9'"
      [center]="[36.235656, 50.00387]"
      [zoom]="[11.15]"
      [locale]="locale"
    >
      <mgl-control mglFullscreen position="top-left"></mgl-control>
      <mgl-control mglGeolocate position="top-left"></mgl-control>
      <mgl-control mglNavigation position="top-left"></mgl-control>
      <mgl-control mglScale></mgl-control>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class CustomLocaleComponent {
  readonly locale = {
    'FullscreenControl.Enter': 'Перейти в повноекранний режим',
    'FullscreenControl.Exit': 'Вийти з повноекранного режиму',
    'GeolocateControl.FindMyLocation': 'Знайти моє місцеположення',
    'GeolocateControl.LocationNotAvailable': 'Місцеположення недоступне',
    'LogoControl.Title': 'Лого Mapbox',
    'NavigationControl.ResetBearing': 'Cкинути компас',
    'NavigationControl.ZoomIn': 'Наблизити',
    'NavigationControl.ZoomOut': 'Віддалити',
    'ScaleControl.Feet': 'ф',
    'ScaleControl.Meters': 'м',
    'ScaleControl.Kilometers': 'км',
    'ScaleControl.Miles': 'ми',
    'ScaleControl.NauticalMiles': 'нм',
  };
}
