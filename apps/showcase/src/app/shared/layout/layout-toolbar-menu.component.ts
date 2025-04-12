import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
  viewChild,
  ViewContainerRef,
  type TemplateRef,
} from '@angular/core';

@Component({
  selector: 'showcase-layout-toolbar-menu',
  template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `,
})
export class LayoutToolbarMenuComponent implements AfterViewInit, OnDestroy {
  private readonly vcf = inject(ViewContainerRef);

  @Input() position: 'left' | 'right';

  private portalOutlet: DomPortalOutlet;
  private tpl = viewChild.required<TemplateRef<unknown>>('tpl');

  ngAfterViewInit() {
    const target = document.querySelector(
      this.position === 'left'
        ? '#layout-left-custom-items'
        : '#layout-right-custom-items'
    );
    if (!target) {
      throw new Error('LayoutToolbarMenuComponent: No target found');
    }
    this.portalOutlet = new DomPortalOutlet(target);
    this.portalOutlet.attach(new TemplatePortal(this.tpl(), this.vcf));
  }

  ngOnDestroy() {
    this.portalOutlet.detach();
  }
}
