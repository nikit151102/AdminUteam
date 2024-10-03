import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppExcelHandlerComponent } from './app-excel-handler.component';


const routes: Routes = [
  {
    path: '', component: AppExcelHandlerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppExcelHandlerRoutingModule { }
