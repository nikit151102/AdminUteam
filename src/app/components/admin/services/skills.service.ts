import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment';

interface tag {
  id: number;
  name: string;
  nameEng: string;
  competenceLevel: number;
  type: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private stages: any;
  products: any;
  type = "SKILL";
  visibleForm: boolean = false;
  constructor(private http: HttpClient) { }
  private domain = `${environment.apiUrl}`;

  getFunction(page: any): Observable<any> {
    return this.http.get<any>(`${this.domain}/tags?page=${page}&size=1000&types=${this.type}`,);
  }

  addFunction(tag: tag): Observable<any> {
    return this.http.post<any>(`${this.domain}/tags`, tag, {
      headers: { 'Content-Type': 'application/json' }
    });

  }

  deleteFunction(tagId: string): Observable<any> {
    return this.http.delete<any>(`${this.domain}/tags/${tagId}`,);

  }

  putFunction(tag: tag, id: string): Observable<any> {
    return this.http.put<any>(`${this.domain}/tags/${id}`, tag, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  loading: boolean = false;
  page: any = 0

  getDataStatuses() {
    this.loading = true; 
    this.getFunction(this.page).subscribe(
      (response: tag[]) => {
        if (response.length > 0) {
          this.products = [...(this.products || []), ...response]; 
          this.page += 1; 
          console.log("this.page",this.page)
          this.getDataStatuses()
        }else{
          
        }
      },
      (error: any) => {
        this.loading = false; 
        console.error('Error:', error);
      }
    );
  }
  

  addsFunction(tags: tag[]): Observable<any> {
    return this.http.post<any>(`${this.domain}/tags/addAll`, tags, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


}
