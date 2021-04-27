import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {first, switchMap, take} from "rxjs/operators";
import {PostService} from '../../services/post.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    user$: Observable<any>;
    filteredPosts$: Observable<any>;
    scores: any;
    userTags = [];

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private postService: PostService,
        private tagService: TagService) {
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
        this.user$.pipe(first()).subscribe(user => {
            this.filteredPosts$ = this.postService.getPostByUser({uid: user.uid});
            this.getUserTags(user);
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
                value: (user.votesReceived) ? user.votesReceived : 0,
                uid: user.uid
            },
            {
                name: 'posts',
                icon: 'forum',
                description: 'Нэмсэн хэлэлцүүлэг',
                value: (user.postNumber) ? user.postNumber : 0,
                uid: user.uid
            }
        ];
    }
    async getUserTags(user) {
        const tagsData = await this.tagService.getUserTags(user);
        tagsData.forEach(tag => {
            if (tag.data()) {
                this.userTags.push(tag.data());
                this.userTags.sort((a: any, b: any) => b.updatedAt - a.updatedAt);
            }
        });
        this.userTags = this.userTags.slice(0, 11);
    }

}
