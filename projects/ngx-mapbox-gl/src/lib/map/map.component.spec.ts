import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { MapComponent } from './map.component';
import { MapService, SetupMap } from './map.service';

describe('MapComponent', () => {
  class MapServiceSpy {
    setup = jasmine.createSpy('setup');
    updateMinZoom = jasmine.createSpy('updateMinZoom');
    destroyMap = jasmine.createSpy('destroyMap');
    mapCreated$ = new ReplaySubject(1);
  }

  let msSpy: MapServiceSpy;
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
    })
      .overrideComponent(MapComponent, {
        set: {
          providers: [{ provide: MapService, useClass: MapServiceSpy }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.debugElement.componentInstance;
    msSpy = <any>fixture.debugElement.injector.get<MapService>(MapService);
  });

  describe('Init tests', () => {
    it('should init', () => {
      fixture.detectChanges();
      expect(msSpy.setup.calls.count()).toBe(1);
    });

    it('should init with custom inputs', (done: DoneFn) => {
      component.accessToken = 'tokenTest';
      component.style = 'style';
      msSpy.setup.and.callFake((options: SetupMap) => {
        expect(options.accessToken).toEqual('tokenTest');
        expect(options.mapOptions.style).toEqual('style');
        done();
      });
      fixture.detectChanges();
    });
  });

  describe('Change tests', () => {
    it('should update minzoom', fakeAsync(() => {
      msSpy.mapCreated$.complete();
      component.minZoom = 6;
      component.ngOnChanges({
        minZoom: new SimpleChange(null, component.minZoom, false),
      });
      flushMicrotasks();
      expect(msSpy.updateMinZoom).toHaveBeenCalledWith(6);
    }));
  });
});
