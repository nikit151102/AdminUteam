import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumesService {


  products: any;
  body: any = {};
  editData: any;
  type = "RESUME";
  visibleForm: boolean = false;
  constructor(private http: HttpClient) { }
  private domain = 'https://uteam.top/api';

  getFunction(): Observable<any> {
    return this.http.post<any>(`${this.domain}/resumes/getAll?page=0&size=1000`, this.body);
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

    return this.http.delete(`${this.domain}/resumes/${id}`, { headers });
  }

  putFunction(body: any, id: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.domain}/resumes//${id}`, body, { headers });
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
