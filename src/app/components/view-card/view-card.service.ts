import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TokenService } from '../token.service';

export interface Vacancy {
  title: string;
  context: string;
  contextLevel: string;
  skills: string[];
  motivations: string[];
  date: string;
  description: string;
  fullName: string;
}

export interface User {
  name: string; // Имя пользователя.
  surname: string; // Фамилия пользователя.
  age: number; // Возраст пользователя.
  gender: string; // Пол пользователя ("male" или "female").
  city: string; // Город пользователя.
  portfolio: string; // Ссылка или текст, представляющий портфолио пользователя.
  aboutMe: string; // Описание о пользователе.
  email: string; // Адрес электронной почты пользователя.
  telegram: string; // Имя пользователя в Telegram.
  nickname: string; // Пользовательский ник, связанный с аккаунтом пользователя.
  phone: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewCardService {

  constructor(private http: HttpClient, private tokenService:TokenService) { }

  selectedCard: any;
  selectedUser: User = {
    name: "Иван",
    surname: "Иванов",
    age: 30,
    gender: "male",
    city: "Москва",
    portfolio: "https://ivanov-portfolio.com",
    aboutMe: "Разработчик программного обеспечения с опытом работы в различных областях. Интересуюсь новыми технологиями и постоянно стремлюсь к саморазвитию.",
    email: "ivanov@example.com",
    telegram: "@ivanov",
    nickname: "ivanov_007",
    phone: "+7 123 456-78-90",
    url: "https://www.behance.net/admin1237"
  };

  typeCard: string = '';

  private domain = 'https://uteam.top/api';

  getCardData(id: number, typeCard:string): Observable<any> {
    return this.http.get(`${this.domain}/${typeCard}/${id}`);
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return of(null);
    }
    // Создание заголовков с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.domain}/users/currentUser`, { headers }).pipe(
      catchError(() => {
        this.tokenService.clearToken()
        return of(null); 
      })
    );
  }

}
