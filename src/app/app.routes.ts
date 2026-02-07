import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // Public Route
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },

  // Admin Layout Wrapper
  {
    path: '',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./layout/admin-layout/admin-layout')
        .then(m => m.AdminLayout),

    children: [

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then(r => r.Dashboard_Routes)
      },

      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes')
            .then(r => r.Products_Routes)
      },

      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.routes')
            .then(r => r.Users_Routes)
      },

      {
        path: 'carts',
        loadChildren: () =>
          import('./features/carts/carts.routes')
            .then(r => r.Carts_Routes)
      },

      {
        path: 'orders',
        loadChildren: () =>
          import('./features/orders/orders.routes')
            .then(r => r.Orders_Routes)
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes')
            .then(r => r.Settings_Routes)
      }
    ]
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
