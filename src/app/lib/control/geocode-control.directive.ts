import {
  Directive,
  Host,
  Input,
  OnInit,
  Optional,
  Inject,
  InjectionToken
} from '@angular/core';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import { Control, GeoJSONGeometry } from 'mapbox-gl';
declare var require: any;
const MapboxGeocoder = require('@mapbox/mapbox-gl-Geocoder');

interface Proximity {
  latitude: number;
  longitude: number;
}

type country = string;
type placeholder = string;
type zoom = number;
type bbox = [number, number, number, number];
type types = string;
type flyTo = boolean;
type accessToken = string;

interface GeocoderControlOptions extends Partial<Control> {
  proximity?: Proximity;
  country?: country;
  placeholder?: placeholder;
  zoom?: zoom;
  bbox?: bbox;
  types?: types;
  flyTo?: flyTo;
  accessToken: accessToken;
}

export interface GeocoderControlResult extends GeoJSON.Feature<GeoJSONGeometry> {
  address: string;
  text: string;
  place_name: string;
  relevance: number;
  center: [number, number];
  context: any[];
}

export const MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');

@Directive({
  selector: '[mglGeocoder]'
})
export class GeocoderControlDirective implements OnInit {
  /* Init inputs */
  @Input() proximity?: Proximity;
  @Input() country?: country;
  @Input() placeholder?: placeholder;
  @Input() zoom?: zoom;
  @Input() bbox?: bbox;
  @Input() types?: types;
  @Input() flyTo?: flyTo;
  @Input() accessToken: accessToken;

  constructor(
    private MapService: MapService,
    @Host() private ControlComponent: ControlComponent,
    @Optional() @Inject(MAPBOX_GEOCODER_API_KEY) private readonly MAPBOX_GEOCODER_API_KEY: string
  ) {}

  ngOnInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: GeocoderControlOptions = {
        proximity: this.proximity,
        country: this.country,
        placeholder: this.placeholder,
        zoom: this.zoom,
        bbox: this.bbox,
        types: this.types,
        flyTo: this.flyTo,
        accessToken: this.accessToken || this.MAPBOX_GEOCODER_API_KEY
      };

      Object.keys(options).forEach((key: string) => {
        const tkey = <keyof typeof options>key;
        if (options[tkey] === undefined) {
          delete options[tkey];
        }
      });
      this.ControlComponent.control = new MapboxGeocoder(options);
      this.MapService.addControl(
        this.ControlComponent.control,
        this.ControlComponent.position
      );
    });
  }
}
