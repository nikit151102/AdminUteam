import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpExitService {

  private visibleSubject = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSubject.asObservable();  // Экспортируем как Observable

  constructor() { }

  showPopup() {
    this.visibleSubject.next(true);  // Устанавливаем значение true
  }

  hidePopup() {
    this.visibleSubject.next(false); // Устанавливаем значение false
  }
}
