import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Tag {
  id: number;
  name: string;
  nameEng: string;
  competenceLevel: null;
  type: string;
}

@Component({
  selector: 'app-tag-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagSelectorComponent),
      multi: true
    }
  ]
})
export class TagSelectorComponent implements ControlValueAccessor, OnChanges {

  @Input() tags: Tag[] = [];
  @Input() maxTags: number = 3;
  @Input() placeholderValue: string = '';
  @Input() type: string = 'skills';
  @Output() tagsChanged = new EventEmitter<Tag[]>();

  private onChange: (value: Tag[]) => void = () => { };
  private onTouched: () => void = () => { };
  
  showTagBlock = false;
  selectedTags: Tag[] = [];
  searchQuery: string = '';
  filteredTags: Tag[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tags']) {
      this.updateFilteredTags();
    }
  }

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
      if (show) {
        this.updateFilteredTags();
      }
    }, 200);
  }

  selectTag(tag: Tag) {
    if (!this.selectedTags.includes(tag) && this.selectedTags.length < this.maxTags) {
      this.selectedTags.push(tag);
      this.onChange(this.selectedTags);
      this.tagsChanged.emit(this.selectedTags);
      
      this.tags = this.tags.filter(t => t.id !== tag.id);
      this.searchQuery = '';
      this.updateFilteredTags();
    }
  }


  deleteTag(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
      this.onChange(this.selectedTags);

      this.tags.push(tag);

      this.updateFilteredTags();
    }
  }
  

  writeValue(value: Tag[]): void {
    if (value && Array.isArray(value)) {
      this.selectedTags = value;
    } else {
      this.selectedTags = [];
    }
    this.updateFilteredTags();
  }

  registerOnChange(fn: (value: Tag[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  filterTags() {
    this.updateFilteredTags()
  }

  isEnglish(text: string): boolean {
    const englishRegex = /^[A-Za-z\s]+$/;
    return englishRegex.test(text);
  }

  languagesEng: boolean = false;

  private updateFilteredTags() {
    if (this.type == 'profession') {
      if (this.isEnglish(this.searchQuery)) {
        this.languagesEng = true;
        this.filteredTags = this.tags
          .filter(tag => tag.nameEng.toLowerCase().includes(this.searchQuery.toLowerCase()))
          .sort((a, b) => a.nameEng.localeCompare(b.nameEng));
      } else {
        this.languagesEng = false;
        this.filteredTags = this.tags
          .filter(tag => tag.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name));
      }
    } else {
      this.languagesEng = false;
      this.filteredTags = this.tags
        .filter(tag => tag.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
