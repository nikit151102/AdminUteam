import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive-vacancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-vacancy.component.html',
  styleUrl: './archive-vacancy.component.css'
})
export class ArchiveVacancyComponent {

  constructor(private vacancyService: VacancyService,private router: Router) { }

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

  isSettingActive: boolean = false;

  Actived() {
    this.isSettingActive = !this.isSettingActive
  }

  refund() {
    if (this.cardItem) {
      this.vacancyService.toggleResumeArchive(this.cardItem);
    }
  }

  deleteById() {
    if (this.cardItem) {
      { }
      this.cardItem.visibility = 'CREATOR_ONLY';
      this.vacancyService.deleteById(this.cardItem.id).subscribe(
        (response: any) => {
          console.log("user", response);

        });
    }
    (error: any) => {
      console.error('Ошибка при загрузке данных пользователя:', error);
    }
  }

  update(event: Event, id: number) {
    event.stopPropagation();
    const userId = localStorage.getItem('userId')
    this.router.navigate([`/myaccount/${userId}/updateVacancy/${id}`]);
  }
  
}


