import { Routes } from '@angular/router';

export const Users_Routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./list-component/list-component')
        .then(m => m.ListComponent)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./detail-component/detail-component')
        .then(m => m.DetailComponent)
  }
];
