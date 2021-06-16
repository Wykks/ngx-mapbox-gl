# ngx-maplibre-gl

[![npm version](https://img.shields.io/npm/v/ngx-maplibre-gl.svg?style=flat)](https://www.npmjs.com/package/ngx-maplibre-gl)

Angular wrapper for [maplibre-gl](https://www.maplibre.org/). It exposes a bunch of components meant to be simple to use with Angular.

This is a fork of [ngx-mapbox-gl](https://github.com/Wykks/ngx-mapbox-gl) and I would like to thank the maintainers there for thier amazing work to build this up. It's truely a great piece of sotware!

Include the following components:

- [mgl-map](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-map-mapbox-gl-api)
- [mgl-layer](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-layer-mapbox-gl-style-spec)
- [mgl-geojson-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-geojson-source-mapbox-gl-style-spec)
- [mgl-canvas-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-canvas-source-mapbox-gl-style-spec)
- [mgl-image-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-image-source-mapbox-gl-style-spec)
- [mgl-raster-dem-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-raster-dem-source-mapbox-gl-style-spec)
- [mgl-raster-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-raster-source-mapbox-gl-style-spec)
- [mgl-vector-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-vector-source-mapbox-gl-style-spec)
- [mgl-video-source](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-video-source-mapbox-gl-style-spec)
- [mgl-image](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-image-mapbox-gl-api)
- [mgl-control](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-control) with builtin control:
  - mglScale
  - mglFullscreen
  - mglAttribution
  - mglGeolocate
  - mglNavigation
- [mgl-marker](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-marker-mapbox-gl-api)
- [mgl-popup](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#mgl-popup-mapbox-gl-api)
- [mgl-marker-cluster](https://github.com/Wykks/ngx-mapbox-gl/wiki/API-Documentation#ngx-mgl-marker-cluster-supercluster-api)

## How to start

```
npm install ngx-maplibre-gl maplibre-gl
yarn add ngx-maplibre-gl maplibre-gl
```

Load the CSS of `maplibre-gl`

For example, with _angular-cli_ add this in `angular.json`:

```json
"styles": [
        ...
        "./node_modules/maplibre-gl/dist/maplibre-gl.css"
      ],
```

Or in the global CSS file (called `styles.css` for example in _angular-cli_):

```css
@import '~maplibre-gl/dist/maplibre-gl.css';
```

Add this in your polyfill.ts file (https://github.com/Wykks/ngx-mapbox-gl/issues/136#issuecomment-496224634):

```
(window as any).global = window;
```

Then, in your app's main module (or in any other module), import the `NgxMapboxGLModule`:

```ts
...
import { NgxMapLibreGLModule } from 'ngx-maplibre-gl';

@NgModule({
  imports: [
    ...
    NgxMapLibreGLModule
  ]
})
export class AppModule {}
```

Display a map:

```ts
import { Component } from '@angular/core';

@Component({
  template: `
    <mgl-map
      [style]="'https://demotiles.maplibre.org/style.json'"
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
