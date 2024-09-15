import { Component, Input, OnInit } from '@angular/core';
import { SettingHeaderService } from '../setting-header.service';
import { CommonModule } from '@angular/common';
import { errorContent } from './errorList';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css']
})
export class PageErrorComponent implements OnInit {
  num!: number;

  content: any = {};

  constructor(private route: ActivatedRoute, private settingHeaderService: SettingHeaderService) { }

  ngOnInit(): void {
    this.open()
    this.settingHeaderService.isheader = false;
    this.settingHeaderService.isFooter = false;
    this.route.paramMap.subscribe(params => {
      this.num = +params.get('num')!;
      this.loadErrorContent();
    });
  }

  open() {
    document.body.classList.remove('overflow-x-hidden');
    document.documentElement.classList.remove('overflow-x-hidden');
    document.body.style.overflowY = 'hidden';


  }

  close() {
    document.body.classList.add('overflow-x-hidden');
    document.documentElement.classList.add('overflow-x-hidden');
    document.body.style.overflowY = '';
  }

  loadErrorContent(): void {

    const errorData = errorContent.find((error: any) => error.numError === this.num);

    if (errorData) {
      this.content = errorData;
    } else {
      this.content = {
        title: 'Неизвестная ошибка',
        subtitle: 'Произошла неизвестная ошибка. Попробуйте еще раз.',
        btn: 'ОК'
      };
    }
  }
  ngOnDestroy(): void {
    this.close();

  }
}
