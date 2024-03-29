import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
        if (url.includes('/articles/')) {
            return 'article-view';
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
        if( url.includes('/blog/')) {
            return 'blog-detail';
        }
        if (url.includes('/blog/') && url.includes('add-blog')) {
            return 'add-blog';
        }
        if (url.includes('/blog')) {
            return 'blog';
        }
        if (url.includes('/tags')) {
            return 'tags';
        }
        if (url.includes('login') || url.includes('register') || url.includes('welcome') || url.includes('select-category') || url.includes('password-reset') || url.includes('not-found')) {
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
        if (url.includes('/moderator')) {
            return 'moderator';
        }
        return 'not-found';
    }
    getRouteMenu(route) {
        switch (route) {
            case 'post-detail':
                return [
                    { name: 'Нүүр хуудас', link: 'home' },
                    { name: 'Хэлэлцүүлгүүд', link: 'home' }
                ];
            case 'blog-detail':
                return [
                    {name: 'Нүүр хуудас', link: 'blog'},
                    {name: 'Нийтлэлүүд', link: 'blog'}
                ]
            case 'post-edit':
                return [
                    { name: 'Нүүр хуудас', link: 'home' },
                    { name: 'Хэлэлцүүлэг нэмэх', link: null }
                ];
            case 'tag-detail':
                return [
                    { name: 'Нүүр хуудас', link: 'home' },
                    {name: 'Сэдвүүд', link: 'tags'},
                ];
            case 'add-blog':
                return [
                    { name: 'Нүүр', link: 'blog' },
                    { name: 'Блог нэмэх', link: null }
                ];
        }
    }
    getLayout(route) {
        if (route === 'post-detail'
            || route === 'post-edit'
            || route === 'settings'
            || route === 'user-detail'
            || route === 'article-view'
            || route === 'moderator'
            || route === 'tag-detail') {
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
        } else if (route === 'login' || route === 'not-found') {
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
