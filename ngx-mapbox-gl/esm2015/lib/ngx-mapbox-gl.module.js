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
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL25neC1tYXBib3gtZ2wubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBeUR2RSxNQUFNOzs7OztJQUNKLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkQ7UUFDN0UsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVztpQkFDN0I7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsSUFBSSxNQUFNLENBQUMsV0FBVztpQkFDM0Q7YUFDRjtTQUNGLENBQUM7S0FDSDs7O1lBdEVGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osWUFBWTtvQkFDWixjQUFjO29CQUNkLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxnQkFBZ0I7b0JBQ2hCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsMkJBQTJCO29CQUMzQixxQkFBcUI7b0JBQ3JCLGNBQWM7b0JBQ2QscUJBQXFCO29CQUNyQixzQkFBc0I7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0QixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsMEJBQTBCO29CQUMxQiwwQkFBMEI7b0JBQzFCLHdCQUF3QjtvQkFDeEIseUJBQXlCO29CQUN6QiwyQkFBMkI7b0JBQzNCLHFCQUFxQjtvQkFDckIsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLHNCQUFzQjtpQkFDdkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25Db250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL2F0dHJpYnV0aW9uLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRyb2xDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wvY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnVsbHNjcmVlbkNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvZnVsbHNjcmVlbi1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHZW9jb2RlckNvbnRyb2xEaXJlY3RpdmUsIE1BUEJPWF9HRU9DT0RFUl9BUElfS0VZIH0gZnJvbSAnLi9jb250cm9sL2dlb2NvZGVyLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdlb2xvY2F0ZUNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvZ2VvbG9jYXRlLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL25hdmlnYXRpb24tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2NhbGVDb250cm9sRGlyZWN0aXZlIH0gZnJvbSAnLi9jb250cm9sL3NjYWxlLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWdnYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZ2dhYmxlL2RyYWdnYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSW1hZ2VDb21wb25lbnQgfSBmcm9tICcuL2ltYWdlL2ltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMYXllckNvbXBvbmVudCB9IGZyb20gJy4vbGF5ZXIvbGF5ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcENvbXBvbmVudCB9IGZyb20gJy4vbWFwL21hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTUFQQk9YX0FQSV9LRVkgfSBmcm9tICcuL21hcC9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBDbHVzdGVyUG9pbnREaXJlY3RpdmUsIE1hcmtlckNsdXN0ZXJDb21wb25lbnQsIFBvaW50RGlyZWN0aXZlIH0gZnJvbSAnLi9tYXJrZXItY2x1c3Rlci9tYXJrZXItY2x1c3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3B1cENvbXBvbmVudCB9IGZyb20gJy4vcG9wdXAvcG9wdXAuY29tcG9uZW50JztcbmltcG9ydCB7IENhbnZhc1NvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2NhbnZhcy1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZlYXR1cmVDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9nZW9qc29uL2ZlYXR1cmUuY29tcG9uZW50JztcbmltcG9ydCB7IEdlb0pTT05Tb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9nZW9qc29uL2dlb2pzb24tc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbWFnZVNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2ltYWdlLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmFzdGVyU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvcmFzdGVyLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmVjdG9yU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvdmVjdG9yLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlkZW9Tb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS92aWRlby1zb3VyY2UuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXBDb21wb25lbnQsXG4gICAgTGF5ZXJDb21wb25lbnQsXG4gICAgRHJhZ2dhYmxlRGlyZWN0aXZlLFxuICAgIEltYWdlQ29tcG9uZW50LFxuICAgIFZlY3RvclNvdXJjZUNvbXBvbmVudCxcbiAgICBHZW9KU09OU291cmNlQ29tcG9uZW50LFxuICAgIFJhc3RlclNvdXJjZUNvbXBvbmVudCxcbiAgICBJbWFnZVNvdXJjZUNvbXBvbmVudCxcbiAgICBWaWRlb1NvdXJjZUNvbXBvbmVudCxcbiAgICBDYW52YXNTb3VyY2VDb21wb25lbnQsXG4gICAgRmVhdHVyZUNvbXBvbmVudCxcbiAgICBNYXJrZXJDb21wb25lbnQsXG4gICAgUG9wdXBDb21wb25lbnQsXG4gICAgQ29udHJvbENvbXBvbmVudCxcbiAgICBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSxcbiAgICBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSxcbiAgICBHZW9jb2RlckNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgU2NhbGVDb250cm9sRGlyZWN0aXZlLFxuICAgIFBvaW50RGlyZWN0aXZlLFxuICAgIENsdXN0ZXJQb2ludERpcmVjdGl2ZSxcbiAgICBNYXJrZXJDbHVzdGVyQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNYXBDb21wb25lbnQsXG4gICAgTGF5ZXJDb21wb25lbnQsXG4gICAgRHJhZ2dhYmxlRGlyZWN0aXZlLFxuICAgIEltYWdlQ29tcG9uZW50LFxuICAgIFZlY3RvclNvdXJjZUNvbXBvbmVudCxcbiAgICBHZW9KU09OU291cmNlQ29tcG9uZW50LFxuICAgIFJhc3RlclNvdXJjZUNvbXBvbmVudCxcbiAgICBJbWFnZVNvdXJjZUNvbXBvbmVudCxcbiAgICBWaWRlb1NvdXJjZUNvbXBvbmVudCxcbiAgICBDYW52YXNTb3VyY2VDb21wb25lbnQsXG4gICAgRmVhdHVyZUNvbXBvbmVudCxcbiAgICBNYXJrZXJDb21wb25lbnQsXG4gICAgUG9wdXBDb21wb25lbnQsXG4gICAgQ29udHJvbENvbXBvbmVudCxcbiAgICBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSxcbiAgICBOYXZpZ2F0aW9uQ29udHJvbERpcmVjdGl2ZSxcbiAgICBHZW9jb2RlckNvbnRyb2xEaXJlY3RpdmUsXG4gICAgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSxcbiAgICBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUsXG4gICAgU2NhbGVDb250cm9sRGlyZWN0aXZlLFxuICAgIFBvaW50RGlyZWN0aXZlLFxuICAgIENsdXN0ZXJQb2ludERpcmVjdGl2ZSxcbiAgICBNYXJrZXJDbHVzdGVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWFwYm94R0xNb2R1bGUge1xuICBzdGF0aWMgd2l0aENvbmZpZyhjb25maWc6IHsgYWNjZXNzVG9rZW46IHN0cmluZywgZ2VvY29kZXJBY2Nlc3NUb2tlbj86IHN0cmluZyB9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hNYXBib3hHTE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUFQQk9YX0FQSV9LRVksXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5hY2Nlc3NUb2tlblxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUFQQk9YX0dFT0NPREVSX0FQSV9LRVksXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5nZW9jb2RlckFjY2Vzc1Rva2VuIHx8IGNvbmZpZy5hY2Nlc3NUb2tlblxuICAgICAgICB9XG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==