import { Component, EventEmitter, Output } from '@angular/core';
import { SaveChangesPopupService } from './save-changes-popup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-save-changes-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-changes-popup.component.html',
  styleUrl: './save-changes-popup.component.css'
})
export class SaveChangesPopupComponent {

  constructor(public saveChangesPopupService: SaveChangesPopupService) { }

  @Output() deleteDraftEvent = new EventEmitter<void>();
  
  deleteDraft(): void {
    this.deleteDraftEvent.emit(); 
    this.saveChangesPopupService.hidePopup();
  }

  editDraft(): void {
    this.saveChangesPopupService.hidePopup();
  }

}
