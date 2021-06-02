import { AuthService } from './../services/auth.service';
import { BottomSheetComponent } from './../shared/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PostService } from '../services/post.service';
import { Layout, RouteService } from '../services/route.service';
import { MenuService } from '../services/menu.service';


@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
    currentRoute: string;
    sideMenu: Array<any>;
    currentLayoutObj: Layout;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
        .pipe(
            map(result => result.matches),
            shareReplay()
        );
    isTopBar: boolean;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private afMessaging: AngularFireMessaging,
        private router: Router,
        private authService: AuthService,
        public routeService: RouteService,
        private menuService: MenuService,
        private bottomSheet: MatBottomSheet) {
        this.currentLayoutObj = this.routeService.getLayout(this.currentRoute);
    }

    ngOnInit(): void {
        this.listen();
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd))
            .subscribe((e: any) => {
                if (!e.url) {
                    this.currentRoute = this.routeService.getCurrentRoute(this.router.url);
                }
                this.currentRoute = this.routeService.getCurrentRoute(e.url);
                this.routeService.setCurrentRoute(this.currentRoute);
                this.currentLayoutObj = this.routeService.getLayout(this.currentRoute);
                this.sideMenu = (this.currentRoute === 'admin') ? this.menuService.adminMenu : null;
                this.isTopBar = this.currentLayoutObj.layout1 || this.currentLayoutObj.layout2;
            });
    }
    listen() {
        this.afMessaging.messages
            .subscribe(async(message: any) => {
                const user = await this.authService.getUser();
                const bottomSheetData = {
                    body: message.notification.body,
                    title: message.notification.title,
                    link: message.notification.click_action
                };
                console.log('new not arrived')
                if (user.uid === message.data.actor) {
                    return null;
                }
                this.bottomSheet.open(BottomSheetComponent, {
                    data: bottomSheetData,
                    panelClass: 'custom-bottom-sheet'
                });
            });
    }
}