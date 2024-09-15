import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemNotificationsComponent } from './item/item.component';
import { ExcelReaderComponent } from '../excel-reader/excel-reader.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, ItemNotificationsComponent, ExcelReaderComponent, ButtonModule, InputTextModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notifications = [
    {
      dayOfWeek: 'Понедельник',
      day: 5,
      month: 'Август',
      notifications: [
        {
          title: 'Обновление системы',
          content: 'Сегодня будет проведено техническое обслуживание сайта.',
          time: '10:00'
        },
        {
          title: 'Новое событие',
          content: 'Вебинар по новым функциям платформы в 15:00.',
          time: '14:30'
        }
      ]
    },
    {
      dayOfWeek: 'Вторник',
      day: 6,
      month: 'Август',
      notifications: [
        {
          title: 'Изменение в расписании',
          content: 'Семинар перенесен на пятницу.',
          time: '09:00'
        }
      ]
    },
    {
      dayOfWeek: 'Среда',
      day: 7,
      month: 'Август',
      notifications: [
        {
          title: 'Плановое обновление',
          content: 'Обновление версии 2.1.0. Возможны временные перебои в работе.',
          time: '12:00'
        },
        {
          title: 'Новые функции',
          content: 'Обновлены функции фильтрации данных.',
          time: '16:00'
        }
      ]
    }
    // Добавьте больше объектов по необходимости
  ];

}
