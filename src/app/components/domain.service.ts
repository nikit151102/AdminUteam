import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainService {


  constructor(private http: HttpClient) { }

  // Метод для извлечения основного домена без зоны
  setDomain(urlString: string): string {
    try {
      const url = new URL(urlString);
      const hostname = url.hostname;
      const domainParts = hostname.split('.');

      if (hostname === 't.me') {
        const channelName = url.pathname.slice(1);
        return `/${channelName}`;
      }

      return domainParts.length > 2 ? domainParts[domainParts.length - 2] : domainParts[0];
    } catch (error) {
      return '';
    }
  }

  // Метод для извлечения основного домена с зоной
  setDomainWithZone(urlString: string): string {
    try {
      const url = new URL(urlString);
      const hostname = url.hostname;
      const domainParts = hostname.split('.');

      if (hostname === 't.me') {
        const channelName = url.pathname.slice(1);
        return `/ ${channelName}`;
      }

      if (domainParts.length >= 2) {
        return domainParts.slice(-2).join('.');
      }

      return hostname;
    } catch (error) {
      return '';
    }
  }

  // Метод для проверки существования изображения
  checkImageExists(domainName: string): Promise<string> {
    return new Promise((resolve) => {
      const imageUrl = `assets/domains/${domainName}.png`;
      const img = new Image();

      img.onload = () => resolve(imageUrl); // Если изображение найдено
      img.onerror = () => resolve('domains/default.svg'); // Если изображение не найдено

      img.src = imageUrl;

      // Дополнительное ожидание для предотвращения отображения кэшированных изображений
      setTimeout(() => {
        if (img.complete && img.naturalHeight === 0) {
          resolve('domains/default.svg');
        }
      }, 1000); // Подождите 1 секунду для завершения загрузки
    });
  }
}
