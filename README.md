# ngx-mapbox-gl

[![Build Status](https://travis-ci.org/Wykks/ngx-mapbox-gl.svg?branch=master)](https://travis-ci.org/Wykks/ngx-mapbox-gl)
[![npm version](https://img.shields.io/npm/v/ngx-mapbox-gl.svg?style=flat)](https://www.npmjs.com/package/ngx-mapbox-gl)

Angular wrapper for [mapbox-gl-js](https://www.mapbox.com/mapbox-gl-js/api/). Expose a bunch of component meant to be simple to use for Angular.

v1.X : Angular 5 & 6 (rxjs 5)

v2.X : Angular 6 & 7 (rxjs 6)

v3.X : Angular 7.2

Include the following components:
- [mgl-map](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-map-mapbox-gl-api)
- [mgl-layer](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-layer-mapbox-gl-style-spec)
- [mgl-geojson-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-geojson-source-mapbox-gl-style-spec)
- [mgl-canvas-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-canvas-source-mapbox-gl-style-spec)
- [mgl-image-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-image-source-mapbox-gl-style-spec)
- [mgl-raster-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-raster-source-mapbox-gl-style-spec)
- [mgl-vector-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-vector-source-mapbox-gl-style-spec)
- [mgl-video-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-video-source-mapbox-gl-style-spec)
- [mgl-image](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-image-mapbox-gl-api)
- [mgl-control](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-control) with builtin control:
  - mglScale
  - mglFullscren
  - mglAttribution
  - mglGeolocate
  - mglNavigation
  - mglGeocoder (see '@mapbox/mapbox-gl-geocoder')
- [mgl-marker](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-marker-mapbox-gl-api)
- [mgl-popup](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-popup-mapbox-gl-api)
- [mgl-marker-cluster](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#ngx-mgl-marker-cluster-supercluster-api)

## How to start

```
npm install ngx-mapbox-gl mapbox-gl@0.54.0 --save
```
If using typescript add mapbox-gl types 
```
npm install @types/mapbox-gl@0.51.10 --save-dev
```

Load the css of mapbox-gl (and mapbox-gl-geocoder if mglGeocoder is used)

For example, with angular-cli add this in angular.json
```json
"styles": [
        ...
        "./node_modules/mapbox-gl/dist/mapbox-gl.css",
        "./node_modules/@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css"
      ],
```
Or in global css (called styles.css for example in angular-cli)
```css
@import "~mapbox-gl/dist/mapbox-gl.css";
@import "~@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";
```

Add this in your polyfill.ts file (https://github.com/Wykks/ngx-mapbox-gl/issues/136#issuecomment-496224634):
```
(window as any).global = window;
```

Then, in your app's main module (or in any other module), import the NgxMapboxGLModule
```typescript
...
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  imports: [
    ...
    NgxMapboxGLModule.withConfig({
      accessToken: 'TOKEN', // Optionnal, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ]
})
export class AppModule {}
```

How to get a mapbox token: https://www.mapbox.com/help/how-access-tokens-work/

Note: mapbox-gl can works without token, if you have your own source, example: https://stackblitz.com/edit/ngx-mapbox-gl-without-token

You can use https://github.com/klokantech/tileserver-gl to serve vector tiles

Display a map
```typescript
import { Component } from '@angular/core';

@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="[9]"
    [center]="[-74.50, 40]"
  >
  </mgl-map>
  `,
  styles: [`
    mgl-map {
      height: 100%;
      width: 100%;
    }
  `]
})
export class DisplayMapComponent { }
```
