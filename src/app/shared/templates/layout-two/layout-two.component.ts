import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'layout-two',
  templateUrl: './layout-two.component.html',
  styleUrls: ['./layout-two.component.scss']
})
export class LayoutTwoComponent implements OnInit {
  show: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
          map( result => result.matches),
          shareReplay()
      );
  constructor(private breakpointObserver: BreakpointObserver) {
    this.show = false;
  }

  ngOnInit(): void {
    this.isHandset$.subscribe(() => {
      this.show = true;
    })
  }

}
