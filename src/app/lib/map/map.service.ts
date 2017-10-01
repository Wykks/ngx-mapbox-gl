import { Injectable } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor() { }

  setup(
    accessToken: string,
    options: MapboxGl.MapboxOptions,
    customMapboxApiUrl?: string
  ) {
    // Workaround rollup issue
    this.assign(MapboxGl, 'accessToken', accessToken);
    this.assign(MapboxGl, 'config.customMapboxApiUrl', customMapboxApiUrl);
    return new MapboxGl.Map(options);
  }

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
