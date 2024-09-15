import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

 
  constructor() { }

  // Метод для извлечения основного домена
  setDomain(urlString: string): string {
    try {
      const url = new URL(urlString);
      const hostname = url.hostname;
      const domainParts = hostname.split('.');
  
      return domainParts.length > 2 ? domainParts[domainParts.length - 2] : domainParts[0];
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
      img.onerror = () => resolve('assets/domains/default.svg'); // Если изображение не найдено

      img.src = imageUrl;

      // Дополнительное ожидание для предотвращения отображения кэшированных изображений
      setTimeout(() => {
        if (img.complete && img.naturalHeight === 0) {
          resolve('assets/domains/default.svg');
        }
      }, 1000); // Подождите 1 секунду для завершения загрузки
    });
  }
}
