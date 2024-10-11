import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getFunction(page: any, rowsPerPage: any): Observable<any> {
    return this.http.get<any>(`${this.domain}/users?page=${page}&size=${rowsPerPage}`);
  }


  putBanFunction(user: any): Observable<any> {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(`${this.domain}/users/${user.id}`, user, { headers });
  }

  deleteFunction(id: string): Observable<any> {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.domain}/users/${id}`, { headers });
  }

  banUser(user: any) {
    console.log("user", user)
    this.putBanFunction(user).subscribe(
      (updatedUser: any) => {
        // Заменяем объект в массиве на новый, который пришел с сервера
        this.users = this.users.map((existingUser: any) => {
          // Сравниваем id пользователя из массива с id обновленного пользователя
          return existingUser.id === user.id ? updatedUser : existingUser;
        });
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  

  deleteUser(id: string) {
    this.deleteFunction(id).subscribe(
      (response: any[]) => {
        this.users = this.users.filter((user: any) => user.id !== id);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

}
