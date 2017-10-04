import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';
import { MapService } from '../map/map.service';
import { SimpleChange } from '@angular/core';

describe('ImageComponent', () => {
  class MapServiceSpy {
    addImage = jasmine.createSpy('addImage');
    removeImage = jasmine.createSpy('removeImage');
  }

  let msSpy: MapServiceSpy;
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent ]
    })
    .overrideComponent(ImageComponent, {
      set: {
        providers: [
          { provide: MapService, useClass: MapServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    msSpy = <any>fixture.debugElement.injector.get(MapService);
    component.id = 'imageId';
  });

  describe('Init/Destroy tests', () => {
    it('should init with custom inputs', () => {
      component.data = { width: 500, height: 500, data: new Uint8Array([5, 5]) };
      fixture.detectChanges();
      expect(msSpy.addImage).toHaveBeenCalled();
    });

    it('should remove image on destroy', () => {
      component.ngOnDestroy();
      expect(msSpy.removeImage).toHaveBeenCalledWith(component.id);
    });
  });

  describe('Change tests', () => {
    it('should update image', () => {
      component.id = 'layerId';
      component.data = { width: 500, height: 500, data: new Uint8Array([5, 5]) };
      component.ngOnChanges({
        data: new SimpleChange(null, component.data, false)
      });
      expect(msSpy.removeImage).toHaveBeenCalledWith(component.id);
      expect(msSpy.addImage).toHaveBeenCalled();
    });
  });
});
