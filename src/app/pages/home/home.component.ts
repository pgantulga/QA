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
  selected: any;
  constructor( private postService: PostService, public authService: AuthService) { }

  ngOnInit(): void {
    console.log('ngonit');
    this.dropDownMenu = [{
      name: 'Сүүлийн',
      sort: 'latest'
    },
      {
        name: 'Идэвхтэй',
        sort: 'active'
      }
    ];
    this.selected = this.dropDownMenu[0];
    this.posts = this.postService.getAllPosts(this.selected.sort);


  }
  changeSort(sort) {
    this.selected = sort;
    this.posts = this.postService.getAllPosts(this.selected.sort);
  }
  refresh() {
    this.selected = this.dropDownMenu[0];
    this.posts = this.postService.getAllPosts(this.selected.sort);
  }
}
