import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PopUpDeleteService } from './pop-up-delete.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-pop-up-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up-delete.component.html',
  styleUrl: './pop-up-delete.component.css'
})
export class PopUpDeleteComponent {

  constructor(public popUpDeleteService: PopUpDeleteService, private router: Router, public tokenService: TokenService) { }

  cancel(): void {
    this.popUpDeleteService.hidePopup();
  }

  deleteUser() {
    this.popUpDeleteService.getCurrentUserAndDelete().subscribe(
      response => {
        console.log('Пользователь успешно удален:', response);
        this.popUpDeleteService.hidePopup();
        this.tokenService.clearToken();
        localStorage.removeItem('Linkken'); 
        this.router.navigate(['/']);
      },
      error => {
        console.error('Ошибка при удалении пользователя:', error);
      }
    );
  }

}