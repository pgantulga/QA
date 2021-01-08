import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {element} from "protractor";

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() post: any;

  constructor(private router: Router, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {

  }
  getIcon(type) {
    switch (type) {
      case 'voted':
        return 'done';
      case 'created':
        return 'edit';
      case 'devoted':
        return 'done';
      case 'answered':
        return 'reply';
      default:
        return 'update';
    }
  }
  gotoPost(post) {
    this.router.navigate(['/posts', post.id]);
    this.scrollTop();
    // this.viewportScroller.scrollToPosition([0, 0]);
  }

  private scrollTop() {
    // tslint:disable-next-line:no-shadowed-variable
    const element = document.querySelector('#postheader');
    if (element) {element.scrollIntoView()}

  }
}
