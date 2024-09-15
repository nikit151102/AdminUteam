import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MotivationsComponent } from '../form-components/motivations/motivations.component';
import { TagSelectorComponent } from '../form-components/tag-selector/tag-selector.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSettingService } from './form-setting.service';
import { TagSelectedLevelComponent } from '../form-components/tag-selected-level/tag-selected-level.component';
import { SettingHeaderService } from '../setting-header.service';
import {  forkJoin, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { SaveChangesPopupComponent } from './save-changes-popup/save-changes-popup.component';
import { SaveChangesPopupService } from './save-changes-popup/save-changes-popup.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagSelectorComponent,
    MotivationsComponent,
    RadioButtonModule,
    TagSelectedLevelComponent,
    SaveChangesPopupComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
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
export class FormComponent implements OnInit {
  @ViewChild(MotivationsComponent) motivationsComponent!: MotivationsComponent;
  @ViewChild(TagSelectedLevelComponent) tagSelectedLevelComponent!: TagSelectedLevelComponent;

  form!: FormGroup;
  selectedTags: {
    id: number;
    name: string;
    color: string | null;
    competenceLevel: string | null;
    nameEng: string | null;
    type: string;
  }[] = [];

  motivations: any[] = [];
  professions: any[] = [];
  skills: any[] = [];
  typeForm: string = '';
  isEditMode: boolean = false;
  visible: boolean = false;
  activeLink: string = 'Сначала новые';
  isPayment: boolean = false;
  
  private readonly FORM_STORAGE_KEY = 'formData';

  constructor(
    public formSettingService: FormSettingService,
    private settingHeaderService: SettingHeaderService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public saveChangesPopupService: SaveChangesPopupService
  ) { }
  private routerEventsSubscription!: Subscription;
  ngOnInit(): void {
    this.initializeForm();
    this.route.data.subscribe(data => {
      const routeName = data['routeName'];
      this.isEditMode = routeName.includes('update');
      this.typeForm = routeName.includes('Resume') ? 'резюме' : 'вакансии';

      if (this.isEditMode) {
        this.initializeForm();
        this.loadExistingData();
      } else {
        this.initializeForm();
        this.loadFormDataFromStorage();
      }
    });

    if (this.typeForm == 'вакансии') {
      this.formSettingService.isheading = true;
      this.isPayment = true;
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
      }
    });

    this.settingHeaderService.backbtn = true;

    this.routerEventsSubscription = this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart)
    )
    .subscribe((event: any) => {
      this.saveFormDataToStorage();
    });
  }

  onPaymentAmountChange(paymentAmount: number) {
    console.log('Payment changed:', paymentAmount);
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
    const savedData = localStorage.getItem(this.FORM_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log("parsedData,", parsedData)
      if (parsedData.type === this.typeForm) {

        const formData = parsedData.formData;
        this.form.patchValue({
          ...formData,
          profession: [formData.profession]
        });

        this.saveChangesPopupService.showPopup();
      }
    }
  }

  loadExistingData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const typeEndpoint = this.typeForm === 'резюме' ? ['resumes', id] : ['vacancies', id];
      this.formSettingService.getDataById(typeEndpoint[0], typeEndpoint[1]).subscribe((data: any) => {

        this.form.patchValue({
          ...data,
          profession: [data.profession]
        });

      });
    }
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

  onMotivationsChanged(tags: {
    id: number;
    name: string;
    color: string | null;
    competenceLevel: string | null;
    nameEng: string | null;
    type: string;
  }[]): void {

    this.form.get('motivations')?.setValue(tags);
  }



  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
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
    formData.profession.competenceLevel = formData.profession.competenceLevel === 0 ? null : formData.profession.competenceLevel;
    formData.skills.forEach((skill: any) => {
      skill.competenceLevel = skill.competenceLevel === 0 ? null : skill.competenceLevel;
    });

    const typeEndpoint = this.typeForm === 'резюме' ? 'resumes' : 'vacancies';
    console.log("typeEndpointtypeEndpoint",typeEndpoint)
    console.log("formDataformData",formData)
    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.formSettingService.putDataById(typeEndpoint, formData, id).subscribe(
          (response) => {
            this.handleSuccess(response, typeEndpoint)
          },
          (error: any) => {
            this.saveFormDataToStorage();
            if (error.status) {
              this.router.navigate(['/error', { num: error.status }]);
            } else {
              this.router.navigate(['/error', { num: 500 }]);
            }
          }
        );
      }
    } else {

      this.formSettingService.setData(typeEndpoint, formData).subscribe(
        (response) => {
          this.handleSuccess(response, typeEndpoint)
        },
        (error: any) => {
          this.saveFormDataToStorage();
          if (error.status) {
            this.router.navigate(['/error', { num: error.status }]);
          } else {
            this.router.navigate(['/error', { num: 500 }]);
          }
        }
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

  handleSuccess(response: any, typeEndpoint: string): void {
    console.log("response", response);

    localStorage.setItem('routeTypeCard', typeEndpoint);
    const userId = localStorage.getItem('userId')
    const route = typeEndpoint === 'resumes' ? [`/resume`, response.id] : [`/vacancy`, response.id];
    this.router.navigate(route);

    this.motivationsComponent.reset();
    this.tagSelectedLevelComponent.reset();

    this.form.reset({
      title: '',
      profession: [],
      skills: [],
      motivations: [],
      gender: '',
      details: ''
    });


  }

  saveFormDataToStorage(): void {
    const formData = this.prepareFormData();
    localStorage.setItem(this.FORM_STORAGE_KEY, JSON.stringify({ formData, type: this.typeForm }));
  }


  deleteCard() {
    const id = this.route.snapshot.paramMap.get('id');
    const typeEndpoint = this.typeForm === 'резюме' ? ['resumes', id] : ['vacancies', id];
    if (typeEndpoint[0]) {
      this.formSettingService.deleteData(typeEndpoint[0], typeEndpoint[1]).subscribe((data: any) => {
        const userId = localStorage.getItem('userId')
        this.router.navigate([`/myaccount/${userId}`]);
      })
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: any): void {
    this.saveFormDataToStorage();
  }
}
