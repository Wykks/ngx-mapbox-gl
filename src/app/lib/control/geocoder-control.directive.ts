import {
  Directive,
  Host,
  Input,
  OnInit,
  Optional,
  Inject,
  InjectionToken,
  NgZone,
  Output,
  EventEmitter
} from '@angular/core';
import { MapService } from '../map/map.service';
import { ControlComponent } from './control.component';
import { GeocoderEvent } from '../map/map.types';
declare var require: any;
import { first } from 'rxjs/operators';
import { FeatureCollection, Feature, Point } from 'geojson';
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

export interface GeocoderControlResult extends Feature<Point> {
  address: string;
  text: string;
  place_name: string;
  place_type: any[];
  relevance: number;
  center: [number, number];
  context: any[];
}

export const MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');

@Directive({
  selector: '[mglGeocoder]'
})
export class GeocoderControlDirective implements OnInit, GeocoderEvent {
  /* Init inputs */
  @Input() proximity?: {
    latitude: number;
    longitude: number;
  };
  @Input() country?: string;
  @Input() placeholder?: string;
  @Input() zoom?: number;
  @Input() bbox?: [number, number, number, number];
  @Input() types?: string;
  @Input() flyTo?: boolean;
  @Input() minLength?: number;
  @Input() limit?: number;
  @Input() language?: string;
  @Input() accessToken?: string;
  @Output() clear = new EventEmitter<undefined>();
  @Output() loading = new EventEmitter<{ query: string }>();
  @Output() results = new EventEmitter<FeatureCollection<Point>>();
  @Output() result = new EventEmitter<{ result: GeocoderControlResult }>();
  @Output() error = new EventEmitter<any>();

  geocoder: any; // Mapbox Geocoder

  constructor(
    private MapService: MapService,
    private zone: NgZone,
    @Host() private ControlComponent: ControlComponent,
    @Optional() @Inject(MAPBOX_GEOCODER_API_KEY) private readonly MAPBOX_GEOCODER_API_KEY: string
  ) {}

  ngOnInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options = {
        proximity: this.proximity,
        country: this.country,
        placeholder: this.placeholder,
        zoom: this.zoom,
        bbox: this.bbox,
        types: this.types,
        flyTo: this.flyTo,
        minLength: this.minLength,
        limit: this.limit,
        language: this.language,
        accessToken: this.accessToken || this.MAPBOX_GEOCODER_API_KEY
      };

      Object.keys(options).forEach((key: string) => {
        const tkey = <keyof typeof options>key;
        if (options[tkey] === undefined) {
          delete options[tkey];
        }
      });

      this.geocoder = new MapboxGeocoder(options);

      // Inline with map.service
      this.zone.onStable.pipe(first()).subscribe(() => {
        this.hookEvents(this);
        this.addControl();
      });
    });
  }

  private addControl(): void {
    this.ControlComponent.control = this.geocoder;
    this.MapService.addControl(
      this.ControlComponent.control,
      this.ControlComponent.position
    );
  }

  private hookEvents(events: GeocoderEvent) {
    if (events.results.observers.length) {
      this.geocoder.on('results', (evt: Array<string>) => this.zone.run(() => events.results.emit(evt)));
    }
    if (events.result.observers.length) {
      this.geocoder.on('result', (evt: { result: GeocoderControlResult }) => this.zone.run(() => events.result.emit(evt)));
    }
    if (events.error.observers.length) {
      this.geocoder.on('error', (evt: any) => this.zone.run(() => events.error.emit(evt)));
    }
    if (events.loading.observers.length) {
      this.geocoder.on('loading', (evt: { query: string }) => this.zone.run(() => events.loading.emit(evt)));
    }
    if (events.clear.observers.length) {
      this.geocoder.on('clear', () => this.zone.run(() => events.clear.emit()));
    }

  }
}
