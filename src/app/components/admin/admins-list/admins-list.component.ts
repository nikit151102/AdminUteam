import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { AdminsListService } from '../services/admins-list.service';
import { Router, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admins-list',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule, ButtonModule, RouterModule, FormComponent],
  templateUrl: './admins-list.component.html',
  styleUrl: './admins-list.component.css'
})
export class AdminsListComponent {

  users = [];
  selectedUser: any | null = null;
  rowsPerPage = 10;
  totalUsers = 0;
  sortField = 'nickname';
  sortOrder = 1;

  constructor(public adminsListService:AdminsListService, private router:Router){}
  
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminsListService.getdata()
  }

  editUser(user: any) {
    this.selectedUser = user;
  
  }

  deleteUser(user: any) {
    this.adminsListService.deleteUser(user.id);
  }


  onUserClick(event: MouseEvent, user: any): void {
    this.router.navigate([``, user.nickname]);
  }

  
}
