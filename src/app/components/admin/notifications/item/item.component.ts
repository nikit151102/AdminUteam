import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface item {
  title: string;
  content: string;
  time: string;
}

@Component({
  selector: 'app-item-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ height: '0px', opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0px', opacity: 0, transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class ItemNotificationsComponent {

  @Input() itemValue: item = {
    title: 'Обновление платформы',
    content: 'Печатающийся текст — это блок с эффектом набираемого текста и не только) В нём, например, можно перечислить какие-либо свойства продукта.',
    time: '21:09'
  };

  isCollapsed: boolean = true;

  toggleClick(): void {
    console.log('vfdfrvds')
    this.isCollapsed = !this.isCollapsed;
  }

}
