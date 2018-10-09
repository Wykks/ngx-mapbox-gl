import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import { LngLatLike, Marker, PointLike, Anchor } from 'mapbox-gl';
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
  @Input() anchor?: Anchor;

  /* Dynamic input */
  @Input() feature?: GeoJSON.Feature<GeoJSON.Point>;
  @Input() lngLat?: LngLatLike;
  @Input() draggable?: boolean;

  @Output() dragStart = new EventEmitter<Marker>();
  @Output() drag = new EventEmitter<Marker>();
  @Output() dragEnd = new EventEmitter<Marker>();

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
      this.markerInstance!.setLngLat(<[number, number]>this.feature!.geometry!.coordinates);
    }
    if (changes.draggable && !changes.draggable.isFirstChange()) {
      this.markerInstance!.setDraggable(!!this.draggable);
    }
  }

  ngAfterViewInit() {
    this.MapService.mapCreated$.subscribe(() => {
      this.markerInstance = this.MapService.addMarker({
        markersOptions: {
          offset: this.offset,
          anchor: this.anchor,
          draggable: !!this.draggable,
          element: this.content.nativeElement,
          feature: this.feature,
          lngLat: this.lngLat
        },
        markersEvents: {
          dragStart: this.dragStart,
          drag: this.drag,
          dragEnd: this.dragEnd
        }
      });
    });
  }

  ngOnDestroy() {
    this.MapService.removeMarker(this.markerInstance!);
    this.markerInstance = undefined;
  }

  togglePopup() {
    this.markerInstance!.togglePopup();
  }

  updateCoordinates(coordinates: [number, number]) {
    this.markerInstance!.setLngLat(coordinates);
  }
}
