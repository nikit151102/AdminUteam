import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ListUsersService } from './list-users.service';
import { FormUserComponent } from './form-user/form-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule, ButtonModule, FormUserComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {

  users = [];
  selectedUser: any | null = null;
  rowsPerPage = 10;
  totalUsers = 0;
  sortField = 'id';
  sortOrder = 1;

  constructor(public usersService: UsersService, private router: Router, public listUsersService: ListUsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getdata()
  }

  editUser(user: any) {
    this.selectedUser = user;
    this.listUsersService.visibleForm = true;
  }

  viewUser(id: string):string  {
    return this.router.createUrlTree([`/user`, id]).toString();
  }


}