/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, forwardRef, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
export class FeatureComponent {
    /**
     * @param {?} GeoJSONSourceComponent
     */
    constructor(GeoJSONSourceComponent) {
        this.GeoJSONSourceComponent = GeoJSONSourceComponent;
        this.type = 'Feature';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.id) {
            this.id = this.GeoJSONSourceComponent.getNewFeatureId();
        }
        this.feature = {
            type: this.type,
            geometry: this.geometry,
            properties: this.properties ? this.properties : {}
        };
        this.feature.id = this.id;
        this.GeoJSONSourceComponent.addFeature(this.feature);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.GeoJSONSourceComponent.removeFeature(this.feature);
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    updateCoordinates(coordinates) {
        (/** @type {?} */ (this.feature.geometry)).coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next();
    }
}
FeatureComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-feature',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
FeatureComponent.ctorParameters = () => [
    { type: GeoJSONSourceComponent, decorators: [{ type: Inject, args: [forwardRef(() => GeoJSONSourceComponent),] }] }
];
FeatureComponent.propDecorators = {
    id: [{ type: Input }],
    geometry: [{ type: Input }],
    properties: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FeatureComponent.prototype.id;
    /** @type {?} */
    FeatureComponent.prototype.geometry;
    /** @type {?} */
    FeatureComponent.prototype.properties;
    /** @type {?} */
    FeatureComponent.prototype.type;
    /** @type {?} */
    FeatureComponent.prototype.feature;
    /** @type {?} */
    FeatureComponent.prototype.GeoJSONSourceComponent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZS9nZW9qc29uL2ZlYXR1cmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU9wRSxNQUFNOzs7O0lBU0osWUFDNEQsc0JBQThDO1FBQTlDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7b0JBTHhGLFNBQVM7S0FNdEI7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDbkQsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEQ7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekQ7Ozs7O0lBRUQsaUJBQWlCLENBQUMsV0FBcUI7UUFDckMsbUJBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNqRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdEQ7OztZQXRDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBTlEsc0JBQXNCLHVCQWlCMUIsTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzs7O2lCQVJqRCxLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZW9KU09OU291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9nZW9qc29uLXNvdXJjZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtZmVhdHVyZScsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRmVhdHVyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4ge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZD86IG51bWJlcjsgLy8gRklYTUUgbnVtYmVyIG9ubHkgZm9yIG5vdyBodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC1nbC1qcy9pc3N1ZXMvMjcxNlxuICBASW5wdXQoKSBnZW9tZXRyeTogR2VvSlNPTi5HZW9tZXRyeU9iamVjdDtcbiAgQElucHV0KCkgcHJvcGVydGllczogYW55O1xuICB0eXBlOiAnRmVhdHVyZScgPSAnRmVhdHVyZSc7XG5cbiAgcHJpdmF0ZSBmZWF0dXJlOiBHZW9KU09OLkZlYXR1cmU8R2VvSlNPTi5HZW9tZXRyeU9iamVjdD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEdlb0pTT05Tb3VyY2VDb21wb25lbnQpKSBwcml2YXRlIEdlb0pTT05Tb3VyY2VDb21wb25lbnQ6IEdlb0pTT05Tb3VyY2VDb21wb25lbnRcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQuZ2V0TmV3RmVhdHVyZUlkKCk7XG4gICAgfVxuICAgIHRoaXMuZmVhdHVyZSA9IHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGdlb21ldHJ5OiB0aGlzLmdlb21ldHJ5LFxuICAgICAgcHJvcGVydGllczogdGhpcy5wcm9wZXJ0aWVzID8gdGhpcy5wcm9wZXJ0aWVzIDoge31cbiAgICB9O1xuICAgIHRoaXMuZmVhdHVyZS5pZCA9IHRoaXMuaWQ7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LmFkZEZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5yZW1vdmVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gIH1cblxuICB1cGRhdGVDb29yZGluYXRlcyhjb29yZGluYXRlczogbnVtYmVyW10pIHtcbiAgICAoPEdlb0pTT04uUG9pbnQ+dGhpcy5mZWF0dXJlLmdlb21ldHJ5KS5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgIHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC51cGRhdGVGZWF0dXJlRGF0YS5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==