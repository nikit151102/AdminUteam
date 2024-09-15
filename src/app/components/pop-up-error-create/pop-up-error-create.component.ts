import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpErrorCreateService } from './pop-up-error-create.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up-error-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up-error-create.component.html',
  styleUrl: './pop-up-error-create.component.css'
})
export class PopUpErrorCreateComponent {

  constructor(public popUpErrorCreateService: PopUpErrorCreateService,
    private router: Router
  ){}

  proceed() {
    const userId = localStorage.getItem('userId')
    this.popUpErrorCreateService.visible = false;
    this.router.navigate([`/myaccount/${userId}/personalData`]);
  }

  closePopUp() {
    this.popUpErrorCreateService.visible = false;
  }

}
