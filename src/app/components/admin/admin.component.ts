import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet ,HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [MessageService]
})
export class AdminComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor() { }

  ngOnInit() {

    this.items = [
      {
        label: 'Главная',
        routerLink: ['/home']
      },
      {
        label: 'Пользователи',
        routerLink: ['/users']
      },
      {
        label: 'Вакансии',
        routerLink: ['/vacancies']
      },
      {
        label: 'Резюме',
        routerLink: ['/resumes']
      },
      {
        label: 'Специальности',
        routerLink: ['/specialties']
      },
      {
        label: 'Навыки',
        routerLink: ['/skills']
      },
      {
        label: 'Уведомления',
        routerLink: ['/notifications']
      },
    ]
  }
}
