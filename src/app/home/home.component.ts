import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {AuthService} from '../services/auth.service';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {NotificationService} from '../services/notification.service';
import {MenuService} from '../services/menu.service';
import {TagService} from '../services/tag.service';

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
  userTags = [];
  constructor( private postService: PostService,
               public authService: AuthService,
               public notificationService: NotificationService,
               private tagService: TagService,
               private menu: MenuService) { }
  ngOnInit(): void {
    this.dropDownMenu = this.menu.dropMenu;
    this.selectedSort = this.dropDownMenu[0];
    this.postMetas = this.postService.postMetaDoc.valueChanges();
    this.getStarted();
  }
  getStarted() {
    this.posts = [];
    this.postService.getFirstItems(10, this.selectedSort.sort ).toPromise()
        .then(data => {
          this.copyItems(data);
        });
    this.pinnedPosts$ = this.postService.getPinnedPost();
    this.getUserTags();
  }
  getItem(ev) {
    this.posts = [];
    const subscription = ev.pageIndex > ev.previousPageIndex
        ? this.postService.nextPage(this.lastItem, this.selectedSort.sort)
        : this.postService.prevPage(this.firstItem, this.selectedSort.sort);
    subscription.subscribe(data => {
      this.copyItems(data);
    });
    return ev;
  }
  async getUserTags() {
    const userData = await this.authService.getUser();
    if (userData) {
      const userTagsData = await this.tagService.getUserTags(userData);
      userTagsData.forEach((tag: any) => {
        if (tag.data()) {
          this.userTags.push(tag.data());
          this.userTags.sort((a: any, b: any) => b.updatedAt - a.updatedAt);
        }
        this.userTags = this.userTags.slice(0, 11);
      });
    }
  }
  copyItems(data) {
    for (const a of data.docs) {
      this.posts.push(a.data());
    }
    this.firstItem = data.docs[0];
    this.lastItem = data.docs[data.docs.length - 1];
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

