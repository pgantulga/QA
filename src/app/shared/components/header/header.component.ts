import {Component, Input} from '@angular/core';

@Component({
  selector: 'header',
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
    // this.testString = this.testString.slice(0, this.testString.length / 2);
    this.url = '../../../assets/mining.png';
    this.styleObj = {
      background: 'url(' + this.url + ') no-repeat center top',
      'background-color': 'rgba(0,0,0,0.7)',
      'background-blend-mode': 'multiply',
      // overflow: 'hidden',
      'background-size': 'cover',
      'background-position': 'center'
    };
  }
}
