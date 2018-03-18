import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { demoRoutes } from '../module';

@Injectable()
export class StackblitzEditGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (demoRoutes[0].children!.some((r) => r.path === route.params.demoUrl)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
