import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverServiceService implements Resolve<any> {

  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const path = route.routeConfig?.path;
    const id = route.paramMap.get('id');
    const type = path?.split('/')[0];
    return { type, id };
  }
}
