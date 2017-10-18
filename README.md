# ngx-mapbox-gl [Doc](docs/API.md)

! WORK IN PROGRESS !
[![Build Status](https://travis-ci.org/Wykks/ngx-mapbox-gl.svg?branch=master)](https://travis-ci.org/Wykks/ngx-mapbox-gl)
[![npm version](https://img.shields.io/npm/v/@ngx-mapbox-gl/core.svg?style=flat)](https://www.npmjs.com/package/@ngx-mapbox-gl/core)

Angular (2+) wrapper for [mapbox-gl-js](https://www.mapbox.com/mapbox-gl-js/api/). Expose a bunch of component meant to be simple to use for Angular.

Include the following components:
- mgl-map
- mgl-image
- mgl-layer
- mgl-geojson-source
- mgl-canvas-source
- mgl-image-source
- mgl-raster-source
- mgl-vector-source
- mgl-video-source
- mgl-control with builtin control:
  - mglScale
  - mglFullscren
  - mglAttribution
  - mglGeolocate
  - mglNavigation
- mgl-marker
- mgl-popup

## How to start

```javascript
npm install @ngx-mapbox-gl/core mapbox-gl --save
```

Then, in your app's main module (or in any other module), import the NgxMapboxGLModule
```typescript
...
import { NgxMapboxGLModule } from '@ngx-mapbox-gl/core';

@NgModule({
  imports: [
    ...
    NgxMapboxGLModule.forRoot({
      accessToken: 'TOKEN' // accessToken can also be set per map (accessToken input of mgl-map)
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
    [zoom]="9"
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

## Built with ngx-mapbox-gl
Todo
