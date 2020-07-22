import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Observable<any>;
  constructor( private postService: PostService, public authService: AuthService) { }

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts();
  }

}
