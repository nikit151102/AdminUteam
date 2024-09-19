import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { InputOtpModule } from 'primeng/inputotp';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, FormsModule, InputOtpModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(
    private router: Router,
  ) { }

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
        label: 'Список исключений логинов ',
        routerLink: ['/reservedNickname']
      },
      {
        label: 'Уведомления',
        routerLink: ['/notifications']
      },
    ]
  }
}
