import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet ,HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [MessageService]
})
export class AdminComponent  {

}
