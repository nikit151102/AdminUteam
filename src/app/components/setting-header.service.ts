import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingHeaderService {

  post: boolean = false;
  shared: boolean = false;
  backbtn: boolean = false;
  toggleSwitch: boolean = false;
  isheader: boolean = true;
  searchinputVisible: boolean = false;
  isSticky: boolean = false;
  isFooter: boolean = true;
  
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isheader = !event.url.includes('adminAccount');
        if(!this.isheader){
          document.documentElement.style.setProperty('--background', '#f2f2f2');
        }
        
      }
    });
  }
  
  private isFilterSubject = new BehaviorSubject<boolean>(false);

  isFilterState$ = this.isFilterSubject.asObservable();

  setBooleanValue(newValue: boolean): void {
    this.isFilterSubject.next(newValue);
  }

  getBooleanValue(): boolean {
    return this.isFilterSubject.getValue();
  }


}
