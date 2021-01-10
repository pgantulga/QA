import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article-service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  @Input() item;
  constructor(private articleService: ArticleService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  editArticle(): any {
    return this.router.navigate(['/admin/articles', this.item.id]);
  }
  delete(): any {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Deleting article',
        content: 'Article will be deleted.'
      }
    }).afterClosed().subscribe( res => {
      return (res) ? this.articleService.deleteArticle(this.item) : null;
    });
  }

}
