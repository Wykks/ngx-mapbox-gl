# mgl-map [Mapbox GL API](https://docs.mapbox.com/mapbox-gl-js/api/map/)

## Example

```typescript
...
@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="[9]"
    [center]="[-74.50, 40]"
    (mapCreate)="map = $event"
  />
  `,
...
})
export class DisplayMapComponent {
  map: Map; // Mapbox GL Map object (Mapbox is ran outside angular zone, keep that in mind when binding events from this object)
...
}
```

## Inputs

Init only:

- **hash**: `boolean`
- **refreshExpiredTiles**: `boolean`
- **failIfMajorPerformanceCaveat**: `boolean`
- **classes**: `string[]`
- **bearingSnap**: `number`
- **interactive**: `boolean`
- **pitchWithRotate**: `boolean`
- **attributionControl**: `boolean`
- **logoPosition**: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- **maxTileCacheSize**: `number`
- **localIdeographFontFamily**: `string`
- **preserveDrawingBuffer**: `boolean`
- **renderWorldCopies**: `boolean`
- **trackResize**: `boolean`
- **transformRequest**: `Function`
- **cooperativeGestures**: `boolean`
- **bounds**: [`LngLatBoundsLike`](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike) Use **fitBounds** if you want the dynamic version. Use **fitBoundsOptions** to specify bounds options.
- [ngx] **accessToken**: `string` https://docs.mapbox.com/mapbox-gl-js/api/properties/#accesstoken

Dynamic:

- **minZoom**: `number`
- **maxZoom**: `number`
- **scrollZoom**: `boolean`
- **dragRotate**: `boolean`
- **touchZoomRotate**: `boolean`
- **doubleClickZoom**: `boolean`
- **keyboard**: `boolean`
- **dragPan**: `boolean`
- **boxZoom**: `boolean`
- **style**: `Style | string`
- **center**: `LngLatLike`
- **maxBounds**: [`LngLatBoundsLike`](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike)
- **zoom**: `[number]` The initial zoom level of the map. If zoom is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **bearing**: `[number]` The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **pitch**: `[number]` The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-60). If pitch is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **fitBoundsOptions** https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitbounds
- **projection** https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setprojection
- [ngx] **fitBounds**: [`LngLatBoundsLike`](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike) If set, the map will center on the given coordinates. Dynamic version of **bounds**.
- [ngx] **fitScreenCoordinates**: `[PointLike, PointLike]` https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitscreencoordinates (use movingOptions as options)
- [ngx] **movingMethod**: `'jumpTo' | 'easeTo' | 'flyTo'` _(Default: `'flyTo'`)_ Define the method used when changing the center or zoom position.
- [ngx] **movingOptions** Options passed to the moving method (https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto https://docs.mapbox.com/mapbox-gl-js/api/map/#map#easeto https://docs.mapbox.com/mapbox-gl-js/api/map/#map#jumpto)
- [ngx] **panToOptions** Options passed to panTo (https://docs.mapbox.com/mapbox-gl-js/api/map/#map#panto)
- [ngx] **centerWithPanTo**: `boolean` If set to true, then [panTo](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#panto) is used instead of the specified method in **movingMethod** (if only **center** is changed, see live-update-feature example)
- [ngx] **cursorStyle**: `string` change the cursor of the map canvas (`canvas.style.cursor`).

## Outputs

- **mapResize**: `void`
- **mapRemove**: `void`
- **mapMouseDown**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mouseUp**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapMouseMove**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapClick**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapDblClick**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapMouseEnter**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapMouseOver**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapMouseOut**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapContextMenu**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapTouchStart**: [`MapTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)
- **mapTouchEnd**: [`MapTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)
- **mapTouchMove**: [`MapTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)
- **mapTouchCancel**: [`MapTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)
- **mapWheel**: [`MapWheelEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapwheelevent)
- **moveStart**: [`DragEvent`](https://developer.mozilla.org/fr/docs/Web/API/DragEvent)
- **move**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent) `|` [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **moveEnd**: [`DragEvent`](https://developer.mozilla.org/fr/docs/Web/API/DragEvent)
- **mapDragStart**: [`DragEvent`](https://developer.mozilla.org/fr/docs/Web/API/DragEvent)
- **mapDrag**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent) `|` [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **mapDragEnd**: [`DragEvent`](https://developer.mozilla.org/fr/docs/Web/API/DragEvent)
- **zoomStart**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent) `|` [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **zoomEvt**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent) `|` [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **zoomEnd**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent) `|` [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **rotateStart**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent) `|` [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **rotate**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent) `|` [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **rotateEnd**: [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent) `|` [`MapMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **pitchStart**
- **pitchEvt**
- **pitchEnd**
- **boxZoomStart**: [`MapBoxZoomEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapboxzoomevent)
- **boxZoomEnd**: [`MapBoxZoomEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapboxzoomevent)
- **boxZoomCancel**: [`MapBoxZoomEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapboxzoomevent)
- **webGlContextLost**: `void`
- **webGlContextRestored**: `void`
- **mapLoad**: [`MapBoxEvent`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:load) Fired immediately after all necessary resources have been downloaded and the first visually complete rendering of the map has occurred.
- [ngx] **mapCreate**: [`Map`](https://docs.mapbox.com/mapbox-gl-js/api/map/) Fired after the mapbox gl object is created
- **render**: `void`
- **mapError**
- **data**
- **styleData**
- **sourceData**
- **dataLoading**
- **styleDataLoading**
- **sourceDataLoading**

# mgl-layer [Mapbox GL style spec](https://docs.mapbox.com/style-spec/reference/layers/)

## Example

```html
...
<mgl-map ...>
  <mgl-layer
    id="state-borders"
    type="line"
    [source]="states"
    [paint]="{
      'line-color': '#627BC1',
      'line-width': 2
    }"
  />
</mgl-map>
```

## Inputs

Init only:

- **id**: `string` _(Required)_
- **source**: `string | `[`Source`](https://docs.mapbox.com/style-spec/reference/sources/)
- **type**: `'symbol' | 'fill' | 'line' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap'` _(Required)_
- **metadata**: `any`
- **sourceLayer**: `string`

Dynamic:

- **filter**: `any[]`
- **layout**: [`Layout`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layout-property)
- **paint**: [`Paint`](https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-property)
- **minzoom**: `number`
- **maxzoom**: `number`
- [ngx] **before**: `string` The ID of an existing layer to insert the new layer before. If this argument is omitted, the layer will be appended to the end of the layers array. https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addlayer

## Outputs

- **layerClick**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maplayermouseevent)
- **layerDblClick**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maplayermouseevent)
- **layerMouseDown**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maplayermouseevent)
- **layerMouseUp**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maplayermouseevent)
- **layerMouseEnter**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maplayermouseevent)
- **layerMouseLeave**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maplayermouseevent)
- **layerMouseMove**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **layerMouseOver**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **layerMouseOut**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **layerContextMenu**: [`MapLayerMouseEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent)
- **layerTouchStart**: [`MapLayerTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)
- **layerTouchEnd**: [`MapLayerTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)
- **layerTouchCancel**: [`MapLayerTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)

