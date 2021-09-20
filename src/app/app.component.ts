import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QA';
  loading: boolean;
  constructor(
    private themeService: ThemeService,
    private router: Router,
    private meta: Meta
  ) {
    this.loading = false;
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loading = false;
      }
    });

  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'og:title', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
    
    ]);
  }
  onActivate(event) {
   this.gotop();
  }
  gotop() {
     // tslint:disable-next-line: no-shadowed-variable
     const element = document.getElementsByName('top-anchor');
     element[0].scrollIntoView({behavior: 'smooth'});
  }
}
