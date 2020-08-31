import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  routeSource = new BehaviorSubject('default');
  currentRoute = this.routeSource.asObservable();
  constructor() { }
  setCurrentRoute(route) {
    this.routeSource.next(route);
  }
  getCurrentRoute(url) {
    if (url.includes('/posts/')) {
      return 'post-detail';
    }
    if (url.includes('/tagDetail/')) {
      return 'tag-detail';
    }
    if (url.includes('/home')) {
      return 'home';
    }
  }
}
