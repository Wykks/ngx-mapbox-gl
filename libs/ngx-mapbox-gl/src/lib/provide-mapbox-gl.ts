import { MAPBOX_API_KEY } from './map/map.service';

export function provideMapboxGL(config: { accessToken: string }) {
  return {
    provide: MAPBOX_API_KEY,
    useValue: config.accessToken,
  };
}
