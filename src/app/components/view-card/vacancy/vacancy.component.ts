import { Component, Input } from '@angular/core';
import { ViewCardService } from '../view-card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.css'
})
export class VacancyComponent {

  @Input() data: any;
  constructor(public viewCardService: ViewCardService) {

  }

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
    console.log("item",)
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

  getSkillText(item: number): string {
    console.log("item",)
    switch (item) {
      case 1:
        return 'Jun';
      case 2:
        return 'Mdl';
      case 3:
        return 'Snr';
      default:
        return '';
    }
  }

  getMotivationColor(item: string): string {
    switch (item) {
      case 'Без оплаты':
        return '#ffab00';
      case 'Нужна практика':
        return '#cf87f1';
      case 'За долю':
        return '#298cf4';
      case 'За оплату':
        return '#23b9b0';
      default:
        return '';
    }
  }
}
