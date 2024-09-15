import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {

  @Input() data: any;

  getSpecialization(): string {
    return this.data.profession && this.data.profession.name
      ? this.data.profession.name.toUpperCase()
      : 'Не указана';
  }

  getCompetenceLevel(): string {
    return this.data.profession && this.data.profession.competenceLevel
      ? this.data.profession.competenceLevel
      : '';
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

  getMotivationColor(motivation: string): string {
    switch (motivation) {
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
