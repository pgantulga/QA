import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TagAddComponent} from '../tag-add/tag-add.component';
import {TagService} from '../../services/tag.service';
import {AuthService} from '../../services/auth.service';
import {PermissionService} from '../../services/permission.service';
import {ArticleService} from '../../services/article-service';
import {combineLatest, Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
    selector: 'tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
    selected: any;
    name: string;
    description: string;
    userTags: any;
    otherTags: any;
    tags$: any;
    aboutTag$: Observable<any>;

    constructor(public dialog: MatDialog,
                public tagService: TagService,
                public authService: AuthService,
                public permissionService: PermissionService,
                public articleService: ArticleService,
                private router: Router
    ) {
    }

    ngOnInit(): void {
        this.userTags = [];
        this.aboutTag$ = this.articleService.getArticle('fc4mPnE0FqMYRk24XsZI');
        combineLatest([this.authService.user$, this.tagService.getAllTags()])
            .subscribe(([user, tags]) => {
              if (user) {
                this.userTags = tags.filter((tag: any) => user.tags[tag.id]);
                this.otherTags = tags.filter((tag: any) => !(user.tags[tag.id]));
              } else {
                this.otherTags = tags;
              }
            });
    }

    changeSort(sort) {
        this.selected = sort;
    }
    goToLogin() {
      const routerStateSnapshot = this.router.routerState.snapshot;
      this.router.navigate(['/auth/login'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
    }
}
