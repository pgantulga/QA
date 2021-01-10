import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TagService} from '../../services/tag.service';
import {switchMap} from 'rxjs/operators';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {config} from '../../shared/quill-config';
import {ArticleService} from '../../services/article-service';
import {RouteService} from "../../services/route.service";


@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {
  postForm: FormGroup;
  author: any;
  config: any;
  tags: any[] = [];
  content = new FormControl('', [
    Validators.required
  ]);
  title = new FormControl('', [
    Validators.required,
  ]);
  editing = false;
  oldValue: any;
  constructor(private formBuilder: FormBuilder,
              public articleService: ArticleService,
              public authService: AuthService,
              public route: ActivatedRoute,
              public router: Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public tagService: TagService,
              private routeService: RouteService
              ) {
    this.authService.user$.subscribe(user => {
      this.author = user;
    });
    this.route.paramMap.pipe(
        switchMap( params => {
          return params.get('id') ? this.articleService.getArticle(params.get('id')) : [];
        })
    ).subscribe((data: any) => {
      if (data) {
        this.oldValue = data;
        this.title.setValue(data.title);
        this.content.setValue(data.content);
        this.editing = true;
      }
    });
  }
  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'Гарчиг шаардлагтай';
    }
    return this.title.hasError('length') ? '150 тэмдэгтэд багтаана уу' : '';
  }
  ngOnInit(): void {
    this.config = config;
  }

  createArticle() {
    return this.articleService.createArticle({
      title: this.title.value,
      content: this.content.value,
    }, this.author);
  }
  updateArticle() {
    return this.articleService.updateArticle ( {
      id: this.oldValue.id,
      title: this.title.value,
      content: this.content.value,
    }, this.author);
  }

  onSubmit() {
    if (!this.editing) {
      return this.dialog.open(DialogComponent, {
        data: {
          title: 'Adding article?',
          content: 'Your article will be created.',
        }
      }).afterClosed().subscribe( result => {
        if (result) {
          this.createArticle()
              .then(() => {
                this.snackBar.openFromComponent(SnackComponent, {
                  data: 'New article added',
                });
                return this.router.navigate(['/admin/articles']);
              });
        }
      });
    }
    return this.dialog.open(DialogComponent, {
      data: {
        title: 'Save article?',
        content: 'Changes will be saved.'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.updateArticle()
            .then(() => {
              this.snackBar.openFromComponent(SnackComponent, {
                data: 'Saved',
              });
              return this.router.navigate(['/admin/articles']);
            });
      }
    });
  }

}
