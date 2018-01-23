import { LngLatLike, Marker, PointLike } from 'mapbox-gl';
import { MapService } from '../map/map.service';
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
} from '@angular/core';

@Component({
  selector: 'mgl-marker',
  template: '<div #content><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
  /* Init input */
  @Input() offset?: PointLike;

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
    this.markerInstance = new Marker(this.content.nativeElement, { offset: this.offset });
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
}
