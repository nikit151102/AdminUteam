import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalHomeService {

  constructor(private http: HttpClient) { }
  
  private domain = 'https://uteam.top/api';
  getCardsData(typeCard: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    // Создание заголовков с токеном
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.domain}/${typeCard}/ofCurrentUser`,  { headers });
  }


}
