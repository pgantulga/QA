import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() currentRoute: any
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
          map( result => result.matches),
          shareReplay()
      );
  constructor( private breakpointObserver: BreakpointObserver) { }
  ngOnInit(): void {
  }

}
