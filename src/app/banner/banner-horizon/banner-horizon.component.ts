import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-horizon',
  templateUrl: './banner-horizon.component.html',
  styleUrls: ['./banner-horizon.component.scss']
})
export class BannerHorizonComponent implements OnInit {
  @Input() mediaUrl: any;
  @Input() targetUrl: any;
  @Input() type: any;

  constructor() { }

  ngOnInit(): void {
  }

}
