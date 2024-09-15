import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalDataService } from './personal-data.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CityOfResidence, User } from './user-interface';
import { Router } from '@angular/router';
import { PopUpAvatarComponent } from '../../pop-up-avatar/pop-up-avatar.component';
import { PopUpAvatarService } from '../../pop-up-avatar/pop-up-avatar.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { AvatarSelectionService } from '../../pop-up-avatar/avatar-selection.service';
import { forbiddenWordsValidator } from './errorNameList';
import { SettingHeaderService } from '../../setting-header.service';
import { MenuNavService } from '../../menu-nav/menu-nav.service';

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [RadioButtonModule, CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, PopUpAvatarComponent],
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
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
export class PersonalDataComponent implements OnInit {
  personalDataForm: FormGroup;
  cities: any;
  filteredCities: any;
  dataCurrentUser!: User;
  cityOfResidence!: CityOfResidence;
  isPopupVisible: boolean = false;
  setAvatar: string | null = '';
  setGender: string | null = '';
  setTypeAvatar: string | null = '';
  isDisabled = false;


  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private personalDataService: PersonalDataService, 
    private router: Router, public popUpAvatarService: PopUpAvatarService, 
    private avatarSelectionService: AvatarSelectionService, private settingHeaderService: SettingHeaderService, public menuNavService:MenuNavService) {
    this.personalDataForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      freeLink: [''],
      aboutMe: ['', [Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email]],
      telegram: [''],
      domain: ['', [forbiddenWordsValidator()]],
    });
  }

  ngOnInit(): void {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.post = true;
    this.settingHeaderService.backbtn = true;
    this.avatarSelectionService.selectedAvatar$.subscribe(selectedAvatar => {
      this.setAvatar = selectedAvatar
    });

    this.avatarSelectionService.selectedTypeAvatar$.subscribe(selectedTypeAvatar => {
      this.setTypeAvatar = selectedTypeAvatar
      this.personalDataForm.get('gender')?.setValue(this.setTypeAvatar?.toUpperCase());
    });

    this.subscription.add(
      this.popUpAvatarService.visible$.subscribe(visible => {
        this.isPopupVisible = visible;
      })
    );
    this.personalDataService.getCities().subscribe(
      (data) => {
        this.cities = data;
      },
      (error) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    );
    this.userData();
    this.personalDataForm.get('gender')?.valueChanges.subscribe(value => {
      this.setGender = value;
    });
    this.toggleDisable()
  }

  getAvatar() {
    this.popUpAvatarService.showPopup();
  }

  toggleDisable() {
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled) {
      this.personalDataForm.get('domain')?.disable();
    } else {
      this.personalDataForm.get('domain')?.enable();
    }
  }


  userData() {
    this.personalDataService.getCurrentUser().subscribe(
      (user: User) => {
        if(user.imageLink){
          this.menuNavService.setStorageValue(user.imageLink);
        }
        this.dataCurrentUser = user;
        this.cityOfResidence = user.cityOfResidence || {};
        this.setAvatar = user.imageLink;
        this.personalDataForm.patchValue({
          name: user.firstName || '',
          surname: user.lastName || '',
          age: user.age || '',
          gender: user.gender || '',
          city: user.cityOfResidence?.name || '',
          freeLink: user.freeLink || '',
          aboutMe: user.aboutMe || '',
          email: user.email,
          telegram: user.telegram,
          domain: user.nickname && user.nickname !== 'string' ? user.nickname : String(user.id),
        });

        this.setGender = user.gender;
      },
      (error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
      }
    );
  }

  filterCities(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.cities as any[]).length; i++) {
      let country = (this.cities as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCities = filtered;
  }

  onCitySelect(event: any) {
    this.cityOfResidence = event.value;
    this.personalDataForm.get('city')?.setValue(this.cityOfResidence.name);
  }

  onSubmit(): void {

    if (this.personalDataForm.invalid) {
      console.log("submit-invalid")
      this.personalDataForm.markAllAsTouched();
      return;
    }

    const formValues = this.personalDataForm.value;

    const user: User = {
      id: 0,
      firstName: formValues.name,
      lastName: formValues.surname,
      gender: formValues.gender.toUpperCase(),
      age: formValues.age,
      freeLink: formValues.freeLink,
      ownLink: '',
      aboutMe: formValues.aboutMe,
      telegram: formValues.telegram,
      email: formValues.email,
      dateOfRegistration: new Date().toISOString(),
      cityOfResidence: this.cityOfResidence,
      imageLink: this.setAvatar,
      nickname: formValues.domain,
      role: this.dataCurrentUser.role,
    };
      
    this.personalDataService.updateUser(user).subscribe(
      response => {
        console.log('Данные успешно отправлены', response);
        this.userData();
        localStorage.setItem('userId', formValues.domain);
        const userId = localStorage.getItem('userId')

        localStorage.setItem('fullAccess', 'b326b5062b2f0e69046810717534cb09' );
        this.router.navigate([`/myaccount/${userId}/home`]);
      },
      error => {
        console.error('Ошибка при отправке данных:', error);
      }
    );
  }
}
