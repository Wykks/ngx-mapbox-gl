import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { PointLike, Popup, LngLatLike } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';

@Component({
  selector: 'mgl-popup',
  template: '<div #content><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
  /* Init input */
  @Input() closeButton?: boolean;
  @Input() closeOnClick?: boolean;
  @Input() anchor?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left';
  @Input() offset?: number | PointLike | { [anchor: string]: [number, number] };

  /* Dynamic input */
  @Input() lngLat?: LngLatLike;
  @Input() marker?: MarkerComponent;

  @ViewChild('content') content: ElementRef;

  popupInstance?: Popup;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    if (this.lngLat && this.marker) {
      throw new Error('marker and lngLat input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.lngLat && !changes.lngLat.isFirstChange()) {
      this.popupInstance!.setLngLat(this.lngLat!);
    }
    if (changes.marker && !changes.marker.isFirstChange()) {
      const previousMarker: MarkerComponent = changes.marker.previousValue;
      if (previousMarker.markerInstance) {
        previousMarker.markerInstance.setPopup(undefined);
      }
      if (this.marker && this.marker.markerInstance) {
        this.marker.markerInstance.setPopup(this.popupInstance);
      }
    }
  }

  ngAfterViewInit() {
    const options = {
      closeButton: this.closeButton,
      closeOnClick: this.closeOnClick,
      anchor: this.anchor,
      offset: this.offset
    };
    Object.keys(options)
      .forEach((key) =>
        (<any>options)[key] === undefined && delete (<any>options)[key]);
    this.popupInstance = new Popup(options);
    this.popupInstance.setDOMContent(this.content.nativeElement);
    if (this.lngLat) {
      this.popupInstance.setLngLat(this.lngLat);
      this.MapService.addPopup(this.popupInstance);
    } else if (this.marker && this.marker.markerInstance) {
      this.marker.markerInstance.setPopup(this.popupInstance);
    }
  }

  ngOnDestroy() {
    this.MapService.removePopup(this.popupInstance!);
    this.popupInstance = undefined;
  }
}
