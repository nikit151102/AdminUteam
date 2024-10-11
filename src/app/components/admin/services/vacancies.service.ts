import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

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
  private domain = `${environment.apiUrl}`;

  getFunction(page: any, rowsPerPage: any): Observable<any> {
    return this.http.post<any>(`${this.domain}/vacancies/getAll?page=${page}&size=${rowsPerPage}`, this.body);
  }

  addFunction(vacancy: any): Observable<any> {
    return this.http.post<any>(`${this.domain}/tags`, vacancy, {
      headers: { 'Content-Type': 'application/json' }
    });

  }

  deleteFunction(id: string) {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.domain}/vacancies/${id}`, { headers });
  }

  putFunction(body: any, id: any): Observable<any> {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.domain}/vacancies//${id}`, body, { headers });
  }

  putBanFunction(body: any, id: any): Observable<any> {
    const token = localStorage.getItem('YXV0aEFkbWluVG9rZW4=');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.domain}/vacancies/${id}`, body, { headers });
  }

  getData(page: any, rowsPerPage: any) {
    this.getFunction(page, rowsPerPage).subscribe(
      (response: any[]) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  deleteCard(id: string) {
    this.deleteFunction(id).subscribe(
      (response: any) => {
        
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  updateCard(product: any){
    this.putFunction(product, product.id).subscribe(
      (response: any) => {
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  banCard(product: any){
    this.putBanFunction(product, product.id).subscribe(
      (response: any) => {
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

}
