import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {Menu} from "../../interfaces/Menu";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {filter, first, switchMap} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {Layout, RouteService} from '../../services/route.service';
import {PermissionService} from "../../services/permission.service";
import {Observable, of} from "rxjs";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    currentRoute: any;
    topMenu: Menu[];
    routerEvent$: Observable<any>;
    notifications$: Observable<any>;
    notifications: any[];
    layout: Layout;

    constructor(public menu: MenuService,
                public authService: AuthService,
                public permissionService: PermissionService,
                public dialog: MatDialog,
                public router: Router,
                public routeService: RouteService,
                public notificationService: NotificationService) {
        this.layout = this.routeService.getLayout(this.currentRoute);
    }

    ngOnInit(): void {
        this.routerEvent$ = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd));
        this.routerEvent$.subscribe((e: any) => {
            this.currentRoute = this.routeService.getCurrentRoute(e.url);
            this.layout = this.routeService.getLayout(this.currentRoute);
        });
        this.topMenu = this.menu.topMenu;
        this.authService.user$.pipe(
            first(),
            switchMap(user => (user) ? this.notificationService.getNotifications(user) : of()
            )).subscribe(
                (items: any) => {
                this.notifications = items.filter((item: any) => item.status > 0); },
                );
        // this.authService.getUser()
        //     .then(user => {
        //         this.notificationService.getAllNotifications(user)
        //             .subscribe(items => {
        //                 this.notifications = items.filter((item: any) => item.status > 0);
        //             });
        //     });
    }

    signOut() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {title: 'Системээс гарах', content: 'Та системээс гарахдаа итгэлтэй байна уу?'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.authService.signOut()
                    .then(() => console.log('Signed out'));
            }
        });
    }

}
