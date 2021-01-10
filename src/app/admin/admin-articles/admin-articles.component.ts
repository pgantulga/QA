import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ArticleService} from '../../services/article-service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss']
})
export class AdminArticlesComponent implements OnInit {
  articles: Observable<any>;
  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles = this.articleService.getAllArticles();
  }


}
