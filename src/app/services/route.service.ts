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
    if (url.includes('/posts/') && !url.includes('/edit')) {
      return 'post-detail';
    }
    if (url.includes('/posts/') && url.includes('/edit')) {
      return 'post-edit';
    }
    if (url.includes('/tagDetail/')) {
      return 'tag-detail';
    }
    if (url.includes('/home')) {
      return 'home';
    }
    if (url.includes('login') || url.includes('register')) {
      return 'login';
    }
    if (url.includes('/users/')) {
      return 'user-detail';
    }
  }
  currentLayout(route) {
    if (route === 'post-detail' || route === 'post-edit') {
      return 'layout-2';
    } else if (route === 'login') {
      return 'layout-3';
    } else {
      return 'layout-1';
    }
  }
  getLayout(route) {
    if (route === 'post-detail' || route === 'post-edit') {
      return {
        layout1: false,
        layout2: true,
        layout3: false
      };
    } else if (route === 'login') {
      return {
        layout1: false,
        layout2: false,
        layout3: true
      };
    } else {
      return {
        layout1: true,
        layout2: false,
        layout3: false
      };
    }
  }
}
