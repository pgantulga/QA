import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service';

@Component({
  selector: 'post-sidenav',
  templateUrl: './post-sidenav.component.html',
  styleUrls: ['./post-sidenav.component.css']
})
export class PostSidenavComponent implements OnInit {
  posts: any;

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts();
  }

}
