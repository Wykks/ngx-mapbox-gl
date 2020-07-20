import { EventEmitter, NgZone } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { EventData, MapBoxZoomEvent, MapMouseEvent, MapTouchEvent, Style } from 'mapbox-gl';
import { first } from 'rxjs/operators';
import { MapService } from './map.service';
import { MapEvent } from './map.types';
import { MockNgZone } from './mock-ng-zone';

const countries = require('./countries.geo.json');

const geoJSONStyle: Style = {
  sources: {
    world: {
      type: 'geojson',
      data: countries,
    },
  },
  version: 8,
  layers: <any>[
    {
      id: 'countries',
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
  let container: HTMLElement;
  let mapEvents: MapEvent;
  let zone: MockNgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapService,
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          },
        },
      ],
    });
    container = document.createElement('div');
    mapEvents = {
      resize: new EventEmitter<void>(),
      remove: new EventEmitter<void>(),
      mouseDown: new EventEmitter<MapMouseEvent>(),
      mouseUp: new EventEmitter<MapMouseEvent>(),
      mouseMove: new EventEmitter<MapMouseEvent>(),
      click: new EventEmitter<MapMouseEvent>(),
      dblClick: new EventEmitter<MapMouseEvent>(),
      mouseEnter: new EventEmitter<MapMouseEvent>(),
      mouseLeave: new EventEmitter<MapMouseEvent>(),
      mouseOver: new EventEmitter<MapMouseEvent>(),
      mouseOut: new EventEmitter<MapMouseEvent>(),
      contextMenu: new EventEmitter<MapMouseEvent>(),
      touchStart: new EventEmitter<MapTouchEvent>(),
      touchEnd: new EventEmitter<MapTouchEvent>(),
      touchMove: new EventEmitter<MapTouchEvent>(),
      touchCancel: new EventEmitter<MapTouchEvent>(),
      wheel: new EventEmitter<any>(),
      moveStart: new EventEmitter<DragEvent>(), // TODO Check type
      move: new EventEmitter<MapTouchEvent | MapMouseEvent>(),
      moveEnd: new EventEmitter<DragEvent>(),
      dragStart: new EventEmitter<DragEvent>(),
      drag: new EventEmitter<MapTouchEvent | MapMouseEvent>(),
      dragEnd: new EventEmitter<DragEvent>(),
      zoomStart: new EventEmitter<MapTouchEvent | MapMouseEvent>(),
      zoomEvt: new EventEmitter<MapTouchEvent | MapMouseEvent>(),
      zoomEnd: new EventEmitter<MapTouchEvent | MapMouseEvent>(),
      rotateStart: new EventEmitter<MapTouchEvent | MapMouseEvent>(),
      rotate: new EventEmitter<MapTouchEvent | MapMouseEvent>(),
      rotateEnd: new EventEmitter<MapTouchEvent | MapMouseEvent>(),
      pitchStart: new EventEmitter<EventData>(),
      pitchEvt: new EventEmitter<EventData>(),
      pitchEnd: new EventEmitter<EventData>(),
      boxZoomStart: new EventEmitter<MapBoxZoomEvent>(),
      boxZoomEnd: new EventEmitter<MapBoxZoomEvent>(),
      boxZoomCancel: new EventEmitter<MapBoxZoomEvent>(),
      webGlContextLost: new EventEmitter<void>(),
      webGlContextRestored: new EventEmitter<void>(),
      load: new EventEmitter<any>(),
      render: new EventEmitter<void>(),
      error: new EventEmitter<any>(), // TODO Check type
      data: new EventEmitter<EventData>(),
      styleData: new EventEmitter<EventData>(),
      sourceData: new EventEmitter<EventData>(),
      dataLoading: new EventEmitter<EventData>(),
      styleDataLoading: new EventEmitter<EventData>(),
      sourceDataLoading: new EventEmitter<EventData>(),
      styleImageMissing: new EventEmitter<{ id: string }>(),
      idle: new EventEmitter<void>(),
    };
  });

  beforeEach(inject([MapService], (service: MapService) => {
    service.setup({
      mapOptions: {
        container,
        style: geoJSONStyle,
        zoom: 0,
      },
      mapEvents,
    });
    zone.simulateZoneExit();
  }));

  it('should create a map', inject([MapService], (service: MapService) => {
    expect(service.mapInstance).toBeTruthy();
  }));

  it('should fire load event', (done: DoneFn) => {
    mapEvents.load.pipe(first()).subscribe(() => {
      expect(true).toBe(true);
      done();
    });
  });

  it('should update minZoom', (done: DoneFn) =>
    inject([MapService], (service: MapService) => {
      mapEvents.load.pipe(first()).subscribe(() => {
        service.updateMinZoom(6);
        expect(service.mapInstance.getMinZoom()).toEqual(6);
        done();
      });
    })());

  // xit('should update zoom', (done: DoneFn) => inject([MapService], (service: MapService) => {
  //   mapEvents.mapEvents.load.first().subscribe(() => {
  //     service.prepareZoom(6);
  //     service.startMoveIfNeeded
  //     done();
  //   });
  // })());
});
