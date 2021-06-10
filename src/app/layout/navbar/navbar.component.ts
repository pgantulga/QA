import { PostService } from './../../services/post.service';
import { AnswerBottomSheetComponent } from './../../post/answer-bottom-sheet/answer-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { element } from 'protractor';
import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../interfaces/Menu';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { filter, first, isEmpty, switchMap } from 'rxjs/operators';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Layout, RouteService } from '../../services/route.service';
import { PermissionService } from '../../services/permission.service';
import { Observable, of } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

const fabData = [
    {
        link: '\'/ask\'',
        icon: 'edit',
        name: 'ask'
    },
    {
        link: '\'/reply\'',
        icon: 'reply',
        name: 'reply'
    }
];

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    currentRoute: any;
    topMenu: Menu[];
    routerEvent$: Observable<any>;
    notifications: any[];
    layout: Layout;
    isOnTop = true;
    previousUrl: any;
    hideToolbar: boolean;
    preScrollPos: number;
    currentFab: any;
    addButton: any;


    constructor(public menu: MenuService,
                public authService: AuthService,
                public permissionService: PermissionService,
                public dialog: MatDialog,
                public router: Router,
                public route: ActivatedRoute,
                public routeService: RouteService,
                public notificationService: NotificationService,
                private scrollDispatcher: ScrollDispatcher,
                private zone: NgZone,
                private location: Location,
                private bottomSheet: MatBottomSheet,
                private postService: PostService
    ) {
        this.layout = this.routeService.getLayout(this.currentRoute);
        this.topMenu = this.menu.topMenu;
        this.hideToolbar = false;
        this.currentRoute = this.routeService.getCurrentRoute(this.router.url);
        this.layout = this.routeService.getLayout(this.currentRoute);
        this.currentFab = this.setFabData(this.currentRoute);
        this.addButton = {
            link: '/ask',
            title: 'Хэлэлцүүлэг нэмэх'
        };

    }

    ngOnInit(): void {
        this.currentRoute = this.routeService.getCurrentRoute(this.router.url);
        this.setButtonData(this.currentRoute);
        this.routerEvent$ = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd));
        this.routerEvent$.subscribe((e: NavigationEnd) => {
            this.currentRoute = this.routeService.getCurrentRoute(e.url);
            this.setButtonData(this.currentRoute);
            this.currentFab = this.setFabData(this.currentRoute);
            this.layout = this.routeService.getLayout(this.currentRoute);
            this.previousUrl = e.url;
        }
        );
        this.authService.user$.pipe(
            first(),
            switchMap(user => (user) ? this.notificationService.getNotifications(user) : of()
            ))
            .subscribe((items: any) => {
                this.notifications = items.filter((item: any) => item.status > 0);
            },
            );
        this.scrollDispatcher.scrolled().subscribe((event: CdkScrollable) => {
            this.scrollable(event);
        });
    }
    private setButtonData(currentRoute) {
        if (currentRoute === 'blog') {
            this.addButton = {
                link: '/blog/add-blog',
                title: 'Блог нэмэх'
            };
        } else {
            this.addButton = {
                link: '/ask',
                title: 'Хэлэлцүүлэг нэмэх'
            };
        }
    }
    setFabData(route) {
        return (route == 'post-detail') ? fabData[1] : fabData[0];
    }
    fabClick() {
        console.log('fabclick');
        if (this.currentFab.name !== 'reply') {
            this.router.navigateByUrl('/ask');
        } else {
            const post$ = this.postService.currentPost
                .pipe(
                    switchMap((id: any) => {
                        return this.postService.getPost(id);
                    })
                );
            post$.pipe(first()).subscribe((postData: any) => {
                this.bottomSheet.open(AnswerBottomSheetComponent, {
                    data: { id: postData.id, title: postData.title },
                    panelClass: 'answer-bottom-sheet'
                });
            });

        }
    }

    signOut() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { title: 'Системээс гарах', content: 'Та системээс гарахдаа итгэлтэй байна уу?' }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.authService.signOut()
                    .then(() => console.log('Signed out'));
            }
        });
    }

    scrollable(ev) {
        const scroll = ev.measureScrollOffset('top');
        let newIsOnTop: boolean = this.isOnTop;
        newIsOnTop = !(scroll > 0);
        if (newIsOnTop !== this.isOnTop) {
            this.zone.run(() => {
                this.isOnTop = newIsOnTop;
            });
        }
        if (this.preScrollPos < scroll && this.preScrollPos > 0) {
            this.zone.run(() => {
                this.hideToolbar = true;
            });
        } else {
            this.zone.run(() => {
                this.hideToolbar = false;
            });
        }
        this.preScrollPos = scroll;
    }
    back() {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            return this.location.back();
        });
    }
    goToLogin() {
        const routerStateSnapshot = this.router.routerState.snapshot;
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
    }
}
