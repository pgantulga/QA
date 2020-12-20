import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {PostService} from './services/post.service';
import {RouteService} from './services/route.service';
import {ThemeService} from './services/theme.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'QA';
  isDarkTheme: Observable<boolean>;
  constructor(private themeService: ThemeService) {
  }
  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}
