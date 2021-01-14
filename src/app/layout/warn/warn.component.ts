import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ArticleService} from '../../services/article-service';

@Component({
  selector: 'warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.scss']
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
