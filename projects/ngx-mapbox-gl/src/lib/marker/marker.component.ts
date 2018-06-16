import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild,
    AfterViewInit,
    OnInit,
    ChangeDetectionStrategy,
    ViewEncapsulation
} from '@angular/core';
import { LngLatLike, Marker, PointLike } from 'mapbox-gl';
import { MapService } from '../map/map.service';

@Component({
  selector: 'mgl-marker',
  template: '<div #content><ng-content></ng-content></div>',
  styles: [`
    .mapboxgl-marker {
      line-height: 0;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
  /* Init input */
  @Input() offset?: PointLike;
  @Input() anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /* Dynamic input */
  @Input() feature?: GeoJSON.Feature<GeoJSON.Point>;
  @Input() lngLat?: LngLatLike;

  @ViewChild('content') content: ElementRef;

  markerInstance?: Marker;

  constructor(
    private MapService: MapService
  ) { }

  ngOnInit() {
    if (this.feature && this.lngLat) {
      throw new Error('feature and lngLat input are mutually exclusive');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.lngLat && !changes.lngLat.isFirstChange()) {
      this.markerInstance!.setLngLat(this.lngLat!);
    }
    if (changes.feature && !changes.feature.isFirstChange()) {
      this.markerInstance!.setLngLat(this.feature!.geometry!.coordinates);
    }
  }

  ngAfterViewInit() {
    this.markerInstance = new Marker(<any>{ offset: this.offset, element: this.content.nativeElement, anchor: this.anchor });
    this.markerInstance.setLngLat(this.feature ? this.feature.geometry!.coordinates : this.lngLat!);
    this.MapService.mapCreated$.subscribe(() => {
      this.MapService.addMarker(this.markerInstance!);
    });
  }

  ngOnDestroy() {
    this.MapService.removeMarker(this.markerInstance!);
    this.markerInstance = undefined;
  }

  togglePopup() {
    this.markerInstance!.togglePopup();
  }

  updateCoordinates(coordinates: number[]) {
    this.markerInstance!.setLngLat(coordinates);
  }
}
