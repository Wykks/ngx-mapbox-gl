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
} from '@angular/core';
import { PointLike, Marker, LngLatLike } from 'mapbox-gl';

// NOTE
// Marker does not need to wait 'load' event from mapbox-gl,
// so we may be able to load them earlier like in the example of mapbox-gl
@Component({
  selector: 'mgl-marker',
  template: '<div #content><ng-content></ng-content></div>',
})
export class MarkerComponent implements OnChanges, OnDestroy, AfterViewInit, OnInit {
  /* Init input */
  @Input() offset: PointLike;

  /* Dynamic input */
  @Input() feature?: GeoJSON.Feature<GeoJSON.Point>;
  @Input() lngLat?: LngLatLike;

  @ViewChild('content') content: ElementRef;

  private marker: Marker;

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
      this.marker.setLngLat(this.lngLat!);
    }
    if (changes.feature && !changes.feature.isFirstChange()) {
      this.marker.setLngLat(this.feature!.geometry.coordinates);
    }
  }

  ngAfterViewInit() {
    this.marker = new Marker(this.content.nativeElement, { offset: this.offset });
    this.marker.setLngLat(this.feature ? this.feature.geometry.coordinates : this.lngLat!);
    this.MapService.addMarker(this.marker);
  }

  ngOnDestroy() {
    this.MapService.removeMarker(this.marker);
  }

}
