import { Routes } from "@angular/router";
import { Carts } from "./carts";

export const Carts_Routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/list.component')
        .then(m => m.ListComponent)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./details/details')
        .then(m => m.Details)
  }
];