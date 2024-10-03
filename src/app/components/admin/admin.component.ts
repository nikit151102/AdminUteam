import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './sidebar/sidebar.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, ButtonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isSidebarOpen: boolean = false;
  private screenSubscription!: Subscription;

  constructor(public sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarState.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });

    // Subscribe to screen width changes
    this.screenSubscription = this.sidebarService.isMobileScreen$.subscribe((isMobile) => {
      const sidebar = document.querySelector('.container') as HTMLElement;
      if (sidebar) {
        sidebar.style.paddingLeft = isMobile ? '0px' : '100px';
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup the subscription
    if (this.screenSubscription) {
      this.screenSubscription.unsubscribe();
    }
  }
}
