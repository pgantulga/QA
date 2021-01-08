import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private routeSource = new BehaviorSubject('default');
    currentRoute = this.routeSource.asObservable();

    constructor() {
    }

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
        if (url.includes('login') || url.includes('register') || url.includes('welcome')) {
            return 'login';
        }
        if (url.includes('profile-settings')) {
            return 'settings';
        }
        if (url.includes('/users/')) {
            return 'user-detail';
        }
        if (url.includes('/admin')) {
            return 'admin';
        }
    }

    currentLayout(route) {
        if (route === 'post-detail' || route === 'post-edit' || route === 'settings') {
            return 'layout-2';
        } else if (route === 'login') {
            return 'layout-3';
        } else if (route === 'admin') {
            return 'layout-4';
        } else {
            return 'layout-1';
        }
    }

    getLayout(route) {
        if (route === 'post-detail' || route === 'post-edit' || route === 'settings') {
            return {
                layout1: false,
                layout2: true,
                layout3: false,
                layout4: false
            };
        } else if (route === 'admin') {
            return {
                layout1: false,
                layout2: false,
                layout3: false,
                layout4: true
            };
        } else if (route === 'login') {
            return {
                layout1: false,
                layout2: false,
                layout3: true,
                layout4: false

            };
        } else {
            return {
                layout1: true,
                layout2: false,
                layout3: false,
                layout4: false

            };
        }
    }
}
