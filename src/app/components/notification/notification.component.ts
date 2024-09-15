import { Component, OnInit } from '@angular/core';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { CommonModule } from '@angular/common';
import { SettingHeaderService } from '../setting-header.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NotificationItemComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  constructor(private settingHeaderService: SettingHeaderService) { }

  ngOnInit(): void {
    this.settingHeaderService.backbtn = true;
  }

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
