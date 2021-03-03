import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ArticleService} from '../../services/article-service';

@Component({
  selector: 'warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WarnComponent implements OnInit{
  @Input() articleId: string;
  article$: Observable<any>;
  constructor(private articleService: ArticleService) {
  }
  ngOnInit(): void {
    this.article$ = this.articleService.getArticle(this.articleId);
  }
}
