# ngx-maplibre-gl

[![npm version](https://img.shields.io/npm/v/ngx-maplibre-gl.svg?style=flat)](https://www.npmjs.com/package/ngx-maplibre-gl)

Angular wrapper for [maplibre-gl](https://www.maplibre.org/). It exposes a bunch of components meant to be simple to use with Angular.

### Demo site 
Can be found here (based on the generated gh-pages in this repo):
https://maplibre.org/ngx-maplibre-gl/

### Attribution

This is a fork of [ngx-mapbox-gl](https://github.com/Wykks/ngx-mapbox-gl) and I would like to thank the maintainers there for thier amazing work to build this up. It's truely a great piece of sotware!

### Components

- [mgl-map](docs/API.md#mgl-map-mapbox-gl-api)
- [mgl-layer](docs/API.md#mgl-layer-mapbox-gl-style-spec)
- [mgl-geojson-source](docs/API.md#mgl-geojson-source-mapbox-gl-style-spec)
- [mgl-canvas-source](docs/API.md#mgl-canvas-source-mapbox-gl-style-spec)
- [mgl-image-source](docs/API.md#mgl-image-source-mapbox-gl-style-spec)
- [mgl-raster-dem-source](docs/API.md#mgl-raster-dem-source-mapbox-gl-style-spec)
- [mgl-raster-source](docs/API.md#mgl-raster-source-mapbox-gl-style-spec)
- [mgl-vector-source](docs/API.md#mgl-vector-source-mapbox-gl-style-spec)
- [mgl-video-source](docs/API.md#mgl-video-source-mapbox-gl-style-spec)
- [mgl-image](docs/API.md#mgl-image-mapbox-gl-api)
- [mgl-control](docs/API.md#mgl-control) with builtin control:
  - mglScale
  - mglFullscreen
  - mglAttribution
  - mglGeolocate
  - mglNavigation
- [mgl-marker](docs/API.md#mgl-marker-mapbox-gl-api)
- [mgl-popup](docs/API.md#mgl-popup-mapbox-gl-api)
- [mgl-marker-cluster](docs/API.md#ngx-mgl-marker-cluster-supercluster-api)

## How to start

```
npm install ngx-maplibre-gl maplibre-gl @types/geojson
yarn add ngx-maplibre-gl maplibre-gl @types/geojson
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
