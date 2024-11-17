import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordManagerComponent } from './word-manager.component';

const routes: Routes = [
    { path: '', component:  WordManagerComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WordManagerRoutingModule { }
