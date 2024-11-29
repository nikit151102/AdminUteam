import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { PopUpEntryComponent } from './components/pop-up-entry/pop-up-entry.component';
import { AuthGuard } from './components/admin/auth.guard';

const routes: Routes = [
  {
    path: '',
    // component: PopUpEntryComponent
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    // canActivate: [AuthGuard]
    path: 'admin/:id', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), 
  },
  {
    path: ':id', loadChildren: () => import('./components/user-account/user-account.module').then(m => m.UserAccountModule)
  },
  {
    path: 'resume/:id', loadChildren: () => import('./components/view-card/view-card.module').then(m => m.ViewCardModule), data: { routeName: 'resume' }
  },
  {
    path: 'vacancy/:id', loadChildren: () => import('./components/view-card/view-card.module').then(m => m.ViewCardModule), data: { routeName: 'vacancy' }
  },
  {
    path: 'error', component: PageErrorComponent
  },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
