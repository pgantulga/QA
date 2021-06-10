import { Observable } from 'rxjs';
import { BannerService } from './../../services/banner.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'banner-horizon',
  templateUrl: './banner-horizon.component.html',
  styleUrls: ['./banner-horizon.component.scss']
})
export class BannerHorizonComponent implements OnInit {
  @Input() bannerId: string;
  banner$: Observable<any>;
  constructor(private bannerService: BannerService, private router: Router) { }

  ngOnInit(): void {
    this.banner$ = this.bannerService.getBanner(this.bannerId);
  }
  goUrl(url) {
    window.location.href = url;
  }

}