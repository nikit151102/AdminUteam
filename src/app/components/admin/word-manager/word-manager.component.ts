import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { WordManagerService } from './word-manager.service';

@Component({
  selector: 'app-word-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule, ButtonModule],
  templateUrl: './word-manager.component.html',
  styleUrl: './word-manager.component.css'
})
export class WordManagerComponent {
  data: any = null;
  filteredData: any = null;
  newWord: string = '';
  searchQuery: string = '';

  constructor(private http: HttpClient, private wordManagerService: WordManagerService) { }

  ngOnInit(): void {
    this.loadFileFromBackend();
  }

  private loadFileFromBackend(): void {
    this.wordManagerService.getFile('output.json').subscribe({
      next: (fileBlob: Blob) => {
        const reader = new FileReader();

        // Read the file as text
        reader.onload = () => {
          try {
            const fileContent = reader.result as string;
            this.data = JSON.parse(fileContent); // Parse JSON
            this.filteredData = [...this.data]; // Clone data for filtering
            this.filteredData.sort((a: any, b: any) => a.letter.localeCompare(b.letter)); // Sort by 'letter'
          } catch (error) {
            console.error('Error processing file data:', error);
          }
        };

        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };

        reader.readAsText(fileBlob); // Start reading the file blob
      },
      error: (err) => {
        console.error('Error fetching file from backend:', err);
      }
    });
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

  uploadJSON(): void {
    if (!this.data) {
      alert('Нет данных для отправки.');
      return;
    }
  
    // Создаем JSON-файл из данных
    const jsonContent = JSON.stringify(this.data, null, 2);
    const file = new File([jsonContent], 'output.json', { type: 'application/json' });
  
    // Вызываем сервис для загрузки файла
    this.wordManagerService.overwriteFile(file).subscribe({
      next: (response) => {
        // alert('Данные успешно отправлены на сервер.');
        console.log('Ответ от сервера:', response);
      },
      error: (err) => {
        console.error('Ошибка при отправке данных:', err);
        alert('Ошибка при отправке данных.');
      }
    });
  }

  downloadFileFromBackend(): void {
    const filename = 'output.json'; 
  
    this.wordManagerService.getFile(filename).subscribe({
      next: (fileBlob: Blob) => {
        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Ошибка при загрузке файла:', err);
        alert('Не удалось скачать файл. Попробуйте позже.');
      }
    });
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
    a.download = 'output.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}