import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpErrorCreateService {

  constructor() { }

  visible: boolean = false;
  
  showDialog() {
    this.visible = true;
  }
}
