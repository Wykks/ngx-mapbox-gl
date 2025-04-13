import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
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
import { MatListModule } from '@angular/material/list';
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
  ],
})
export class DemoIndexComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly mapResizeSignal = inject(MapResizeSignal);

  categories: Category[];
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

  @ViewChildren('exampleLink', { read: ElementRef })
  exampleLinks: QueryList<ElementRef>;

  constructor() {
    this.categories = Object.values(Category);

    afterNextRender(() => {
      this.scrollInToActiveExampleLink();
    });
  }

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

  private scrollInToActiveExampleLink() {
    const activeLink = this.exampleLinks.find((elm) =>
      (elm.nativeElement as HTMLElement).classList.contains('active'),
    );
    if (activeLink) {
      scrollIntoView(activeLink.nativeElement as HTMLElement, {
        block: 'center',
        scrollMode: 'if-needed',
      });
    }
  }
}
