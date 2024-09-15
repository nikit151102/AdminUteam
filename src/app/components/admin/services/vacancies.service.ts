import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  products: any;
  body: any = {};
  editData: any;
  type = "PROFESSION";
  visibleForm: boolean = false;
  constructor(private http: HttpClient) { }
  private domain = 'https://uteam.top/api';

  getFunction(): Observable<any> {
    return this.http.post<any>(`${this.domain}/vacancies/getAll?page=0&size=1000`, this.body);
  }

  addFunction(vacancy: any): Observable<any> {
    return this.http.post<any>(`${this.domain}/tags`, vacancy, {
      headers: { 'Content-Type': 'application/json' }
    });

  }

  deleteFunction(id: string) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.domain}/vacancies/${id}`, { headers });
  }

  putFunction(body: any, id: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.domain}/vacancies//${id}`, body, { headers });
  }

  getData() {
    this.getFunction().subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
