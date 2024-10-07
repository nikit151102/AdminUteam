import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ListUsersService } from './list-users.service';
import { FormUserComponent } from './form-user/form-user.component';
import { Router } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [TableModule, CommonModule, PaginatorModule, ButtonModule, FormUserComponent, OverlayPanelModule, TagModule],
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
  isModalVisible: boolean = false; // Для управления видимостью модального окна
  isBanned: boolean = false; // Флаг заблокирован/разблокирован
  banReason: string = '';
  isBanReasonInvalid: boolean = false;
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

  viewUser(nick: string):string  {
    return this.router.createUrlTree([``, nick]).toString();
  }

  selectUser: any;

  
  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.selectUser = '';
    this.isModalVisible = false;
  }

  setBanDialog(product: any) {
    this.selectUser = product;
    this.openModal()
  }

  banUser() {
    if (this.selectUser.banned === true) {
      this.selectUser.banned = false;
    } else {
      if (this.banReason.trim() === '') {
        this.isBanReasonInvalid = true;
        return;
      } else {
        this.selectUser.banned = true;
        this.selectUser.banReason = this.banReason;
      }
    }

    this.usersService.banUser(this.selectUser);
    this.isBanned = !this.isBanned;
    this.banReason = '';
    this.closeModal();
  }

  validateBanReason() {
    this.isBanReasonInvalid = this.banReason.trim() === '';
  }
  
  deleteUser(id: string){
    this.usersService.deleteUser(id);
  }

}