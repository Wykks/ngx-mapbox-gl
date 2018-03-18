import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Routes } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';
import groupBy from 'lodash-es/groupBy';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { Category, demoRoutes } from '../module';

type RoutesByCategory = { [P in Category]: Routes };

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  routes: RoutesByCategory;
  originalRoutes: RoutesByCategory;
  categories: Category[];
  isEditing = false;
  searchTerm: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.originalRoutes = <RoutesByCategory><any>groupBy(demoRoutes[0].children, (route) => route.data ? route.data.cat : null);
    this.categories = [
      Category.STYLES,
      Category.LAYERS,
      Category.SOURCES,
      Category.USER_INTERACTION,
      Category.CAMERA,
      Category.CONTROLS_AND_OVERLAYS
    ];
    this.router.events.pipe(
      filter((event): event is NavigationStart => event instanceof NavigationStart),
      map((e) => <string>(<any>e).url), // TODO wait TS 2.7
      startWith(this.router.url)
    ).subscribe((e) => {
      this.isEditing = e.startsWith('/edit/');
    });
  }

  ngOnInit() {
    this.routes = this.originalRoutes;
  }

  toggleEdit() {
    const activatedRoute = this.activatedRoute.children[0];
    if (this.isEditing) {
      activatedRoute.params.pipe(first()).subscribe((params) => {
        this.router.navigate([params.demoUrl]);
      });
    } else {
      activatedRoute.url.pipe(first()).subscribe((currentUrl) => {
        this.router.navigate(['edit', currentUrl[0].path]);
      });
    }
  }

  search() {
    // Quick and dirty
    this.routes = cloneDeep(this.originalRoutes);
     Object.values(this.routes).forEach((category) => {
      category.forEach((route, index) => {
        if (route.data && !(<string>route.data.label).toLowerCase().includes(this.searchTerm)) {
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
