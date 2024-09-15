import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MotivationsService } from './motivations.service';

@Component({
  selector: 'app-motivations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './motivations.component.html',
  styleUrl: './motivations.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MotivationsComponent),
      multi: true
    }
  ]
})
export class MotivationsComponent implements OnInit {


  constructor(private motivationsService: MotivationsService) {
    // this.motivationsService.getTags().subscribe((data: any) => { 
    //   this.tagsList = data
    // })
  }
  // tagsList!: { id: number, name: string, color: string,competenceLevel: string|null, nameEng: string|null, type: string }[] ;
  ngOnInit(): void {

  }
  isPaymentInputVisible: boolean = false;
  @Input() isPayment: boolean = false;
  paymentAmount: number = 0;
  @Output() paymentChanged = new EventEmitter<number>();
  tagsList: { id: number, name: string, color: string | null, competenceLevel: string | null, nameEng: string | null, type: string }[] = [
    {
      "id": 1,
      "name": "Без оплаты",
      "nameEng": null,
      "competenceLevel": null,
      "type": "MOTIVATION",
      "color": null
    },
    {
      "id": 2,
      "name": "За оплату",
      "nameEng": null,
      "competenceLevel": null,
      "type": "MOTIVATION",
      "color": null
    },
    {
      "id": 3,
      "name": "За долю",
      "nameEng": null,
      "competenceLevel": null,
      "type": "MOTIVATION",
      "color": null
    },
    {
      "id": 4,
      "name": "Нужна практика",
      "nameEng": null,
      "competenceLevel": null,
      "type": "MOTIVATION",
      "color": null
    }
  ]


  selectedTags: { id: number, name: string, color: string | null, competenceLevel: string | null, nameEng: string | null, type: string }[] = [];

  getSkillsColor(item: string): string {
    switch (item) {
      case 'Без оплаты':
        return '#FFAB00';
      case 'Нужна практика':
        return '#CF87F1';
      case 'За долю':
        return '#298CF4';
      case 'За оплату':
        return '#23B9B0';
      default:
        return '';
    }
  }

  @Output() tagsChanged = new EventEmitter<{
    id: number, name: string, color: string | null, competenceLevel: string | null, nameEng: string | null, type: string
  }[]>();

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  selectTag(tag: { id: number, name: string, color: string | null, competenceLevel: string | null, nameEng: string | null, type: string }) {
    this.tagsList = this.tagsList.filter(t => t.name !== tag.name);
    this.selectedTags.push(tag);
    this.onChange(this.selectedTags);
    this.tagsChanged.emit(this.selectedTags);

    if (tag.name === 'За оплату') {
      this.isPaymentInputVisible = true;
    }
  }

  deleteTag(tag: { id: number, name: string, color: string | null, competenceLevel: string | null, nameEng: string | null, type: string }) {
    this.selectedTags = this.selectedTags.filter(t => t.name !== tag.name);
    this.tagsList.push(tag);
    this.onChange(this.selectedTags);
    this.tagsChanged.emit(this.selectedTags);

    if (tag.name === 'За оплату') {
      this.isPaymentInputVisible = false;
    }
  }
  reset() {
    this.tagsList.push(...this.selectedTags);
    console.log(" this.tagsList", this.tagsList)
    this.selectedTags = [];
    this.tagsChanged.emit(this.selectedTags);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: { id: number, name: string, color: string | null, competenceLevel: string | null, nameEng: string | null, type: string }[]): void {

    if (value && Array.isArray(value)) {
      this.selectedTags = value;
      this.updateAvailableTags();
      if (value.some(tag => tag.name === 'За оплату')) {
        this.isPaymentInputVisible = true;
      }
    } else {
      this.selectedTags = [];
      this.updateAvailableTags();
    }
  }

  private updateAvailableTags() {
    this.tagsList = this.tagsList.filter(tag => !this.selectedTags.some(selectedTag => selectedTag.name === tag.name));
  }

  onPaymentAmountChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value, 10);

    if (!isNaN(newValue)) {
      this.paymentAmount = newValue;
      this.paymentChanged.emit(this.paymentAmount);  
    }
  }
}
