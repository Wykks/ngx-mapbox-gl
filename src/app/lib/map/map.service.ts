import { EventEmitter, Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

export interface MapEvents {
  load: EventEmitter<void>;
}

export interface SetupOptions {
  accessToken?: string;
  customMapboxApiUrl?: string;
  mapOptions: MapboxGl.MapboxOptions;
  mapEvents: MapEvents;
}

@Injectable()
export class MapService {
  mapInstance: MapboxGl.Map;

  constructor(
    @Optional() @Inject(MAPBOX_API_KEY) private readonly MAPBOX_API_KEY: string
  ) { }

  setup(options: SetupOptions) {
    // Workaround rollup issue
    this.assign(MapboxGl, 'accessToken', options.accessToken || this.MAPBOX_API_KEY);
    this.assign(MapboxGl, 'config.customMapboxApiUrl', options.customMapboxApiUrl);
    this.createMap(options.mapOptions);
    this.hookEvents(options.mapEvents);
    return this.mapInstance;
  }

  updateMinZoom(minZoom: number) {
    this.mapInstance.setMinZoom(minZoom);
  }

  addLayer(layer: MapboxGl.Layer, before?: string) {
    Object.keys(layer)
      .forEach((key: keyof MapboxGl.Layer) =>
      layer[key] === undefined && delete layer[key]);
    this.mapInstance.addLayer(layer, before);
  }

  removeLayer(layerId: string) {
    this.mapInstance.removeLayer(layerId);
  }

  setAllPaintProperty(
    layerId: string,
    paint: MapboxGl.BackgroundPaint | MapboxGl.FillPaint | MapboxGl.FillExtrusionPaint | MapboxGl.LinePaint | MapboxGl.SymbolPaint | MapboxGl.RasterPaint | MapboxGl.CirclePaint
  ) {
    Object.keys(paint).forEach((key) => {
      // TODO Check for perf, setPaintProperty only on changed paint props maybe
      this.mapInstance.setPaintProperty(layerId, key, (<any>paint)[key]);
    });
  }

  private createMap(options: MapboxGl.MapboxOptions) {
    Object.keys(options)
      .forEach((key: keyof MapboxGl.MapboxOptions) =>
        options[key] === undefined && delete options[key]);
    this.mapInstance = new MapboxGl.Map(options);
  }

  private hookEvents(events: MapEvents) {
    this.mapInstance.on('load', () => events.load.emit());
  }

  // TODO move this elsewhere
  private assign(obj: any, prop: any, value: any) {
    if (typeof prop === 'string') {
      // tslint:disable-next-line:no-parameter-reassignment
      prop = prop.split('.');
    }
    if (prop.length > 1) {
      const e = prop.shift();
      this.assign(obj[e] =
        Object.prototype.toString.call(obj[e]) === '[object Object]'
          ? obj[e]
          : {},
        prop,
        value);
    } else {
      obj[prop[0]] = value;
    }
  }
}
