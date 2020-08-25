import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";
import {PageEvent} from '@angular/material/paginator';
import {first, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;
  dropDownMenu: any;
  selected: any;
  pageEvent: PageEvent;
  firstItem: any;
  lastItem: any;
  postMetas: any;
  constructor( private postService: PostService, public authService: AuthService) { }

  ngOnInit(): void {
    console.log('start');
    // this.pageEvent.pageIndex = 0;
    this.posts = [];

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
    this.postService.postMetaDoc.valueChanges()
        .subscribe(data => {
          this.postMetas = data;
        });
    this.postService.getFirstItems(10).subscribe(data => {
      for (const a of data.docs) {
        this.posts.push(a.data());
      }
      this.firstItem = data.docs[0].data();
      this.lastItem = data.docs[9].data();
    });
  }
  async getItem(ev) {
    if (ev.pageIndex > ev.previousPageIndex) {
      console.log('move forward');
      await this.postService.nextPage(this.lastItem).subscribe(data => {
        console.log(1);
        console.log(data.docs[9].data().id);
        this.posts = [];
        for (const a of data.docs) {
          this.posts.push(a.data());
        }
        this.firstItem = data.docs[0].data();
        this.lastItem = data.docs[9].data();

      });
      console.log(2);
      return ev;
    } else {
      console.log('move backward');
      this.postService.prevPage(this.firstItem).subscribe(data => {
        this.posts = data;
        this.firstItem = data[0];
        this.lastItem = data[data.length - 1];
      });
    }
    console.log(ev);
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

