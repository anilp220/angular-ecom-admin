import { Routes } from "@angular/router";
import { Orders } from "./orders";

export const Orders_Routes:Routes=[
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
]