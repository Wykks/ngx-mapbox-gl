import { Component, computed, inject, signal } from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Category, ROUTES_BY_CATEGORY } from './routes';
import { LayoutToolbarMenuComponent } from '../shared/layout/layout-toolbar-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, type MatListItem } from '@angular/material/list';
import { MapResizeSignal } from './examples/mgl-map-resize.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  templateUrl: './demo-index.component.html',
  styleUrls: ['./demo-index.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LayoutToolbarMenuComponent,
    MatIconModule,
    RouterOutlet,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDividerModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatButtonModule,
  ],
})
export class DemoIndexComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly mapResizeSignal = inject(MapResizeSignal);

  categories = Object.values(Category);
  searchTerm = signal('');
  routesByCategory = computed(() => {
    const searchTerm = this.searchTerm();
    if (!searchTerm.trim()) {
      return ROUTES_BY_CATEGORY;
    }
    const search = searchTerm.trim().toLowerCase();
    return Object.fromEntries(
      Object.entries(ROUTES_BY_CATEGORY).map(([category, routes]) => [
        category,
        routes.filter((route) =>
          route.data?.['label'].toLowerCase().includes(search),
        ),
      ]),
    );
  });
  sidenavIsOpen = true;
  isEditMode = !!this.activatedRoute.snapshot.firstChild?.params['demoUrl'];

  toggleSidenav() {
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }

  toggleEdit(change: MatSlideToggleChange) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const snapshot = this.activatedRoute.snapshot.firstChild!;
    if (change.checked) {
      this.router.navigate(['demo', 'edit', snapshot.url[0].path]);
    } else {
      this.router.navigate(['demo', snapshot.params['demoUrl']]);
    }
  }

  onSidenavChange() {
    this.mapResizeSignal.set(undefined);
  }

  scrollInToActiveLink(isActive: boolean, item: MatListItem) {
    if (!isActive) {
      return;
    }
    scrollIntoView(item._elementRef.nativeElement as HTMLElement, {
      block: 'center',
      scrollMode: 'if-needed',
    });
  }
}
