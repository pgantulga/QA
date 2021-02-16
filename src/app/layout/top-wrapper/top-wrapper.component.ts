import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {RouteService} from '../../services/route.service';
import {Observable, combineLatest} from 'rxjs';


const wrapperRoutes = ['home'];

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
    user: any;

    constructor(public authService: AuthService,
                private router: Router,
                public routerService: RouteService,
                ) {
    }

    ngOnInit(): void {
        this.subscription = combineLatest([this.authService.user$, this.routerService.currentRoute$]);
        this.subscription.subscribe(results => {
            this.showWrapper = wrapperRoutes.includes(results[1]);
            this.content = this.getWrapperContent(results[0]);
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
      } else { return 'Оройн мэнд!'; }
    }
}
