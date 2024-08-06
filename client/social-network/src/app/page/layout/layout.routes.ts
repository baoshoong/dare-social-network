import {Routes} from "@angular/router";
import {LayoutComponent} from "./layout.component";

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES)

      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes').then(m => m.PROFILE_ROUTES)
      }
    ]

  }
];
