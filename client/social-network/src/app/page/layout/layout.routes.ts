import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.routes').then((m) => m.PROFILE_ROUTES),
      },

      {
        path: 'notification',
        loadChildren: () =>
          import('./notification/notification.routes').then(
            (m) => m.NOTIFICATION_ROUTES,
          ),
      },
      {
        path: 'creator',
        loadChildren: () =>
          import('./creator/creator.routes').then((m) => m.CREATOR_ROUTES),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.routes').then((m) => m.SEARCH_ROUTES),
      },
      {
        path: 'testas',
        loadChildren: () =>
          import('./testas/testas.routes').then((m) => m.TESTAS_ROUTES),
      },
    ],
  },
];
