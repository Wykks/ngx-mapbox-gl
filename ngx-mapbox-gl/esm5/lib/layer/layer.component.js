/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MapService } from '../map/map.service';
var LayerComponent = /** @class */ (function () {
    function LayerComponent(MapService) {
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
    LayerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.MapService.mapLoaded$.subscribe(function () {
            _this.init(true);
            _this.sub = fromEvent(_this.MapService.mapInstance, 'styledata').pipe(filter(function () { return !_this.MapService.mapInstance.getLayer(_this.id); })).subscribe(function () {
                _this.init(false);
            });
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    LayerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    };
    /**
     * @return {?}
     */
    LayerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.layerAdded) {
            this.MapService.removeLayer(this.id);
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    /**
     * @param {?} bindEvents
     * @return {?}
     */
    LayerComponent.prototype.init = /**
     * @param {?} bindEvents
     * @return {?}
     */
    function (bindEvents) {
        /** @type {?} */
        var layer = {
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
    };
    LayerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-layer',
                    template: ''
                }] }
    ];
    /** @nocollapse */
    LayerComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
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
    return LayerComponent;
}());
export { LayerComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUF5QnZCLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0lBOEI5Qyx3QkFDVTtRQUFBLGVBQVUsR0FBVixVQUFVO3FCQVRGLElBQUksWUFBWSxFQUFpQjswQkFDNUIsSUFBSSxZQUFZLEVBQWlCOzBCQUNqQyxJQUFJLFlBQVksRUFBaUI7eUJBQ2xDLElBQUksWUFBWSxFQUFpQjswQkFFbEMsS0FBSztLQUtyQjs7OztJQUVMLGlDQUFROzs7SUFBUjtRQUFBLGlCQVNDO1FBUkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsS0FBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNqRSxNQUFNLENBQUMsY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQyxDQUM3RCxDQUFDLFNBQVMsQ0FBQztnQkFDVixLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xCLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKOzs7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QUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7eUJBR0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7d0JBRUwsTUFBTTs2QkFDTixNQUFNOzZCQUNOLE1BQU07NEJBQ04sTUFBTTs7eUJBN0RUOztTQTBDYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCYWNrZ3JvdW5kTGF5b3V0LFxuICBCYWNrZ3JvdW5kUGFpbnQsXG4gIENpcmNsZUxheW91dCxcbiAgQ2lyY2xlUGFpbnQsXG4gIEZpbGxFeHRydXNpb25MYXlvdXQsXG4gIEZpbGxFeHRydXNpb25QYWludCxcbiAgRmlsbExheW91dCxcbiAgRmlsbFBhaW50LFxuICBHZW9KU09OU291cmNlLFxuICBHZW9KU09OU291cmNlUmF3LFxuICBJbWFnZVNvdXJjZSxcbiAgTGF5ZXIsXG4gIExpbmVMYXlvdXQsXG4gIExpbmVQYWludCxcbiAgTWFwTW91c2VFdmVudCxcbiAgUmFzdGVyTGF5b3V0LFxuICBSYXN0ZXJQYWludCxcbiAgUmFzdGVyU291cmNlLFxuICBTeW1ib2xMYXlvdXQsXG4gIFN5bWJvbFBhaW50LFxuICBWZWN0b3JTb3VyY2UsXG4gIFZpZGVvU291cmNlXG59IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uL21hcC9tYXAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC1sYXllcicsXG4gIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBMYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIExheWVyIHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgc291cmNlPzogc3RyaW5nIHwgVmVjdG9yU291cmNlIHwgUmFzdGVyU291cmNlIHwgR2VvSlNPTlNvdXJjZSB8IEltYWdlU291cmNlIHwgVmlkZW9Tb3VyY2UgfCBHZW9KU09OU291cmNlUmF3O1xuICBASW5wdXQoKSB0eXBlOiAnc3ltYm9sJyB8ICdmaWxsJyB8ICdsaW5lJyB8ICdjaXJjbGUnIHwgJ2ZpbGwtZXh0cnVzaW9uJyB8ICdyYXN0ZXInIHwgJ2JhY2tncm91bmQnO1xuICBASW5wdXQoKSBtZXRhZGF0YT86IGFueTtcbiAgQElucHV0KCkgc291cmNlTGF5ZXI/OiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgZmlsdGVyPzogYW55W107XG4gIEBJbnB1dCgpIGxheW91dD86IEJhY2tncm91bmRMYXlvdXQgfCBGaWxsTGF5b3V0IHwgRmlsbEV4dHJ1c2lvbkxheW91dCB8IExpbmVMYXlvdXQgfCBTeW1ib2xMYXlvdXQgfCBSYXN0ZXJMYXlvdXQgfCBDaXJjbGVMYXlvdXQ7XG4gIEBJbnB1dCgpIHBhaW50PzogQmFja2dyb3VuZFBhaW50IHwgRmlsbFBhaW50IHwgRmlsbEV4dHJ1c2lvblBhaW50IHwgTGluZVBhaW50IHwgU3ltYm9sUGFpbnQgfCBSYXN0ZXJQYWludCB8IENpcmNsZVBhaW50O1xuICBASW5wdXQoKSBiZWZvcmU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1pbnpvb20/OiBudW1iZXI7XG4gIEBJbnB1dCgpIG1heHpvb20/OiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBsYXllckFkZGVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBNYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5NYXBTZXJ2aWNlLm1hcExvYWRlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCh0cnVlKTtcbiAgICAgIHRoaXMuc3ViID0gZnJvbUV2ZW50KHRoaXMuTWFwU2VydmljZS5tYXBJbnN0YW5jZSwgJ3N0eWxlZGF0YScpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlLmdldExheWVyKHRoaXMuaWQpKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXQoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmxheWVyQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMucGFpbnQgJiYgIWNoYW5nZXMucGFpbnQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0QWxsTGF5ZXJQYWludFByb3BlcnR5KHRoaXMuaWQsIGNoYW5nZXMucGFpbnQuY3VycmVudFZhbHVlISk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmxheW91dCAmJiAhY2hhbmdlcy5sYXlvdXQuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0QWxsTGF5ZXJMYXlvdXRQcm9wZXJ0eSh0aGlzLmlkLCBjaGFuZ2VzLmxheW91dC5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuZmlsdGVyICYmICFjaGFuZ2VzLmZpbHRlci5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllckZpbHRlcih0aGlzLmlkLCBjaGFuZ2VzLmZpbHRlci5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuYmVmb3JlICYmICFjaGFuZ2VzLmJlZm9yZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllckJlZm9yZSh0aGlzLmlkLCBjaGFuZ2VzLmJlZm9yZS5jdXJyZW50VmFsdWUhKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5taW56b29tICYmICFjaGFuZ2VzLm1pbnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLm1heHpvb20gJiYgIWNoYW5nZXMubWF4em9vbS5pc0ZpcnN0Q2hhbmdlKClcbiAgICApIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5zZXRMYXllclpvb21SYW5nZSh0aGlzLmlkLCB0aGlzLm1pbnpvb20sIHRoaXMubWF4em9vbSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMubGF5ZXJBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZUxheWVyKHRoaXMuaWQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdWIpIHtcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KGJpbmRFdmVudHM6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBsYXllciA9IHtcbiAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICBtZXRhZGF0YTogdGhpcy5tZXRhZGF0YSxcbiAgICAgICAgJ3NvdXJjZS1sYXllcic6IHRoaXMuc291cmNlTGF5ZXIsXG4gICAgICAgIG1pbnpvb206IHRoaXMubWluem9vbSxcbiAgICAgICAgbWF4em9vbTogdGhpcy5tYXh6b29tLFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyLFxuICAgICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0LFxuICAgICAgICBwYWludDogdGhpcy5wYWludFxuICAgICAgfSxcbiAgICAgIGxheWVyRXZlbnRzOiB7XG4gICAgICAgIGNsaWNrOiB0aGlzLmNsaWNrLFxuICAgICAgICBtb3VzZUVudGVyOiB0aGlzLm1vdXNlRW50ZXIsXG4gICAgICAgIG1vdXNlTGVhdmU6IHRoaXMubW91c2VMZWF2ZSxcbiAgICAgICAgbW91c2VNb3ZlOiB0aGlzLm1vdXNlTW92ZVxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5NYXBTZXJ2aWNlLmFkZExheWVyKGxheWVyLCBiaW5kRXZlbnRzLCB0aGlzLmJlZm9yZSk7XG4gICAgdGhpcy5sYXllckFkZGVkID0gdHJ1ZTtcbiAgfVxufVxuIl19