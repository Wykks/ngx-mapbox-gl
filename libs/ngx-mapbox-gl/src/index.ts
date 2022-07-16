/*
 * Public API Surface of ngx-mapbox-gl
 */

// Expose NgxMapboxGlModule and GeocoderControlDirective provided injection tokens
export * from './lib/control/attribution-control.directive';
// Expose control component to allow custom directives
export * from './lib/control/control.component';
export * from './lib/control/fullscreen-control.directive';
export * from './lib/control/geolocate-control.directive';
export * from './lib/control/navigation-control.directive';
export * from './lib/control/scale-control.directive';
export * from './lib/draggable/draggable.directive';
export * from './lib/image/image.component';
export * from './lib/layer/layer.component';
export * from './lib/map/map.component';
// Expose MapService for ngx-mapbox-gl extensions
export * from './lib/map/map.service';
export * from './lib/map/map.types';
export * from './lib/marker/marker.component';
export * from './lib/markers-for-clusters/markers-for-clusters.component';
export * from './lib/ngx-mapbox-gl.module';
export * from './lib/popup/popup.component';
export * from './lib/source/canvas-source.component';
export * from './lib/source/geojson/feature.component';
// Expose GeoJSONSourceComponent to access cluster functions
export * from './lib/source/geojson/geojson-source.component';
export * from './lib/source/image-source.component';
export * from './lib/source/raster-dem-source.component';
export * from './lib/source/raster-source.component';
export * from './lib/source/vector-source.component';
export * from './lib/source/video-source.component';
// Expose deprecation warning
export * from './lib/utils';


