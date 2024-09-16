import { Component } from '@angular/core';
import { SettingHeaderService } from './components/setting-header.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'uteam';
  isVisibleFilter: boolean = false;
  constructor(public settingHeaderService: SettingHeaderService){

  }
  ngOnInit() {
    this.settingHeaderService.isFilterState$.subscribe(value => {
      this.isVisibleFilter = value;
    });
  }
}
