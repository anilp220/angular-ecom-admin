import { Routes } from "@angular/router";
import { Carts } from "./carts";

export const Carts_Routes: Routes = [
 {
    path: '',
    loadComponent: () =>
      import('./list/list')
        .then(m => m.List)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./details/details')
        .then(m => m.Details)
  }
];