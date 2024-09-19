import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservedNicknameService {

  products: any;

  constructor(private http: HttpClient) { }

  private domain = 'https://uteam.top/api';

  getFunction(searchValue: string | null = null) {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = searchValue ? new HttpParams().set('search', searchValue) : new HttpParams();

    return this.http.get<any>(`${this.domain}/reservedNicknames`, { headers, params });
  }

  getTags(searchValue: string) {
    this.getFunction(searchValue).subscribe({
      next: (response) => {
        this.products = response;
        console.log("response", response)
      },
      error: (error) => {

        console.error('Error:', error);
      }
    });
  }


  addFunction(value: string) {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain', 'Authorization': `Bearer ${token}` });

    return this.http.post<any>(`${this.domain}/reservedNicknames`,value, {
      headers,
      responseType: 'json'
    });
  }

  addTag(value: string) {
    this.addFunction(value).subscribe({
      next: (response) => {

      },
      error: (error) => {

        console.error('Error:', error);
      }
    });
  }


  deleteFunction(value: string) {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.domain}/reservedNicknames/${value}`, { headers });
  }

  deleteTag(value: string) {
    this.deleteFunction(value).subscribe((response: any) => {
    }
    );
  }

}
