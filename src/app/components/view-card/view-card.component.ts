import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCardService } from './view-card.service';
import { SettingHeaderService } from '../setting-header.service';
import { TokenService } from '../token.service';
import { DomainService } from '../domain.service';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ResumeComponent } from './resume/resume.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { ResumeService } from '../personal-account/services/resume.service';
import { PageErrorComponent } from '../page-error/page-error.component';
import { ErrorViewCardComponent } from './error-view-card/error-view-card.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-view-vacancy',
  standalone: true,
  imports: [CommonModule, SkeletonModule, VacancyComponent, ResumeComponent, SkeletonModule, PageErrorComponent, ErrorViewCardComponent],
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css'],
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
export class ViewCardComponent implements OnInit {

  imagePath: string = '';
  domainName: string = '';
  visibleCard: boolean = false;
  visibleError: boolean = false;
  dataCard: any;
  typeCard: any;
  currentUser: any;
  numberError!: number;
  routeName: string = '';

  constructor(
    public viewCardService: ViewCardService,
    private settingHeaderService: SettingHeaderService,
    private router: Router,
    public tokenService: TokenService,
    private domainService: DomainService,
    private popUpEntryService: PopUpEntryService,
    private route: ActivatedRoute,
    private resumeService: ResumeService,
  ) {
    this.visibleError = true;
  }



  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.routeName = data['routeName'];
      if(data['routeName'] == 'resume'){
        this.typeCard = 'resumes';

      }
      if(data['routeName'] == 'vacancy'){
        this.typeCard = 'vacancies';
      }
    });
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.viewCardService.getCardData(id, this.typeCard).subscribe(
        (data) => {
          this.dataCard = data;
          this.visibleCard = true;
          this.visibleError = false;
          this.domainName = this.domainService.setDomain(this.dataCard.user.freeLink);
          this.domainService.checkImageExists(this.domainName).then((path) => {
            this.imagePath = path;
          });
          this.viewCardService.getCurrentUser().subscribe(user => {
            this.currentUser = user;
            console.log("user", user)
          });
        },
        (error) => {
          if (error.status == 404) {
            this.visibleCard = false;
            this.visibleError = false;
            this.settingHeaderService.isheader = false;
            this.settingHeaderService.isFooter = false;
            this.numberError = error.status;
          } else {
            this.visibleCard = false;
            this.visibleError = true;
            this.numberError = error.status;
            this.router.navigate(['/error', { num: error.status }]);
          }
          console.error('Ошибка при загрузке данных:', error);
        }
      );
    });
  }

  viewUser():string  {
    return this.router.createUrlTree([`/user`, this.dataCard.user.id]).toString();
  }


  enter() {
    this.popUpEntryService.showDialog();
  }

  setArchive(event: Event) {
    event.stopPropagation();
    this.resumeService.toggleResumeArchive(this.dataCard);
    this.router.navigate([`/myaccount`, this.dataCard.user.id]);
  }

  update(event: Event, id: number) {
    event.stopPropagation();
    const userId = localStorage.getItem('userId')
    
    if( this.typeCard =='vacancies'){
      this.router.navigate([`/myaccount/${userId}/updateVacancy/${id}`]);
    }else{
      this.router.navigate([`/myaccount/${userId}/updateResume/${id}`]);
    }
   
  }

}
