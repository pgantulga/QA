import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article-service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['../../layout/detail-header/detail-header.component.scss',
  './article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {
  article$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
    ) { }

  ngOnInit(): void {
    this.article$ = this.route.paramMap.pipe(
      switchMap(params => {
          return this.articleService.getArticle(params.get('id'));
      })
  );
  }

}
