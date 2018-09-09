/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AttributionControlDirective } from './control/attribution-control.directive';
import { ControlComponent } from './control/control.component';
import { FullscreenControlDirective } from './control/fullscreen-control.directive';
import { GeocoderControlDirective, MAPBOX_GEOCODER_API_KEY } from './control/geocoder-control.directive';
import { GeolocateControlDirective } from './control/geolocate-control.directive';
import { NavigationControlDirective } from './control/navigation-control.directive';
import { ScaleControlDirective } from './control/scale-control.directive';
import { DraggableDirective } from './draggable/draggable.directive';
import { ImageComponent } from './image/image.component';
import { LayerComponent } from './layer/layer.component';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';
import { ClusterPointDirective, MarkerClusterComponent, PointDirective } from './marker-cluster/marker-cluster.component';
import { MarkerComponent } from './marker/marker.component';
import { PopupComponent } from './popup/popup.component';
import { CanvasSourceComponent } from './source/canvas-source.component';
import { FeatureComponent } from './source/geojson/feature.component';
import { GeoJSONSourceComponent } from './source/geojson/geojson-source.component';
import { ImageSourceComponent } from './source/image-source.component';
import { RasterSourceComponent } from './source/raster-source.component';
import { VectorSourceComponent } from './source/vector-source.component';
import { VideoSourceComponent } from './source/video-source.component';
export class NgxMapboxGLModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static withConfig(config) {
        return {
            ngModule: NgxMapboxGLModule,
            providers: [
                {
                    provide: MAPBOX_API_KEY,
                    useValue: config.accessToken
                },
                {
                    provide: MAPBOX_GEOCODER_API_KEY,
                    useValue: config.geocoderAccessToken || config.accessToken
                }
            ],
        };
    }
}
NgxMapboxGLModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    MapComponent,
                    LayerComponent,
                    DraggableDirective,
                    ImageComponent,
                    VectorSourceComponent,
                    GeoJSONSourceComponent,
                    RasterSourceComponent,
                    ImageSourceComponent,
                    VideoSourceComponent,
                    CanvasSourceComponent,
                    FeatureComponent,
                    MarkerComponent,
                    PopupComponent,
                    ControlComponent,
                    FullscreenControlDirective,
                    NavigationControlDirective,
                    GeocoderControlDirective,
                    GeolocateControlDirective,
                    AttributionControlDirective,
                    ScaleControlDirective,
                    PointDirective,
                    ClusterPointDirective,
                    MarkerClusterComponent
                ],
                exports: [
                    MapComponent,
                    LayerComponent,
                    DraggableDirective,
                    ImageComponent,
                    VectorSourceComponent,
                    GeoJSONSourceComponent,
                    RasterSourceComponent,
                    ImageSourceComponent,
                    VideoSourceComponent,
                    CanvasSourceComponent,
                    FeatureComponent,
                    MarkerComponent,
                    PopupComponent,
                    ControlComponent,
                    FullscreenControlDirective,
                    NavigationControlDirective,
                    GeocoderControlDirective,
                    GeolocateControlDirective,
                    AttributionControlDirective,
                    ScaleControlDirective,
                    PointDirective,
                    ClusterPointDirective,
                    MarkerClusterComponent
                ]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL25neC1tYXBib3gtZ2wubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBeUR2RSxNQUFNOzs7OztJQUNKLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkQ7UUFDN0UsT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVc7aUJBQzdCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CLElBQUksTUFBTSxDQUFDLFdBQVc7aUJBQzNEO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7OztZQXRFRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLFlBQVk7b0JBQ1osY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QscUJBQXFCO29CQUNyQixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQiwwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsd0JBQXdCO29CQUN4Qix5QkFBeUI7b0JBQ3pCLDJCQUEyQjtvQkFDM0IscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLHFCQUFxQjtvQkFDckIsc0JBQXNCO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixjQUFjO29CQUNkLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxnQkFBZ0I7b0JBQ2hCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsMkJBQTJCO29CQUMzQixxQkFBcUI7b0JBQ3JCLGNBQWM7b0JBQ2QscUJBQXFCO29CQUNyQixzQkFBc0I7aUJBQ3ZCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9hdHRyaWJ1dGlvbi1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sL2NvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2Z1bGxzY3JlZW4tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLCBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSB9IGZyb20gJy4vY29udHJvbC9nZW9jb2Rlci1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2dlb2xvY2F0ZS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9uYXZpZ2F0aW9uLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjYWxlQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9zY2FsZS1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RyYWdnYWJsZS9kcmFnZ2FibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZS9pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuL2xheWVyL2xheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBDb21wb25lbnQgfSBmcm9tICcuL21hcC9tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IE1BUEJPWF9BUElfS0VZIH0gZnJvbSAnLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2x1c3RlclBvaW50RGlyZWN0aXZlLCBNYXJrZXJDbHVzdGVyQ29tcG9uZW50LCBQb2ludERpcmVjdGl2ZSB9IGZyb20gJy4vbWFya2VyLWNsdXN0ZXIvbWFya2VyLWNsdXN0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL3BvcHVwL3BvcHVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW52YXNTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9jYW52YXMtc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9mZWF0dXJlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvZ2VvanNvbi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW1hZ2VTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9pbWFnZS1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFJhc3RlclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3Jhc3Rlci1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZlY3RvclNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZlY3Rvci1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZGVvU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvdmlkZW8tc291cmNlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJTb3VyY2VDb21wb25lbnQsXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXG4gICAgQ2FudmFzU291cmNlQ29tcG9uZW50LFxuICAgIEZlYXR1cmVDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFBvcHVwQ29tcG9uZW50LFxuICAgIENvbnRyb2xDb21wb25lbnQsXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2VyQ2x1c3RlckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWFwQ29tcG9uZW50LFxuICAgIExheWVyQ29tcG9uZW50LFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBJbWFnZUNvbXBvbmVudCxcbiAgICBWZWN0b3JTb3VyY2VDb21wb25lbnQsXG4gICAgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCxcbiAgICBSYXN0ZXJTb3VyY2VDb21wb25lbnQsXG4gICAgSW1hZ2VTb3VyY2VDb21wb25lbnQsXG4gICAgVmlkZW9Tb3VyY2VDb21wb25lbnQsXG4gICAgQ2FudmFzU291cmNlQ29tcG9uZW50LFxuICAgIEZlYXR1cmVDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFBvcHVwQ29tcG9uZW50LFxuICAgIENvbnRyb2xDb21wb25lbnQsXG4gICAgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvY29kZXJDb250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIFNjYWxlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBQb2ludERpcmVjdGl2ZSxcbiAgICBDbHVzdGVyUG9pbnREaXJlY3RpdmUsXG4gICAgTWFya2VyQ2x1c3RlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hcGJveEdMTW9kdWxlIHtcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiB7IGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGdlb2NvZGVyQWNjZXNzVG9rZW4/OiBzdHJpbmcgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWFwYm94R0xNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9BUElfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuYWNjZXNzVG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuZ2VvY29kZXJBY2Nlc3NUb2tlbiB8fCBjb25maWcuYWNjZXNzVG9rZW5cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=