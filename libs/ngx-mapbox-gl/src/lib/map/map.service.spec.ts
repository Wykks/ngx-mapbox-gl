import { EventEmitter, NgZone } from '@angular/core';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import type {
  Map,
  MapContextEvent,
  MapDataEvent,
  MapEvent,
  MapEvents,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
  StyleSpecification,
} from 'mapbox-gl';
import { MapService } from './map.service';
import { NgxMapEvent } from './map.types';
import { mockMapbox } from './mapbox.mock';
import { MockNgZone } from './mock-ng-zone';
import { TestBed } from '@angular/core/testing';

const geoJSONStyle: StyleSpecification = {
  sources: {
    world: {
      type: 'geojson',
      data: '',
    },
  },
  version: 8,
  layers: [
    {
      id: 'stuff',
      type: 'fill',
      source: 'world',
      layout: {},
      paint: {
        'fill-color': '#6F788A',
      },
    },
  ],
};

describe('MapService', () => {
  let service: MapService;
  let container: HTMLElement;
  let mapEvents: NgxMapEvent;
  let zone: MockNgZone;
  let mapboxInstanceMock: ReturnType<typeof mockMapbox>;

  beforeEach(() => {
    zone = new MockNgZone();
    TestBed.configureTestingModule({
      providers: [MapService, { provide: NgZone, useValue: zone }],
    });

    service = TestBed.inject(MapService);
    container = document.createElement('div');
    mapEvents = {
      mapResize: new EventEmitter<MapEvent>(),
      mapRemove: new EventEmitter<MapEvent>(),
      mapMouseDown: new EventEmitter<MapMouseEvent>(),
      mapMouseUp: new EventEmitter<MapMouseEvent>(),
      mapMouseMove: new EventEmitter<MapMouseEvent>(),
      mapClick: new EventEmitter<MapMouseEvent>(),
      mapDblClick: new EventEmitter<MapMouseEvent>(),
      mapMouseOver: new EventEmitter<MapMouseEvent>(),
      mapMouseOut: new EventEmitter<MapMouseEvent>(),
      mapContextMenu: new EventEmitter<MapMouseEvent>(),
      mapTouchStart: new EventEmitter<MapTouchEvent>(),
      mapTouchEnd: new EventEmitter<MapTouchEvent>(),
      mapTouchMove: new EventEmitter<MapTouchEvent>(),
      mapTouchCancel: new EventEmitter<MapTouchEvent>(),
      mapWheel: new EventEmitter<MapWheelEvent>(),
      moveStart: new EventEmitter<MapEvents['movestart']>(),
      move: new EventEmitter<MapEvents['move']>(),
      moveEnd: new EventEmitter<MapEvents['moveend']>(),
      mapDragStart: new EventEmitter<MapEvents['dragstart']>(),
      mapDrag: new EventEmitter<MapEvents['drag']>(),
      mapDragEnd: new EventEmitter<MapEvents['dragend']>(),
      zoomStart: new EventEmitter<void>(),
      zoomEvt: new EventEmitter<void>(),
      zoomEnd: new EventEmitter<void>(),
      rotateStart: new EventEmitter<MapEvents['rotatestart']>(),
      rotate: new EventEmitter<MapEvents['rotate']>(),
      rotateEnd: new EventEmitter<MapEvents['rotateend']>(),
      pitchStart: new EventEmitter<void>(),
      pitchEvt: new EventEmitter<void>(),
      pitchEnd: new EventEmitter<void>(),
      boxZoomStart: new EventEmitter<MapEvents['boxzoomstart']>(),
      boxZoomEnd: new EventEmitter<MapEvents['boxzoomend']>(),
      boxZoomCancel: new EventEmitter<MapEvents['boxzoomcancel']>(),
      webGlContextLost: new EventEmitter<MapContextEvent>(),
      webGlContextRestored: new EventEmitter<MapContextEvent>(),
      mapLoad: new EventEmitter<MapEvent>(),
      mapCreate: new EventEmitter<Map>(),
      render: new EventEmitter<void>(),
      mapError: new EventEmitter<Error>(),
      data: new EventEmitter<MapDataEvent>(),
      styleData: new EventEmitter<MapStyleDataEvent>(),
      sourceData: new EventEmitter<MapSourceDataEvent>(),
      dataLoading: new EventEmitter<MapDataEvent>(),
      styleDataLoading: new EventEmitter<MapStyleDataEvent>(),
      sourceDataLoading: new EventEmitter<MapSourceDataEvent>(),
      styleImageMissing: new EventEmitter<{ id: string }>(),
      idle: new EventEmitter<void>(),
    };
  });

  beforeEach(() => {
    mapboxInstanceMock = mockMapbox();
  });

  function setupMap() {
    service.setup({
      mapOptions: {
        container,
        style: geoJSONStyle,
        zoom: [0],
      },
      mapEvents,
    });
    zone.simulateZoneExit();
  }

  it('should create a map', () => {
    setupMap();
    expect(service.mapInstance).toBeTruthy();
  });

  it('should fire mapLoad event', () => {
    const mapLoadSpy = subscribeSpyTo(mapEvents.mapLoad);
    setupMap();
    expect(mapLoadSpy.getValues()[0].target).toEqual(service.mapInstance);
  });

  it('should call setMinZoom', () => {
    setupMap();
    service.updateMinZoom(6);
    expect(mapboxInstanceMock.setMinZoom).toHaveBeenCalledTimes(1);
  });

  it('should call setMinPitch', () => {
    setupMap();
    service.updateMinPitch(6);
    expect(mapboxInstanceMock.setMinPitch).toHaveBeenCalledTimes(1);
  });
});
