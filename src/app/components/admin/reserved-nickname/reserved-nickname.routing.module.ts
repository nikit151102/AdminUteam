import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservedNicknameComponent } from './reserved-nickname.component';

const routes: Routes = [
    { path: '', component: ReservedNicknameComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReservedNicknameRoutingModule { }
