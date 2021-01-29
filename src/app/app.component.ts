import {Component, OnInit} from '@angular/core';
import {ThemeService} from './services/theme.service';
import {AngularFireMessaging} from "@angular/fire/messaging";
import {mergeMapTo} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'QA';
  constructor(private themeService: ThemeService, private afMessaging: AngularFireMessaging) {

  }
  ngOnInit(): void {
  }
  requestPermission() {
    this.afMessaging.requestToken
        .subscribe(
            (token) => { console.log(token); },
            (error) => { console.error(error); },
        );
  }
}
