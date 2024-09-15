import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageErrorGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    
    const canActivate = false; 
    
    if (!canActivate) {
      this.router.navigate(['/']); 
      return false;
    }
    return true;
  }
}
