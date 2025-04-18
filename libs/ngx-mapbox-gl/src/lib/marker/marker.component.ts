import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import type { LngLatLike, Marker, MarkerOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-marker',

  template: `
    <div [class]="className()" [style.z-index]="zIndex()" #content>
      <ng-content />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerComponent
  implements OnChanges, OnDestroy, AfterViewInit, OnInit
{
  private mapService = inject(MapService);

  /* Init input */
  offset = input<MarkerOptions['offset']>();
  anchor = input<MarkerOptions['anchor']>();
  clickTolerance = input<MarkerOptions['clickTolerance']>();

  /* Dynamic input */
  feature = input<GeoJSON.Feature<GeoJSON.Point>>();
  lngLat = input<LngLatLike>();
  draggable = input<MarkerOptions['draggable']>();
  popupShown = input<boolean>();
  className = input<string>();
  zIndex = input<number>();
  pitchAlignment = input<MarkerOptions['pitchAlignment']>();
  rotationAlignment = input<MarkerOptions['rotationAlignment']>();

  @Output() markerDragStart = new EventEmitter<Marker>();
  @Output() markerDragEnd = new EventEmitter<Marker>();
  @Output() markerDrag = new EventEmitter<Marker>();

  @ViewChild('content', { static: true }) content: ElementRef;

  markerInstance?: Marker;

  ngOnInit() {
    if (this.feature() && this.lngLat()) {
      throw new Error('feature and lngLat input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lngLat'] && !changes['lngLat'].isFirstChange()) {
      this.markerInstance!.setLngLat(this.lngLat()!);
    }
    if (changes['feature'] && !changes['feature'].isFirstChange()) {
      this.markerInstance!.setLngLat(
        this.feature()!.geometry!.coordinates as [number, number],
      );
    }
    if (changes['draggable'] && !changes['draggable'].isFirstChange()) {
      this.markerInstance!.setDraggable(!!this.draggable());
    }
    if (changes['popupShown'] && !changes['popupShown'].isFirstChange()) {
      changes['popupShown'].currentValue
        ? this.markerInstance!.getPopup()?.addTo(this.mapService.mapInstance)
        : this.markerInstance!.getPopup()?.remove();
    }
    if (
      changes['pitchAlignment'] &&
      !changes['pitchAlignment'].isFirstChange()
    ) {
      this.markerInstance!.setPitchAlignment(
        changes['pitchAlignment'].currentValue,
      );
    }
    if (
      changes['rotationAlignment'] &&
      !changes['rotationAlignment'].isFirstChange()
    ) {
      this.markerInstance!.setRotationAlignment(
        changes['rotationAlignment'].currentValue,
      );
    }
  }

  ngAfterViewInit() {
    this.mapService.mapCreated$.subscribe(() => {
      this.markerInstance = this.mapService.addMarker({
        markersOptions: {
          offset: this.offset(),
          anchor: this.anchor(),
          pitchAlignment: this.pitchAlignment(),
          rotationAlignment: this.rotationAlignment(),
          draggable: !!this.draggable(),
          element: this.content.nativeElement,
          feature: this.feature(),
          lngLat: this.lngLat(),
          clickTolerance: this.clickTolerance(),
        },
        markersEvents: {
          markerDragStart: this.markerDragStart,
          markerDrag: this.markerDrag,
          markerDragEnd: this.markerDragEnd,
        },
      });
    });
  }

  ngOnDestroy() {
    this.mapService.removeMarker(this.markerInstance!);
    this.markerInstance = undefined;
  }

  togglePopup() {
    this.markerInstance!.togglePopup();
  }

  updateCoordinates(coordinates: number[]) {
    this.markerInstance!.setLngLat(coordinates as [number, number]);
  }
}
