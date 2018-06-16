import { Component, OnDestroy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PointLike } from 'mapbox-gl';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { MarkerComponent } from './marker.component';

describe('MarkerComponent', () => {
  class MapServiceSpy {
    addMarker = jasmine.createSpy('addMarker');
    removeMarker = jasmine.createSpy('removeMarker');
    mapCreated$ = of(undefined);
  }

  let msSpy: MapServiceSpy;
  let component: MarkerTestComponent;
  let fixture: ComponentFixture<MarkerTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkerTestComponent, MarkerComponent]
    })
      .overrideComponent(MarkerTestComponent, {
        set: {
          providers: [
            { provide: MapService, useClass: MapServiceSpy }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerTestComponent);
    component = fixture.componentInstance;
    msSpy = <any>fixture.debugElement.injector.get(MapService);
  });

  describe('Init/Destroy tests', () => {
    it('should init with custom inputs', () => {
      component.lngLat = [-61, -15];
      fixture.detectChanges();
      expect(msSpy.addMarker).toHaveBeenCalled();
    });

    it('should remove marker on destroy', () => {
      fixture.destroy();
      expect(msSpy.removeMarker).toHaveBeenCalled();
    });
  });
});

@Component({
  template: `
    <mgl-marker
      [offset]="offset"
      [lngLat]="lngLat"
    >
      ...
    </mgl-marker>
  `
})
class MarkerTestComponent implements OnDestroy {
  offset: PointLike;
  lngLat: [number, number];

  ngOnDestroy() { }
}
