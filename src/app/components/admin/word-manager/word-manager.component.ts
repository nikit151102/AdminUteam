import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-word-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './word-manager.component.html',
  styleUrl: './word-manager.component.css'
})
export class WordManagerComponent {
  data: any = null; 
  filteredData: any = null; 
  newWord: string = ''; 
  searchQuery: string = ''; 

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          this.data = JSON.parse(reader.result as string);
          this.filteredData = JSON.parse(reader.result as string);
        } catch (error) {
          alert('Ошибка при загрузке файла. Убедитесь, что это валидный JSON.');
        }
      };
      reader.readAsText(file);
    }
  }

  addWord(): void {
    if (this.newWord.trim()) {
      const firstLetter = this.newWord.trim()[0].toLowerCase();
      const targetGroup = this.data.find((item: any) => item.letter === firstLetter);

      if (targetGroup) {
        targetGroup.words.push(this.newWord.trim());
        targetGroup.words.sort();
      } else {
        this.data.push({ letter: firstLetter, words: [this.newWord.trim()] });
        this.data.sort((a: any, b: any) => a.letter.localeCompare(b.letter)); // Сортируем группы по буквам
      }

      this.newWord = ''; 
      this.filterWords(); 
    } else {
      alert('Введите слово перед добавлением.');
    }
  }

  deleteWord(letter: string, wordIndex: number): void {
    const targetGroup = this.data.find((item: any) => item.letter === letter);
    if (targetGroup) {
      targetGroup.words.splice(wordIndex, 1);

      if (targetGroup.words.length === 0) {
        this.data = this.data.filter((item: any) => item.letter !== letter);
      }

      this.filterWords(); 
    }
  }

  filterWords(): void {
    const query = this.searchQuery.toLowerCase();
    if (!query) {
      this.filteredData = this.data;
      return;
    }

    this.filteredData = this.data
      .map((item: any) => ({
        ...item,
        words: item.words.filter((word: string) => word.toLowerCase().startsWith(query)),
      }))
      .filter((item: any) => item.words.length > 0);
  }

  downloadJSON(): void {
    const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}