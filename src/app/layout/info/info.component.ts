import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article-service';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class InfoComponent implements OnInit {
  @Input() articleId: string;
  article$: Observable<any>;
  constructor(private articleService: ArticleService) {
  }
  ngOnInit(): void {
    this.article$ = this.articleService.getArticle(this.articleId);
  }

}