# mgl-geojson-source [Mapbox GL style spec](https://docs.mapbox.com/style-spec/reference/sources/#geojson)

## Example

```html
...
<mgl-map ...>
  <mgl-geojson-source id="symbols-source">
    <mgl-feature *ngFor="let geometry of geometries" [geometry]="geometry" />
  </mgl-geojson-source>
  ...
  <mgl-geojson-source id="earthquakes" [data]="earthquakes" [cluster]="true" [clusterMaxZoom]="14" [clusterRadius]="50" />
</mgl-map>
```

## Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**data**](https://docs.mapbox.com/style-spec/reference/sources/#geojson-data): `GeoJSON.Feature | GeoJSON.FeatureCollection | string` A URL to a GeoJSON file (fastest, because mapbox-gl will download and parse the geojson in a web worker), or inline GeoJSON.
- [**maxzoom**](https://docs.mapbox.com/style-spec/reference/sources/#geojson-maxzoom): `number`
- [**buffer**](https://docs.mapbox.com/style-spec/reference/sources/#geojson-buffer): `number`
- [**tolerance**](https://docs.mapbox.com/style-spec/reference/sources/#geojson-tolerance): `number`
- [**generateId**](https://docs.mapbox.com/style-spec/reference/sources/#geojson-generateId): `boolean`
- [**cluster**](https://docs.mapbox.com/style-spec/reference/sources/#geojson-cluster): `boolean`
- [**clusterRadius**](https://docs.mapbox.com/style-spec/reference/sources/#geojson-clusterRadius): `number`
- [**clusterMaxZoom**](https://docs.mapbox.com/style-spec/reference/sources/#geojson-clusterMaxZoom): `number`

# [ngx] mgl-feature (inside mgl-geojson-source only)

Init only:

- **id**: `number`
- **geometry**: `GeoJSON.GeometryObject` _(Required)_
- **properties**: `any`

# mgl-canvas-source [Mapbox GL api](https://docs.mapbox.com/mapbox-gl-js/api/sources/#canvassource)

## Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**coordinates**](https://docs.mapbox.com/style-spec/reference/sources/#canvas-coordinates): `number[][]`
- [**canvas**](https://docs.mapbox.com/style-spec/reference/sources/#canvas-canvas): `string`
- [**animate**](https://docs.mapbox.com/style-spec/reference/sources/#canvas-animate): `boolean`

# mgl-image-source [Mapbox GL style spec](https://docs.mapbox.com/style-spec/reference/sources/#image)

## Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://docs.mapbox.com/style-spec/reference/sources/#image-url): `string`
- [**coordinates**](https://docs.mapbox.com/style-spec/reference/sources/#image-coordinates): `number[][]`

# mgl-raster-source [Mapbox GL style spec](https://docs.mapbox.com/style-spec/reference/sources/#raster)

## Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://docs.mapbox.com/style-spec/reference/sources/#raster-url): `string`
- [**tiles**](https://docs.mapbox.com/style-spec/reference/sources/#raster-tiles): `string[]`
- [**bounds**](https://docs.mapbox.com/style-spec/reference/sources/#raster-bounds): `number[]`
- [**minzoom**](https://docs.mapbox.com/style-spec/reference/sources/#raster-minzoom): `number`
- [**maxzoom**](https://docs.mapbox.com/style-spec/reference/sources/#raster-maxzoom): `number`
- [**tileSize**](https://docs.mapbox.com/style-spec/reference/sources/#raster-tileSize): `number`
- [**scheme**](https://docs.mapbox.com/style-spec/reference/sources/#raster-scheme): `'xyz' | 'tms'`
- [**attribution**](https://docs.mapbox.com/style-spec/reference/sources/#raster-attribution): `string`
- [**volatile**](https://docs.mapbox.com/style-spec/reference/sources/#raster-volatile): `boolean`

# mgl-vector-source [Mapbox GL style spec](https://docs.mapbox.com/style-spec/reference/sources/#vector)

## Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://docs.mapbox.com/style-spec/reference/sources/#vector-url): `string`
- [**tiles**](https://docs.mapbox.com/style-spec/reference/sources/#vector-tiles): `string[][]`
- [**bounds**](https://docs.mapbox.com/style-spec/reference/sources/#vector-bounds): `number[]`
- [**minzoom**](https://docs.mapbox.com/style-spec/reference/sources/#vector-minzoom): `number`
- [**maxzoom**](https://docs.mapbox.com/style-spec/reference/sources/#vector-maxzoom): `number`

# mgl-video-source [Mapbox GL style spec](https://docs.mapbox.com/style-spec/reference/sources/#video)

## Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**urls**](https://docs.mapbox.com/style-spec/reference/sources/#video-urls): `string[]`
- [**coordinates**](https://docs.mapbox.com/style-spec/reference/sources/#video-coordinates): `number[][]`

# mgl-image [Mapbox GL API](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addimage)

## Example

```html
...
<mgl-map ...>
  <mgl-image id="image" url="https://..." (loaded)="imageLoaded = true" />
  ...
  <mgl-image
    id="image2"
    [data]="{
      width: 64,
      height: 64,
      data: imageData
    }"
  />
</mgl-map>
... imageData: Uint8Array;
```

## Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- **data**: `HTMLImageElement | ImageData | { width: number, height: number, data: Uint8Array | Uint8ClampedArray }`
- **options**: `{ pixelRatio: number; sdf: boolean; }`
- [ngx] **url**: `string` If set, will call [loadImage](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#loadimage) and then add the image directly. Don't forget to listen to `loaded`.

## Outputs

- [ngx] **imageLoaded**: `void` Only when using `url` input. You should use this to delay the display of a layer.
- [ngx] **imageError**: `{ status: number }` Only when using `url` input

# mgl-control

## Example

```html
...
<mgl-map ...>
  <mgl-control>Hello</mgl-control>
  ...
  <mgl-control mglNavigation />
  ...
  <mgl-control mglScale unit="imperial" position="top-right" />
</mgl-map>
```

## Inputs

Init only:

- **position**: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- [**mglAttribution**](https://docs.mapbox.com/mapbox-gl-js/api/markers/#attributioncontrol)
  - **compact**: `boolean`
- [**mglFullscreen**](https://docs.mapbox.com/mapbox-gl-js/api/markers/#fullscreencontrol)
- [**mglGeolocate**](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol)
  - **positionOptions**: [`PositionOptions`](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)
  - **fitBoundsOptions**: [`FitBoundsOptions`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitbounds)
  - **trackUserLocation**: `boolean`
  - **showUserLocation**: `boolean`
- [**mglNavigation**](https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol)
  - **showCompass**: `boolean`
  - **showZoom**: `boolean`
- [**mglScale**](https://docs.mapbox.com/mapbox-gl-js/api/markers/#scalecontrol)
  - **maxWidth**: `number`
  - **unit**: `'imperial' | 'metric' | 'nautical'` (dynamic input)

# mgl-marker [Mapbox GL API](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)

## Example

```html
...
<mgl-map ...>
  <mgl-marker [lngLat]="[-66.324462890625, -16.024695711685304]">
    <div (click)="alert('Foo')" class="marker">Hello</div>
  </mgl-marker>
</mgl-map>
```

Note: Only use this if you **really** need to use HTML/Angular component to render your symbol. These markers are slow compared to a `Layer` of symbol because they're not rendered using WebGL.

## Inputs

Init only:

- **offset**: [`PointLike`](https://docs.mapbox.com/mapbox-gl-js/api/geography/#pointlike)
- **anchor**: `'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- **pitchAlignment**: `map` | `viewport` | `auto`
- **rotationAlignment**: `map` | `viewport` | `auto`

Dynamic:

- **lngLat**: [`LngLatLike`](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatlike)
- **draggable**: `boolean`
- [ngx] **feature**: `GeoJSON.Feature<GeoJSON.Point>` Mutually exclusive with lngLat
- [ngx] **className** `string` Class name to aply to the container
- [ngx] **popupShown**: `boolean` Shows if the marker's popup is visible at the moment

## Outputs

- **markerDragStart**: [`Marker`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)
- **markerDrag**: [`Marker`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)
- **markerDragEnd**: [`Marker`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)

# mgl-popup [Mapbox GL API](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)

## Example

```html
...
<mgl-map ...>
  <mgl-popup [lngLat]="[-96, 37.8]" [closeOnClick]="false">
    <h1>Hello world !</h1>
  </mgl-popup>
  ...
  <mgl-marker #myMarker ...> ... </mgl-marker>
  <mgl-popup [marker]="myMarker"> Hello from marker ! </mgl-popup>
</mgl-map>
```

## Inputs

Init only:

- **closeButton**: `boolean`
- **closeOnClick**: `boolean`
- **closeOnMove**: `boolean`
- **focusAfterOpen**: `boolean`
- **anchor**: `'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left'`
- **offset**: [`number | `[`PointLike`](https://docs.mapbox.com/mapbox-gl-js/api/geography/#pointlike)`| { [anchor: string]: [number, number] };`

Dynamic:

- **lngLat**: [`LngLatLike`](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatlike)
- [ngx] **marker**: `MarkerComponent` The targeted marker (will use https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker#setpopup)
- [ngx] **feature**: `GeoJSON.Feature<GeoJSON.Point>` Mutually exclusive with lngLat

## Outputs

- **popupClose**: `void`
- **popupOpen**: `void`

# [ngx] mgl-markers-for-clusters

Requires a geojson source that is clustered - see above. This replaced mgl-marker-cluster that was used in version 3.x.

## Example

```html
...
<mgl-map ...>
  <mgl-markers-for-cluster [source]="myGeoJsonclusteredSource">
    <ng-template mglPoint let-feature> Marker! </ng-template>
    <ng-template mglClusterPoint let-feature> ClusterId: {{feature.properties?.cluster_id}}, Points: {{feature.properties?.point_count}} </ng-template>
  </mgl-markers-for-cluster>
</mgl-map>
```

Note: Only use this if you **really** need to use HTML/Angular component to render your symbols. This is **slower** than the native cluster system that can be used using a clustered source and styling layers.

## Inputs

Init only:

- **source**: `string | Source`

Dynamic:

- **customPointIdKey**: `string` mgl-markers-for-clusters tracks unique points by feature.id, but in case feature.id is not available, you can provide a custom key (which will be read at feature.properties[customPointIdKey]).
