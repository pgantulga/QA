import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TagService} from '../../services/tag.service';
import {ThemeService} from "../../services/theme.service";
import {Observable} from "rxjs";
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  tags$: any;
  isDarkTheme: Observable<boolean>;
  constructor(private route: ActivatedRoute, public tagService: TagService, private themeService: ThemeService) { }
  ngOnInit(): void {
    this.tags$ = this.tagService.getPopularTags();
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  changeTheme() {
    this.isDarkTheme.subscribe(value => {
      console.log(value);
      (value) ? this.themeService.setDarkTheme(true) : this.themeService.setDarkTheme(false);
    });
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
