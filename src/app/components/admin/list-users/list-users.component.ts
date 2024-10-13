import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
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

  users: any[] = [];
  selectedUser: any | null = null;
  rowsPerPage = 10;
  page = 0;
  totalUsers = 0;
  sortField = 'id';
  sortOrder = 1;
  isModalVisible: boolean = false; // Для управления видимостью модального окна
  isBanned: boolean = false; // Флаг заблокирован/разблокирован
  banReason: string = '';
  isBanReasonInvalid: boolean = false;
  loading = true;
  isAllCard: boolean = false;

  constructor(public usersService: UsersService, private router: Router,  private cd: ChangeDetectorRef,  public listUsersService: ListUsersService) { }

  ngOnInit() {
    this.page = 0;
    this.loadUsers();
  }
  
  // onTableScroll(event: any) {
  //   if(!this.isAllCard){
  //     const element = event.target;
  //     const pos = element.scrollTop + element.offsetHeight;
  //     const max = element.scrollHeight;
  
  //     if (pos >= max - 50 && !this.loading) {
  //       this.page++;
  //       this.loadUsers();
  //     }
  //   }
  // }
  onTableScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      this.page++;
      this.loadUsers();
    }
  }

 
  loadUsers() {
    this.loading = true;
    this.usersService.getFunction(this.page, this.rowsPerPage).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          this.users = [...(this.users || []), ...response];
          this.loading = false;

          console.log("this.page",this.page)
          this.cd.detectChanges();
        } else {
          this.loading = false;
          this.isAllCard = true;
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }

  editUser(user: any) {
    this.selectedUser = user;
    this.listUsersService.visibleForm = true;
  }

  // viewUser(nick: string):string  {
  //   return this.router.createUrlTree([``, nick]).toString();
  // }
  viewUser(nick: string): string {
    return `https://uteam.top/${nick}`;
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