import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ReservedNicknameService } from '../services/reserved-nickname.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserved-nickname',
  standalone: true,
  imports: [CommonModule, OrderListModule, ButtonModule, OverlayPanelModule, FormsModule],
  templateUrl: './reserved-nickname.component.html',
  styleUrl: './reserved-nickname.component.css'
})
export class ReservedNicknameComponent implements OnInit {

  searchValue: string = '';
  newValue: string = '';

  constructor(public reservedNicknameService: ReservedNicknameService) { }

  ngOnInit(): void {

  }

  onSearchValueChange(value: string) {
    if (value.length > 0) {
      this.reservedNicknameService.getTags(value);
    } else {
      this.reservedNicknameService.products = [];
    }
  }

  onRowDelete(tag: any) {
    this.reservedNicknameService.deleteTag(tag)
    this.reservedNicknameService.products = [];
    this.searchValue = '';
  }

  onRowAdd() {
    if(this.newValue){
      this.reservedNicknameService.addTag(this.newValue)
      this.reservedNicknameService.products = [];
      this.newValue = '';
    }
  }
}
