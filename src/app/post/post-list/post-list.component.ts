import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() post: any;

  constructor() { }

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

}
