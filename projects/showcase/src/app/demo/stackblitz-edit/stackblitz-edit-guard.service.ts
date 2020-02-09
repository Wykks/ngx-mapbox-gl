import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { DEMO_ROUTES } from '../demo.module';

@Injectable()
export class StackblitzEditGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (DEMO_ROUTES[0].children!.some((r) => r.path === route.params.demoUrl)) {
      return true;
    }
    this.router.navigate(['/demo']);
    return false;
  }
}
