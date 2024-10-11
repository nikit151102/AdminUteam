import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GeneralStatComponent } from './general-stat/general-stat.component';
import { AdminsListComponent } from '../admins-list/admins-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GeneralStatComponent, AdminsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  menuItems: any[] = [
    {
      label: 'Персонал', icon: 'pi pi-home', command: 'personal'
    },
    {
      label: 'Пользователи', icon: 'pi pi-users', command: 'users'
    },
    {
      label: 'Вакансии', icon: 'pi pi-briefcase', command: 'vacancies'
    },
    {
      label: 'Резюме', icon: 'pi pi-file', command: 'resumes'
    },
    {
      label: 'Специальности', icon: 'pi pi-book', command: 'specialties'
    },
    {
      label: 'Навыки', icon: 'pi pi-cog', command: 'skills'
    },
    {
      label: 'Список исключений логинов', icon: 'pi pi-ban', command: 'reservedNickname'
    },
    {
      label: 'Уведомления', icon: 'pi pi-bell', command: 'notifications'
    },
      {
      label: 'Инструменты', icon: 'pi pi-cog', command: 'excelHandler'
    },
    
    {
      label: 'Выйти', icon: 'pi pi-sign-out', command: 'exit'
    }
  ];


  executeCommand(item: string) {
    console.log("item", item)
    if (item === 'exit') {
      localStorage.removeItem('YXV0aEFkbWluVG9rZW4=');
      localStorage.removeItem('idAdmin');
      this.router.navigate(['/'])
    } else {
      console.log(localStorage.getItem('YXV0aEFkbWluVG9rZW4='));
      this.router.navigate([`/admin/${localStorage.getItem('YXV0aEFkbWluVG9rZW4=')}/${item}`]);
    }
  
  }
}
