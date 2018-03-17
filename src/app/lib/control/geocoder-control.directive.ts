import {
  Directive,
  EventEmitter,
  Host,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges
  } from '@angular/core';
import { MapService } from '../map/map.service';
import { GeocoderEvent } from '../map/map.types';
import { ControlComponent } from './control.component';

const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

export const MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');

@Directive({
  selector: '[mglGeocoder]'
})
export class GeocoderControlDirective implements OnInit, OnChanges, GeocoderEvent {
  /* Init inputs */
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
  @Input() filter?: (feature: MapboxGeocoder.Result) => boolean;
  @Input() localGeocoder?: (query: string) => MapboxGeocoder.Result[];

  /* Dynamic inputs */
  @Input() proximity?: MapboxGeocoder.LngLatLiteral;

  @Output() clear = new EventEmitter<undefined>();
  @Output() loading = new EventEmitter<{ query: string }>();
  @Output() results = new EventEmitter<MapboxGeocoder.Results>();
  @Output() result = new EventEmitter<{ result: MapboxGeocoder.Result }>();
  @Output() error = new EventEmitter<any>();

  geocoder: MapboxGeocoder.MapboxGeocoder;

  constructor(
    private MapService: MapService,
    private zone: NgZone,
    @Host() private ControlComponent: ControlComponent,
    @Optional() @Inject(MAPBOX_GEOCODER_API_KEY) private readonly MAPBOX_GEOCODER_API_KEY: string
  ) { }

  ngOnInit() {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.ControlComponent.control) {
        throw new Error('Another control is already set for this control');
      }
      const options: MapboxGeocoder.Options = {
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
        filter: this.filter,
        localGeocoder: this.localGeocoder,
        accessToken: this.accessToken || this.MAPBOX_GEOCODER_API_KEY
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.proximity && !changes.proximity.isFirstChange()) {
      this.geocoder.setProximity(changes.proximity.currentValue);
    }
  }

  private addControl() {
    this.ControlComponent.control = this.geocoder;
    this.MapService.addControl(
      this.ControlComponent.control,
      this.ControlComponent.position
    );
  }

  private hookEvents(events: GeocoderEvent) {
    if (events.results.observers.length) {
      this.geocoder.on('results', (evt: MapboxGeocoder.Results) => this.zone.run(() => events.results.emit(evt)));
    }
    if (events.result.observers.length) {
      this.geocoder.on('result', (evt: { result: MapboxGeocoder.Result }) => this.zone.run(() => events.result.emit(evt)));
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
