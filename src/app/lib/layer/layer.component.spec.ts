import { of } from 'rxjs/observable/of';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerComponent } from './layer.component';
import { MapService } from '../map/map.service';
import { Layer, BackgroundPaint } from 'mapbox-gl';
import { SimpleChange } from '@angular/core';

describe('LayerComponent', () => {
  class MapServiceSpy {
    addLayer = jasmine.createSpy('addLayer');
    removeLayer = jasmine.createSpy('removeLayer');
    setAllLayerPaintProperty = jasmine.createSpy('setAllPaintProperty');
    mapLoaded$ = of(undefined);
  }

  let msSpy: MapServiceSpy;
  let component: LayerComponent;
  let fixture: ComponentFixture<LayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerComponent ]
    })
    .overrideComponent(LayerComponent, {
      set: {
        providers: [
          { provide: MapService, useClass: MapServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerComponent);
    component = fixture.componentInstance;
    msSpy = <any>fixture.debugElement.injector.get(MapService);
    component.id = 'layerId';
  });

  describe('Init/Destroy tests', () => {
    it('should init with custom inputs', (done: DoneFn) => {
      component.paint = { 'background-color': 'green' };
      msSpy.addLayer.and.callFake((options: Layer) => {
        expect(options.id).toEqual(component.id);
        expect((<BackgroundPaint>options.paint)['background-color']).toEqual('green');
        done();
      });
      fixture.detectChanges();
    });

    it('should remove layer on destroy', () => {
      component.ngOnDestroy();
      expect(msSpy.removeLayer).toHaveBeenCalledWith(component.id);
    });
  });

  describe('Change tests', () => {
    it('should update paint', () => {
      component.id = 'layerId';
      component.paint = {
        'background-color': 'green',
        'background-opacity': 0.5
      };
      component.ngOnChanges({
        paint: new SimpleChange(null, component.paint, false)
      });
      expect(msSpy.setAllLayerPaintProperty).toHaveBeenCalledWith(component.id, component.paint);
    });
  });
});
