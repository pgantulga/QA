import {Component, Input} from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  styleObj: any;
  url: string;
  @Input() pageTitle: string;
  constructor() {
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
