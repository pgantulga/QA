import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {switchMap, take} from "rxjs/operators";
import {PostService} from '../../services/post.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    user$: Observable<any>;
    filteredPosts$: Observable<any>;
    scores: any;

    constructor(private userService: UserService, private route: ActivatedRoute, private postService: PostService) {
    }

    ngOnInit(): void {
        this.user$ = this.route.paramMap.pipe(
            switchMap(params => {
                this.userService.setSelectedUser(params.get('uid'));
                return this.userService.getUserDetail(params.get('uid'));
            })
        );
        this.getDetails();
    }

    getDetails() {
        this.user$.subscribe(user => {
            this.filteredPosts$ = this.postService.getPostByUser({uid: user.uid});
            this.scores = this.getUserScore(user);
        });
    }

    getAnswersByUser() {
        this.user$.subscribe(user => {
            this.filteredPosts$ = this.postService.getAnswersByUser({uid: user.uid});
        });
    }

    getUserScore(user) {
        return [
            {
                name: 'votes',
                icon: 'done',
                description: 'Авсан үнэлгээ',
                value: (user.votesReceived) ? user.votesReceived : 0
            },
            {
                name: 'posts',
                icon: 'forum',
                description: 'Нэмсэн хэлэлцүүлэг',
                value: (user.postNumber) ? user.postNumber : 0
            }
        ];
    }

}
