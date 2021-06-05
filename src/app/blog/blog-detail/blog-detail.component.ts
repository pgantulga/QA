import { BlogService } from './../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { first, switchMap } from 'rxjs/internal/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog$: Observable<any>;
  htmlContent: any;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.blog$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.blogService.getBlog(params.get('id'));
      })
    );

    this.blog$.pipe(first())
      .subscribe(
        (blog) => {
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(blog.content);
          // this.authService
          //   .getUser()
          //   .then((user) => {
          //     if (user && user.posts) {
          //       this.postService.setUserPosts(user.posts);

          //     }
          //     return user ? this.postService.checkFollower(user, post) : null;
          //   })
          //   .then((value) => {
          //     this.isFollowed = value;
          //   });
        },
      )
  }

}
