import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {AuthService} from '../services/auth.service';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from "rxjs";
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;
  dropDownMenu: any;
  selectedSort: any;
  pageEvent: PageEvent;
  firstItem: any;
  lastItem: any;
  postMetas: any;
  pinnedPosts$: Observable<any>;
  constructor( private postService: PostService, public authService: AuthService, public notificationService: NotificationService) { }
  ngOnInit(): void {
    this.dropDownMenu = [{
      name: 'Сүүлд шинэчлэгдсэн',
      sort: 'updatedAt'
    },
      {
        name: 'Идэвхтэй',
        sort: 'answersCount'
      },
      {
        name: 'Сүүлд нэмэгдсэн',
        sort: 'createdAt'
      }
    ];
    this.selectedSort = this.dropDownMenu[0];
    this.postMetas = this.postService.postMetaDoc.valueChanges()
    this.getStarted();
  }
  getStarted() {
    this.posts = [];
    this.postService.getFirstItems(10, this.selectedSort.sort ).toPromise()
        .then(data => {
          for (const a of data.docs) {
            this.posts.push(a.data());
          }
          this.firstItem = data.docs[0];
          this.lastItem = data.docs[data.docs.length - 1];
        });
    this.pinnedPosts$ = this.postService.getPinnedPost();
  }
  getItem(ev) {
    this.posts = [];
    const subscription = ev.pageIndex > ev.previousPageIndex
        ? this.postService.nextPage(this.lastItem, this.selectedSort.sort)
        : this.postService.prevPage(this.firstItem, this.selectedSort.sort);
    subscription.subscribe(data => {
      for (const a of data.docs) {
        this.posts.push(a.data());
      }
      this.firstItem = data.docs[0];
      this.lastItem = data.docs[data.docs.length - 1];
    });
    return ev;
  }
  changeSort(sort) {
    this.selectedSort = sort;
    this.getStarted();
  }
  refresh() {
    this.selectedSort = this.dropDownMenu[0];
    this.getStarted();
  }
}

