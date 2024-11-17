import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  { path: '', component: AdminComponent,
    children:[
      {
        path: '', redirectTo: 'home', pathMatch: 'full' // Автоматический переход на 'home'
      },
      {
        path: 'home', loadChildren: () => import('./homePage/home.module').then(m => m.HomesModule)
      },
      {
        path: 'personal', loadChildren: () => import('./admins-list/admins-list.module').then(m => m.AdminsListModule)
      },
      {
        path: 'users', loadChildren: () => import('./list-users/list-users.module').then(m => m.UsersListModule)
      },
      {
        path: 'vacancies', loadChildren: () => import('./vacancies/vacancies.module').then(m => m.VacanciesModule)
      },
      {
        path: 'resumes', loadChildren: () => import('./resumes/resumes.module').then(m => m.ResumesModule)
      },
      {
        path: 'specialties', loadChildren: () => import('./specialties/specialties.module').then(m => m.SpecialtiesModule)
      },
      {
        path: 'skills', loadChildren: () => import('./skills/skills.module').then(m => m.SkillsModule)
      },
      {
        path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'reservedNickname', loadChildren: () => import('./reserved-nickname/reserved-nickname.module').then(m => m.ReservedNicknameModule)
      },
      {
        path: 'excelHandler', loadChildren: () => import('./app-excel-handler/app-excel-handler.module').then(m => m.AppExcelHandlerModule)
      },
      {
        path: 'wordManager', loadChildren: () => import('./word-manager/word-manager.module').then(m => m.WordManagerModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
