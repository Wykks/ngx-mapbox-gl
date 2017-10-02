import { EventEmitter } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';

import { MapEvents, MapService } from './map.service';

describe('MapService', () => {
  let container: HTMLElement;
  let mapEvents: MapEvents;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapService]
    });
    container = document.createElement('div');
    mapEvents = {
      load: new EventEmitter<void>()
    };
  });

  it('should create a map', inject([MapService], (service: MapService) => {
    service.setup({
      mapOptions: {
        container
      },
      mapEvents
    });
    expect(service.mapInstance).toBeTruthy();
  }));
});
