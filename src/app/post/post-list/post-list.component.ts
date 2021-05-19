import { Observable } from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {PostService} from '../../services/post.service';

@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    @Input() post: any;
    @Input() user: any;
    tag: string;
    userPost: Observable<any>;
    isUserPost: any;

    constructor(private router: Router,
                private viewportScroller: ViewportScroller,
                public authService: AuthService,
                public postService: PostService) {
                    this.isUserPost = false;
    }

    ngOnInit(): void {
        this.postService.userPosts.subscribe(posts => {
            if (posts) {
                this.isUserPost = posts[this.post.id];
            }
        })
    }

    gotoPost(post) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            return this.router.navigate(['/posts', post.id]);
        });

    }
}
