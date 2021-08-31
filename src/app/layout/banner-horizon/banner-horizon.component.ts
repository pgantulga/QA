import { GlobalObjectService } from './../../services/global-object.service';
import { Observable } from 'rxjs';
import { BannerService } from './../../services/banner.service';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'banner-horizon',
  templateUrl: './banner-horizon.component.html',
  styleUrls: ['./banner-horizon.component.scss'],
})
export class BannerHorizonComponent implements OnInit {
  @Input() bannerId: string;
  banner$: Observable<any>;
  window: any;
  constructor(
    private bannerService: BannerService,
    windowRef: GlobalObjectService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // this.window = windowRef.getWindow();
  }

  ngOnInit(): void {
    this.banner$ = this.bannerService.getBanner(this.bannerId);
  }
  goUrl(url) {
    if (isPlatformBrowser(this.platformId)) {
      // this.window.location.href = url;
    }
  }
}
