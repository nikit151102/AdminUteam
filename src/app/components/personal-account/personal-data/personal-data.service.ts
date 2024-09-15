import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user-interface';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  
  constructor(private http: HttpClient) { }

  visible: boolean = false;

  private domain = 'https://uteam.top/api';
   
  getCities(): Observable<any> {
    return this.http.get(`${this.domain}/cities`);
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('authToken');

    // Создание заголовков с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Выполнение запроса с заголовками
    return this.http.get(`${this.domain}/users/currentUser`, { headers });
  }

  updateUser(user: User): Observable<any> {
    const token = localStorage.getItem('authToken');

    // Создание заголовков с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.domain}/users/currentUser`, user,  { headers }); // Обновите URL в соответствии с вашим API
  }
}
