import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface tag {
  id: number;
  name: string;
  nameEng: string;
  competenceLevel: number|null;
  type: string;
  color: string|null;
}

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule,]
})
export class TagFormComponent implements OnInit {
  @Input() tagData: tag | null = null;
  @Input() Service: any;
  @Input() Type: string = '';
  tagForm!: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      nameEng: [''],
      competenceLevel: [null],
      type: [''],
      color: [null]
    });
    console.log('tagData:', this.tagData);
    if (this.tagData) {
      this.tagForm.patchValue(this.tagData);
    }
  }

  onSubmit() {
    if (this.tagForm.valid) {
      const formValue = this.tagForm.value;

      const tagToSubmit: tag = {
        id: this.tagData ? this.tagData.id : 0,
        name: formValue.name,
        nameEng: formValue.nameEng,
        competenceLevel: null,
        type: this.Service.type,
        color: null
      };


      if (this.tagData) {
        console.log('Form Submitted', tagToSubmit);
        this.Service.putFunction(JSON.stringify(tagToSubmit), this.tagData.id).subscribe(
          (response: tag[]) => {
            this.Service.visibleForm = false;
            this.messageService.add({ severity: 'success', summary: 'Подтверждено', detail: 'успешно обновлены данные', life: 2000 });
            this.Service.getdataStatusses();
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при обновлении', life: 2000 });
          }
        );
      } else {
        this.Service.addFunction(JSON.stringify(tagToSubmit)).subscribe(
          (response: tag[]) => {
            this.Service.visibleForm = false;
            this.Service.getdataStatusses();
            this.messageService.add({ severity: 'success', summary: 'Подтверждено', detail: 'успешно создано', life: 2000 });
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при создании', life: 2000 });
          }
        );
      }
    }
  }
}
