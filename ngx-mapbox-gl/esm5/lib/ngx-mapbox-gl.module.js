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
var NgxMapboxGLModule = /** @class */ (function () {
    function NgxMapboxGLModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NgxMapboxGLModule.withConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
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
    };
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
    return NgxMapboxGLModule;
}());
export { NgxMapboxGLModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hcGJveC1nbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL25neC1tYXBib3gtZ2wubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDekcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7OztJQTBEOUQsNEJBQVU7Ozs7SUFBakIsVUFBa0IsTUFBNkQ7UUFDN0UsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVztpQkFDN0I7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsSUFBSSxNQUFNLENBQUMsV0FBVztpQkFDM0Q7YUFDRjtTQUNGLENBQUM7S0FDSDs7Z0JBdEVGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osWUFBWTt3QkFDWixjQUFjO3dCQUNkLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxxQkFBcUI7d0JBQ3JCLHNCQUFzQjt3QkFDdEIscUJBQXFCO3dCQUNyQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3dCQUNyQixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsMkJBQTJCO3dCQUMzQixxQkFBcUI7d0JBQ3JCLGNBQWM7d0JBQ2QscUJBQXFCO3dCQUNyQixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2Qsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0QixxQkFBcUI7d0JBQ3JCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLGdCQUFnQjt3QkFDaEIsMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLHdCQUF3Qjt3QkFDeEIseUJBQXlCO3dCQUN6QiwyQkFBMkI7d0JBQzNCLHFCQUFxQjt3QkFDckIsY0FBYzt3QkFDZCxxQkFBcUI7d0JBQ3JCLHNCQUFzQjtxQkFDdkI7aUJBQ0Y7OzRCQS9FRDs7U0FnRmEsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvYXR0cmlidXRpb24tY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC9jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdWxsc2NyZWVuQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9mdWxsc2NyZWVuLWNvbnRyb2wuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSwgTUFQQk9YX0dFT0NPREVSX0FQSV9LRVkgfSBmcm9tICcuL2NvbnRyb2wvZ2VvY29kZXItY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR2VvbG9jYXRlQ29udHJvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29udHJvbC9nZW9sb2NhdGUtY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvbmF2aWdhdGlvbi1jb250cm9sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY2FsZUNvbnRyb2xEaXJlY3RpdmUgfSBmcm9tICcuL2NvbnRyb2wvc2NhbGUtY29udHJvbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnZ2FibGUvZHJhZ2dhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2UvaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IExheWVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwQ29tcG9uZW50IH0gZnJvbSAnLi9tYXAvbWFwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNQVBCT1hfQVBJX0tFWSB9IGZyb20gJy4vbWFwL21hcC5zZXJ2aWNlJztcbmltcG9ydCB7IENsdXN0ZXJQb2ludERpcmVjdGl2ZSwgTWFya2VyQ2x1c3RlckNvbXBvbmVudCwgUG9pbnREaXJlY3RpdmUgfSBmcm9tICcuL21hcmtlci1jbHVzdGVyL21hcmtlci1jbHVzdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9wb3B1cC9wb3B1cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvY2FudmFzLXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2dlb2pzb24vZmVhdHVyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2VvSlNPTlNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL2dlb2pzb24vZ2VvanNvbi1zb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IEltYWdlU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9zb3VyY2UvaW1hZ2Utc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYXN0ZXJTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS9yYXN0ZXItc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWZWN0b3JTb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL3NvdXJjZS92ZWN0b3Itc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWRlb1NvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vc291cmNlL3ZpZGVvLXNvdXJjZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hcENvbXBvbmVudCxcbiAgICBMYXllckNvbXBvbmVudCxcbiAgICBEcmFnZ2FibGVEaXJlY3RpdmUsXG4gICAgSW1hZ2VDb21wb25lbnQsXG4gICAgVmVjdG9yU291cmNlQ29tcG9uZW50LFxuICAgIEdlb0pTT05Tb3VyY2VDb21wb25lbnQsXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxuICAgIFZpZGVvU291cmNlQ29tcG9uZW50LFxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBQb3B1cENvbXBvbmVudCxcbiAgICBDb250cm9sQ29tcG9uZW50LFxuICAgIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSxcbiAgICBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlLFxuICAgIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSxcbiAgICBTY2FsZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgUG9pbnREaXJlY3RpdmUsXG4gICAgQ2x1c3RlclBvaW50RGlyZWN0aXZlLFxuICAgIE1hcmtlckNsdXN0ZXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1hcENvbXBvbmVudCxcbiAgICBMYXllckNvbXBvbmVudCxcbiAgICBEcmFnZ2FibGVEaXJlY3RpdmUsXG4gICAgSW1hZ2VDb21wb25lbnQsXG4gICAgVmVjdG9yU291cmNlQ29tcG9uZW50LFxuICAgIEdlb0pTT05Tb3VyY2VDb21wb25lbnQsXG4gICAgUmFzdGVyU291cmNlQ29tcG9uZW50LFxuICAgIEltYWdlU291cmNlQ29tcG9uZW50LFxuICAgIFZpZGVvU291cmNlQ29tcG9uZW50LFxuICAgIENhbnZhc1NvdXJjZUNvbXBvbmVudCxcbiAgICBGZWF0dXJlQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBQb3B1cENvbXBvbmVudCxcbiAgICBDb250cm9sQ29tcG9uZW50LFxuICAgIEZ1bGxzY3JlZW5Db250cm9sRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db250cm9sRGlyZWN0aXZlLFxuICAgIEdlb2NvZGVyQ29udHJvbERpcmVjdGl2ZSxcbiAgICBHZW9sb2NhdGVDb250cm9sRGlyZWN0aXZlLFxuICAgIEF0dHJpYnV0aW9uQ29udHJvbERpcmVjdGl2ZSxcbiAgICBTY2FsZUNvbnRyb2xEaXJlY3RpdmUsXG4gICAgUG9pbnREaXJlY3RpdmUsXG4gICAgQ2x1c3RlclBvaW50RGlyZWN0aXZlLFxuICAgIE1hcmtlckNsdXN0ZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXBib3hHTE1vZHVsZSB7XG4gIHN0YXRpYyB3aXRoQ29uZmlnKGNvbmZpZzogeyBhY2Nlc3NUb2tlbjogc3RyaW5nLCBnZW9jb2RlckFjY2Vzc1Rva2VuPzogc3RyaW5nIH0pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1hcGJveEdMTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNQVBCT1hfQVBJX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLmFjY2Vzc1Rva2VuXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNQVBCT1hfR0VPQ09ERVJfQVBJX0tFWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLmdlb2NvZGVyQWNjZXNzVG9rZW4gfHwgY29uZmlnLmFjY2Vzc1Rva2VuXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19