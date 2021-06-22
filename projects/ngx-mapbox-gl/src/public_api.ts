/*
 * Public API Surface of ngx-mapbox-gl
 */

// Expose NgxMapboxGlModule and GeocoderControlDirective provided injection tokens
export * from './lib/ngx-mapbox-gl.module';

// Expose control component to allow custom directives
export * from './lib/control/control.component';

// Expose MapService for ngx-mapbox-gl extensions
export * from './lib/map/map.service';
export * from './lib/map/map.component';

// Expose GeoJSONSourceComponent to access cluster functions
export * from './lib/source/geojson/geojson-source.component';

export * from './lib/map/map.types';

// Expose deprecation warning
export * from './lib/utils';
