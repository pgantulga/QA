import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {RouteService} from "../../services/route.service";
import {Observable, combineLatest} from "rxjs";
import {ArticleService} from "../../services/article-service";
import {PermissionService} from "../../services/permission.service";
import {NotificationService} from '../../services/notification.service';
import {AngularFireMessaging} from '@angular/fire/messaging';

const wrapperRoutes = ['home', 'tags'];

@Component({
    selector: 'top-wrapper',
    templateUrl: './top-wrapper.component.html',
    styleUrls: ['./top-wrapper.component.scss']
})
export class TopWrapperComponent implements OnInit, OnDestroy {
    @Input() item: any;
    closed: boolean;
    showWrapper = false;
    subscription: Observable<any>;
    title: string;
    content: any;
    showNotificationWarn: boolean;
    user: any;

    constructor(public authService: AuthService,
                private router: Router,
                public routerService: RouteService,
                private articleService: ArticleService,
                private permissionService: PermissionService,
                private notificationService: NotificationService,
                private afMessaging: AngularFireMessaging
                ) {
    }

    ngOnInit(): void {
        this.subscription = combineLatest([this.authService.user$, this.routerService.currentRoute$]);
        this.subscription.subscribe(results => {
            this.showWrapper = wrapperRoutes.includes(results[1]);
            this.content = this.getWrapperContent(results[0]);
            this.user = results[0];
            if (results[0]) {
                this.notificationService.checkNotificationToken(results[0])
                    .then(res => {
                        this.showNotificationWarn = !res;
                    });
            }
        });
    }

    ngOnDestroy() {
        this.subscription.subscribe();
    }

    close() {
        this.closed = !this.closed;
    }
    getWrapperContent(user): any {
        if (!user) {
            return {
              name: 'start',
              title: 'Тавтай морил!',
              button: 'Эхлэх',
              icon: 'star',
              link: 'auth/profile-settings'
            };
        }
        if (user.roles.guest) {
          return {
            name: 'regFinish',
            title: 'Та бүртгэлээ гүйцээнэ үү',
            button: 'Хэрэглэгчийн тохиргоо',
            icon: 'settings',
            link: 'auth/profile-settings'
          };
        } else {
          return {
            name: 'hi',
            title: user.displayName + ',',
            button: 'Эхлэх',
            icon: 'forward',
            link: 'auth/profile-settings'
          };
        }
    }
    action(link) {
      this.router.navigate([link]);
    }
    getGreetings(): any {
      const currentTime = new Date().getHours();
      if (currentTime < 6 ) {
        return 'Оройн мэнд!';
      } else if ( currentTime < 12 ) {
        return 'Өглөөний мэнд!';
      } else if (currentTime < 18) {
        return 'Өдрийн мэнд!';
      } else { return 'Оройн мэнд!';}
    }
    askNotificationPermission() {
        this.afMessaging.requestToken
            .subscribe(
                (token) => { this.notificationService.savePushNotificationsToUser(token, this.user)
                    .then(() => {
                        this.showNotificationWarn = false;
                    });
                },
                (error) => { console.error(error); },
            );
    }

}
