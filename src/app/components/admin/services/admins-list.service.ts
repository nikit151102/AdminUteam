import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminsListService {
  users: any;

  constructor(private http: HttpClient) { }

  private domain = 'https://uteam.top/api';

  getFunction(): Observable<any> {
    return this.http.get<any>(`${this.domain}/users?page=0&size=1000`,);
  }

  getdata() {
    this.getFunction().subscribe(
      (response: any[]) => {
        this.users = response.filter((user: any) => user.role === 'ADMIN');
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }


  deleteFunction(id:string): Observable<any> {

    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.domain}/users/${id}`,{ headers });
  }

  deleteUser(userId: string) {
    this.deleteFunction(userId).subscribe(
      (response: any[]) => {
        this.getdata();
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  
  addFunction(user:any): Observable<any> {

    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.domain}/admins/signup`, user, { headers });
  }

  addUser(user: any) {
    this.addFunction(user).subscribe(
      (response: any[]) => {
        this.getdata();
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

}
