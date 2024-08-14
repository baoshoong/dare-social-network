import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./page/layout/layout.routes').then((m) => m.LAYOUT_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./page/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./page/register/register.routes').then((m) => m.REGISTER_ROUTES),
  },
  {
    path: 'loading',
    loadChildren: () =>
      import('./page/loading/loading.routes').then((m) => m.LOADING_ROUTES),
  },
  {
    path: 'detail-post',
    loadChildren: () =>
      import('./page/detail-post/detail-post.routes').then(
        (m) => m.DETAIL_POST_ROUTES
      ),
  }
];
