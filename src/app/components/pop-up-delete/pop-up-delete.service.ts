import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpDeleteService {
  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();  // Экспортируем как Observable

  private domain = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  showPopup() {
    this.visibleSubject.next(true);  // Устанавливаем значение true
  }

  hidePopup() {
    this.visibleSubject.next(false); // Устанавливаем значение false
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.domain}/users/currentUser`, { headers });
  }


  deleteUser(id: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.domain}/users/${id}`, { headers });
  }

  getCurrentUserAndDelete(): Observable<any> {
    return this.getCurrentUser().pipe(
      switchMap(user => {
        if (user && user.id) {
          return this.deleteUser(user.id);
        } else {
          throw new Error('Пользователь не найден или отсутствует ID');
        }
      })
    );
  }

}