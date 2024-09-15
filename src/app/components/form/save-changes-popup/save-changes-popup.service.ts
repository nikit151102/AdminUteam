import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveChangesPopupService {
  
  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();  

  constructor() { }

  showPopup() {
    this.visibleSubject.next(true);  
  }

  hidePopup() {
    this.visibleSubject.next(false); 
  }

}
