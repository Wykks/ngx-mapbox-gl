/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapService } from '../map/map.service';
export class LayerComponent {
    /**
     * @param {?} MapService
     */
    constructor(MapService) {
        this.MapService = MapService;
        this.click = new EventEmitter();
        this.mouseEnter = new EventEmitter();
        this.mouseLeave = new EventEmitter();
        this.mouseMove = new EventEmitter();
        this.layerAdded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => {
            this.MapService.addLayer({
                layerOptions: {
                    id: this.id,
                    type: this.type,
                    source: this.source,
                    metadata: this.metadata,
                    'source-layer': this.sourceLayer,
                    minzoom: this.minzoom,
                    maxzoom: this.maxzoom,
                    filter: this.filter,
                    layout: this.layout,
                    paint: this.paint
                },
                layerEvents: {
                    click: this.click,
                    mouseEnter: this.mouseEnter,
                    mouseLeave: this.mouseLeave,
                    mouseMove: this.mouseMove
                }
            }, this.before);
            this.layerAdded = true;
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.layerAdded) {
            return;
        }
        if (changes["paint"] && !changes["paint"].isFirstChange()) {
            this.MapService.setAllLayerPaintProperty(this.id, /** @type {?} */ ((changes["paint"].currentValue)));
        }
        if (changes["layout"] && !changes["layout"].isFirstChange()) {
            this.MapService.setAllLayerLayoutProperty(this.id, /** @type {?} */ ((changes["layout"].currentValue)));
        }
        if (changes["filter"] && !changes["filter"].isFirstChange()) {
            this.MapService.setLayerFilter(this.id, /** @type {?} */ ((changes["filter"].currentValue)));
        }
        if (changes["before"] && !changes["before"].isFirstChange()) {
            this.MapService.setLayerBefore(this.id, /** @type {?} */ ((changes["before"].currentValue)));
        }
        if (changes["minzoom"] && !changes["minzoom"].isFirstChange() ||
            changes["maxzoom"] && !changes["maxzoom"].isFirstChange()) {
            this.MapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.layerAdded) {
            this.MapService.removeLayer(this.id);
        }
    }
}
LayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-layer',
                template: ''
            },] },
];
/** @nocollapse */
LayerComponent.ctorParameters = () => [
    { type: MapService }
];
LayerComponent.propDecorators = {
    id: [{ type: Input }],
    source: [{ type: Input }],
    type: [{ type: Input }],
    metadata: [{ type: Input }],
    sourceLayer: [{ type: Input }],
    filter: [{ type: Input }],
    layout: [{ type: Input }],
    paint: [{ type: Input }],
    before: [{ type: Input }],
    minzoom: [{ type: Input }],
    maxzoom: [{ type: Input }],
    click: [{ type: Output }],
    mouseEnter: [{ type: Output }],
    mouseLeave: [{ type: Output }],
    mouseMove: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    LayerComponent.prototype.id;
    /** @type {?} */
    LayerComponent.prototype.source;
    /** @type {?} */
    LayerComponent.prototype.type;
    /** @type {?} */
    LayerComponent.prototype.metadata;
    /** @type {?} */
    LayerComponent.prototype.sourceLayer;
    /** @type {?} */
    LayerComponent.prototype.filter;
    /** @type {?} */
    LayerComponent.prototype.layout;
    /** @type {?} */
    LayerComponent.prototype.paint;
    /** @type {?} */
    LayerComponent.prototype.before;
    /** @type {?} */
    LayerComponent.prototype.minzoom;
    /** @type {?} */
    LayerComponent.prototype.maxzoom;
    /** @type {?} */
    LayerComponent.prototype.click;
    /** @type {?} */
    LayerComponent.prototype.mouseEnter;
    /** @type {?} */
    LayerComponent.prototype.mouseLeave;
    /** @type {?} */
    LayerComponent.prototype.mouseMove;
    /** @type {?} */
    LayerComponent.prototype.layerAdded;
    /** @type {?} */
    LayerComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUF5QnZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU1oRCxNQUFNOzs7O0lBdUJKLFlBQ1U7UUFBQSxlQUFVLEdBQVYsVUFBVTtxQkFSRixJQUFJLFlBQVksRUFBaUI7MEJBQzVCLElBQUksWUFBWSxFQUFpQjswQkFDakMsSUFBSSxZQUFZLEVBQWlCO3lCQUNsQyxJQUFJLFlBQVksRUFBaUI7MEJBRWxDLEtBQUs7S0FJckI7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztnQkFDdkIsWUFBWSxFQUFFO29CQUNaLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVztvQkFDaEMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ2xCO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO29CQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQzFCO2FBQ0YsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDeEIsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDO1NBQ1I7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLGFBQVUsQ0FBQyxPQUFPLFVBQU8sYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUUscUJBQUUsT0FBTyxVQUFPLFlBQVksR0FBRSxDQUFDO1NBQ2hGO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxFQUFFLHFCQUFFLE9BQU8sV0FBUSxZQUFZLEdBQUUsQ0FBQztTQUNsRjtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sY0FBVyxDQUFDLE9BQU8sV0FBUSxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUscUJBQUUsT0FBTyxXQUFRLFlBQVksR0FBRSxDQUFDO1NBQ3ZFO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxxQkFBRSxPQUFPLFdBQVEsWUFBWSxHQUFFLENBQUM7U0FDdkU7UUFDRCxFQUFFLENBQUMsQ0FDRCxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFO1lBQ25ELE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxhQUFhLEVBQ25ELENBQUMsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hFO0tBQ0Y7Ozs7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO0tBQ0Y7OztZQXJGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRSxFQUFFO2FBQ2I7Ozs7WUFMUSxVQUFVOzs7aUJBUWhCLEtBQUs7cUJBQ0wsS0FBSzttQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFHTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztvQkFFTCxNQUFNO3lCQUNOLE1BQU07eUJBQ04sTUFBTTt3QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYWNrZ3JvdW5kTGF5b3V0LFxuICBCYWNrZ3JvdW5kUGFpbnQsXG4gIENpcmNsZUxheW91dCxcbiAgQ2lyY2xlUGFpbnQsXG4gIEZpbGxFeHRydXNpb25MYXlvdXQsXG4gIEZpbGxFeHRydXNpb25QYWludCxcbiAgRmlsbExheW91dCxcbiAgRmlsbFBhaW50LFxuICBHZW9KU09OU291cmNlLFxuICBHZW9KU09OU291cmNlUmF3LFxuICBJbWFnZVNvdXJjZSxcbiAgTGF5ZXIsXG4gIExpbmVMYXlvdXQsXG4gIExpbmVQYWludCxcbiAgTWFwTW91c2VFdmVudCxcbiAgUmFzdGVyTGF5b3V0LFxuICBSYXN0ZXJQYWludCxcbiAgUmFzdGVyU291cmNlLFxuICBTeW1ib2xMYXlvdXQsXG4gIFN5bWJvbFBhaW50LFxuICBWZWN0b3JTb3VyY2UsXG4gIFZpZGVvU291cmNlXG59IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vbWFwL21hcC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWxheWVyJyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIExheWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgTGF5ZXIge1xuICAvKiBJbml0IGlucHV0cyAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBzb3VyY2U/OiBzdHJpbmcgfCBWZWN0b3JTb3VyY2UgfCBSYXN0ZXJTb3VyY2UgfCBHZW9KU09OU291cmNlIHwgSW1hZ2VTb3VyY2UgfCBWaWRlb1NvdXJjZSB8IEdlb0pTT05Tb3VyY2VSYXc7XG4gIEBJbnB1dCgpIHR5cGU6ICdzeW1ib2wnIHwgJ2ZpbGwnIHwgJ2xpbmUnIHwgJ2NpcmNsZScgfCAnZmlsbC1leHRydXNpb24nIHwgJ3Jhc3RlcicgfCAnYmFja2dyb3VuZCc7XG4gIEBJbnB1dCgpIG1ldGFkYXRhPzogYW55O1xuICBASW5wdXQoKSBzb3VyY2VMYXllcj86IHN0cmluZztcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBmaWx0ZXI/OiBhbnlbXTtcbiAgQElucHV0KCkgbGF5b3V0PzogQmFja2dyb3VuZExheW91dCB8IEZpbGxMYXlvdXQgfCBGaWxsRXh0cnVzaW9uTGF5b3V0IHwgTGluZUxheW91dCB8IFN5bWJvbExheW91dCB8IFJhc3RlckxheW91dCB8IENpcmNsZUxheW91dDtcbiAgQElucHV0KCkgcGFpbnQ/OiBCYWNrZ3JvdW5kUGFpbnQgfCBGaWxsUGFpbnQgfCBGaWxsRXh0cnVzaW9uUGFpbnQgfCBMaW5lUGFpbnQgfCBTeW1ib2xQYWludCB8IFJhc3RlclBhaW50IHwgQ2lyY2xlUGFpbnQ7XG4gIEBJbnB1dCgpIGJlZm9yZT86IHN0cmluZztcbiAgQElucHV0KCkgbWluem9vbT86IG51bWJlcjtcbiAgQElucHV0KCkgbWF4em9vbT86IG51bWJlcjtcblxuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcblxuICBwcml2YXRlIGxheWVyQWRkZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIE1hcFNlcnZpY2U6IE1hcFNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2UubWFwTG9hZGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmFkZExheWVyKHtcbiAgICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgICAgbWV0YWRhdGE6IHRoaXMubWV0YWRhdGEsXG4gICAgICAgICAgJ3NvdXJjZS1sYXllcic6IHRoaXMuc291cmNlTGF5ZXIsXG4gICAgICAgICAgbWluem9vbTogdGhpcy5taW56b29tLFxuICAgICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICAgIGxheW91dDogdGhpcy5sYXlvdXQsXG4gICAgICAgICAgcGFpbnQ6IHRoaXMucGFpbnRcbiAgICAgICAgfSxcbiAgICAgICAgbGF5ZXJFdmVudHM6IHtcbiAgICAgICAgICBjbGljazogdGhpcy5jbGljayxcbiAgICAgICAgICBtb3VzZUVudGVyOiB0aGlzLm1vdXNlRW50ZXIsXG4gICAgICAgICAgbW91c2VMZWF2ZTogdGhpcy5tb3VzZUxlYXZlLFxuICAgICAgICAgIG1vdXNlTW92ZTogdGhpcy5tb3VzZU1vdmVcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5iZWZvcmUpO1xuICAgICAgdGhpcy5sYXllckFkZGVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoIXRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wYWludCAmJiAhY2hhbmdlcy5wYWludC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRBbGxMYXllclBhaW50UHJvcGVydHkodGhpcy5pZCwgY2hhbmdlcy5wYWludC5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubGF5b3V0ICYmICFjaGFuZ2VzLmxheW91dC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRBbGxMYXllckxheW91dFByb3BlcnR5KHRoaXMuaWQsIGNoYW5nZXMubGF5b3V0LmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5maWx0ZXIgJiYgIWNoYW5nZXMuZmlsdGVyLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyRmlsdGVyKHRoaXMuaWQsIGNoYW5nZXMuZmlsdGVyLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5iZWZvcmUgJiYgIWNoYW5nZXMuYmVmb3JlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyQmVmb3JlKHRoaXMuaWQsIGNoYW5nZXMuYmVmb3JlLmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLm1pbnpvb20gJiYgIWNoYW5nZXMubWluem9vbS5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMubWF4em9vbSAmJiAhY2hhbmdlcy5tYXh6b29tLmlzRmlyc3RDaGFuZ2UoKVxuICAgICkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldExheWVyWm9vbVJhbmdlKHRoaXMuaWQsIHRoaXMubWluem9vbSwgdGhpcy5tYXh6b29tKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5sYXllckFkZGVkKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UucmVtb3ZlTGF5ZXIodGhpcy5pZCk7XG4gICAgfVxuICB9XG59XG4iXX0=