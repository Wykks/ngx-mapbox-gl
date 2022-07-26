import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  Injector,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'showcase-layout-toolbar-menu',
  template: `
    <ng-template cdk-portal>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class LayoutToolbarMenuComponent implements AfterViewInit, OnDestroy {
  @Input() position: 'left' | 'right';

  private portalOutlet: DomPortalOutlet;
  @ViewChild(CdkPortal) portal: CdkPortal;

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

  ngAfterViewInit() {
    const target = document.querySelector(
      this.position === 'left'
        ? '#layout-left-custom-items'
        : '#layout-right-custom-items'
    );
    if (!target) {
      throw new Error('LayoutToolbarMenuComponent: No target found');
    }
    this.portalOutlet = new DomPortalOutlet(
      target,
      undefined,
      this.appRef,
      this.injector
    );
    this.portalOutlet.attach(this.portal);
  }

  ngOnDestroy() {
    this.portalOutlet.detach();
  }
}
