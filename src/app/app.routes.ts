import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
      },
];
