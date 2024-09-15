import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VacancyService } from '../../personal-account/services/vacancy.service';
import { ViewCardService } from '../../view-card/view-card.service';

@Component({
  selector: 'app-card-personal-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-personal-resume.component.html',
  styleUrl: './card-personal-resume.component.css'
})
export class CardPersonalResumeComponent {

  constructor(private router: Router, private viewCardService: ViewCardService) { }
  
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


  viewCard(type: string, route: string) {
    this.viewCardService.selectedCard = this.cardItem.id;
    this.viewCardService.typeCard = type;
    localStorage.setItem('routeTypeCard', type);
    this.router.navigate([`/${route}`, this.cardItem.id]);
  }

}
