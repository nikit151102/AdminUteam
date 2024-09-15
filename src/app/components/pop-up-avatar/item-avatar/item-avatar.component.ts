import { Component, Input, OnInit } from '@angular/core';
import { AvatarSelectionService } from '../avatar-selection.service';

@Component({
  selector: 'app-item-avatar',
  standalone: true,
  imports: [],
  templateUrl: './item-avatar.component.html',
  styleUrl: './item-avatar.component.css'
})
export class ItemAvatarComponent implements OnInit {
  @Input() avatarSrc: string = '';
  isSelected: boolean = false;

  constructor(private avatarSelectionService: AvatarSelectionService) { }

  ngOnInit(): void {

    this.avatarSelectionService.selectedAvatar$.subscribe(selectedAvatar => {
      this.isSelected = selectedAvatar === this.avatarSrc;
      const result = this.avatarSrc.split('_')[1];
      console.log(result);
    });
  }

  onAvatarClick(event: Event, avatar: string): void {
    if (this.isSelected) {
      this.avatarSelectionService.selectAvatar('');
      this.avatarSelectionService.selectGender('');
    } else {
      this.avatarSelectionService.selectAvatar(avatar);
      this.avatarSelectionService.selectGender(this.avatarSrc.split('_')[1]);
    }
    event.stopPropagation();
  }

}
