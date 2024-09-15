import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpEntryService {

  constructor(private http: HttpClient) { }

  visible: boolean = false;
  userVisible: boolean = false;
  private domain = 'https://uteam.top/api';

  getUser(): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.domain}/users/currentUser`, { headers });
  }

  getRoot(): Observable<any> {
    return this.http.get(`${this.domain}/admins/rootToken`);
  }

  showDialog() {
    this.visible = true;
  }

}
