import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { PopUpEntryService } from './pop-up-entry.service';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pop-up-entry',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './pop-up-entry.component.html',
  styleUrls: ['./pop-up-entry.component.css']
})
export class PopUpEntryComponent implements AfterViewInit, OnDestroy, OnInit {

  constructor(
    public popUpEntryService: PopUpEntryService,
    private tokenService: TokenService,
    private http: HttpClient,
    private router: Router
  ) { }

 


  telegramWidgetLoaded: boolean = false;

  ngAfterViewInit() {
    if (this.popUpEntryService.visible) {
      this.loadTelegramWidget();
    }
  }
  ngOnInit() {
    // this.loadTelegramWidget()
  }

  ngOnDestroy() {
    this.telegramWidgetLoaded = false;
    this.removeTelegramWidget();
  }

  loadTelegramWidget() {
    if (!document.getElementById('telegram-widget-script')) {
      const script = document.createElement('script');
      script.id = 'telegram-widget-script';
      script.async = true;
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', 'Uteam_top_bot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');

      document.getElementById('telegram-login')?.appendChild(script);

      // Ensure onTelegramAuth is available globally
      (window as any).onTelegramAuth = this.onTelegramAuth.bind(this);
      this.telegramWidgetLoaded = true;
    }
  }



  removeTelegramWidget() {
    const script = document.getElementById('telegram-widget-script');
    if (script) {
      script.remove();
    }
    (window as any).onTelegramAuth = undefined;
    this.telegramWidgetLoaded = false;
  }
  
  onTelegramAuth(user: any) {
    console.log("Telegram User Data:", user);
    this.http.post('https://uteam.top/api/users/auth/byTelegram', user, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response: any) => {
      console.log("response", response);
      console.log("response.token", response.token);
      this.tokenService.setToken(response.token);
      this.login_user()
    });
    this.closePopUp()
  }


  login_enter() {
    this.popUpEntryService.visible = false;

    this.popUpEntryService.getRoot().subscribe(
      (data) => {
        this.tokenService.setToken(data.token);
        console.log('User data:', data.token);
        this.popUpEntryService.userVisible = true;
        this.popUpEntryService.visible = false;
        this.login_user()
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

  }

  login_user() {
    this.popUpEntryService.visible = false;
    const token = this.tokenService.getToken();
    console.log("tokentokentokentoken",token)
    this.popUpEntryService.getUser().subscribe(
      (data) => {
        const firstNameValid = typeof data.firstName === 'string' && data.firstName.trim() !== '';
        const lastNameValid = typeof data.lastName === 'string' && data.lastName.trim() !== '';
        const genderValid = typeof data.gender === 'string' && data.gender.trim() !== '';
        const ageValid = typeof data.age === 'number' && data.age > 0;
        const cityOfResidenceValid = typeof data.cityOfResidence !== null;
        const emailValid = typeof data.email === 'string' && data.email.trim() !== '';
        
        // if (!firstNameValid) {
        //   console.error('Invalid first name:', data.firstName);
        // }
        // if (!lastNameValid) {
        //   console.error('Invalid last name:', data.lastName);
        // }
        // if (!genderValid) {
        //   console.error('Invalid gender:', data.gender);
        // }
        // if (!ageValid) {
        //   console.error('Invalid age:', data.age);
        // }
        // if (!cityOfResidenceValid) {
        //   console.error('Invalid city of residence:', data.cityOfResidence);
        // }
        // if (!emailValid) {
        //   console.error('Invalid email:', data.email);
        // }

        const isDataValid = firstNameValid && lastNameValid && genderValid && ageValid && cityOfResidenceValid && emailValid;
        
        // true -> b326b5062b2f0e69046810717534cb09

        if(!isDataValid)
        {
          localStorage.setItem('fullAccess', 'we26b502b2fe32e69046810717534b32d');
        }else{
          localStorage.setItem('fullAccess', 'b326b5062b2f0e69046810717534cb09' );
        }
        localStorage.setItem('Linkken', data.imageLink);
        localStorage.setItem('userId', data.nickname && data.nickname !== 'string' ? data.nickname : String(data.id));
        this.popUpEntryService.userVisible = true;
        this.popUpEntryService.visible = false;
        this.closePopUp()
      },
      (error) => {
      }
    );
    this.closePopUp()
  }



  closePopUp() {
      this.popUpEntryService.visible = false; 
      this.telegramWidgetLoaded = false; 
      this.removeTelegramWidget(); 
  }
}
