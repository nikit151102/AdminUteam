import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() {
    // Инициализируем проверку ширины экрана
    this.checkScreenWidth();
    // Добавляем прослушку на изменение размера экрана
    window.addEventListener('resize', () => this.checkScreenWidth());
  }

  // Метод для проверки ширины экрана
  private checkScreenWidth() {
    const isMobile = window.innerWidth <= 768; // Мобильный режим при ширине <= 768px
    this.isMobileScreen.next(isMobile); // Обновляем состояние
    this.width_slide = isMobile ? 0 : 78; // Устанавливаем ширину сайдбара в зависимости от устройства
  }

  isSidebarClosed: boolean = true;
  private isMobileScreen = new BehaviorSubject<boolean>(false);
  isMobileScreen$ = this.isMobileScreen.asObservable(); // Экспортируем для подписки

  width_slide = 78; // Дефолтная ширина для десктопа

  private isSidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarState = this.isSidebarOpen.asObservable();

  isMouseOver: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen.next(!this.isSidebarOpen.value);
    this.isSidebarClosed = !this.isSidebarClosed;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const link_names = document.querySelectorAll('.sidebar .nav-links li a .link_name') as NodeListOf<HTMLElement>;

    if (sidebar && link_names.length) {
      this.toggleSidebarSize(this.isMouseOver, sidebar, link_names);
    }
  }


  toggleSidebarSize(isMouseOver: boolean, sidebar: HTMLElement, link_names: NodeListOf<HTMLElement>) {
    if (isMouseOver) {
      sidebar.style.width = '300px';  // Расширение сайдбара при наведении
      link_names.forEach((link_name) => {
        link_name.style.opacity = '1'; // Показываем текст
        this.isMouseOver = false;
        this.isSidebarOpen.next(true);
        this.isSidebarClosed = false;
      });
      const container = document.querySelector('.container') as HTMLElement;
      const content = document.querySelector('.content') as HTMLElement;
      const header = document.querySelector('.header') as HTMLElement;
      if (container) {
     
          content.style.paddingLeft = this.isMobileScreen$ ? '210px' : '0px';
          header.style.paddingLeft = this.isMobileScreen$ ? '210px' : '0px';
      }
      
    } else {
      sidebar.style.width = `${this.width_slide}px`;  // Сворачиваем сайдбар при убирании курсора
      link_names.forEach((link_name) => {
        link_name.style.opacity = '0'; // Скрываем текст
        this.isMouseOver = true;
      });
      this.isSidebarOpen.next(false);
      this.isSidebarClosed = true;
      const container = document.querySelector('.container') as HTMLElement;
      const content = document.querySelector('.content') as HTMLElement;
      const header = document.querySelector('.header') as HTMLElement;
      if (container) {
     
          content.style.paddingLeft = this.isMobileScreen$ ? '0px' : '210px';
          header.style.paddingLeft = this.isMobileScreen$ ? '0px' : '210px';
      }
    }
  }

}
