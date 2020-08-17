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
  dropDownMenu: any;
  constructor( private postService: PostService, public authService: AuthService) { }

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts('latest');
    this.dropDownMenu = [{
      name: 'Сүүлийн',
      sort: 'latest'
    },
      {
        name: 'Идэвхтэй',
        sort: 'active'
      }
    ];
  }
  changeSort(sort: string) {
    this.posts = this.postService.getAllPosts(sort);
  }
}
