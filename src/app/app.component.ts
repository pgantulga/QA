import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

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
    private router: Router
  ) {
    this.loading = false;
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        console.log('loading');
        this.loading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        console.log('loading finished');
        this.loading = false;
      }
    })

  }
  ngOnInit(): void {
  }
}
