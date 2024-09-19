import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialtiesComponent } from './specialties.component';


const routes: Routes = [
    { path: '', component:  SpecialtiesComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecialtiesRoutingModule { }
