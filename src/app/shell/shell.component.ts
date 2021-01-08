import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {PostService} from '../services/post.service';
import {RouteService} from '../services/route.service';
import {MenuService} from '../services/menu.service';


@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit{
    currentRoute: string;
    showTopBanner: boolean;
    currentLayoutObj: {
        layout1: boolean,
        layout2: boolean,
        layout3: boolean,
        layout4: boolean
    };
    sideMenu: Array<any>;
    posts: any;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
        .pipe(
            map( result => result.matches),
            shareReplay()
            );
     isTopBar: boolean;
     isSidebar: boolean;
    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router,
                private postService: PostService,
                private route: ActivatedRoute,
                public routeService: RouteService,
                private menuService: MenuService) {
        this.getLayoutType(this.currentRoute);
    }
    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd))
            .subscribe(e => {
                // @ts-ignore
                this.currentRoute = this.routeService.getCurrentRoute(e.url);
                this.currentLayoutObj = this.routeService.getLayout(this.currentRoute);
                // console.log(JSON.stringify(this.currentLayoutObj))
                // @ts-ignore
                this.isSidebar = this.showSidebar(e.url);
                this.sideMenu = (this.currentRoute === 'admin') ? this.menuService.adminMenu : null;
                this.isTopBar = this.currentLayoutObj.layout1 || this.currentLayoutObj.layout2;
                this.showTopBanner = this.currentRoute === 'home';
            });
        console.log(this.route.snapshot);
    }
    getLayoutType(currentRoute) {
        this.currentLayoutObj = this.routeService.getLayout(currentRoute);
    }
    showSidebar(url): boolean {
        return url.includes('posts') || url.includes('login') || url.includes('register')
            || url.includes('posts') || url.includes('welcome') || url.includes('users')
            || url.includes('admin') || url.includes('profile-settings') || url.includes('moderator');
    }
}
