import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './shared/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
    
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
            path: 'home',
            loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
            canActivate: [AuthGuard] 
        },
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }]
    }
];
