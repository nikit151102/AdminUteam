import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  private authSubject = new BehaviorSubject<boolean>(false);
  authTheme$ = this.authSubject.asObservable();

  
  changeTheme(theme: boolean) {
    this.authSubject.next(theme);
  }

}
