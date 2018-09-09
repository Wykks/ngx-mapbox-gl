/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { MapService } from './map.service';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
var MapComponent = /** @class */ (function () {
    function MapComponent(MapService) {
        this.MapService = MapService;
        /* Added by ngx-mapbox-gl */
        this.movingMethod = 'flyTo';
        this.resize = new EventEmitter();
        this.remove = new EventEmitter();
        this.mouseDown = new EventEmitter();
        this.mouseUp = new EventEmitter();
        this.mouseMove = new EventEmitter();
        this.click = new EventEmitter();
        this.dblClick = new EventEmitter();
        this.mouseEnter = new EventEmitter();
        this.mouseLeave = new EventEmitter();
        this.mouseOver = new EventEmitter();
        this.mouseOut = new EventEmitter();
        this.contextMenu = new EventEmitter();
        this.touchStart = new EventEmitter();
        this.touchEnd = new EventEmitter();
        this.touchMove = new EventEmitter();
        this.touchCancel = new EventEmitter();
        this.wheel = new EventEmitter();
        this.moveStart = new EventEmitter();
        this.move = new EventEmitter();
        this.moveEnd = new EventEmitter();
        this.dragStart = new EventEmitter();
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.zoomStart = new EventEmitter();
        this.zoomEvt = new EventEmitter();
        this.zoomEnd = new EventEmitter();
        this.rotateStart = new EventEmitter();
        this.rotate = new EventEmitter();
        this.rotateEnd = new EventEmitter();
        this.pitchStart = new EventEmitter();
        this.pitchEvt = new EventEmitter();
        this.pitchEnd = new EventEmitter();
        this.boxZoomStart = new EventEmitter();
        this.boxZoomEnd = new EventEmitter();
        this.boxZoomCancel = new EventEmitter();
        this.webGlContextLost = new EventEmitter();
        this.webGlContextRestored = new EventEmitter();
        this.load = new EventEmitter();
        this.render = new EventEmitter();
        this.error = new EventEmitter();
        this.data = new EventEmitter();
        this.styleData = new EventEmitter();
        this.sourceData = new EventEmitter();
        this.dataLoading = new EventEmitter();
        this.styleDataLoading = new EventEmitter();
        this.sourceDataLoading = new EventEmitter();
    }
    Object.defineProperty(MapComponent.prototype, "mapInstance", {
        get: /**
         * @return {?}
         */
        function () {
            return this.MapService.mapInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MapComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.MapService.setup({
            accessToken: this.accessToken,
            customMapboxApiUrl: this.customMapboxApiUrl,
            mapOptions: {
                container: this.mapContainer.nativeElement,
                minZoom: this.minZoom,
                maxZoom: this.maxZoom,
                style: this.style,
                hash: this.hash,
                interactive: this.interactive,
                bearingSnap: this.bearingSnap,
                pitchWithRotate: this.pitchWithRotate,
                classes: this.classes,
                attributionControl: this.attributionControl,
                logoPosition: this.logoPosition,
                failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
                preserveDrawingBuffer: this.preserveDrawingBuffer,
                refreshExpiredTiles: this.refreshExpiredTiles,
                maxBounds: this.maxBounds,
                scrollZoom: this.scrollZoom,
                boxZoom: this.boxZoom,
                dragRotate: this.dragRotate,
                dragPan: this.dragPan,
                keyboard: this.keyboard,
                doubleClickZoom: this.doubleClickZoom,
                touchZoomRotate: this.touchZoomRotate,
                trackResize: this.trackResize,
                center: this.center,
                zoom: this.zoom,
                bearing: this.bearing,
                pitch: this.pitch,
                renderWorldCopies: this.renderWorldCopies,
                maxTileCacheSize: this.maxTileCacheSize,
                localIdeographFontFamily: this.localIdeographFontFamily,
                transformRequest: this.transformRequest
            },
            mapEvents: this
        });
        if (this.cursorStyle) {
            this.MapService.changeCanvasCursor(this.cursorStyle);
        }
    };
    /**
     * @return {?}
     */
    MapComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.MapService.destroyMap();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MapComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.MapService.mapCreated$.toPromise()];
                    case 1:
                        _a.sent();
                        if (changes["cursorStyle"] && !changes["cursorStyle"].isFirstChange()) {
                            this.MapService.changeCanvasCursor(changes["cursorStyle"].currentValue);
                        }
                        if (changes["minZoom"] && !changes["minZoom"].isFirstChange()) {
                            this.MapService.updateMinZoom(changes["minZoom"].currentValue);
                        }
                        if (changes["maxZoom"] && !changes["maxZoom"].isFirstChange()) {
                            this.MapService.updateMaxZoom(changes["maxZoom"].currentValue);
                        }
                        if (changes["scrollZoom"] && !changes["scrollZoom"].isFirstChange()) {
                            this.MapService.updateScrollZoom(changes["scrollZoom"].currentValue);
                        }
                        if (changes["dragRotate"] && !changes["dragRotate"].isFirstChange()) {
                            this.MapService.updateDragRotate(changes["dragRotate"].currentValue);
                        }
                        if (changes["touchZoomRotate"] && !changes["touchZoomRotate"].isFirstChange()) {
                            this.MapService.updateTouchZoomRotate(changes["touchZoomRotate"].currentValue);
                        }
                        if (changes["doubleClickZoom"] && !changes["doubleClickZoom"].isFirstChange()) {
                            this.MapService.updateDoubleClickZoom(changes["doubleClickZoom"].currentValue);
                        }
                        if (changes["keyboard"] && !changes["keyboard"].isFirstChange()) {
                            this.MapService.updateKeyboard(changes["keyboard"].currentValue);
                        }
                        if (changes["dragPan"] && !changes["dragPan"].isFirstChange()) {
                            this.MapService.updateDragPan(changes["dragPan"].currentValue);
                        }
                        if (changes["boxZoom"] && !changes["boxZoom"].isFirstChange()) {
                            this.MapService.updateBoxZoom(changes["boxZoom"].currentValue);
                        }
                        if (changes["style"] && !changes["style"].isFirstChange()) {
                            this.MapService.updateStyle(changes["style"].currentValue);
                        }
                        if (changes["maxBounds"] && !changes["maxBounds"].isFirstChange()) {
                            this.MapService.updateMaxBounds(changes["maxBounds"].currentValue);
                        }
                        if (changes["fitBounds"] && !changes["fitBounds"].isFirstChange()) {
                            this.MapService.fitBounds(changes["fitBounds"].currentValue, this.fitBoundsOptions);
                        }
                        if (this.centerWithPanTo && changes["center"] && !changes["center"].isFirstChange() &&
                            !changes["zoom"] && !changes["bearing"] && !changes["pitch"]) {
                            this.MapService.panTo(/** @type {?} */ ((this.center)), this.panToOptions);
                        }
                        else if (changes["center"] && !changes["center"].isFirstChange() ||
                            changes["zoom"] && !changes["zoom"].isFirstChange() ||
                            changes["bearing"] && !changes["bearing"].isFirstChange() ||
                            changes["pitch"] && !changes["pitch"].isFirstChange()) {
                            this.MapService.move(this.movingMethod, this.movingOptions, changes["zoom"] && this.zoom ? this.zoom[0] : undefined, changes["center"] ? this.center : undefined, changes["bearing"] && this.bearing ? this.bearing[0] : undefined, changes["pitch"] && this.pitch ? this.pitch[0] : undefined);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mgl-map',
                    template: '<div #container></div>',
                    providers: [
                        MapService
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n  :host {\n    display: block;\n  }\n  div {\n    height: 100%;\n    width: 100%;\n  }\n  "]
                }] }
    ];
    /** @nocollapse */
    MapComponent.ctorParameters = function () { return [
        { type: MapService }
    ]; };
    MapComponent.propDecorators = {
        accessToken: [{ type: Input }],
        customMapboxApiUrl: [{ type: Input }],
        hash: [{ type: Input }],
        refreshExpiredTiles: [{ type: Input }],
        failIfMajorPerformanceCaveat: [{ type: Input }],
        classes: [{ type: Input }],
        bearingSnap: [{ type: Input }],
        interactive: [{ type: Input }],
        pitchWithRotate: [{ type: Input }],
        attributionControl: [{ type: Input }],
        logoPosition: [{ type: Input }],
        maxTileCacheSize: [{ type: Input }],
        localIdeographFontFamily: [{ type: Input }],
        preserveDrawingBuffer: [{ type: Input }],
        renderWorldCopies: [{ type: Input }],
        trackResize: [{ type: Input }],
        transformRequest: [{ type: Input }],
        minZoom: [{ type: Input }],
        maxZoom: [{ type: Input }],
        scrollZoom: [{ type: Input }],
        dragRotate: [{ type: Input }],
        touchZoomRotate: [{ type: Input }],
        doubleClickZoom: [{ type: Input }],
        keyboard: [{ type: Input }],
        dragPan: [{ type: Input }],
        boxZoom: [{ type: Input }],
        style: [{ type: Input }],
        center: [{ type: Input }],
        maxBounds: [{ type: Input }],
        zoom: [{ type: Input }],
        bearing: [{ type: Input }],
        pitch: [{ type: Input }],
        movingMethod: [{ type: Input }],
        movingOptions: [{ type: Input }],
        fitBounds: [{ type: Input }],
        fitBoundsOptions: [{ type: Input }],
        centerWithPanTo: [{ type: Input }],
        panToOptions: [{ type: Input }],
        cursorStyle: [{ type: Input }],
        resize: [{ type: Output }],
        remove: [{ type: Output }],
        mouseDown: [{ type: Output }],
        mouseUp: [{ type: Output }],
        mouseMove: [{ type: Output }],
        click: [{ type: Output }],
        dblClick: [{ type: Output }],
        mouseEnter: [{ type: Output }],
        mouseLeave: [{ type: Output }],
        mouseOver: [{ type: Output }],
        mouseOut: [{ type: Output }],
        contextMenu: [{ type: Output }],
        touchStart: [{ type: Output }],
        touchEnd: [{ type: Output }],
        touchMove: [{ type: Output }],
        touchCancel: [{ type: Output }],
        wheel: [{ type: Output }],
        moveStart: [{ type: Output }],
        move: [{ type: Output }],
        moveEnd: [{ type: Output }],
        dragStart: [{ type: Output }],
        drag: [{ type: Output }],
        dragEnd: [{ type: Output }],
        zoomStart: [{ type: Output }],
        zoomEvt: [{ type: Output }],
        zoomEnd: [{ type: Output }],
        rotateStart: [{ type: Output }],
        rotate: [{ type: Output }],
        rotateEnd: [{ type: Output }],
        pitchStart: [{ type: Output }],
        pitchEvt: [{ type: Output }],
        pitchEnd: [{ type: Output }],
        boxZoomStart: [{ type: Output }],
        boxZoomEnd: [{ type: Output }],
        boxZoomCancel: [{ type: Output }],
        webGlContextLost: [{ type: Output }],
        webGlContextRestored: [{ type: Output }],
        load: [{ type: Output }],
        render: [{ type: Output }],
        error: [{ type: Output }],
        data: [{ type: Output }],
        styleData: [{ type: Output }],
        sourceData: [{ type: Output }],
        dataLoading: [{ type: Output }],
        styleDataLoading: [{ type: Output }],
        sourceDataLoading: [{ type: Output }],
        mapContainer: [{ type: ViewChild, args: ['container',] }]
    };
    return MapComponent;
}());
export { MapComponent };
if (false) {
    /** @type {?} */
    MapComponent.prototype.accessToken;
    /** @type {?} */
    MapComponent.prototype.customMapboxApiUrl;
    /** @type {?} */
    MapComponent.prototype.hash;
    /** @type {?} */
    MapComponent.prototype.refreshExpiredTiles;
    /** @type {?} */
    MapComponent.prototype.failIfMajorPerformanceCaveat;
    /** @type {?} */
    MapComponent.prototype.classes;
    /** @type {?} */
    MapComponent.prototype.bearingSnap;
    /** @type {?} */
    MapComponent.prototype.interactive;
    /** @type {?} */
    MapComponent.prototype.pitchWithRotate;
    /** @type {?} */
    MapComponent.prototype.attributionControl;
    /** @type {?} */
    MapComponent.prototype.logoPosition;
    /** @type {?} */
    MapComponent.prototype.maxTileCacheSize;
    /** @type {?} */
    MapComponent.prototype.localIdeographFontFamily;
    /** @type {?} */
    MapComponent.prototype.preserveDrawingBuffer;
    /** @type {?} */
    MapComponent.prototype.renderWorldCopies;
    /** @type {?} */
    MapComponent.prototype.trackResize;
    /** @type {?} */
    MapComponent.prototype.transformRequest;
    /** @type {?} */
    MapComponent.prototype.minZoom;
    /** @type {?} */
    MapComponent.prototype.maxZoom;
    /** @type {?} */
    MapComponent.prototype.scrollZoom;
    /** @type {?} */
    MapComponent.prototype.dragRotate;
    /** @type {?} */
    MapComponent.prototype.touchZoomRotate;
    /** @type {?} */
    MapComponent.prototype.doubleClickZoom;
    /** @type {?} */
    MapComponent.prototype.keyboard;
    /** @type {?} */
    MapComponent.prototype.dragPan;
    /** @type {?} */
    MapComponent.prototype.boxZoom;
    /** @type {?} */
    MapComponent.prototype.style;
    /** @type {?} */
    MapComponent.prototype.center;
    /** @type {?} */
    MapComponent.prototype.maxBounds;
    /** @type {?} */
    MapComponent.prototype.zoom;
    /** @type {?} */
    MapComponent.prototype.bearing;
    /** @type {?} */
    MapComponent.prototype.pitch;
    /** @type {?} */
    MapComponent.prototype.movingMethod;
    /** @type {?} */
    MapComponent.prototype.movingOptions;
    /** @type {?} */
    MapComponent.prototype.fitBounds;
    /** @type {?} */
    MapComponent.prototype.fitBoundsOptions;
    /** @type {?} */
    MapComponent.prototype.centerWithPanTo;
    /** @type {?} */
    MapComponent.prototype.panToOptions;
    /** @type {?} */
    MapComponent.prototype.cursorStyle;
    /** @type {?} */
    MapComponent.prototype.resize;
    /** @type {?} */
    MapComponent.prototype.remove;
    /** @type {?} */
    MapComponent.prototype.mouseDown;
    /** @type {?} */
    MapComponent.prototype.mouseUp;
    /** @type {?} */
    MapComponent.prototype.mouseMove;
    /** @type {?} */
    MapComponent.prototype.click;
    /** @type {?} */
    MapComponent.prototype.dblClick;
    /** @type {?} */
    MapComponent.prototype.mouseEnter;
    /** @type {?} */
    MapComponent.prototype.mouseLeave;
    /** @type {?} */
    MapComponent.prototype.mouseOver;
    /** @type {?} */
    MapComponent.prototype.mouseOut;
    /** @type {?} */
    MapComponent.prototype.contextMenu;
    /** @type {?} */
    MapComponent.prototype.touchStart;
    /** @type {?} */
    MapComponent.prototype.touchEnd;
    /** @type {?} */
    MapComponent.prototype.touchMove;
    /** @type {?} */
    MapComponent.prototype.touchCancel;
    /** @type {?} */
    MapComponent.prototype.wheel;
    /** @type {?} */
    MapComponent.prototype.moveStart;
    /** @type {?} */
    MapComponent.prototype.move;
    /** @type {?} */
    MapComponent.prototype.moveEnd;
    /** @type {?} */
    MapComponent.prototype.dragStart;
    /** @type {?} */
    MapComponent.prototype.drag;
    /** @type {?} */
    MapComponent.prototype.dragEnd;
    /** @type {?} */
    MapComponent.prototype.zoomStart;
    /** @type {?} */
    MapComponent.prototype.zoomEvt;
    /** @type {?} */
    MapComponent.prototype.zoomEnd;
    /** @type {?} */
    MapComponent.prototype.rotateStart;
    /** @type {?} */
    MapComponent.prototype.rotate;
    /** @type {?} */
    MapComponent.prototype.rotateEnd;
    /** @type {?} */
    MapComponent.prototype.pitchStart;
    /** @type {?} */
    MapComponent.prototype.pitchEvt;
    /** @type {?} */
    MapComponent.prototype.pitchEnd;
    /** @type {?} */
    MapComponent.prototype.boxZoomStart;
    /** @type {?} */
    MapComponent.prototype.boxZoomEnd;
    /** @type {?} */
    MapComponent.prototype.boxZoomCancel;
    /** @type {?} */
    MapComponent.prototype.webGlContextLost;
    /** @type {?} */
    MapComponent.prototype.webGlContextRestored;
    /** @type {?} */
    MapComponent.prototype.load;
    /** @type {?} */
    MapComponent.prototype.render;
    /** @type {?} */
    MapComponent.prototype.error;
    /** @type {?} */
    MapComponent.prototype.data;
    /** @type {?} */
    MapComponent.prototype.styleData;
    /** @type {?} */
    MapComponent.prototype.sourceData;
    /** @type {?} */
    MapComponent.prototype.dataLoading;
    /** @type {?} */
    MapComponent.prototype.styleDataLoading;
    /** @type {?} */
    MapComponent.prototype.sourceDataLoading;
    /** @type {?} */
    MapComponent.prototype.mapContainer;
    /** @type {?} */
    MapComponent.prototype.MapService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXBib3gtZ2wvIiwic291cmNlcyI6WyJsaWIvbWFwL21hcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFhQSxPQUFPLEVBQUUsVUFBVSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUUxRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOztJQXVJckIsc0JBQ1U7UUFBQSxlQUFVLEdBQVYsVUFBVTs7NEJBcEVtQyxPQUFPO3NCQWMzQyxJQUFJLFlBQVksRUFBUTtzQkFDeEIsSUFBSSxZQUFZLEVBQVE7eUJBQ3JCLElBQUksWUFBWSxFQUFpQjt1QkFDbkMsSUFBSSxZQUFZLEVBQWlCO3lCQUMvQixJQUFJLFlBQVksRUFBaUI7cUJBQ3JDLElBQUksWUFBWSxFQUFpQjt3QkFDOUIsSUFBSSxZQUFZLEVBQWlCOzBCQUMvQixJQUFJLFlBQVksRUFBaUI7MEJBQ2pDLElBQUksWUFBWSxFQUFpQjt5QkFDbEMsSUFBSSxZQUFZLEVBQWlCO3dCQUNsQyxJQUFJLFlBQVksRUFBaUI7MkJBQzlCLElBQUksWUFBWSxFQUFpQjswQkFDbEMsSUFBSSxZQUFZLEVBQWlCO3dCQUNuQyxJQUFJLFlBQVksRUFBaUI7eUJBQ2hDLElBQUksWUFBWSxFQUFpQjsyQkFDL0IsSUFBSSxZQUFZLEVBQWlCO3FCQUN2QyxJQUFJLFlBQVksRUFBTzt5QkFDbkIsSUFBSSxZQUFZLEVBQWE7b0JBQ2xDLElBQUksWUFBWSxFQUFpQzt1QkFDOUMsSUFBSSxZQUFZLEVBQWE7eUJBQzNCLElBQUksWUFBWSxFQUFhO29CQUNsQyxJQUFJLFlBQVksRUFBaUM7dUJBQzlDLElBQUksWUFBWSxFQUFhO3lCQUMzQixJQUFJLFlBQVksRUFBaUM7dUJBQ25ELElBQUksWUFBWSxFQUFp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TUFBTTs4QkFDTixNQUFNO3lCQUNOLE1BQU07NEJBQ04sTUFBTTs2QkFDTixNQUFNOzJCQUNOLE1BQU07MkJBQ04sTUFBTTsrQkFDTixNQUFNOzZCQUNOLE1BQU07Z0NBQ04sTUFBTTttQ0FDTixNQUFNO3VDQUNOLE1BQU07dUJBQ04sTUFBTTt5QkFDTixNQUFNO3dCQUNOLE1BQU07dUJBQ04sTUFBTTs0QkFDTixNQUFNOzZCQUNOLE1BQU07OEJBQ04sTUFBTTttQ0FDTixNQUFNO29DQUNOLE1BQU07K0JBTU4sU0FBUyxTQUFDLFdBQVc7O3VCQWhLeEI7O1NBeURhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbmltYXRpb25PcHRpb25zLFxuICBFdmVudERhdGEsXG4gIExuZ0xhdEJvdW5kc0xpa2UsXG4gIExuZ0xhdExpa2UsXG4gIE1hcCxcbiAgTWFwQm94Wm9vbUV2ZW50LFxuICBNYXBNb3VzZUV2ZW50LFxuICBNYXBUb3VjaEV2ZW50LFxuICBQYWRkaW5nT3B0aW9ucyxcbiAgUG9pbnRMaWtlLFxuICBTdHlsZVxuICB9IGZyb20gJ21hcGJveC1nbCc7XG5pbXBvcnQgeyBNYXBTZXJ2aWNlLCBNb3ZpbmdPcHRpb25zIH0gZnJvbSAnLi9tYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBFdmVudCB9IGZyb20gJy4vbWFwLnR5cGVzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgbmFtZXNwYWNlIG1hcGJveGdsIHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIE1hcGJveE9wdGlvbnMge1xuICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdD86IGJvb2xlYW47XG4gICAgICB0cmFuc2Zvcm1SZXF1ZXN0PzogRnVuY3Rpb247XG4gICAgICBsb2NhbElkZW9ncmFwaEZvbnRGYW1pbHk/OiBzdHJpbmc7XG4gICAgICBwaXRjaFdpdGhSb3RhdGU/OiBib29sZWFuO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZ2wtbWFwJyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNjb250YWluZXI+PC9kaXY+JyxcbiAgc3R5bGVzOiBbYFxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbiAgZGl2IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgYF0sXG4gIHByb3ZpZGVyczogW1xuICAgIE1hcFNlcnZpY2VcbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWFwQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE1hcEV2ZW50IHtcbiAgLyogSW5pdCBpbnB1dHMgKi9cbiAgQElucHV0KCkgYWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGN1c3RvbU1hcGJveEFwaVVybD86IHN0cmluZztcbiAgQElucHV0KCkgaGFzaD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlZnJlc2hFeHBpcmVkVGlsZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xhc3Nlcz86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBiZWFyaW5nU25hcD86IG51bWJlcjtcbiAgQElucHV0KCkgaW50ZXJhY3RpdmU/OiBib29sZWFuO1xuICBASW5wdXQoKSBwaXRjaFdpdGhSb3RhdGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBhdHRyaWJ1dGlvbkNvbnRyb2w/OiBib29sZWFuO1xuICBASW5wdXQoKSBsb2dvUG9zaXRpb24/OiAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCc7XG4gIEBJbnB1dCgpIG1heFRpbGVDYWNoZVNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseT86IHN0cmluZztcbiAgQElucHV0KCkgcHJlc2VydmVEcmF3aW5nQnVmZmVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyV29ybGRDb3BpZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSB0cmFja1Jlc2l6ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRyYW5zZm9ybVJlcXVlc3Q/OiBGdW5jdGlvbjtcblxuICAvKiBEeW5hbWljIGlucHV0cyAqL1xuICBASW5wdXQoKSBtaW5ab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBtYXhab29tPzogbnVtYmVyO1xuICBASW5wdXQoKSBzY3JvbGxab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZHJhZ1JvdGF0ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRvdWNoWm9vbVJvdGF0ZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRvdWJsZUNsaWNrWm9vbT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGtleWJvYXJkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZHJhZ1Bhbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJveFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBzdHlsZTogU3R5bGUgfCBzdHJpbmc7XG4gIEBJbnB1dCgpIGNlbnRlcj86IExuZ0xhdExpa2U7XG4gIEBJbnB1dCgpIG1heEJvdW5kcz86IExuZ0xhdEJvdW5kc0xpa2U7XG4gIEBJbnB1dCgpIHpvb20/OiBbbnVtYmVyXTtcbiAgQElucHV0KCkgYmVhcmluZz86IFtudW1iZXJdO1xuICBASW5wdXQoKSBwaXRjaD86IFtudW1iZXJdO1xuXG4gIC8qIEFkZGVkIGJ5IG5neC1tYXBib3gtZ2wgKi9cbiAgQElucHV0KCkgbW92aW5nTWV0aG9kOiAnanVtcFRvJyB8ICdlYXNlVG8nIHwgJ2ZseVRvJyA9ICdmbHlUbyc7XG4gIEBJbnB1dCgpIG1vdmluZ09wdGlvbnM/OiBNb3ZpbmdPcHRpb25zO1xuICBASW5wdXQoKSBmaXRCb3VuZHM/OiBMbmdMYXRCb3VuZHNMaWtlO1xuICBASW5wdXQoKSBmaXRCb3VuZHNPcHRpb25zPzoge1xuICAgIGxpbmVhcj86IGJvb2xlYW4sXG4gICAgZWFzaW5nPzogRnVuY3Rpb24sXG4gICAgcGFkZGluZz86IG51bWJlciB8IFBhZGRpbmdPcHRpb25zLFxuICAgIG9mZnNldD86IFBvaW50TGlrZSxcbiAgICBtYXhab29tPzogbnVtYmVyXG4gIH07XG4gIEBJbnB1dCgpIGNlbnRlcldpdGhQYW5Ubz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBhblRvT3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnM7XG4gIEBJbnB1dCgpIGN1cnNvclN0eWxlPzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSByZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdXNlRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBtb3VzZUxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgbW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBjb250ZXh0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB0b3VjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudD4oKTtcbiAgQE91dHB1dCgpIHRvdWNoQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50PigpO1xuICBAT3V0cHV0KCkgd2hlZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTsgLy8gVE9ETyBNYXBXaGVlbEV2ZW50XG4gIEBPdXRwdXQoKSBtb3ZlU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTsgLy8gVE9ETyBDaGVjayB0eXBlXG4gIEBPdXRwdXQoKSBtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIG1vdmVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPERyYWdFdmVudD4oKTtcbiAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xuICBAT3V0cHV0KCkgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxEcmFnRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB6b29tU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgem9vbUV2dCA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB6b29tRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXBUb3VjaEV2ZW50IHwgTWFwTW91c2VFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJvdGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwVG91Y2hFdmVudCB8IE1hcE1vdXNlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByb3RhdGVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcFRvdWNoRXZlbnQgfCBNYXBNb3VzZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgcGl0Y2hTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgcGl0Y2hFdnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcbiAgQE91dHB1dCgpIHBpdGNoRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBib3hab29tU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIGJveFpvb21DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEJveFpvb21FdmVudD4oKTtcbiAgQE91dHB1dCgpIHdlYkdsQ29udGV4dExvc3QgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSB3ZWJHbENvbnRleHRSZXN0b3JlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIFRPRE8gQ2hlY2sgdHlwZVxuICBAT3V0cHV0KCkgZGF0YSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc3R5bGVEYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBzb3VyY2VEYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudERhdGE+KCk7XG4gIEBPdXRwdXQoKSBkYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc3R5bGVEYXRhTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnREYXRhPigpO1xuICBAT3V0cHV0KCkgc291cmNlRGF0YUxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50RGF0YT4oKTtcblxuICBnZXQgbWFwSW5zdGFuY2UoKTogTWFwIHtcbiAgICByZXR1cm4gdGhpcy5NYXBTZXJ2aWNlLm1hcEluc3RhbmNlO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgbWFwQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZVxuICApIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLk1hcFNlcnZpY2Uuc2V0dXAoe1xuICAgICAgYWNjZXNzVG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXG4gICAgICBjdXN0b21NYXBib3hBcGlVcmw6IHRoaXMuY3VzdG9tTWFwYm94QXBpVXJsLFxuICAgICAgbWFwT3B0aW9uczoge1xuICAgICAgICBjb250YWluZXI6IHRoaXMubWFwQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgICBzdHlsZTogdGhpcy5zdHlsZSxcbiAgICAgICAgaGFzaDogdGhpcy5oYXNoLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdGhpcy5pbnRlcmFjdGl2ZSxcbiAgICAgICAgYmVhcmluZ1NuYXA6IHRoaXMuYmVhcmluZ1NuYXAsXG4gICAgICAgIHBpdGNoV2l0aFJvdGF0ZTogdGhpcy5waXRjaFdpdGhSb3RhdGUsXG4gICAgICAgIGNsYXNzZXM6IHRoaXMuY2xhc3NlcyxcbiAgICAgICAgYXR0cmlidXRpb25Db250cm9sOiB0aGlzLmF0dHJpYnV0aW9uQ29udHJvbCxcbiAgICAgICAgbG9nb1Bvc2l0aW9uOiB0aGlzLmxvZ29Qb3NpdGlvbixcbiAgICAgICAgZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdDogdGhpcy5mYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0LFxuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRoaXMucHJlc2VydmVEcmF3aW5nQnVmZmVyLFxuICAgICAgICByZWZyZXNoRXhwaXJlZFRpbGVzOiB0aGlzLnJlZnJlc2hFeHBpcmVkVGlsZXMsXG4gICAgICAgIG1heEJvdW5kczogdGhpcy5tYXhCb3VuZHMsXG4gICAgICAgIHNjcm9sbFpvb206IHRoaXMuc2Nyb2xsWm9vbSxcbiAgICAgICAgYm94Wm9vbTogdGhpcy5ib3hab29tLFxuICAgICAgICBkcmFnUm90YXRlOiB0aGlzLmRyYWdSb3RhdGUsXG4gICAgICAgIGRyYWdQYW46IHRoaXMuZHJhZ1BhbixcbiAgICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQsXG4gICAgICAgIGRvdWJsZUNsaWNrWm9vbTogdGhpcy5kb3VibGVDbGlja1pvb20sXG4gICAgICAgIHRvdWNoWm9vbVJvdGF0ZTogdGhpcy50b3VjaFpvb21Sb3RhdGUsXG4gICAgICAgIHRyYWNrUmVzaXplOiB0aGlzLnRyYWNrUmVzaXplLFxuICAgICAgICBjZW50ZXI6IHRoaXMuY2VudGVyLFxuICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgIGJlYXJpbmc6IHRoaXMuYmVhcmluZyxcbiAgICAgICAgcGl0Y2g6IHRoaXMucGl0Y2gsXG4gICAgICAgIHJlbmRlcldvcmxkQ29waWVzOiB0aGlzLnJlbmRlcldvcmxkQ29waWVzLFxuICAgICAgICBtYXhUaWxlQ2FjaGVTaXplOiB0aGlzLm1heFRpbGVDYWNoZVNpemUsXG4gICAgICAgIGxvY2FsSWRlb2dyYXBoRm9udEZhbWlseTogdGhpcy5sb2NhbElkZW9ncmFwaEZvbnRGYW1pbHksXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IHRoaXMudHJhbnNmb3JtUmVxdWVzdFxuICAgICAgfSxcbiAgICAgIG1hcEV2ZW50czogdGhpc1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmN1cnNvclN0eWxlKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UuY2hhbmdlQ2FudmFzQ3Vyc29yKHRoaXMuY3Vyc29yU3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5kZXN0cm95TWFwKCk7XG4gIH1cblxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgYXdhaXQgdGhpcy5NYXBTZXJ2aWNlLm1hcENyZWF0ZWQkLnRvUHJvbWlzZSgpO1xuICAgIGlmIChjaGFuZ2VzLmN1cnNvclN0eWxlICYmICFjaGFuZ2VzLmN1cnNvclN0eWxlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmNoYW5nZUNhbnZhc0N1cnNvcihjaGFuZ2VzLmN1cnNvclN0eWxlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1pblpvb20gJiYgIWNoYW5nZXMubWluWm9vbS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVNaW5ab29tKGNoYW5nZXMubWluWm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXhab29tICYmICFjaGFuZ2VzLm1heFpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlTWF4Wm9vbShjaGFuZ2VzLm1heFpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc2Nyb2xsWm9vbSAmJiAhY2hhbmdlcy5zY3JvbGxab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZVNjcm9sbFpvb20oY2hhbmdlcy5zY3JvbGxab29tLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRyYWdSb3RhdGUgJiYgIWNoYW5nZXMuZHJhZ1JvdGF0ZS5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUm90YXRlKGNoYW5nZXMuZHJhZ1JvdGF0ZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy50b3VjaFpvb21Sb3RhdGUgJiYgIWNoYW5nZXMudG91Y2hab29tUm90YXRlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZVRvdWNoWm9vbVJvdGF0ZShjaGFuZ2VzLnRvdWNoWm9vbVJvdGF0ZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5kb3VibGVDbGlja1pvb20gJiYgIWNoYW5nZXMuZG91YmxlQ2xpY2tab29tLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZURvdWJsZUNsaWNrWm9vbShjaGFuZ2VzLmRvdWJsZUNsaWNrWm9vbS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5rZXlib2FyZCAmJiAhY2hhbmdlcy5rZXlib2FyZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVLZXlib2FyZChjaGFuZ2VzLmtleWJvYXJkLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRyYWdQYW4gJiYgIWNoYW5nZXMuZHJhZ1Bhbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS51cGRhdGVEcmFnUGFuKGNoYW5nZXMuZHJhZ1Bhbi5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5ib3hab29tICYmICFjaGFuZ2VzLmJveFpvb20uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlQm94Wm9vbShjaGFuZ2VzLmJveFpvb20uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuc3R5bGUgJiYgIWNoYW5nZXMuc3R5bGUuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UudXBkYXRlU3R5bGUoY2hhbmdlcy5zdHlsZS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5tYXhCb3VuZHMgJiYgIWNoYW5nZXMubWF4Qm91bmRzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnVwZGF0ZU1heEJvdW5kcyhjaGFuZ2VzLm1heEJvdW5kcy5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5maXRCb3VuZHMgJiYgIWNoYW5nZXMuZml0Qm91bmRzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLmZpdEJvdW5kcyhjaGFuZ2VzLmZpdEJvdW5kcy5jdXJyZW50VmFsdWUsIHRoaXMuZml0Qm91bmRzT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuY2VudGVyV2l0aFBhblRvICYmXG4gICAgICBjaGFuZ2VzLmNlbnRlciAmJiAhY2hhbmdlcy5jZW50ZXIuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICAhY2hhbmdlcy56b29tICYmICFjaGFuZ2VzLmJlYXJpbmcgJiYgIWNoYW5nZXMucGl0Y2hcbiAgICApIHtcbiAgICAgIHRoaXMuTWFwU2VydmljZS5wYW5Ubyh0aGlzLmNlbnRlciEsIHRoaXMucGFuVG9PcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgY2hhbmdlcy5jZW50ZXIgJiYgIWNoYW5nZXMuY2VudGVyLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy56b29tICYmICFjaGFuZ2VzLnpvb20uaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLmJlYXJpbmcgJiYgIWNoYW5nZXMuYmVhcmluZy5pc0ZpcnN0Q2hhbmdlKCkgfHxcbiAgICAgIGNoYW5nZXMucGl0Y2ggJiYgIWNoYW5nZXMucGl0Y2guaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLk1hcFNlcnZpY2UubW92ZShcbiAgICAgICAgdGhpcy5tb3ZpbmdNZXRob2QsXG4gICAgICAgIHRoaXMubW92aW5nT3B0aW9ucyxcbiAgICAgICAgY2hhbmdlcy56b29tICYmIHRoaXMuem9vbSA/IHRoaXMuem9vbVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5jZW50ZXIgPyB0aGlzLmNlbnRlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5iZWFyaW5nICYmIHRoaXMuYmVhcmluZyA/IHRoaXMuYmVhcmluZ1swXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hhbmdlcy5waXRjaCAmJiB0aGlzLnBpdGNoID8gdGhpcy5waXRjaFswXSA6IHVuZGVmaW5lZFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==