import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Location } from "@angular/common";
import {filter, map, shareReplay, switchMap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RouteService} from '../../../services/route.service';

@Component({
  selector: 'layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss']
})
export class LayoutOneComponent implements OnInit {
  currentRoute: string;
  test: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
          map( result => result.matches),
          shareReplay()
      );
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private routeService: RouteService, location: Location, public route: ActivatedRoute) {}
  ngOnInit(): void {
      this.currentRoute = this.routeService.getCurrentRoute(this.router.url);
      // this.router.events.pipe(
      //     filter(event => event instanceof NavigationEnd))
      //     .subscribe((e: any) => {
      //         this.currentRoute = e.url ? this.routeService.getCurrentRoute(e.url) : this.routeService.getCurrentRoute(this.router.url);
      //     });
  }
}
