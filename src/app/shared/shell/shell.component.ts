import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {switchMap} from 'rxjs/internal/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import {PostService} from '../../services/post.service';
import {RouteService} from '../../services/route.service';
// import {MatSidenav} from '@angular/material/sidenav';


@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit{
    currentRoute: string;
    sidebarLogic: boolean;
    isPostPage: boolean;
    posts: any;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
        .pipe(
            map( result => result.matches),
            shareReplay()
            );
    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router,
                private postService: PostService,
                private route: ActivatedRoute,
                public routeService: RouteService) {}
    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd))
            .subscribe(e => {
                // @ts-ignore
                this.currentRoute = this.routeService.getCurrentRoute(e.url);
                // @ts-ignore
                this.sidebarLogic = this.showSidebar(e.url);
            });
        console.log(this.route.snapshot);
    }
    showSidebar(url) {
        return url.includes('/posts') || url.includes('login');
    }
}
