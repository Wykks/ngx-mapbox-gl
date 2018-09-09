/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
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
            this.init(true);
            this.sub = fromEvent(this.MapService.mapInstance, 'styledata').pipe(filter(() => !this.MapService.mapInstance.getLayer(this.id))).subscribe(() => {
                this.init(false);
            });
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
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    /**
     * @param {?} bindEvents
     * @return {?}
     */
    init(bindEvents) {
        /** @type {?} */
        const layer = {
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
        };
        this.MapService.addLayer(layer, bindEvents, this.before);
        this.layerAdded = true;
    }
}
LayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-layer',
                template: ''
            }] }
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
    LayerComponent.prototype.sub;
    /** @type {?} */
    LayerComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUF5QnZCLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFNaEQsTUFBTTs7OztJQXdCSixZQUNVO1FBQUEsZUFBVSxHQUFWLFVBQVU7cUJBVEYsSUFBSSxZQUFZLEVBQWlCOzBCQUM1QixJQUFJLFlBQVksRUFBaUI7MEJBQ2pDLElBQUksWUFBWSxFQUFpQjt5QkFDbEMsSUFBSSxZQUFZLEVBQWlCOzBCQUVsQyxLQUFLO0tBS3JCOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ2pFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FDN0QsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEIsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDO0tB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Q0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7cUJBR0wsS0FBSztxQkFDTCxLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7b0JBRUwsTUFBTTt5QkFDTixNQUFNO3lCQUNOLE1BQU07d0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFja2dyb3VuZExheW91dCxcbiAgQmFja2dyb3VuZFBhaW50LFxuICBDaXJjbGVMYXlvdXQsXG4gIENpcmNsZVBhaW50LFxuICBGaWxsRXh0cnVzaW9uTGF5b3V0LFxuICBGaWxsRXh0cnVzaW9uUGFpbnQsXG4gIEZpbGxMYXlvdXQsXG4gIEZpbGxQYWludCxcbiAgR2VvSlNPTlNvdXJjZSxcbiAgR2VvSlNPTlNvdXJjZVJhdyxcbiAgSW1hZ2VTb3VyY2UsXG4gIExheWVyLFxuICBMaW5lTGF5b3V0LFxuICBMaW5lUGFpbnQsXG4gIE1hcE1vdXNlRXZlbnQsXG4gIFJhc3RlckxheW91dCxcbiAgUmFzdGVyUGFpbnQsXG4gIFJhc3RlclNvdXJjZSxcbiAgU3ltYm9sTGF5b3V0LFxuICBTeW1ib2xQYWludCxcbiAgVmVjdG9yU291cmNlLFxuICBWaWRlb1NvdXJjZVxufSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbGF5ZXInLFxuICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgTGF5ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBMYXllciB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNvdXJjZT86IHN0cmluZyB8IFZlY3RvclNvdXJjZSB8IFJhc3RlclNvdXJjZSB8IEdlb0pTT05Tb3VyY2UgfCBJbWFnZVNvdXJjZSB8IFZpZGVvU291cmNlIHwgR2VvSlNPTlNvdXJjZVJhdztcbiAgQElucHV0KCkgdHlwZTogJ3N5bWJvbCcgfCAnZmlsbCcgfCAnbGluZScgfCAnY2lyY2xlJyB8ICdmaWxsLWV4dHJ1c2lvbicgfCAncmFzdGVyJyB8ICdiYWNrZ3JvdW5kJztcbiAgQElucHV0KCkgbWV0YWRhdGE/OiBhbnk7XG4gIEBJbnB1dCgpIHNvdXJjZUxheWVyPzogc3RyaW5nO1xuXG4gIC8qIER5bmFtaWMgaW5wdXRzICovXG4gIEBJbnB1dCgpIGZpbHRlcj86IGFueVtdO1xuICBASW5wdXQoKSBsYXlvdXQ/OiBCYWNrZ3JvdW5kTGF5b3V0IHwgRmlsbExheW91dCB8IEZpbGxFeHRydXNpb25MYXlvdXQgfCBMaW5lTGF5b3V0IHwgU3ltYm9sTGF5b3V0IHwgUmFzdGVyTGF5b3V0IHwgQ2lyY2xlTGF5b3V0O1xuICBASW5wdXQoKSBwYWludD86IEJhY2tncm91bmRQYWludCB8IEZpbGxQYWludCB8IEZpbGxFeHRydXNpb25QYWludCB8IExpbmVQYWludCB8IFN5bWJvbFBhaW50IHwgUmFzdGVyUGFpbnQgfCBDaXJjbGVQYWludDtcbiAgQElucHV0KCkgYmVmb3JlPzogc3RyaW5nO1xuICBASW5wdXQoKSBtaW56b29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXh6b29tPzogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBjbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuXG4gIHByaXZhdGUgbGF5ZXJBZGRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmluaXQodHJ1ZSk7XG4gICAgICB0aGlzLnN1YiA9IGZyb21FdmVudCh0aGlzLk1hcFNlcnZpY2UubWFwSW5zdGFuY2UsICdzdHlsZWRhdGEnKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZS5nZXRMYXllcih0aGlzLmlkKSlcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pbml0KGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghdGhpcy5sYXllckFkZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnBhaW50ICYmICFjaGFuZ2VzLnBhaW50LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldEFsbExheWVyUGFpbnRQcm9wZXJ0eSh0aGlzLmlkLCBjaGFuZ2VzLnBhaW50LmN1cnJlbnRWYWx1ZSEpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5sYXlvdXQgJiYgIWNoYW5nZXMubGF5b3V0LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnNldEFsbExheWVyTGF5b3V0UHJvcGVydHkodGhpcy5pZCwgY2hhbmdlcy5sYXlvdXQuY3VycmVudFZhbHVlISk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmZpbHRlciAmJiAhY2hhbmdlcy5maWx0ZXIuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0TGF5ZXJGaWx0ZXIodGhpcy5pZCwgY2hhbmdlcy5maWx0ZXIuY3VycmVudFZhbHVlISk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmJlZm9yZSAmJiAhY2hhbmdlcy5iZWZvcmUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0TGF5ZXJCZWZvcmUodGhpcy5pZCwgY2hhbmdlcy5iZWZvcmUuY3VycmVudFZhbHVlISk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMubWluem9vbSAmJiAhY2hhbmdlcy5taW56b29tLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5tYXh6b29tICYmICFjaGFuZ2VzLm1heHpvb20uaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0TGF5ZXJab29tUmFuZ2UodGhpcy5pZCwgdGhpcy5taW56b29tLCB0aGlzLm1heHpvb20pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmxheWVyQWRkZWQpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5yZW1vdmVMYXllcih0aGlzLmlkKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3ViKSB7XG4gICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdChiaW5kRXZlbnRzOiBib29sZWFuKSB7XG4gICAgY29uc3QgbGF5ZXIgPSB7XG4gICAgICBsYXllck9wdGlvbnM6IHtcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgbWV0YWRhdGE6IHRoaXMubWV0YWRhdGEsXG4gICAgICAgICdzb3VyY2UtbGF5ZXInOiB0aGlzLnNvdXJjZUxheWVyLFxuICAgICAgICBtaW56b29tOiB0aGlzLm1pbnpvb20sXG4gICAgICAgIG1heHpvb206IHRoaXMubWF4em9vbSxcbiAgICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcixcbiAgICAgICAgbGF5b3V0OiB0aGlzLmxheW91dCxcbiAgICAgICAgcGFpbnQ6IHRoaXMucGFpbnRcbiAgICAgIH0sXG4gICAgICBsYXllckV2ZW50czoge1xuICAgICAgICBjbGljazogdGhpcy5jbGljayxcbiAgICAgICAgbW91c2VFbnRlcjogdGhpcy5tb3VzZUVudGVyLFxuICAgICAgICBtb3VzZUxlYXZlOiB0aGlzLm1vdXNlTGVhdmUsXG4gICAgICAgIG1vdXNlTW92ZTogdGhpcy5tb3VzZU1vdmVcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuTWFwU2VydmljZS5hZGRMYXllcihsYXllciwgYmluZEV2ZW50cywgdGhpcy5iZWZvcmUpO1xuICAgIHRoaXMubGF5ZXJBZGRlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==