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
        command: () => {
          this.router.navigate([`/admin/${localStorage.getItem('YXV0aEFkbWluVG9rZW4=')}/home`]);
      },
      },
      {
        label: 'Пользователи',
        command: () => {
          this.router.navigate([`/admin/${localStorage.getItem('YXV0aEFkbWluVG9rZW4=')}/users`]);
      },
      },
      {
        label: 'Вакансии',
        command: () => {
          this.router.navigate([`/admin/${localStorage.getItem('YXV0aEFkbWluVG9rZW4=')}/vacancies`]);
      },
      },
      {
        label: 'Резюме',
        command: () => {
          this.router.navigate([`/admin/${localStorage.getItem('YXV0aEFkbWluVG9rZW4=')}/resumes`]);
      },
      },
      {
        label: 'Специальности',
        command: () => {
          this.router.navigate([`/admin/${localStorage.getItem('YXV0aEFkbWluVG9rZW4=')}/specialties`]);
      },
      },
      {
        label: 'Навыки',
        command: () => {
          this.router.navigate([`/admin/${localStorage.getItem('YXV0aEFkbWluVG9rZW4=')}/skills`]);
      },
      },
      {
        label: 'Уведомления',
        command: () => {
          this.router.navigate([`/admin/${localStorage.getItem('YXV0aEFkbWluVG9rZW4=')}/notifications`]);
      },
      },
      {
        label: 'Выйти',
        routerLink: ['/'],
        command: () => {
          localStorage.removeItem("YXV0aEFkbWluVG9rZW4=");
          localStorage.removeItem("idAdmin");
          
      }
      },
    ]
  }
}
