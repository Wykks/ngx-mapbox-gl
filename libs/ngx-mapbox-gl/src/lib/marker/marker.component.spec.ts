import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PointLike } from 'mapbox-gl';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { MarkerComponent } from './marker.component';

@Component({
  template: `
    <mgl-marker [offset]="offset" [lngLat]="lngLat" [className]="className">
      ...
    </mgl-marker>
  `,
  imports: [MarkerComponent],
})
class MarkerTestComponent {
  offset: PointLike;
  lngLat: [number, number];
  className: string;
}

describe('MarkerComponent', () => {
  class MapServiceSpy {
    addMarker = jest.fn();
    removeMarker = jest.fn();
    mapCreated$ = of(undefined);
  }

  let msSpy: MapServiceSpy;
  let component: MarkerTestComponent;
  let fixture: ComponentFixture<MarkerTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MarkerTestComponent, MarkerComponent],
    })
      .overrideComponent(MarkerTestComponent, {
        set: {
          providers: [{ provide: MapService, useClass: MapServiceSpy }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerTestComponent);
    component = fixture.componentInstance;
    msSpy = fixture.debugElement.injector.get(MapService) as any;
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

    it('should apply classes', () => {
      component.className = 'my-class1 my-class2';
      fixture.detectChanges();
      const classes = (fixture.nativeElement as HTMLElement).querySelector(
        'mgl-marker > div',
      )!.classList;
      expect(classes).toContain('my-class1');
      expect(classes).toContain('my-class2');
    });
  });
});
