import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-excel-handler',
  standalone: true,
  imports: [CommonModule, ButtonModule, FileUploadModule, FormsModule],
  templateUrl: './app-excel-handler.component.html',
  styleUrl: './app-excel-handler.component.css'
})
export class AppExcelHandlerComponent {

  fileUploaded = false;
  data: any[] = [];
  sheetNames: string[] = [];
  columns: string[] = [];
  selectedSheet!: string;
  selectedColumn!: string;
  sortOrder: 'asc' | 'desc' = 'asc'; // Порядок сортировки
  filterValue: string = ''; // Значение фильтрации

  workbook: any;  // Store the workbook globally in the component

  onFileChange(event: any) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
  
      // Store the workbook when the file is uploaded
      this.workbook = XLSX.read(binaryStr, { type: 'binary' });
  
      // Get the names of the sheets
      this.sheetNames = this.workbook.SheetNames;
      this.fileUploaded = true;  // Indicate that the file has been uploaded
    };
    reader.readAsBinaryString(file);
  }

  clearFile() {
    // Сброс состояния файла и данных
    this.fileUploaded = false;
    this.data = [];
    this.sheetNames = [];
    this.columns = [];
    this.selectedSheet = '';
    this.selectedColumn = '';
    this.workbook = null; // Сбросить рабочую книгу
  }

  loadSheetData() {
    if (!this.workbook || !this.selectedSheet) {
      console.error('No workbook or sheet selected');
      return;
    }
  
    // Get the worksheet from the stored workbook using the selected sheet name
    const worksheet = this.workbook.Sheets[this.selectedSheet];
  
    if (!worksheet) {
      console.error('Worksheet not found');
      return;
    }
  
    // Convert the worksheet to JSON format
    this.data = XLSX.utils.sheet_to_json(worksheet);
  
    // Retrieve the column names if there is data
    if (this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    } else {
      console.error('Sheet has no data');
      this.columns = [];
    }
  }
  
  

  getSortButtonLabel(): string {
    return `Сортировать (${this.sortOrder === 'asc' ? 'по возрастанию' : 'по убыванию'})`;
  }
  


  removeDuplicates(column: string) {
    const uniqueData = Array.from(new Set(this.data.map(item => item[column])))
      .map(uniqueValue => this.data.find(item => item[column] === uniqueValue));
    this.data = uniqueData;
  }

  sortData(column: string) {
    if (!column) {
      console.error('No column selected for sorting');
      return;
    }
  
    this.data.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return 1; 
      if (valueB == null) return -1; 

      const comparison = valueA.toString().localeCompare(valueB.toString(), undefined, {
        numeric: true, 
        sensitivity: 'base'
      });
  
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
  
  

  findAndReplace() {
    const findValue = prompt('Введите значение для поиска:');
    const replaceValue = prompt('Введите значение для замены:');
    this.data = this.data.map(row => {
      if (row[this.selectedColumn] === findValue) {
        row[this.selectedColumn] = replaceValue;
      }
      return row;
    });
  }


  addRow() {
    const newRow: any = {};
    this.columns.forEach(col => {
      newRow[col] = prompt(`Введите значение для ${col}:`);
    });
    this.data.push(newRow);
  }

  exportData() {
    const ws = XLSX.utils.json_to_sheet(this.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.selectedSheet);
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), 'exported_data.xlsx');
  }

  s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

}