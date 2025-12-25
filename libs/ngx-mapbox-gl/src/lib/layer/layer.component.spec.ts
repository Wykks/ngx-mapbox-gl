import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { type BackgroundLayerSpecification } from 'mapbox-gl';
import { of } from 'rxjs';
import { MapService, SetupLayer } from '../map/map.service';
import { mockMapbox } from '../map/mapbox.mock';
import { LayerComponent } from './layer.component';

describe('LayerComponent', () => {
  class MapServiceSpy {
    addLayer = jest.fn();
    removeLayer = jest.fn();
    setLayerAllPaintProperty = jest.fn();
    mapLoaded$ = of(undefined);
    mapInstance = mockMapbox();
  }

  let msSpy: MapServiceSpy;
  let component: LayerComponent;
  let fixture: ComponentFixture<LayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayerComponent],
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
    msSpy = fixture.debugElement.injector.get<MapService>(
      MapService,
    ) as unknown as MapServiceSpy;
    fixture.componentRef.setInput('id', 'layerId');
    fixture.componentRef.setInput('type', 'slot');
  });

  describe('Init/Destroy tests', () => {
    it('should init with custom inputs', () => {
      fixture.componentRef.setInput('paint', { 'background-color': 'green' });
      fixture.componentRef.setInput('type', 'background');
      msSpy.addLayer.mockImplementation((options: SetupLayer) => {
        expect(options.layerOptions.id).toEqual(component.id());
        expect(
          (options.layerOptions as BackgroundLayerSpecification).paint![
            'background-color'
          ],
        ).toEqual('green');
      });
      fixture.detectChanges();
      expect.assertions(2);
    });

    it('should remove layer on destroy', () => {
      fixture.componentRef.setInput('paint', { 'background-color': 'green' });
      fixture.detectChanges();
      component['layerAdded'] = true;
      component.ngOnDestroy();
      expect(msSpy.removeLayer).toHaveBeenCalledWith(component.id());
    });

    it('should not remove layer on destroy if not added', () => {
      component['layerAdded'] = false;
      component.ngOnDestroy();
      expect(msSpy.removeLayer).not.toHaveBeenCalled();
    });
  });

  describe('Change tests', () => {
    it('should update paint', () => {
      fixture.componentRef.setInput('id', 'layerId');
      fixture.componentRef.setInput('paint', {
        currentValue: {
          'background-color': 'green',
          'background-opacity': 0.5,
        },
      });
      fixture.detectChanges();
      component['layerAdded'] = true;
      component.ngOnChanges({
        paint: new SimpleChange(null, component.paint(), false),
      });
      expect(msSpy.setLayerAllPaintProperty).toHaveBeenCalledWith(
        component.id(),
        component.paint(),
      );
    });
  });
});
