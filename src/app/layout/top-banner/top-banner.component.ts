import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss']
})
export class TopBannerComponent implements OnInit {
  closed: boolean;
  constructor() {this.closed = false; }

  ngOnInit(): void {
  }
  close() {
    this.closed = !this.closed;
  }
}
