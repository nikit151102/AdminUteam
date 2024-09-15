import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VacancyService } from '../../personal-account/services/vacancy.service';
import { ViewCardService } from '../../view-card/view-card.service';

@Component({
  selector: 'app-card-personal-vacancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-personal-vacancy.component.html',
  styleUrl: './card-personal-vacancy.component.css'
})
export class CardPersonalVacancyComponent {

  constructor(private router: Router, private viewCardService: ViewCardService, private vacancyService: VacancyService) { }

  @Input() cardItem: any;
  
  getSkillsColor(item: number): string {
    switch (item) {
      case 1:
        return '#50B229';
      case 2:
        return '#FAD305';
      case 3:
        return '#EE5354';
      default:
        return '';
    }
  }

  getSkills(item: number): string {
    console.log("item", item)
    switch (item) {
      case 1:
        return 'Junior';
      case 2:
        return 'Middle';
      case 3:
        return 'Senior';
      default:
        return '';
    }
  }

  getMotivationColor(item: string): string {
    switch (item) {
      case 'Без оплаты':
        return '#FFAB00';
      case 'Нужна практика':
        return '#CF87F1';
      case 'За долю':
        return '#298CF4';
      case 'За оплату':
        return '#23B9B0';
      default:
        return '';
    }
  }

  viewCard(type: string, route: string) {
    this.viewCardService.selectedCard = this.cardItem.id;
    this.viewCardService.typeCard = type;
    localStorage.setItem('routeTypeCard', type);
    this.router.navigate([`/${route}`, this.cardItem.id]);
  }

}
