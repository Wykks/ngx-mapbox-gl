import { EventEmitter } from '@angular/core';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import {
  ErrorEvent,
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
import { mockMapbox } from './mapbox.mock';
import { MockNgZone } from './mock-ng-zone';
import { EventData, NgxMapEvent } from  './map.types'

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
    service = new MapService(zone, null);
    container = document.createElement('div');
    mapEvents = {
      mapResize: new EventEmitter<MapEvent>(),
      mapRemove: new EventEmitter<MapEvent>(),
      mapMouseDown: new EventEmitter<MapMouseEvent>(),
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
      moveStart: new EventEmitter<MapEvents['movestart']>(),
      move: new EventEmitter<MapEvents['move']>(),
      moveEnd: new EventEmitter<MapEvents['moveend']>(),
      mapDragStart: new EventEmitter<MapEvents['dragstart']>(),
      mapDrag: new EventEmitter<MapEvents['drag']>(),
      mapDragEnd: new EventEmitter<MapEvents['dragend']>(),
      zoomStart: new EventEmitter<MapEvents['zoomstart'] & EventData>(),
      zoomEvt: new EventEmitter<MapEvents['zoom'] & EventData>(),
      zoomEnd: new EventEmitter<MapEvents['zoomend'] & EventData>(),
      rotateStart: new EventEmitter<MapEvents['rotatestart']>(),
      rotate: new EventEmitter<MapEvents['rotate']>(),
      rotateEnd: new EventEmitter<MapEvents['rotateend']>(),
      pitchStart: new EventEmitter<MapEvents['pitchstart'] & EventData>(),
      pitchEvt: new EventEmitter<MapEvents['pitch'] & EventData>(),
      pitchEnd: new EventEmitter<MapEvents['pitchend'] & EventData>(),
      boxZoomStart: new EventEmitter<MapEvents['boxzoomstart'] & EventData>(),
      boxZoomEnd: new EventEmitter<MapEvents['boxzoomend'] & EventData>(),
      boxZoomCancel: new EventEmitter<MapEvents['boxzoomcancel'] & EventData>(),
      webGlContextLost: new EventEmitter<MapContextEvent & EventData>(),
      webGlContextRestored: new EventEmitter<MapContextEvent & EventData>(),
      mapLoad: new EventEmitter<MapEvent>(),
      mapCreate: new EventEmitter<Map>(),
      render: new EventEmitter<MapEvent>(),
      mapError: new EventEmitter<ErrorEvent & EventData>(),
      data: new EventEmitter<MapDataEvent & EventData>(),
      styleData: new EventEmitter<MapStyleDataEvent & EventData>(),
      sourceData: new EventEmitter<MapSourceDataEvent & EventData>(),
      dataLoading: new EventEmitter<MapDataEvent & EventData>(),
      styleDataLoading: new EventEmitter<MapStyleDataEvent & EventData>(),
      sourceDataLoading: new EventEmitter<MapSourceDataEvent & EventData>(),
      styleImageMissing: new EventEmitter<{ id: string } & EventData>(),
      idle: new EventEmitter<MapEvent>(),

      resize: new EventEmitter<MapEvent>(),
      remove: new EventEmitter<MapEvent>(),
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
      dragStart: new EventEmitter<MapEvents['dragstart']>(),
      drag: new EventEmitter<MapEvents['drag']& EventData>(),
      dragEnd: new EventEmitter<MapEvents['dragend'] & EventData>(),
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
