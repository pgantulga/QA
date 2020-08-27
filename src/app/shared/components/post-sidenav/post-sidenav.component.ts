import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'post-sidenav',
  templateUrl: './post-sidenav.component.html',
  styleUrls: ['./post-sidenav.component.css']
})
export class PostSidenavComponent implements OnInit {
  posts: Observable<any>;
  constructor(public postService: PostService, public route: ActivatedRoute) { }
  ngOnInit(): void {
      this.posts = this.postService.getFirstItemsSync(15, 'updatedAt');
  }
}
