import { Route } from '@angular/router';
import { DEMO_ROUTES } from './demo/routes';
import { HOME_ROUTES } from './home/home.routes';
import { LayoutComponent } from './shared/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      ...HOME_ROUTES,
      {
        path: 'demo',
        children: DEMO_ROUTES,
      },
      {
        path: 'doc',
        loadChildren: () =>
          import('./doc/doc.routes').then((m) => m.DOC_ROUTES),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
