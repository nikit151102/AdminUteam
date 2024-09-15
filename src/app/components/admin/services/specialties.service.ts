import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
export class SpecialtiesService {


  products: any;
  private stages: any;
  type = "PROFESSION";
  visibleForm:boolean = false;
  constructor(private http: HttpClient) { }
  private domain = 'https://uteam.top/api';

  getFunction(): Observable<any> {
    return this.http.get<any>(`${this.domain}/tags?types=PROFESSION`,);
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
