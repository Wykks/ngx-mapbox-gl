import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { LngLatLike, PointLike, Popup, PopupOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';
import { MarkerComponent } from '../marker/marker.component';
import { deprecationWarning } from '../utils';

@Component({
  selector: 'mgl-popup',
  template: '<div #content><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent
  implements OnChanges, OnDestroy, AfterViewInit, OnInit {
  /* Init input */
  @Input() closeButton?: PopupOptions['closeButton'];
  @Input() closeOnClick?: PopupOptions['closeOnClick'];
  @Input() anchor?: PopupOptions['anchor'];
  @Input() className?: PopupOptions['className'];
  @Input() maxWidth?: PopupOptions['maxWidth'];

  /* Dynamic input */
  @Input() feature?: GeoJSON.Feature<GeoJSON.Point>;
  @Input() lngLat?: LngLatLike;
  @Input() marker?: MarkerComponent;
  @Input() offset?: number | PointLike | { [anchor: string]: [number, number] };

  @Output() popupClose = new EventEmitter<void>();
  @Output() popupOpen = new EventEmitter<void>();
  /**
   * @deprecated Use popupClose instead
   */
  @Output() close = new EventEmitter<void>();
  /**
   * @deprecated Use popupOpen instead
   */
  @Output() open = new EventEmitter<void>();

  @ViewChild('content', { static: true }) content: ElementRef;

  popupInstance?: Popup;

  constructor(private MapService: MapService) {}

  ngOnInit() {
    this.warnDeprecatedOutputs();
    if (
      (this.lngLat && this.marker) ||
      (this.feature && this.lngLat) ||
      (this.feature && this.marker)
    ) {
      throw new Error('marker, lngLat, feature input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.lngLat && !changes.lngLat.isFirstChange()) ||
      (changes.feature && !changes.feature.isFirstChange())
    ) {
      const newlngLat = changes.lngLat
        ? this.lngLat!
        : <[number, number]>this.feature!.geometry!.coordinates!;
      this.MapService.removePopupFromMap(this.popupInstance!, true);
      const popupInstanceTmp = this.createPopup();
      this.MapService.addPopupToMap(
        popupInstanceTmp,
        newlngLat,
        this.popupInstance!.isOpen()
      );
      this.popupInstance = popupInstanceTmp;
    }
    if (changes.marker && !changes.marker.isFirstChange()) {
      const previousMarker: MarkerComponent = changes.marker.previousValue;
      if (previousMarker.markerInstance) {
        this.MapService.removePopupFromMarker(previousMarker.markerInstance);
      }
      if (this.marker && this.marker.markerInstance && this.popupInstance) {
        this.MapService.addPopupToMarker(
          this.marker.markerInstance,
          this.popupInstance
        );
      }
    }
    if (
      changes.offset &&
      !changes.offset.isFirstChange() &&
      this.popupInstance
    ) {
      this.popupInstance.setOffset(this.offset);
    }
  }

  ngAfterViewInit() {
    this.popupInstance = this.createPopup();
    this.addPopup(this.popupInstance);
  }

  ngOnDestroy() {
    if (this.popupInstance) {
      if (this.lngLat || this.feature) {
        this.MapService.removePopupFromMap(this.popupInstance);
      } else if (this.marker && this.marker.markerInstance) {
        this.MapService.removePopupFromMarker(this.marker.markerInstance);
      }
    }
    this.popupInstance = undefined;
  }

  private createPopup() {
    return this.MapService.createPopup(
      {
        popupOptions: {
          closeButton: this.closeButton,
          closeOnClick: this.closeOnClick,
          anchor: this.anchor,
          offset: this.offset,
          className: this.className,
          maxWidth: this.maxWidth,
        },
        popupEvents: {
          open: this.open,
          close: this.close,
          popupOpen: this.popupOpen,
          popupClose: this.popupClose,
        },
      },
      this.content.nativeElement
    );
  }

  private addPopup(popup: Popup) {
    this.MapService.mapCreated$.subscribe(() => {
      if (this.lngLat || this.feature) {
        this.MapService.addPopupToMap(
          popup,
          this.lngLat
            ? this.lngLat
            : <[number, number]>this.feature!.geometry!.coordinates!
        );
      } else if (this.marker && this.marker.markerInstance) {
        this.MapService.addPopupToMarker(this.marker.markerInstance, popup);
      } else {
        throw new Error(
          'mgl-popup need either lngLat/marker/feature to be set'
        );
      }
    });
  }

  private warnDeprecatedOutputs() {
    const dw = deprecationWarning.bind(undefined, PopupComponent.name);
    if (this.close.observers.length) {
      dw('close', 'popupClose');
    }
    if (this.open.observers.length) {
      dw('open', 'popupOpen');
    }
  }
}
