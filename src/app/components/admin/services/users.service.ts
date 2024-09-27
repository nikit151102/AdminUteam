import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: any;

  constructor(private http: HttpClient) { }

  private domain = `${environment.apiUrl}`;

  getFunction(): Observable<any> {
    return this.http.get<any>(`${this.domain}/users?page=0&size=1000`,);
  }

  getdata() {
    this.getFunction().subscribe(
      (response: any[]) => {
        this.users = response;
        console.log("this.users,",this.users)
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
