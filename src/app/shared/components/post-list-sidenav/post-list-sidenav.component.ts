import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'post-list-sidenav',
  templateUrl: './post-list-sidenav.component.html',
  styleUrls: ['./post-list-sidenav.component.scss']
})
export class PostListSidenavComponent implements OnInit {
  @Input() post: any;
  constructor() { }

  ngOnInit(): void {
  }

}
