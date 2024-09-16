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
      script.setAttribute('data-telegram-login', 'ucomandTOP_bot');
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
    this.http.post('https://uteam.top/api/admins/signin', user, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response: any) => {
      console.log("response", response);
      console.log("response.token", response.token);
      this.tokenService.setToken(response.token);
      this.login_user()
    });
  
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
    // this.popUpEntryService.getUser().subscribe(
    //   (data) => {
       
    //   },
    //   (error) => {
    //   }
    // );

  }



}
