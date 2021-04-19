import { element } from 'protractor';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { first, switchMap, take } from 'rxjs/internal/operators';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AnswerService } from '../../services/answer.service';
import { combineLatest, Observable } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { PermissionService } from '../../services/permission.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../../shared/components/snack/snack.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

const DropdownMenu = [
    {
        name: 'Сүүлд нэмэгдсэн хариултууд',
        sort: 'createdAt'
    },
    {
        name: 'Их үнэлгээтэй хариултууд',
        sort: 'votesNumber'
    }
];
const LogTypes = ['created', 'edited', 'voted', 'devoted', 'answered', 'replied'];

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
    post$: Observable<any>;
    answers$: any;
    logs$: any;
    suggestedPosts$: Observable<any>;
    dropDownMenu: any;
    selectedSort: any;
    selectedText: string;
    suggestedPosts: Array<any> = [];
    htmlContent: any;
    isFollowed: boolean;

    constructor(
        public route: ActivatedRoute, private router: Router, private postService: PostService, public authService: AuthService,
        public answerService: AnswerService, private scroller: ViewportScroller, public permissionService: PermissionService,
        private snack: MatSnackBar, private dialogRef: MatDialog, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.post$ = this.route.paramMap.pipe(
            switchMap(params => {
                this.logs$ = this.postService.getLogs(params.get('id'));
                return this.postService.getPost(params.get('id'));
            }));
        this.dropDownMenu = DropdownMenu;
        this.selectedSort = this.dropDownMenu[0];
        this.answers$ = this.getAnswers(this.selectedSort);
        this.post$.pipe(first()).subscribe(
            post => {
                this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(post.content);
                this.getSuggestedPosts(post.tags, post.id);
                this.postService.setCurrentPost(post.id);
                this.authService.getUser()
                    .then(user => {
                        return (user) ? this.postService.checkFollower(user, post) : null;
                    })
                    .then(value => {
                        this.isFollowed = value;
                    });

            },
            (error: Response) => {
                console.log(error.status);
            });
        


    }

    ngOnDestroy(): void {
        // this.post$.unsubscribe();
    }
    private goToTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0;
        // const element = document.getElementById('navbar');
        // console.log(element);
        // element.scrollIntoView(true);
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({behavior: "smooth"});
        if (this.selectedText) {
            this.answerService.setHighlightedText(this.selectedText);
        }
        document.getSelection().removeAllRanges();

    }

    changeSort(sort) {
        this.selectedSort = sort;
        this.answers$ = this.getAnswers(sort);
    }

    getAnswers(sort: any): Observable<any> {
        return this.route.paramMap.pipe(
            switchMap(params => {
                return this.answerService.getAllAnswer(params.get('id'), sort);
            })
        );
    }

    isPostAuthor(user1, user2): boolean {
        return (user1.uid === user2.uid);
    }

    deletePost(post) {
        return this.dialogRef.open(DialogComponent, {
            data: {
                title: 'Устгах үйлдэл',
                content: 'Та энэ хэлэлцүүлгийг устгахдаа итгэлтэй байна уу?'
            }
        }).afterClosed().subscribe(res => {
            if (res) {
                return this.postService.deletePost(post.id)
                    .then(() => {
                        this.router.navigate(['/home']);
                        return this.snack.openFromComponent(SnackComponent, {
                            data: 'Хэлэлцүүлэг устгагдлаа'
                        });
                    });
            }
        });
    }

    pinPost(post) {
        if (post.pinned) {
            return this.postService.unpinPost(post.id);
        } else {
            return this.postService.pinPost(post.id);

        }
    }

    getSuggestedPosts(tags: Array<any>, id) {
        if (tags.length) {
            this.suggestedPosts$ = this.postService.getPostByTag(tags[0]);
        }
    }

    getLogs(post) {
        return this.postService.getLogs(post);
    }

    toggleFollow(post, user) {
        if (this.isFollowed) {
            this.postService.unfollowPost(user, post)
                .then(() => {
                    this.isFollowed = false;
                    this.snack.openFromComponent(SnackComponent, {
                        data: 'Танд энэ хэлэцүүлгийн мэдэгдлүүд ирэхгүй.'
                    })
                });
        } else {
            this.postService.followPost(post, user)
                .then(() => {
                    this.isFollowed = true;
                    this.snack.openFromComponent(SnackComponent, {
                        data: 'Танд энэ хэлэцүүлгийн мэдэгдлүүд ирнэ.'
                    })
                });
        }
    }
    goToLogin() {
        const routerStateSnapshot = this.router.routerState.snapshot;
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
    }


}
