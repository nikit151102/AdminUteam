import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AdminsListService } from '../../services/admins-list.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, RadioButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  visibleForm: boolean = false;
  personalDataForm!: FormGroup;

  constructor(private fb: FormBuilder, public adminsListService:AdminsListService) { }

  ngOnInit(): void {
    this.personalDataForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      gender: ['', Validators.required],
      age: [1],
      freeLink: [''],
      ownLink: [''],
      aboutMe: [''],
      cityOfResidence: [null],
      nickname: [''],
      telegram: [''],
      email: ['', [Validators.required, Validators.email]],
      imageLink: [''],
      banned: [false]
    });
  }

  get email() {
    return this.personalDataForm.get('email');
  }

  get telegram() {
    return this.personalDataForm.get('telegram');
  }

  get gender() {
    return this.personalDataForm.get('gender');
  }

  addUser() {
    this.visibleForm = true;
  }

  onSubmit(): void {
    if (this.personalDataForm.valid) {

      const formValue = this.personalDataForm.value;

      const fullFormValue = {
        firstName: formValue.firstName || '',
        lastName: formValue.lastName || '',
        gender: formValue.gender || 'MALE',
        age: formValue.age || 1,
        freeLink: formValue.freeLink || '',
        ownLink: formValue.ownLink || '',
        aboutMe: formValue.aboutMe || '',
        cityOfResidence: formValue.cityOfResidence || null,
        nickname: formValue.nickname || '',
        telegram: `$${formValue.telegram}` || '',
        email: formValue.email || '',
        imageLink: formValue.imageLink || '',
        banned: formValue.banned || false
      };
      this.adminsListService.addUser(fullFormValue)
      this.resetForm()
    } else {
    }
  }

  resetForm(): void {
    this.personalDataForm.reset({
      email: '',
      telegram: '',
      gender: ''
    });
    this.visibleForm = false;
  }
}