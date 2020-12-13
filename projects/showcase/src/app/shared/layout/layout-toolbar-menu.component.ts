import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
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

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  ngAfterViewInit() {
    this.portalOutlet = new DomPortalOutlet(
      document.querySelector(
        this.position === 'left'
          ? '#layout-left-custom-items'
          : '#layout-right-custom-items'
      )!,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
    this.portalOutlet.attach(this.portal);
  }

  ngOnDestroy() {
    this.portalOutlet.detach();
  }
}
