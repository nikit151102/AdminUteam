import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordManagerService {
  //private apiUrl = 'https://ucomand.ru/logs/files'; 
  private apiUrl = 'http://127.0.0.1:8000/files'; 
  
  constructor(private http: HttpClient) { }

  getFile(filename: string): Observable<Blob> {
    const url = `${this.apiUrl}/files/${filename}`;

    const headers = new HttpHeaders().set('accept', 'application/json');

    return this.http.get<Blob>(url, { headers, responseType: 'blob' as 'json' });
  }

  
  overwriteFile(file: File): Observable<any> {
    const url = `${this.apiUrl}/overwriteFile`;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(url, formData);
  }
}
