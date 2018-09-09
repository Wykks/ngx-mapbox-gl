/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { MapService } from '../map/map.service';
export class ImageComponent {
    /**
     * @param {?} MapService
     * @param {?} zone
     */
    constructor(MapService, zone) {
        this.MapService = MapService;
        this.zone = zone;
        this.error = new EventEmitter();
        this.loaded = new EventEmitter();
        this.imageAdded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.MapService.mapLoaded$.subscribe(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.data) {
                this.MapService.addImage(this.id, this.data, this.options);
                this.imageAdded = true;
            }
            else if (this.url) {
                try {
                    yield this.MapService.loadAndAddImage(this.id, this.url, this.options);
                    this.imageAdded = true;
                    this.zone.run(() => {
                        this.loaded.emit();
                    });
                }
                catch (error) {
                    this.zone.run(() => {
                        this.error.emit(error);
                    });
                }
            }
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["data"] && !changes["data"].isFirstChange() ||
            changes["options"] && !changes["options"].isFirstChange() ||
            changes["url"] && !changes["url"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.imageAdded) {
            this.MapService.removeImage(this.id);
        }
    }
}
ImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-image',
                template: ''
            }] }
];
/** @nocollapse */
ImageComponent.ctorParameters = () => [
    { type: MapService },
    { type: NgZone }
];
ImageComponent.propDecorators = {
    id: [{ type: Input }],
    data: [{ type: Input }],
    options: [{ type: Input }],
    url: [{ type: Input }],
    error: [{ type: Output }],
    loaded: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ImageComponent.prototype.id;
    /** @type {?} */
    ImageComponent.prototype.data;
    /** @type {?} */
    ImageComponent.prototype.options;
    /** @type {?} */
    ImageComponent.prototype.url;
    /** @type {?} */
    ImageComponent.prototype.error;
    /** @type {?} */
    ImageComponent.prototype.loaded;
    /** @type {?} */
    ImageComponent.prototype.imageAdded;
    /** @type {?} */
    ImageComponent.prototype.MapService;
    /** @type {?} */
    ImageComponent.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hcGJveC1nbC8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS9pbWFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUlOLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFPaEQsTUFBTTs7Ozs7SUFjSixZQUNVLFlBQ0E7UUFEQSxlQUFVLEdBQVYsVUFBVTtRQUNWLFNBQUksR0FBSixJQUFJO3FCQVBJLElBQUksWUFBWSxFQUFzQjtzQkFDckMsSUFBSSxZQUFZLEVBQVE7MEJBRXRCLEtBQUs7S0FLckI7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQVMsRUFBRTtZQUM5QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQ3RCLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQUMsT0FBTyxDQUNiLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDeEI7aUJBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNuQixJQUFJO29CQUNGLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQ25DLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsT0FBTyxDQUNiLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTt3QkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDcEIsQ0FBQyxDQUFDO2lCQUNKO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTt3QkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3hCLENBQUMsQ0FBQztpQkFDSjthQUNGO1VBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQ0UsT0FBTyxZQUFTLENBQUMsT0FBTyxTQUFNLGFBQWEsRUFBRTtZQUM3QyxPQUFPLGVBQVksQ0FBQyxPQUFPLFlBQVMsYUFBYSxFQUFFO1lBQ25ELE9BQU8sV0FBUSxDQUFDLE9BQU8sUUFBSyxhQUFhLEVBQUUsRUFDM0M7WUFDQSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO0tBQ0Y7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztLQUNGOzs7WUFuRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsRUFBRTthQUNiOzs7O1lBTlEsVUFBVTtZQVBqQixNQUFNOzs7aUJBZ0JMLEtBQUs7bUJBR0wsS0FBSztzQkFDTCxLQUFLO2tCQUNMLEtBQUs7b0JBRUwsTUFBTTtxQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcFNlcnZpY2UgfSBmcm9tICcuLi9tYXAvbWFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwSW1hZ2VEYXRhLCBNYXBJbWFnZU9wdGlvbnMgfSBmcm9tICcuLi9tYXAvbWFwLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLWltYWdlJyxcbiAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIC8qIEluaXQgaW5wdXRzICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgLyogRHluYW1pYyBpbnB1dHMgKi9cbiAgQElucHV0KCkgZGF0YT86IE1hcEltYWdlRGF0YTtcbiAgQElucHV0KCkgb3B0aW9ucz86IE1hcEltYWdlT3B0aW9ucztcbiAgQElucHV0KCkgdXJsPzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdGF0dXM6IG51bWJlciB9PigpO1xuICBAT3V0cHV0KCkgbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgaW1hZ2VBZGRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgTWFwU2VydmljZTogTWFwU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuTWFwU2VydmljZS5tYXBMb2FkZWQkLnN1YnNjcmliZShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICAgIHRoaXMuTWFwU2VydmljZS5hZGRJbWFnZShcbiAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgIHRoaXMuZGF0YSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbWFnZUFkZGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy51cmwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLk1hcFNlcnZpY2UubG9hZEFuZEFkZEltYWdlKFxuICAgICAgICAgICAgdGhpcy5pZCxcbiAgICAgICAgICAgIHRoaXMudXJsLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmltYWdlQWRkZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmlzRmlyc3RDaGFuZ2UoKSB8fFxuICAgICAgY2hhbmdlcy5vcHRpb25zICYmICFjaGFuZ2VzLm9wdGlvbnMuaXNGaXJzdENoYW5nZSgpIHx8XG4gICAgICBjaGFuZ2VzLnVybCAmJiAhY2hhbmdlcy51cmwuaXNGaXJzdENoYW5nZSgpXG4gICAgKSB7XG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VBZGRlZCkge1xuICAgICAgdGhpcy5NYXBTZXJ2aWNlLnJlbW92ZUltYWdlKHRoaXMuaWQpO1xuICAgIH1cbiAgfVxufVxuIl19