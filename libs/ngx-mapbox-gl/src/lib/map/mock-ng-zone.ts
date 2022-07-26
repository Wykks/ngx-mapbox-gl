import { EventEmitter, Injectable, NgZone } from '@angular/core';

/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 */
@Injectable()
export class MockNgZone extends NgZone {
  override onStable: EventEmitter<any> = new EventEmitter(false);

  constructor() {
    super({ enableLongStackTrace: false });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  override run(fn: Function): any {
    return fn();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  override runOutsideAngular(fn: Function): any {
    return fn();
  }

  simulateZoneExit(): void {
    this.onStable.emit(null);
  }
}
