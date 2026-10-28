import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapComponent } from './map.component';
import { MapService } from './map.service';

describe('MapComponent performanceMetricsCollection', () => {
  const mapService = {
    setup: jest.fn(),
    destroyMap: jest.fn(),
    mapCreated$: of(undefined),
  };

  beforeEach(async () => {
    mapService.setup.mockClear();
    mapService.destroyMap.mockClear();
    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(MapComponent, {
        set: { providers: [{ provide: MapService, useValue: mapService }] },
      })
      .compileComponents();
  });

  it.each([false, true, undefined])(
    'forwards %s to map setup without overriding the SDK default when unset',
    async (value) => {
      const fixture = TestBed.createComponent(MapComponent);
      if (value !== undefined) {
        fixture.componentRef.setInput('performanceMetricsCollection', value);
      }

      await fixture.whenStable();

      expect(mapService.setup).toHaveBeenCalledTimes(1);
      expect(mapService.setup).toHaveBeenCalledWith(
        expect.objectContaining({
          mapOptions: expect.objectContaining({
            performanceMetricsCollection: value,
          }),
        }),
      );
    },
  );
});
