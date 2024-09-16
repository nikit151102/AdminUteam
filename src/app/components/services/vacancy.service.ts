import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VacancyService {

  private subscription: Subscription | null = null;
  constructor(private http: HttpClient) { }
  
  private domain = 'https://uteam.top/api';

  vacanciesList: any[] = [];
  activeVacancies: any[] = [];
  archiveVacancies: any[] = [];

  getCardsData(): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.domain}/vacancies/ofCurrentUser`, { headers });
  }

  // Метод для создания подписки
  subscribeToGetCardsData(): void {
    this.subscription = this.getCardsData().subscribe(
      (response: any) => {
        this.vacanciesList = response;
        this.updateVacanciesLists();
      },
      (error: any) => {
        console.error('Ошибка при загрузке данных резюме:', error);
      }
    );
  }

  // Метод для отписки от подписки
  unsubscribeFromGetCardsData(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }



  setArchive(id: string, body: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.domain}/vacancies/ofCurrentUser/${id}`, body ,{ headers });
  }

  deleteById(id: string){
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.domain}/vacancies/${id}`,{ headers });
  }
  

  filterVacancies(type: string): any[] {
    return this.vacanciesList.filter((resume: any) => resume.visibility === type);
  }

  updateVacanciesLists(): void {
    this.activeVacancies = this.filterVacancies('CREATOR_ONLY');
    this.archiveVacancies = this.filterVacancies('EVERYBODY');
  }

  // Метод для перемещения резюме в архив или обратно
  toggleResumeArchive(resume: any): void {
    // Определяем новое состояние для резюме
    const newVisibility = resume.visibility === 'CREATOR_ONLY' ? 'EVERYBODY' : 'CREATOR_ONLY';
    const updatedResume = { ...resume, visibility: newVisibility };

    // Обновляем резюме на сервере
    this.setArchive(resume.id, updatedResume).subscribe(
      (response: any) => {
        // После успешного обновления на сервере обновляем локальные данные
        this.updateVacancies(updatedResume);
        this.updateVacanciesLists();
        console.log('Резюме успешно обновлено:', response);
      },
      (error: any) => {
        console.error('Ошибка при обновлении резюме:', error);
      }
    );
  }

  // Метод для обновления списка резюме
  updateVacancies(updatedResume: any): void {
    this.vacanciesList = this.vacanciesList.map((resume: any) =>
      resume.id === updatedResume.id ? updatedResume : resume
    );
  }
}
