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
import { Router } from '@angular/router';
import { ListUsersService } from '../list-users.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PersonalDataService } from '../../../services/personal-data.service';

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
  imports: [CommonModule,
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

  constructor(private fb: FormBuilder, private personalDataService: PersonalDataService, private router: Router, private listUsersService: ListUsersService) {
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
      domain: [''],
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
    this.dataCurrentUser = this.editData;
    this.cityOfResidence = this.editData.cityOfResidence || {};

    this.personalDataForm.patchValue({
      name: this.editData.firstName || '',
      surname: this.editData.lastName || '',
      age: this.editData.age || '',
      gender: this.editData.gender || '',
      city: this.editData.cityOfResidence?.name || '',
      freeLink: this.editData.freeLink || '',
      aboutMe: this.editData.aboutMe || '',
      email: this.editData.email,
      telegram: this.editData.telegram,
      domain: this.editData.nickname,
      approval: this.editData
    });
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
      },
      (error: any) => {
        console.error('Ошибка при отправке данных:', error);
      }
    );
  }
}
