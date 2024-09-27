import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpEntryService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  visible: boolean = false;
  userVisible: boolean = false;
  private domain = `${environment.apiUrl}`;

  getUser(): Observable<any> {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=')
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
