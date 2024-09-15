import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ViewCardService } from '../../view-card/view-card.service';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';


@Component({
  selector: 'app-personal-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class PersonalResumeComponent implements OnInit {

  @Input() cardItem: any;

  constructor(private router: Router, private viewCardService: ViewCardService, private resumeService: ResumeService) { }
  ngOnInit(): void {
    console.log("cardItem", this.cardItem)
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

  getSkillText(item: number): string {
    console.log("item", )
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

  isSettingActive: boolean = false;

  Actived() {
    this.isSettingActive = !this.isSettingActive
  }

  viewCard(type: string, route: string) {
    this.viewCardService.selectedCard = this.cardItem.id;
    this.viewCardService.typeCard = type;
    localStorage.setItem('routeTypeCard', type);
    this.router.navigate([`/${route}`, this.cardItem.id]);

  }

  setArchive(event: Event) {
    event.stopPropagation();
    if (this.cardItem) {
      this.resumeService.toggleResumeArchive(this.cardItem);
    }
  }

  update(event: Event, id: number) {
    event.stopPropagation();
    const userId = localStorage.getItem('userId')
    this.router.navigate([`/myaccount/${userId}/updateResume/${id}`]);
  }

}
