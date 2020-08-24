import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Observable<any>;
  dropDownMenu: any;
  selected: any;
  pageEvent: PageEvent;
  constructor( private postService: PostService, public authService: AuthService) { }

  ngOnInit(): void {
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
    this.posts = this.postService.nextPage(0);
    // this.posts = this.pageEvent ? this.postService.nextPage(this.pageEvent.pageIndex * 10) : this.postService.nextPage(0);
    // this.posts = this.postService.nextPage(this.pageEvent.pageIndex);
    // this.posts = this.postService.getAllPosts(this.selected.sort);
  }
  addTestItems() {
    this.postService.addTestPosts(50);
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
