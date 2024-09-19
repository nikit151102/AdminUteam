import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsListComponent } from './admins-list.component';



const routes: Routes = [
    { path: '', component: AdminsListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminsListRoutingModule { }
