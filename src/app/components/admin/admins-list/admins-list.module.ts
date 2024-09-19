import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsListRoutingModule } from './admins-list.routing.module';
import { AdminsListComponent } from './admins-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminsListRoutingModule,
    AdminsListComponent
  ]
})
export class AdminsListModule { }
