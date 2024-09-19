import { Component } from '@angular/core';
import { ListCardsComponent } from '../list-cards/list-cards.component';
import { VacanciesService } from '../services/vacancies.service';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [ListCardsComponent],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.css'
})
export class VacanciesComponent {

  constructor(public vacanciesService:VacanciesService){}
  
}
