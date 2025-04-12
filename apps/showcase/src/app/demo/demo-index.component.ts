import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
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
  Routes,
} from '@angular/router';
import { cloneDeep, groupBy } from 'lodash-es';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Category, DEMO_ROUTES } from './routes';
import { LayoutToolbarMenuComponent } from '../shared/layout/layout-toolbar-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MapResizeSignal } from './mgl-map-resize.directive';

type RoutesByCategory = { [P in Category]: Routes };

@Component({
  templateUrl: './demo-index.component.html',
  styleUrls: ['./demo-index.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutToolbarMenuComponent,
    MatIconModule,
    RouterOutlet,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDividerModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    CommonModule,
  ],
})
export class DemoIndexComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly mapResizeSignal = inject(MapResizeSignal);

  routes: RoutesByCategory;
  originalRoutes: RoutesByCategory;
  categories: Category[];
  searchTerm: string;
  sidenavIsOpen = true;
  isEditMode = !!this.activatedRoute.snapshot.firstChild?.params['demoUrl'];

  @ViewChildren('exampleLink', { read: ElementRef })
  exampleLinks: QueryList<ElementRef>;

  constructor() {
    this.originalRoutes = groupBy(DEMO_ROUTES[0].children, (route) =>
      route.data ? route.data['cat'] : null
    ) as unknown as RoutesByCategory;
    this.categories = Object.values(Category);

    afterNextRender(() => {
      this.scrollInToActiveExampleLink();
    });
  }

  ngOnInit() {
    this.routes = this.originalRoutes;
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

  search() {
    // Quick and dirty
    this.routes = cloneDeep(this.originalRoutes);
    Object.values(this.routes).forEach((category) => {
      category.forEach((route, index) => {
        if (
          route.data &&
          !(route.data['label'] as string)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        ) {
          delete category[index];
        }
      });
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.routes = this.originalRoutes;
  }

  private scrollInToActiveExampleLink() {
    const activeLink = this.exampleLinks.find((elm) =>
      (elm.nativeElement as HTMLElement).classList.contains('active')
    );
    if (activeLink) {
      scrollIntoView(activeLink.nativeElement as HTMLElement, {
        block: 'center',
        scrollMode: 'if-needed',
      });
    }
  }
}
