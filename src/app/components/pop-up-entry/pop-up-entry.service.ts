import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class PopUpEntryService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  visible: boolean = false;
  userVisible: boolean = false;
  private domain = 'https://uteam.top/api';

  getUser(): Observable<any> {
    const token = this.tokenService.getToken();
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
