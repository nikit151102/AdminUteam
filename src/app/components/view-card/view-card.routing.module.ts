import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCardComponent } from './view-card.component';
import { RouteResolverServiceService } from './route-resolver-service.service';
import { PageErrorComponent } from '../page-error/page-error.component';
import { PageErrorGuard } from '../page-error/page-error.guard';


const routes: Routes = [
  { path: '', component: ViewCardComponent, resolve: { data: RouteResolverServiceService }
  },
  {
    path: 'error', component:PageErrorComponent
  },
  { path: '**', redirectTo: '/error' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class ViewCardRoutingModule { }
