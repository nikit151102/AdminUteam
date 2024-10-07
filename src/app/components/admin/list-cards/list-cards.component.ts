import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsComponent } from './forms/forms.component';
import { ListCardsService } from './list-cards.service';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';

interface Type {
  name: string,
  code: string
}

@Component({
  selector: 'app-list-cards',
  standalone: true,
  imports: [CommonModule, MenuModule, OverlayPanelModule, InputTextareaModule, MultiSelectModule, TableModule, ButtonModule, ToastModule, FormsComponent, PaginatorModule, TagModule],
  templateUrl: './list-cards.component.html',
  styleUrl: './list-cards.component.css'
})
export class ListCardsComponent {
  products!: any[];
  @Input() Service!: any;
  expandedRows = {};
  rowsPerPage = 10;
  totalUsers = 0;
  sortOrder = 1;
  sortField = 'id';
  isModalVisible: boolean = false; // Для управления видимостью модального окна
  isBanned: boolean = false; // Флаг заблокирован/разблокирован
  banReason: string = '';
  isBanReasonInvalid: boolean = false;

  constructor(public listCardsService: ListCardsService, private router: Router) { }

  types!: Type[];

  selectedtypes!: Type[];

  ngOnInit() {
    this.Service.getFunction().subscribe(
      (response: any[]) => {
        this.products = response;
        this.Service.products = response;

        this.selectedtypes = [...this.types];

        this.filterProducts();
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );

    this.types = [
      { name: 'Активные', code: 'CREATOR_ONLY' },
      { name: 'Архив', code: 'EVERYBODY' },
      { name: 'Бан', code: 'BAN' }
    ];


  }


  filterProducts() {
    const selectedCodes = this.selectedtypes.map(type => type.code);
    this.products = this.Service.products.filter((product: any) => selectedCodes.includes(product.visibility));
  }




  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.selectCard = '';
    this.isModalVisible = false;
  }


  selectCard: any;

  setBanDialog(product: any) {
    this.selectCard = product;
    this.openModal()
  }

  banCard() {

    if (this.selectCard.visibility === "BAN") {
      this.selectCard.visibility = "CREATOR_ONLY";
    } else {
      if (this.banReason.trim() === '') {
        this.isBanReasonInvalid = true;
        return;
      } else {
        this.selectCard.visibility = "BAN";
        this.selectCard.banReason = this.banReason;
      }
    }

    this.Service.banCard(this.selectCard);
    this.isBanned = !this.isBanned;
    this.banReason = '';
    this.closeModal();
  }


  validateBanReason() {
    this.isBanReasonInvalid = this.banReason.trim() === '';
  }

  expandAll() {
    this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
  }

  collapseAll() {
    this.expandedRows = {};
  }


  onRowExpand(event: TableRowExpandEvent) {

  }

  onRowCollapse(event: TableRowCollapseEvent) {

  }

  viewCard(id: string) {
    if (this.Service.type === "RESUME") {
      localStorage.setItem('routeTypeCard', 'resumes');
      return this.router.createUrlTree([`/resume`, id]).toString(); // You might not need this if you're handling URL strings
    } else {
      localStorage.setItem('routeTypeCard', 'vacancies');
      return this.router.createUrlTree([`/vacancy`, id]).toString(); // You might not need this if you're handling URL strings
    }
  }

  openInNewTab(url: string) {
    window.open(url, '_blank');
  }

  deleteCard(id: string) {
    this.Service.deleteCard(id);
  }

  editBan(product: any) {
    if (product.visibility === "BAN") {
      product.visibility = "CREATOR_ONLY";
    } else {
      product.visibility = "BAN";
    }
    this.Service.updateCard(product);

  }


  getSkillsColor(item: number): string {
    switch (item) {
      case 1:
        return '#50B229';
      case 2:
        return '#FAD305';
      case 3:
        return '#EE5354';
      default:
        return '';
    }
  }

  getSkills(item: number): string {
    switch (item) {
      case 1:
        return 'Junior';
      case 2:
        return 'Middle';
      case 3:
        return 'Senior';
      default:
        return '';
    }
  }

  getSkillText(item: number): string {
    switch (item) {
      case 1:
        return 'Jun';
      case 2:
        return 'Mdl';
      case 3:
        return 'Snr';
      default:
        return '';
    }
  }

  editData: any;
  editCard(card: any) {
    this.editData = card;
    this.listCardsService.visibleForm = true;
  }

}