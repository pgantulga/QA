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
    tag: string;
    isUserPost: boolean;

    constructor(private router: Router,
                private viewportScroller: ViewportScroller,
                public authService: AuthService,
                public postService: PostService) {
    }

    ngOnInit(): void {
    }

    gotoPost(post) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            return this.router.navigate(['/posts', post.id]);
        });

    }
}
