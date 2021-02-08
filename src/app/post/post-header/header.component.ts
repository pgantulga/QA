import {Component, Input} from '@angular/core';

@Component({
  selector: 'post-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  styleObj: any;
  url: string;
  testString: string ;
  @Input() pageTitle: string;
  constructor() {
    this.testString = 'This is very long title of the post detal page look at this';
  }
}
