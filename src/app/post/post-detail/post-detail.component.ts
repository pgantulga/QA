import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {AnswerService} from '../../services/answer.service';
import {Observable} from 'rxjs';
import {ViewportScroller} from "@angular/common";
import {PermissionService} from "../../services/permission.service";
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
    constructor(public route: ActivatedRoute, private postService: PostService, public authService: AuthService,
                public answerService: AnswerService, private scroller: ViewportScroller, public permissionService: PermissionService) {
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


}
