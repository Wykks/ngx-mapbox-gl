# ngx-mapbox-gl

[![npm version](https://img.shields.io/npm/v/ngx-mapbox-gl.svg?style=flat)](https://www.npmjs.com/package/ngx-mapbox-gl)

Angular wrapper for [mapbox-gl-js](https://www.mapbox.com/mapbox-gl-js/api/). It exposes a bunch of components meant to be simple to use with Angular.

v1.X : Angular 5 & 6 (rxjs 5)

v2.X : Angular 6 & 7 (rxjs 6)

v3.X : Angular 7.2

v4.X : Angular 8 - 10 (rxjs >= 6.5)

v5.X - 6.X : Angular 9 - 11 (rxjs >= 6.5)

v7.X : Angular 12 (rxjs >= 6.6)

v8.X : Angular 13

v9.X : Angular 14

v10.X : Angular 16 - 17

v11.X : Angular 18

Include the following components:

- [mgl-map](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-map)
- [mgl-layer](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-layer)
- [mgl-geojson-source](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-geojson-source)
- [mgl-canvas-source](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-canvas-source)
- [mgl-image-source](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-image-source)
- mgl-raster-dem-source
- [mgl-raster-source](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-raster-source)
- [mgl-vector-source](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-vector-source)
- [mgl-video-source](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-video-source)
- [mgl-image](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-image)
- [mgl-control](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-control) with builtin control:
  - mglScale
  - mglFullscreen
  - mglAttribution
  - mglGeolocate
  - mglNavigation
- [mgl-marker](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-marker)
- [mgl-popup](https://wykks.github.io/ngx-mapbox-gl/doc#mgl-popup)
- [mgl-markers-for-clusters](https://wykks.github.io/ngx-mapbox-gl/doc#-ngx-mgl-markers-for-clusters)

(Documentation here: https://wykks.github.io/ngx-mapbox-gl/doc)

## How to start

```
npm install ngx-mapbox-gl mapbox-gl
yarn add ngx-mapbox-gl mapbox-gl
```


Load the CSS of `mapbox-gl`

For example, with _angular-cli_ add this in `angular.json`:

```json
"styles": [
        ...
        "mapbox-gl/dist/mapbox-gl.css"
      ],
```

Or in the global CSS file (called `styles.css` for example in _angular-cli_):

```css
@import '~mapbox-gl/dist/mapbox-gl.css';
```

Then, in your app's main module (or in any other module), import the `NgxMapboxGLModule`:

```ts
...
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  imports: [
    ...
    NgxMapboxGLModule.withConfig({
      accessToken: 'TOKEN', // Optional, can also be set per map (accessToken input of mgl-map)
    })
  ]
})
export class AppModule {}
```

How to get a Mapbox token: https://www.mapbox.com/help/how-access-tokens-work/

Note: `mapbox-gl` cannot work without a token anymore.
If you want to keep using their services then make a free account, generate a new token for your application and use it inside your project.

Display a map:

```ts
import { Component } from '@angular/core';

@Component({
  template: `
    <mgl-map
      [style]="'mapbox://styles/mapbox/streets-v9'"
      [zoom]="[9]"
      [center]="[-74.5, 40]"
    >
    </mgl-map>
  `,
  styles: [
    `
      mgl-map {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class DisplayMapComponent {}
```
