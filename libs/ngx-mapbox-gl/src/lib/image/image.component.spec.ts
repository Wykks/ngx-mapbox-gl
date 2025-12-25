import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MapService } from '../map/map.service';
import { mockMapbox } from '../map/mapbox.mock';
import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  class MapServiceSpy {
    addImage = jest.fn();
    removeImage = jest.fn();
    mapLoaded$ = of(undefined);
    mapInstance = mockMapbox();
  }

  let msSpy: MapServiceSpy;
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ImageComponent],
    })
      .overrideComponent(ImageComponent, {
        set: {
          providers: [{ provide: MapService, useClass: MapServiceSpy }],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    msSpy = fixture.debugElement.injector.get<MapService>(MapService) as any;
    fixture.componentRef.setInput('id', 'imageId');
  });

  describe('Init/Destroy tests', () => {
    it('should init with custom inputs', () => {
      fixture.componentRef.setInput('data', {
        width: 500,
        height: 500,
        data: new Uint8Array([5, 5]),
      });
      fixture.detectChanges();
      expect(msSpy.addImage).toHaveBeenCalled();
    });

    it('should remove image on destroy', () => {
      fixture.componentRef.setInput('data', {
        width: 500,
        height: 500,
        data: new Uint8Array([5, 5]),
      });
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(msSpy.removeImage).toHaveBeenCalledWith(component.id());
    });

    it('should not remove image on destroy if not added', () => {
      component.ngOnDestroy();
      expect(msSpy.removeImage).not.toHaveBeenCalled();
    });
  });

  describe('Change tests', () => {
    it('should update image', () => {
      fixture.componentRef.setInput('id', 'layerId');
      fixture.componentRef.setInput('data', {
        width: 500,
        height: 500,
        data: new Uint8Array([5, 5]),
      });
      fixture.detectChanges();
      component.ngOnChanges({
        data: new SimpleChange(null, component.data(), false),
      });
      expect(msSpy.removeImage).toHaveBeenCalledWith(component.id());
      expect(msSpy.addImage).toHaveBeenCalled();
    });
  });
});
