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
    (<any>MapboxGl).accessToken = accessToken;
    (<any>MapboxGl).config.customMapboxApiUrl = customMapboxApiUrl;
    return new MapboxGl.Map(options);
  }
}
