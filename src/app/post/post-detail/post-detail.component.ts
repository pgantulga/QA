import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {AnswerService} from '../../services/answer.service';
import {Observable} from 'rxjs';
import {ViewportScroller} from "@angular/common";
import {PermissionService} from "../../services/permission.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackComponent} from "../../shared/components/snack/snack.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
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

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
    post$: any;
    answers$: any;
    suggestedPosts$: Observable<any>;
    dropDownMenu: any;
    selectedSort: any;
    selectedText: string;
    constructor(public route: ActivatedRoute, private router: Router, private postService: PostService, public authService: AuthService,
                public answerService: AnswerService, private scroller: ViewportScroller, public permissionService: PermissionService, private snack: MatSnackBar, private dialogRef: MatDialog) {
    }

    ngOnInit(): void {
        this.suggestedPosts$ = this.postService.getFirstItemsSync(4, 'createdAt');
        // combine observers
        this.post$ = this.route.paramMap.pipe(
            switchMap(params => {
                return this.postService.getPost(params.get('id'));
            }));
        this.dropDownMenu = DropdownMenu;
        this.selectedSort = this.dropDownMenu[0];
        this.answers$ = this.getAnswers(this.selectedSort);
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView();
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
        }).afterClosed().subscribe( res => {
            if (res) {
                return this.postService.deletePost(post.id)
                    .then(() => {
                        this.router.navigate(['/home']);
                        return this.snack.openFromComponent(SnackComponent, {
                            data: 'Хэлэлцүүлэг устгагдлаа'
                        });
                    });
            }
        } );
    }
    pinPost(post) {
        if (post.pinned) {
            return this.postService.unpinPost(post.id);
        } else {
            return this.postService.pinPost(post.id);
        }
    }


}
