/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, forwardRef, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { GeoJSONSourceComponent } from './geojson-source.component';
var FeatureComponent = /** @class */ (function () {
    function FeatureComponent(GeoJSONSourceComponent) {
        this.GeoJSONSourceComponent = GeoJSONSourceComponent;
        this.type = 'Feature';
    }
    /**
     * @return {?}
     */
    FeatureComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    FeatureComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.GeoJSONSourceComponent.removeFeature(this.feature);
    };
    /**
     * @param {?} coordinates
     * @return {?}
     */
    FeatureComponent.prototype.updateCoordinates = /**
     * @param {?} coordinates
     * @return {?}
     */
    function (coordinates) {
        (/** @type {?} */ (this.feature.geometry)).coordinates = coordinates;
        this.GeoJSONSourceComponent.updateFeatureData.next();
    };
    FeatureComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-feature',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    FeatureComponent.ctorParameters = function () { return [
        { type: GeoJSONSourceComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return GeoJSONSourceComponent; }),] }] }
    ]; };
    FeatureComponent.propDecorators = {
        id: [{ type: Input }],
        geometry: [{ type: Input }],
        properties: [{ type: Input }]
    };
    return FeatureComponent;
}());
export { FeatureComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFwYm94LWdsLyIsInNvdXJjZXMiOlsibGliL3NvdXJjZS9nZW9qc29uL2ZlYXR1cmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUFnQmxFLDBCQUM0RCxzQkFBOEM7UUFBOUMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtvQkFMeEYsU0FBUztLQU10Qjs7OztJQUVMLG1DQUFROzs7SUFBUjtRQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDbkQsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEQ7Ozs7SUFFRCxzQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6RDs7Ozs7SUFFRCw0Q0FBaUI7Ozs7SUFBakIsVUFBa0IsV0FBcUI7UUFDckMsbUJBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNqRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdEQ7O2dCQXRDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFOUSxzQkFBc0IsdUJBaUIxQixNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQzs7O3FCQVJqRCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzs7MkJBWlI7O1NBUWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdlb0pTT05Tb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL2dlb2pzb24tc291cmNlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1mZWF0dXJlJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGZWF0dXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PiB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkPzogbnVtYmVyOyAvLyBGSVhNRSBudW1iZXIgb25seSBmb3Igbm93IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LWdsLWpzL2lzc3Vlcy8yNzE2XG4gIEBJbnB1dCgpIGdlb21ldHJ5OiBHZW9KU09OLkdlb21ldHJ5T2JqZWN0O1xuICBASW5wdXQoKSBwcm9wZXJ0aWVzOiBhbnk7XG4gIHR5cGU6ICdGZWF0dXJlJyA9ICdGZWF0dXJlJztcblxuICBwcml2YXRlIGZlYXR1cmU6IEdlb0pTT04uRmVhdHVyZTxHZW9KU09OLkdlb21ldHJ5T2JqZWN0PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gR2VvSlNPTlNvdXJjZUNvbXBvbmVudCkpIHByaXZhdGUgR2VvSlNPTlNvdXJjZUNvbXBvbmVudDogR2VvSlNPTlNvdXJjZUNvbXBvbmVudFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgdGhpcy5pZCA9IHRoaXMuR2VvSlNPTlNvdXJjZUNvbXBvbmVudC5nZXROZXdGZWF0dXJlSWQoKTtcbiAgICB9XG4gICAgdGhpcy5mZWF0dXJlID0ge1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgZ2VvbWV0cnk6IHRoaXMuZ2VvbWV0cnksXG4gICAgICBwcm9wZXJ0aWVzOiB0aGlzLnByb3BlcnRpZXMgPyB0aGlzLnByb3BlcnRpZXMgOiB7fVxuICAgIH07XG4gICAgdGhpcy5mZWF0dXJlLmlkID0gdGhpcy5pZDtcbiAgICB0aGlzLkdlb0pTT05Tb3VyY2VDb21wb25lbnQuYWRkRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LnJlbW92ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKGNvb3JkaW5hdGVzOiBudW1iZXJbXSkge1xuICAgICg8R2VvSlNPTi5Qb2ludD50aGlzLmZlYXR1cmUuZ2VvbWV0cnkpLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XG4gICAgdGhpcy5HZW9KU09OU291cmNlQ29tcG9uZW50LnVwZGF0ZUZlYXR1cmVEYXRhLm5leHQoKTtcbiAgfVxufVxuIl19