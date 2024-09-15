import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SettingHeaderService } from '../../setting-header.service';
import { ArchiveResumeComponent } from '../archive-resume/archive-resume.component';
import { ArchiveVacancyComponent } from '../archive-vacancy/archive-vacancy.component';
import { PersonalResumeComponent } from '../resume/resume.component';
import { PersonalVacancyComponent } from '../vacancy/vacancy.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { DomainService } from '../../domain.service';
import { PersonalDataService } from '../personal-data/personal-data.service';
import { ViewCardService } from '../../view-card/view-card.service';
import { User } from '../personal-data/user-interface';
import { PersonalHomeService } from './personal-home.service';
import { catchError, forkJoin, Subscription } from 'rxjs';
import { PopUpDeleteComponent } from '../../pop-up-delete/pop-up-delete.component';
import { PopUpDeleteService } from '../../pop-up-delete/pop-up-delete.service';
import { PopUpExitService } from '../../pop-up-exit/pop-up-exit.service';
import { PopUpExitComponent } from '../../pop-up-exit/pop-up-exit.component';
import { ResumeService } from '../services/resume.service';
import { VacancyService } from '../services/vacancy.service';
import { FormSettingService } from '../../form/form-setting.service';
import { HomeService } from '../../home/home.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { PopUpErrorCreateService } from '../../pop-up-error-create/pop-up-error-create.service';

@Component({
  selector: 'app-personal-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PersonalVacancyComponent, PersonalResumeComponent, ArchiveResumeComponent, ArchiveVacancyComponent, PopUpDeleteComponent, PopUpExitComponent],
  templateUrl: './personal-home.component.html',
  styleUrl: './personal-home.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PersonalHomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private subscriptionExit: Subscription = new Subscription();
  isPopupVisible: boolean = false;
  isExitPopupVisible: boolean = false;

  constructor(private settingHeaderService: SettingHeaderService, private router: Router,
    private route: ActivatedRoute, private domainService: DomainService,
    public viewCardService: ViewCardService, private personalDataService: PersonalDataService,
    private personalHomeService: PersonalHomeService, private popUpDeleteService: PopUpDeleteService, public popUpExitService: PopUpExitService,
    public resumeService: ResumeService, public vacancyService: VacancyService,
    private formSettingService: FormSettingService,
    private popUpErrorCreateService: PopUpErrorCreateService) { }

  imagePath: string = '';
  domainName: string = '';
  dataCurrentUser: any = '';
  isDataComplete: boolean = true;
  visiblePage: boolean = false;
  vacanciesData: any;
  resumesData: any;

  showAllResume: boolean = false;
  itemsToShowResume: number = 3;
  toggleResumes() {
    this.showAllResume = !this.showAllResume;
    this.itemsToShowResume = this.showAllResume ? Infinity : 3;
  }

  showAllArchiveResume: boolean = false;
  itemsToShowArchiveResume: number = 3;
  toggleArchiveResumes() {
    this.showAllArchiveResume = !this.showAllArchiveResume;
    this.itemsToShowArchiveResume = this.showAllArchiveResume ? Infinity : 3;
  }


  showAllVacancies: boolean = false;
  itemsToShowVacancies: number = 3;
  toggleVacancies() {
    this.showAllVacancies = !this.showAllVacancies;
    this.itemsToShowVacancies = this.showAllVacancies ? Infinity : 3;
  }

  showAllArchiveVacancies: boolean = false;
  itemsToShowArchiveVacancies: number = 3;
  toggleArchiveVacancies() {
    this.showAllArchiveVacancies = !this.showAllArchiveVacancies;
    this.itemsToShowArchiveVacancies = this.showAllArchiveVacancies ? Infinity : 3;
  }

  ngOnInit(): void {
    this.settingHeaderService.shared = false;
    this.settingHeaderService.post = false;
    this.settingHeaderService.backbtn = true;

    this.resumeService.subscribeToGetCardsData();
    this.vacancyService.subscribeToGetCardsData();

    this.domainService.checkImageExists(this.domainName).then((path) => {
      this.imagePath = path;
    });
    this.subscription.add(
      this.popUpDeleteService.visible$.subscribe(visible => {
        this.isPopupVisible = visible;
      })
    );
    this.subscriptionExit.add(
      this.popUpExitService.visible$.subscribe(visible => {
        this.isExitPopupVisible = visible;
      })
    );

    // Параллельное выполнение запросов
    forkJoin({
      user: this.personalDataService.getCurrentUser().pipe(
        catchError(error => {
          console.error('Ошибка при загрузке пользователя:', error);
          return [];
        })
      ),
      vacancies: this.personalHomeService.getCardsData("vacancies").pipe(
        catchError(error => {
          console.error('Ошибка при загрузке вакансий:', error);
          return [];
        })
      ),
      resumes: this.personalHomeService.getCardsData("resumes").pipe(
        catchError(error => {
          console.error('Ошибка при загрузке резюме:', error);
          return [];
        })
      )
    }).subscribe(
      ({ user, vacancies, resumes }) => {
        this.dataCurrentUser = user;
        this.vacanciesData = vacancies;
        this.resumesData = resumes;
        this.checkUserData();

        console.log("dataCurrentUser", this.dataCurrentUser)
        console.log("resumes", resumes)
        console.log("vacancies", vacancies)
        this.visiblePage = true;
        this.domainName = this.domainService.setDomain(user.freeLink);
      },
      (error) => {
        console.error('Ошибка при загрузке данных:', error);
      }
    );

  }

  checkUserData(): void {
    const { firstName, lastName, gender, age, freeLink, ownLink, aboutMe, cityOfResidence } = this.dataCurrentUser;

    // Check if any field is missing or empty
    this.isDataComplete = !!(firstName && lastName);
  }

  getRouting() {
    this.router.navigate(['../personalData'], { relativeTo: this.route });
  }

  deleteUser(): void {
    this.popUpDeleteService.showPopup();
  }

  exitAccount() {
    this.popUpExitService.showPopup();
  }

  ngOnDestroy(): void {
    this.isExitPopupVisible = false;
    this.isPopupVisible = false;
    this.popUpDeleteService.hidePopup();
    this.popUpExitService.hidePopup();
    this.resumeService.unsubscribeFromGetCardsData();
    this.vacancyService.unsubscribeFromGetCardsData();
    this.subscription.unsubscribe();
  }

  filterVacancies(type: string): any[] {
    return this.vacanciesData.filter((vacancy: any) => vacancy.visibility == type);
  }

  handlePostResume(): void {
    const fullAccess = localStorage.getItem('fullAccess')
    const userId = localStorage.getItem('userId')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'резюме';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.router.navigate([`/myaccount/${userId}/newResume`]);
    } else {
      this.popUpErrorCreateService.visible = true;
    }
  }

  handlePostVacancy(): void {
    const fullAccess = localStorage.getItem('fullAccess')
    const userId = localStorage.getItem('userId')
    if (fullAccess == 'b326b5062b2f0e69046810717534cb09') {
      this.formSettingService.isheading = false;
      this.formSettingService.typeForm = 'вакансии';
      this.settingHeaderService.post = false;
      this.settingHeaderService.shared = false;
      this.router.navigate([`/myaccount/${userId}/newVacancy`]);
    } else {
      this.popUpErrorCreateService.visible = true;
    }
  }


  background: string = '';



  private applyTheme(theme: string) {
    if (theme === 'dark') {
      this.background = '#3a3a3a';
    } else {
      this.background = '#e0e0e0';
    }
  }


}
