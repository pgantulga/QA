import { PostService } from './../../services/post.service';
import { Observable } from 'rxjs';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  allBlogs$: Observable<any>;
  latestPosts$: Observable<any>;
  constructor(
    private blogService: BlogService,
    private postService: PostService,
    private router: Router
    ) {
    this.allBlogs$ = this.blogService.getAllBlogs();
  }

  ngOnInit(): void {
    this.latestPosts$ = this.postService.getFirstItemsSync(6, 'createdAt');
  }
  goToPost(post) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      return this.router.navigate(['/posts', post.id]);
  });
  }
}
