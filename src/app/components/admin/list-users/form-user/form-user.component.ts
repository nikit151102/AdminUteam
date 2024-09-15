import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PersonalDataService } from '../../../personal-account/personal-data/personal-data.service';
import { Router } from '@angular/router';
import { ListUsersService } from '../list-users.service';
import { RadioButtonModule } from 'primeng/radiobutton';

export interface District {
  id: number;
  name: string | null;
}

export interface Region {
  id: number;
  name: string | null;
  district: District | null;
}

export interface CityOfResidence {
  id: number;
  name: string | null;
  region: Region | null;
}

export interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  gender: 'MALE' | 'FEMALE'; 
  age: number | null;
  freeLink: string | null;
  ownLink: string | null;
  aboutMe: string | null;
  email: string | null;
  telegram: string | null;
  dateOfRegistration: string | null; 
  cityOfResidence: CityOfResidence;
  imageLink: string | null; 
  nickname: string | null;
  role: 'ROOT' | 'USER' | 'ADMIN'; 
}

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DropdownModule, DialogModule, AutoCompleteModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})

export class FormUserComponent implements OnInit {
  @Input() user: any;
  @Input() editData: any;
    personalDataForm: FormGroup;
    cities: any;
    filteredCities: any;
    dataCurrentUser!: User;
    cityOfResidence!: CityOfResidence;
  
    constructor(private fb: FormBuilder, private personalDataService: PersonalDataService,  private router: Router, private listUsersService: ListUsersService) {
      this.personalDataForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
        city: ['', Validators.required],
        freeLink: [''],
        aboutMe: ['',[Validators.maxLength(250)]],
        email: ['', [Validators.required, Validators.email]],
        telegram: [''],
        domain: [''],
        approval: [false, Validators.requiredTrue]
      });
    }
    
    ngOnInit(): void {
      this.personalDataService.getCities().subscribe(
        (data: any) => {
          this.cities = data;
        },
        (error: any) => {
          console.error('Ошибка при загрузке тегов:', error);
        }
      );
      this.userData();
    }
  
    userData() {
      this.personalDataService.getCurrentUser().subscribe(
        (user: User) => {
          this.dataCurrentUser = user;
          this.cityOfResidence = user.cityOfResidence || {}; 
    
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
            domain: '',  
            approval: false  
          });
        },
        (error: any) => {
          console.error('Ошибка при загрузке данных пользователя:', error);
        }
      );
    }
    closePopUp() {
      this.listUsersService.visibleForm = false;
    
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
        imageLink: null,
        nickname: formValues.domain,
        role: this.dataCurrentUser.role,  
      };
  
      this.personalDataService.updateUser(user).subscribe(
        (response: any) => {
          console.log('Данные успешно отправлены', response);
          this.userData();
          const userId = localStorage.getItem('userId')
          this.router.navigate([`/myaccount/${userId}/home`]);
        },
        (error: any) => {
          console.error('Ошибка при отправке данных:', error);
        }
      );
    }
  }
  