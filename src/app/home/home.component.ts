import { NotificationService } from './../services/notification.service';
import { MetaObj } from './../services/tag.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { TagService } from '../services/tag.service';
import { PermissionService } from '../services/permission.service';
import { first, isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: any;
  posts$: Observable<any>;
  toggleMenu: any;
  selectedSort: any;
  pageEvent: PageEvent;
  firstItem: any;
  lastItem: any;
  postMetas: Observable<any>;
  pinnedPosts$: Observable<any>;
  userTags = [];
  showPaginator = true;
  isNoPost = false;
  subscription: Subscription;
  user: any;
  userPosts: any;

  constructor(
    private postService: PostService,
    public authService: AuthService,
    private tagService: TagService,
    private menu: MenuService,
    public permissionService: PermissionService,
    public notificationService: NotificationService
  ) {
    this.toggleMenu = this.menu.toggleMenu;
    this.selectedSort = this.toggleMenu[0];
  }

  ngOnInit(): void {
    this.postMetas = this.postService.getPostMeta();
    this.pinnedPosts$ = this.postService.getPinnedPost();
    this.getStarted();
  }

  private async getStarted() {
    this.posts = [];
    this.user = await this.authService.getUser();
    if (this.user && this.user.posts) {
      this.postService.setUserPosts(this.user.posts);
    }
    this.getTagsMenu(this.user);
    this.posts$ = this.postService.getFirstItems(10, this.selectedSort.sort);
    this.subscription = this.posts$
      .pipe(isEmpty())
      .subscribe((x) => (this.isNoPost = x));
    this.posts$.toPromise().then((data) => {
      this.copyItems(data);
    });
  }

  private copyItems(data) {
    for (const a of data.docs) {
      this.posts.push(a.data());
    }
    this.firstItem = data.docs[0];
    this.lastItem = data.docs[data.docs.length - 1];
  }

  private goToTop() {
    const element = document.getElementById('tags');
    element.scrollIntoView({ behavior: 'smooth' });
  }

  private async getTagsMenu(user) {
    console.log(user);
    if (user && user.tags) {
      const userTagsData = await this.tagService.getUserTags(user);
      userTagsData.forEach((tag: any) => {
        if (tag.data()) {
          this.userTags.push(tag.data());
          this.userTags.sort((a: any, b: any) => b.updatedAt - a.updatedAt);
        }
      });
      this.userTags = this.userTags.slice(0, 11);
    } else {
      this.tagService
        .getPopularTags()
        .pipe(first())
        // tslint:disable-next-line: deprecation
        .subscribe((tags) => {
          this.userTags = this.userTags.concat(tags);
        });
    }
  }
  getItem(ev) {
    this.goToTop();
    this.posts = [];
    const subscription =
      ev.pageIndex > ev.previousPageIndex
        ? this.postService.nextPage(this.lastItem, this.selectedSort.sort)
        : this.postService.prevPage(this.firstItem, this.selectedSort.sort);
    subscription.subscribe((data) => {
      this.copyItems(data);
    });
    return ev;
  }

  changeSort(sort) {
    this.selectedSort = sort;
    this.getStarted();
  }
  followingPost(user) {
    this.showPaginator = false;
    this.posts = [];
    const followingPosts$ = this.postService.getUserFollowedPosts(user.posts);
    const isEmpty$ = followingPosts$.pipe(isEmpty());
    isEmpty$.subscribe((x) => (this.isNoPost = x));
    followingPosts$.subscribe((items) => {
      items.sort((a: any, b: any) => b.updatedAt - a.updatedAt);
      items.forEach((post) => {
        if (post) {
          this.posts.push(post);
        }
      });
    });
  }
}
