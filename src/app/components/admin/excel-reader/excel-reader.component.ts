import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-excel-reader',
  standalone: true,
  imports: [CommonModule, FileUploadModule,DialogModule, ButtonModule, FormsModule],
  templateUrl: './excel-reader.component.html',
  styleUrls: ['./excel-reader.component.css']
})
export class ExcelReaderComponent {
  data: any[] = [];
  fileUploaded: boolean = false;
  showPopup: boolean = false;
  @Input() typeTags: string = '';
  @Input() nameFile: string = '';
  @Input() Service: any;

  batchSize: number = 0;

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
    const totalData = this.data.length;

    if (this.batchSize > 0 && this.batchSize < totalData) {

      for (let i = 0; i < totalData; i += this.batchSize) {
        const chunk = this.data.slice(i, i + this.batchSize);
        this.sendChunk(chunk);
      }
    } else {

      this.sendChunk(this.data);
    }

    this.data = [];
    this.batchSize = 0;
    this.fileUploaded = false;
    fileUpload.clear();
  }

  sendChunk(chunk: any[]) {
    const tagsToSubmit = chunk.map((name, index) => {
      return {
        id: 0,
        name: name,
        nameEng: null,
        competenceLevel: null,
        type: this.typeTags,
        color: null
      };
    });
    this.Service.addsFunction(tagsToSubmit).subscribe({
      next: (response: any) => {
        console.log('Data sent successfully:', response);
        this.checkIfAllDataSent();
      },
      error: (error: any) => {
        console.error('Error sending data:', error);
      }
    });
    console.log('Отправка данных (пакет):', tagsToSubmit);
  }

  checkIfAllDataSent() {
    // После отправки всех данных покажи попап
    if (this.data.length === 0) {
      this.showPopup = true;  // Показываем попап
    }
  }

  downloadFile() {
    const fileUrl = `assets/${this.nameFile}.xlsx`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${this.nameFile}.xlsx`;
    link.click();
  }
}
