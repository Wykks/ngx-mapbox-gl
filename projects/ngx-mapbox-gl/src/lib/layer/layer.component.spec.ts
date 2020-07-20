import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundPaint } from 'mapbox-gl';
import { of } from 'rxjs';
import { MapService, SetupLayer } from '../map/map.service';
import { LayerComponent } from './layer.component';

describe('LayerComponent', () => {
  class MapServiceSpy {
    addLayer = jasmine.createSpy('addLayer');
    removeLayer = jasmine.createSpy('removeLayer');
    setAllLayerPaintProperty = jasmine.createSpy('setAllPaintProperty');
    mapLoaded$ = of(undefined);
    mapInstance = new (class {
      on() {}
      off() {}
      getLayer() {}
    })();
  }

  let msSpy: MapServiceSpy;
  let component: LayerComponent;
  let fixture: ComponentFixture<LayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerComponent],
    })
      .overrideComponent(LayerComponent, {
        set: {
          providers: [{ provide: MapService, useClass: MapServiceSpy }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerComponent);
    component = fixture.componentInstance;
    msSpy = <any>fixture.debugElement.injector.get<MapService>(MapService);
    component.id = 'layerId';
  });

  describe('Init/Destroy tests', () => {
    it('should init with custom inputs', (done: DoneFn) => {
      component.paint = { 'background-color': 'green' };
      msSpy.addLayer.and.callFake((options: SetupLayer) => {
        expect(options.layerOptions.id).toEqual(component.id);
        expect((<BackgroundPaint>options.layerOptions.paint)['background-color']).toEqual('green');
        done();
      });
      fixture.detectChanges();
    });

    it('should remove layer on destroy', () => {
      component.paint = { 'background-color': 'green' };
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(msSpy.removeLayer).toHaveBeenCalledWith(component.id);
    });

    it('should not remove layer on destroy if not added', () => {
      component.ngOnDestroy();
      expect(msSpy.removeLayer).not.toHaveBeenCalled();
    });
  });

  describe('Change tests', () => {
    it('should update paint', () => {
      component.id = 'layerId';
      component.paint = {
        'background-color': 'green',
        'background-opacity': 0.5,
      };
      fixture.detectChanges();
      component.ngOnChanges({
        paint: new SimpleChange(null, component.paint, false),
      });
      expect(msSpy.setAllLayerPaintProperty).toHaveBeenCalledWith(component.id, component.paint);
    });
  });
});
