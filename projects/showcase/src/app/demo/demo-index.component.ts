import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Routes } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { cloneDeep, groupBy } from 'lodash-es';
import { first } from 'rxjs/operators';
import scrollIntoView from 'scroll-into-view-if-needed';
import { State } from '../app.module';
import * as fromShowcase from '../app.selectors';
import * as demo from './demo.actions';
import { Category, DEMO_ROUTES } from './demo.module';

type RoutesByCategory = { [P in Category]: Routes };

@Component({
  templateUrl: './demo-index.component.html',
  styleUrls: ['./demo-index.component.scss'],
})
export class DemoIndexComponent implements OnInit, AfterViewInit {
  routes: RoutesByCategory;
  originalRoutes: RoutesByCategory;
  categories: Category[];
  searchTerm: string;

  isEditing$ = this.store.pipe(select(fromShowcase.isDemoEditing));
  isSidenavOpen$ = this.store.pipe(select(fromShowcase.isDemoSidenavOpen));

  @ViewChildren('exampleLink', { read: ElementRef }) exampleLinks: QueryList<ElementRef>;

  constructor(private store: Store<State>, private zone: NgZone) {
    this.originalRoutes = <RoutesByCategory>(
      (<any>groupBy(DEMO_ROUTES[0].children, (route) => (route.data ? route.data.cat : null)))
    );
    this.categories = [
      Category.STYLES,
      Category.LAYERS,
      Category.SOURCES,
      Category.USER_INTERACTION,
      Category.CAMERA,
      Category.CONTROLS_AND_OVERLAYS,
    ];
  }

  ngOnInit() {
    this.routes = this.originalRoutes;
  }

  ngAfterViewInit() {
    this.zone.onStable.pipe(first()).subscribe(() => {
      const activeLink = this.exampleLinks.find((elm) => (<HTMLElement>elm.nativeElement).classList.contains('active'));
      if (activeLink) {
        scrollIntoView(<HTMLElement>activeLink.nativeElement, { block: 'center', scrollMode: 'if-needed' });
      }
    });
  }

  onSidenavChange() {
    this.store.dispatch(new demo.ToggleSidenavEnd());
  }

  search() {
    // Quick and dirty
    this.routes = cloneDeep(this.originalRoutes);
    Object.values(this.routes).forEach((category) => {
      category.forEach((route, index) => {
        if (route.data && !(<string>route.data.label).toLowerCase().includes(this.searchTerm.toLowerCase())) {
          delete category[index];
        }
      });
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.routes = this.originalRoutes;
  }
}
