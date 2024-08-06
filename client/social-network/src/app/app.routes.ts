import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./page/layout/layout.routes').then(m => m.LAYOUT_ROUTES)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.routes').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.routes').then(m => m.REGISTER_ROUTES)
  }
];
