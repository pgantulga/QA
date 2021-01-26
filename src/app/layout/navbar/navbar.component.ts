import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {Menu} from "../../interfaces/Menu";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {RouteService} from '../../services/route.service';
import {PermissionService} from "../../services/permission.service";
import {Observable} from "rxjs";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  layout: any;
  currentRoute: any;
  topMenu: Menu[];
  routerEvent$: Observable<any>;
  notifications$: Observable<any>;
  constructor( public menu: MenuService,
               public authService: AuthService,
               public permissionService: PermissionService,
               public dialog: MatDialog,
               public router: Router,
               public routeService: RouteService,
               private notificationService: NotificationService) {}
  ngOnInit(): void {
    this.routerEvent$ = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd));
    this.routerEvent$.subscribe(e => {
          // @ts-ignore
          this.currentRoute = this.routeService.getCurrentRoute(e.url);
          this.layout = this.routeService.currentLayout(this.currentRoute);
          // this.isPostPage = this.currentRoute.includes('posts/');
        });
    this.topMenu = this.menu.topMenu;
    this.authService.getUser()
        .then(user => {
          this.notifications$ = this.notificationService.getNotifications(user);

        })
  }
  signOut() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: 'Системээс гарах' , content: 'Та системээс гарахдаа итгэлтэй байна уу?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.authService.signOut()
          .then(() => console.log('Signed out'));
      }
    });
  }
  showNotifications(user) {
    this.notificationService.getNotifications(user)
  }
  getNotificationIcon(entityType) {
    if (entityType === 1) {
      return 'edit';
    } else if (entityType === 2) {
      return 'edit';
    } else if (entityType === 4 || entityType === 5) {
      return 'reply';
    }
  }

}
