import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import groupBy from 'lodash-es/groupBy';
import { Category, demoRoutes } from '../module';

type RoutesByCategory = { [P in Category]: Routes };

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  preserveWhitespaces: false
})
export class LayoutComponent implements OnInit {
  routes: RoutesByCategory;
  categories: Category[];

  constructor() {
    this.routes = <RoutesByCategory><any>groupBy(demoRoutes[0].children, (route) => route.data ? route.data.cat : null);
    this.categories = [
      Category.STYLES,
      Category.LAYERS,
      Category.SOURCES,
      Category.USER_INTERACTION,
      Category.CAMERA,
      Category.CONTROLS_AND_OVERLAYS
    ];
  }

  ngOnInit() {
  }

}
