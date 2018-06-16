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
  ViewChild,
  EventEmitter,
  Output
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

  @Output() close = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();

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
      this.MapService.removePopupFromMap(this.popupInstance!);
      const popupInstanceTmp = this.createPopup();
      this.MapService.addPopupToMap(popupInstanceTmp, changes.lngLat.currentValue);
      this.popupInstance = popupInstanceTmp;
    }
    if (changes.marker && !changes.marker.isFirstChange()) {
      const previousMarker: MarkerComponent = changes.marker.previousValue;
      if (previousMarker.markerInstance) {
        this.MapService.removePopupFromMarker(previousMarker.markerInstance);
      }
      if (this.marker && this.marker.markerInstance && this.popupInstance) {
        this.MapService.addPopupToMarker(this.marker.markerInstance, this.popupInstance);
      }
    }
  }

  ngAfterViewInit() {
    this.popupInstance = this.createPopup();
    this.addPopup(this.popupInstance);
  }

  ngOnDestroy() {
    if (this.popupInstance) {
      if (this.lngLat) {
        this.MapService.removePopupFromMap(this.popupInstance);
      } else if (this.marker && this.marker.markerInstance) {
        this.MapService.removePopupFromMarker(this.marker.markerInstance);
      }
    }
    this.popupInstance = undefined;
  }

  private createPopup() {
    return this.MapService.createPopup({
      popupOptions: {
        closeButton: this.closeButton,
        closeOnClick: this.closeOnClick,
        anchor: this.anchor,
        offset: this.offset
      },
      popupEvents: {
        open: this.open,
        close: this.close
      }
    }, this.content.nativeElement);
  }

  private addPopup(popup: Popup) {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.lngLat) {
        this.MapService.addPopupToMap(popup, this.lngLat);
      } else if (this.marker && this.marker.markerInstance) {
        this.MapService.addPopupToMarker(this.marker.markerInstance, popup);
      } else {
        throw new Error('mgl-popup need either lngLat or marker to be set');
      }
    });
  }
}
