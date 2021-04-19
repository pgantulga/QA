import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MenuService} from '../../services/menu.service';
import {PageEvent} from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { TagUpdateComponent } from '../tag-update/tag-update.component';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
    selector: 'tag-detail',
    templateUrl: './tag-detail.component.html',
    styleUrls: ['./tag-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TagDetailComponent implements OnInit {
    tagDetail$: Observable<any>;
    filteredPosts: any;
    firstItem: any;
    lastItem: any;
    selectedSort: any;
    toggleMenu: any;
    pageEvent: PageEvent;
    filterObj: any;

    constructor(public tagService: TagService,
                public route: ActivatedRoute,
                private router: Router,
                public postService: PostService,
                public dialog: MatDialog,
                public authService: AuthService,
                private menu: MenuService,
                public permissionService: PermissionService
                ) {
        this.toggleMenu = this.menu.toggleMenu;
        this.selectedSort = this.toggleMenu[0];
    }

    ngOnInit(): void {
        this.tagDetail$ = this.route.paramMap.pipe(
            switchMap(params => {
                this.tagService.setCurrentTag(params.get('tagId'));
                return this.tagService.getTagInfo(params.get('tagId'));
            })
        );
        this.tagDetail$.subscribe(tag => {
            this.filterObj = {
                field: 'tags',
                condition: 'array-contains',
                value: {
                    id: tag.id,
                    name: tag.name
                }
            };
            this.getStarted();
        });
    }

    getStarted() {
        this.filteredPosts = null;
        this.postService.getFirstItems(10, this.selectedSort.sort, this.filterObj).toPromise().then(data => this.copyItems(data));
    }
    getItem(ev) {
        this.goToTop();
        this.filteredPosts = null;
        const subscription = ev.pageIndex > ev.previousPageIndex
            ? this.postService.nextPage(this.lastItem, this.selectedSort.sort, this.filterObj)
            : this.postService.prevPage(this.firstItem, this.selectedSort.sort, this.filterObj);
        subscription.subscribe(data => {
            this.copyItems(data);
        });
        return ev;
    }

    goToTop() {
        const element = document.getElementById('header');
        element.scrollIntoView(true);
    }

    copyItems(data) {
        this.filteredPosts = [];
        for (const a of data.docs) {
            this.filteredPosts.push(a.data());
        }
        this.firstItem = data.docs[0];
        this.lastItem = data.docs[data.docs.length - 1];
    }
    changeSort(sort) {
        this.selectedSort = sort;
        this.getStarted();
    }
    goToLogin() {
        const routerStateSnapshot = this.router.routerState.snapshot;
        this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
    }
    edit(oldData) {
        const dialogRef = this.dialog.open(TagUpdateComponent, {
            width: '500px',
            data: {
                name: oldData.name,
                description: oldData.description
            }
        });
        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    this.tagService.updateTag(result, oldData)
                        .then(() => {
                            console.log('tag Updated');
                        });
                }
            });
    }
    toggleFollow(user, tagDetail) { 
        (user.tags[tagDetail.id]) ? this.tagService.unfollowTag(user, tagDetail) : this.tagService.followTag(user, tagDetail);
        this.authService.updateUserInstant(
            {
                tags: {
                    [tagDetail.id]: !user.tags[tagDetail.id]
                }
            }, user.uid
        );
    }
}
