import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss']
})
export class LayoutOneComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
          map( result => result.matches),
          shareReplay()
      );
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

}
