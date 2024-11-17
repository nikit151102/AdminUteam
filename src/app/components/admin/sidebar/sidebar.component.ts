import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [
    {
      label: 'Главная', icon: 'pi pi-home', command: 'home'
    },
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
      label: 'Слова исключения', icon: 'pi pi-cog', command: 'wordManager'
    },
    
    
    {
      label: 'Выйти', icon: 'pi pi-sign-out', command: 'exit'
    }
  ];

  constructor(public sidebarService: SidebarService, private router: Router) {

  }

  private screenSubscription!: Subscription;

  ngOnInit(): void {

    // Подписка на изменение ширины экрана
    this.screenSubscription = this.sidebarService.isMobileScreen$.subscribe(isMobile => {
      const sidebar = document.querySelector('.sidebar') as HTMLElement;
      if (sidebar) {
        sidebar.style.width = isMobile ? '0px' : `${this.sidebarService.width_slide}px`;

      }
    });
  }

  toggleSidebarSize(isMouseOver: boolean) {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const link_names = document.querySelectorAll('.sidebar .nav-links li a .link_name') as NodeListOf<HTMLElement>;

    if (sidebar && link_names.length) {
      this.sidebarService.toggleSidebarSize(isMouseOver, sidebar, link_names);
    }
    const container = document.querySelector('.container') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    const header = document.querySelector('.header') as HTMLElement;
    if (container) {
      if(isMouseOver){
        content.style.paddingLeft = this.sidebarService.isMobileScreen$ ? '210px' : '0px';
        header.style.paddingLeft = this.sidebarService.isMobileScreen$ ? '210px' : '0px';
      }else{
        content.style.paddingLeft = this.sidebarService.isMobileScreen$ ? '0' : '210px';
        header.style.paddingLeft = this.sidebarService.isMobileScreen$ ? '0' : '210px';
      }
     
    }
  }


  toggleSubMenu(item: any) {
    item.isExpanded = !item.isExpanded;
  }

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
    const sidebar = document.querySelector('.sidebar');

    if (sidebar instanceof HTMLElement) {
      sidebar.style.width = `${this.sidebarService.width_slide}px`;

    }
    const container = document.querySelector('.container') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    const header = document.querySelector('.header') as HTMLElement;
    if (container) {
      content.style.paddingLeft = this.sidebarService.isMobileScreen$ ? '0px' : '100px';
      header.style.paddingLeft = this.sidebarService.isMobileScreen$ ? '0px' : '100px';
    }
  }

}