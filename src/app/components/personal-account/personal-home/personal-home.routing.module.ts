import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalHomeComponent } from './personal-home.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalHomeRoutingModule { }
