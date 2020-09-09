import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {PostService} from './services/post.service';
import {RouteService} from './services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'QA';
  currentLayout: any;
  currentRoute: any;
  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private postService: PostService,
              private route: ActivatedRoute,
              public routeService: RouteService) {
  }
  ngOnInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe(e => {
          // @ts-ignore
          this.currentRoute = this.routeService.getCurrentRoute(e.url);
          this.currentLayout = this.routeService.currentLayout(this.currentRoute);
        });
    console.log(this.route.snapshot);
  }
}
