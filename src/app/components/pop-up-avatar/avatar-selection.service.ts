import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarSelectionService {
    private selectedAvatarSubject = new BehaviorSubject<string | null>(null);
    selectedAvatar$ = this.selectedAvatarSubject.asObservable();
    
    private selectedTypeAvatarSubject = new BehaviorSubject<string | null>(null);
    selectedTypeAvatar$ = this.selectedTypeAvatarSubject.asObservable();

    selectAvatar(avatar: string): void {
      this.selectedAvatarSubject.next(avatar);
      console.log("avatar",avatar)
    }

    selectGender(typeAvatar: string){
      this.selectedTypeAvatarSubject.next(typeAvatar);
    }
}
