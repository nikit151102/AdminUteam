import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ExcelReaderComponent } from '../excel-reader/excel-reader.component';
import { TagFormComponent } from '../tag-form/tag-form.component';

interface tag {
  id: number;
  name: string;
  nameEng: string;
  competenceLevel: number;
  type: string;
  color: string;
}


@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgIf, TableModule, ToastModule, FormsModule, TagFormComponent, ReactiveFormsModule, ButtonModule, InputTextModule, OrderListModule, OverlayPanelModule, DropdownModule, ExcelReaderComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  @Input() Service: any;
  @Input() Title: string = '';
  @Input() IsDropList: boolean = false;

  clonedProducts: { [s: string]: tag } = {};
  newStatus: string = '';
  selectedStage: any;
  editTag!: tag | null;
  visibleForm: boolean = false;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.Service.getdataStatusses()
  }

  addTag() {
    this.editTag = null;
    this.visibleForm = true;
    this.Service.visibleForm = true;
  }
resetForm(){
  this.editTag = null;
  this.visibleForm = false;
  this.Service.visibleForm = false;
}



  onRowEditInit(product: tag) {
    this.editTag = product;
    this.Service.visibleForm = true;
  }

  onRowEditSave(product: tag) {
    if (product.name && product.name != '') {
   
      this.Service.putFunction(product['id'], product['name']).subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Подтверждено', detail: 'Статус заявки изменен', life: 2000 });
      
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при изменении статуса заявки', life: 2000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Пожалуйста, проверьте введенные данные', life: 2000 });
    }
  }

  onRowEditCancel(product: tag, index: number) {
    delete this.clonedProducts[product.id as number];
    this.messageService.add({ severity: 'error', summary: 'Отклонено', detail: 'Действие отменено', life: 2000 });
  }

  createStatus() {
    if (this.newStatus && this.newStatus != '') {
      this.Service.addFunction(this.newStatus, this.selectedStage.id)
        .subscribe(
          (response: any) => {
            this.messageService.add({ severity: 'success', summary: 'Подтверждено', detail: 'Статус заявки добавлен', life: 2000 });
    
            this.newStatus = '';
          },
          (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при добавлении статуса', life: 2000 });
          }
        );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Пожалуйста, проверьте введенные данные', life: 2000 });
    }
  }

  onRowDelete(status: tag) {
    this.Service.deleteFunction(status['id'])
      .subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Подтверждено', detail: 'Статус заявки успешно удален', life: 2000 });
          this.Service.getdataStatusses();
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при удалении статуса', life: 2000 });
        }
      );
  }

}
