import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Layout {
    layout1: boolean;
    layout2: boolean;
    layout3: boolean;
    layout4: boolean;
}
@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private routeSource = new BehaviorSubject('default');
    currentRoute$ = this.routeSource.asObservable();

    constructor() {
    }

    setCurrentRoute(route) {
        this.routeSource.next(route);
    }

    getCurrentRoute(url) {
        if (url.includes('/posts/') && !url.includes('/edit')) {
            return 'post-detail';
        }
        if (url.includes('/posts/') && url.includes('/edit') || url.includes('ask')) {
            return 'post-edit';
        }
        if (url.includes('/tagDetail/')) {
            return 'tag-detail';
        }
        if (url.includes('/home') || url === '/') {
            return 'home';
        }
        if (url.includes('/tags')) {
            return 'tags';
        }
        if (url.includes('login') || url.includes('register') || url.includes('welcome') || url.includes('select-category')) {
            return 'login';
        }
        if (url.includes('profile-settings') || url.includes('notifications')) {
            return 'settings';
        }
        if (url.includes('/users/')) {
            return 'user-detail';
        }
        if (url.includes('/admin')) {
            return 'admin';
        }
        if(url.includes('/moderator')) {
            return 'moderator';
        }
    }
    getLayout(route) {
        if (route === 'post-detail' || route === 'post-edit' || route === 'settings' || route === 'user-detail' || route === 'moderator') {
            return {
                layout1: false,
                layout2: true,
                layout3: false,
                layout4: false
            };
        } else if (route === 'admin' ) {
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
