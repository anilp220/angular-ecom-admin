import { Routes } from "@angular/router";
import { Settings } from "./settings";

export const Settings_Routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./settings')
        .then(m => m.Settings)
  }
];