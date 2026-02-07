import { Routes } from "@angular/router";

export const Dashboard_Routes: Routes = [
    {
        path: '',
        loadComponent: () =>
          import('./dashboard.component')
            .then(m => m.DashboardComponent)
    }
];