import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAccountComponent } from './personal-account.component';


const routes: Routes = [
  {
    path: '',
    component: PersonalAccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'home', 
        pathMatch: 'full' 
      },
      {
        path: 'home',
        loadChildren: () => import('./personal-home/personal-home.module').then(m => m.PersonalHomeModule)
      },
      {
        path: 'personalData',
        loadChildren: () => import('./personal-data/personal-data.module').then(m => m.PersonalDataModule)
      },
      {
        path: 'newResume', loadChildren: () => import('../form/form.module').then(m => m.FormModule), data: { routeName: 'createResume' }
      },
      {
        path: 'newVacancy', loadChildren: () => import('../form/form.module').then(m => m.FormModule), data: { routeName: 'createVacancy' }
      },
      {
        path: 'updateResume/:id', loadChildren: () => import('../form/form.module').then(m => m.FormModule), data: { routeName: 'updateResume' }
      },
      {
        path: 'updateVacancy/:id', loadChildren: () => import('../form/form.module').then(m => m.FormModule), data: { routeName: 'updateVacancy' }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalAccountRoutingModule { }
