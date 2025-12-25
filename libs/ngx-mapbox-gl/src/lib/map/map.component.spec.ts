import { SimpleChange } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { MapComponent } from './map.component';
import { MapService, SetupMap } from './map.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MapComponent', () => {
  class MapServiceSpy {
    setup = jest.fn();
    updateMinZoom = jest.fn();
    updateMaxPitch = jest.fn();
    updateMinPitch = jest.fn();
    destroyMap = jest.fn();
    mapCreated$ = new ReplaySubject(1);
  }

  let msSpy: MapServiceSpy;
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [provideZonelessChangeDetection],
    })
      .overrideComponent(MapComponent, {
        set: {
          providers: [{ provide: MapService, useClass: MapServiceSpy }],
        },
      })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.debugElement.componentInstance;
    await fixture.whenStable();
    msSpy = fixture.debugElement.injector.get<MapService>(
      MapService,
    ) as unknown as MapServiceSpy;
  });

  describe('Init tests', () => {
    it('should init', () => {
      fixture.detectChanges();
      expect(msSpy.setup).toHaveBeenCalledTimes(1);
    });

    it('should init with custom inputs', () => {
      fixture.componentRef.setInput('accessToken', 'tokenTest');
      fixture.componentRef.setInput('style', 'style');
      msSpy.setup.mockImplementation((options: SetupMap) => {
        expect(options.accessToken).toEqual('tokenTest');
        expect(options.mapOptions['style']).toEqual('style');
      });
      fixture.detectChanges();
      expect.assertions(2);
    });
  });

  describe('Change tests', () => {
    it('should update minzoom', fakeAsync(() => {
      msSpy.mapCreated$.next(undefined);
      msSpy.mapCreated$.complete();
      fixture.componentRef.setInput('minZoom', 6);
      component.ngOnChanges({
        minZoom: new SimpleChange(null, component.minZoom(), false),
      });
      flushMicrotasks();
      expect(msSpy.updateMinZoom).toHaveBeenCalledWith(6);
    }));

    it('should update minpitch', fakeAsync(() => {
      msSpy.mapCreated$.next(undefined);
      msSpy.mapCreated$.complete();
      fixture.componentRef.setInput('minPitch', 15);
      component.ngOnChanges({
        minPitch: new SimpleChange(null, component.minPitch(), false),
      });
      flushMicrotasks();
      expect(msSpy.updateMinPitch).toHaveBeenCalledWith(15);
    }));

    it('should update maxpitch', fakeAsync(() => {
      msSpy.mapCreated$.next(undefined);
      msSpy.mapCreated$.complete();
      fixture.componentRef.setInput('maxPitch', 25);
      component.ngOnChanges({
        maxPitch: new SimpleChange(null, component.maxPitch(), false),
      });
      flushMicrotasks();
      expect(msSpy.updateMaxPitch).toHaveBeenCalledWith(25);
    }));
  });
});
