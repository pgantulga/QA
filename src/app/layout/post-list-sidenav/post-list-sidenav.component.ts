import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'post-list-sidenav',
  templateUrl: './post-list-sidenav.component.html',
  styleUrls: ['./post-list-sidenav.component.scss']
})
export class PostListSidenavComponent implements OnInit {
  @Input() post: any;
  isActive: boolean;
  constructor(public router: Router) {
  }
  ngOnInit(): void {
      this.isActive = this.router.url.includes(this.post.id);
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe(e => {
           // @ts-ignore
            this.isActive =  e.url.includes(this.post.id);
        });
  }
}
