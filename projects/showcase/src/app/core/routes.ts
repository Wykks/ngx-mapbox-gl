import { Routes } from '@angular/router';
import { DEMO_ROUTES } from '../demo/routes';
import { HOME_ROUTES } from '../home/routes';
import { LayoutComponent } from '../shared/layout/layout.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'demo',
        children: DEMO_ROUTES,
      },
      ...HOME_ROUTES,
      {
        path: 'doc',
        loadChildren: () =>
          import('../doc/doc.module').then((m) => m.DocModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
