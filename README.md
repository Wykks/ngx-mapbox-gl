# ngx-mapbox-gl

[![Build Status](https://travis-ci.org/Wykks/ngx-mapbox-gl.svg?branch=master)](https://travis-ci.org/Wykks/ngx-mapbox-gl)
[![npm version](https://img.shields.io/npm/v/ngx-mapbox-gl.svg?style=flat)](https://www.npmjs.com/package/ngx-mapbox-gl)

Angular (5+) wrapper for [mapbox-gl-js](https://www.mapbox.com/mapbox-gl-js/api/). Expose a bunch of component meant to be simple to use for Angular.

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
npm install ngx-mapbox-gl mapbox-gl --save
```
Also add mapbox-gl types if using typescript
```
npm install @types/mapbox-gl --save-dev
```

Load the css of mapbox-gl (and mapbox-gl-geocoder if mglGeocoder is used)

For example, with angular-cli add this in .angular-cli.json
```json
"styles": [
        ...
        "../node_modules/mapbox-gl/dist/mapbox-gl.css",
        "../node_modules/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css"
      ],
```
Or in global css 
```css
@import "~mapbox-gl/dist/mapbox-gl.css";
@import "~@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";
```


Then, in your app's main module (or in any other module), import the NgxMapboxGLModule
```typescript
...
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  imports: [
    ...
    NgxMapboxGLModule.forRoot({
      accessToken: 'TOKEN', // Can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'TOKEN' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ]
})
export class AppModule {}
```

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

## Important notes for **production** build

### @angular/cli users:

\>= 1.5.5 version is required (https://github.com/angular/angular-cli/issues/5804)

< 1.5.5 version users can use this patch: https://github.com/angular/angular-cli/pull/7931 (available in this repo as ngcli-comparisons-false.patch)

### Webpack users:

Add `noParse: /(mapbox-gl)\.js$/`

## Built with ngx-mapbox-gl
Todo
