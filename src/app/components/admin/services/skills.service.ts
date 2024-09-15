import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
visibleForm:boolean = false;
  constructor(private http: HttpClient) { }
  private domain = 'https://uteam.top/api';

  getFunction(): Observable<any> {
    return this.http.get<any>(`${this.domain}/tags?types=SKILL`,);
  }

  addFunction(tag: tag): Observable<any> {
    return this.http.post<any>(`${this.domain}/tags`,  tag, {
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
  getdataStatusses() {
    this.getFunction().subscribe(
      (response: tag[]) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
