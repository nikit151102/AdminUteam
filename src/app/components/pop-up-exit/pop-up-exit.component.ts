import { Component } from '@angular/core';
import { PopUpExitService } from './pop-up-exit.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-pop-up-exit',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-exit.component.html',
  styleUrl: './pop-up-exit.component.css'
})
export class PopUpExitComponent {

  constructor(public popUpExitService:PopUpExitService, private router: Router,public tokenService: TokenService){}

  cancel(): void {
    this.popUpExitService.hidePopup();  
  }

  exitAccount(){
    this.tokenService.clearToken();
    localStorage.removeItem('Linkken'); 
    this.router.navigate(['/']);
  }


}
