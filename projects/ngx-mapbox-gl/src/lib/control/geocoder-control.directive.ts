import {
  AfterContentInit,
  Directive,
  EventEmitter,
  Host,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MapService } from '../map/map.service';
import { GeocoderEvent } from '../map/map.types';
import { ControlComponent } from './control.component';

// @ts-ignore
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export const MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');

export interface LngLatLiteral {
  latitude: number;
  longitude: number;
}

export interface Results extends GeoJSON.FeatureCollection<GeoJSON.Point> {
  attribution: string;
  query: string[];
}

export interface Result extends GeoJSON.Feature<GeoJSON.Point> {
  bbox: [number, number, number, number];
  center: number[];
  place_name: string;
  place_type: string[];
  relevance: number;
  text: string;
  address: string;
  context: any[];
}

@Directive({
  selector: '[mglGeocoder]',
})
export class GeocoderControlDirective implements AfterContentInit, OnChanges, GeocoderEvent {
  /* Init inputs */
  @Input() countries?: string;
  @Input() placeholder?: string;
  @Input() zoom?: number;
  @Input() bbox?: [number, number, number, number];
  @Input() types?: string;
  @Input() flyTo?: boolean;
  @Input() minLength?: number;
  @Input() limit?: number;
  @Input() language?: string;
  @Input() accessToken?: string;
  @Input() filter?: (feature: Result) => boolean;
  @Input() localGeocoder?: (query: string) => Result[];

  /* Dynamic inputs */
  @Input() proximity?: LngLatLiteral;
  @Input() searchInput?: string;

  @Output() clear = new EventEmitter<void>();
  @Output() loading = new EventEmitter<{ query: string }>();
  @Output() results = new EventEmitter<Results>();
  @Output() result = new EventEmitter<{ result: Result }>();
  @Output() error = new EventEmitter<any>();

  geocoder: any;

  private lastResultId?: string | number;

  constructor(
    private MapService: MapService,
    private zone: NgZone,
    @Host() private ControlComponent: ControlComponent,
    @Optional() @Inject(MAPBOX_GEOCODER_API_KEY) private readonly MAPBOX_GEOCODER_API_KEY: string
  ) {}

  ngAfterContentInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options = {
        proximity: this.proximity,
        countries: this.countries,
        placeholder: this.placeholder,
        zoom: this.zoom,
        bbox: this.bbox,
        types: this.types,
        flyTo: this.flyTo,
        minLength: this.minLength,
        limit: this.limit,
        language: this.language,
        filter: this.filter,
        localGeocoder: this.localGeocoder,
        accessToken: this.accessToken || this.MAPBOX_GEOCODER_API_KEY,
      };

      Object.keys(options).forEach((key: string) => {
        const tkey = <keyof typeof options>key;
        if (options[tkey] === undefined) {
          delete options[tkey];
        }
      });
      this.geocoder = new MapboxGeocoder(options);
      this.hookEvents(this);
      this.addControl();
    });
    if (this.searchInput) {
      this.MapService.mapLoaded$.subscribe(() => {
        this.geocoder.query(this.searchInput);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.geocoder) {
      return;
    }
    if (changes.proximity && !changes.proximity.isFirstChange()) {
      this.geocoder.setProximity(changes.proximity.currentValue);
    }
    if (changes.searchInput) {
      this.geocoder.query(this.searchInput);
    }
  }

  private addControl() {
    this.ControlComponent.control = this.geocoder;
    this.MapService.addControl(this.ControlComponent.control, this.ControlComponent.position);
  }

  private hookEvents(events: GeocoderEvent) {
    if (events.results.observers.length) {
      this.geocoder.on('results', (evt: Results) => this.zone.run(() => events.results.emit(evt)));
    }
    if (events.result.observers.length) {
      this.geocoder.on('result', (evt: { result: Result }) => {
        // Workaroud issue https://github.com/mapbox/mapbox-gl-geocoder/issues/99
        if (this.lastResultId !== evt.result.id) {
          this.lastResultId = evt.result.id;
          this.zone.run(() => events.result.emit(evt));
        }
      });
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
