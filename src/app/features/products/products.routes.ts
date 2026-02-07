import { Routes } from '@angular/router';

export const Products_Routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./list/list.component')
        .then(m => m.ListComponent)
  },

  {
    path: 'add',
    loadComponent: () =>
      import('./add-edit/add-edit.component')
        .then(m => m.AddEditComponent)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./details/details.component')
        .then(m => m.DetailsComponent)
  }
];
