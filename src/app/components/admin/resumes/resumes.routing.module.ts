import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumesComponent } from './resumes.component';


const routes: Routes = [
    { path: '', component: ResumesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResumesRoutingModule { }
