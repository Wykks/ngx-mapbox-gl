## mgl-map [Mapbox GL API](https://www.mapbox.com/mapbox-gl-js/api#map)

### Example

```typescript
...
@Component({
  template: `
  <mgl-map
    [style]="'mapbox://styles/mapbox/streets-v9'"
    [zoom]="[9]"
    [center]="[-74.50, 40]"
    (mapLoad)="map = $event"
  ></mgl-map>
  `,
...
})
export class DisplayMapComponent {
  map: Map; // Mapbox GL Map object (Mapbox is ran outside angular zone, keep that in mind when binding events from this object)
...
}
```

### Inputs

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
- **bounds**: [`LngLatBoundsLike`](https://www.mapbox.com/mapbox-gl-js/api/#lnglatboundslike) Use **fitBounds** if you want the dynamic version. Use **fitBoundsOptions** to specify bounds options.
- [ngx] **accessToken**: `string` https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
- [ngx] **customMapboxApiUrl**: `string` Change url of `mapbox://` (set config.API_URL)

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
- **maxBounds**: [`LngLatBoundsLike`](https://www.mapbox.com/mapbox-gl-js/api/#lnglatboundslike)
- **zoom**: `[number]` The initial zoom level of the map. If zoom is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **bearing**: `[number]` The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **pitch**: `[number]` The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-60). If pitch is not specified in the constructor options, Mapbox GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. [ngx] It's an array in order to be able to force changes (by changing the array ref) because this input can be desync after user manipulation on map.
- **fitBoundsOptions** https://www.mapbox.com/mapbox-gl-js/api/#map#fitbounds
- [ngx] **fitBounds**: [`LngLatBoundsLike`](https://www.mapbox.com/mapbox-gl-js/api/#lnglatboundslike) If set, the map will center on the given coordinates. Dynamic version of **bounds**.
- [ngx] **fitScreenCoordinates**: `[PointLike, PointLike]` https://www.mapbox.com/mapbox-gl-js/api/#map#fitscreencoordinates (use movingOptions as options)
- [ngx] **movingMethod**: `'jumpTo' | 'easeTo' | 'flyTo'` _(Default: `'flyTo'`)_ Define the method used when changing the center or zoom position.
- [ngx] **movingOptions** Options passed to the moving method (https://www.mapbox.com/mapbox-gl-js/api/#map#flyto https://www.mapbox.com/mapbox-gl-js/api/#map#easeto https://www.mapbox.com/mapbox-gl-js/api/#map#jumpto)
- [ngx] **panToOptions** Options passed to panTo (https://www.mapbox.com/mapbox-gl-js/api/#map#panto)
- [ngx] **centerWithPanTo**: `boolean` If set to true, then [panTo](https://www.mapbox.com/mapbox-gl-js/api/#map#panto) is used instead of the specified method in **movingMethod** (if only **center** is changed, see live-update-feature example)
- [ngx] **cursorStyle**: `string` change the cursor of the map canvas (`canvas.style.cursor`).

### Outputs

- **mapResize**: `void`
- **mapRemove**: `void`
- **mapMouseDown**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapMouseUp**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapMouseMove**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapClick**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapDblClick**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapMouseEnter**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapMouseLeave**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapMouseOver**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapMouseOut**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapContextMenu**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapTouchStart**: [`MapTouchEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent)
- **mapTouchEnd**: [`MapTouchEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent)
- **mapTouchMove**: [`MapTouchEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent)
- **mapTouchCancel**: [`MapTouchEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent)
- **mapWheel**: [`MapWheelEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapwheelevent)
- **moveStart**: [`DragEvent`](https://developer.mozilla.org/fr/docs/Web/API/DragEvent)
- **move**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent) `|` [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **moveEnd**: [`DragEvent`](https://developer.mozilla.org/fr/docs/Web/API/DragEvent)
- **mapDragStart**: [`DragEvent`](https://developer.mozilla.org/fr/docs/Web/API/DragEvent)
- **mapDrag**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent) `|` [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **mapDragEnd**: [`DragEvent`](https://developer.mozilla.org/fr/docs/Web/API/DragEvent)
- **zoomStart**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent) `|` [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **zoomEvt**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent) `|` [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **zoomEnd**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent) `|` [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **rotateStart**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent) `|` [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **rotate**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent) `|` [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **rotateEnd**: [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#maptouchevent) `|` [`MapMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **pitchStart**
- **pitchEvt**
- **pitchEnd**
- **boxZoomStart**: [`MapBoxZoomEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapboxzoomevent)
- **boxZoomEnd**: [`MapBoxZoomEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapboxzoomevent)
- **boxZoomCancel**: [`MapBoxZoomEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapboxzoomevent)
- **webGlContextLost**: `void`
- **webGlContextRestored**: `void`
- **mapLoad**: [`Map`](https://www.mapbox.com/mapbox-gl-js/api#map)
- **render**: `void`
- **mapError**
- **data**
- **styleData**
- **sourceData**
- **dataLoading**
- **styleDataLoading**
- **sourceDataLoading**

## mgl-layer [Mapbox GL style spec](https://www.mapbox.com/mapbox-gl-js/style-spec/#layers)

### Example

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
  ></mgl-layer>
</mgl-map>
```

### Inputs

Init only:

- **id**: `string` _(Required)_
- **source**: `string |`[`Source`](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources)
- **type**: `'symbol' | 'fill' | 'line' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap'` _(Required)_
- **metadata**: `any`
- **sourceLayer**: `string`

Dynamic:

- **filter**: `any[]`
- **layout**: [`Layout`](https://www.mapbox.com/mapbox-gl-js/style-spec/#layout-property)
- **paint**: [`Paint`](https://www.mapbox.com/mapbox-gl-js/style-spec/#paint-property)
- **minzoom**: `number`
- **maxzoom**: `number`
- [ngx] **before**: `string` The ID of an existing layer to insert the new layer before. If this argument is omitted, the layer will be appended to the end of the layers array. https://www.mapbox.com/mapbox-gl-js/api/#map#addlayer

### Outputs

- **layerClick**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerDblClick**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerMouseDown**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerMouseUp**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerMouseEnter**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerMouseLeave**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerMouseMove**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerMouseOver**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerMouseOut**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerContextMenu**: [`MapLayerMouseEvent`](https://www.mapbox.com/mapbox-gl-js/api/#mapmouseevent)
- **layerTouchStart**: [`MapLayerTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)
- **layerTouchEnd**: [`MapLayerTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)
- **layerTouchCancel**: [`MapLayerTouchEvent`](https://docs.mapbox.com/mapbox-gl-js/api/events/#maptouchevent)

## mgl-geojson-source [Mapbox GL style spec](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson)

### Example

```html
...
<mgl-map ...>
  <mgl-geojson-source id="symbols-source">
    <mgl-feature
      *ngFor="let geometry of geometries"
      [geometry]="geometry"
    ></mgl-feature>
  </mgl-geojson-source>
  ...
  <mgl-geojson-source
    id="earthquakes"
    [data]="earthquakes"
    [cluster]="true"
    [clusterMaxZoom]="14"
    [clusterRadius]="50"
  ></mgl-geojson-source>
</mgl-map>
```

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**data**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson-data): `GeoJSON.Feature | GeoJSON.FeatureCollection | string` A URL to a GeoJSON file (fastest, because mapbox-gl will download and parse the geojson in a web worker), or inline GeoJSON.
- [**maxzoom**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson-maxzoom): `number`
- [**buffer**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson-buffer): `number`
- [**tolerance**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson-tolerance): `number`
- [**generateId**](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson-generateId): `boolean`
- [**cluster**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson-cluster): `boolean`
- [**clusterRadius**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson-clusterRadius): `number`
- [**clusterMaxZoom**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson-clusterMaxZoom): `number`

## [ngx] mgl-feature (inside mgl-geojson-source only)

Init only:

- **id**: `number`
- **geometry**: `GeoJSON.GeometryObject` _(Required)_
- **properties**: `any`

## mgl-canvas-source [Mapbox GL style spec](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-canvas)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**coordinates**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-canvas-coordinates): `number[][]`
- [**canvas**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-canvas-canvas): `string`
- [**animate**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-canvas-animate): `boolean`

## mgl-image-source [Mapbox GL style spec](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-image)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-image-url): `string`
- [**coordinates**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-image-coordinates): `number[][]`

## mgl-raster-source [Mapbox GL style spec](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-raster)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-raster-url): `string`
- [**tiles**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-raster-tiles): `string[]`
- [**bounds**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-raster-bounds): `number[]`
- [**minzoom**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-raster-minzoom): `number`
- [**maxzoom**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-raster-maxzoom): `number`
- [**tileSize**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-raster-tileSize): `number`

## mgl-vector-source [Mapbox GL style spec](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-vector)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**url**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-vector-url): `string`
- [**tiles**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-vector-tiles): `string[][]`
- [**bounds**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-vector-bounds): `number[]`
- [**minzoom**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-vector-minzoom): `number`
- [**maxzoom**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-vector-maxzoom): `number`

## mgl-video-source [Mapbox GL style spec](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-video)

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- [**urls**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-video-urls): `string[]`
- [**coordinates**](https://www.mapbox.com/mapbox-gl-js/style-spec/#sources-video-coordinates): `number[][]`

## mgl-image [Mapbox GL API](https://www.mapbox.com/mapbox-gl-js/api#map#addimage)

### Example

```html
...
<mgl-map
  ...
>
   <mgl-image
     id="image"
     url="https://..."
     (imageLoaded)="imageLoaded = true"
   >
   ...
   <mgl-image
     id="image2"
     [data]="{
       width: 64,
       height: 64,
       data: imageData
     }"
   >
</mgl-map>
...
imageData: Uint8Array;
```

### Inputs

Init only:

- **id**: `string` _(Required)_

Dynamic:

- **data**: `HTMLImageElement | ImageData | { width: number, height: number, data: Uint8Array | Uint8ClampedArray }`
- **options**: `{ pixelRatio: number; sdf: boolean; }`
- [ngx] **url**: `string` If set, will call [loadImage](https://www.mapbox.com/mapbox-gl-js/api#map#loadimage) and then add the image directly. Don't forget to listen to `loaded`.

### Outputs

- [ngx] **imageLoaded**: `void` Only when using `url` input. You should use this to delay the display of a layer.
- [ngx] **imageError**: `{ status: number }` Only when using `url` input

## mgl-control

### Example

```html
...
<mgl-map ...>
  <mgl-control> Hello </mgl-control>
  ...
  <mgl-control mglNavigation></mgl-control>
  ...
  <mgl-control mglScale unit="imperial" position="top-right"></mgl-control>
</mgl-map>
```

### Inputs

Init only:

- **position**: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- [**mglAttribution**](https://www.mapbox.com/mapbox-gl-js/api#attributioncontrol) \* **compact**: `boolean`
- [**mglFullscreen**](https://www.mapbox.com/mapbox-gl-js/api/#fullscreencontrol)
- [**mglGeolocate**](https://www.mapbox.com/mapbox-gl-js/api/#geolocatecontrol)
  _ **positionOptions**: [`PositionOptions`](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)
  _ **fitBoundsOptions**: [`FitBoundsOptions`](https://www.mapbox.com/mapbox-gl-js/api/#map#fitbounds)
  _ **trackUserLocation**: `boolean`
  _ **showUserLocation**: `boolean`
- [**mglNavigation**](https://www.mapbox.com/mapbox-gl-js/api/#navigationcontrol)
  _ **showCompass**: `boolean`
  _ **showZoom**: `boolean`
- [**mglScale**](https://www.mapbox.com/mapbox-gl-js/api/#scalecontrol)
  _ **maxWidth**: `number`
  _ **unit**: `'imperial' | 'metric' | 'nautical'` (dynamic input)

## mgl-marker [Mapbox GL API](https://www.mapbox.com/mapbox-gl-js/api/#marker)

### Example

```html
...
<mgl-map ...>
  <mgl-marker [lngLat]="[-66.324462890625, -16.024695711685304]">
    <div (click)="alert('Foo')" class="marker">Hello</div>
  </mgl-marker>
</mgl-map>
```

Note: Only use this if you **really** need to use HTML/Angular component to render your symbol. These markers are slow compared to a `Layer` of symbol because they're not rendered using WebGL.

### Inputs

Init only:

- **offset**: [`PointLike`](https://www.mapbox.com/mapbox-gl-js/api/#pointlike)
- **anchor**: `'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- **pitchAlignment**: `map` | `viewport` | `auto`
- **rotationAlignment**: `map` | `viewport` | `auto`

Dynamic:

- **lngLat**: [`LngLatLike`](https://www.mapbox.com/mapbox-gl-js/api/#lnglatlike)
- **draggable**: `boolean`
- [ngx] **feature**: `GeoJSON.Feature<GeoJSON.Point>` Mutually exclusive with lngLat
- [ngx] **className** `string` Class name to aply to the container
- [ngx] **popupShown**: `boolean` Shows if the marker's popup is visible at the moment

### Outputs

- **markerDragStart**: [`Marker`](https://www.mapbox.com/mapbox-gl-js/api/#marker)
- **markerDrag**: [`Marker`](https://www.mapbox.com/mapbox-gl-js/api/#marker)
- **markerDragEnd**: [`Marker`](https://www.mapbox.com/mapbox-gl-js/api/#marker)

## mgl-popup [Mapbox GL API](https://www.mapbox.com/mapbox-gl-js/api/#popup)

### Example

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

### Inputs

Init only:

- **closeButton**: `boolean`
- **closeOnClick**: `boolean`
- **anchor**: `'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left'`
- **offset**: [`number |`[`PointLike`](https://www.mapbox.com/mapbox-gl-js/api/#pointlike)`| { [anchor: string]: [number, number] };`

Dynamic:

- **lngLat**: [`LngLatLike`](https://www.mapbox.com/mapbox-gl-js/api/#lnglatlike)
- [ngx] **marker**: `MarkerComponent` The targeted marker (will use https://www.mapbox.com/mapbox-gl-js/api/#marker#setpopup)
- [ngx] **feature**: `GeoJSON.Feature<GeoJSON.Point>` Mutually exclusive with lngLat

### Outputs

- **popupClose**: `void`
- **popupOpen**: `void`

## [ngx] mgl-markers-for-clusters

Requires a geojson source that is clustered - see above.

### Example

```html
...
<mgl-map ...>
  <mgl-markers-for-cluster [source]="myGeoJsonclusteredSource">
    <ng-template mglPoint let-feature> Marker! </ng-template>
    <ng-template mglClusterPoint let-feature>
      ClusterId: {{feature.properties?.cluster_id}}, Points:
      {{feature.properties?.point_count}}
    </ng-template>
  </mgl-markers-for-cluster>
</mgl-map>
```

Note: Only use this if you **really** need to use HTML/Angular component to render your symbols. This is **slower** than rendering symbols in WebGL.

### Inputs

Init only:

- **source**: `string | Source`
