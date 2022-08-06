import { EventEmitter } from '@angular/core';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import {
  ErrorEvent,
  EventData,
  Map,
  MapboxEvent,
  MapBoxZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
  Style,
} from 'mapbox-gl';
import { MapService } from './map.service';
import { MapEvent } from './map.types';
import { mockMapbox } from './mapbox.mock';
import { MockNgZone } from './mock-ng-zone';

const geoJSONStyle: Style = {
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
  let mapEvents: MapEvent;
  let zone: MockNgZone;
  let mapboxInstanceMock: ReturnType<typeof mockMapbox>;

  beforeEach(() => {
    zone = new MockNgZone();
    service = new MapService(zone, null);
    container = document.createElement('div');
    mapEvents = {
      mapResize: new EventEmitter<MapboxEvent & EventData>(),
      mapRemove: new EventEmitter<MapboxEvent & EventData>(),
      mapMouseDown: new EventEmitter<MapMouseEvent & EventData>(),
      mapMouseUp: new EventEmitter<MapMouseEvent & EventData>(),
      mapMouseMove: new EventEmitter<MapMouseEvent & EventData>(),
      mapClick: new EventEmitter<MapMouseEvent & EventData>(),
      mapDblClick: new EventEmitter<MapMouseEvent & EventData>(),
      mapMouseOver: new EventEmitter<MapMouseEvent & EventData>(),
      mapMouseOut: new EventEmitter<MapMouseEvent & EventData>(),
      mapContextMenu: new EventEmitter<MapMouseEvent & EventData>(),
      mapTouchStart: new EventEmitter<MapTouchEvent & EventData>(),
      mapTouchEnd: new EventEmitter<MapTouchEvent & EventData>(),
      mapTouchMove: new EventEmitter<MapTouchEvent & EventData>(),
      mapTouchCancel: new EventEmitter<MapTouchEvent & EventData>(),
      mapWheel: new EventEmitter<MapWheelEvent & EventData>(),
      moveStart: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
          EventData
      >(),
      move: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
          EventData
      >(),
      moveEnd: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
          EventData
      >(),
      mapDragStart: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      mapDrag: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      mapDragEnd: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      zoomStart: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
          EventData
      >(),
      zoomEvt: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
          EventData
      >(),
      zoomEnd: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> &
          EventData
      >(),
      rotateStart: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      rotate: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      rotateEnd: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      pitchStart: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      pitchEvt: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      pitchEnd: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      boxZoomStart: new EventEmitter<MapBoxZoomEvent & EventData>(),
      boxZoomEnd: new EventEmitter<MapBoxZoomEvent & EventData>(),
      boxZoomCancel: new EventEmitter<MapBoxZoomEvent & EventData>(),
      webGlContextLost: new EventEmitter<MapContextEvent & EventData>(),
      webGlContextRestored: new EventEmitter<MapContextEvent & EventData>(),
      mapLoad: new EventEmitter<MapboxEvent & EventData>(),
      mapCreate: new EventEmitter<Map>(),
      render: new EventEmitter<MapboxEvent & EventData>(),
      mapError: new EventEmitter<ErrorEvent & EventData>(),
      data: new EventEmitter<MapDataEvent & EventData>(),
      styleData: new EventEmitter<MapStyleDataEvent & EventData>(),
      sourceData: new EventEmitter<MapSourceDataEvent & EventData>(),
      dataLoading: new EventEmitter<MapDataEvent & EventData>(),
      styleDataLoading: new EventEmitter<MapStyleDataEvent & EventData>(),
      sourceDataLoading: new EventEmitter<MapSourceDataEvent & EventData>(),
      styleImageMissing: new EventEmitter<{ id: string } & EventData>(),
      idle: new EventEmitter<MapboxEvent & EventData>(),

      resize: new EventEmitter<MapboxEvent & EventData>(),
      remove: new EventEmitter<MapboxEvent & EventData>(),
      mouseDown: new EventEmitter<MapMouseEvent & EventData>(),
      mouseUp: new EventEmitter<MapMouseEvent & EventData>(),
      mouseMove: new EventEmitter<MapMouseEvent & EventData>(),
      click: new EventEmitter<MapMouseEvent & EventData>(),
      dblClick: new EventEmitter<MapMouseEvent & EventData>(),
      mouseOver: new EventEmitter<MapMouseEvent & EventData>(),
      mouseOut: new EventEmitter<MapMouseEvent & EventData>(),
      contextMenu: new EventEmitter<MapMouseEvent & EventData>(),
      touchStart: new EventEmitter<MapTouchEvent & EventData>(),
      touchEnd: new EventEmitter<MapTouchEvent & EventData>(),
      touchMove: new EventEmitter<MapTouchEvent & EventData>(),
      touchCancel: new EventEmitter<MapTouchEvent & EventData>(),
      wheel: new EventEmitter<MapWheelEvent & EventData>(),
      dragStart: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      drag: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      dragEnd: new EventEmitter<
        MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
      >(),
      load: new EventEmitter<Map>(),
      error: new EventEmitter<ErrorEvent & EventData>(),
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
    expect(mapboxInstanceMock.setMinZoom).toBeCalledTimes(1);
  });

  it('should call setMinPitch', () => {
    setupMap();
    service.updateMinPitch(6);
    expect(mapboxInstanceMock.setMinPitch).toBeCalledTimes(1);
  });
});
