import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-excel-reader',
  standalone: true,
  imports: [CommonModule, FileUploadModule, ButtonModule],
  templateUrl: './excel-reader.component.html',
  styleUrl: './excel-reader.component.css'
})
export class ExcelReaderComponent {
  data: any[] = [];
  fileUploaded: boolean = false;

  @Input() nameFile:string = '';

  constructor() { }

  onFileChange(event: any) {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const reader: FileReader = new FileReader();
      
      reader.onload = (e: any) => {
        const binaryStr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        this.processData(data);
      };

      reader.readAsBinaryString(file);
    } else {
      console.error('No file selected or the files property is undefined');
    }
  }

  processData(data: any[]) {
    this.data = data.slice(1).map(row => row[0]);
    console.log(this.data);
    this.fileUploaded = true;
  }

  sendData(fileUpload: FileUpload) {
    console.log('Отправка данных:', this.data);

    // Очистка состояния
    this.data = [];
    this.fileUploaded = false;

    // Очистка загруженного файла
    fileUpload.clear();
  }


  downloadFile() {
    // Путь к файлу в папке assets
    const fileUrl = `assets/${this.nameFile}.xlsx`
    
    // Создание временной ссылки
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${this.nameFile}.xlsx`;  // Имя файла, как он будет сохраняться
    
    // Имитация клика на ссылку для начала загрузки
    link.click();
  }
}