import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {element} from "protractor";
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() post: any;
  tag: string;

  constructor(private router: Router, private viewportScroller: ViewportScroller, private authService: AuthService) { }

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
    // refreshing component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/posts', post.id]);
    });
    this.scrollTop();
    // this.viewportScroller.scrollToPosition([0, 0]);
  }

  private scrollTop() {
    // tslint:disable-next-line:no-shadowed-variable
    const element = document.querySelector('#postheader');
    if (element) {element.scrollIntoView()}

  }

}
