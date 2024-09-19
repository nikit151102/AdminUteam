import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private authTokenSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.authTokenSubject.asObservable();

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('YXV0aEFkbWluVG9rZW4='); 
  }

  getToken(): boolean {
    return this.authTokenSubject.value;
  }

  setToken(token:string): void {
    localStorage.setItem('YXV0aEFkbWluVG9rZW4=', token); //Base64 Encoding
    this.authTokenSubject.next(true);
  }

  clearToken(): void {
    localStorage.removeItem('YXV0aEFkbWluVG9rZW4=');
    this.authTokenSubject.next(false);
  }
  

}
