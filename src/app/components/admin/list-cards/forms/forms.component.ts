import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MotivationsComponent } from '../../../form-components/motivations/motivations.component';
import { TagSelectedLevelComponent } from '../../../form-components/tag-selected-level/tag-selected-level.component';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FormSettingService } from '../../../form/form-setting.service';
import { SaveChangesPopupService } from '../../../form/save-changes-popup/save-changes-popup.service';
import { SettingHeaderService } from '../../../setting-header.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ListCardsService } from '../list-cards.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MotivationsComponent, TagSelectedLevelComponent, DialogModule, ButtonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {
  @ViewChild(MotivationsComponent) motivationsComponent!: MotivationsComponent;
  @ViewChild(TagSelectedLevelComponent) tagSelectedLevelComponent!: TagSelectedLevelComponent;
  @Input() editData: any;
  form!: FormGroup;
  @Input() Service: any;
  selectedTags: { id: number, name: string, color: string }[] = [];
  motivations: any[] = [];
  professions: any[] = [];
  skills: any[] = [];
  typeForm: string = '';
  isEditMode: boolean = false;
  @Input() visible: boolean = false;
  activeLink: string = 'Сначала новые';

  private readonly FORM_STORAGE_KEY = 'formData';

  constructor(
    public formSettingService: FormSettingService,
    private settingHeaderService: SettingHeaderService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private listCardsService: ListCardsService,
    public saveChangesPopupService: SaveChangesPopupService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    if (this.editData) {
      console.log("this.editData", this.editData)
      this.loadFormDataFromStorage();
    } else {
      console.log("this.editData", this.editData)
    }


    forkJoin({
      motivations: this.formSettingService.getTags('MOTIVATION'),
      professions: this.formSettingService.getTags('PROFESSION'),
      skills: this.formSettingService.getTags('SKILL')
    }).subscribe({
      next: (results) => {
        this.motivations = results.motivations;
        this.professions = results.professions;
        this.skills = results.skills;
        this.form.get('motivations')?.setValue(
          this.motivations.filter(tag => this.selectedTags.some(st => st.name === tag.name))
        );
      },
      error: (error) => console.error('Ошибка при загрузке тегов:', error)
    });

    this.settingHeaderService.backbtn = true;
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: ['', [this.optionalValidator, Validators.maxLength(100)]],
      profession: [null, Validators.required],
      skills: [[], Validators.required],
      motivations: [this.selectedTags, Validators.required],
      gender: [''],
      details: ['', [Validators.required, Validators.maxLength(700)]]
    });

    this.form.get('motivations')?.valueChanges.subscribe(tags => {
      this.selectedTags = tags;
    });
  }

  loadFormDataFromStorage(): void {
    if (this.editData) {
      const formData = this.editData;
      this.form.patchValue(formData);
      this.form.get('skills')?.setValue(formData.skills);
      this.form.get('profession')?.setValue([formData.profession]);
      this.form.get('motivations')?.setValue(formData.motivations);


    }
  }

  closePopUp() {
    this.listCardsService.visibleForm = false;
  
  }

  clearDraft(): void {
    localStorage.removeItem(this.FORM_STORAGE_KEY);
    this.form.reset({
      title: '',
      profession: [],
      skills: [],
      motivations: [],
      gender: '',
      details: ''
    });
    this.motivationsComponent.reset();
    this.tagSelectedLevelComponent.reset();
    this.saveChangesPopupService.hidePopup();
  }

  optionalValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value ? Validators.required(control) : null;
  }

  onMotivationsChanged(tags: {  id: number; 
    name: string; 
    color: string | null; 
    competenceLevel: string | null; 
    nameEng: string | null; 
    type: string;  }[]): void {
    this.form.get('motivations')?.setValue(tags);
  }

  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = '46px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  setActive(link: string): void {
    this.activeLink = link;
  }

  isActive(link: string): boolean {
    return this.activeLink === link;
  }

  onTagsChanged(tags: { id: number; name: string; competenceLevel: number | null; type: string, color: string | null }[], formElement: string): void {
    this.form.get(formElement)?.setValue(tags);
  }

  submit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(control => {
        const formControl = this.form.get(control);
        if (formControl && formControl.invalid) {
          formControl.markAsTouched();
        }
      });

      console.error('Поля с ошибками:');
      Object.keys(this.form.controls).forEach(control => {
        const formControl = this.form.get(control);
        if (formControl && formControl.invalid) {
          console.error(`Поле "${control}" не прошло валидацию.`);
        }
      });

      return;
    }

    const formData = this.prepareFormData();

    const typeEndpoint = this.typeForm === 'резюме' ? 'resumes' : 'vacancies';

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.Service.putFunction(formData, id).subscribe(
          (response: any) => {
            this.handleSuccess(response)

          },
          (error: any) => console.error('Ошибка при изменении данных:', error)
        );
      }
    } else {
      this.Service.setData(typeEndpoint, formData).subscribe(
        (response: any) => {
          this.handleSuccess(response)
        },
        (error: any) => console.error('Ошибка при отправке данных:', error)
      );

    }
  }

  prepareFormData(): any {
    const formData = { ...this.form.value };

    const getOriginalTag = (name: string) => this.motivations.find(tag => tag.name === name);
    const transformTags = (array: any[], type: string) => array.map(tag => ({
      ...tag,
      type: type,
      color: tag.color || null,
    }));

    formData.motivations = transformTags(
      formData.motivations.map((tag: any) => getOriginalTag(tag.name) || tag),
      'MOTIVATION'
    );

    formData.skills = transformTags(
      formData.skills.map((tag: any) => getOriginalTag(tag.name) || tag),
      'SKILL'
    );

    formData.profession = {
      ...formData.profession[0],
      competenceLevel: formData.profession[0].competenceLevel || null,
      type: 'PROFESSION'
    };


    formData.visibility = "CREATOR_ONLY";
    formData.freeLink = formData.freeLink || "string";
    formData.ownLink = formData.ownLink || "string";
    formData.contacts = formData.contacts || "string";
    formData.details = formData.details || "string";
    formData.title = formData.title || "string";

    delete formData.gender;
    return formData
  }

  handleSuccess(response: any): void {
    console.log("response", response);

    const userId = localStorage.getItem('userId')

    this.form.reset({
      title: '',
      profession: [],
      skills: [],
      motivations: [],
      gender: '',
      details: ''
    });

    this.motivationsComponent.reset();
    this.tagSelectedLevelComponent.reset();
  }


}
