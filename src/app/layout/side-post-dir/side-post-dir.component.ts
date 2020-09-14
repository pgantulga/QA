import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'side-post-dir',
  templateUrl: './side-post-dir.component.html',
  styleUrls: ['./side-post-dir.component.css']
})
export class SidePostDirComponent implements OnInit {
  isHandset$: Observable <boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
          map( res => res.matches),
          shareReplay()
      );
  constructor(public breakpointObserver: BreakpointObserver) { }
  ngOnInit(): void {
  }

}
