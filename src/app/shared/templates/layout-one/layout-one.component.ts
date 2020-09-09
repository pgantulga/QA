import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {filter, map, shareReplay} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {RouteService} from '../../../services/route.service';

@Component({
  selector: 'layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss']
})
export class LayoutOneComponent implements OnInit {
  currentRoute: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
          map( result => result.matches),
          shareReplay()
      );
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private routeService: RouteService) { }
  ngOnInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe((e: any) => {
          this.currentRoute = this.routeService.getCurrentRoute(e.url);
        });
  }
}
